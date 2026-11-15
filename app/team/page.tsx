import type { Metadata } from "next";
import { FoundersCircle, FoundersValues } from "@/components/team/Founders";
import { Sherpas, Social, Story } from "@/components/team/TeamChapters";
import { meta } from "@/content/site";

export const metadata: Metadata = meta.pages.team;

/** Team: Jay's words, the founders, the Sherpas (light), then the social space (navy). */
export default function TeamPage() {
  return (
    <>
      <Story />
      {/* TODO (awaiting approval): founders screen a, the note's opening. */}
      <FoundersValues />
      <FoundersCircle />
      <Sherpas />
      <Social />
    </>
  );
}
