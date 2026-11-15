"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Section } from "@/components/motion/SectionTone";
import { memberQuotes } from "@/content/testimonials";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg aria-hidden viewBox="0 0 20 12" className="h-3 w-5" fill="none" stroke="currentColor" strokeWidth="1">
      {dir === "right" ? <path d="M0 6h19M14 1l5 5-5 5" /> : <path d="M20 6H1M6 1 1 6l5 5" />}
    </svg>
  );
}

/** Runs the row out to the screen's right edge, past the gutter (and the container on wide screens). */
const EDGE = "calc(var(--gutter) + max(0px, (100vw - 90rem) / 2))";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Member quotes, after the word cloud (modelled on 10 Squared's "What Our
 * Members Say"). A row of cards: swiped on touch, scrolled with the arrows,
 * arrow keys or a drag on desktop, settling one card at a time. The next
 * card always shows in part. No autoplay.
 */
export function MemberQuotes() {
  const row = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [ends, setEnds] = useState({ start: true, end: false });

  const step = () => {
    const el = row.current;
    const card = el?.querySelector("li");
    if (!el || !card) return 0;
    return card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
  };

  const go = (dir: 1 | -1) => {
    row.current?.scrollBy({ left: dir * step(), behavior: reducedMotion() ? "auto" : "smooth" });
  };

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const update = () =>
      setEnds({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };

  // Mouse drag (touch scrolls natively). Snap is paused while dragging,
  // then the row settles on the nearest card.
  const onDown = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || !row.current) return;
    drag.current = { x: e.clientX, left: row.current.scrollLeft, moved: false };
  };
  const onMove = (e: PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    const el = row.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      el.setPointerCapture(e.pointerId);
      el.style.scrollSnapType = "none";
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    const d = drag.current;
    const el = row.current;
    drag.current = null;
    if (!d?.moved || !el) return;
    const s = step();
    const target = Math.round(el.scrollLeft / s) * s;
    el.scrollTo({ left: target, behavior: reducedMotion() ? "auto" : "smooth" });
    window.setTimeout(() => el.style.removeProperty("scroll-snap-type"), 600);
  };

  const arrow =
    "flex h-12 w-12 items-center justify-center border border-current/25 transition-colors duration-700 ease-soft hover:border-current disabled:opacity-30 disabled:hover:border-current/25";

  return (
    // The row runs to the screen edge; the chapter clips it so the page never widens.
    <Section chapter className="overflow-x-clip">
      <div className="mx-auto w-full max-w-wide px-gutter pt-6 md:pt-12">
        <div className="md:ml-[8.333%]">
          <ul
            ref={row}
            tabIndex={0}
            role="region"
            aria-label={memberQuotes.regionLabel}
            onKeyDown={onKey}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            style={{ marginRight: `calc(-1 * ${EDGE})`, paddingRight: EDGE }}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] select-none focus-visible:outline-offset-4 md:cursor-grab md:gap-6 [&::-webkit-scrollbar]:hidden"
          >
            {memberQuotes.items.map((q, i) => (
              <li
                key={i}
                className="flex w-[84%] shrink-0 snap-start flex-col justify-start border border-current/15 bg-offwhite p-6 sm:w-[60%] md:w-[44%] md:p-10 lg:w-[38%]"
              >
                <blockquote className="text-body-lg md:text-h3">
                  <span aria-hidden>“</span>
                  {q.quote}
                  <span aria-hidden>”</span>
                </blockquote>
                <div className="mt-6 border-t border-current/15 pt-4 md:mt-auto">
                  <p className="text-caption text-terracotta">{q.name}, {q.age}</p>
                  <p className="mt-1 text-caption text-terracotta">{memberQuotes.consent}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 hidden gap-3 md:flex">
            <button type="button" className={arrow} onClick={() => go(-1)} disabled={ends.start} aria-label={memberQuotes.previous}>
              <Arrow dir="left" />
            </button>
            <button type="button" className={arrow} onClick={() => go(1)} disabled={ends.end} aria-label={memberQuotes.next}>
              <Arrow dir="right" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
