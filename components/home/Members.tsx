import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { Placeholder } from "@/components/ui/Photo";
import { members } from "@/content/home";

/**
 * Screen 4 (navy): "Seen. Belong. Progress." Three quotes, each under its
 * word, with a member portrait placeholder, first name and age (TODOs until
 * written consent). Side by side on desktop; stacked on phones, a small
 * portrait beside each quote.
 */
export function Members() {
  return (
    <Section chapter tone="navy">
      <div className="mx-auto w-full max-w-wide px-gutter">
        <div className="md:ml-[8.333%] md:max-w-5xl">
          <Reveal stagger={0.2}>
            <RevealItem as="h2" className="text-h2 md:text-display">{members.headline}</RevealItem>
            <RevealItem as="p" className="mt-2 text-body-lg opacity-85 md:mt-5 md:text-h3">{members.line}</RevealItem>
          </Reveal>
          <Reveal as="ul" className="mt-5 grid gap-4 short:mt-3 short:gap-2 md:mt-12 md:grid-cols-3 md:gap-10" stagger={0.25}>
            {members.quotes.map((q) => (
              <RevealItem as="li" key={q.word} className="border-t border-current/15 pt-3 short:pt-2 md:pt-5">
                <p className="text-label uppercase opacity-75">{q.word}</p>
                <figure className="mt-2 flex gap-4 md:mt-4 md:block">
                  <div className="w-14 shrink-0 md:w-32">
                    <Placeholder ratio="" shot={members.shot(q.word)} className="aspect-[4/5] p-0 [&>span]:hidden md:p-2 md:[&>span]:inline" />
                  </div>
                  <div>
                    <blockquote className="text-body short:text-[0.9375rem] short:leading-snug md:mt-4 md:text-body-lg">
                      <span aria-hidden>“</span>
                      {q.quote}
                      <span aria-hidden>”</span>
                    </blockquote>
                    <figcaption className="mt-1 text-caption text-terracotta">
                      {members.name}, {members.age}
                      {q.source && <span className="block">{q.source}</span>}
                    </figcaption>
                  </div>
                </figure>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
