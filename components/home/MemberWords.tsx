"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/motion/SectionTone";
import { memberWords } from "@/content/home";

/** The words build over about three seconds once the chapter has arrived. */
const BUILD_MS = 3000;

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

/**
 * Chapter 5, IN OUR MEMBERS' WORDS (on navy). Not pinned: when the chapter
 * has arrived (most of it on screen), the words appear on their own, one at
 * a time over about three seconds, smallest first and "stronger" last, and
 * stay. Key words are terracotta, the rest off-white, as on the poster.
 * Reduced motion: every word at once.
 */
export function MemberWords() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const { words } = memberWords;
  const total = words.length;

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const timers: number[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const step = BUILD_MS / total;
        for (let i = 1; i <= total; i++) timers.push(window.setTimeout(() => setShown(i), (i - 1) * step));
      },
      { threshold: 0.85 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [reduce, total]);

  const visible = reduce ? total : shown;

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
      </div>
    </div>
  );

  return (
    <Section tone="navy" chapter>
      <div ref={ref} className="w-full">{content}</div>
    </Section>
  );
}
