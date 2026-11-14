"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import { PhoneIcon } from "@/components/ui-bits";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);

  // Lock the page behind the overlay while it's up.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The overlay is mounted only while open, so nothing has to fight over its
  // visibility. GSAP is left to do the one thing it's good for here: the
  // staggered entrance of the links.
  useGSAP(
    () => {
      if (!open || !overlay.current) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return;

      gsap.fromTo(
        overlay.current.querySelectorAll("[data-nav-item]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.05,
        },
      );
    },
    { dependencies: [open], scope: overlay },
  );

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5">
        <div className="pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-6 rounded-[var(--round-bar)] border border-hairline-strong bg-paper/85 py-1.5 pl-3 pr-1.5 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_18px_40px_-18px_rgba(16,33,30,0.55)] backdrop-blur-xl">
          <Link
            href="/"
            className="flex min-w-0 shrink items-center"
            onClick={() => setOpen(false)}
          >
            <Logo
              size={30}
              textClassName="text-[17px] sm:text-xl text-ink truncate"
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {siteConfig.nav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] font-medium text-ink/75 transition-colors duration-150 hover:text-signal"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.phoneHref}
              className="btn-pixel group hidden items-center gap-2 bg-signal py-2 pl-4 pr-4 text-[14px] font-semibold text-snow sm:inline-flex"
            >
              <PhoneIcon />
              {siteConfig.phone}
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative flex size-10 items-center justify-center rounded-full border border-hairline-strong lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-0.5 w-4 bg-ink transition-transform duration-150 ",
                  open ? "translate-y-0 rotate-45" : "-translate-y-1",
                )}
              />
              <span
                className={cn(
                  "absolute h-0.5 w-4 bg-ink transition-transform duration-150 ",
                  open ? "translate-y-0 -rotate-45" : "translate-y-1",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-bleed overlay, mounted only while open */}
      {open && (
        <div
          ref={overlay}
          className="warm-wash fixed inset-0 z-40 bg-paper/95 backdrop-blur-2xl lg:hidden"
        >
          <nav className="flex h-full flex-col justify-center gap-1 px-8">
            {siteConfig.nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                data-nav-item
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 border-b border-hairline py-3.5"
              >
                <span className="font-pixel text-[11px] tabular-nums text-clay">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-3xl text-ink transition-transform duration-150  group-hover:translate-x-1">
                  {item.label}
                </span>
              </Link>
            ))}
            <a
              href={siteConfig.phoneHref}
              data-nav-item
              className="btn-pixel mt-8 inline-flex items-center justify-center gap-2 bg-signal px-6 py-4 text-base font-semibold text-snow"
            >
              <PhoneIcon />
              Call {siteConfig.phone}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
