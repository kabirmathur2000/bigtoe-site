import type { ReactNode } from "react";
import { Section, type Tone } from "@/components/motion/SectionTone";

/**
 * Split layout (two places only: Home's Our answer, Method's How we train).
 * Desktop: the photo stays pinned on the left half while the text blocks
 * move past on the right, one block per screen; each block is a resting
 * point for the magnetic scroll ([data-rest]). Phones: stacked, text first,
 * photo after (hidden on short screens), as one chapter.
 */
export function Split({ tone = "light", photo, blocks }: { tone?: Tone; photo: ReactNode; blocks: ReactNode[] }) {
  return (
    <Section chapter tone={tone} split className="md:block md:py-0">
      <div className="mx-auto grid w-full max-w-wide gap-6 px-gutter md:grid-cols-12 md:gap-12">
        <div className="order-last md:order-none md:col-span-5 md:col-start-2">
          <div className="md:sticky md:top-(--header-h) md:flex md:h-[calc(100svh-var(--header-h))] md:items-center">
            {photo}
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          {blocks.map((b, i) => (
            <div
              key={i}
              data-rest
              className="not-first:mt-5 md:flex md:min-h-[calc(100svh-var(--header-h))] md:flex-col md:justify-center md:not-first:mt-0"
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
