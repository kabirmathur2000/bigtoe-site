"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { Icon } from "./Icons";
import { Photo } from "./Photo";
import { photoCard } from "./styles";

const POSITIONS = ["18% 50%", "40% 50%", "60% 55%", "78% 50%", "92% 45%"];

export type RowCard = { title: string; text: string; shot: string };

/**
 * A row of portrait cards (the founders, the Sherpas): each a 4:5 photo
 * with 16px corners, the title and text beneath it, always visible. The
 * row runs to the screen edge, the first card on the column. Swipe on
 * phones; drag with the mouse or use the arrows on desktop; snap points
 * inside the row only, never autoplay. A thin terracotta bar beneath shows
 * where you are in the row (hidden, with the arrows, when every card fits).
 */
export function CardRow({ items, label, previous, next }: { items: RowCard[]; label: string; previous: string; next: string }) {
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ start: 0, size: 1, atStart: true, atEnd: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPos({
      start: el.scrollWidth ? el.scrollLeft / el.scrollWidth : 0,
      size: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1,
      atStart: el.scrollLeft < 4,
      atEnd: el.scrollLeft >= max - 4,
    });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    return () => ro.disconnect();
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 16;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: reduce ? "auto" : "smooth" });
  };

  // Mouse drag (touch and pens scroll natively). Snapping is off while dragging and settles after.
  const onDown = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onMove = (e: PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    const el = track.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < 4) return;
    if (!d.moved) {
      d.moved = true;
      setDragging(true);
      el.setPointerCapture(e.pointerId);
    }
    el.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    drag.current = null;
    setDragging(false);
  };

  const fits = pos.size >= 0.995;
  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 transition-opacity duration-300 hover:bg-navy/5 disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div>
      <ul
        ref={track}
        aria-label={label}
        tabIndex={0}
        onScroll={measure}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className={`page-edge flex gap-3 overflow-x-auto pb-1 select-none [scrollbar-width:none] md:gap-4 [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing snap-none" : `snap-x snap-mandatory ${fits ? "" : "md:cursor-grab"}`
        }`}
      >
        {items.map((c, i) => (
          <li key={c.title} className="w-[78%] max-w-88 shrink-0 snap-start md:w-80 lg:w-90">
            <div className={`aspect-[4/5] ${photoCard}`}>
              <Photo shot={c.shot} pos={POSITIONS[i % POSITIONS.length]} sizes="(min-width: 1440px) 480px, (min-width: 1024px) 360px, (min-width: 768px) 320px, 78vw" />
            </div>
            <p className="mt-4 ty-sub md:mt-5">{c.title}</p>
            <p className="mt-1 max-w-md ty-body opacity-80">{c.text}</p>
          </li>
        ))}
      </ul>
      {!fits && (
        <div className="page-wrap mt-6 flex items-center gap-6 md:mt-8">
          <div aria-hidden className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-navy/10">
            <div
              className="absolute inset-y-0 rounded-full bg-terracotta"
              style={{ left: `${pos.start * 100}%`, width: `${pos.size * 100}%` }}
            />
          </div>
          <div className="hidden gap-2 md:flex">
            <button type="button" aria-label={previous} disabled={pos.atStart} onClick={() => step(-1)} className={arrow}>
              <Icon name="left" />
            </button>
            <button type="button" aria-label={next} disabled={pos.atEnd} onClick={() => step(1)} className={arrow}>
              <Icon name="right" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
