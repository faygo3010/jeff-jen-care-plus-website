import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AnimateUIProvider } from "@animate-ui/react/provider";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// Body: Geist, clear and friendly at paragraph size.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

// Headlines: Fraunces, a warm soft serif.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

// The default title leads with the name and says what we do, so a search
// for the brand and a search for the service both match it.
const DEFAULT_TITLE = `${siteConfig.name} | Home Care & Care Staff in Oxford and Oxfordshire`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "home care Oxford",
    "home care Oxfordshire",
    "dementia care Oxford",
    "elderly care at home Oxfordshire",
    "domiciliary care Oxford",
    "care agency Oxford",
    "nursing agency Oxfordshire",
    "care home staffing Oxford",
    "care jobs Oxford",
    "Jeff Jen Care Plus",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: DEFAULT_TITLE,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: siteConfig.description,
  },
  // Search Console / Bing ownership tokens, set in Vercel's environment
  // variables (they're public tokens, not secrets). Omitted when unset.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

// Structured data: tells search engines who the business is, where it is,
// what it does, and how to contact it.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      alternateName: siteConfig.alternateNames,
      inLanguage: "en-GB",
      publisher: { "@id": `${siteConfig.url}/#business` },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      alternateName: siteConfig.alternateNames,
      description: siteConfig.description,
      slogan: siteConfig.tagline,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.png`,
      image: `${siteConfig.url}/opengraph-image.jpg`,
      email: siteConfig.email,
      telephone: siteConfig.phoneHref.replace("tel:", ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: "49a Oxford Road, Cowley",
        addressLocality: "Oxford",
        addressRegion: "Oxfordshire",
        postalCode: "OX4 2ER",
        addressCountry: "GB",
      },
      areaServed: { "@type": "AdministrativeArea", name: "Oxfordshire" },
      knowsAbout: [
        "Home care",
        "Dementia care",
        "Elderly care",
        "Care home staffing",
        "Learning disability support",
        "Mental health support",
      ],
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#f7f2e8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={cn("h-full antialiased", geist.variable, fraunces.variable)}
    >
      <body className="grain flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Animate UI: slightly calmer tempo, "pop" tick animation */}
        <AnimateUIProvider tempo={1.2} checkAnimation="pop">
          {children}
        </AnimateUIProvider>
        <Analytics />
      </body>
    </html>
  );
}
