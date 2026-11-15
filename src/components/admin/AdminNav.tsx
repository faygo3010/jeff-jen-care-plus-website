"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Enquiries" },
  { href: "/admin/content", label: "Notice, prices & hours" },
  { href: "/admin/work", label: "Team & news" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-1">
      {LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={cn(
            "font-pixel rounded-[var(--round-inner)] px-3 py-2 text-[10px] uppercase transition-colors",
            pathname === l.href
              ? "bg-signal/15 text-ink"
              : "text-ink/70 hover:text-ink",
          )}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
