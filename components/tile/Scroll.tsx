"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Children, createRef, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import type { MemberQuote } from "@/content/quotes";
import { tile, type Accented } from "@/content/style-tile";
import { MemberCard } from "./MemberCard";
import { PhotoFill } from "./Panel";

/*
 * Scroll-linked motion (round five). Every effect is tied to scroll
 * position: it plays forward as the visitor scrolls down and rewinds as
 * they scroll up. Native scrolling, no snapping, no hijacking. Transform
 * and opacity only. Text stays readable at every point. Under reduced
 * motion every effect is off and everything is visible and still.
 */

/* ------------------------------------------------------------------ */
/* A. Expanding hero                                                   */
/* ------------------------------------------------------------------ */

/** A quarter-circle "corner" in the page navy that, laid over a square photo, makes its corner look rounded. */
function Corner({ className, opacity }: { className: string; opacity: MotionValue<number> }) {
  return (
    <motion.svg aria-hidden viewBox="0 0 32 32" className={`absolute h-7 w-7 text-navy md:h-8 md:w-8 ${className}`} style={{ opacity }}>
      <path d="M0 0h32A32 32 0 0 0 0 32Z" fill="currentColor" />
    </motion.svg>
  );
}

/**
 * The coffee bar photo card starts inset with rounded corners; as the
 * visitor scrolls it grows to fill the screen width (scale, transform
 * only) while its corners ease to square (the rounded corners are navy
 * corner pieces fading out, opacity only). It then holds while the next
 * section scrolls up over it.
 */
export function ExpandingHero({ photo, caption }: { photo: ReactNode; caption: string }) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(0.92);

  // The inset width as a share of the screen width: where the card starts.
  useEffect(() => {
    const measure = () => {
      const pad = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--tile-inset")) || 16;
      const content = Math.min(window.innerWidth, 1440) - 2 * pad;
      setStart(Math.min(1, content / window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 0.85", "start 0.15"] });
  const scale = useTransform(scrollYProgress, [0, 1], [start, 1]);
  const corners = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  if (reduce) {
    return (
      <div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] md:aspect-video md:rounded-[32px]">{photo}</div>
        <p className="mt-3 t-label">{caption}</p>
      </div>
    );
  }

  return (
    // Full screen width; tall enough to hold the photo while the next section scrolls over it.
    <div ref={wrap} className="relative ml-[calc(50%-50vw)] w-screen pb-[50svh]">
      <div className="sticky top-[max(4.5rem,calc((100svh-125vw)/2))] md:top-[max(5rem,calc((100svh-56.25vw)/2))]">
        <motion.div className="relative aspect-[4/5] origin-top overflow-hidden md:aspect-video" style={{ scale }}>
          {photo}
          <Corner className="top-0 left-0" opacity={corners} />
          <Corner className="top-0 right-0 rotate-90" opacity={corners} />
          <Corner className="right-0 bottom-0 rotate-180" opacity={corners} />
          <Corner className="bottom-0 left-0 -rotate-90" opacity={corners} />
        </motion.div>
        <p className="mx-auto mt-3 max-w-[1440px] px-(--tile-inset) t-label">{caption}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* B. Words lighting up                                                */
/* ------------------------------------------------------------------ */

/** Unlit words start at 40% (about 3.3:1 on navy at headline size), so they stay readable. */
const UNLIT = 0.4;

function Word({ word, i, n, progress, accent }: { word: string; i: number; n: number; progress: MotionValue<number>; accent: boolean }) {
  const from = (i / n) * 0.9;
  const opacity = useTransform(progress, [from, from + 0.1], [UNLIT, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "text-terracotta" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

/**
 * Every word of the headline and its lines starts dim and brightens to
 * full, one word at a time, as the visitor scrolls through the section.
 */
export function LightWords({ headline, lines }: { headline: Accented; lines: readonly string[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.45"] });

  // Every word in order, marking those inside the accent phrase.
  const accentStart = headline.accent ? headline.text.indexOf(headline.accent) : -1;
  const headWords: { word: string; accent: boolean }[] = [];
  let pos = 0;
  for (const w of headline.text.split(" ")) {
    const at = headline.text.indexOf(w, pos);
    pos = at + w.length;
    headWords.push({ word: w, accent: accentStart >= 0 && at >= accentStart && at < accentStart + (headline.accent?.length ?? 0) });
  }
  const lineWords = lines.map((l) => l.split(" "));
  const n = headWords.length + lineWords.reduce((a, l) => a + l.length, 0);

  if (reduce) {
    return (
      <div>
        <h2 className="t-headline">
          {headWords.map((w, i) => (
            <span key={i} className={w.accent ? "text-terracotta" : undefined}>{w.word} </span>
          ))}
        </h2>
        {lines.map((l, i) => (
          <p key={l} className={`max-w-2xl t-sub ${i ? "mt-3" : "mt-4 md:mt-6"}`}>{l}</p>
        ))}
      </div>
    );
  }

  let k = 0;
  return (
    <div ref={ref}>
      <h2 className="t-headline">
        {headWords.map((w) => (
          <Word key={k} word={w.word} i={k++} n={n} progress={scrollYProgress} accent={w.accent} />
        ))}
      </h2>
      {lineWords.map((words, li) => (
        <p key={li} className={`max-w-2xl t-sub ${li ? "mt-3" : "mt-4 md:mt-6"}`}>
          {words.map((w) => (
            <Word key={k} word={w} i={k++} n={n} progress={scrollYProgress} accent={false} />
          ))}
        </p>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* C. Stacking cards                                                   */
/* ------------------------------------------------------------------ */

function StackItem({
  children,
  self,
  next,
  index,
}: {
  children: ReactNode;
  self: RefObject<HTMLDivElement | null>;
  next: RefObject<HTMLDivElement | null> | null;
  index: number;
}) {
  const [top, setTop] = useState(24);

  // Stick near the top; a section taller than the screen sticks with its bottom in view instead, so none of it is lost.
  useEffect(() => {
    const el = self.current;
    if (!el) return;
    const measure = () => setTop(Math.min(24, window.innerHeight - el.offsetHeight - 16));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [self]);

  // As the next section slides up over this one, this one scales to 94% and dims slightly.
  const { scrollYProgress } = useScroll({ target: next ?? self, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, next ? 0.94 : 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, next ? 0.7 : 1]);

  return (
    <div ref={self} data-stack={index} className="sticky bg-navy" style={{ top }}>
      <motion.div style={{ scale, opacity }} className="origin-top">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * The Sherpa, dials, pizza and four-of-us sections stack: each sticks near
 * the top of the screen while the next slides up over it, and the one
 * underneath scales to 94% and dims slightly. Headlines travel with their
 * cards. Reduced motion: a plain column.
 */
export function StackCards({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children);
  // One ref per item (the number of items never changes).
  const [refs] = useState(() => items.map(() => createRef<HTMLDivElement>()));

  if (reduce) return <div className="flex flex-col gap-24 md:gap-40">{children}</div>;

  return (
    <div className="flex flex-col gap-24 md:gap-40">
      {items.map((child, i) => (
        <StackItem key={i} index={i} self={refs[i]} next={i < items.length - 1 ? refs[i + 1] : null}>
          {child}
        </StackItem>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* F. Member story sequence                                            */
/* ------------------------------------------------------------------ */

/** Opacity windows for story `i` of `n` over the section's progress; text windows never overlap. */
const windows = (i: number, n: number, lead = 0) => {
  const a = i / n;
  const b = (i + 1) / n;
  const f = 0.05;
  if (i === 0) return { input: [0, b - f, b], output: [1, 1, 0] };
  if (i === n - 1) return { input: [a + lead, a + f + lead, 1], output: [0, 1, 1] };
  return { input: [a + lead, a + f + lead, b - f, b], output: [0, 1, 1, 0] };
};

function StoryPhoto({ i, n, progress }: { i: number; n: number; progress: MotionValue<number> }) {
  const s = tile.stories;
  const w = windows(i, n);
  const opacity = useTransform(progress, w.input, w.output);
  const shot = { ...s.portrait, name: `Member ${i + 1}: ${s.portrait.name}`, short: `Member ${i + 1} portrait` };
  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <PhotoFill shot={shot} sizes="100vw" />
    </motion.div>
  );
}

function StoryText({ q, i, n, progress }: { q: MemberQuote; i: number; n: number; progress: MotionValue<number> }) {
  const s = tile.stories;
  const w = windows(i, n, 0.02);
  const opacity = useTransform(progress, w.input, w.output);
  const y = useTransform(opacity, [0, 1], [12, 0]);
  return (
    <motion.figure className="absolute inset-x-0 bottom-0 p-5 md:max-w-3xl md:p-10" style={{ opacity, y }}>
      <figcaption className="t-label">
        {q.name ?? s.name}, {q.age ?? s.age}
        {q.draft && <span className="ml-2 border border-terracotta px-1.5 py-0.5 text-terracotta">{s.draftLabel}</span>}
      </figcaption>
      <blockquote className="mt-3 t-body md:t-sub">
        <span aria-hidden>“</span>
        {q.quote}
        <span aria-hidden>”</span>
      </blockquote>
    </motion.figure>
  );
}

/**
 * The members section pins for about one screen per story. As the visitor
 * scrolls, the photo cross-fades to the next member, the name and age
 * change, the quote fades in, and a thin terracotta progress line along
 * the top fills. After the last story the section releases. On phones the
 * photo fills most of the screen. Reduced motion: the stories stacked.
 */
export function MemberSequence({ headline, quotes }: { headline: ReactNode; quotes: MemberQuote[] }) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const n = quotes.length;
  const [current, setCurrent] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setCurrent(Math.min(n - 1, Math.floor(v * n))));

  if (reduce) {
    return (
      <section>
        {headline}
        <div className="mt-6 space-y-6">
          {quotes.map((q, i) => (
            <MemberCard key={i} quote={q} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={wrap} aria-label={tile.stories.regionLabel} style={{ height: `${n * 100}svh` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col pt-20 pb-6 md:pt-24 md:pb-10">
        {/* The thin terracotta progress line along the top. */}
        <div aria-hidden className="h-0.5 w-full overflow-hidden rounded-full bg-offwhite/15">
          <motion.div className="h-full origin-left bg-terracotta" style={{ scaleX: scrollYProgress }} />
        </div>
        <div className="mt-5 md:mt-8">{headline}</div>
        <div className="relative mt-6 min-h-0 flex-1 overflow-hidden rounded-[28px] bg-offwhite/10 md:rounded-[32px]">
          {quotes.map((_, i) => (
            <StoryPhoto key={i} i={i} n={n} progress={scrollYProgress} />
          ))}
          {/* The soft gradient sits between the photos and the words. */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 photo-scrim" />
          {quotes.map((q, i) => (
            <StoryText key={i} q={q} i={i} n={n} progress={scrollYProgress} />
          ))}
          <p className="sr-only" aria-live="polite">{`${current + 1} / ${n}`}</p>
        </div>
      </div>
    </section>
  );
}
