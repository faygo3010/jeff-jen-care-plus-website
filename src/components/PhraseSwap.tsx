"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { SwappingText } from "@animate-ui/react/primitives/texts/swapping";
import { cn } from "@/lib/utils";

type Props = {
  text: string[];
  duration?: number;
  className?: string;
} & Omit<ComponentProps<"span">, "children">;

/**
 * Rotating phrase.
 * Desktop: Animate UI SwappingText (letters roll from one phrase to the next).
 * Phones: the whole phrase fades and slides instead. At phone size the
 * letter-rolling bunches into an unreadable clump mid-swap.
 * Always on its own line and never wrapping, so the heading can't jump.
 * Screen readers get every phrase once (the visible text is aria-hidden).
 */
export default function PhraseSwap({
  text,
  duration = 2400,
  className,
  ...rest
}: Props) {
  const [wide, setWide] = useState(false);
  const [i, setI] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Phone version: fade out, change phrase, fade in.
  useEffect(() => {
    if (wide || text.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let swap: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      setLeaving(true);
      swap = setTimeout(() => {
        setI((n) => (n + 1) % text.length);
        setLeaving(false);
      }, 320);
    }, duration);
    return () => {
      clearInterval(tick);
      clearTimeout(swap);
    };
  }, [wide, text.length, duration]);

  return (
    <span className="block whitespace-nowrap" {...rest}>
      {wide ? (
        <SwappingText text={text} duration={duration} className={className} />
      ) : (
        <>
          <span className="sr-only">{text.join(", ")}</span>
          <span
            aria-hidden="true"
            className={cn(
              "inline-block transition-[opacity,transform,filter] duration-300 ease-out",
              leaving
                ? "-translate-y-2 opacity-0 blur-[2px]"
                : "translate-y-0 opacity-100 blur-0",
              className,
            )}
          >
            {text[i]}
          </span>
        </>
      )}
    </span>
  );
}
