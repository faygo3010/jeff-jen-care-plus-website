import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { storeConnected } from "@/lib/store";
import { logout } from "@/app/admin/actions";
import { Button } from "@/components/admin/ui";
import AdminNav from "@/components/admin/AdminNav";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <>
      <header className="border-b border-hairline bg-chalk/90 px-4 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 py-4">
          <Link href="/admin" className="font-display text-xl text-ink">
            {siteConfig.shortName} <span className="text-signal">admin</span>
          </Link>
          <AdminNav />
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="font-pixel px-3 py-2 text-[10px] uppercase text-ink/70 hover:text-ink"
            >
              View site
            </Link>
            <form action={logout}>
              <Button tone="quiet" type="submit">
                Log out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-5xl flex-1 content-start gap-6 px-4 py-8 sm:px-6 sm:py-10">
        {!storeConnected && (
          <p className="border-2 border-destructive/60 bg-destructive/10 px-4 py-3 text-[14px] text-ink">
            Storage isn&apos;t connected, so nothing can be saved yet. In
            Vercel, open the project → Storage → add{" "}
            <strong>Upstash for Redis</strong> (free plan), then redeploy.
          </p>
        )}
        {children}
      </main>
    </>
  );
}
