import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { Placeholder } from "@/components/ui/Photo";
import { foundersNote, sherpas, social, story } from "@/content/team";

const Label = ({ children }: { children: string }) => (
  <RevealItem as="p" className="text-label uppercase opacity-70">{children}</RevealItem>
);

const Todo = ({ children }: { children: string }) => (
  <RevealItem as="p" className="mt-4 text-caption text-terracotta">{children}</RevealItem>
);

/** Chapter 1: Jay's story, word for word. Text only; his portrait signs the note below. */
export function Story() {
  return (
    <Section className="py-section">
      <div className="mx-auto max-w-wide px-gutter">
        <Reveal className="max-w-text md:ml-[8.333%]" stagger={0.2}>
          <Label>{story.label}</Label>
          <RevealItem as="h1" className="mt-6 text-h1">{story.headline}</RevealItem>
          {story.paragraphs.map((p, i) => (
            <RevealItem key={i} as="p" className={`mt-8 text-body-lg ${i === 2 ? "text-h3" : "opacity-85"}`}>{p}</RevealItem>
          ))}
          <RevealItem as="p" className="mt-10 text-label uppercase opacity-70">{story.signature}</RevealItem>
          <Todo>{story.todo}</Todo>
        </Reveal>
      </div>
    </Section>
  );
}

/** Chapter 2: the Sherpas first, portrait, first name and one line each. */
export function Sherpas() {
  return (
    <Section className="py-section">
      <div className="mx-auto max-w-wide px-gutter">
        <Reveal className="md:ml-[8.333%]">
          <Label>{sherpas.label}</Label>
          <RevealItem as="h2" className="mt-6 text-h1">{sherpas.headline}</RevealItem>
          <Todo>{sherpas.todo}</Todo>
        </Reveal>
        <Reveal as="ul" className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:ml-[8.333%] md:max-w-5xl md:grid-cols-4 md:gap-x-8" stagger={0.15}>
          {sherpas.people.map((p) => (
            <RevealItem as="li" key={p.name}>
              <Placeholder ratio="4 / 5" shot={p.shot} />
              <p className="mt-4 text-h3">{p.name}</p>
              <p className="mt-1 text-caption opacity-75 md:text-body">{p.line}</p>
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
    <Section className="py-section">
      <div className="mx-auto max-w-wide px-gutter">
        <Reveal className="max-w-text md:ml-[8.333%]" stagger={0.15}>
          <Label>{n.label}</Label>
          <RevealItem as="h2" className="mt-6 text-h1">{n.headline}</RevealItem>
          {n.intro.map((p, i) => (
            <RevealItem key={i} as="p" className="mt-8 text-body-lg opacity-85">{p}</RevealItem>
          ))}
          <RevealItem as="p" className="mt-8 text-body-lg opacity-85">{n.pillarsIntro}</RevealItem>
          <ul className="mt-6 border-t border-current/15">
            {n.pillars.map((p) => (
              <RevealItem as="li" key={p.name} className="border-b border-current/15 py-5">
                <span className="block text-h3">{p.name}</span>
                <span className="mt-1 block text-body opacity-80">{p.line}</span>
              </RevealItem>
            ))}
          </ul>
          <RevealItem as="p" className="mt-8 text-body-lg opacity-85">{n.reserve}</RevealItem>
          <Todo>{n.reserveTodo}</Todo>
          <RevealItem as="p" className="mt-10 text-h3">{n.close}</RevealItem>
        </Reveal>

        <Reveal as="ul" className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-20 md:ml-[8.333%] md:max-w-4xl md:grid-cols-4 md:gap-x-8" stagger={0.15}>
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
    <Section className="py-section">
      <div className="mx-auto grid max-w-wide gap-10 px-gutter md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-5 md:col-start-2 md:self-center" stagger={0.2}>
          <Label>{social.label}</Label>
          <RevealItem as="h2" className="mt-6 text-h1">{social.headline}</RevealItem>
          <RevealItem as="p" className="mt-8 text-body-lg opacity-85">{social.body}</RevealItem>
          <RevealItem as="p" className="mt-6 text-h3">{social.close}</RevealItem>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:col-span-5 md:col-start-8 md:gap-6">
          <Placeholder ratio="3 / 2" shot={social.shots[0]} className="col-span-2" />
          <Placeholder ratio="1 / 1" shot={social.shots[1]} />
          <Placeholder ratio="1 / 1" shot={social.shots[2]} />
        </div>
      </div>
    </Section>
  );
}
