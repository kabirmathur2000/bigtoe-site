import type { Metadata } from "next";
import { Hero, Pause, Questions, Stack, Stories } from "@/components/tile/TileScreens";
import { tile } from "@/content/style-tile";

/** Not for search engines, not in the navigation or the sitemap. */
export const metadata: Metadata = {
  title: tile.title,
  robots: { index: false, follow: false },
};

/**
 * The style tile, round five: hero, pause, the stacking Sherpa, dials,
 * pizza and four-of-us cards, the member story sequence, the questions
 * line, then the ending revealed beneath the page.
 */
export default function StyleTilePage() {
  return (
    <>
      <Hero />
      <Pause />
      <Stack />
      <Stories />
      <Questions />
    </>
  );
}
