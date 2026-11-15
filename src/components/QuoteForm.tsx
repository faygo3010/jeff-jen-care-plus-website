"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { services, siteConfig } from "@/lib/site-config";
import { sendQuote, type QuoteState } from "@/app/actions/send-quote";
import { PixelArrow, PixelTick } from "@/components/ui-bits";
import HeartLoader from "@/components/HeartLoader";

const field =
  "mt-2 w-full rounded-xl border border-hairline-strong bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-150 placeholder:text-ink/50 focus:border-signal [&>option]:bg-paper";
const label = "text-[14px] font-semibold text-ink";

// What the enquiry is about. Care homes and job seekers get their own
// options so the right person picks it up.
const TYPES = {
  "care-home": "Staff for a care home",
  job: "A job with Jeff Jen Care Plus",
} as const;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-pixel group mt-7 inline-flex items-center gap-3 bg-signal py-2 pl-5 pr-2 text-[15px] font-semibold text-snow disabled:opacity-60"
    >
      {pending ? "Sending..." : "Send message"}
      <span className="flex size-8 items-center justify-center rounded-full bg-snow/15 transition-transform duration-300 group-hover:translate-x-0.5">
        {pending ? <HeartLoader className="scale-75" /> : <PixelArrow />}
      </span>
    </button>
  );
}

export default function QuoteForm({
  defaultType,
}: {
  defaultType?: keyof typeof TYPES;
}) {
  const [state, action] = useActionState<QuoteState, FormData>(sendQuote, {
    status: "idle",
  });

  if (state.status === "success") {
    return (
      <div className="bezel">
        <div className="bezel-core flex flex-col items-start p-10 sm:p-12">
          <span className="flex size-12 items-center justify-center rounded-full bg-signal/15">
            <PixelTick className="mt-0 size-5" />
          </span>
          <h3 className="font-display mt-6 text-3xl text-ink">
            Thank you, message received
          </h3>
          <p className="mt-3 max-w-sm text-pretty text-[15px] leading-relaxed text-ink/75">
            We&apos;ll get back to you as soon as we can.
          </p>
          <p className="mt-4 text-[15px] text-ink/75">
            Need us sooner? Call{" "}
            <a
              className="font-semibold text-signal"
              href={siteConfig.phoneHref}
            >
              {siteConfig.phone}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bezel">
      <form action={action} className="bezel-core relative p-8 sm:p-10">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={label}>
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="phone" className={label}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="email" className={label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="service" className={label}>
              What&apos;s it about?
            </label>
            <select
              id="service"
              name="service"
              defaultValue={defaultType ? TYPES[defaultType] : ""}
              className={field}
            >
              <option value="">Choose one</option>
              <optgroup label="Care">
                {services
                  .filter((s) => s.slug !== "care-home-staffing")
                  .map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Other">
                <option value={TYPES["care-home"]}>{TYPES["care-home"]}</option>
                <option value={TYPES.job}>{TYPES.job}</option>
                <option value="Not sure">Not sure yet</option>
              </optgroup>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className={label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us a little about who needs care or support, and when."
              className={field}
            />
          </div>
        </div>
        <p className="mt-3 text-[13px] text-ink/70">
          Please give a phone number or an email so we can reply.
        </p>

        {/* Honeypot, hidden from people and screen readers alike. */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {state.status === "error" && state.message && (
          <p
            role="alert"
            className="mt-6 rounded-xl border border-destructive/50 bg-paper px-4 py-3 text-[14px] leading-relaxed text-ink"
          >
            {state.message}
          </p>
        )}

        <SubmitButton />

        <p className="mt-4 text-[13px] leading-relaxed text-ink/70">
          We use these details only to reply to you. We never share them for
          marketing. See our{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-ink"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
