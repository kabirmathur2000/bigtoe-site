import { Hero, Members, Pizza, Questions, Visit, Why } from "@/components/home/HomeSections";
import { Build, Coach, Goals, Ground, Start } from "@/components/method/MethodSections";
import { Footer } from "@/components/site/Footer";
import { Founders, Sherpas, Story } from "@/components/team/TeamSections";

/**
 * The one page: Home, How we train, The team, Members' words, Questions,
 * Come and meet us, then the footer. The menu and jump links glide to the
 * anchors (content/site.ts, `anchors`).
 */
export default function HomePage() {
  return (
    <>
      {/* The hero photo stays pinned while these slide over it. */}
      <Hero>
        <Why />
        <Pizza />
      </Hero>
      <Coach />
      <Start />
      <Build />
      <Ground />
      <Goals />
      <Founders />
      <Sherpas />
      <Story />
      <Members />
      <Questions />
      <Visit />
      <Footer />
    </>
  );
}
