import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { belief } from "@/content/home";

/** Chapter 2, THE CORE BELIEF. A small "Our belief" label and one statement. */
export function Belief() {
  return (
    <Section chapter>
      <div className="mx-auto w-full max-w-wide px-gutter">
        <Reveal className="max-w-5xl md:ml-[8.333%]" stagger={0.25}>
          <RevealItem as="p" className="text-label uppercase opacity-75">{belief.label}</RevealItem>
          <RevealItem as="h2" className="mt-6 text-display md:mt-10">{belief.headline}</RevealItem>
        </Reveal>
      </div>
    </Section>
  );
}
