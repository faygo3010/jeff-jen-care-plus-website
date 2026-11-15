"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string[];
  duration?: number;
  className?: string;
} & Omit<ComponentProps<"span">, "children">;

/**
 * Rotating phrase: the words of each phrase slide up and fade in one after
 * another, then drift out together before the next phrase arrives.
 *
 * Built from whole words (not single letters) so it renders the same in
 * every browser, never splits letters onto separate lines, and copies as
 * normal text. Always on its own line and never wrapping, so the heading
 * can't jump. Screen readers hear every phrase once. Reduced motion: the
 * first phrase, still.
 */
export default function PhraseSwap({ text, duration = 2600, className, ...rest }: Props) {
  const [i, setI] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (text.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let swap: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      setLeaving(true);
      swap = setTimeout(() => {
        setI((n) => (n + 1) % text.length);
        setLeaving(false);
      }, 380);
    }, duration);
    return () => {
      clearInterval(tick);
      clearTimeout(swap);
    };
  }, [text.length, duration]);

  const words = text[i].split(" ");

  return (
    <span className="block whitespace-nowrap" {...rest}>
      <span className="sr-only">{text.join(", ")}</span>
      <span
        aria-hidden="true"
        className={cn(
          "inline-block transition-[opacity,transform,filter] duration-300 ease-in",
          leaving ? "-translate-y-[0.25em] opacity-0 blur-[3px]" : "translate-y-0 opacity-100",
          className,
        )}
      >
        {/* key = phrase, so each new phrase replays the entrance */}
        <span key={i}>
          {words.map((w, n) => (
            <span
              key={n}
              className="phrase-word inline-block"
              style={{ animationDelay: `${n * 80}ms` }}
            >
              {w}
              {n < words.length - 1 ? " " : ""}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
