// Serves Team & news photos saved in a PRIVATE Vercel Blob store.
// Only files inside the photo folder, and only images, are ever returned,
// so this can't be used to read anything else in the store.
import { get } from "@vercel/blob";
import { PHOTO_FOLDER } from "@/lib/uploads";

const IMAGE = /^image\/(jpeg|png|webp)$/;
const SAFE_NAME = /^[a-z0-9-]+\.(jpg|png|webp)$/i;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  // Exactly "<folder>/<file>", no "..", no other folders.
  if (path.length !== 2 || path[0] !== PHOTO_FOLDER || !SAFE_NAME.test(path[1])) {
    return new Response("Not found", { status: 404 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const result = await get(path.join("/"), { access: "private" });
    if (!result || result.statusCode !== 200 || !IMAGE.test(result.blob.contentType)) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType,
        // Uploaded names carry a random suffix, so a URL never changes content.
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("Photo route failed:", err);
    return new Response("Not found", { status: 404 });
  }
}
