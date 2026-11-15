import Link from "next/link";
import { ENQUIRY_STATUSES, listEnquiries, type Enquiry } from "@/lib/enquiries";
import { removeEnquiry, saveEnquiry } from "@/app/admin/actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import {
  Button,
  Notice,
  Panel,
  field,
  label,
  type AdminSearchParams,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<Enquiry["status"], string> = {
  new: "bg-signal text-night",
  contacted: "bg-cobalt/30 text-ink",
  won: "bg-emerald-400/80 text-night",
  lost: "bg-ink/15 text-ink/70",
};

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    timeZone: "Europe/London",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/** UK numbers to WhatsApp's international format: 07700 900000 → 447700900000. */
const whatsapp = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `44${digits.slice(1)}` : digits;
};

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: AdminSearchParams;
}) {
  const { saved, error, status } = await searchParams;
  const all = await listEnquiries();
  const shown = status ? all.filter((e) => e.status === status) : all;
  const tabs = [
    { key: "", label: "All", count: all.length },
    ...ENQUIRY_STATUSES.map((s) => ({
      key: s,
      label: s,
      count: all.filter((e) => e.status === s).length,
    })),
  ];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-4xl text-ink">Enquiries</h1>
        <nav className="flex flex-wrap gap-1.5">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={t.key ? `/admin?status=${t.key}` : "/admin"}
              className={cn(
                "font-pixel border-2 px-3 py-1.5 text-[10px] uppercase",
                (status ?? "") === t.key
                  ? "border-signal bg-signal/15 text-ink"
                  : "border-hairline text-ink/70 hover:text-ink",
              )}
            >
              {t.label} · {t.count}
            </Link>
          ))}
        </nav>
      </div>

      <Notice saved={saved} error={error} message="Saved." />

      {shown.length === 0 && (
        <Panel>
          <p className="text-[14px] text-ink/70">
            {all.length === 0
              ? "No enquiries yet. Every contact-form message will appear here (and still arrive by email)."
              : "Nothing with this status."}
          </p>
        </Panel>
      )}

      {shown.map((e) => (
        <Panel key={e.id}>
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={cn(
                    "font-pixel px-2 py-1 text-[10px] uppercase",
                    STATUS_STYLE[e.status],
                  )}
                >
                  {e.status}
                </span>
                <span className="text-[12px] text-ink/70">
                  {when(e.createdAt)}
                </span>
              </div>
              <h2 className="font-display mt-3 text-2xl text-ink">{e.name}</h2>
              <p className="mt-1 text-[13px] text-ink/70">
                {e.service || "No service chosen"}
              </p>
              <p className="mt-4 whitespace-pre-wrap text-[14px] leading-relaxed text-ink/80">
                {e.message || <em className="text-ink/70">No message</em>}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[13px]">
                {e.email && (
                  <a
                    className="border-2 border-hairline px-3 py-1.5 text-ink/80 hover:border-signal"
                    href={`mailto:${e.email}`}
                  >
                    {e.email}
                  </a>
                )}
                {e.phone && (
                  <>
                    <a
                      className="border-2 border-hairline px-3 py-1.5 text-ink/80 hover:border-signal"
                      href={`tel:${e.phone.replace(/\s/g, "")}`}
                    >
                      Call {e.phone}
                    </a>
                    <a
                      className="border-2 border-hairline px-3 py-1.5 text-ink/80 hover:border-signal"
                      href={`https://wa.me/${whatsapp(e.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </>
                )}
              </div>
            </div>

            <div className="grid content-start gap-3 md:col-span-5">
              <form action={saveEnquiry} className="grid gap-3">
                <input type="hidden" name="id" value={e.id} />
                <label className="block">
                  <span className={label}>Status</span>
                  <select
                    name="status"
                    defaultValue={e.status}
                    className={field}
                  >
                    {ENQUIRY_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s[0].toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className={label}>Your notes</span>
                  <textarea
                    name="notes"
                    rows={3}
                    defaultValue={e.notes}
                    placeholder="Called Tue, care assessment booked for Friday..."
                    className={field}
                  />
                </label>
                <Button type="submit">Save</Button>
              </form>
              <form action={removeEnquiry}>
                <input type="hidden" name="id" value={e.id} />
                <ConfirmButton
                  question={`Delete the enquiry from ${e.name}? This can't be undone.`}
                >
                  Delete
                </ConfirmButton>
              </form>
            </div>
          </div>
        </Panel>
      ))}
    </>
  );
}
