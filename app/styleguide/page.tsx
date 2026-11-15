import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { BookButton } from "@/components/ui/BookButton";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { styleguide as sg } from "@/content/styleguide";

export const metadata: Metadata = {
  title: sg.title,
  robots: { index: false },
};

const typeClass: Record<(typeof sg.typeTokens)[number], string> = {
  label: "text-label uppercase",
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  "body-lg": "text-body-lg max-w-text",
  body: "text-body max-w-text",
  caption: "text-caption opacity-70",
};

const typeText: Record<(typeof sg.typeTokens)[number], string> = {
  label: sg.typeSamples.label,
  display: sg.typeSamples.display,
  h1: sg.typeSamples.h1,
  h2: sg.typeSamples.h2,
  h3: sg.typeSamples.h3,
  "body-lg": sg.typeSamples.bodyLg,
  body: sg.typeSamples.body,
  caption: sg.typeSamples.caption,
};

function Heading({ children }: { children: string }) {
  return (
    <h2 className="mb-12 border-b border-current/15 pb-4 text-label uppercase opacity-70">{children}</h2>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-content px-gutter">{children}</div>;
}

export default function StyleguidePage() {
  return (
    <>
      <Section className="pt-section">
        <Wrap>
          <h1 className="text-h1">{sg.title}</h1>
          <p className="mt-6 max-w-text text-body-lg opacity-80">{sg.intro}</p>
        </Wrap>
      </Section>

      {/* Colour */}
      <Section className="pt-section">
        <Wrap>
          <Heading>{sg.sections.colour}</Heading>
          <div className="grid gap-6 md:grid-cols-3">
            {sg.colours.map((c) => (
              <div key={c.token}>
                <div
                  className="aspect-[4/3] border border-navy/15"
                  style={{ background: `var(--${c.token})` }}
                />
                <p className="mt-4 text-h3">{c.name}</p>
                <p className="text-caption opacity-70">{c.hex}</p>
                <p className="mt-2 text-caption">{c.share}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* Type */}
      <Section className="pt-section">
        <Wrap>
          <Heading>{sg.sections.type}</Heading>
          <div className="space-y-12">
            {sg.typeTokens.map((t) => (
              <div key={t} className="grid gap-3 md:grid-cols-[8rem_1fr] md:gap-8">
                <p className="pt-2 font-mono text-caption opacity-50">{t}</p>
                <p className={typeClass[t]}>{typeText[t]}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* Buttons */}
      <Section className="pt-section">
        <Wrap>
          <Heading>{sg.sections.buttons}</Heading>
          <div className="flex flex-wrap items-center gap-4">
            <BookButton placement="styleguide" />
            <ButtonLink href="/method" variant="outline">{sg.buttons.outline}</ButtonLink>
          </div>
          <p className="mt-6 text-caption opacity-70">{sg.buttons.note}</p>
        </Wrap>
      </Section>

      {/* Photo with caption */}
      <Section className="pt-section">
        <Wrap>
          <Heading>{sg.sections.photo}</Heading>
          <Photo shot={sg.photo.shot} caption={sg.photo.caption} ratio="16 / 9" reveal={false} />
        </Wrap>
      </Section>

      {/* Motion */}
      <Section className="py-section">
        <Wrap>
          <Heading>{sg.sections.motion}</Heading>

          <div className="space-y-24">
            <div>
              <h3 className="text-h3">{sg.motion.smooth.title}</h3>
              <p className="mt-2 max-w-text text-caption opacity-70">{sg.motion.smooth.note}</p>
            </div>

            <div>
              <h3 className="text-h3">{sg.motion.reveal.title}</h3>
              <p className="mt-2 max-w-text text-caption opacity-70">{sg.motion.reveal.note}</p>
              <Reveal className="mt-10 space-y-2">
                {sg.motion.reveal.lines.map((l) => (
                  <RevealItem key={l} as="p" className="text-h1">{l}</RevealItem>
                ))}
              </Reveal>
            </div>

            <div>
              <h3 className="text-h3">{sg.motion.imageReveal.title}</h3>
              <p className="mt-2 max-w-text text-caption opacity-70">{sg.motion.imageReveal.note}</p>
              <div className="mt-10 space-y-6">
                <Photo shot={sg.motion.imageReveal.shotWide} ratio="21 / 9" />
                <div className="md:w-1/2">
                  <Photo shot={sg.motion.imageReveal.shotHalf} ratio="4 / 5" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-h3">{sg.motion.tone.title}</h3>
              <p className="mt-2 max-w-text text-caption opacity-70">{sg.motion.tone.note}</p>
            </div>
          </div>
        </Wrap>
      </Section>

      <Section tone="navy" className="flex min-h-[90svh] items-center py-section">
        <Wrap>
          <Reveal className="space-y-10">
            <RevealItem as="p" className="text-display">{sg.motion.tone.navyLine}</RevealItem>
            <RevealItem>
              <BookButton placement="styleguide" />
            </RevealItem>
          </Reveal>
        </Wrap>
      </Section>

      <Section className="py-section">
        <Wrap>
          <h3 className="text-h3">{sg.motion.page.title}</h3>
          <p className="mt-2 max-w-text text-caption opacity-70">{sg.motion.page.note}</p>
          <Link href="/" className="mt-6 inline-block text-body underline underline-offset-4">
            {sg.motion.page.link}
          </Link>
        </Wrap>
      </Section>
    </>
  );
}
