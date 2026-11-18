"use client";

import { useReducedMotion } from "motion/react";
import { memberQuotes, type MemberQuote } from "@/content/quotes";
import { members } from "@/content/site";
import { Photo } from "./Photo";
import { Rise, RiseItem } from "./Rise";

/**
 * One member card, after Neko's cards but without the stacking: the cards
 * scroll normally, each fully visible. The photo keeps its own shape,
 * never cropped: about 85% of the card's width on phones with the name and
 * quote below it; beside them on desktop.
 */
function MemberCard({ q }: { q: MemberQuote }) {
  const reduce = useReducedMotion();
  return (
    <RiseItem as="li" className="mx-auto grid w-full max-w-[56rem] gap-6 rounded-2xl bg-offwhite pt-6 text-navy md:grid-cols-[2fr_3fr] md:items-center md:gap-10 md:p-6">
      <div className="mx-auto w-[85%] overflow-hidden rounded-xl bg-navy/10 md:w-full">
        {q.video ? (
          // The video slot, for later: muted, inline, looping, at its own shape.
          <video src={q.video} muted playsInline loop autoPlay={!reduce} controls={!!reduce} className="block h-auto w-full" />
        ) : (
          <Photo shot={q.shot} natural sizes="(min-width: 768px) 340px, 85vw" />
        )}
      </div>
      <div className="px-6 pb-6 md:p-0">
        <p className="flex flex-wrap items-center gap-2 text-[0.8125rem] font-bold tracking-[0.14em] uppercase">
          {q.name ?? members.name}, {q.age ?? members.age}
          {q.draft && <span className="rounded-full border border-terracotta px-2 py-0.5 text-terracotta">{members.draftLabel}</span>}
        </p>
        <blockquote className="mt-3 ty-sub">&ldquo;{q.quote}&rdquo;</blockquote>
      </div>
    </RiseItem>
  );
}

/** In our members' words: the cards one after another. Drafts until consent (scripts/check-drafts.mjs guards bigtoe.in). */
export function MemberStack() {
  return (
    <Rise as="ul" className="mt-10 space-y-6 md:mt-14 md:space-y-8" stagger={0.12}>
      {memberQuotes.map((q) => (
        <MemberCard key={q.quote} q={q} />
      ))}
    </Rise>
  );
}
