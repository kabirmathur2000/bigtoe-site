import { Section } from "@/components/motion/SectionTone";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { hero } from "@/content/home";

/**
 * Chapter 1, THE MAIN POINT, 10 Squared style: the video across the top of
 * the screen, the headline below. Exactly one screen at
 * every size below the header (clear of the mobile bottom bar), so one
 * gesture moves past it.
 * The headline is readable on first paint. The button
 * lives in the navigation (desktop) and the bottom bar (phones).
 */
export function Hero() {
  return (
    <Section chapter className="h-[calc(100svh-var(--header-h))] justify-start p-0 pb-(--bar-h)">
      <figure className="flex min-h-0 flex-1 flex-col">
        <HeroMedia shot={hero.media.shot} className="min-h-0 w-full flex-1" />
        <figcaption className="mx-auto w-full max-w-wide px-gutter pt-2 text-caption text-terracotta md:pl-[calc(var(--gutter)+8.333%)]">
          {hero.media.caption}
        </figcaption>
      </figure>

      <div className="mx-auto w-full max-w-wide px-gutter pt-4 pb-6 md:pt-8 md:pb-14">
        <h1 className="text-h1 text-balance md:ml-[8.333%] md:max-w-5xl md:text-display">{hero.headline}</h1>
      </div>
    </Section>
  );
}
