import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { BookButton } from "@/components/ui/BookButton";
import { Placeholder } from "@/components/ui/Photo";
import { foundersNote, sherpas, social, story } from "@/content/team";

const Todo = ({ children }: { children: string }) => (
  <RevealItem as="p" className="mt-4 text-caption text-terracotta">{children}</RevealItem>
);

/**
 * Jay's story and the founders' note are quoted word for word, so they are
 * exempt from the 40-word rule. They sit in a narrow column with generous
 * line spacing, centred, and each paragraph fades in on its own as it is reached.
 */
const reading = "mx-auto max-w-[34rem]";

function Paragraph({ children, className }: { children: string; className?: string }) {
  return (
    <Reveal>
      <RevealItem as="p" className={`mt-7 md:mt-8 ${className ?? "text-body-lg leading-[1.8] opacity-85"}`}>{children}</RevealItem>
    </Reveal>
  );
}

/** Chapter 1: Jay's story, word for word. Text only; his portrait signs the note below. */
export function Story() {
  return (
    <Section chapter className="pt-12 md:pt-16">
      <div className="mx-auto max-w-wide px-gutter">
        <div className={reading}>
          <Reveal stagger={0.2}>
            <RevealItem as="h1" className="text-h1">{story.headline}</RevealItem>
          </Reveal>
          {story.paragraphs.map((p, i) => (
            <Paragraph key={i} className={i === 2 ? "text-h3 leading-[1.5]" : undefined}>{p}</Paragraph>
          ))}
          <Reveal>
            <RevealItem as="p" className="mt-8 text-label uppercase opacity-70">{story.signature}</RevealItem>
            <Todo>{story.todo}</Todo>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/** Chapter 2: the Sherpas first, portrait, first name and one line each. */
export function Sherpas() {
  return (
    <Section chapter>
      <div className="mx-auto max-w-wide px-gutter">
        <Reveal className="md:ml-[8.333%]">
          <RevealItem as="h2" className="text-h1">{sherpas.headline}</RevealItem>
          <Todo>{sherpas.todo}</Todo>
        </Reveal>
        {/* Phones: a list, small portrait beside name and line. Wider: four portraits. */}
        <Reveal as="ul" className="mt-4 border-t border-current/15 md:mt-12 md:ml-[8.333%] md:grid md:max-w-5xl md:grid-cols-4 md:gap-x-8 md:border-0" stagger={0.15}>
          {sherpas.people.map((p) => (
            <RevealItem as="li" key={p.name} className="flex items-center gap-4 border-b border-current/15 py-1.5 md:block md:border-0 md:py-0">
              <div className="w-12 shrink-0 md:w-auto">
                <Placeholder ratio="" shot={p.shot} className="aspect-[4/5] p-0 [&>span]:hidden md:p-4 md:[&>span]:inline" />
              </div>
              <div>
                <p className="text-h3 md:mt-4">{p.name}</p>
                {p.line && <p className="mt-1 text-caption opacity-75 md:text-body">{p.line}</p>}
                {p.todo && <p className="mt-1 text-caption text-terracotta">{p.todo}</p>}
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

/** Chapter 3: the founders' note, approved text, signed with four portraits. */
export function FoundersNote() {
  const n = foundersNote;
  return (
    <Section chapter className="pt-12 md:pt-16">
      <div className="mx-auto max-w-wide px-gutter">
        <div className={reading}>
          <Reveal stagger={0.15}>
            <RevealItem as="h2" className="text-h1">{n.headline}</RevealItem>
          </Reveal>
          {n.intro.map((p, i) => (
            <Paragraph key={i}>{p}</Paragraph>
          ))}
          <Paragraph>{n.pillarsIntro}</Paragraph>
          <div className="mt-6 border-t border-current/15">
            {n.pillars.map((p) => (
              <Reveal as="div" key={p.name}>
                <RevealItem as="div" className="border-b border-current/15 py-5">
                  <span className="block text-h3">{p.name}</span>
                  <span className="mt-1 block text-body leading-[1.75] opacity-80">{p.line}</span>
                </RevealItem>
              </Reveal>
            ))}
          </div>
          <Paragraph>{n.reserve}</Paragraph>
          <Reveal>
            <Todo>{n.reserveTodo}</Todo>
          </Reveal>
          <Paragraph className="text-h3 leading-[1.5]">{n.close}</Paragraph>
        </div>

        <Reveal as="ul" className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-8 md:mt-20 md:grid-cols-4 md:gap-x-8" stagger={0.15}>
          {n.founders.map((f) => (
            <RevealItem as="li" key={f.name}>
              <Placeholder ratio="4 / 5" shot={f.shot} />
              <p className="mt-3 text-body">{f.name}, {f.age}</p>
              {f.line && <p className="mt-1 text-caption opacity-75">{f.line}</p>}
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

/** Chapter 4: the social space, Deck 1 slide 18 in its own words. */
export function Social() {
  return (
    <Section chapter>
      <div className="mx-auto grid max-w-wide gap-6 px-gutter md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-5 md:col-start-2 md:self-center" stagger={0.2}>
          <RevealItem as="h2" className="text-h1">{social.headline}</RevealItem>
          <RevealItem as="p" className="mt-5 text-body-lg opacity-85 md:mt-8">{social.body}</RevealItem>
          <RevealItem as="p" className="mt-4 text-h3 md:mt-6">{social.close}</RevealItem>
        </Reveal>
        <div data-cta className="order-last md:order-none md:col-span-5 md:col-start-2 md:row-start-2">
          <BookButton placement="team-end" />
        </div>
        <div className="grid grid-cols-2 gap-3 short:hidden md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1 md:self-center md:gap-6">
          <Placeholder ratio="" shot={social.shots[0]} className="col-span-2 aspect-[5/2] md:aspect-[3/2]" />
          <Placeholder ratio="" shot={social.shots[1]} className="hidden md:flex md:aspect-square" />
          <Placeholder ratio="" shot={social.shots[2]} className="hidden md:flex md:aspect-square" />
        </div>
      </div>
    </Section>
  );
}
