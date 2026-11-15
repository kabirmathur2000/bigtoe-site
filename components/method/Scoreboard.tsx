"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { scoreboard } from "@/content/method";

const DURATION = 1800;
const R = 44;
const C = 2 * Math.PI * R;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const values: number[] = scoreboard.dials.map((d) => d.value);
const score = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
const weakest = values.indexOf(Math.min(...values));

/**
 * Chapter 3, THE SCOREBOARD. Four example dials count up once to Deck 7's
 * example member, then the weakest dial turns terracotta. Always labelled
 * "Example". Under reduced motion the final numbers show at once.
 */
export function Scoreboard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [counted, setT] = useState(0);
  const t = reduce ? 1 : counted;

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION);
          setT(easeOut(p));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduce]);

  const done = t >= 1;

  return (
    <Section chapter>
      <div className="mx-auto max-w-wide px-gutter">
        <Reveal className="md:ml-[8.333%]" stagger={0.18}>
          <RevealItem as="h2" className="text-h1">{scoreboard.headline}</RevealItem>
        </Reveal>

        <div ref={ref} className="mt-6 border-t border-current/15 pt-4 md:mt-10 md:ml-[8.333%] md:max-w-5xl">
          <p className="text-label uppercase text-terracotta">{scoreboard.example}</p>

          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6 md:mt-6 md:grid-cols-4 md:gap-x-10">
            {scoreboard.dials.map((d, i) => {
              const now = Math.round(d.value * t);
              const accent = done && i === weakest;
              return (
                <li key={d.name}>
                  <div className={`relative w-full max-w-24 md:max-w-32 transition-colors duration-700 ease-soft ${accent ? "text-terracotta" : ""}`}>
                    <svg aria-hidden viewBox="0 0 100 100" className="w-full -rotate-90" fill="none">
                      <circle cx="50" cy="50" r={R} stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
                      <circle
                        cx="50" cy="50" r={R} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                        strokeDasharray={C} strokeDashoffset={C * (1 - (d.value * t) / 100)}
                      />
                    </svg>
                    <span aria-hidden className="absolute inset-0 flex items-center justify-center text-h2 tabular-nums">
                      {now}
                    </span>
                  </div>
                  <p className="sr-only">{`${d.name}: ${d.value} ${scoreboard.outOf}`}</p>
                  <p aria-hidden className="mt-3 text-body">{d.name}</p>
                  <p className="mt-1 text-caption opacity-70">{d.line}</p>
                </li>
              );
            })}
          </ul>

          {/* The score beside the lesson: the weakest dial matters more than the total. */}
          <div className="mt-6 grid gap-6 border-t border-current/15 pt-4 md:mt-8 md:grid-cols-12 md:gap-10">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 md:col-span-5 md:block">
              <p className="text-label uppercase opacity-60">{scoreboard.scoreName}</p>
              <p className="text-h1 tabular-nums md:mt-2">
                <span aria-hidden>{Math.round(score * t)}</span>
                <span className="sr-only">{score}</span>
              </p>
              <p className="text-body opacity-70">{scoreboard.scoreNote}</p>
            </div>
            <Reveal className="md:col-span-7" stagger={0.2}>
              <RevealItem as="p" className="text-h3">{scoreboard.weakest}</RevealItem>
              <RevealItem as="p" className="mt-2 text-body-lg opacity-75">{scoreboard.loop}</RevealItem>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
