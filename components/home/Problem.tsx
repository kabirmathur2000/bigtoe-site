import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { Photo } from "@/components/ui/Photo";
import { problem } from "@/content/home";

/** Home block 2. */
export function Problem() {
  return (
    <Section className="py-section">
      <div className="mx-auto max-w-wide px-gutter">
        <Reveal className="max-w-5xl">
          <RevealItem as="p" className="text-label uppercase opacity-70">{problem.label}</RevealItem>
          <RevealItem as="h2" className="mt-6 text-h1">{problem.headline}</RevealItem>
        </Reveal>

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Photo shot={problem.photo.shot} ratio="4 / 5" />
          </div>
          <Reveal className="md:col-span-6 md:col-start-7 md:self-center">
            <RevealItem as="p" className="text-h2">{problem.beliefs.sport}</RevealItem>
            <RevealItem as="p" className="mt-6 max-w-text text-body-lg opacity-80">{problem.beliefs.sportBody}</RevealItem>
            <RevealItem as="p" className="mt-4 max-w-text text-body-lg opacity-80">{problem.beliefs.sportClose}</RevealItem>
            <RevealItem as="p" className="mt-12 text-h2">{problem.beliefs.secondHalf}</RevealItem>
            <RevealItem as="p" className="mt-12 border-t border-current/15 pt-6 text-h3">
              {problem.fades}
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
