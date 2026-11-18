"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Accent } from "@/components/site/Accent";
import { DialSplit, useIsDesktop } from "@/components/site/Dials";
import { Icon } from "@/components/site/Icons";
import { tile } from "@/content/style-tile";
import coffeeBar from "@/public/photos/studio-coffee-bar.jpg";

/**
 * The style tile's two Soma-style splits. Desktop (768px and wider) runs
 * them in step with scroll; phones, where a pinned split does not fit the
 * screen, play them as they arrive. Reduced motion: the final state.
 */

/** Know your starting point: the shared dials split (components/site/Dials.tsx) with the tile's words. */
export function StartingPointSplit() {
  const s = tile.start;
  return (
    <DialSplit>
      <h2 className="ty-headline">
        <Accent value={s.headline} />
      </h2>
      <p className="mt-5 max-w-md ty-sub opacity-80 md:mt-6">{s.line}</p>
    </DialSplit>
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
          <Image src={coffeeBar} alt="" fill sizes="(min-width: 768px) 66vw, 100vw" quality={75} className="object-cover object-[30%_50%] md:object-[35%_55%]" />
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
