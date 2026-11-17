import type { Metadata } from "next";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { LoopDiagram } from "@/components/method/Loop";
import { BookButton } from "@/components/ui/BookButton";
import { PhotoScreen, TextScreen } from "@/components/ui/Screen";
import { fades, promise, reserve, train } from "@/content/method";
import { meta } from "@/content/site";

export const metadata: Metadata = meta.pages.method;

/**
 * The Method: the Strength Reserve, what fades (light); what we train (the
 * fade runs across the Sherpas photo) and what we promise, with the loop
 * diagram (navy).
 */
export default function MethodPage() {
  return (
    <>
      <PhotoScreen first as="h1" shot={reserve.shot} headline={reserve.headline} line={reserve.line} />
      <TextScreen headline={fades.headline} line={fades.line} />
      <PhotoScreen tone="navy" photoBreak shot={train.shot} headline={train.headline} line={train.line} />
      <Section chapter tone="navy">
        <div className="mx-auto w-full max-w-wide px-gutter">
          <div className="md:mx-[8.333%]">
            <Reveal>
              <RevealItem as="h2" className="mb-6 text-h1 short:mb-3 md:mb-10 md:text-display">{promise.headline}</RevealItem>
            </Reveal>
            <LoopDiagram steps={promise.steps} label={promise.label} />
            <Reveal stagger={0.2}>
              <RevealItem as="p" className="mt-6 text-h3 short:mt-4 md:mt-10">{promise.line}</RevealItem>
              <RevealItem className="mt-6 short:mt-4 md:mt-8">
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
