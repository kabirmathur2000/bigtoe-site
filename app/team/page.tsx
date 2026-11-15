import type { Metadata } from "next";
import { FoundersNote, Sherpas, Social, Story } from "@/components/team/TeamChapters";
import { meta } from "@/content/site";

export const metadata: Metadata = { title: meta.pages.team };

/** Team: Jay's story, the Sherpas, the founders' note, the social space. All light. */
export default function TeamPage() {
  return (
    <>
      <Story />
      <Sherpas />
      <FoundersNote />
      <Social />
    </>
  );
}
