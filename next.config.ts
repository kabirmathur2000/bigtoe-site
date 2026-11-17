import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  /** Old Framer URLs (CLAUDE.md, Redirects). Permanent (308). */
  async redirects() {
    return [
      { source: "/membership", destination: "/", permanent: true },
      { source: "/faqs", destination: "/", permanent: true },
      { source: "/book-now", destination: "/", permanent: true },
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
