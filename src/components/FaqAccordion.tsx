"use client";

// Adapted from VengeanceUI's `faq-accordion` (MIT, github.com/Ashutoshx7/VengeanceUI):
// recoloured to the site tokens, given aria-controls, and one item open at a time.
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FaqItem = { question: string; answer: ReactNode };

export default function FaqAccordion({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  const [active, setActive] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className={cn("flex w-full flex-col gap-3", className)}>
      {items.map((item, i) => {
        const open = active === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <li
            key={item.question}
            className={cn(
              "overflow-hidden rounded-[1.25rem] border border-hairline bg-chalk transition-shadow duration-300",
              open && "shadow-[0_12px_32px_-18px_rgba(27,51,47,0.35)]",
            )}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setActive(open ? null : i)}
              className={cn(
                "relative flex min-h-[64px] w-full items-center border-l-[6px] py-4 pl-14 pr-12 text-left text-[16px] transition-colors duration-200 md:text-[17px]",
                open
                  ? "border-l-signal font-semibold text-ink"
                  : "border-l-hairline-strong text-ink/80 hover:border-l-signal/60 hover:text-ink",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-5 top-1/2 -translate-y-1/2 leading-none transition-all duration-200",
                  open ? "text-[30px] text-signal" : "text-[24px] text-ink/70",
                )}
              >
                {open ? "−" : "+"}
              </span>
              <span className="font-display text-[18px] md:text-[19px]">{item.question}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute right-6 block size-2 border-r-[2.5px] border-t-[2.5px] transition-transform duration-200",
                  open ? "-rotate-45 border-signal" : "rotate-[135deg] border-ink/60",
                )}
              />
            </button>
            <div
              id={panelId}
              role="region"
              inert={!open}
              className={cn(
                "grid border-l-[6px] transition-all duration-300 ease-in-out",
                open ? "grid-rows-[1fr] border-l-signal" : "grid-rows-[0fr] border-l-hairline-strong",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-14 pb-6 pt-1 text-[15px] leading-relaxed text-ink/80 md:text-[16px]">
                  {item.answer}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
