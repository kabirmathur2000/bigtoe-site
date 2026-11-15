import { Section } from "@/components/motion/SectionTone";
import { BookButton } from "@/components/ui/Button";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { hero } from "@/content/home";

/**
 * Chapter 1, THE MAIN POINT. Label, headline and full-bleed video fill one
 * screen. The headline is readable on first paint; the subline and button
 * fade in after it. On mobile the fixed bottom bar is the one button.
 */
export function Hero() {
  return (
    <Section className="flex min-h-[calc(100svh-4rem)] flex-col pt-10 md:min-h-[calc(100svh-5rem)] md:pt-14">
      <div className="mx-auto grid w-full max-w-wide gap-6 px-gutter md:grid-cols-12 md:items-end md:gap-12">
        <div className="md:col-span-8">
          <p className="text-label uppercase opacity-70">{hero.label}</p>
          <h1 className="mt-5 text-display text-balance">{hero.headline}</h1>
        </div>
        <div className="md:col-span-4 md:pb-3">
          <p className="fade-up text-body-lg opacity-80" style={{ animationDelay: "350ms" }}>
            {hero.subline}
          </p>
          <div className="fade-up mt-8 hidden md:block" style={{ animationDelay: "500ms" }}>
            <BookButton />
          </div>
        </div>
      </div>

      <figure className="mt-10 flex flex-1 flex-col md:mt-14">
        <HeroMedia shot={hero.media.shot} className="min-h-[45svh] w-full flex-1" />
        <figcaption className="mx-auto w-full max-w-wide px-gutter py-3 text-caption text-terracotta">
          {hero.media.caption}
        </figcaption>
      </figure>
    </Section>
  );
}
