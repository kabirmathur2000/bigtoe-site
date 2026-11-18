"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { memberQuotes, type MemberQuote } from "@/content/quotes";
import { members } from "@/content/site";
import { Photo } from "./Photo";

const POSITIONS = ["50% 45%", "75% 55%", "25% 50%"];

/** One member card: sticks near the top so the next slides over it; a card taller than the screen sticks with its bottom in view. */
function MemberCard({ q, i }: { q: MemberQuote; i: number }) {
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
          <Photo shot={q.shot} pos={POSITIONS[i % POSITIONS.length]} sizes="(min-width: 768px) 832px, 100vw" />
        )}
      </div>
      <div className="px-2 pt-5 pb-3 md:px-3 md:pt-6">
        <p className="flex flex-wrap items-center gap-2 text-[0.8125rem] font-bold tracking-[0.14em] uppercase">
          {q.name ?? members.name}, {q.age ?? members.age}
          {q.draft && <span className="rounded-full border border-terracotta px-2 py-0.5 text-terracotta">{members.draftLabel}</span>}
        </p>
        <blockquote className="mt-3 ty-sub">&ldquo;{q.quote}&rdquo;</blockquote>
      </div>
    </li>
  );
}

/** In our members' words, after Neko's cards: each card sticks and the next slides over it. Drafts until consent (scripts/check-drafts.mjs guards bigtoe.in). */
export function MemberStack() {
  return (
    <ul className="mt-10 space-y-8 md:mt-14 md:space-y-12">
      {memberQuotes.map((q, i) => (
        <MemberCard key={q.quote} q={q} i={i} />
      ))}
    </ul>
  );
}
