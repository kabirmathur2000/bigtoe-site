import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { book } from "@/content/book";
import { facts } from "@/content/facts";

/** Book page, first chapter: where we train, the address and hours. */
export function Visit() {
  return (
    <Section chapter>
      <div className="mx-auto grid max-w-wide gap-12 px-gutter md:grid-cols-12">
        <Reveal className="md:col-span-6 md:col-start-2">
          <RevealItem as="h1" className="text-[2.125rem] leading-[1.05] font-light tracking-[-0.015em] md:text-h1">{book.headline}</RevealItem>
        </Reveal>

        <Reveal className="border-t border-current/15 md:col-span-4 md:col-start-8 md:self-end" stagger={0.15}>
          <RevealItem className="border-b border-current/15 py-6">
            <p className="text-label uppercase opacity-60">{book.addressLabel}</p>
            <div className="mt-2">
              <address className="not-italic text-body-lg">
                {facts.address.lines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
              <p className="mt-3 text-body opacity-75">{facts.parking}</p>
              {facts.address.mapUrl ? (
                <a href={facts.address.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-body underline underline-offset-4">
                  {book.mapLabel}
                </a>
              ) : (
                <p className="mt-3 text-caption text-terracotta">{book.mapMissing}</p>
              )}
            </div>
          </RevealItem>
          <RevealItem className="border-b border-current/15 py-6">
            <p className="text-label uppercase opacity-60">{book.hoursLabel}</p>
            <p className="mt-2 text-body-lg">{facts.hours}</p>
          </RevealItem>
        </Reveal>
      </div>
    </Section>
  );
}
