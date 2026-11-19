import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  /** The photo slots use quality 75 (next/image only serves configured qualities). */
  images: { qualities: [75] },
  /** The old pages go to their section of the one page (CLAUDE.md, Redirects). Permanent (308). */
  async redirects() {
    return [
      { source: "/method", destination: "/#how-we-train", permanent: true },
      { source: "/team", destination: "/#the-team", permanent: true },
      { source: "/faq", destination: "/#questions", permanent: true },
      { source: "/faqs", destination: "/#questions", permanent: true },
      { source: "/membership", destination: "/", permanent: true },
      { source: "/book-now", destination: "/", permanent: true },
      { source: "/style-tile", destination: "/", permanent: false },
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
