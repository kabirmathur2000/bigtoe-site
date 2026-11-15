import type { Metadata } from "next";
import { Barefoot, Fades } from "@/components/method/MethodChapters";
import { Paths } from "@/components/method/Paths";
import { Patterns } from "@/components/method/Patterns";
import { Questions } from "@/components/method/Questions";
import { PhotoBreak } from "@/components/ui/PhotoBreak";
import { photoBreak } from "@/content/method";
import { meta } from "@/content/site";

export const metadata: Metadata = meta.pages.method;

/** Method: what fades, barefoot, two paths (light); a photo break carrying the fade; who we serve, questions (navy). */
export default function MethodPage() {
  return (
    <>
      <Fades />
      <Barefoot />
      <Paths />
      <PhotoBreak shot={photoBreak.shot} />
      <Patterns />
      <Questions />
    </>
  );
}
