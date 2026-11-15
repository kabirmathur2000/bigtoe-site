"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/motion/SectionTone";
import { memberWords } from "@/content/home";

/** Words added per step, largest first. */
const GROUP = 3;
/** Share of the pinned scroll by which every word is in; the close line follows. */
const WORDS_BY = 0.7;

/** Size tier by rank (the content list is largest first). */
function tier(rank: number) {
  if (rank === 0) return "text-[2.25rem] md:text-display";
  if (rank < 4) return "text-[1.75rem] md:text-h1";
  if (rank < 9) return "text-h3 md:text-h2";
  if (rank < 16) return "text-body-lg md:text-h3";
  return "text-body md:text-body-lg";
}

/**
 * Display order: the ranks interleaved so large and small words mix across
 * the band instead of the big ones stacking at the top.
 */
const ORDER = [13, 4, 19, 1, 8, 22, 15, 0, 10, 17, 5, 20, 2, 11, 23, 7, 14, 3, 18, 9, 21, 6, 16, 12];

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Chapter 5, IN OUR MEMBERS' WORDS. The chapter pins while the visitor
 * scrolls about one and a half screens. Words fade in a small group at a
 * time, largest first, and stay; scrolling back never removes them. Once
 * all are in, the Deck 9 line fades in and the chapter releases. Hover or
 * tap turns a word terracotta. Reduced motion: every word at once, no pin.
 */
export function MemberWords() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
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
      const groups = Math.ceil(total / GROUP);
      const count = p <= 0 ? 0 : Math.min(total, Math.ceil((p / WORDS_BY) * groups) * GROUP);
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
      <p className="text-label uppercase opacity-70 md:ml-[8.333%]">{memberWords.label}</p>

      <ul className="mx-auto mt-6 flex max-w-content flex-wrap items-baseline justify-center gap-x-5 gap-y-1 md:mt-12 md:gap-x-12 md:gap-y-3">
        {ORDER.map((rank) => (
          <li
            key={rank}
            data-picked={picked === rank || undefined}
            onClick={() => setPicked(picked === rank ? null : rank)}
            className={`member-word cursor-default whitespace-nowrap leading-[1.25] ${tier(rank)} ${rank < 9 ? "font-light" : ""} ${
              rank < visible ? "opacity-100" : "opacity-0"
            }`}
          >
            {words[rank]}
          </li>
        ))}
      </ul>

      <p
        className={`mx-auto mt-8 max-w-3xl text-center text-h3 transition-opacity duration-[1200ms] ease-soft md:mt-14 ${
          done ? "opacity-100" : "opacity-0"
        }`}
      >
        {memberWords.close}
      </p>
    </div>
  );

  if (reduce) return <Section chapter>{content}</Section>;

  return (
    // One screen plus about one and a half screens of pinned scroll.
    <Section chapter className="block h-[calc(250svh-var(--header-h))] p-0">
      <div
        ref={ref}
        className="sticky top-(--header-h) flex h-[calc(100svh-var(--header-h))] flex-col justify-center pt-(--chapter-pad) pb-[calc(var(--chapter-pad)+var(--bar-h))]"
      >
        {content}
      </div>
    </Section>
  );
}
