import type { MetadataRoute } from "next";
import { facts } from "@/content/facts";

/** The public pages (not /style-tile, which stays reachable but unlisted and noindex). */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/method", "/team", "/faq", "/terms", "/privacy"].map((path) => ({
    url: new URL(path, facts.siteUrl).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
