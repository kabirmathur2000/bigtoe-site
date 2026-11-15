"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/motion/SectionTone";
import { memberWords } from "@/content/home";

/** Share of the pinned scroll by which every word is in; the close line follows. */
const WORDS_BY = 0.8;

/**
 * Poster sizes. Every word is at least 24px, so the terracotta key words
 * pass contrast on navy as large text.
 */
const SIZE = {
  small: "text-[1.5rem]",
  medium: "text-[1.625rem] md:text-[2.25rem]",
  large: "text-[1.75rem] font-light md:text-[3.5rem]",
  largest: "text-[2.5rem] font-light md:text-display",
} as const;

/**
 * Where each word sits (indexes into the appearance order), mixing sizes
 * across the band so the large words do not stack together.
 */
const DISPLAY = [14, 0, 6, 15, 7, 1, 16, 23, 17, 8, 2, 18, 9, 3, 19, 10, 20, 4, 11, 21, 12, 5, 22, 13];

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Chapter 5, IN OUR MEMBERS' WORDS (on navy). The chapter pins while the
 * visitor scrolls; words appear one at a time in order of size, smallest
 * first and "stronger" last, and stay (scrolling back never removes them).
 * Key words are terracotta, the rest off-white, as on the poster. Then the
 * Deck 9 line fades in. Reduced motion: every word at once, no pin.
 */
export function MemberWords() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const { words } = memberWords;
  const total = words.length;

  useEffect(() => {
    if (reduce) return;
    const el = ref.current?.closest("section");
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const header = document.querySelector("header")?.offsetHeight ?? 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - (window.innerHeight - header);
      const p = travel > 0 ? clamp((header - r.top) / travel) : 1;
      const count = p <= 0 ? 0 : Math.min(total, Math.ceil((p / WORDS_BY) * total));
      // Words only ever arrive; scrolling back up keeps them.
      setShown((s) => Math.max(s, count));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduce, total]);

  const visible = reduce ? total : shown;
  const done = visible >= total;

  const content = (
    <div className="mx-auto w-full max-w-wide px-gutter">
      <div className="md:ml-[8.333%]">
        <p className="text-label uppercase opacity-75">{memberWords.label}</p>

        <ul className="mt-6 flex max-w-content flex-wrap items-baseline gap-x-4 gap-y-0 md:mt-10 md:gap-x-10 md:gap-y-2">
          {DISPLAY.map((i) => {
            const w = words[i];
            return (
              <li
                key={w.word}
                className={`member-word whitespace-nowrap leading-[1.2] ${SIZE[w.size]} ${w.key ? "text-terracotta" : ""} ${
                  i < visible ? "opacity-100" : "opacity-0"
                }`}
              >
                {w.word}
              </li>
            );
          })}
        </ul>

        <p className={`mt-8 max-w-3xl text-h3 transition-opacity duration-[1200ms] ease-soft md:mt-12 ${done ? "opacity-100" : "opacity-0"}`}>
          {memberWords.close}
        </p>
      </div>
    </div>
  );

  if (reduce) return <Section tone="navy" chapter>{content}</Section>;

  return (
    // One screen plus about 0.8 of a screen of pinned scroll.
    <Section tone="navy" chapter className="block h-[calc(180svh-var(--header-h))] p-0">
      <div
        ref={ref}
        className="sticky top-(--header-h) flex h-[calc(100svh-var(--header-h))] flex-col justify-center pt-(--chapter-pad) pb-[calc(var(--chapter-pad)+var(--bar-h))]"
      >
        {content}
      </div>
    </Section>
  );
}
