import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";
import { PageHeader } from "@/components/ui-bits";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.legalName} collects, uses and protects your personal data.`,
  alternates: { canonical: "/privacy" },
};

const { privacy } = siteConfig;
const linkClass =
  "text-ink underline underline-offset-4 transition-colors duration-300 hover:text-signal";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        lede={`How we collect, use and protect your personal data. Last updated ${privacy.lastUpdated}.`}
      />

      <section className="px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:pb-36">
        <div className="mx-auto max-w-2xl space-y-12">
          <Section title="Who we are">
            <p>
              {siteConfig.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is the
              data controller for personal data collected through this website.
              Questions about this policy go to{" "}
              <a className={linkClass} href={siteConfig.emailHref}>
                {siteConfig.email}
              </a>
              .
            </p>
          </Section>

          <Section title="What we collect">
            <p>
              When you send an enquiry, we collect what you choose to give us:
              your name, phone number and/or email address, what your enquiry is
              about, and anything you write in the message. Please don&apos;t
              include detailed health information in the form; we&apos;ll talk
              about care needs with you directly.
            </p>
          </Section>

          <Section title="How we use it">
            <p>
              Only to reply to your enquiry and, if you go on to use our care
              services, care staffing or apply for a job, to take the next steps
              you asked for. Our lawful basis is taking steps at your request
              before entering into a contract. We never sell your data or use it
              for third-party marketing.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              Website enquiries are deleted after {privacy.retentionEnquiries}{" "}
              unless they lead to a care arrangement or job application, which
              are then kept under our care records and recruitment policies. Job
              applications that don&apos;t lead to employment are kept for{" "}
              {privacy.retentionApplicants}.
            </p>
          </Section>

          <Section title="Who processes it">
            <p>
              Form submissions are stored securely for our staff (Upstash) and
              delivered by email through Resend, and the site is hosted by
              Vercel. They act only on our instructions.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              You can ask to see, correct or delete the data we hold about you
              at any time by emailing us. If you&apos;re unhappy with how we
              handle your data, you can complain to the Information
              Commissioner&apos;s Office at{" "}
              <a
                className={linkClass}
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
              >
                ico.org.uk
              </a>
              .
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink/80">
        {children}
      </div>
    </div>
  );
}
