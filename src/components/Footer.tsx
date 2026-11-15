import Link from "next/link";
import { siteConfig, services, accreditations } from "@/lib/site-config";
import { getContent } from "@/lib/content";
import Logo from "@/components/Logo";
import CqcWidget from "@/components/CqcWidget";

const linkClass =
  "text-[14px] text-snow/75 transition-colors duration-300 hover:text-snow";
const headClass = "font-pixel text-[11px] uppercase text-glow";

export default async function Footer() {
  const { details } = await getContent();
  return (
    <footer className="bg-night px-4 pb-10 pt-20 text-snow sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo size={38} tone="snow" textClassName="text-2xl text-snow" />
            <p className="font-display mt-4 text-lg italic text-glow">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 max-w-xs text-pretty text-[14px] leading-relaxed text-snow/70">
              Home care and care staff across{" "}
              {siteConfig.serviceArea.replace("Oxford and across ", "")}, from
              our office in Cowley, Oxford.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {accreditations.map((a) => (
                <li
                  key={a.name}
                  className="rounded-full border border-snow/20 px-3 py-1 text-[12px] text-snow/80"
                >
                  {a.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className={headClass}>Services</p>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className={linkClass}>
                  All services →
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className={headClass}>Pages</p>
            <ul className="mt-5 space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className={headClass}>Get in touch</p>
            <ul className="mt-5 space-y-3 text-[14px] text-snow/75">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="text-lg font-semibold text-snow hover:text-glow"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={siteConfig.phone2Href} className={linkClass}>
                  {siteConfig.phone2}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailHref}
                  className={`${linkClass} break-all`}
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.address.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {siteConfig.address.lines.join(", ")}
                </a>
              </li>
              <li className="text-snow/70">{details.hoursShort}</li>
            </ul>
          </div>
        </div>

        <CqcWidget className="mt-14" />

        <div className="mt-14 space-y-2 border-t border-snow/15 pt-6 text-[12px] leading-relaxed text-snow/65">
          {/* Companies Act 2006: required when trading as a limited company. */}
          {siteConfig.companyNumber && (
            <p>
              {siteConfig.legalName} is a company registered in England and
              Wales. Company number {siteConfig.companyNumber}. Registered
              office: {siteConfig.registeredOffice}.
            </p>
          )}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.legalName}. All
              rights reserved.
            </p>
            <Link
              href="/privacy"
              className="underline underline-offset-4 transition-colors duration-300 hover:text-snow"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
