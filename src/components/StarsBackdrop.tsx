"use client";

import { GravityStarsBackground } from "@/components/animate-ui/backgrounds/gravity-stars";

/**
 * Animate UI "gravity stars" across the WHOLE site: one screen-sized layer
 * fixed over every section (hero video, dark bands, photos, cards, footer),
 * so the background is consistent everywhere. Clicks pass straight through.
 * The stars drift slowly and gather towards the pointer. Their colour is a
 * mid teal that reads on both the cream and the dark sections. Reduced
 * motion: they stay still.
 */
export default function StarsBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[45]">
      <GravityStarsBackground
        trackWindow
        starsCount={140}
        starsSize={2.6}
        starsOpacity={0.75}
        glowIntensity={16}
        movementSpeed={0.25}
        mouseInfluence={160}
        gravityStrength={80}
        className="text-[#43a391]"
      />
    </div>
  );
}
