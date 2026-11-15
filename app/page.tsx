import { FirstHour } from "@/components/home/FirstHour";
import { Hero } from "@/components/home/Hero";
import { Investment } from "@/components/home/Investment";
import { Patterns } from "@/components/home/Patterns";
import { Problem } from "@/components/home/Problem";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Patterns />
      <FirstHour />
      <Investment />
    </>
  );
}
