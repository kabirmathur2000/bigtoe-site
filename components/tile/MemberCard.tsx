"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { MemberQuote } from "@/content/quotes";
import { tile } from "@/content/style-tile";
import { Card, PhotoFill } from "./Panel";

/**
 * One member's card (stacked, no carousel): the photo fills the card (4:5
 * phones, 16:9 desktop); the first name and age at the bottom left over a
 * soft gradient. As the card reaches the middle of the screen, the quote
 * fades in below the name, and stays. Reduced motion: the quote is there
 * from the start. Quotes are drafts until consent (content/quotes.ts).
 */
export function MemberCard({ quote: q }: { quote: MemberQuote }) {
  const s = tile.stories;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(false);
  const shown = reduce || reached;

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    // A thin band across the middle of the screen: the card has reached it when they meet.
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setReached(true);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div ref={ref}>
      <Card variant="photo" className="aspect-[4/5] md:aspect-video">
        <PhotoFill shot={s.portrait} sizes="100vw" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 photo-scrim" />
        <figure className="absolute inset-x-0 bottom-0 p-5 md:max-w-3xl md:p-10">
          <figcaption className="t-label">
            {q.name ?? s.name}, {q.age ?? s.age}
            {q.draft && <span className="ml-2 border border-terracotta px-1.5 py-0.5 text-terracotta">{s.draftLabel}</span>}
          </figcaption>
          <blockquote
            className={`mt-3 t-body transition-[opacity,translate] duration-[900ms] ease-soft md:t-sub ${
              shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <span aria-hidden>“</span>
            {q.quote}
            <span aria-hidden>”</span>
          </blockquote>
        </figure>
      </Card>
    </div>
  );
}
