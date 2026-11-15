import { BookingSection } from "@/components/booking/BookingSection";
import { FirstHour } from "@/components/home/FirstHour";
import { Hero } from "@/components/home/Hero";
import { Investment } from "@/components/home/Investment";
import { MemberWords } from "@/components/home/MemberWords";
import { Patterns } from "@/components/home/Patterns";
import { Poem } from "@/components/home/Poem";
import { Problem } from "@/components/home/Problem";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Poem />
      <Patterns />
      <FirstHour />
      <MemberWords />
      <Investment />
      <BookingSection />
    </>
  );
}
