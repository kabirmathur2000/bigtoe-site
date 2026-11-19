"use client";

import { motion, useInView, useReducedMotion, useScroll } from "motion/react";
import { useRef } from "react";
import { memberQuotes, type MemberQuote } from "@/content/quotes";
import { members } from "@/content/site";
import { Photo } from "./Photo";

const POSITIONS = ["30% 50%", "55% 50%", "80% 50%"];

/**
 * One member story: the photo fills the card (16px corners, no frame), as
 * large as the screen allows below the header. As the card passes the
 * middle of the screen its quote fades in over the photo's lower quarter
 * on a soft navy gradient, with the first name and age (and the Draft
 * badge until consent). Reduced motion: the quote is simply there.
 */
function Story({ q, i }: { q: MemberQuote; i: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  // In view once the card reaches the line across the middle of the screen.
  const passed = useInView(ref, { once: true, margin: "-50% 0px -50% 0px" });
  const shown = reduce || passed;
  return (
    <li ref={ref} className="relative h-[calc(100svh-var(--header-h)-2*var(--gutter))] min-h-120 overflow-hidden rounded-2xl bg-navy">
      {q.video ? (
        // The video slot, for later: muted, inline, looping, filling the card.
        <video src={q.video} muted playsInline loop autoPlay={!reduce} controls={!!reduce} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <Photo shot={q.shot} pos={POSITIONS[i % POSITIONS.length]} sizes="(min-width: 1760px) 1600px, 100vw" />
      )}
      <motion.figure
        initial={false}
        animate={{ opacity: shown ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 from-30% via-navy/60 via-65% to-transparent px-5 pt-24 pb-6 text-offwhite md:px-10 md:pt-32 md:pb-10"
      >
        <blockquote className="max-w-4xl ty-sub">“{q.quote}”</blockquote>
        <figcaption className="mt-4 flex flex-wrap items-center gap-2 ty-label tracking-[0.14em] uppercase md:mt-5">
          {q.name ?? members.name}, {q.age ?? members.age}
          {q.draft && <span className="rounded-full border border-offwhite/60 px-2 py-0.5">{members.draftLabel}</span>}
        </figcaption>
      </motion.figure>
    </li>
  );
}

/**
 * The member stories: the cards stacked down the page, scrolling as
 * normal. A thin terracotta bar, held just below the header while the
 * stories are on screen, shows how far through them you are (it follows
 * the scroll position, so it stays under reduced motion).
 */
export function MemberStories() {
  const list = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start center", "end center"] });
  return (
    <div ref={list} className="relative mt-10 md:mt-14">
      <div aria-hidden className="sticky top-(--header-h) z-10 -mb-0.5 h-0.5 bg-navy/10">
        <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-terracotta" />
      </div>
      <ul className="space-y-(--gutter) pt-(--gutter)">
        {memberQuotes.map((q, i) => (
          <Story key={q.quote} q={q} i={i} />
        ))}
      </ul>
    </div>
  );
}
