import localFont from "next/font/local";

// Weights are set from the file names; the files' own weight metadata is
// unreliable (most report 400).
export const anderson = localFont({
  src: [
    { path: "../public/fonts/AndersonGrotesk-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/AndersonGrotesk-LightOblique.woff2", weight: "300", style: "italic" },
    { path: "../public/fonts/AndersonGrotesk.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/AndersonGrotesk-Oblique.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/AndersonGrotesk-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/AndersonGrotesk-BoldOblique.woff2", weight: "700", style: "italic" },
    { path: "../public/fonts/AndersonGrotesk-Ultrabold.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/AndersonGrotesk-UltraboldOblique.woff2", weight: "800", style: "italic" },
  ],
  variable: "--font-anderson",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});
