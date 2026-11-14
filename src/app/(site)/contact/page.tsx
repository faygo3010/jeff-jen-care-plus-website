import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getContent } from "@/lib/content";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import { ArrowLink, PageHeader } from "@/components/ui-bits";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Call ${siteConfig.phone} or visit our office at 49a Oxford Road, Cowley, Oxford OX4 2ER. Home care and care staff across Oxfordshire.`,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const { details } = await getContent();
  const rows = [
    { label: "Main phone", value: siteConfig.phone, href: siteConfig.phoneHref },
    { label: "Also", value: siteConfig.phone2, href: siteConfig.phone2Href },
    { label: "Email", value: siteConfig.email, href: siteConfig.emailHref },
  ];

  return (
    <>
      <PageHeader
        title="We're here to help"
        lede="For a prompt response, please call. You can also send us a message, or walk in to our office in Cowley."
      >
        <div className="mt-8">
          <ArrowLink href={siteConfig.phoneHref} tone="glow" icon="phone">
            Call {siteConfig.phone}
          </ArrowLink>
        </div>
      </PageHeader>

      <section className="px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:pb-36">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="bezel">
              <div className="bezel-core divide-y divide-hairline">
                {rows.map((row) => (
                  <div key={row.label} className="px-7 py-5">
                    <p className="font-pixel text-[11px] uppercase text-ink/70">{row.label}</p>
                    <a
                      href={row.href}
                      className="mt-1.5 block break-all text-[17px] font-semibold text-ink transition-colors duration-300 hover:text-signal"
                    >
                      {row.value}
                    </a>
                  </div>
                ))}
                <div className="px-7 py-5">
                  <p className="font-pixel text-[11px] uppercase text-ink/70">Availability</p>
                  <p className="mt-1.5 text-[15px] text-ink">{details.hoursShort}</p>
                </div>
              </div>
            </div>

            <div className="bezel mt-4">
              <div className="bezel-core p-7">
                <p className="font-pixel text-[11px] uppercase text-ink/70">Our office</p>
                <address className="font-display mt-3 text-xl not-italic leading-snug text-ink">
                  {siteConfig.legalName}
                  {siteConfig.address.lines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </address>
                <p className="mt-3 text-[14px] leading-relaxed text-ink/75">
                  {siteConfig.address.directions}.
                </p>
                <a
                  href={siteConfig.address.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[15px] font-semibold text-signal underline underline-offset-4"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.1}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
