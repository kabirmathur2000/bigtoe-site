"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { dials } from "@/content/site";

/**
 * The example dials (Home, Method, the style tile). Native scrolling, no
 * snapping. Reduced motion: shown in the final state.
 */

const R = 44;
const C = 2 * Math.PI * R;

/** True from 768px wide; false on the server and on phones. */
export function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => setDesktop(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return desktop;
}

/** A ring: a faint track and an arc that fills to `fill` (0 to 100). */
function Ring({ fill, strokeWidth }: { fill: MotionValue<number>; strokeWidth: number }) {
  const offset = useTransform(fill, (v) => C * (1 - v / 100));
  return (
    <svg aria-hidden viewBox="0 0 100 100" className="w-full -rotate-90" fill="none">
      <circle cx="50" cy="50" r={R} stroke="currentColor" strokeOpacity="0.15" strokeWidth={strokeWidth} />
      <motion.circle cx="50" cy="50" r={R} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={C} style={{ strokeDashoffset: offset }} />
    </svg>
  );
}

const values: number[] = dials.items.map((d) => d.value);
const weakest = values.indexOf(Math.min(...values));

/**
 * One of the four dials. `rise`: it rises out of the big ring and settles
 * in its place, then fills (Home). Otherwise it stays put and only fills,
 * one after another (Method).
 */
function SmallDial({ i, p, desktop, rise }: { i: number; p: MotionValue<number>; desktop: boolean; rise: boolean }) {
  const d = dials.items[i];
  const start = rise ? 0.38 + i * 0.06 : i * 0.12;
  const t = useTransform(p, [start, start + 0.25], [0, 1]);
  // Where the big ring sits, measured in this dial's own size: centred above the row.
  const col = desktop ? i : i % 2;
  const row = desktop ? 0 : Math.floor(i / 2);
  const fromX = desktop ? (1.5 - col) * 100 : (0.5 - col) * 100;
  const fromY = desktop ? -120 : -120 - row * 110;
  const x = useTransform(t, (v) => `${(1 - v) * fromX}%`);
  const y = useTransform(t, (v) => `${(1 - v) * fromY}%`);
  const scale = useTransform(t, [0, 1], [0.4, 1]);
  const opacity = useTransform(t, [0.15, 0.55, 1], [0, 1, 1]);
  // Every fill completes before the end, so the last dial reaches its value.
  const fill = useTransform(p, rise ? [start + 0.12, start + 0.32] : [start, start + 0.6], [0, d.value]);
  const shown = useTransform(fill, (v) => Math.round(v));
  return (
    <motion.li style={rise ? { x, y, scale, opacity } : undefined} className="flex flex-col items-center text-center">
      <div className={`relative w-full max-w-[6.5rem] md:max-w-[7.5rem] ${i === weakest ? "text-terracotta" : ""}`}>
        <Ring fill={fill} strokeWidth={2} />
        <motion.span aria-hidden className="absolute inset-0 flex items-center justify-center ty-sub tabular-nums">{shown}</motion.span>
      </div>
      <p aria-hidden className="mt-3 ty-small leading-snug">{d.name}</p>
      <p className="sr-only">{`${d.name}: ${d.value} ${dials.outOf}`}</p>
    </motion.li>
  );
}

/** The card: the title, the "Example" pill, then (`score`) the big ring and the four dials. */
function Card({ p, desktop, score }: { p: MotionValue<number>; desktop: boolean; score: boolean }) {
  const big = useTransform(p, [0, 0.35], [0, dials.score.value]);
  const shown = useTransform(big, (v) => Math.round(v));
  return (
    <div className="rounded-2xl border border-navy/15 bg-offwhite p-5 text-navy md:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="ty-sub">{dials.card}</p>
        <span className="rounded-full bg-navy/[0.07] px-3 py-1.5 ty-label">{dials.example}</span>
      </div>
      {score && (
        <div className="mt-6 flex flex-col items-center md:mt-8">
          <div className="relative w-36 md:w-44">
            <Ring fill={big} strokeWidth={2.5} />
            <motion.span aria-hidden className="absolute inset-0 flex items-center justify-center ty-headline tabular-nums">{shown}</motion.span>
          </div>
          <p aria-hidden className="mt-3 ty-label">{dials.score.name}</p>
          <p className="sr-only">{`${dials.score.name}: ${dials.score.value} ${dials.outOf}`}</p>
        </div>
      )}
      <ul className="relative mt-8 grid grid-cols-2 gap-x-4 gap-y-6 md:mt-10 md:grid-cols-4">
        {dials.items.map((d, i) => (
          <SmallDial key={d.name} i={i} p={p} desktop={desktop} rise={score} />
        ))}
      </ul>
    </div>
  );
}

/** Plays 0 → 1 once when `ref` comes into view (phones, and Method's four dials). */
function usePlayOnce(ref: React.RefObject<HTMLElement | null>, enabled: boolean, duration: number) {
  const played = useMotionValue(0);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  useEffect(() => {
    if (!enabled || !inView) return;
    const c = animate(played, 1, { duration, ease: "easeOut" });
    return () => c.stop();
  }, [enabled, inView, played, duration]);
  return played;
}

/**
 * The Soma-style split: text on the left (`children`), the card on the
 * right; on phones the text sits above. Desktop: the section pins for
 * about a screen; the text stays put while the big "Strength Reserve"
 * ring counts up to 69 and the four dials rise out of it, in step with
 * scroll, rewinding on the way up. Phones: a pinned split does not fit
 * the screen, so the same sequence plays once as the card arrives.
 */
export function DialSplit({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const section = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 0.35", "end end"] });
  const played = usePlayOnce(card, !desktop && !reduce, 2.6);
  const final = useMotionValue(1);
  const p = reduce ? final : desktop ? scrollYProgress : played;

  return (
    <section ref={section} className="py-24 md:h-[220svh] md:py-0">
      <div className="tile-wrap grid gap-10 md:sticky md:top-0 md:h-svh md:grid-cols-12 md:items-center md:gap-12 md:pt-16">
        <div className="md:col-span-5">{children}</div>
        <div ref={card} className="md:col-span-7">
          <Card p={p} desktop={desktop} score />
        </div>
      </div>
    </section>
  );
}

/** The four dials alone (Method): each fills in turn, once, as the card arrives. */
export function FourDials() {
  const reduce = useReducedMotion();
  const card = useRef<HTMLDivElement>(null);
  const played = usePlayOnce(card, !reduce, 2);
  const final = useMotionValue(1);
  return (
    <div ref={card}>
      <Card p={reduce ? final : played} desktop={false} score={false} />
    </div>
  );
}
