import { Section } from "@/components/motion/SectionTone";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { hero } from "@/content/home";

/**
 * Chapter 1, THE MAIN POINT, 10 Squared style: the video across the top of
 * the screen, the headline and its short line below. Exactly one screen at
 * every size below the header (clear of the mobile bottom bar), so one
 * gesture moves past it.
 * The headline is readable on first paint; the line fades in. The button
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

      <div className="mx-auto grid w-full max-w-wide gap-3 px-gutter pt-4 pb-5 md:grid-cols-12 md:items-end md:gap-12 md:pt-8 md:pb-12">
        <div className="md:col-span-7 md:col-start-2">
          <h1 className="text-h1 text-balance md:text-display">{hero.headline}</h1>
        </div>
        <div className="md:col-span-3 md:col-start-9 md:pb-2">
          <p className="fade-up text-body-lg text-balance opacity-80" style={{ animationDelay: "350ms" }}>
            {hero.subline}
          </p>
        </div>
      </div>
    </Section>
  );
}
