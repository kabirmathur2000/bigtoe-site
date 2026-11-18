"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { tile } from "@/content/style-tile";
import coffeeBar from "@/public/photos/studio-coffee-bar.jpg";
import { Icon } from "./Icons";

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

/** 9. Questions, after Function's FAQ: an accordion, one open at a time. */
export function Faq() {
  const q = tile.questions;
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div>
      <ul className="border-t border-current/20">
        {q.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} className="border-b border-current/20">
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
                  <p className="max-w-2xl pb-7 ty-body opacity-80">{item.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <Link href={q.all.href} className="mt-8 inline-flex min-h-11 items-center ty-body underline decoration-current/30 underline-offset-[6px] transition-opacity duration-300 hover:opacity-70">
        {q.all.label}
      </Link>
    </div>
  );
}
