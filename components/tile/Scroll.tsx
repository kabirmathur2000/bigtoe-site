"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { memberQuotes, type MemberQuote } from "@/content/quotes";
import { tile, type Accented } from "@/content/style-tile";
import coffeeBar from "@/public/photos/studio-coffee-bar.jpg";
import { Icon } from "./Icons";

/**
 * Round seven's scroll-linked pieces. Native scrolling throughout, no
 * snapping. Desktop (768px and wider) runs the Soma-style splits in step
 * with scroll; phones, where a pinned split does not fit the screen, play
 * the same evolution once as it arrives. Reduced motion: the final state.
 */

const R = 44;
const C = 2 * Math.PI * R;

/** True from 768px wide; false on the server and on phones. */
function useIsDesktop() {
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

function Accent({ value }: { value: Accented }) {
  const { text, accent } = value;
  if (!accent || !text.includes(accent)) return <>{text}</>;
  const i = text.indexOf(accent);
  return (
    <>
      {text.slice(0, i)}
      <span className="text-terracotta">{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}

/** A ring: a faint track and an arc that fills to `fill` (0 to 100). */
function Ring({ fill, strokeWidth, className }: { fill: MotionValue<number>; strokeWidth: number; className?: string }) {
  const offset = useTransform(fill, (v) => C * (1 - v / 100));
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={`w-full -rotate-90 ${className ?? ""}`} fill="none">
      <circle cx="50" cy="50" r={R} stroke="currentColor" strokeOpacity="0.15" strokeWidth={strokeWidth} />
      <motion.circle cx="50" cy="50" r={R} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={C} style={{ strokeDashoffset: offset }} />
    </svg>
  );
}

const values: number[] = tile.start.dials.map((d) => d.value);
const weakest = values.indexOf(Math.min(...values));

/** One of the four smaller dials: it rises out of the big ring and settles in its place, then fills. */
function SmallDial({ i, p, desktop }: { i: number; p: MotionValue<number>; desktop: boolean }) {
  const d = tile.start.dials[i];
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
  // Every fill completes by 0.9 of the way, so the last dial reaches its value.
  const fill = useTransform(p, [start + 0.12, start + 0.32], [0, d.value]);
  const shown = useTransform(fill, (v) => Math.round(v));
  return (
    <motion.li style={{ x, y, scale, opacity }} className="flex flex-col items-center text-center">
      <div className={`relative w-full max-w-[6.5rem] md:max-w-[7.5rem] ${i === weakest ? "text-terracotta" : ""}`}>
        <Ring fill={fill} strokeWidth={2} />
        <motion.span aria-hidden className="absolute inset-0 flex items-center justify-center ty-sub tabular-nums">{shown}</motion.span>
      </div>
      <p aria-hidden className="mt-3 ty-small leading-snug">{d.name}</p>
      <p className="sr-only">{`${d.name}: ${d.value} ${tile.start.outOf}`}</p>
    </motion.li>
  );
}

/** The diagram card: the big "Strength Reserve" ring counts up to 69, then the four dials rise out of it. */
function Diagram({ p, desktop }: { p: MotionValue<number>; desktop: boolean }) {
  const s = tile.start;
  const big = useTransform(p, [0, 0.35], [0, s.score.value]);
  const shown = useTransform(big, (v) => Math.round(v));
  return (
    <div className="rounded-2xl border border-navy/15 bg-offwhite p-5 text-navy md:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="ty-sub">{s.card}</p>
        <span className="rounded-full bg-navy/[0.07] px-3 py-1.5 ty-label">{s.example}</span>
      </div>
      <div className="mt-6 flex flex-col items-center md:mt-8">
        <div className="relative w-36 md:w-44">
          <Ring fill={big} strokeWidth={2.5} />
          <motion.span aria-hidden className="absolute inset-0 flex items-center justify-center ty-headline tabular-nums">{shown}</motion.span>
        </div>
        <p aria-hidden className="mt-3 ty-label">{s.score.name}</p>
        <p className="sr-only">{`${s.score.name}: ${s.score.value} ${s.outOf}`}</p>
      </div>
      <ul className="relative mt-8 grid grid-cols-2 gap-x-4 gap-y-6 md:mt-10 md:grid-cols-4">
        {s.dials.map((d, i) => (
          <SmallDial key={d.name} i={i} p={p} desktop={desktop} />
        ))}
      </ul>
    </div>
  );
}

/**
 * Know your starting point, Soma-style. Desktop: the section pins for
 * about a screen; the text on the left stays put while the diagram on the
 * right evolves in step with scroll, and rewinds on the way up. Phones:
 * text above the diagram, which plays once as it arrives.
 */
export function StartingPointSplit() {
  const s = tile.start;
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const section = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 0.35", "end end"] });
  const played = useMotionValue(0);
  const final = useMotionValue(1);
  const inView = useInView(card, { once: true, amount: 0.4 });

  useEffect(() => {
    if (desktop || reduce || !inView) return;
    const c = animate(played, 1, { duration: 2.6, ease: "easeOut" });
    return () => c.stop();
  }, [desktop, reduce, inView, played]);

  const p = reduce ? final : desktop ? scrollYProgress : played;

  return (
    <section ref={section} className="py-24 md:h-[220svh] md:py-0">
      <div className="tile-wrap grid gap-10 md:sticky md:top-0 md:h-svh md:grid-cols-12 md:items-center md:gap-12 md:pt-16">
        <div className="md:col-span-5">
          <h2 className="ty-headline">
            <Accent value={s.headline} />
          </h2>
          <p className="mt-5 max-w-md ty-sub opacity-80 md:mt-6">{s.line}</p>
        </div>
        <div ref={card} className="md:col-span-7">
          <Diagram p={p} desktop={desktop} />
        </div>
      </div>
    </section>
  );
}

/** One row of the Sherpa panel, appearing as the visitor scrolls. */
function SherpaRow({ i, row, p, desktop, reduce }: { i: number; row: (typeof tile.sherpa.rows)[number]; p: MotionValue<number>; desktop: boolean; reduce: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  // Phones: each row follows its own position on the screen.
  const { scrollYProgress: own } = useScroll({ target: ref, offset: ["start end", "start 0.72"] });
  const w = 0.1 + i * 0.17;
  const fromSection = useTransform(p, [w, w + 0.14], [0, 1]);
  const t = desktop ? fromSection : own;
  const opacity = useTransform(t, [0, 1], [0, 1]);
  const y = useTransform(t, [0, 1], [16, 0]);
  return (
    <motion.li ref={ref} style={reduce ? undefined : { opacity, y }} className="flex items-center gap-4 border-b border-navy/10 p-4 last:border-b-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/[0.07]">
        <Icon name={row.icon} />
      </span>
      <span>
        <span className="block ty-label">{row.label}</span>
        <span className="mt-1 block ty-body">{row.line}</span>
      </span>
    </motion.li>
  );
}

/**
 * Your Sherpa, Soma-style split. Desktop: the headline on the left, the
 * photo with its glass panel on the right; the section pins and the four
 * rows appear one at a time in step with scroll. Phones: the headline
 * above, and each row appears as it comes up the screen.
 */
export function SherpaSplit() {
  const s = tile.sherpa;
  const reduce = !!useReducedMotion();
  const desktop = useIsDesktop();
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 0.3", "end end"] });
  return (
    <section ref={section} className="py-24 md:h-[200svh] md:py-0">
      <div className="tile-wrap grid gap-10 md:sticky md:top-0 md:h-svh md:grid-cols-12 md:items-center md:gap-12 md:pt-16">
        <h2 className="ty-headline md:col-span-4">
          <Accent value={s.headline} />
        </h2>
        <div className="relative h-[40rem] overflow-hidden rounded-2xl bg-navy md:col-span-8 md:h-[min(44rem,78svh)]">
          <Image src={coffeeBar} alt="" fill sizes="(min-width: 768px) 66vw, 100vw" quality={70} className="object-cover object-[30%_50%] md:object-[35%_55%]" />
          <ul className="absolute inset-x-3 bottom-3 rounded-2xl border border-offwhite/50 bg-offwhite/75 p-2 text-navy backdrop-blur-xl md:inset-x-auto md:right-6 md:bottom-6 md:w-[26rem]">
            {s.rows.map((r, i) => (
              <SherpaRow key={r.label} i={i} row={r} p={scrollYProgress} desktop={desktop} reduce={reduce} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** One member card: sticks near the top so the next slides over it; a card taller than the screen sticks with its bottom in view. */
function MemberCardStack({ q, i }: { q: MemberQuote; i: number }) {
  const m = tile.members;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const [top, setTop] = useState(80 + i * 14);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setTop(Math.min(80 + i * 14, window.innerHeight - el.offsetHeight - 12));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [i]);
  return (
    <li ref={ref} style={{ top }} className="sticky mx-auto w-full max-w-[52rem] rounded-2xl bg-offwhite p-3 text-navy md:p-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-navy/10 md:aspect-[3/2]">
        {q.video ? (
          // The video slot, for later: muted, inline, looping.
          <video src={q.video} muted playsInline loop autoPlay={!reduce} controls={!!reduce} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <Image src={coffeeBar} alt="" fill sizes="(min-width: 768px) 832px, 100vw" quality={70} className="object-cover" style={{ objectPosition: ["50% 45%", "75% 55%", "25% 50%"][i % 3] }} />
        )}
      </div>
      <div className="px-2 pt-5 pb-3 md:px-3 md:pt-6">
        <p className="flex flex-wrap items-center gap-2 text-[0.8125rem] font-bold tracking-[0.14em] uppercase">
          {q.name ?? m.name}, {q.age ?? m.age}
          {q.draft && <span className="rounded-full border border-terracotta px-2 py-0.5 text-terracotta">{m.draftLabel}</span>}
        </p>
        <blockquote className="mt-3 ty-sub">&ldquo;{q.quote}&rdquo;</blockquote>
      </div>
    </li>
  );
}

/** In our members' words, after Neko's cards: each card sticks and the next slides over it. */
export function MemberStack() {
  return (
    <ul className="mt-10 space-y-8 md:mt-14 md:space-y-12">
      {memberQuotes.map((q, i) => (
        <MemberCardStack key={q.quote} q={q} i={i} />
      ))}
    </ul>
  );
}

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * The navy switch: from Your Sherpa to the footer the page is navy with
 * #F0EEEB text. The page colour fades from off-white to navy over about
 * half a screen as this zone's top travels up from three quarters of the
 * screen to a quarter, then stays navy; one change only. A fade, not
 * movement, so it runs the same under reduced motion.
 */
export function NavyZone({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let last = -1;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const vh = window.innerHeight;
      const amount = Math.round(clamp((vh * 0.75 - el.getBoundingClientRect().top) / (vh * 0.5)) * 1000) / 10;
      if (amount === last) return;
      last = amount;
      root.style.setProperty("--tile-bg", `color-mix(in srgb, var(--navy) ${amount}%, var(--offwhite))`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root.style.removeProperty("--tile-bg");
    };
  }, []);
  return (
    <div ref={ref} data-zone="navy" className="text-offwhite">
      {children}
    </div>
  );
}
