import type { Metadata } from "next";
import Image from "next/image";
import {
  siteConfig,
  whoWeHelp,
  accreditations,
  promises,
} from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import CqcWidget from "@/components/CqcWidget";
import {
  ArrowLink,
  PageHeader,
  PixelTick,
  SectionHead,
} from "@/components/ui-bits";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Jeff Jen Care Plus Ltd is a CQC-registered care agency in Cowley, Oxford, caring for older people and people living with dementia at home, and supplying nurses and care staff to care homes across Oxfordshire.",
  alternates: { canonical: "/about-us" },
};

const values = [
  {
    title: "Safe",
    body: "High standards of safe care, delivered by skilled, carefully recruited staff.",
  },
  {
    title: "Compassionate",
    body: "Care given with kindness, patience and respect for the person and their family.",
  },
  {
    title: "Consistent",
    body: "The same staff with each client wherever we can, so trust and good relationships grow.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="A local care agency, built on safe, compassionate care"
        lede="Jeff Jen Care Plus Ltd is a health care agency based in Cowley, Oxford. We care for older people in their own homes, and provide nurses and health care assistants to nursing and residential homes across Oxfordshire."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ArrowLink href={siteConfig.phoneHref} tone="glow" icon="phone">
            Call {siteConfig.phone}
          </ArrowLink>
          <ArrowLink href="/services" tone="light">
            Our services
          </ArrowLink>
        </div>
      </PageHeader>

      {/* Story */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="bezel">
              <div className="bezel-core relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/sitting-room.jpg"
                  alt="A cup of tea on a side table beside an armchair and a sunny window"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="space-y-5 text-pretty text-[17px] leading-relaxed text-ink/80 lg:col-span-6">
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              What we do
            </h2>
            <p>
              We&apos;re registered to care for older people in their own homes,
              and to supply ad hoc staff to nursing homes for elderly care,
              dementia and learning disability.
            </p>
            <p>
              Our aim is simple: high-quality care that is safe, consistent and
              compassionate, at a fair cost, and that keeps up with the changing
              needs of the people we look after.
            </p>
            <p>
              We keep consistent staff with each client, so carers and the
              people they support build a good working relationship. Our
              compassionate carers and nurses are available day or night, 7 days
              a week.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="warm-wash border-y border-hairline bg-paper-deep/50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHead title="Safe, compassionate, consistent" />
          </Reveal>
          <Reveal className="mt-12 grid gap-4 sm:grid-cols-3" stagger>
            {values.map((v) => (
              <div key={v.title} data-reveal-item className="bezel">
                <div className="bezel-core h-full p-8">
                  <h3 className="font-display text-3xl text-signal">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/75">
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Who we look after */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead title="The people we support" />
          </div>
          <ul className="grid gap-3 lg:col-span-7">
            {whoWeHelp.map((w) => (
              <li
                key={w}
                className="flex items-center gap-4 rounded-[1.25rem] border border-hairline bg-chalk px-6 py-4 text-[17px] text-ink"
              >
                <PixelTick className="mt-0" />
                {w}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Why us */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-4 sm:grid-cols-2" stagger>
            {promises.map((c) => (
              <div key={c.title} data-reveal-item className="bezel">
                <div className="bezel-core h-full p-8">
                  <h3 className="font-display text-2xl text-ink">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/75">
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Accreditations + visit */}
      <section className="px-4 pb-28 sm:px-6 lg:px-8 lg:pb-36">
        <Reveal className="mx-auto max-w-6xl">
          <div className="bezel bezel-dark">
            <div className="bezel-core bezel-core-dark grid gap-10 p-8 sm:p-12 lg:grid-cols-2">
              <div>
                <p className="font-pixel text-[11px] uppercase text-glow">
                  Registered and accredited
                </p>
                <ul className="mt-6 space-y-5">
                  {accreditations.map((a) => (
                    <li key={a.name}>
                      <p className="font-display text-xl text-snow">{a.name}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-snow/75">
                        {a.detail}
                      </p>
                    </li>
                  ))}
                </ul>
                <CqcWidget className="mt-6" />
              </div>
              <div>
                <p className="font-pixel text-[11px] uppercase text-glow">
                  Come and see us
                </p>
                <address className="font-display mt-6 text-2xl not-italic leading-snug text-snow">
                  {siteConfig.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <p className="mt-4 text-[14px] leading-relaxed text-snow/75">
                  {siteConfig.address.directions}. Feel free to walk in.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ArrowLink
                    href={siteConfig.phoneHref}
                    tone="glow"
                    icon="phone"
                  >
                    Call {siteConfig.phone}
                  </ArrowLink>
                  <ArrowLink href={siteConfig.address.mapHref} tone="dark">
                    Directions
                  </ArrowLink>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
