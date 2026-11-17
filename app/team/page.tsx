import type { Metadata } from "next";
import { Founders, Sherpas, Story, TeamClose } from "@/components/team/TeamScreens";
import { meta } from "@/content/site";

export const metadata: Metadata = meta.pages.team;

/** Team: why we built this, the four of us (light); your Sherpas and the button (navy). */
export default function TeamPage() {
  return (
    <>
      <Story />
      <Founders />
      <Sherpas />
      <TeamClose />
    </>
  );
}
