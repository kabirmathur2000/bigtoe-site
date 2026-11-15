import { Section } from "@/components/motion/SectionTone";
import { BookButton } from "@/components/ui/Button";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { hero } from "@/content/home";

/**
 * Home block 1. The headline is readable on first paint (no animation);
 * the subline and button fade up after it. On mobile the fixed bottom bar
 * is the one button, so the inline button shows from md up.
 */
export function Hero() {
  return (
    <Section className="pt-12 md:pt-20">
      <div className="mx-auto grid max-w-wide gap-8 px-gutter md:grid-cols-12 md:items-end md:gap-12">
        <h1 className="text-display text-balance md:col-span-8">{hero.headline}</h1>
        <div className="md:col-span-4 md:pb-3">
          <p className="fade-up text-body-lg opacity-80" style={{ animationDelay: "350ms" }}>
            {hero.subline}
          </p>
          <div className="fade-up mt-8 hidden md:block" style={{ animationDelay: "500ms" }}>
            <BookButton />
          </div>
        </div>
      </div>

      <figure className="mt-12 md:mt-20">
        <HeroMedia shot={hero.media.shot} className="aspect-[4/5] w-full md:aspect-auto md:h-[82svh]" />
        <figcaption className="mx-auto max-w-wide px-gutter pt-3 text-caption text-terracotta">
          {hero.media.caption}
        </figcaption>
      </figure>
    </Section>
  );
}
