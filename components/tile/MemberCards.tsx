"use client";

import { useRef, useState, type TouchEvent } from "react";
import { Section } from "@/components/motion/SectionTone";
import { memberQuotes } from "@/content/quotes";
import { tile } from "@/content/style-tile";
import { ArtImage } from "./ArtImage";
import { Rise, RiseItem } from "./Rise";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg aria-hidden viewBox="0 0 20 12" className="h-3 w-5" fill="none" stroke="currentColor" strokeWidth="1">
      {dir === "right" ? <path d="M0 6h19M14 1l5 5-5 5" /> : <path d="M20 6H1M6 1 1 6l5 5" />}
    </svg>
  );
}

const SWIPE = 40;

/**
 * C. Member card (navy): "In our members' words." One card at a time.
 * Desktop: a square portrait on the left, the quote on the right. Phones:
 * the portrait on top, the quote below. Arrows (and arrow keys), swipe and
 * a small "1 / 3" counter. No autoplay, no loop: the arrow at each end dims
 * and stops responding. Every quote is a draft until consent (content/quotes.ts).
 */
export function MemberCards() {
  const m = tile.members;
  const quotes = memberQuotes;
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
    `flex h-11 w-11 items-center justify-center border border-current/30 transition-opacity duration-700 ease-soft ${
      off ? "pointer-events-none opacity-30" : "opacity-85 hover:opacity-100"
    }`;

  return (
    <Section chapter tone="navy">
      <div className="mx-auto w-full max-w-wide px-gutter">
        <div className="md:mx-[8.333%]">
          <Rise>
            <RiseItem as="h2" className="text-h2 md:text-h1">{m.heading}</RiseItem>
          </Rise>

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label={m.regionLabel}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
            onTouchStart={onStart}
            onTouchEnd={onEnd}
            onTouchCancel={() => (start.current = null)}
            data-swipe
            className="mt-8 focus-visible:outline-offset-4 md:mt-12"
          >
            {/* All cards share one cell; only the active one is visible. */}
            <div className="grid" aria-live="polite">
              {quotes.map((q, i) => {
                const on = i === active;
                return (
                  <figure
                    key={i}
                    aria-hidden={!on}
                    className={`col-start-1 row-start-1 grid gap-6 transition-opacity duration-[900ms] ease-soft md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-14 ${
                      on ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <ArtImage shot={{ ...m.portrait, name: q.shot }} className="max-w-[18rem] md:max-w-none" sizes="(min-width: 768px) 40vw, 18rem" />
                    <div>
                      <blockquote className="text-h3 leading-[1.4] md:text-[1.75rem]">
                        <span aria-hidden>“</span>
                        {q.quote}
                        <span aria-hidden>”</span>
                      </blockquote>
                      <figcaption className="mt-4 text-caption text-terracotta">
                        {q.name ?? m.name}, {q.age ?? m.age}
                        {q.draft && <span className="ml-2 border border-current px-1.5 py-0.5 text-[0.6875rem] uppercase tracking-[0.12em]">{m.draftLabel}</span>}
                      </figcaption>
                    </div>
                  </figure>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3 md:mt-10">
              <button type="button" className={arrow(atStart)} onClick={() => go(-1)} disabled={atStart} aria-hidden={atStart} aria-label={m.previous}>
                <Arrow dir="left" />
              </button>
              <button type="button" className={arrow(atEnd)} onClick={() => go(1)} disabled={atEnd} aria-hidden={atEnd} aria-label={m.next}>
                <Arrow dir="right" />
              </button>
              <p className="ml-2 text-caption tabular-nums opacity-75" aria-live="polite">
                {active + 1} / {quotes.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
