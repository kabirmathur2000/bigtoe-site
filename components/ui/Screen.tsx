import type { ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section, type Tone } from "@/components/motion/SectionTone";
import { Placeholder } from "@/components/ui/Photo";

type Heading = "h1" | "h2";

/**
 * A text screen: one short headline, one supporting line, and optionally a
 * button or link. Light or navy; content on the shared left edge.
 */
export function TextScreen({
  tone = "light",
  as = "h2",
  headline,
  line,
  children,
}: {
  tone?: Tone;
  as?: Heading;
  headline: string;
  line?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Section chapter tone={tone}>
      <div className="mx-auto w-full max-w-wide px-gutter">
        <Reveal className="max-w-4xl md:ml-[8.333%]" stagger={0.25}>
          <RevealItem as={as} className="text-h1 md:text-display">{headline}</RevealItem>
          {line && <RevealItem className="mt-6 max-w-2xl text-h3 opacity-85 md:mt-8">{line}</RevealItem>}
          {children && <RevealItem className="mt-8 md:mt-12">{children}</RevealItem>}
        </Reveal>
      </div>
    </Section>
  );
}

/**
 * A photo screen, 10 Squared style: the photograph across the top, the
 * headline, line and anything else below it, all in one screen. The first
 * screen of a page sits below the navigation; later ones run the photo to
 * the top edge (the floating navigation may pass over it). As the first
 * navy section of a page (`photoBreak`), the colour fade runs across it.
 */
export function PhotoScreen({
  tone = "light",
  as = "h2",
  shot,
  first = false,
  photoBreak = false,
  headline,
  line,
  children,
}: {
  tone?: Tone;
  as?: Heading;
  shot: string;
  first?: boolean;
  photoBreak?: boolean;
  headline: string;
  line?: ReactNode;
  children?: ReactNode;
}) {
  const H = as;
  return (
    <Section
      chapter
      tone={tone}
      photoBreak={photoBreak}
      className={`${first ? "h-[calc(100svh-var(--header-h))]" : "h-svh"} justify-start p-0 pb-(--bar-h)`}
    >
      <Placeholder ratio="" shot={shot} className="min-h-[24svh] flex-1 short:min-h-[18svh] md:p-6" />
      <div className="mx-auto w-full max-w-wide px-gutter pt-5 pb-6 md:pt-10 md:pb-14">
        <div className="max-w-4xl md:ml-[8.333%]">
          {/* The first screen's headline is readable on first paint. */}
          <H className="text-h1 text-balance md:text-display">{headline}</H>
          {line && <p className={`mt-3 max-w-2xl text-body-lg opacity-85 md:mt-5 md:text-h3 ${first ? "fade-up" : ""}`}>{line}</p>}
          {children && <div className="mt-5 md:mt-8">{children}</div>}
        </div>
      </div>
    </Section>
  );
}
