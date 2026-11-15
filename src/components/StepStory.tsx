"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type StoryStep = {
  title: string;
  body: string;
  image: string;
  alt: string;
};

/**
 * "How it works" as a scroll story.
 * Desktop: the section pins; scrolling lights up each step in turn, fills a
 * teal line beside them and cross-fades a matching photo.
 * Phones: no pin (it feels jumpy on touch). Each step lights up as it
 * reaches the middle of the screen and the line fills with your scroll.
 * Reduced motion: everything shown at once, no pin, first photo only.
 */
export default function StepStory({
  title,
  steps,
}: {
  title: string;
  steps: StoryStep[];
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-step]", el);
      const photos = gsap.utils.toArray<HTMLElement>("[data-photo]", el);
      const fill = el.querySelector<HTMLElement>("[data-fill]");
      const counter = el.querySelector<HTMLElement>("[data-counter]");
      if (!fill || !items.length) return;

      // Highlights step `n` and its photo. Called as the scroll position moves.
      let current = -1;
      const activate = (n: number) => {
        if (n === current) return;
        current = n;
        items.forEach((item, i) => item.classList.toggle("is-active", i <= n));
        items.forEach((item, i) =>
          item.classList.toggle("is-current", i === n),
        );
        photos.forEach((p, i) =>
          gsap.to(p, {
            opacity: i === n ? 1 : 0,
            scale: i === n ? 1 : 1.06,
            duration: 0.7,
            ease: "power2.out",
          }),
        );
        if (counter) counter.textContent = String(n + 1).padStart(2, "0");
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        items.forEach((item) => item.classList.add("is-active"));
        gsap.set(fill, { scaleY: 1 });
        photos.forEach((p, i) => gsap.set(p, { opacity: i === 0 ? 1 : 0 }));
      });

      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
        () => {
          activate(0);
          const st = ScrollTrigger.create({
            trigger: el,
            start: "top top",
            end: () => "+=" + window.innerHeight * (steps.length * 0.45),
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => {
              gsap.set(fill, { scaleY: self.progress });
              activate(
                Math.min(
                  steps.length - 1,
                  // A step lights up as the line reaches its dot.
                  Math.floor(self.progress * (steps.length - 1) + 0.08),
                ),
              );
            },
          });
          return () => st.kill();
        },
      );

      mm.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 1023px)",
        () => {
          activate(0);
          const line = ScrollTrigger.create({
            trigger: el.querySelector("[data-list]"),
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.4,
            onUpdate: (self) => gsap.set(fill, { scaleY: self.progress }),
          });
          const each = items.map((item, i) =>
            ScrollTrigger.create({
              trigger: item,
              start: "top 60%",
              end: "bottom 60%",
              onEnter: () => activate(i),
              onEnterBack: () => activate(i),
            }),
          );
          return () => {
            line.kill();
            each.forEach((t) => t.kill());
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="step-story relative overflow-hidden bg-night px-4 py-24 text-snow sm:px-6 lg:flex lg:min-h-[100svh] lg:items-center lg:px-8 lg:py-0"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[36rem]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--signal) 50%, transparent), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-40 size-[30rem]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--glow) 25%, transparent), transparent)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="font-display max-w-md text-balance text-4xl leading-[1.05] text-snow sm:text-5xl">
              {title}
            </h2>
            <p
              aria-hidden="true"
              className="font-display hidden text-5xl text-glow lg:block"
            >
              <span data-counter>01</span>
              <span className="text-snow/40">
                /{String(steps.length).padStart(2, "0")}
              </span>
            </p>
          </div>

          <ol data-list className="relative mt-12 grid gap-2 pl-10">
            {/* Track and the teal fill that grows with your scroll */}
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[15px] top-6 w-[2px] rounded-full bg-snow/15"
            />
            <span
              aria-hidden="true"
              data-fill
              className="absolute bottom-6 left-[15px] top-6 w-[2px] origin-top scale-y-0 rounded-full bg-gradient-to-b from-glow to-signal"
            />
            {steps.map((step, i) => (
              <li
                key={step.title}
                data-step
                className="step-item relative rounded-2xl py-4 pl-4 pr-4"
              >
                <span className="step-dot font-display absolute -left-10 top-4 flex size-8 items-center justify-center rounded-full text-[15px]">
                  {i + 1}
                </span>
                <h3 className="font-display text-2xl">{step.title}</h3>
                <p className="step-body mt-2 max-w-md text-pretty text-[15px] leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative lg:col-span-6">
          <div className="photo relative aspect-[4/3] lg:aspect-[4/5]">
            {steps.map((step, i) => (
              <div
                key={step.image}
                data-photo
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            ))}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-night/50 to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
