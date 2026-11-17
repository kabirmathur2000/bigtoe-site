import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section, type Tone } from "@/components/motion/SectionTone";
import { Placeholder } from "@/components/ui/Photo";

type Heading = "h1" | "h2";

/** A real photograph, with its crop for tall (phone) and wide screens as object-position values. */
export type ScreenPhoto = { src: StaticImageData; alt: string; phone: string; wide: string };

/**
 * A text screen: one short headline, one supporting line (or a few short
 * lines, where the plan marks them), and optionally a button or link.
 * Light or navy; content on the shared left edge. One screen tall on
 * desktop; on phones it sizes to its content with even spacing.
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
 * photograph beside the words. The first screen of a page fills the window
 * below the navigation on every device. Later screens fill the window on
 * desktop; on phones the photograph keeps a fixed shape and the screen
 * sizes to its content, so there are no empty stretches. `photo` is a real
 * photograph (loaded eagerly at high priority on the first screen, cropped per screen); otherwise a placeholder
 * named for `shot`. `caption` sits small on the photo, bottom left. As the
 * first navy section of a page (`photoBreak`), the colour fade runs across it.
 */
export function PhotoScreen({
  tone = "light",
  as = "h2",
  layout = "top",
  shot,
  photo,
  caption,
  first = false,
  photoBreak = false,
  headline,
  line,
  note,
  children,
  childrenDesktopOnly = false,
}: {
  tone?: Tone;
  as?: Heading;
  layout?: "top" | "side";
  shot?: string;
  photo?: ScreenPhoto;
  caption?: string;
  first?: boolean;
  photoBreak?: boolean;
  headline: string;
  line?: string;
  note?: string;
  children?: ReactNode;
  /** The children (an in-page button) show on desktop only; phones use the bottom bar. */
  childrenDesktopOnly?: boolean;
}) {
  const H = as;
  const words = (
    <div className="max-w-4xl">
      {/* The first screen's headline is readable on first paint. */}
      <H className="text-h1 text-balance md:text-display">{headline}</H>
      {line && <p className={`mt-3 max-w-2xl text-body-lg opacity-85 md:mt-5 md:text-h3 ${first ? "fade-up" : ""}`}>{line}</p>}
      {note && <p className="mt-3 max-w-2xl text-caption opacity-75 md:mt-4 md:text-body">{note}</p>}
      {children && <div className={childrenDesktopOnly ? "mt-8 hidden md:block" : "mt-5 md:mt-8"}>{children}</div>}
    </div>
  );

  // Phones: the first screen's photo fills what the words leave; later photos keep a fixed shape.
  const phoneShape = first ? "min-h-[24svh] flex-1" : layout === "side" ? "aspect-[4/5]" : "aspect-[4/3]";
  const box = `relative flex w-full ${phoneShape} md:aspect-auto md:min-h-[24svh] md:flex-1`;

  const media = (
    <div className={box}>
      {photo ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          // Next 16: `priority` is deprecated; the first screen's photo loads eagerly at high priority.
          loading={first ? "eager" : "lazy"}
          fetchPriority={first ? "high" : "auto"}
          quality={75}
          sizes={layout === "side" ? "(min-width: 768px) 36vw, 100vw" : "100vw"}
          placeholder="blur"
          style={{ "--pos-phone": photo.phone, "--pos-wide": photo.wide } as CSSProperties}
          className="object-cover object-(--pos-phone) md:object-(--pos-wide)"
        />
      ) : (
        <Placeholder ratio="" shot={shot ?? ""} className="flex-1 md:p-6" />
      )}
      {caption && (
        <p className="absolute bottom-3 left-gutter text-caption text-offwhite md:bottom-5 md:left-[calc(var(--gutter)+8.333%)]">{caption}</p>
      )}
    </div>
  );

  // Phones: later photo screens get the same space above as every other screen.
  // The first screen ends where the phone's bottom bar begins (the bar is 0 on desktop).
  const height = first ? "h-[calc(100svh-var(--header-h)-var(--bar-h))]" : "pt-(--phone-gap) md:h-svh md:pt-0";

  if (layout === "side") {
    return (
      <Section chapter tone={tone} photoBreak={photoBreak} className={`justify-start p-0 ${height} md:flex-row md:items-stretch`}>
        <div className="flex md:w-[36%] md:flex-none">{media}</div>
        <div className="flex px-gutter pt-6 pb-14 md:flex-1 md:items-center md:px-16 md:py-0">{words}</div>
      </Section>
    );
  }

  return (
    <Section chapter tone={tone} photoBreak={photoBreak} className={`justify-start p-0 ${height}`}>
      {media}
      <div className="mx-auto w-full max-w-wide px-gutter pt-5 pb-14 md:pt-10">
        <div className="md:ml-[8.333%]">{words}</div>
      </div>
    </Section>
  );
}
