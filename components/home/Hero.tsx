import { Section } from "@/components/motion/SectionTone";
import { BookButton } from "@/components/ui/BookButton";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { hero } from "@/content/home";

/**
 * Chapter 1, THE MAIN POINT. Label, headline and full-bleed video fill one
 * screen. The headline is readable on first paint; the subline and button
 * fade in after it. On mobile the fixed bottom bar is the one button.
 */
export function Hero() {
  return (
    <Section chapter className="justify-start pt-8 md:pt-8">
      <div className="mx-auto grid w-full max-w-wide gap-4 px-gutter md:grid-cols-12 md:items-end md:gap-12">
        <div className="md:col-span-7 md:col-start-2">
          <h1 className="text-display text-balance">{hero.headline}</h1>
        </div>
        <div className="md:col-span-3 md:col-start-9 md:pb-3">
          <p className="fade-up text-body-lg text-balance opacity-80" style={{ animationDelay: "350ms" }}>
            {hero.subline}
          </p>
          <div data-cta className="fade-up mt-8 hidden md:block" style={{ animationDelay: "500ms" }}>
            <BookButton placement="hero" />
          </div>
        </div>
      </div>

      <figure className="mt-6 flex flex-1 flex-col md:mt-8">
        <HeroMedia shot={hero.media.shot} className="min-h-[28svh] w-full flex-1 md:min-h-[52svh]" />
        <figcaption className="mx-auto w-full max-w-wide px-gutter py-2 text-caption text-terracotta md:pl-[calc(var(--gutter)+8.333%)]">
          {hero.media.caption}
        </figcaption>
      </figure>
    </Section>
  );
}
