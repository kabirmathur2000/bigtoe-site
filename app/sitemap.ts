import type { MetadataRoute } from "next";
import { facts } from "@/content/facts";

/** The public pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/method", "/team", "/terms", "/privacy"].map((path) => ({
    url: new URL(path, facts.siteUrl).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
