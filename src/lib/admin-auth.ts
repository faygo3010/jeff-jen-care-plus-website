import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-token";

export async function isAdmin() {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

/**
 * Every admin page and action calls this. The proxy already bounces
 * logged-out visitors, but server actions can be called directly, so each
 * one checks again.
 */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
