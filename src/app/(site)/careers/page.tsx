import type { Metadata } from "next";
import { SwappingText } from "@animate-ui/react/primitives/texts/swapping";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import {
  ArrowLink,
  PageHeader,
  PixelTick,
  SectionHead,
} from "@/components/ui-bits";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Care jobs in Oxford and Oxfordshire: health care assistants, support workers, home carers and nurses (RN, RMN, RN(LD)). Full-time, part-time and ad hoc hours with Jeff Jen Care Plus.",
  alternates: { canonical: "/careers" },
};

const roles = [
  {
    title: "Health Care Assistants",
    body: "Supporting residents in nursing and residential homes.",
  },
  {
    title: "Support Workers",
    body: "Supporting people with dementia, learning disabilities and mental health needs.",
  },
  {
    title: "Home carers",
    body: "Visiting clients in their own homes. Preferably with your own transport.",
  },
  { title: "Nurses", body: "All specialities: RN, RMN and RN(LD)." },
];

const steps = [
  "Download and fill in our application form, or call us for one",
  "Bring it in to our Cowley office, or call to talk it through",
  "We follow a robust, thorough recruitment process in line with legal standards",
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            We&apos;re hiring{" "}
            <SwappingText
              text={["carers", "nurses", "support workers", "care assistants"]}
              data-cycle={JSON.stringify(["carers", "nurses", "support workers", "care assistants"])}
              duration={2200}
              className="italic text-signal"
            />
          </>
        }
        lede="Looking for a career in care, part-time hours, or ad hoc shifts? Get in touch. We can help."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ArrowLink href={siteConfig.applicationFormHref} tone="glow">
            Download application form
          </ArrowLink>
          <ArrowLink href={siteConfig.phoneHref} tone="light" icon="phone">
            Call {siteConfig.phone}
          </ArrowLink>
        </div>
      </PageHeader>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHead title="Roles we're hiring for" />
          </Reveal>
          <Reveal className="mt-12 grid gap-4 sm:grid-cols-2" stagger>
            {roles.map((r) => (
              <div key={r.title} data-reveal-item className="bezel">
                <div className="bezel-core h-full p-8">
                  <h3 className="font-display text-2xl text-ink">{r.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                    {r.body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="warm-wash border-y border-hairline bg-paper-deep/50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <SectionHead title="Everyone gets a fair chance" />
            <p className="mt-6 text-pretty text-[16px] leading-relaxed text-ink/80">
              We comply with equal opportunity law and give each person an equal
              opportunity, whatever their race, sex, gender or cultural
              background. Our vision is to keep high standards of safe,
              compassionate care, both as an employer and as a care provider.
            </p>
          </div>
          <div>
            <SectionHead title="Three simple steps" />
            <ol className="mt-6 grid gap-3">
              {steps.map((s, i) => (
                <li
                  key={s}
                  className="flex items-start gap-4 rounded-[1.25rem] border border-hairline bg-chalk p-5"
                >
                  <span className="font-display flex size-9 shrink-0 items-center justify-center rounded-full bg-signal text-snow">
                    {i + 1}
                  </span>
                  <span className="pt-1.5 text-[15px] leading-relaxed text-ink/80">
                    {s}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-5 flex items-start gap-3 text-[15px] text-ink/80">
              <PixelTick />
              Feel free to walk in to our office for more information.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHead title="Ask us about working here">
              <p className="mt-5 text-[16px] leading-relaxed text-ink/75">
                Send us a message and we&apos;ll get back to you.
              </p>
            </SectionHead>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <QuoteForm defaultType="job" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
