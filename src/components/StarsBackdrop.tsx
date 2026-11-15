"use client";

import { useEffect, useState } from "react";
import { GravityStarsBackground } from "@/components/animate-ui/backgrounds/gravity-stars";

const SHARED = {
  trackWindow: true,
  glowAnimation: "ease" as const,
  movementSpeed: 0.25,
  mouseInfluence: 160,
  gravityStrength: 80,
  className: "text-[#43a391]",
};

/**
 * Animate UI "gravity stars" BEHIND the page: a screen-sized layer fixed at
 * the very back, so text, cards, photos and buttons all sit on top of it.
 *
 * Kept light so scrolling stays smooth:
 * - paused while the hero video is on screen (it covers the stars anyway)
 * - phones: 40 small stars, no glow (glow is the costly part of drawing),
 *   and a lower canvas resolution
 * - only the version for the current screen size runs; the hidden one is
 *   paused automatically
 * Reduced motion: they stay still.
 */
export default function StarsBackdrop() {
  const [heroOnScreen, setHeroOnScreen] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) =>
      setHeroOnScreen(entry.isIntersecting),
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="size-full lg:hidden">
        <GravityStarsBackground
          {...SHARED}
          paused={heroOnScreen}
          maxDpr={1.5}
          starsCount={40}
          starsSize={1.6}
          starsOpacity={0.5}
          glowIntensity={0}
        />
      </div>
      <div className="hidden size-full lg:block">
        <GravityStarsBackground
          {...SHARED}
          paused={heroOnScreen}
          maxDpr={1.5}
          starsCount={140}
          starsSize={2.6}
          starsOpacity={0.75}
          glowIntensity={10}
        />
      </div>
    </div>
  );
}
