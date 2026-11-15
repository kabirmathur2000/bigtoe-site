"use client";

import { useRef, useState, type TouchEvent } from "react";
import { Section } from "@/components/motion/SectionTone";
import { memberQuotes } from "@/content/testimonials";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg aria-hidden viewBox="0 0 20 12" className="h-3 w-5" fill="none" stroke="currentColor" strokeWidth="1">
      {dir === "right" ? <path d="M0 6h19M14 1l5 5-5 5" /> : <path d="M20 6H1M6 1 1 6l5 5" />}
    </svg>
  );
}

/** Horizontal distance (px) a swipe must travel to change the quote. */
const SWIPE = 40;

/**
 * Member quotes (on navy): one quote at a time, centred, with first name and
 * age. Swipe on phones, small arrows (and arrow keys) on desktop; quotes
 * cross-fade slowly. No loop and no autoplay: the next arrow fades out at
 * the last quote, the previous arrow at the first. Nothing else on screen.
 */
export function MemberQuotes() {
  const { items } = memberQuotes;
  const [active, setActive] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);

  // No loop: the first and last quotes are the ends.
  const go = (dir: 1 | -1) => setActive((i) => Math.max(0, Math.min(items.length - 1, i + dir)));
  const atStart = active === 0;
  const atEnd = active === items.length - 1;

  const onStart = (e: TouchEvent) => {
    const t = e.touches[0];
    start.current = { x: t.clientX, y: t.clientY };
  };
  const onEnd = (e: TouchEvent) => {
    const s = start.current;
    start.current = null;
    const t = e.changedTouches[0];
    if (!s || !t) return;
    const dx = t.clientX - s.x;
    if (Math.abs(dx) > SWIPE && Math.abs(dx) > Math.abs(t.clientY - s.y)) go(dx < 0 ? 1 : -1);
  };

  const arrow = (off: boolean) =>
    `hidden h-11 w-11 shrink-0 items-center justify-center transition-opacity duration-700 ease-soft md:flex ${
      off ? "pointer-events-none opacity-0" : "opacity-60 hover:opacity-100"
    }`;

  return (
    <Section chapter tone="navy">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={memberQuotes.regionLabel}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onTouchStart={onStart}
        onTouchEnd={onEnd}
        onTouchCancel={() => (start.current = null)}
        data-swipe
        className="mx-auto flex w-full max-w-wide items-center gap-4 px-gutter focus-visible:outline-offset-4 md:gap-10"
      >
        <button type="button" className={arrow(atStart)} onClick={() => go(-1)} disabled={atStart} aria-hidden={atStart} aria-label={memberQuotes.previous}>
          <Arrow dir="left" />
        </button>

        {/* All quotes share one cell; only the active one is visible. */}
        <div className="grid flex-1" aria-live="polite">
          {items.map((q, i) => {
            const on = i === active;
            return (
              <figure
                key={i}
                aria-hidden={!on}
                className={`col-start-1 row-start-1 mx-auto max-w-3xl self-center text-center transition-opacity duration-[1200ms] ease-soft ${
                  on ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <blockquote className="text-h3 md:text-h2">
                  <span aria-hidden>“</span>
                  {q.quote}
                  <span aria-hidden>”</span>
                </blockquote>
                <figcaption className="mt-8 text-caption">
                  <span className="text-terracotta">{q.name}, {q.age}</span>
                  <span className="mt-1 block text-terracotta">{memberQuotes.consent}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <button type="button" className={arrow(atEnd)} onClick={() => go(1)} disabled={atEnd} aria-hidden={atEnd} aria-label={memberQuotes.next}>
          <Arrow dir="right" />
        </button>
      </div>
    </Section>
  );
}
