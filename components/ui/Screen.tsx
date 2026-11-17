import type { ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section, type Tone } from "@/components/motion/SectionTone";
import { Placeholder } from "@/components/ui/Photo";

type Heading = "h1" | "h2";

/**
 * A text screen: one short headline, one supporting line (or a few short
 * lines, where the plan marks them), and optionally a button or link.
 * Light or navy; content on the shared left edge.
 */
export function TextScreen({
  tone = "light",
  as = "h2",
  headline,
  lines = [],
  children,
}: {
  tone?: Tone;
  as?: Heading;
  headline: string;
  lines?: readonly string[];
  children?: ReactNode;
}) {
  return (
    <Section chapter tone={tone}>
      <div className="mx-auto w-full max-w-wide px-gutter">
        <Reveal className="max-w-4xl md:ml-[8.333%]" stagger={0.25}>
          <RevealItem as={as} className="text-h1 md:text-display">{headline}</RevealItem>
          {lines.length > 0 && (
            <RevealItem className="mt-6 max-w-2xl space-y-3 md:mt-8">
              {lines.map((l) => (
                <p key={l} className="text-h3 opacity-85">{l}</p>
              ))}
            </RevealItem>
          )}
          {children && <RevealItem className="mt-8 md:mt-12">{children}</RevealItem>}
        </Reveal>
      </div>
    </Section>
  );
}

/**
 * A photo screen, 10 Squared style. `layout="top"`: the photograph across
 * the top, the words below. `layout="side"`: on desktop a tall, narrow
 * photograph beside the words (stacked on phones). The first screen of a
 * page sits below the navigation; later ones run the photo to the top edge.
 * `strip` puts a thin navy strip along the photo's bottom edge. As the first
 * navy section of a page (`photoBreak`), the colour fade runs across it.
 */
export function PhotoScreen({
  tone = "light",
  as = "h2",
  layout = "top",
  shot,
  strip,
  first = false,
  photoBreak = false,
  headline,
  line,
  note,
  children,
}: {
  tone?: Tone;
  as?: Heading;
  layout?: "top" | "side";
  shot: string;
  strip?: readonly string[];
  first?: boolean;
  photoBreak?: boolean;
  headline: string;
  line?: string;
  note?: string;
  children?: ReactNode;
}) {
  const H = as;
  const words = (
    <div className="max-w-4xl">
      {/* The first screen's headline is readable on first paint. */}
      <H className="text-h1 text-balance md:text-display">{headline}</H>
      {line && <p className={`mt-3 max-w-2xl text-body-lg opacity-85 md:mt-5 md:text-h3 ${first ? "fade-up" : ""}`}>{line}</p>}
      {note && <p className="mt-3 max-w-2xl text-caption opacity-75 md:mt-4 md:text-body">{note}</p>}
      {children && <div className="mt-5 md:mt-8">{children}</div>}
    </div>
  );

  const photo = (
    <div className="relative flex min-h-[24svh] flex-1 short:min-h-[18svh]">
      <Placeholder ratio="" shot={shot} className={`flex-1 md:p-6 ${strip ? "pb-14 md:pb-16" : ""}`} />
      {strip && (
        <p className="absolute inset-x-0 bottom-0 bg-navy px-gutter py-2 text-[0.8125rem] text-offwhite md:py-2.5 md:pl-[calc(var(--gutter)+8.333%)] md:text-caption">
          {/* Each item stays whole, with its dot; the strip wraps between items. */}
          {strip.map((s, i) => (
            <span key={s}>
              <span className="whitespace-nowrap">
                {s}
                {i < strip.length - 1 && <span aria-hidden className="ml-2 opacity-75">·</span>}
              </span>{" "}
            </span>
          ))}
        </p>
      )}
    </div>
  );

  const height = first ? "h-[calc(100svh-var(--header-h))]" : "h-svh";

  if (layout === "side") {
    return (
      <Section chapter tone={tone} photoBreak={photoBreak} className={`${height} justify-start p-0 pb-(--bar-h) md:flex-row md:items-stretch md:pb-0`}>
        <div className="flex flex-1 md:w-[36%] md:flex-none">{photo}</div>
        <div className="flex px-gutter pt-5 pb-6 md:flex-1 md:items-center md:px-16 md:py-0">{words}</div>
      </Section>
    );
  }

  return (
    <Section chapter tone={tone} photoBreak={photoBreak} className={`${height} justify-start p-0 pb-(--bar-h)`}>
      {photo}
      <div className="mx-auto w-full max-w-wide px-gutter pt-5 pb-6 md:pt-10 md:pb-14">
        <div className="md:ml-[8.333%]">{words}</div>
      </div>
    </Section>
  );
}
