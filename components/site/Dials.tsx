"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { dials } from "@/content/site";

/**
 * The example dials ("Know your starting point."). Native scrolling, no
 * snapping, nothing pinned. Reduced motion: shown in the final state.
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

/** One of the four dials: it grows out of the big ring, settles in its place beneath it, then fills. */
function SmallDial({ i, p, desktop }: { i: number; p: MotionValue<number>; desktop: boolean }) {
  const d = dials.items[i];
  const start = 0.38 + i * 0.06;
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
  const fill = useTransform(p, [start + 0.12, start + 0.32], [0, d.value]);
  const shown = useTransform(fill, (v) => Math.round(v));
  return (
    <motion.li style={{ x, y, scale, opacity }} className="flex flex-col items-center text-center">
      <div className={`relative w-full max-w-26 md:max-w-30 ${i === weakest ? "text-terracotta" : ""}`}>
        <Ring fill={fill} strokeWidth={2} />
        <motion.span aria-hidden className="absolute inset-0 flex items-center justify-center ty-sub tabular-nums">{shown}</motion.span>
      </div>
      <p aria-hidden className="mt-3 ty-small leading-snug">{d.name}</p>
      <p className="sr-only">{`${d.name}: ${d.value} ${dials.outOf}`}</p>
    </motion.li>
  );
}

/** The card: the title and the "Example" label, the big ring, then the four dials beneath it (2 x 2 on phones, a row of four on desktop). */
function Card({ p, desktop }: { p: MotionValue<number>; desktop: boolean }) {
  const big = useTransform(p, [0, 0.35], [0, dials.score.value]);
  const shown = useTransform(big, (v) => Math.round(v));
  return (
    <div className="rounded-2xl border border-navy/15 bg-offwhite p-5 text-navy md:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="ty-sub">{dials.card}</p>
        <span className="rounded-full bg-navy/[0.07] px-3 py-1.5 ty-label">{dials.example}</span>
      </div>
      <div className="mt-6 flex flex-col items-center md:mt-8">
        <div className="relative w-36 md:w-44">
          <Ring fill={big} strokeWidth={2.5} />
          <motion.span aria-hidden className="absolute inset-0 flex items-center justify-center ty-headline tabular-nums">{shown}</motion.span>
        </div>
        <p aria-hidden className="mt-3 ty-label">{dials.score.name}</p>
        <p className="sr-only">{`${dials.score.name}: ${dials.score.value} ${dials.outOf}`}</p>
      </div>
      <ul className="relative mt-8 grid grid-cols-2 gap-x-4 gap-y-6 md:mt-10 md:grid-cols-4">
        {dials.items.map((d, i) => (
          <SmallDial key={d.name} i={i} p={p} desktop={desktop} />
        ))}
      </ul>
    </div>
  );
}

/**
 * The Reserve Audit dials, in step with scroll on every screen: as the
 * card comes up the screen the big "Strength Reserve" ring counts up to
 * 69, then the four smaller dials grow out of it and settle beneath it
 * (the big ring stays), each filling to its value; scrolling back
 * rewinds. Nothing is pinned: the page scrolls as normal.
 */
export function ReserveDials() {
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const card = useRef<HTMLDivElement>(null);
  // From the card's top at 90% of the screen to its bottom at 75%: about a screen of scrolling.
  const { scrollYProgress } = useScroll({ target: card, offset: ["start 0.9", "end 0.75"] });
  const final = useMotionValue(1);
  return (
    <div ref={card}>
      <Card p={reduce ? final : scrollYProgress} desktop={desktop} />
    </div>
  );
}
