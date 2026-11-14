import { readStoredContent } from "@/lib/content";
import { offer as defaultOffer, services, siteConfig } from "@/lib/site-config";
import { saveDetails, saveOffer, savePrices } from "@/app/admin/actions";
import { Button, Field, Notice, Panel, TextArea, type AdminSearchParams } from "@/components/admin/ui";

export default async function ContentPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const { saved, error } = await searchParams;
  const stored = await readStoredContent();
  const offer = { ...defaultOffer, ...stored.offer };

  return (
    <>
      <h1 className="font-display text-4xl text-ink">Notice, prices &amp; hours</h1>
      <Notice saved={saved} error={error} />

      <Panel title="Homepage notice (e.g. recruiting)">
        <form action={saveOffer} className="grid gap-5">
          <label className="flex items-center gap-3 rounded-xl border border-hairline px-4 py-3">
            <input type="checkbox" name="active" defaultChecked={offer.active} className="size-4 accent-[var(--signal)]" />
            <span className="text-[14px] text-ink">
              Notice is showing
              <span className="block text-[12px] text-ink/70">
                Untick to hide it everywhere (the label above the hero headline and the box on the homepage).
              </span>
            </span>
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field name="label" title="Short label (above the hero headline)" defaultValue={offer.label} required />
            <Field name="headline" title="Headline" defaultValue={offer.headline} required />
          </div>
          <TextArea name="summary" title="Summary" rows={3} defaultValue={offer.summary} />
          <TextArea
            name="included"
            title="List (one per line), e.g. the roles you're hiring"
            rows={5}
            defaultValue={offer.included.join("\n")}
          />
          <TextArea name="terms" title="Small print" rows={2} defaultValue={offer.terms} />
          <div>
            <Button type="submit">Save notice</Button>
          </div>
        </form>
      </Panel>

      <Panel title="Service prices (optional)">
        <form action={savePrices} className="grid gap-5">
          {services.map((s) => (
            <Field
              key={s.slug}
              name={`price-${s.slug}`}
              title={s.title}
              defaultValue={stored.prices?.[s.slug] ?? s.from}
              placeholder="Leave empty to show no price"
            />
          ))}
          <p className="text-[12px] text-ink/70">
            Leave a box empty to show no price for that service.
          </p>
          <div>
            <Button type="submit">Save prices</Button>
          </div>
        </form>
      </Panel>
      <Panel title="Business details">
        <form action={saveDetails} className="grid gap-5">
          <Field
            name="hoursShort"
            title="Opening hours / availability"
            defaultValue={stored.details?.hoursShort ?? siteConfig.hoursShort}
            placeholder={siteConfig.hoursShort}
            hint="Shown in the footer and on the Contact page. Clear it to go back to the default."
          />
          <div>
            <Button type="submit">Save details</Button>
          </div>
        </form>
      </Panel>
    </>
  );
}
