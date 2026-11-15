import type { ReactNode } from "react";
import { Section, type Tone } from "@/components/motion/SectionTone";

/**
 * Split layout (one place only: Home's Our answer). Desktop: the photo
 * stays pinned on the left half while the text blocks move past on the
 * right, one block per screen. Phones: stacked, text first, photo after
 * (hidden on short screens), as one chapter.
 */
export function Split({ tone = "light", photo, blocks }: { tone?: Tone; photo: ReactNode; blocks: ReactNode[] }) {
  return (
    <Section chapter tone={tone} className="md:block md:py-0">
      <div className="mx-auto grid w-full max-w-wide gap-6 px-gutter md:grid-cols-12 md:gap-12">
        <div className="order-last md:order-none md:col-span-5 md:col-start-2">
          <div className="md:sticky md:top-0 md:flex md:h-svh md:items-center">
            {photo}
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          {blocks.map((b, i) => (
            <div
              key={i}
              className="not-first:mt-5 md:flex md:min-h-svh md:pt-(--chapter-band) md:flex-col md:justify-center md:not-first:mt-0"
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
