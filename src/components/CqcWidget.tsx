import Script from "next/script";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * The official CQC rating widget. CQC-registered providers must display
 * their latest rating on their website once rated. It switches on as soon
 * as `cqcLocationId` is set in site-config.ts; until then it renders nothing.
 */
export default function CqcWidget({ className }: { className?: string }) {
  const id = siteConfig.cqcLocationId;
  if (!id) return null;
  return (
    <div className={cn("cqc-widget max-w-xs", className)}>
      <Script
        src={`https://www.cqc.org.uk/sites/all/modules/custom/cqc_widget/widget.js?data-id=${encodeURIComponent(id)}&data-host=https://www.cqc.org.uk&type=location`}
        strategy="lazyOnload"
      />
    </div>
  );
}
