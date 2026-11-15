import { siteConfig } from "@/lib/site-config";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm rounded-[1.75rem] border border-hairline bg-chalk p-7 sm:p-9">
        <p className="font-pixel text-[11px] uppercase text-signal">
          {siteConfig.shortName}
        </p>
        <h1 className="font-display mt-3 text-3xl text-ink">Admin login</h1>
        <LoginForm />
      </div>
    </main>
  );
}
