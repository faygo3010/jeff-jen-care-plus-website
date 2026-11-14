import type { Metadata } from "next";
import { SwappingText } from "@animate-ui/react/primitives/texts/swapping";
import Image from "next/image";
import { Tilt, TiltContent } from "@animate-ui/react/primitives/effects/tilt";
import {
  siteConfig,
  promises,
  process,
  whoWeHelp,
  accreditations,
  careHomeStaff,
  faqs,
} from "@/lib/site-config";
import FaqAccordion from "@/components/FaqAccordion";
import HeroScrollVideo from "@/components/HeroScrollVideo";
import StepStory from "@/components/StepStory";
import { getContent } from "@/lib/content";
import OfferSection from "@/components/OfferSection";
import { LogoMark } from "@/components/Logo";
import Reveal from "@/components/Reveal";
import CqcWidget from "@/components/CqcWidget";
import {
  ArrowLink,
  PhoneIcon,
  PixelTick,
  SectionHead,
} from "@/components/ui-bits";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Simple line icons for the "why families choose us" cards.
const promiseIcons = [
  "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.5 19c.6-3 2.7-4.5 5.5-4.5s4.9 1.5 5.5 4.5m.5-4.3c.6-.1 1.3-.2 2-.2 2.8 0 4.9 1.5 5.5 4.5",
  "M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  "M12 3l7 3v5c0 4.5-2.9 8.3-7 10-4.1-1.7-7-5.5-7-10V6l7-3Zm-3 9 2.2 2.2L15.5 10",
  "M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
];

export default async function Home() {
  const { offer, services, work } = await getContent();
  const [lead, ...rest] = services;
  const featured = rest.slice(0, 3);

  return (
    <>
      {/* Hero: one continuous push-in on the front door. */}
      <HeroScrollVideo offer={offer} />
      {/* Intro: photo with a card floating over its corner */}
      <section className="relative overflow-x-clip px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-10 size-[32rem] rounded-full bg-glow/30 blur-3xl"
        />
        <Reveal className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Animate UI Tilt: the photo leans towards the pointer, the card floats above it */}
          <Tilt
            maxTilt={7}
            perspective={1100}
            className="relative lg:col-span-6"
          >
            <TiltContent
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="photo relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/images/hallway.jpg"
                  alt="A warm hallway looking through to a sunlit sitting room with an armchair"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div
                className="float-card absolute -bottom-8 left-4 right-4 p-5 sm:left-auto sm:-right-6 sm:w-72"
                style={{ transform: "translateZ(60px)" }}
              >
                <p className="font-display text-2xl leading-tight text-ink">
                  Day or night, 7 days a week
                </p>
                <a
                  href={siteConfig.phoneHref}
                  className="mt-3 inline-flex items-center gap-2 text-[16px] font-semibold text-signal"
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-signal text-snow">
                    <PhoneIcon />
                  </span>
                  {siteConfig.phone}
                </a>
              </div>
            </TiltContent>
          </Tilt>
          <div className="pt-6 lg:col-span-6 lg:pl-10 lg:pt-0">
            <h2 className="font-display text-balance text-4xl leading-[1.06] text-ink sm:text-5xl lg:text-[3.4rem]">
              Safe, compassionate and consistent care,{" "}
              {/* Animate UI SwappingText: letters roll from one phrase to the next */}
              <SwappingText
                text={[
                  "in your own home",
                  "from familiar faces",
                  "day or night",
                ]}
                data-cycle={JSON.stringify([
                  "in your own home",
                  "from familiar faces",
                  "day or night",
                ])}
                duration={2600}
                className="italic text-signal"
              />
            </h2>
            <div className="mt-7 space-y-5 text-pretty text-[17px] leading-relaxed text-ink/80">
              <p>
                We look after older people and people living with dementia in
                their own homes across Oxfordshire, and supply skilled nurses
                and support workers to nursing and residential care homes.
              </p>
              <p>
                We keep the same staff with each person wherever we can, so
                carers and clients build a good, trusting relationship.
              </p>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2">
              {whoWeHelp.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-hairline-strong bg-chalk px-3.5 py-1.5 text-[13px] text-ink/80 shadow-[0_6px_14px_-10px_rgba(16,33,30,0.5)]"
                >
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ArrowLink href="/about-us" tone="light">
                More about us
              </ArrowLink>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Services */}
      <section className="px-4 py-28 sm:px-6 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead title="Care that fits around your life" />
            <ArrowLink href="/services" tone="light">
              All {services.length} services
            </ArrowLink>
          </Reveal>

          <Reveal
            className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
            stagger
          >
            <div data-reveal-item className="md:col-span-3">
              <div className="bezel">
                <div className="bezel-core grid overflow-hidden md:grid-cols-2">
                  <div className="p-8 sm:p-12">
                    <p className="text-[14px] font-semibold text-clay">
                      Most asked for
                    </p>
                    <h3 className="font-display mt-2 text-4xl text-ink sm:text-5xl">
                      {lead.title}
                    </h3>
                    <p className="mt-5 text-pretty text-[16px] leading-relaxed text-ink/75">
                      {lead.description}
                    </p>
                    {lead.from && (
                      <p className="mt-4 text-[15px] font-semibold text-signal">
                        {lead.from}
                      </p>
                    )}
                    <ul className="mt-7 grid gap-3">
                      {lead.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/80"
                        >
                          <PixelTick />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative min-h-[18rem]">
                    <Image
                      src="/images/sitting-room.jpg"
                      alt="A cup of tea on a side table beside an armchair and a sunny window"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            {featured.map((service) => (
              <div key={service.slug} data-reveal-item>
                <div className="bezel lift h-full">
                  <div className="bezel-core relative flex h-full flex-col overflow-hidden p-8">
                    <h3 className="font-display relative text-2xl text-ink">
                      {service.title}
                    </h3>
                    <p className="relative mt-3 text-pretty text-[15px] leading-relaxed text-ink/75">
                      {service.description || service.lede}
                    </p>
                    {service.from && (
                      <p className="mt-auto pt-5 text-[14px] font-semibold text-signal">
                        {service.from}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* How it works: pinned scroll story (steps light up, photo changes) */}
      <StepStory
        title="Arranging care, step by step"
        steps={process.map((step, i) => ({
          ...step,
          ...[
            {
              image: "/images/front-door.jpg",
              alt: "The open front door of a red-brick house on a sunny morning",
            },
            {
              image: "/images/sitting-room.jpg",
              alt: "A cup of tea on a side table beside an armchair",
            },
            {
              image: "/images/dining-room.jpg",
              alt: "A dining table by a sunny window, ready to sit down and plan",
            },
            {
              image: "/images/hallway.jpg",
              alt: "A warm hallway leading to a sunlit sitting room",
            },
          ][i],
        }))}
      />

      {/* Why families choose us */}
      <section className="px-4 py-28 sm:px-6 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHead title="Care you can count on" />
          </Reveal>
          <Reveal className="mt-14 grid gap-5 sm:grid-cols-2" stagger>
            {promises.map((c, i) => (
              <div key={c.title} data-reveal-item>
                <div className="bezel lift h-full">
                  <div className="bezel-core flex h-full gap-5 p-8">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-signal text-snow shadow-[0_12px_22px_-10px_rgba(29,106,94,0.9)]">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d={promiseIcons[i % promiseIcons.length]} />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-display text-2xl leading-snug text-ink">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-pretty text-[15px] leading-relaxed text-ink/75">
                        {c.body}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Care homes */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="bezel">
            <div className="bezel-core grid gap-10 !bg-ink-soft p-8 sm:p-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h2 className="font-display text-balance text-4xl leading-[1.08] text-ink">
                  <SwappingText
                    text={["Nurses", "Care assistants", "Support workers"]}
                    data-cycle={JSON.stringify([
                      "Nurses",
                      "Care assistants",
                      "Support workers",
                    ])}
                    duration={2200}
                    className="italic text-signal"
                  />
                  <br />
                  for nursing and residential homes
                </h2>
                <p className="mt-5 max-w-md text-pretty text-[16px] leading-relaxed text-ink/80">
                  Ad hoc shifts or regular cover, day or night, 7 days a week,
                  across Oxfordshire. Elderly care, dementia and learning
                  disability.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ArrowLink
                    href={siteConfig.phoneHref}
                    tone="glow"
                    icon="phone"
                  >
                    Book staff: {siteConfig.phone}
                  </ArrowLink>
                  <ArrowLink href="/care-homes" tone="light">
                    Care home staffing
                  </ArrowLink>
                </div>
              </div>
              <ul className="grid gap-3 lg:col-span-6">
                {careHomeStaff.map((s, i) => (
                  <li
                    key={s.title}
                    className="float-card lift p-5"
                    style={{ marginLeft: `${i * 1.25}rem` }}
                  >
                    <p className="font-display text-xl text-ink">{s.title}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink/75">
                      {s.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Recruiting notice (editable in the admin panel) */}
      <OfferSection offer={offer} />

      {/* Team & news photos, only once real ones are added in the admin panel */}
      {work.length > 0 && (
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHead title="From the Jeff Jen team" />
            </Reveal>
            <Reveal
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              stagger
            >
              {work.map((item) => (
                <article
                  key={item.slug}
                  data-reveal-item
                  className="bezel lift"
                >
                  <div className="bezel-core h-full overflow-hidden">
                    {item.image && (
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={item.image}
                          alt={item.client}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {(item.sector || item.location) && (
                        <p className="text-[13px] font-semibold text-clay">
                          {[item.sector, item.location]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      )}
                      <h3 className="font-display mt-2 text-xl text-ink">
                        {item.client}
                      </h3>
                      {item.summary && (
                        <p className="mt-2 text-[14px] leading-relaxed text-ink/75">
                          {item.summary}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQ (VengeanceUI accordion, restyled), plus FAQPage data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
      <section className="warm-wash border-y border-hairline bg-paper-deep/50 px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHead title="Things families often ask">
              <p className="mt-5 text-[16px] leading-relaxed text-ink/75">
                Can&apos;t see your question? Call{" "}
                <a
                  href={siteConfig.phoneHref}
                  className="font-semibold text-signal underline underline-offset-4"
                >
                  {siteConfig.phone}
                </a>
                .
              </p>
            </SectionHead>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* Accreditations */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-3xl text-ink">
            Registered and accredited
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {accreditations.map((a) => (
              <li key={a.name} className="float-card lift p-7 text-center">
                <p className="font-display text-xl text-ink">{a.name}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/75">
                  {a.detail}
                </p>
              </li>
            ))}
          </ul>
          <CqcWidget className="mx-auto mt-8" />
        </Reveal>
      </section>

      {/* Closing CTA over the front-door photo */}
      <section className="px-4 pb-28 sm:px-6 lg:px-8 lg:pb-36">
        <Reveal className="mx-auto max-w-6xl">
          <div className="photo relative px-8 py-24 text-center sm:px-14 sm:py-32">
            <Image
              src="/images/front-door.jpg"
              alt=""
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-night via-night/80 to-night/45"
            />
            <div className="relative">
              <LogoMark size={56} className="mx-auto text-glow" />
              <h2 className="font-display mx-auto mt-8 max-w-2xl text-balance text-4xl leading-[1.08] text-snow sm:text-6xl">
                Let&apos;s talk about the care{" "}
                <SwappingText
                  text={["you need", "your family needs", "you deserve"]}
                  data-cycle={JSON.stringify([
                    "you need",
                    "your family needs",
                    "you deserve",
                  ])}
                  duration={2600}
                  className="italic text-glow"
                />
              </h2>
              <p className="mx-auto mt-6 max-w-md text-pretty text-[17px] leading-relaxed text-snow/85">
                Call us for a prompt response, or walk in to our office in
                Cowley. We&apos;re happy to talk things through.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <ArrowLink href={siteConfig.phoneHref} tone="glow" icon="phone">
                  Call {siteConfig.phone}
                </ArrowLink>
                <ArrowLink href="/contact" tone="dark">
                  Send a message
                </ArrowLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
