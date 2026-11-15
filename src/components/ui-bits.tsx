import Link from "next/link";
import { Shine } from "@animate-ui/react/primitives/effects/shine";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Arrow (→). Name kept from the template so imports stay the same. */
export function PixelArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-3.5", className)}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/** Tick, for lists. */
export function PixelTick({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("mt-1 size-3.5 shrink-0 text-signal", className)}
    >
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}

/** Phone handset icon. */
export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-4", className)}
    >
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
    </svg>
  );
}

const TONES = {
  dark: "bg-snow text-night",
  light: "bg-chalk text-ink border border-hairline-strong",
  glow: "bg-signal text-snow",
};
const WELLS = {
  dark: "bg-night/10",
  light: "bg-ink/10",
  glow: "bg-snow/15",
};

/** Pill CTA with an arrow well. Works for internal links and tel:/mailto:. */
export function ArrowLink({
  href,
  children,
  tone = "dark",
  className,
  icon = "arrow",
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light" | "glow";
  className?: string;
  icon?: "arrow" | "phone";
}) {
  const classes = cn(
    "btn-pixel group inline-flex items-center gap-3 py-2 pl-5 pr-2 text-[15px] font-semibold",
    TONES[tone],
    className,
  );
  const inner = (
    <>
      {children}
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5",
          WELLS[tone],
        )}
      >
        {icon === "phone" ? <PhoneIcon /> : <PixelArrow />}
      </span>
    </>
  );
  const link =
    /^(tel:|mailto:|https?:)/.test(href) || href.endsWith(".pdf") ? (
      <a href={href} className={classes}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  // Primary buttons get a soft light sweep on hover (Animate UI Shine).
  if (tone !== "glow") return link;
  return (
    <Shine asChild enableOnHover color="#ffffff" opacity={0.28} duration={900}>
      {link}
    </Shine>
  );
}

export function PageHeader({
  title,
  lede,
  children,
}: {
  title: ReactNode;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-4 pt-40 sm:px-6 lg:px-8">
      {/* Soft depth: two blurred colour fields behind the heading */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 size-[34rem]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--glow) 45%, transparent), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 size-[28rem]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--signal) 25%, transparent), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-6xl border-b border-hairline pb-16">
        <h1 className="font-display max-w-3xl text-balance text-5xl leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink/75">
            {lede}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

/** Section heading block used across pages. */
export function SectionHead({
  title,
  children,
  className,
  tone = "ink",
}: {
  title: string;
  children?: ReactNode;
  className?: string;
  tone?: "ink" | "snow";
}) {
  return (
    <div className={className}>
      <h2
        className={cn(
          "font-display max-w-2xl text-balance text-4xl leading-[1.05] sm:text-5xl",
          tone === "ink" ? "text-ink" : "text-snow",
        )}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
