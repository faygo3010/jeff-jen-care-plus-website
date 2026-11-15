import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getContent } from "@/lib/content";
import Reveal from "@/components/Reveal";
import {
  ArrowLink,
  PageHeader,
  PixelTick,
  SectionHead,
} from "@/components/ui-bits";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Home care, dementia care, elderly care, end of life care, mental health, learning disability and autism support, supported living, and nurses and care staff for care homes, across Oxford and Oxfordshire.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const { services } = await getContent();
  const main = services.slice(0, 4);
  const more = services.slice(4);

  return (
    <>
      <PageHeader
        title="Care and support, shaped around each person"
        lede={`From a few visits a week to round-the-clock support, across ${siteConfig.serviceArea}. Not sure what you need? Call us and we'll talk it through.`}
      >
        <div className="mt-8">
          <ArrowLink href={siteConfig.phoneHref} tone="glow" icon="phone">
            Call {siteConfig.phone}
          </ArrowLink>
        </div>
      </PageHeader>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2" stagger>
          {main.map((s) => (
            <article
              key={s.slug}
              id={s.slug}
              data-reveal-item
              className="bezel scroll-mt-28"
            >
              <div className="bezel-core flex h-full flex-col p-8 sm:p-10">
                <h2 className="font-display text-3xl text-ink">{s.title}</h2>
                <p className="mt-2 text-[16px] font-medium text-signal">
                  {s.lede}
                </p>
                <p className="mt-4 text-pretty text-[15px] leading-relaxed text-ink/75">
                  {s.description}
                </p>
                {s.features.length > 0 && (
                  <ul className="mt-6 grid gap-2.5">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-[15px] text-ink/80"
                      >
                        <PixelTick />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                {s.from && (
                  <p className="mt-auto pt-6 text-[15px] font-semibold text-ink">
                    {s.from}
                  </p>
                )}
                {s.slug === "care-home-staffing" && (
                  <div className="mt-auto pt-6">
                    <ArrowLink href="/care-homes" tone="light">
                      Staffing for care homes
                    </ArrowLink>
                  </div>
                )}
              </div>
            </article>
          ))}
        </Reveal>
      </section>

      <section className="warm-wash border-y border-hairline bg-paper-deep/50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHead title="Specialist and flexible support" />
          </Reveal>
          <Reveal
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            stagger
          >
            {more.map((s) => (
              <article
                key={s.slug}
                id={s.slug}
                data-reveal-item
                className="bezel scroll-mt-28"
              >
                <div className="bezel-core flex h-full flex-col p-7">
                  <h3 className="font-display text-2xl text-ink">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                    {s.lede}
                  </p>
                  {s.from && (
                    <p className="mt-auto pt-5 text-[14px] font-semibold text-signal">
                      {s.from}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-balance text-4xl leading-tight text-ink sm:text-5xl">
            Talk to us about what you need
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink/75">
            Every person is different. Call for a prompt response, or send us a
            message and we&apos;ll get back to you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ArrowLink href={siteConfig.phoneHref} tone="glow" icon="phone">
              Call {siteConfig.phone}
            </ArrowLink>
            <ArrowLink href="/contact" tone="light">
              Send a message
            </ArrowLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
