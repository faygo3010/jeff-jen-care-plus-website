"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger direct children instead of animating the wrapper as one unit. */
  stagger?: boolean;
  delay?: number;
  as?: ElementType;
};

/**
 * Scroll-entry reveal. A short rise that moves in visible steps, so elements
 * snap in like sprites on a pixel grid. Transform/opacity only, nothing
 * that triggers layout.
 */
export default function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Anyone who asked for less motion gets the end state, immediately.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(stagger ? "[data-reveal-item]" : scope.current, {
          opacity: 1,
          y: 0,
          filter: "none",
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger
          ? scope.current?.querySelectorAll("[data-reveal-item]")
          : scope.current;
        if (!targets) return;

        gsap.fromTo(
          targets,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay,
            // Stepped, like a sprite snapping into place on a pixel grid.
            ease: "steps(5)",
            stagger: stagger ? 0.07 : 0,
            scrollTrigger: {
              trigger: scope.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <Tag ref={scope} className={className}>
      {children}
    </Tag>
  );
}
