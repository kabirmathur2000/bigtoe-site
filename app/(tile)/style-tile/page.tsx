import type { Metadata } from "next";
import { MemberCards } from "@/components/tile/MemberCards";
import { DialsScreen, Invitation, PhotoScreen, Questions, SignOff, TextScreen } from "@/components/tile/TileScreens";
import { tile } from "@/content/style-tile";
import coffeeBar from "@/public/photos/studio-coffee-bar.jpg";

/** Not for search engines, not in the navigation or the sitemap. */
export const metadata: Metadata = {
  title: tile.title,
  robots: { index: false, follow: false },
};

/**
 * The style tile: one working example of each screen type, in order, with
 * real copy. One colour change only: light for A, B and D, then one slow
 * fade to navy for C, E, the questions and the sign-off (so D comes before C).
 */
export default function StyleTilePage() {
  const [a1, a2] = tile.photoScreens;
  return (
    <>
      <PhotoScreen
        headline={a1.headline}
        line={a1.line}
        shot={a1.shot}
        photo={{
          src: coffeeBar,
          alt: "The BigToe coffee bar: the social table and stools under pendant lamps, the logo wall, the training floor behind",
          phonePos: "16% 60%",
          desktopPos: "30% 62%",
        }}
      />
      <PhotoScreen headline={a2.headline} line={a2.line} link={a2.link} shot={a2.shot} flip />
      <TextScreen />
      <DialsScreen />
      <MemberCards />
      <Invitation />
      <Questions />
      <SignOff />
    </>
  );
}
