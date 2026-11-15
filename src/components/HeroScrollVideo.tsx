"use client";

import {
  TypingText,
  TypingTextCursor,
} from "@animate-ui/react/primitives/texts/typing";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/lib/site-config";
import type { Offer } from "@/lib/content";
import { ArrowLink } from "@/components/ui-bits";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DESKTOP_QUERY = "(min-width: 1024px)";

// Desktop: ONE continuous dolly move: up the path, through the front door,
// down the hallway, ending on the dining table. Scrubbed as a video.
const DESKTOP = {
  video: "/hero/hero-scrub-1080.mp4",
  poster: "/hero/start.jpg",
  end: "/hero/end.jpg",
  scrollLength: 5, // viewport-heights the pin lasts (15s clip)
  zoomScale: 1.7,
  zoomOrigin: "48% 62%", // the dining table in the last frame
};

// Phones: a centre crop of the same shot (door, hallway and table are all central),
// played as an image sequence on a canvas.
// Phones, iOS especially, seek video slowly while scrolling; drawing
// pre-decoded stills is what keeps it smooth.
const MOBILE = {
  frames: { dir: "/hero/m", count: 181, ext: "webp" },
  end: "/hero/mobile-end.jpg",
  scrollLength: 5,
  zoomScale: 1.6,
  zoomOrigin: "46% 62%", // the dining table
};

// Captions along the journey, timed to where the camera is.
// Desktop: the video runs over timeline 0-0.7 (door 0-0.47, hallway
// 0.47-0.7). Phones: frames run over 0-0.62.
const CAPTIONS = [
  { text: "Step inside", desktop: 0.16, mobile: 0.1 },
  { text: "The same familiar faces, every visit", desktop: 0.38, mobile: 0.28 },
  { text: "A care plan made around you", desktop: 0.58, mobile: 0.45 },
];
const CAPTION_HOLD = 0.13; // how long each caption stays fully visible

const frameSrc = (i: number) =>
  `${MOBILE.frames.dir}/${String(i + 1).padStart(3, "0")}.${MOBILE.frames.ext}`;

/**
 * Full-screen, pinned, scroll-scrubbed hero, then a smooth push-in on the
 * doorway. Desktop scrubs a video and zooms it. Phones scrub an image
 * sequence, then crossfade to the sharp final still and zoom that.
 *
 * Reduced motion gets the finished frame as a still, with the copy in place.
 */
export default function HeroScrollVideo({
  offer,
}: {
  offer: Pick<Offer, "active" | "label">;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stillRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const captionsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const still = stillRef.current;
      const copy = copyRef.current;
      const outro = outroRef.current;
      const hint = hintRef.current;
      if (!wrapper || !video || !canvas || !still || !copy || !outro) return;

      const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
      const cleanups: Array<() => void> = [];

      // ── Desktop: video ────────────────────────────────────────────────
      if (isDesktop) {
        // Some decoders won't seek an "untouched" video: a muted
        // play/pause unlocks it.
        const unlock = () => {
          const p = video.play();
          if (p) p.then(() => video.pause()).catch(() => {});
        };
        const refresh = () => ScrollTrigger.refresh();
        video.addEventListener("loadeddata", unlock, { once: true });
        video.addEventListener("loadedmetadata", refresh, { once: true });
        if (!video.getAttribute("src")) {
          video.poster = DESKTOP.poster;
          video.src = DESKTOP.video;
          video.load();
        }
        cleanups.push(() => {
          video.removeEventListener("loadeddata", unlock);
          video.removeEventListener("loadedmetadata", refresh);
        });
      }

      // ── Phones: image sequence on a canvas ────────────────────────────
      const frames: HTMLImageElement[] = [];
      let lastDrawn = -1;
      const ctx = canvas.getContext("2d");

      const draw = (target: number) => {
        if (!ctx) return;
        // Nearest frame that has finished loading, searching outwards, so
        // a slow connection shows a close frame rather than nothing.
        for (let d = 0; d < frames.length; d++) {
          for (const i of [target - d, target + d]) {
            const img = frames[i];
            if (img && img.complete && img.naturalWidth) {
              if (i === lastDrawn) return;
              if (canvas.width !== img.naturalWidth) {
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
              }
              ctx.drawImage(img, 0, 0);
              lastDrawn = i;
              return;
            }
          }
        }
      };

      const state = { frame: 0 };
      if (!isDesktop) {
        for (let i = 0; i < MOBILE.frames.count; i++) {
          const img = new Image();
          img.decoding = "async";
          img.src = frameSrc(i);
          if (i === 0) img.onload = () => draw(Math.round(state.frame));
          frames.push(img);
        }
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(outro, { opacity: 0, y: 26 });
        const captions = gsap.utils.toArray<HTMLElement>(
          "[data-caption]",
          captionsRef.current,
        );
        gsap.set(captions, { opacity: 0, y: 24, filter: "blur(6px)" });

        const cut = isDesktop ? DESKTOP : MOBILE;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => "+=" + window.innerHeight * cut.scrollLength,
            pin: true,
            // A little smoothing (0.4s) so it never snaps, but stays with your hand.
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });

        if (hint) tl.to(hint, { opacity: 0, duration: 0.04 }, 0.01);

        // Captions fade up, hold, then drift away as the camera moves on.
        captions.forEach((cap, i) => {
          const at = isDesktop ? CAPTIONS[i].desktop : CAPTIONS[i].mobile;
          tl.to(
            cap,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.04,
              ease: "power2.out",
            },
            at,
          );
          tl.to(
            cap,
            {
              opacity: 0,
              y: -24,
              filter: "blur(6px)",
              duration: 0.04,
              ease: "power2.in",
            },
            at + CAPTION_HOLD,
          );
        });

        if (isDesktop) {
          const duration = () => (video.duration || 15) - 0.05;
          gsap.set(video, { scale: 1, transformOrigin: DESKTOP.zoomOrigin });
          // Beats 1–2: one steady push-in towards the door.
          // Seek only when the previous seek has finished: asking the
          // decoder for a new frame mid-decode is what makes scrubbing lag.
          const seek = { t: 0 };
          let wanted = 0;
          const flush = () => {
            if (!video.seeking && Math.abs(video.currentTime - wanted) > 0.01) {
              video.currentTime = wanted;
            }
          };
          video.addEventListener("seeked", flush);
          cleanups.push(() => video.removeEventListener("seeked", flush));
          tl.fromTo(
            seek,
            { t: 0 },
            {
              t: duration,
              duration: 0.7,
              onUpdate: () => {
                wanted = seek.t;
                flush();
              },
            },
            0,
          );
          // The pitch clears early, before the camera moves far.
          tl.to(
            copy,
            { opacity: 0, y: -30, duration: 0.1, ease: "power2.in" },
            0.04,
          );
          // Beat 3: once the clip has finished, push in on the doorway.
          tl.to(
            video,
            { scale: DESKTOP.zoomScale, duration: 0.22, ease: "power1.inOut" },
            0.72,
          );
          tl.to(
            outro,
            { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
            0.9,
          );
        } else {
          gsap.set(still, {
            opacity: 0,
            scale: 1,
            transformOrigin: MOBILE.zoomOrigin,
          });
          // Beats 1–2: the same journey, as an image sequence.
          // The pitch sits along the bottom over the scrim.
          tl.to(
            state,
            {
              frame: MOBILE.frames.count - 1,
              duration: 0.62,
              onUpdate: () => draw(Math.round(state.frame)),
            },
            0,
          );
          // Beat 3: hand over to the sharp final still, then push in.
          tl.to(still, { opacity: 1, duration: 0.03 }, 0.62);
          tl.to(
            still,
            { scale: MOBILE.zoomScale, duration: 0.23, ease: "power1.inOut" },
            0.65,
          );
          tl.to(
            copy,
            { opacity: 0, y: -20, duration: 0.06, ease: "power2.in" },
            0.03,
          );
          tl.to(
            outro,
            { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
            0.88,
          );
        }

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(copy, { opacity: 1, y: 0 });
        gsap.set(outro, { opacity: 0 });
        if (hint) gsap.set(hint, { opacity: 0 });
        if (captionsRef.current)
          gsap.set(captionsRef.current, { display: "none" });
      });

      return () => {
        mm.revert();
        cleanups.forEach((fn) => fn());
        frames.forEach((img) => (img.onload = null));
      };
    },
    { scope: wrapperRef },
  );

  return (
    <div
      ref={wrapperRef}
      data-hero
      className="relative h-[100svh] overflow-hidden bg-night"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Phones: a box with the portrait source's exact proportions, at
            least as wide and as tall as the screen, top-aligned and running
            up behind the floating menu. Desktop: plain full-bleed. */}
        <div className="absolute left-1/2 top-0 aspect-[536/716] w-[max(100%,calc(100svh*0.7486))] -translate-x-1/2 lg:inset-0 lg:aspect-auto lg:h-full lg:w-full lg:translate-x-0">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:hidden lg:block"
          />
          {/* Phones: the scroll-scrubbed image sequence. */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full motion-reduce:hidden lg:hidden"
          />
          {/* Phones only: the sharp final frame the zoom happens on. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={stillRef}
            src={MOBILE.end}
            loading="lazy"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-0 motion-reduce:hidden lg:hidden"
          />
          {/* Reduced motion: the finished frame for each layout. */}
          <picture className="hidden motion-reduce:block">
            <source media={DESKTOP_QUERY} srcSet={DESKTOP.end} />
            <img
              src={MOBILE.end}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        </div>
      </div>

      {/* Scrim: the door and the tea sit centre-frame, so the copy is
          seated along the bottom edge over a dark gradient. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/90 via-night/60 via-30% to-transparent to-60% lg:from-night/90 lg:via-night/45 lg:via-40% lg:to-night/10 lg:to-100%"
      />

      <div
        ref={copyRef}
        className="absolute inset-0 flex items-end px-5 pb-10 sm:px-8 lg:pb-14"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              {offer.active && (
                <a
                  href="#offer"
                  className="text-[15px] font-medium text-snow/90 underline decoration-glow/70 underline-offset-4 hover:text-glow [@media(max-height:720px)_and_(max-width:1023px)]:hidden"
                >
                  {offer.label} →
                </a>
              )}
              <h1 className="font-display mt-5 text-balance text-[2.5rem] leading-[1] text-snow sm:text-6xl lg:mt-6 lg:text-[4.4rem] [@media(max-height:720px)_and_(max-width:1023px)]:mt-0 [@media(max-height:720px)_and_(max-width:1023px)]:text-[2.1rem]">
                Safe, compassionate care,
                {/* Animate UI TypingText: types each phrase, then rewrites it */}
                {/* Own line, one line tall even when empty, so nothing jumps while typing */}
                <span className="block min-h-[1em] whitespace-nowrap">
                  <TypingText
                    text={["at home", "day or night", "7 days a week"]}
                    data-cycle={JSON.stringify([
                      "at home",
                      "day or night",
                      "7 days a week",
                    ])}
                    loop
                    holdDelay={2200}
                    className="italic text-glow"
                  >
                    <TypingTextCursor className="ml-[0.06em] inline-block h-[0.82em] w-[0.06em] min-w-[3px] translate-y-[0.1em] rounded-full bg-glow" />
                  </TypingText>
                </span>
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="hidden max-w-md text-pretty text-base leading-relaxed text-snow/85 sm:block">
                Consistent carers for older people and people living with
                dementia, across Oxford and Oxfordshire. Day or night, 7 days a
                week.
              </p>
              <div className="flex flex-wrap gap-3 lg:mt-7">
                <ArrowLink href={siteConfig.phoneHref} tone="glow" icon="phone">
                  Call {siteConfig.phone}
                </ArrowLink>
                <a
                  href="/services"
                  className="inline-flex items-center rounded-full border border-snow/35 bg-night/55 px-5 py-2.5 text-[15px] font-semibold text-snow transition-colors duration-150 hover:border-glow hover:text-glow"
                >
                  Our services
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey captions, shown one at a time while the camera moves. */}
      <div
        ref={captionsRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-14 sm:px-8 lg:pb-20"
      >
        <div className="relative mx-auto max-w-6xl">
          {CAPTIONS.map((c, i) => (
            <p
              key={c.text}
              data-caption
              className="font-display absolute bottom-0 left-0 max-w-xl text-balance text-[1.9rem] leading-[1.08] text-snow opacity-0 sm:text-4xl lg:max-w-4xl lg:text-7xl lg:leading-[1.02] xl:text-[5.5rem] 2xl:text-[6.5rem]"
            >
              <span className="mb-3 block font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-glow lg:mb-5 lg:text-[15px] xl:text-[17px]">
                {["The front door", "The hallway", "The dining room"][i]}
              </span>
              {c.text}
            </p>
          ))}
        </div>
      </div>

      {/* Payoff, over the finished frame. */}
      <div
        ref={outroRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-12 opacity-0 sm:px-8 lg:pb-16"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-display max-w-md text-balance text-[1.9rem] leading-[1.06] text-snow sm:text-4xl lg:max-w-3xl lg:text-7xl lg:leading-[1.02] xl:text-[5.5rem] 2xl:text-[6.5rem]">
            Come in. Feel at home,{" "}
            <span className="italic text-glow">with familiar faces</span>
          </p>
          <p className="font-pixel mt-3 max-w-[15rem] text-[11px] uppercase text-snow/75 sm:max-w-none lg:mt-5 lg:text-[14px] xl:text-[16px]">
            Consistent carers · Day or night · 7 days a week
          </p>
        </div>
      </div>

      <div
        ref={hintRef}
        className="pointer-events-none absolute right-5 top-28 hidden items-center gap-2 font-pixel text-[11px] uppercase text-snow/80 sm:right-8 lg:flex"
      >
        Scroll
        <span className="h-0.5 w-8 bg-gradient-to-r from-snow/50 to-transparent" />
      </div>
    </div>
  );
}
