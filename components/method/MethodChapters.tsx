import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { Placeholder } from "@/components/ui/Photo";
import { fades, training } from "@/content/method";

/** A plain line-drawn bulb, hairline weight. */
function Bulb({ accent = false }: { accent?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className={`h-12 w-9 md:h-20 md:w-15 ${accent ? "text-terracotta" : ""}`}
    >
      <path vectorEffect="non-scaling-stroke" d="M24 4a17 17 0 0 0-10 30.8c2.6 2 4 4.4 4 7.2V46h12v-4c0-2.8 1.4-5.2 4-7.2A17 17 0 0 0 24 4Z" />
      <path vectorEffect="non-scaling-stroke" d="M19 51h10M20.5 56h7" />
    </svg>
  );
}

/** Chapter 1, WHAT FADES: three bulbs, one line each. Power, which goes first, is the accent. */
export function Fades() {
  return (
    <Section chapter>
      <div className="mx-auto max-w-wide px-gutter">
        <Reveal className="max-w-3xl md:ml-[8.333%]" stagger={0.18}>
          <RevealItem as="h1" className="text-[2.125rem] leading-[1.05] font-light tracking-[-0.015em] md:text-h1">{fades.headline}</RevealItem>
        </Reveal>

        <Reveal as="ul" className="mt-8 grid gap-0 md:mt-14 md:ml-[8.333%] md:max-w-5xl md:grid-cols-3 md:gap-10" stagger={0.2} delay={0.2}>
          {fades.bulbs.map((b, i) => (
            <RevealItem
              as="li"
              key={b.name}
              className="flex items-center gap-5 border-t border-current/15 py-4 md:block md:py-6"
            >
              <Bulb accent={i === fades.bulbs.length - 1} />
              <div className="md:mt-6">
                <p className="text-h3">{b.name}</p>
                <p className="mt-1 text-body opacity-75">{b.line}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="md:ml-[8.333%]" delay={0.6}>
          <RevealItem as="p" className="mt-6 border-t border-current/15 pt-5 text-h3 md:mt-10 md:max-w-5xl md:border-0 md:pt-0">
            {fades.close}
          </RevealItem>
        </Reveal>
      </div>
    </Section>
  );
}

/** Chapter 2, HOW WE TRAIN: one photograph beside three short lines and the two paths. */
export function Training() {
  return (
    <Section chapter>
      <div className="mx-auto grid w-full max-w-wide gap-6 px-gutter md:grid-cols-12 md:items-center md:gap-12">
        <div className="order-last md:order-none md:col-span-5 md:col-start-2">
          <Placeholder ratio="" shot={training.shot} className="aspect-[5/2] short:hidden md:aspect-[4/5] md:max-h-[64svh]" />
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <Reveal stagger={0.18}>
            <RevealItem as="h2" className="text-h1">{training.headline}</RevealItem>
          </Reveal>

          <Reveal as="ul" className="mt-5 border-t border-current/15 md:mt-8" stagger={0.18} delay={0.2}>
            {training.lines.map((l) => (
              <RevealItem as="li" key={l} className="border-b border-current/15 py-2.5 text-body-lg md:py-4">
                {l}
              </RevealItem>
            ))}
          </Reveal>

          <Reveal className="mt-5 md:mt-8" stagger={0.18} delay={0.5}>
            <RevealItem as="p" className="text-label uppercase opacity-60">
              {training.paths.join("  ·  ")}
            </RevealItem>
            <RevealItem as="p" className="mt-3 text-h3">{training.pathsLine}</RevealItem>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
