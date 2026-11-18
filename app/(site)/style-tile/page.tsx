import type { Metadata } from "next";
import { NavyZone } from "@/components/site/NavyZone";
import { Beyond, Ending, FirstHour, Hero, Included, Members, Questions, Sherpa, Sherpas, StartingPoint, Train, Why } from "@/components/tile/TileScreens";
import { tile } from "@/content/style-tile";

/** Not for search engines, not in the navigation or the sitemap. */
export const metadata: Metadata = {
  title: tile.title,
  robots: { index: false, follow: false },
};

/**
 * The style tile, round seven. Light: hero, why, what we train, your
 * first hour, your starting point. Navy from here: your Sherpa, your
 * Sherpas, members' words, beyond training, what's included, questions,
 * ending and footer.
 */
export default function StyleTilePage() {
  return (
    <>
      <Hero />
      <Why />
      <Train />
      <FirstHour />
      <StartingPoint />
      <NavyZone>
        <Sherpa />
        <Sherpas />
        <Members />
        <Beyond />
        <Included />
        <Questions />
        <Ending />
      </NavyZone>
    </>
  );
}
