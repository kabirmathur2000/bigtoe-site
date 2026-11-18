"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { memberQuotes } from "@/content/quotes";
import { tile } from "@/content/style-tile";
import { Accent, PhotoFill } from "./Panel";
import { Rise, RiseItem } from "./Rise";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg aria-hidden viewBox="0 0 20 12" className="h-3 w-5" fill="none" stroke="currentColor" strokeWidth="1">
      {dir === "right" ? <path d="M0 6h19M14 1l5 5-5 5" /> : <path d="M20 6H1M6 1 1 6l5 5" />}
    </svg>
  );
}

/**
 * f. Member stories, Equinox format: each story is a large portrait card
 * (4:5) with the quote over a soft dark gradient at the bottom, then first
 * name and age. Phones: one card fills 90% of the width, the next card's
 * edge visible; swipe one at a time (native scroll with snap). Desktop:
 * two to three cards visible, scrolling sideways with the arrows or by
 * dragging. Manual only, no loop: each arrow dims at its end. Quotes are
 * drafts until consent (content/quotes.ts).
 */
export function StoryCards() {
  const s = tile.stories;
  const track = useRef<HTMLDivElement>(null);
  const [ends, setEnds] = useState({ start: true, end: false });
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEnds({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  /** One card's width plus the gap. */
  const step = () => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    return card ? card.offsetWidth + parseFloat(getComputedStyle(el!).columnGap || "0") : 300;
  };
  const go = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  // Desktop: drag with the mouse to scroll sideways (touch uses native swipe).
  const onDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onMove = (e: PointerEvent) => {
    const d = drag.current;
    if (!d || !track.current) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) track.current.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    if (!drag.current) return;
    const el = track.current;
    drag.current = null;
    setDragging(false);
    // Settle on the nearest card once snapping is back on.
    if (el) requestAnimationFrame(() => el.scrollBy({ left: 0 }));
  };

  const arrow = (off: boolean) =>
    `flex h-11 w-11 items-center justify-center border border-current/30 transition-opacity duration-500 ${
      off ? "pointer-events-none opacity-30" : "opacity-90 hover:opacity-100"
    }`;

  return (
    <div>
      <div className="flex items-end justify-between gap-6 px-6 md:px-16">
        <Rise>
          <RiseItem as="h2" className="t-headline">
            <Accent value={s.headline} />
          </RiseItem>
        </Rise>
        <div className="hidden shrink-0 gap-2 md:flex">
          <button type="button" className={arrow(ends.start)} onClick={() => go(-1)} disabled={ends.start} aria-label={s.previous}>
            <Arrow dir="left" />
          </button>
          <button type="button" className={arrow(ends.end)} onClick={() => go(1)} disabled={ends.end} aria-label={s.next}>
            <Arrow dir="right" />
          </button>
        </div>
      </div>

      <div
        ref={track}
        role="region"
        aria-roledescription="carousel"
        aria-label={s.regionLabel}
        tabIndex={0}
        onScroll={update}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        data-swipe
        className={`mt-8 flex gap-3 overflow-x-auto overscroll-x-contain scroll-px-6 px-6 pb-1 [scrollbar-width:none] md:mt-12 md:gap-6 md:scroll-px-16 md:px-16 [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "snap-x snap-mandatory md:cursor-grab"
        }`}
      >
        {memberQuotes.map((q, i) => (
          <figure
            key={i}
            data-card
            className="relative aspect-[4/5] w-[90%] shrink-0 snap-start overflow-hidden rounded-[16px] md:w-[min(30vw,25rem)]"
          >
            <PhotoFill shot={s.portrait} sizes="(min-width: 768px) 30vw, 90vw" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 photo-scrim" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
              <blockquote className="t-body">
                <span aria-hidden>“</span>
                {q.quote}
                <span aria-hidden>”</span>
              </blockquote>
              <figcaption className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 t-label text-terracotta md:mt-3">
                <span>
                  {q.name ?? s.name}, {q.age ?? s.age}
                </span>
                {q.draft && <span className="border border-current px-1.5 py-0.5">{s.draftLabel}</span>}
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
