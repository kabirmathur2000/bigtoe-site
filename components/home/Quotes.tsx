"use client";

import { useRef, useState, type TouchEvent } from "react";
import { members } from "@/content/home";

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
 * Member quotes: one at a time, centred, slow cross-fade. Arrows (and arrow
 * keys) or swipe; never automatic; no loop: the next arrow fades out at the
 * last quote, the previous arrow at the first. No member photos. Every
 * quote is a placeholder until written consent: first name, age and
 * consent show as TODOs.
 */
export function Quotes() {
  const { quotes } = members;
  const [active, setActive] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);

  const go = (dir: 1 | -1) => setActive((i) => Math.max(0, Math.min(quotes.length - 1, i + dir)));
  const atStart = active === 0;
  const atEnd = active === quotes.length - 1;

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
    `flex h-11 w-11 shrink-0 items-center justify-center transition-opacity duration-700 ease-soft ${
      off ? "pointer-events-none opacity-0" : "opacity-75 hover:opacity-100"
    }`;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={members.regionLabel}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onTouchStart={onStart}
      onTouchEnd={onEnd}
      onTouchCancel={() => (start.current = null)}
      data-swipe
      className="max-w-3xl focus-visible:outline-offset-4"
    >
      {/* All quotes share one cell; only the active one is visible. */}
      <div className="grid" aria-live="polite">
        {quotes.map((q, i) => {
          const on = i === active;
          return (
            <figure
              key={q.quote}
              aria-hidden={!on}
              className={`col-start-1 row-start-1 self-center transition-opacity duration-[1200ms] ease-soft ${on ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <blockquote className="text-body-lg md:text-h3">
                <span aria-hidden>“</span>
                {q.quote}
                <span aria-hidden>”</span>
              </blockquote>
              <figcaption className="mt-3 text-caption text-terracotta">
                {members.name}, {members.age}. {members.consent}
                {q.todo && <span className="block">{q.todo}</span>}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* Desktop: the arrows sit below the quote, so it keeps the shared left edge. */}
      <div className="-ml-3 mt-2 hidden gap-2 md:flex">
        <button type="button" className={arrow(atStart)} onClick={() => go(-1)} disabled={atStart} aria-hidden={atStart} aria-label={members.previous}>
          <Arrow dir="left" />
        </button>
        <button type="button" className={arrow(atEnd)} onClick={() => go(1)} disabled={atEnd} aria-hidden={atEnd} aria-label={members.next}>
          <Arrow dir="right" />
        </button>
      </div>
    </div>
  );
}
