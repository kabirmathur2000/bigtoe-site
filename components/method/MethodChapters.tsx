"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { Placeholder } from "@/components/ui/Photo";
import { barefoot, fades } from "@/content/method";

/** The three bulbs share one base line so they sit level. */
const BASE = "M27 66h10M28.5 72h7";
/** A normal bulb, used for Strength and Power. */
const GLASS = "M32 24a15 15 0 0 0-8.8 27.2c2.3 1.8 3.8 3.9 3.8 6.4V61h10v-3.4c0-2.5 1.5-4.6 3.8-6.4A15 15 0 0 0 32 24Z";
/** Muscle: the size of the bulb, so a large one. */
const LARGE = "M32 4a22 22 0 0 0-13 39.8c3.4 2.6 5 5.6 5 9.2V61h16v-8c0-3.6 1.6-6.6 5-9.2A22 22 0 0 0 32 4Z";
/** Strength: how bright it burns, so short rays around a normal bulb. */
const RAYS = "M32 8v8M15 15l5 5M49 15l-5 5M9 37h7M48 37h7";
/** Power: how fast the switch works, so a wire to a small switch. */
const WIRE = "M37 63.5h9";
const SWITCH = "M46 59.5h12a4 4 0 0 1 0 8H46a4 4 0 0 1 0-8Z";

/**
 * Three line-drawn bulbs, navy hairlines: a large bulb (Muscle), a bright
 * one with rays (Strength) and one with a switch (Power), whose switch is
 * the screen's one terracotta accent. They draw in once; static under
 * reduced motion.
 */
function Bulb({ kind, on, reduce }: { kind: number; on: boolean; reduce: boolean | null }) {
  const draw = (delay: number) => ({
    strokeDasharray: 1,
    strokeDashoffset: on || reduce ? 0 : 1,
    transition: reduce ? "none" : `stroke-dashoffset 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  });
  const line = { pathLength: 1 };
  return (
    <svg aria-hidden viewBox="0 0 64 80" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-14 w-11 shrink-0 md:h-24 md:w-19">
      <path {...line} d={kind === 0 ? LARGE : GLASS} style={draw(kind * 250)} />
      <path {...line} d={BASE} style={draw(kind * 250 + 300)} />
      {kind === 1 && <path {...line} d={RAYS} style={draw(900)} />}
      {kind === 2 && (
        <>
          <path {...line} d={WIRE} style={draw(1000)} />
          <path {...line} d={SWITCH} className="text-terracotta" stroke="currentColor" style={draw(1100)} />
          <circle cx="54" cy="63.5" r="2.2" className="fill-terracotta" stroke="none" style={{ opacity: on || reduce ? 1 : 0, transition: reduce ? "none" : "opacity 600ms ease 1700ms" }} />
        </>
      )}
    </svg>
  );
}

/** Chapter 1, WHAT FADES: three bulbs, one line each. */
export function Fades() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLUListElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setOn(true);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <Section chapter>
      <div className="mx-auto max-w-wide px-gutter">
        {/* First screen: a CSS fade that starts at first paint, not after scripts load. */}
        <div className="max-w-3xl md:ml-[8.333%]">
          <h1 className="fade-up text-[2.125rem] leading-[1.05] font-light tracking-[-0.015em] md:text-h1">{fades.headline}</h1>
        </div>

        <ul ref={ref} className="mt-8 grid gap-0 md:mt-14 md:ml-[8.333%] md:max-w-5xl md:grid-cols-3 md:gap-10">
          {fades.bulbs.map((b, i) => (
            <li key={b.name} className="flex items-center gap-5 border-t border-current/15 py-4 md:block md:py-6">
              <Bulb kind={i} on={on} reduce={reduce} />
              <div className="md:mt-6">
                <p className="text-h3">{b.name}</p>
                <p className="mt-1 text-body opacity-75">{b.line}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/**
 * Chapter 2, barefoot and free weights: the big toe, then free weights. One photo beside the words on desktop (no split
 * layout); above them on taller phones, set aside on short ones.
 */
export function Barefoot() {
  return (
    <Section chapter>
      <div className="mx-auto grid max-w-wide items-center gap-6 px-gutter md:grid-cols-12 md:gap-12">
        <Reveal className="md:order-2 md:col-span-5 md:col-start-7">
          <RevealItem>
            <Placeholder ratio="" shot={barefoot.shot} className="aspect-[5/2] short:hidden md:aspect-[4/5] md:max-h-[68svh]" />
          </RevealItem>
        </Reveal>
        <Reveal className="md:order-1 md:col-span-5 md:col-start-2" stagger={0.25}>
          <RevealItem as="h2" className="text-h1">{barefoot.headline}</RevealItem>
          <RevealItem as="p" className="mt-6 border-t border-current/15 pt-5 text-h3 md:mt-10 md:pt-6">{barefoot.weights}</RevealItem>
        </Reveal>
      </div>
    </Section>
  );
}
