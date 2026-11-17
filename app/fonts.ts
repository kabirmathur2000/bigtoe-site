import localFont from "next/font/local";

// Weights are set from the file names; the files' own weight metadata is
// unreliable (most report 400). Only the two weights the site uses are
// loaded: Regular (headlines and text) and Bold (the button and small
// labels). No Light anywhere (brand rule, CLAUDE.md).
export const anderson = localFont({
  src: [
    { path: "../public/fonts/AndersonGrotesk.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/AndersonGrotesk-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-anderson",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});
