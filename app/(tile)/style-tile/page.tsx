import type { Metadata } from "next";
import { Coach, Dials, Hero, Pause, Questions, Social, Stories, Team } from "@/components/tile/TileScreens";
import { tile } from "@/content/style-tile";

/** Not for search engines, not in the navigation or the sitemap. */
export const metadata: Metadata = {
  title: tile.title,
  robots: { index: false, follow: false },
};

/**
 * The style tile, round four: one idea per scroll on a navy page. Cards
 * alternate Photo, Light, Warm, Photo, then the member cards and a Light
 * card; the ending is revealed beneath the page.
 */
export default function StyleTilePage() {
  return (
    <>
      <Hero />
      <Pause />
      <Coach />
      <Dials />
      <Social />
      <Stories />
      <Team />
      <Questions />
    </>
  );
}
