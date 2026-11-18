import type { Metadata } from "next";
import { Coach, Dials, Invitation, Lead, Photo, Questions, Stories, Text } from "@/components/tile/TileScreens";
import { tile } from "@/content/style-tile";

/** Not for search engines, not in the navigation or the sitemap. */
export const metadata: Metadata = {
  title: tile.title,
  robots: { index: false, follow: false },
};

/**
 * The style tile, round two: each screen type in its own panel, in order.
 * Panels rotate Light, Warm, Photo, Light, Warm, Navy, Navy, Light.
 */
export default function StyleTilePage() {
  return (
    <>
      <Lead />
      <Text />
      <Photo />
      <Coach />
      <Dials />
      <Stories />
      <Invitation />
      <Questions />
    </>
  );
}
