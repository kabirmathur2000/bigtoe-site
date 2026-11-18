import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { PageTitle } from "@/components/site/PageTitle";
import { Founders, Sherpas, Why } from "@/components/team/TeamScreens";
import { meta } from "@/content/site";
import { team } from "@/content/team";

export const metadata: Metadata = meta.pages.team;

export default function TeamPage() {
  return (
    <>
      <PageTitle title={team.title} />
      <Why />
      <Founders />
      <Sherpas />
      <Footer />
    </>
  );
}
