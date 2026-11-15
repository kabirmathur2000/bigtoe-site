import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { Placeholder } from "@/components/ui/Photo";
import { answer } from "@/content/home";

/**
 * Chapter 4, OUR ANSWER. The Strength Reserve in one line, then three short
 * steps beside one photograph. One screen, so no pinned scroll: it simply
 * fades in.
 */
export function Answer() {
  return (
    <Section className="py-section">
      <div className="mx-auto grid max-w-wide gap-12 px-gutter md:grid-cols-12 md:items-center md:gap-12">
        {/* On mobile the photo follows the steps and is shorter, to keep the chapter near one screen. */}
        <div className="order-last md:order-none md:col-span-5 md:col-start-2">
          <Placeholder ratio="" shot={answer.shot} className="aspect-[3/2] md:aspect-[4/5] md:max-h-[72svh]" />
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <Reveal stagger={0.18}>
            <RevealItem as="p" className="text-label uppercase opacity-70">{answer.label}</RevealItem>
            <RevealItem as="h2" className="mt-6 text-h1">{answer.term}</RevealItem>
            <RevealItem as="p" className="mt-4 text-h3 opacity-75">{answer.definition}</RevealItem>
          </Reveal>

          <Reveal as="ul" className="mt-12 border-t border-current/15" stagger={0.18} delay={0.2}>
            {answer.steps.map((s, i) => (
              <RevealItem as="li" key={s.id} className="border-b border-current/15 py-6">
                <p className="text-label uppercase opacity-60">
                  {String(i + 1).padStart(2, "0")}
                  {"meta" in s && <span className="ml-4">{s.meta}</span>}
                </p>
                <h3 className="mt-3 text-h3">{s.title}</h3>
                <p className="mt-1 text-body opacity-75">{s.body}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
