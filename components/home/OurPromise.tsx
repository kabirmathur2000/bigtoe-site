import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { promise } from "@/content/home";

/**
 * Chapter 6, OUR PROMISE. The promise, then one small line for the price
 * (from the lowest) and one for the guarantee. The full range lives in
 * Method's questions.
 */
export function OurPromise() {
  return (
    <Section chapter tone="navy">
      <div className="mx-auto max-w-wide px-gutter">
        <Reveal className="md:ml-[8.333%]" stagger={0.25}>
          <RevealItem as="h2" className="text-h1">
            {/* One sentence per line. */}
            {promise.headline.split(/(?<=\.)\s+/).map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </RevealItem>
          <div className="mt-10 max-w-text border-t border-current/15 pt-6 md:mt-14">
            <RevealItem as="p" className="text-body-lg">{promise.price}</RevealItem>
            <RevealItem as="p" className="mt-1 text-body-lg opacity-75">{promise.guarantee}</RevealItem>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
