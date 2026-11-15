"use client";

// A thin reading-progress bar along the top of the page (Animate UI).
import {
  ScrollProgress,
  ScrollProgressProvider,
} from "@animate-ui/react/primitives/scroll-progress";

export default function ScrollProgressBar() {
  return (
    <ScrollProgressProvider global>
      <ScrollProgress
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-signal to-glow"
      />
    </ScrollProgressProvider>
  );
}
