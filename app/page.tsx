import { BookingSection } from "@/components/booking/BookingSection";
import { Answer } from "@/components/home/Answer";
import { Belief } from "@/components/home/Belief";
import { Hero } from "@/components/home/Hero";
import { MemberQuotes } from "@/components/home/MemberQuotes";
import { MemberWords } from "@/components/home/MemberWords";
import { OurPromise } from "@/components/home/OurPromise";
import { Scoreboard } from "@/components/home/Scoreboard";

/** Home: hero, our belief, the scoreboard (light); our answer, members' words and quotes, our promise, the form (navy). See CLAUDE.md. */
export default function Home() {
  return (
    <>
      <Hero />
      <Belief />
      <Scoreboard />
      <Answer />
      <MemberWords />
      <MemberQuotes />
      <OurPromise />
      <BookingSection />
    </>
  );
}
