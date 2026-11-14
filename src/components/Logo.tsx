import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * The Jeff Jen Care Plus mark, redrawn from the original logo: a house roof
 * (with chimney) held in two cupped hands, inside a circle.
 * Drawn in currentColor so it follows the text colour.
 */
export function LogoMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="24" cy="24" r="21.5" />
      {/* Roof and chimney */}
      <path d="M11 22 24 11l13 11" />
      <path d="M31 16.2V12.5h3v6.2" />
      {/* Two cupped hands meeting below the house */}
      <path d="M8.5 25.5c2.5 1 5 3.2 7 6.2 2 3 4.6 5.3 8.5 5.3" />
      <path d="M39.5 25.5c-2.5 1-5 3.2-7 6.2-2 3-4.6 5.3-8.5 5.3" />
      <path d="M18.5 33.5c1.6-1.6 3.3-2.3 5.5-2.3s3.9.7 5.5 2.3" />
    </svg>
  );
}

/** Mark beside the wordmark. */
export default function Logo({
  size = 32,
  textClassName,
  tone = "ink",
}: {
  size?: number;
  textClassName?: string;
  tone?: "ink" | "snow";
}) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <LogoMark
        size={size}
        className={cn("shrink-0", tone === "ink" ? "text-signal" : "text-snow")}
      />
      <span className={cn("font-display min-w-0 overflow-hidden pb-px leading-[1.15]", textClassName)}>
        {siteConfig.shortName}
      </span>
    </span>
  );
}
