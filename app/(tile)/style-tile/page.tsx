import type { Metadata } from "next";
import { Ending, FirstHour, Hero, Included, Members, Questions, Sherpa, StartingPoint, Train, Why } from "@/components/tile/TileScreens";
import { tile } from "@/content/style-tile";

/** Not for search engines, not in the navigation or the sitemap. */
export const metadata: Metadata = {
  title: tile.title,
  robots: { index: false, follow: false },
};

/**
 * The style tile, round six: ten screens after ouraring.com and
 * functionhealth.com. Hero, why, what we train, your first hour, your
 * starting point, your Sherpa, members' words, what's included,
 * questions, ending.
 */
export default function StyleTilePage() {
  return (
    <>
      <Hero />
      <Why />
      <Train />
      <FirstHour />
      <StartingPoint />
      <Sherpa />
      <Members />
      <Included />
      <Questions />
      <Ending />
    </>
  );
}
