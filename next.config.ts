import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  /** The photo slots use quality 75 (next/image only serves configured qualities). */
  images: { qualities: [75] },
  /** Old Framer URLs (CLAUDE.md, Redirects). Permanent (308). */
  async redirects() {
    return [
      { source: "/membership", destination: "/", permanent: true },
      { source: "/book-now", destination: "/", permanent: true },
      { source: "/faqs", destination: "/faq", permanent: true },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
