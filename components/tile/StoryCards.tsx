"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState, type PointerEvent } from "react";
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

/** A plus that turns into a close (×) by rotating 45°. */
function Plus({ open }: { open: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className={`h-4 w-4 transition-transform duration-500 ease-soft ${open ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M10 3v14M3 10h14" />
    </svg>
  );
}

/**
 * Member stories, Oura's expandable style. Each card is a full photo
 * filling the card (4:5): phones, the card fills the panel's width;
 * desktop, two to three visible, scrolling sideways. The only text on the
 * photo is the first name and age at the bottom left, over a soft dark
 * gradient, and a round plus at the top right. Tapping the plus turns it
 * into a close (×) and reveals the full quote under the name, rising in
 * gently over the lower part of the photo. Swipe (native scroll with snap),
 * arrows, and drag on desktop; manual, no loop. Quotes are drafts until
 * consent (content/quotes.ts).
 */
export function StoryCards() {
  const s = tile.stories;
  const id = useId();
  const reduce = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const [ends, setEnds] = useState({ start: true, end: false });
  const [openCard, setOpenCard] = useState<number | null>(null);
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

  const step = () => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    return card ? card.offsetWidth + parseFloat(getComputedStyle(el!).columnGap || "0") : 300;
  };
  const go = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * step(), behavior: reduce ? "auto" : "smooth" });

  // Desktop: drag with the mouse to scroll sideways (touch uses native swipe).
  const onDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current || (e.target as HTMLElement).closest("button")) return;
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
    drag.current = null;
    setDragging(false);
  };

  const arrow = (off: boolean) =>
    `flex h-11 w-11 items-center justify-center rounded-full border border-current/30 transition-opacity duration-500 ${
      off ? "pointer-events-none opacity-30" : "opacity-90 hover:opacity-100"
    }`;

  return (
    <div>
      <div className="px-6 md:px-16">
        <Rise>
          <RiseItem as="h2" className="t-headline">
            <Accent value={s.headline} />
          </RiseItem>
        </Rise>
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
        className={`mt-8 flex gap-3 overflow-x-auto overscroll-x-contain scroll-px-6 px-6 [scrollbar-width:none] md:mt-10 md:gap-6 md:scroll-px-16 md:px-16 [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "snap-x snap-mandatory md:cursor-grab"
        }`}
      >
        {memberQuotes.map((q, i) => {
          const open = openCard === i;
          const panel = `${id}-story-${i}`;
          return (
            <figure key={i} data-card className="relative aspect-[4/5] w-full shrink-0 snap-start overflow-hidden rounded-[16px] md:w-[min(28vw,24rem)]">
              <PhotoFill shot={s.portrait} sizes="(min-width: 768px) 28vw, 100vw" />
              {/* The gradient deepens and rises when the story opens, so the quote always reads. */}
              <div aria-hidden className={`absolute inset-x-0 bottom-0 photo-scrim transition-[height] duration-700 ease-soft ${open ? "h-full" : "h-2/5"}`} />
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panel}
                aria-label={open ? s.close : s.open}
                onClick={() => setOpenCard(open ? null : i)}
                className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-offwhite text-navy transition-transform duration-500 ease-soft hover:scale-105"
              >
                <Plus open={open} />
              </button>
              <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="t-label text-offwhite">
                  {q.name ?? s.name}, {q.age ?? s.age}
                </p>
                <div
                  id={panel}
                  aria-hidden={!open}
                  className={`grid transition-[grid-template-rows,opacity,translate] duration-700 ease-soft ${
                    open ? "grid-rows-[1fr] opacity-100" : `grid-rows-[0fr] opacity-0 ${reduce ? "" : "translate-y-3"}`
                  }`}
                >
                  <div className="overflow-hidden">
                    <blockquote className="pt-3 t-body text-offwhite">
                      <span aria-hidden>“</span>
                      {q.quote}
                      <span aria-hidden>”</span>
                    </blockquote>
                    {q.draft && <p className="mt-3 inline-block border border-terracotta px-1.5 py-0.5 t-label text-terracotta">{s.draftLabel}</p>}
                  </div>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="mt-6 flex gap-2 px-6 md:mt-8 md:px-16">
        <button type="button" className={arrow(ends.start)} onClick={() => go(-1)} disabled={ends.start} aria-label={s.previous}>
          <Arrow dir="left" />
        </button>
        <button type="button" className={arrow(ends.end)} onClick={() => go(1)} disabled={ends.end} aria-label={s.next}>
          <Arrow dir="right" />
        </button>
      </div>
    </div>
  );
}
