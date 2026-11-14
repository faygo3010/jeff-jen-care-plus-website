// Tiny key-value store behind the admin panel.
//
// Live: Upstash Redis (added in Vercel → Storage → Upstash for Redis), which
// sets KV_REST_API_URL / KV_REST_API_TOKEN. Talks to its REST API directly,
// so there's no client library to keep up to date.
// Local dev without those: a JSON file in .data/ (gitignored).
// Live without those: reads return nothing (the site falls back to the
// defaults in site-config.ts) and writes throw StoreNotConnected.
import fs from "node:fs/promises";
import path from "node:path";

const URL_ = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const REMOTE = Boolean(URL_ && TOKEN);
const LOCAL = !REMOTE && process.env.NODE_ENV !== "production";

/** Whether saving works here. The admin panel shows a warning when not. */
export const storeConnected = REMOTE || LOCAL;

export class StoreNotConnected extends Error {
  constructor() {
    super("Storage isn't connected. Add Upstash Redis in Vercel → Storage.");
  }
}

async function redis(command: string[]): Promise<unknown> {
  const res = await fetch(URL_!, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const json = (await res.json()) as { result?: unknown; error?: string };
  if (json.error) throw new Error(`Redis: ${json.error}`);
  return json.result;
}

// ---- local JSON file ------------------------------------------------------

type LocalData = { kv: Record<string, string>; hash: Record<string, Record<string, string>> };
const FILE = path.join(process.cwd(), ".data", "store.json");

async function readLocal(): Promise<LocalData> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return { kv: {}, hash: {} };
  }
}

async function writeLocal(data: LocalData) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(data, null, 2));
}

// ---- public API ------------------------------------------------------------

export async function getJSON<T>(key: string): Promise<T | null> {
  try {
    if (REMOTE) {
      const raw = (await redis(["GET", key])) as string | null;
      return raw ? (JSON.parse(raw) as T) : null;
    }
    if (LOCAL) {
      const raw = (await readLocal()).kv[key];
      return raw ? (JSON.parse(raw) as T) : null;
    }
  } catch (err) {
    // A storage hiccup should never take the public site down.
    console.error(`store.getJSON(${key}) failed:`, err);
  }
  return null;
}

export async function setJSON(key: string, value: unknown) {
  const raw = JSON.stringify(value);
  if (REMOTE) return void (await redis(["SET", key, raw]));
  if (LOCAL) {
    const data = await readLocal();
    data.kv[key] = raw;
    return writeLocal(data);
  }
  throw new StoreNotConnected();
}

export async function hashGetAll<T>(key: string): Promise<T[]> {
  if (REMOTE) {
    // HGETALL over REST comes back as a flat [field, value, field, value] list.
    const flat = ((await redis(["HGETALL", key])) as string[] | null) ?? [];
    return flat.filter((_, i) => i % 2 === 1).map((v) => JSON.parse(v) as T);
  }
  if (LOCAL) {
    const hash = (await readLocal()).hash[key] ?? {};
    return Object.values(hash).map((v) => JSON.parse(v) as T);
  }
  return [];
}

export async function hashGet<T>(key: string, field: string): Promise<T | null> {
  if (REMOTE) {
    const raw = (await redis(["HGET", key, field])) as string | null;
    return raw ? (JSON.parse(raw) as T) : null;
  }
  if (LOCAL) {
    const raw = (await readLocal()).hash[key]?.[field];
    return raw ? (JSON.parse(raw) as T) : null;
  }
  return null;
}

export async function hashSet(key: string, field: string, value: unknown) {
  const raw = JSON.stringify(value);
  if (REMOTE) return void (await redis(["HSET", key, field, raw]));
  if (LOCAL) {
    const data = await readLocal();
    (data.hash[key] ??= {})[field] = raw;
    return writeLocal(data);
  }
  throw new StoreNotConnected();
}

export async function hashDel(key: string, field: string) {
  if (REMOTE) return void (await redis(["HDEL", key, field]));
  if (LOCAL) {
    const data = await readLocal();
    delete data.hash[key]?.[field];
    return writeLocal(data);
  }
  throw new StoreNotConnected();
}
