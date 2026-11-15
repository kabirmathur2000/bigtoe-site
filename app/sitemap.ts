import type { MetadataRoute } from "next";
import { facts } from "@/content/facts";

/** The four public pages. The style guide is internal and left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/method", "/team", facts.bookHref].map((path) => ({
    url: new URL(path, facts.siteUrl).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
