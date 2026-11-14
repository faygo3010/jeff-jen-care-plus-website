import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-token";

// One address for the whole site. The other form of the domain (www vs
// bare) and Vercel's *.vercel.app address serve the same pages, which search
// engines can treat as duplicates; send them permanently to siteConfig.url.
// Works whichever form siteConfig.url uses.
const CANONICAL_HOST = new URL(siteConfig.url).host;
const BARE_HOST = CANONICAL_HOST.replace(/^www\./, "");
const ALIASES = new Set([BARE_HOST, `www.${BARE_HOST}`]);
ALIASES.delete(CANONICAL_HOST);

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isDuplicate = ALIASES.has(host) || host.endsWith(".vercel.app");

  if (isDuplicate) {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.host = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  // Admin panel: logged-out visitors go to the login page. Each admin page
  // and action checks the session again (see src/lib/admin-auth.ts).
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const ok = await verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
    if (!ok) return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Skip static assets and Next internals; no point redirecting those.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
