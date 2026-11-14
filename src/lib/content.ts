// The parts of the site the admin panel can edit: the offer, the service
// prices and the portfolio. site-config.ts holds the defaults; anything
// saved in the admin panel overrides them.
import { unstable_cache } from "next/cache";
import {
  offer as defaultOffer,
  services as defaultServices,
  work as defaultWork,
  siteConfig,
  type CaseStudy,
} from "@/lib/site-config";
import { getJSON } from "@/lib/store";

export type Offer = typeof defaultOffer;
export type Service = (typeof defaultServices)[number];

export type StoredContent = {
  offer?: Partial<Offer>;
  prices?: Record<string, string>;
  work?: CaseStudy[];
  details?: { hoursShort?: string };
};

export const CONTENT_KEY = "content";
export const CONTENT_TAG = "content";

export async function readStoredContent(): Promise<StoredContent> {
  return (await getJSON<StoredContent>(CONTENT_KEY)) ?? {};
}

/** Everything the public pages need, with admin edits applied. */
export const getContent = unstable_cache(
  async () => {
    const stored = await readStoredContent();
    return {
      offer: { ...defaultOffer, ...stored.offer } as Offer,
      services: defaultServices.map((s) => ({
        ...s,
        from: stored.prices?.[s.slug] || s.from,
      })),
      work: stored.work ?? defaultWork,
      details: {
        hoursShort: stored.details?.hoursShort || siteConfig.hoursShort,
      },
    };
  },
  ["site-content"],
  { tags: [CONTENT_TAG] },
);
