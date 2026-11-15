import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { promise } from "@/content/home";

/**
 * Chapter 6, OUR PROMISE. The promise, then the price and guarantee, stated
 * plainly once. The page then fades slowly into the navy form below.
 */
export function OurPromise() {
  return (
    <Section className="py-section">
      <div className="mx-auto grid max-w-wide gap-12 px-gutter md:grid-cols-12">
        <Reveal className="md:col-span-6 md:col-start-2">
          <RevealItem as="p" className="text-label uppercase opacity-70">{promise.label}</RevealItem>
          <RevealItem as="h2" className="mt-6 text-h1">{promise.headline}</RevealItem>
        </Reveal>

        <Reveal as="ul" className="border-t border-current/15 md:col-span-4 md:col-start-8 md:self-end" stagger={0.18}>
          {promise.rows.map((r) => (
            <RevealItem as="li" key={r.label} className="border-b border-current/15 py-6">
              <span className="block text-label uppercase opacity-60">{r.label}</span>
              <span className="mt-2 block text-h3">{r.value}</span>
              {"note" in r && <span className="mt-2 block text-body opacity-70">{r.note}</span>}
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
