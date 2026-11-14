// Team & news photo uploads. Live: Vercel Blob (Vercel → Storage → Blob sets
// BLOB_READ_WRITE_TOKEN). Local dev without it: public/uploads/ (gitignored).
import fs from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
export const MAX_UPLOAD_MB = 4;

export async function saveImage(file: File, name: string): Promise<string> {
  const ext = TYPES[file.type];
  if (!ext) throw new Error("Images must be JPG, PNG or WebP.");
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
    throw new Error(`Images must be under ${MAX_UPLOAD_MB}MB.`);
  }
  const safe = name.toLowerCase().replace(/[^a-z0-9-]+/g, "-").slice(0, 40) || "image";

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`work/${safe}.${ext}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });
    return blob.url;
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
