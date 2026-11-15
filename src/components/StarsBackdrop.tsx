"use client";

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
 * They show wherever a section has no solid background of its own.
 * Phones get far fewer, smaller, softer stars so it never feels busy.
 * Only the version for the current screen size runs (the other is hidden,
 * which pauses it). Reduced motion: they stay still.
 */
export default function StarsBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="size-full lg:hidden">
        <GravityStarsBackground
          {...SHARED}
          starsCount={40}
          starsSize={1.6}
          starsOpacity={0.45}
          glowIntensity={8}
        />
      </div>
      <div className="hidden size-full lg:block">
        <GravityStarsBackground
          {...SHARED}
          starsCount={140}
          starsSize={2.6}
          starsOpacity={0.75}
          glowIntensity={16}
        />
      </div>
    </div>
  );
}
