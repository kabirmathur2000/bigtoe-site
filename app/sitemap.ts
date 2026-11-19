import type { MetadataRoute } from "next";
import { facts } from "@/content/facts";

/** The public pages: the one page and the legal pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/terms", "/privacy"].map((path) => ({
    url: new URL(path, facts.siteUrl).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
