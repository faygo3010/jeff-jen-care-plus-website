// Team & news photo uploads. Live: Vercel Blob (Vercel → Storage → Blob sets
// BLOB_READ_WRITE_TOKEN), public or private store. Local dev without it: public/uploads/ (gitignored).
import fs from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
export const MAX_UPLOAD_MB = 4;
/** Every uploaded photo lives under this Blob folder (the photo route only serves these). */
export const PHOTO_FOLDER = "work";

export async function saveImage(file: File, name: string): Promise<string> {
  const ext = TYPES[file.type];
  if (!ext) throw new Error("Images must be JPG, PNG or WebP.");
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
    throw new Error(`Images must be under ${MAX_UPLOAD_MB}MB.`);
  }
  const safe = name.toLowerCase().replace(/[^a-z0-9-]+/g, "-").slice(0, 40) || "image";

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const pathname = `${PHOTO_FOLDER}/${safe}.${ext}`;
    try {
      // Public store: the photo gets its own public URL.
      const blob = await put(pathname, file, {
        access: "public",
        addRandomSuffix: true,
        contentType: file.type,
      });
      return blob.url;
    } catch (err) {
      // Private store (Vercel's default for new Blob stores): save it
      // privately and show it through /api/photo, which reads it with the
      // store's token. Anything else is a real error.
      if (!/private/i.test(err instanceof Error ? err.message : String(err))) throw err;
      const blob = await put(pathname, file, {
        access: "private",
        addRandomSuffix: true,
        contentType: file.type,
      });
      return `/api/photo/${blob.pathname}`;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    const fileName = `${safe}-${Date.now().toString(36)}.${ext}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, fileName), Buffer.from(await file.arrayBuffer()));
    return `/uploads/${fileName}`;
  }

  throw new Error("Image storage isn't connected. Add Blob in Vercel → Storage.");
}
