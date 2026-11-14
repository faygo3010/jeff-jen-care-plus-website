// Signed admin session tokens. Web Crypto only, so this runs in the proxy
// as well as in server code. Format: "<expiry ms>.<HMAC of expiry>".

export const ADMIN_COOKIE = "lp_admin";
export const SESSION_SECONDS = 60 * 60 * 24 * 7; // a week

const enc = new TextEncoder();

// A separate secret is better, but falling back to the password means one
// env var is enough to get going. Changing either logs everyone out.
function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function toBase64Url(buf: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function hmac(data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toBase64Url(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

/** Compares without bailing early, so timing doesn't leak how close a guess was. */
export function safeEqual(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export async function createSessionToken() {
  const exp = String(Date.now() + SESSION_SECONDS * 1000);
  return `${exp}.${await hmac(exp)}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token || !secret()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await hmac(exp));
}

export async function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Hash both so the comparison is fixed-length.
  const [a, b] = await Promise.all(
    [input, expected].map(async (s) => toBase64Url(await crypto.subtle.digest("SHA-256", enc.encode(s)))),
  );
  return safeEqual(a, b);
}
