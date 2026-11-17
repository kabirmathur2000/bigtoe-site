import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { BookButton } from "@/components/ui/BookButton";
import { Placeholder } from "@/components/ui/Photo";
import { founders, sherpas, story } from "@/content/team";

function Todo({ children }: { children: string }) {
  return <p className="mt-1 text-caption text-terracotta">{children}</p>;
}

/** Screen 1 (light, no visual): "Why we built this.", Jay's story, signed "Jay". */
export function Story() {
  return (
    <Section chapter>
      <div className="mx-auto w-full max-w-wide px-gutter">
        <Reveal className="max-w-3xl md:ml-[8.333%]" stagger={0.25}>
          <RevealItem as="h1" className="text-h1 md:text-display">{story.headline}</RevealItem>
          {story.paragraphs.map((p) => (
            <RevealItem key={p} as="p" className="mt-5 text-h3 md:mt-6">{p}</RevealItem>
          ))}
          <RevealItem as="p" className="mt-6 text-h3 opacity-75 md:mt-8">{story.signature}</RevealItem>
          <RevealItem as="span"><Todo>{story.todo}</Todo></RevealItem>
        </Reveal>
      </div>
    </Section>
  );
}

/**
 * Screen 2 (light): "The four of us.", the three values, then the four
 * founders. Phones: a list, small portrait beside name and role. Wider:
 * four portraits in a row.
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
                  <p className="text-body md:mt-3 md:text-h3">{p.name}</p>
                  {p.role && <p className="text-caption opacity-75 md:mt-1 md:text-body">{p.role}</p>}
                  {p.todo && <Todo>{p.todo}</Todo>}
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/** Screen 3 (navy): "Your Sherpas.", four portraits, first names only. */
export function Sherpas() {
  return (
    <Section chapter tone="navy">
      <div className="mx-auto w-full max-w-wide px-gutter">
        <div className="md:ml-[8.333%] md:max-w-5xl">
          <Reveal>
            <RevealItem as="h2" className="text-h1 md:text-display">{sherpas.headline}</RevealItem>
            <RevealItem as="span"><Todo>{sherpas.todo}</Todo></RevealItem>
          </Reveal>
          <Reveal as="ul" className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 md:mt-12 md:grid-cols-4 md:gap-x-8" stagger={0.15}>
            {sherpas.people.map((p) => (
              <RevealItem as="li" key={p.name}>
                <Placeholder ratio="" shot={p.shot} className="aspect-[4/3] p-2 [&>span]:hidden md:aspect-[4/5] md:p-4 md:[&>span]:inline" />
                <p className="mt-2 text-body md:mt-3 md:text-h3">{p.name}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/** Screen 4 (navy): the one button, alone. A shorter closing screen. */
export function TeamClose() {
  return (
    <Section tone="navy" className="flex min-h-[60svh] items-center pb-(--bar-h)">
      <div data-cta className="mx-auto w-full max-w-wide px-gutter">
        <div className="md:ml-[8.333%]">
          <BookButton placement="team-end" />
        </div>
      </div>
    </Section>
  );
}
