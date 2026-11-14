import type { Metadata } from "next";
import { siteConfig, careHomeStaff } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import { ArrowLink, PageHeader, PixelTick, SectionHead } from "@/components/ui-bits";

export const metadata: Metadata = {
  title: "Staffing for care homes",
  description:
    "Nurses (RN, RMN, RN(LD)), health care assistants and support workers for nursing and residential homes across Oxfordshire. Ad hoc or regular cover, day or night, 7 days a week.",
  alternates: { canonical: "/care-homes" },
};

const points = [
  "Ad hoc shifts and regular cover",
  "Day or night, 7 days a week",
  "Nursing and residential homes across Oxfordshire",
  "Elderly care, dementia, learning disability and mental health",
  "Consistent staff placed with your home wherever possible",
];

export default function CareHomesPage() {
  return (
    <>
      <PageHeader
        title="Skilled nurses and care staff, when you need them"
        lede="We supply highly skilled nurses, health care assistants and support workers to nursing and residential care homes across Oxfordshire."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ArrowLink href={siteConfig.phoneHref} tone="glow" icon="phone">
            Book staff: {siteConfig.phone}
          </ArrowLink>
          <ArrowLink href={siteConfig.phone2Href} tone="light" icon="phone">
            {siteConfig.phone2}
          </ArrowLink>
        </div>
      </PageHeader>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHead title="Staff for every shift" />
            <ul className="mt-8 grid gap-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[16px] text-ink/80">
                  <PixelTick />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="grid gap-4 lg:col-span-7" stagger>
            {careHomeStaff.map((s) => (
              <div key={s.title} data-reveal-item className="bezel">
                <div className="bezel-core p-8">
                  <h3 className="font-display text-3xl text-ink">{s.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink/75">{s.body}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="warm-wash border-t border-hairline bg-paper-deep/50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHead title="Tell us what you need">
              <p className="mt-5 text-[16px] leading-relaxed text-ink/75">
                For urgent shifts, please call. For regular cover, send the
                details and we&apos;ll get back to you.
              </p>
            </SectionHead>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <QuoteForm defaultType="care-home" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
