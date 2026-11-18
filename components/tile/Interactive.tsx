"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { tile } from "@/content/style-tile";
import coffeeBar from "@/public/photos/studio-coffee-bar.jpg";
import { Icon } from "./Icons";

const EASE = [0.22, 1, 0.36, 1] as const;
const frost = "bg-offwhite/85 text-navy backdrop-blur-md";

/** One card of the row: a portrait photo, a pill label top left, a round plus top right, a short line low on the photo. */
function TrainCard({ card }: { card: (typeof tile.train.cards)[number] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li className="relative aspect-[4/5] w-[78%] max-w-[22rem] shrink-0 snap-start overflow-hidden rounded-2xl md:w-[20rem] lg:w-[22.5rem]">
      <Image src={coffeeBar} alt="" fill sizes="(min-width: 1024px) 360px, 78vw" quality={70} className="object-cover" style={{ objectPosition: card.pos }} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-navy/75 via-navy/25 to-transparent" />

      <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 ty-label ${frost}`}>
          <Icon name={card.icon} className="h-4 w-4" />
          {card.name}
        </span>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          aria-label={tile.train.moreLabel(card.name)}
          onClick={() => setOpen((o) => !o)}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-soft hover:scale-105 ${frost}`}
        >
          <Icon name="plus" className={`h-5 w-5 transition-transform duration-300 ease-soft motion-reduce:transition-none ${open ? "rotate-45" : ""}`} />
        </button>
      </div>

      <p className={`absolute inset-x-5 bottom-5 ty-sub text-offwhite transition-opacity duration-300 ${open ? "opacity-0" : ""}`}>{card.line}</p>
      <div
        id={id}
        inert={!open}
        className={`absolute inset-x-3 bottom-3 rounded-xl p-4 ty-body transition-[opacity,translate] duration-300 ease-soft motion-reduce:transition-none ${frost} ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {card.more}
      </div>
    </li>
  );
}

/**
 * 3. What we train, after Oura's card row: manual only. Phones swipe, with
 * the next card peeking; desktop has round arrows. Native scrolling with
 * snap points inside the row only.
 */
export function TrainRow() {
  const t = tile.train;
  const reduce = useReducedMotion();
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 transition-opacity duration-300 hover:bg-navy/5 disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div>
      <div className="tile-wrap flex items-end justify-between gap-6">
        <h2 className="ty-headline">{t.headline.text}</h2>
        <div className="hidden shrink-0 gap-2 md:flex">
          <button type="button" aria-label={t.previous} disabled={edges.start} onClick={() => step(-1)} className={arrow}>
            <Icon name="left" />
          </button>
          <button type="button" aria-label={t.next} disabled={edges.end} onClick={() => step(1)} className={arrow}>
            <Icon name="right" />
          </button>
        </div>
      </div>
      <ul
        ref={track}
        onScroll={measure}
        className="tile-edge mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] md:mt-10 md:gap-4 [&::-webkit-scrollbar]:hidden"
      >
        {t.cards.map((c) => (
          <TrainCard key={c.name} card={c} />
        ))}
      </ul>
    </div>
  );
}

/**
 * 5. The range chart, after Function's biomarker card: two bands, "In
 * range" above "Below range", and two dots joined by a line, "First visit"
 * below range and "Retest" in range. Labelled "Example"; no scores. The
 * dots and line draw in once. Reduced motion: drawn, still.
 */
export function RangeChart() {
  const s = tile.start;
  const reduce = useReducedMotion();
  const area = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = area.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const first = { x: 26, y: 72 };
  const retest = { x: 76, y: 28 };
  const dot = (p: { x: number; y: number }, solid: boolean, delay: number) => (
    <motion.span
      aria-hidden
      className={`absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-navy ${solid ? "bg-navy" : "bg-offwhite"}`}
      style={{ left: `${p.x}%`, top: `${p.y}%` }}
      initial={reduce ? false : { opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.4, ease: EASE, delay }}
    />
  );
  const label = (p: { x: number; y: number }, text: string, delay: number, side: "below" | "right") => (
    <motion.span
      aria-hidden
      className={`absolute ty-small whitespace-nowrap ${side === "below" ? "-translate-x-1/2 pt-4" : "-translate-y-1/2 pl-5"}`}
      style={{ left: `${p.x}%`, top: `${p.y}%` }}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.4, delay }}
    >
      {text}
    </motion.span>
  );

  return (
    <div className="rounded-2xl border border-navy/15 bg-offwhite p-5 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="ty-sub">{s.dial}</p>
        <span className="rounded-full bg-navy/[0.07] px-3 py-1.5 ty-label">{s.example}</span>
      </div>
      <div ref={area} role="img" aria-label={s.chartLabel} className="relative mt-6 aspect-[4/3] md:mt-8 md:aspect-[16/10]">
        <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-lg bg-navy/[0.05]">
          <span className="absolute top-3 left-3 ty-small text-navy/75">{s.inRange}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-lg border-t border-dashed border-navy/25 bg-terracotta/[0.07]">
          <span className="absolute bottom-3 left-3 ty-small text-navy/75">{s.belowRange}</span>
        </div>
        {/* Drawn at the chart's real pixel size, so the line keeps its weight. */}
        {size.w > 0 && (
          <svg aria-hidden viewBox={`0 0 ${size.w} ${size.h}`} className="absolute inset-0 h-full w-full overflow-visible">
            <motion.line
              x1={(first.x / 100) * size.w}
              y1={(first.y / 100) * size.h}
              x2={(retest.x / 100) * size.w}
              y2={(retest.y / 100) * size.h}
              stroke="currentColor"
              strokeWidth="1.5"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
            />
          </svg>
        )}
        {dot(first, false, 0.1)}
        {dot(retest, true, 1.3)}
        {label(first, s.first, 0.2, "right")}
        {label(retest, s.retest, 1.4, "below")}
      </div>
    </div>
  );
}

/** 9. Questions, after Function's FAQ: an accordion, one open at a time. */
export function Faq() {
  const q = tile.questions;
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div>
      <ul className="border-t border-navy/15">
        {q.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} className="border-b border-navy/15">
              <h3>
                <button
                  type="button"
                  id={`${base}-q${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`${base}-a${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-11 w-full items-start justify-between gap-6 py-6 text-left ty-sub md:py-7"
                >
                  {item.q}
                  <Icon name="plus" className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-300 ease-soft motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`} />
                </button>
              </h3>
              <div
                id={`${base}-a${i}`}
                role="region"
                aria-labelledby={`${base}-q${i}`}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-soft motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-7 ty-body text-navy/80">{item.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <Link href={q.all.href} className="mt-8 inline-flex min-h-11 items-center ty-body underline decoration-navy/30 underline-offset-[6px] transition-opacity duration-300 hover:opacity-70">
        {q.all.label}
      </Link>
    </div>
  );
}
