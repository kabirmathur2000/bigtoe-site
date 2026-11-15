"use client";

import { useState, type CSSProperties } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { memberWords } from "@/content/home";

/** Words on screen at once; the set cycles in about 40 seconds. */
const GROUPS = 6;
const CYCLE = 40;

/** Size tier by rank (the content list is largest first). */
function tier(rank: number) {
  if (rank === 0) return "text-display";
  if (rank < 4) return "text-h1";
  if (rank < 9) return "text-h2";
  if (rank < 16) return "text-h3";
  return "text-body-lg";
}

/**
 * Display order: interleave the ranks so large and small words mix across
 * the band instead of the big ones stacking at the top.
 */
const ORDER = [13, 4, 19, 1, 8, 22, 15, 0, 10, 17, 5, 20, 2, 11, 23, 7, 14, 3, 18, 9, 21, 6, 16, 12];

/**
 * "In our members' words": the words drift in a few at a time, hold, and
 * fade as the next few arrive. A group mixes one large, one middle and two
 * small words (ranks g, g+6, g+12, g+18). Hover or tap a word for
 * terracotta. Reduced motion shows every word, still.
 */
export function MemberWords() {
  const [picked, setPicked] = useState<number | null>(null);
  const { words } = memberWords;

  return (
    <Section className="py-section">
      <div className="mx-auto max-w-wide px-gutter">
        <Reveal>
          <RevealItem as="p" className="text-label uppercase opacity-70">{memberWords.label}</RevealItem>
        </Reveal>

        <ul className="member-words mx-auto mt-16 flex max-w-content flex-wrap items-baseline justify-center gap-x-8 gap-y-4 md:mt-20 md:gap-x-14 md:gap-y-6">
          {ORDER.map((rank) => {
            const style = { "--delay": `${((rank % GROUPS) * CYCLE) / GROUPS}s` } as CSSProperties;
            return (
              <li
                key={rank}
                style={style}
                data-picked={picked === rank || undefined}
                onClick={() => setPicked(picked === rank ? null : rank)}
                className={`member-word cursor-default whitespace-nowrap ${tier(rank)} ${rank < 9 ? "font-light" : ""}`}
              >
                {words[rank]}
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-16 md:mt-24">
          <RevealItem as="p" className="mx-auto max-w-text text-center text-h3">{memberWords.close}</RevealItem>
        </Reveal>
      </div>
    </Section>
  );
}
