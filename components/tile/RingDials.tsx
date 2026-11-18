"use client";

import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { tile } from "@/content/style-tile";

const R = 44;
const C = 2 * Math.PI * R;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const values: number[] = tile.dials.items.map((d) => d.value);
const weakest = values.indexOf(Math.min(...values));
const strongest = values.indexOf(Math.max(...values));

/**
 * The example dials (78, 42, 90, 66, the number inside), driven by scroll:
 * the arcs fill and the numbers count up in step with scroll progress as
 * the dials card comes up the screen, and rewind on the way up. Once full,
 * the weakest turns terracotta and the strongest the muted green; the
 * others stay navy. Always labelled "Example". Four in a row on desktop,
 * 2 x 2 on phones. Reduced motion: the final numbers, still.
 * (The arcs are an SVG stroke, the one effect that is not a transform or
 * an opacity; four small circles, cheap to draw.)
 */
export function RingDials() {
  const d = tile.dials;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.35"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  const t = reduce ? 1 : easeOut(Math.min(1, Math.max(0, progress)));
  const done = t >= 0.999;

  return (
    <div ref={ref}>
      <p className="t-label">{d.example}</p>
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-8 md:grid-cols-4 md:gap-10">
        {d.items.map((item, i) => {
          const now = Math.round(item.value * t);
          const tint = !done ? "" : i === weakest ? "text-terracotta" : i === strongest ? "text-dial-green" : "";
          return (
            <li key={item.name}>
              <div className={`relative w-full max-w-[9rem] transition-colors duration-700 ease-soft md:max-w-[11rem] ${tint}`}>
                <svg aria-hidden viewBox="0 0 100 100" className="w-full -rotate-90" fill="none">
                  <circle cx="50" cy="50" r={R} stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
                  <circle
                    cx="50" cy="50" r={R} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeDasharray={C} strokeDashoffset={C * (1 - (item.value * t) / 100)}
                  />
                </svg>
                <span aria-hidden className="absolute inset-0 flex items-center justify-center t-sub tabular-nums">{now}</span>
              </div>
              <p className="sr-only">{`${item.name}: ${item.value} ${d.outOf}`}</p>
              <p aria-hidden className="mt-3 t-body leading-snug">{item.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
