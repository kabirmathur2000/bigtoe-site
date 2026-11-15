import { BookingSection } from "@/components/booking/BookingSection";
import { Answer } from "@/components/home/Answer";
import { Belief } from "@/components/home/Belief";
import { Hero } from "@/components/home/Hero";
import { MemberQuotes } from "@/components/home/MemberQuotes";
import { MemberWords } from "@/components/home/MemberWords";
import { Poem } from "@/components/home/Poem";
import { OurPromise } from "@/components/home/OurPromise";

/** Home: six chapters (the members' words followed by their quotes), then the form on navy. See CLAUDE.md. */
export default function Home() {
  return (
    <>
      <Hero />
      <Belief />
      <Poem />
      <Answer />
      <MemberWords />
      <MemberQuotes />
      <OurPromise />
      <BookingSection />
    </>
  );
}
