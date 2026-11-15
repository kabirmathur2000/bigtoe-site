import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { BookButton } from "@/components/ui/BookButton";
import { Placeholder } from "@/components/ui/Photo";
import { sherpas, social, story } from "@/content/team";

const Todo = ({ children }: { children: string }) => (
  <RevealItem as="p" className="mt-4 text-caption text-terracotta">{children}</RevealItem>
);


/** Jay's story with its chosen phrases in Bold (story.bold), text unchanged. */
function withBold(text: string) {
  const escape = (b: string) => b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${story.bold.map(escape).join("|")})`));
  const bold = story.bold as readonly string[];
  return parts.map((part, i) => (bold.includes(part) ? <strong key={i} className="font-bold">{part}</strong> : part));
}

/**
 * Chapter 1: Jay's words. No visible heading: his story, word for word, as
 * a large centred quote, signed. Wider and larger on desktop so it fills the
 * screen comfortably. The page title stays for screen readers.
 */
export function Story() {
  const last = story.paragraphs.length - 1;
  return (
    <Section chapter>
      <div className="mx-auto max-w-wide px-gutter">
        <h1 className="sr-only">{story.headline}</h1>
        <blockquote className="mx-auto max-w-[34rem] text-center md:max-w-[52rem]">
          {story.paragraphs.map((p, i) => {
            const cls = "text-[1.25rem] leading-[1.5] md:text-[2rem] md:leading-[1.35] md:font-light";
            const text = (
              <>
                {i === 0 && <span aria-hidden>“</span>}
                {withBold(p)}
                {i === last && <span aria-hidden>”</span>}
              </>
            );
            // The first paragraph fades in with CSS at first paint; the rest as they are reached.
            if (i === 0) return <p key={i} className={`fade-up ${cls}`}>{text}</p>;
            return (
              <Reveal key={i}>
                <RevealItem as="p" className={`mt-5 md:mt-8 ${cls}`}>{text}</RevealItem>
              </Reveal>
            );
          })}
        </blockquote>
        <Reveal className="mt-8 text-center md:mt-12">
          <RevealItem as="p" className="text-label uppercase opacity-75">{story.signature}</RevealItem>
          <Todo>{story.todo}</Todo>
        </Reveal>
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


/**
 * Chapter 4: the social space, Deck 1 slide 18 in its own words. A text
 * screen: the photo break just before it carries the picture.
 */
export function Social() {
  return (
    <Section chapter tone="navy">
      <div className="mx-auto max-w-wide px-gutter">
        <Reveal className="max-w-3xl md:ml-[8.333%]" stagger={0.2}>
          <RevealItem as="h2" className="text-h1">{social.headline}</RevealItem>
          {social.lines.map((l, i) => (
            <RevealItem key={l} as="p" className={`text-h3 ${i ? "mt-2" : "mt-6 md:mt-10"}`}>{l}</RevealItem>
          ))}
        </Reveal>
        <div data-cta className="mt-8 md:mt-12 md:ml-[8.333%]">
          <BookButton placement="team-end" />
        </div>
      </div>
    </Section>
  );
}
