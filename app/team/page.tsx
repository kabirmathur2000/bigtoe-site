import type { Metadata } from "next";
import { FoundersCircle, FoundersValues } from "@/components/team/Founders";
import { Sherpas, Social, Story } from "@/components/team/TeamChapters";
import { PhotoBreak } from "@/components/ui/PhotoBreak";
import { meta } from "@/content/site";
import { photoBreak } from "@/content/team";

export const metadata: Metadata = meta.pages.team;

/** Team: Jay's words, the founders, the Sherpas (light); a photo break carrying the fade; the social space (navy). */
export default function TeamPage() {
  return (
    <>
      <Story />
      <FoundersValues />
      <FoundersCircle />
      <Sherpas />
      <PhotoBreak shot={photoBreak.shot} />
      <Social />
    </>
  );
}
