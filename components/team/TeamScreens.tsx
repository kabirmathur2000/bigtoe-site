import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { BookButton } from "@/components/ui/BookButton";
import { Placeholder } from "@/components/ui/Photo";
import { founders, sherpas, story } from "@/content/team";

function Todo({ children }: { children: string }) {
  return <span className="mt-1 block text-caption text-terracotta">{children}</span>;
}

/** Screen 1 (light, no photo): "Why we built this.", Jay's story, signed "Jay", the button. */
export function Story() {
  return (
    <Section chapter>
      <div className="mx-auto w-full max-w-wide px-gutter">
        <Reveal className="max-w-3xl md:ml-[8.333%]" stagger={0.25}>
          <RevealItem as="h1" className="text-h1 md:text-display">{story.headline}</RevealItem>
          {story.paragraphs.map((p) => (
            <RevealItem key={p} as="p" className="mt-4 text-h3 md:mt-6">{p}</RevealItem>
          ))}
          <RevealItem as="p" className="mt-5 text-h3 opacity-75 md:mt-8">{story.signature}</RevealItem>
          <RevealItem as="span"><Todo>{story.todo}</Todo></RevealItem>
          <RevealItem className="mt-6 md:mt-10">
            <div data-cta>
              <BookButton placement="team-story" />
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </Section>
  );
}

/**
 * Screen 2 (light): "The four of us.", the three values, then the four
 * founders. Phones: a list, small portrait beside name, role and
 * background. Wider: four portraits in a row.
 */
export function Founders() {
  return (
    <Section chapter>
      <div className="mx-auto w-full max-w-wide px-gutter">
        <div className="md:ml-[8.333%] md:max-w-5xl">
          <Reveal stagger={0.2}>
            <RevealItem as="h2" className="text-h2 md:text-h1">{founders.headline}</RevealItem>
            <RevealItem className="mt-3 space-y-1 md:mt-6">
              {founders.values.map((v) => (
                <p key={v} className="text-body short:text-[0.9375rem] short:leading-snug md:text-body-lg">{v}</p>
              ))}
            </RevealItem>
          </Reveal>

          <Reveal as="ul" className="mt-4 border-t border-current/15 md:mt-10 md:grid md:grid-cols-4 md:gap-x-8 md:border-0" stagger={0.15}>
            {founders.people.map((p) => (
              <RevealItem as="li" key={p.name} className="flex items-center gap-4 border-b border-current/15 py-1.5 short:py-1 md:block md:border-0 md:py-0">
                <div className="w-12 shrink-0 md:w-auto">
                  <Placeholder ratio="" shot={p.shot} className="aspect-[4/5] p-0 [&>span]:hidden md:aspect-[4/3] md:p-3 md:[&>span]:inline" />
                </div>
                <div>
                  <p className="text-body leading-snug md:mt-3 md:text-h3">{p.name}</p>
                  <p className="text-caption leading-snug opacity-75 md:mt-1 md:text-body">
                    {p.role} {p.background}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/**
 * Screen 3 (navy): "Your Sherpas.", the Everest line, five portraits with
 * name, "Sherpa" and their line; then Jeevan; then one member quote. It
 * runs longer than one screen on phones (allowed).
 */
export function Sherpas() {
  const q = sherpas.quote;
  return (
    <Section chapter tone="navy" className="pb-[calc(var(--chapter-pad)+var(--bar-h)+2rem)] md:pb-16">
      <div className="mx-auto w-full max-w-wide px-gutter">
        <div className="md:ml-[8.333%] md:max-w-6xl">
          <Reveal stagger={0.2}>
            <RevealItem as="h2" className="text-h1 md:text-h1">{sherpas.headline}</RevealItem>
            <RevealItem as="p" className="mt-3 text-body-lg opacity-85 md:mt-4 md:text-h3">{sherpas.line}</RevealItem>
            <RevealItem as="span"><Todo>{sherpas.todo}</Todo></RevealItem>
          </Reveal>

          <Reveal as="ul" className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-2 md:mt-10 md:grid-cols-5 md:gap-x-6" stagger={0.12}>
            {sherpas.people.map((p) => (
              <RevealItem as="li" key={p.name} className="flex gap-4 md:block">
                <div className="w-16 shrink-0 md:w-full">
                  <Placeholder ratio="" shot={p.shot} className="aspect-[4/5] p-0 [&>span]:hidden md:aspect-square md:p-3 md:[&>span]:inline" />
                </div>
                <div>
                  <p className="text-body md:mt-3 md:text-body-lg">
                    {p.name} <span className="text-label uppercase opacity-75">{sherpas.role}</span>
                  </p>
                  <p className="mt-1 text-caption opacity-85">{p.line}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal className="mt-8 grid gap-6 border-t border-current/15 pt-6 md:mt-10 md:grid-cols-2 md:gap-10 md:pt-8" stagger={0.2}>
            <RevealItem as="p" className="text-body-lg md:text-h3">{sherpas.jeevan}</RevealItem>
            <RevealItem>
              <figure className="flex gap-4">
                <div className="w-14 shrink-0 md:w-20">
                  <Placeholder ratio="" shot={q.shot} className="aspect-[4/5] p-0 [&>span]:hidden" />
                </div>
                <div>
                  <blockquote className="text-body md:text-body-lg">
                    <span aria-hidden>“</span>
                    {q.text}
                    <span aria-hidden>”</span>
                  </blockquote>
                  <figcaption className="mt-1 text-caption text-terracotta">
                    {q.name}, {q.age}
                    <span className="block">{q.source}</span>
                  </figcaption>
                </div>
              </figure>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
