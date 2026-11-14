import type { Offer } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import { ArrowLink, PixelTick } from "@/components/ui-bits";

/** Homepage notice box (recruiting by default). Edited in the admin panel. */
export default function OfferSection({ offer }: { offer: Offer }) {
  if (!offer.active) return null;

  return (
    <section id="offer" className="scroll-mt-28 px-4 py-12 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-6xl">
        <div className="bezel bezel-dark">
          <div className="bezel-core bezel-core-dark grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <p className="text-[15px] font-medium text-glow">{offer.label}</p>
              <h2 className="font-display mt-3 text-4xl leading-[1.05] text-snow sm:text-5xl">
                {offer.headline}
              </h2>
              <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-snow/80">
                {offer.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ArrowLink href="/careers" tone="dark">
                  Careers with us
                </ArrowLink>
                <ArrowLink href={siteConfig.applicationFormHref} tone="glow">
                  Application form (PDF)
                </ArrowLink>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[1.25rem] border border-snow/15 bg-snow/5 p-6">
                <p className="font-pixel text-[11px] uppercase text-glow">We&apos;re looking for</p>
                <ul className="mt-4 grid gap-3">
                  {offer.included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-snow/90">
                      <PixelTick className="text-glow" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {offer.terms && (
                <p className="mt-4 text-[13px] leading-relaxed text-snow/70">{offer.terms}</p>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
