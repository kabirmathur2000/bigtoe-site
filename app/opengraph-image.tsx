import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { facts } from "@/content/facts";
import { meta } from "@/content/site";

/**
 * The shared Open Graph image: off-white, the LogoTag, and the core belief
 * in Anderson Grotesk, loaded from the original .otf in docs/fonts.
 */
export const alt = meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#0A212D";
const OFFWHITE = "#F0EEEB";

// Read at build time, so the image is generated once and served static.
const [regular, logo] = await Promise.all([
  readFile(join(process.cwd(), "docs/fonts/AndersonGrotesk.otf")),
  readFile(join(process.cwd(), "public/brand/logo-tag.png")),
]);

export default async function Image() {
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: OFFWHITE,
          color: NAVY,
          padding: "88px 96px",
          fontFamily: "Anderson Grotesk",
        }}
      >
        {/* LogoTag is 800x277. */}
        <img src={logoSrc} width={320} height={111} alt="" />
        <div style={{ display: "flex", fontSize: 72, fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.015em", maxWidth: 940 }}>
          {facts.heroLine}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Anderson Grotesk", data: regular, style: "normal", weight: 400 }] },
  );
}
