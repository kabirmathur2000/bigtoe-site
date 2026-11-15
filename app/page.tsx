import { BookingSection } from "@/components/booking/BookingSection";
import { Belief } from "@/components/home/Belief";
import { Hero } from "@/components/home/Hero";
import { Loop } from "@/components/home/Loop";
import { MemberQuotes } from "@/components/home/MemberQuotes";
import { MemberWords } from "@/components/home/MemberWords";
import { OurPromise } from "@/components/home/OurPromise";
import { Scoreboard } from "@/components/home/Scoreboard";
import { PhotoBreak } from "@/components/ui/PhotoBreak";
import { photoBreak } from "@/content/home";

/**
 * Home: six screens and one photo break. Light: the hero, our belief, the
 * scoreboard, the loop. The photo break carries the fade to navy. Navy: the
 * members' words and quotes, the promise, then the waitlist. See CLAUDE.md.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Belief />
      <Scoreboard />
      <Loop />
      <PhotoBreak shot={photoBreak.shot} />
      <MemberWords />
      <MemberQuotes />
      <OurPromise />
      <BookingSection />
    </>
  );
}
