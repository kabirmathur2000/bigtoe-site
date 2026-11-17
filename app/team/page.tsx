import type { Metadata } from "next";
import { Founders, Sherpas, Story } from "@/components/team/TeamScreens";
import { meta } from "@/content/site";

export const metadata: Metadata = meta.pages.team;

/** Team: why we built this, the four of us (light); your Sherpas (navy). */
export default function TeamPage() {
  return (
    <>
      <Story />
      <Founders />
      <Sherpas />
    </>
  );
}
