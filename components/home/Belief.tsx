import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { belief } from "@/content/home";

/** Chapter 2, THE CORE BELIEF. One statement, two short lines. */
export function Belief() {
  return (
    <Section chapter>
      <div className="mx-auto w-full max-w-wide px-gutter">
        <Reveal className="max-w-5xl md:ml-[8.333%]" stagger={0.25}>
          <RevealItem as="h2" className="text-display">{belief.headline}</RevealItem>
          <div className="mt-12 max-w-text border-t border-current/15 pt-8 md:mt-16">
            {belief.lines.map((l) => (
              <RevealItem key={l} as="p" className="text-h3 not-first:mt-2 not-first:opacity-75">{l}</RevealItem>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
