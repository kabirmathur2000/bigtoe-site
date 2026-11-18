import type { Metadata } from "next";
import { PageTitle } from "@/components/tile/TileChrome";
import { BigNumber, Chips, Coach, Dials, Invitation, Lead, Offset, Stories } from "@/components/tile/TileScreens";
import { tile } from "@/content/style-tile";

/** Not for search engines, not in the navigation or the sitemap. */
export const metadata: Metadata = {
  title: tile.title,
  robots: { index: false, follow: false },
};

/**
 * The style tile, round three. An inner page, so it opens with its title
 * and "← Back to home". Then each pairing in its own panel, rotating so
 * neighbours differ: Light, Navy, Warm, Light, Warm, Light, Navy, Navy.
 */
export default function StyleTilePage() {
  return (
    <>
      <PageTitle title={tile.title} />
      <Lead />
      <Chips />
      <Offset />
      <Coach />
      <Dials />
      <BigNumber />
      <Stories />
      <Invitation />
    </>
  );
}
