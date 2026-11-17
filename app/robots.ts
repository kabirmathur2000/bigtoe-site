import type { MetadataRoute } from "next";
import { facts } from "@/content/facts";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", facts.siteUrl).toString(),
  };
}
