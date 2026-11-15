import type { Metadata } from "next";
import { Fades, Training } from "@/components/method/MethodChapters";
import { Patterns } from "@/components/method/Patterns";
import { Questions } from "@/components/method/Questions";
import { Scoreboard } from "@/components/method/Scoreboard";
import { meta } from "@/content/site";

export const metadata: Metadata = meta.pages.method;

/** Method: what fades, how we train, the scoreboard, who we serve, questions. All light. */
export default function MethodPage() {
  return (
    <>
      <Fades />
      <Training />
      <Scoreboard />
      <Patterns />
      <Questions />
    </>
  );
}
