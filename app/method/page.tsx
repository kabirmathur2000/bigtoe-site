import type { Metadata } from "next";
import { Barefoot, Fades } from "@/components/method/MethodChapters";
import { Paths } from "@/components/method/Paths";
import { Patterns } from "@/components/method/Patterns";
import { Questions } from "@/components/method/Questions";
import { meta } from "@/content/site";

export const metadata: Metadata = meta.pages.method;

/** Method: what fades, barefoot, two paths (light); who we serve, questions (navy). */
export default function MethodPage() {
  return (
    <>
      <Fades />
      <Barefoot />
      <Paths />
      <Patterns />
      <Questions />
    </>
  );
}
