import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { BookButton } from "@/components/ui/Button";
import { investment } from "@/content/home";

/** Home block 5. Stated plainly, once. */
export function Investment() {
  return (
    <Section className="py-section">
      <div className="mx-auto grid max-w-wide gap-12 px-gutter md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <RevealItem as="p" className="text-label uppercase opacity-70">{investment.label}</RevealItem>
          <RevealItem as="h2" className="mt-6 text-h1">{investment.headline}</RevealItem>
        </Reveal>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal as="ul" className="border-t border-current/15" stagger={0.15}>
            {investment.rows.map((r) => (
              <RevealItem as="li" key={r.label} className="grid gap-2 border-b border-current/15 py-7 md:grid-cols-[9rem_1fr] md:gap-8">
                <span className="pt-1.5 text-label uppercase opacity-60">{r.label}</span>
                <span>
                  <span className="block text-h3">{r.value}</span>
                  {"note" in r && <span className="mt-2 block text-body opacity-70">{r.note}</span>}
                </span>
              </RevealItem>
            ))}
          </Reveal>
          <div className="mt-12">
            <BookButton />
          </div>
        </div>
      </div>
    </Section>
  );
}
