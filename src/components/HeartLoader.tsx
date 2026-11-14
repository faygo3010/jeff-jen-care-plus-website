import { cn } from "@/lib/utils";

// A small beating heart, shown while the form sends.
// Based on the heart loader by FWDJc on Uiverse.io (MIT,
// github.com/uiverse-io/galaxy), scaled down and recoloured.
export default function HeartLoader({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("heart-loader", className)} />;
}
