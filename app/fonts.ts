import localFont from "next/font/local";

// Weights are set from the file names; the files' own weight metadata is
// unreliable (most report 400). Only the three weights the site uses are
// loaded (Light, Regular, Bold), so the first paint waits on less. The
// oblique and Ultrabold files stay in public/fonts, unused.
export const anderson = localFont({
  src: [
    { path: "../public/fonts/AndersonGrotesk-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/AndersonGrotesk.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/AndersonGrotesk-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-anderson",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});
