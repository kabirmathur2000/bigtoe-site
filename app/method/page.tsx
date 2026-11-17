import type { Metadata } from "next";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { LoopDiagram } from "@/components/method/Loop";
import { BookButton } from "@/components/ui/BookButton";
import { PhotoScreen, TextScreen } from "@/components/ui/Screen";
import { barefoot, fades, how, reserve } from "@/content/method";
import { meta } from "@/content/site";

export const metadata: Metadata = meta.pages.method;

/**
 * The Method: the Reserve Score and what fades (light); the big toe (the
 * fade runs across its photo) and how it works, with the loop (navy).
 */
export default function MethodPage() {
  return (
    <>
      <PhotoScreen first as="h1" shot={reserve.shot} headline={reserve.headline} line={reserve.line} note={reserve.note} />
      <TextScreen headline={fades.headline} lines={fades.lines} />
      <PhotoScreen tone="navy" photoBreak layout="side" shot={barefoot.shot} headline={barefoot.headline} line={barefoot.line} />
      <Section chapter tone="navy">
        <div className="mx-auto w-full max-w-wide px-gutter">
          <div className="md:mx-[8.333%]">
            <Reveal stagger={0.2}>
              <RevealItem as="h2" className="text-h1 md:text-display">{how.headline}</RevealItem>
              <RevealItem as="p" className="mt-3 mb-6 text-body-lg opacity-85 short:mb-4 md:mt-5 md:mb-10 md:text-h3">{how.line}</RevealItem>
            </Reveal>
            <LoopDiagram steps={how.steps} label={how.label} />
            <Reveal>
              <RevealItem className="mt-6 short:mt-4 md:mt-10">
                <div data-cta>
                  <BookButton placement="method-end" />
                </div>
              </RevealItem>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
