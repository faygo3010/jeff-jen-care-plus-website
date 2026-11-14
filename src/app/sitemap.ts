import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Every public page, so search engines find them without guessing.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: Array<[string, number, MetadataRoute.Sitemap[number]["changeFrequency"]]> = [
    ["", 1, "monthly"],
    ["/about-us", 0.9, "yearly"],
    ["/services", 0.9, "monthly"],
    ["/care-homes", 0.8, "monthly"],
    ["/careers", 0.8, "monthly"],
    ["/contact", 0.8, "yearly"],
    ["/privacy", 0.3, "yearly"],
  ];
  return pages.map(([path, priority, changeFrequency]) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
