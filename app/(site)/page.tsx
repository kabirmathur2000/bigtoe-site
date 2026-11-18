import { Coach, Ending, FirstHour, Hero, Members, Pizza, Questions, Why } from "@/components/home/HomeScreens";
import { Footer } from "@/components/site/Footer";
import { NavyZone } from "@/components/site/NavyZone";

/** Home: light for the hero and "We train for a sport called life."; navy from "Your coach. Your plan." to the footer. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Why />
      <NavyZone>
        <Coach />
        <Members />
        <Pizza />
        <FirstHour />
        <Ending />
        <Questions />
        <Footer tone="navy" />
      </NavyZone>
    </>
  );
}
