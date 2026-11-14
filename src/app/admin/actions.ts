"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath, updateTag } from "next/cache";
import {
  ADMIN_COOKIE,
  SESSION_SECONDS,
  createSessionToken,
  passwordMatches,
} from "@/lib/admin-token";
import { requireAdmin } from "@/lib/admin-auth";
import { CONTENT_KEY, CONTENT_TAG, readStoredContent, type Offer } from "@/lib/content";
import { ENQUIRY_STATUSES, deleteEnquiry, updateEnquiry, type EnquiryStatus } from "@/lib/enquiries";
import { setJSON } from "@/lib/store";
import { saveImage } from "@/lib/uploads";
import { services, work as defaultWork, type CaseStudy } from "@/lib/site-config";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/admin",
};

// ---- helpers ----------------------------------------------------------------

const text = (fd: FormData, name: string, max = 2000) => {
  const v = fd.get(name);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
};

/** One item per line, blank lines dropped. */
const lines = (fd: FormData, name: string) =>
  text(fd, name, 4000)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "project";

/** Runs a save; on failure, comes back to the page with the reason. */
async function attempt(back: string, fn: () => Promise<void>) {
  let error = "";
  try {
    await fn();
  } catch (err) {
    console.error(err);
    error = err instanceof Error ? err.message : "Something went wrong.";
  }
  // redirect() works by throwing, so it stays outside the try.
  redirect(error ? `${back}?error=${encodeURIComponent(error)}` : `${back}?saved=1`);
}

/** Rebuild the public pages so edits show straight away. */
function publish() {
  updateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}

// ---- login ------------------------------------------------------------------

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!process.env.ADMIN_PASSWORD) {
    return { error: "No admin password set yet. Add ADMIN_PASSWORD in Vercel's environment variables." };
  }
  if (!(await passwordMatches(text(formData, "password", 200)))) {
    await new Promise((r) => setTimeout(r, 800)); // slows down guessing
    return { error: "That password isn't right." };
  }
  (await cookies()).set(ADMIN_COOKIE, await createSessionToken(), {
    ...COOKIE_OPTIONS,
    maxAge: SESSION_SECONDS,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: COOKIE_OPTIONS.path });
  redirect("/admin/login");
}

// ---- enquiries --------------------------------------------------------------

export async function saveEnquiry(formData: FormData) {
  await requireAdmin();
  const status = text(formData, "status") as EnquiryStatus;
  const back = text(formData, "back") || "/admin";
  await attempt(back.split("?")[0], async () => {
    if (!ENQUIRY_STATUSES.includes(status)) throw new Error("Unknown status.");
    await updateEnquiry(text(formData, "id", 100), { status, notes: text(formData, "notes") });
  });
}

export async function removeEnquiry(formData: FormData) {
  await requireAdmin();
  await attempt("/admin", () => deleteEnquiry(text(formData, "id", 100)));
}

// ---- offer & prices ---------------------------------------------------------

export async function saveOffer(formData: FormData) {
  await requireAdmin();
  await attempt("/admin/content", async () => {
    const offer: Offer = {
      active: formData.get("active") === "on",
      label: text(formData, "label", 80),
      headline: text(formData, "headline", 80),
      summary: text(formData, "summary", 600),
      included: lines(formData, "included"),
      terms: text(formData, "terms", 600),
    };
    if (!offer.label || !offer.headline) throw new Error("The label and headline can't be empty.");
    const stored = await readStoredContent();
    await setJSON(CONTENT_KEY, { ...stored, offer });
    publish();
  });
}

export async function savePrices(formData: FormData) {
  await requireAdmin();
  await attempt("/admin/content", async () => {
    const prices: Record<string, string> = {};
    for (const s of services) {
      const value = text(formData, `price-${s.slug}`, 80);
      // Empty means "use the default from site-config".
      if (value && value !== s.from) prices[s.slug] = value;
    }
    const stored = await readStoredContent();
    await setJSON(CONTENT_KEY, { ...stored, prices });
    publish();
  });
}

export async function saveDetails(formData: FormData) {
  await requireAdmin();
  await attempt("/admin/content", async () => {
    const stored = await readStoredContent();
    // Empty means "use the default from site-config".
    await setJSON(CONTENT_KEY, {
      ...stored,
      details: { hoursShort: text(formData, "hoursShort", 120) || undefined },
    });
    publish();
  });
}

// ---- team & news (stored as `work`) --------------------------------------------------------------

export async function saveWork(formData: FormData) {
  await requireAdmin();
  await attempt("/admin/work", async () => {
    const client = text(formData, "client", 80);
    if (!client) throw new Error("The title can't be empty.");

    const stored = await readStoredContent();
    const list: CaseStudy[] = [...(stored.work ?? defaultWork)];
    const originalSlug = text(formData, "originalSlug", 100);
    const index = list.findIndex((w) => w.slug === originalSlug);

    let slug = index >= 0 ? originalSlug : slugify(client);
    if (index < 0) {
      // Keep slugs unique when two projects share a name.
      for (let n = 2; list.some((w) => w.slug === slug); n++) slug = `${slugify(client)}-${n}`;
    }

    let image = text(formData, "existingImage", 500);
    const file = formData.get("image");
    if (file instanceof File && file.size > 0) image = await saveImage(file, slug);

    const url = text(formData, "url", 300);
    if (url && !/^https?:\/\//.test(url)) throw new Error("The website link must start with https://");

    const study: CaseStudy = {
      slug,
      client,
      sector: text(formData, "sector", 80),
      location: text(formData, "location", 80),
      summary: text(formData, "summary", 1200),
      delivered: lines(formData, "delivered"),
      image,
      url: url || undefined,
    };

    if (index >= 0) list[index] = study;
    else list.unshift(study); // newest work first

    await setJSON(CONTENT_KEY, { ...stored, work: list });
    publish();
  });
}

export async function removeWork(formData: FormData) {
  await requireAdmin();
  await attempt("/admin/work", async () => {
    const slug = text(formData, "slug", 100);
    const stored = await readStoredContent();
    const list = (stored.work ?? defaultWork).filter((w) => w.slug !== slug);
    await setJSON(CONTENT_KEY, { ...stored, work: list });
    publish();
  });
}

export async function moveWork(formData: FormData) {
  await requireAdmin();
  await attempt("/admin/work", async () => {
    const slug = text(formData, "slug", 100);
    const dir = text(formData, "dir") === "up" ? -1 : 1;
    const stored = await readStoredContent();
    const list = [...(stored.work ?? defaultWork)];
    const i = list.findIndex((w) => w.slug === slug);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    await setJSON(CONTENT_KEY, { ...stored, work: list });
    publish();
  });
}
