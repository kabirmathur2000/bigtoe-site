"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/site/Icons";
import { Photo } from "@/components/site/Photo";
import { team } from "@/content/team";

const POSITIONS = ["18% 50%", "40% 50%", "60% 55%", "78% 50%", "92% 45%"];
const EASE = [0.22, 1, 0.36, 1] as const;
const frost = "bg-offwhite/85 text-navy backdrop-blur-md";
const s = team.sherpas;

type Person = (typeof s.people)[number];

/** The card's face: the photo, the name pill top left, and (open) the Sherpa's line beneath it. */
function Face({ p, i, open }: { p: Person; i: number; open: boolean }) {
  return (
    <>
      <motion.div layout className="absolute inset-0">
        <Photo shot={`${s.shot}: ${p.name}`} pos={POSITIONS[i % POSITIONS.length]} sizes={open ? "(min-width: 768px) 1024px, 92vw" : "(min-width: 1024px) 360px, 78vw"} />
      </motion.div>
      <motion.div layout="position" className="absolute top-3 left-3 flex max-w-[calc(100%-4.5rem)] flex-col items-start gap-2">
        <span className={`inline-flex items-center rounded-full px-3 py-2 ty-label ${frost}`}>{p.name}</span>
        {open && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.4 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className={`max-w-sm rounded-xl p-4 ty-sub ${frost}`}
          >
            {p.line}
          </motion.p>
        )}
      </motion.div>
    </>
  );
}

/**
 * Your Sherpas, after Oura's "Sleep and Rest" cards: five portrait photo
 * cards (4:5, 16px corners) in a row, each with the first name in a pill
 * top left and a round plus top right. The plus grows the card to fill
 * most of the screen and reveals the Sherpa's line beneath the name; ×
 * (or Escape, or a tap outside) returns it, and focus goes back to the
 * plus. Swipe on phones, arrows on desktop; manual, snap points inside the
 * row only. Reduced motion: the card appears and leaves without growing.
 */
export function SherpaCards() {
  const track = useRef<HTMLUListElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const pluses = useRef<(HTMLButtonElement | null)[]>([]);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [openAt, setOpenAt] = useState<number | null>(null);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /** Close the open card; focus returns to its plus once it has shrunk back. */
  const closeCard = useCallback(() => {
    setOpenAt((i) => {
      if (i !== null) window.setTimeout(() => pluses.current[i]?.focus({ preventScroll: true }), 600);
      return null;
    });
  }, []);

  // While a card is open: the page stays still, focus sits on ×, Escape closes.
  useEffect(() => {
    if (openAt === null) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    close.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCard();
      if (e.key === "Tab") {
        e.preventDefault();
        close.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = "";
    };
  }, [openAt, closeCard]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 transition-opacity duration-300 hover:bg-navy/5 disabled:opacity-30 disabled:hover:bg-transparent";
  const round = `flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-soft hover:scale-105 ${frost}`;
  const open = openAt === null ? null : s.people[openAt];

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.55, ease: EASE }}>
      <div className="tile-wrap mt-8 hidden justify-end gap-2 md:mt-10 md:flex">
        <button type="button" aria-label={s.previous} disabled={edges.start} onClick={() => step(-1)} className={arrow}>
          <Icon name="left" />
        </button>
        <button type="button" aria-label={s.next} disabled={edges.end} onClick={() => step(1)} className={arrow}>
          <Icon name="right" />
        </button>
      </div>
      <ul
        ref={track}
        onScroll={measure}
        className="tile-edge mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] md:mt-4 md:gap-4 [&::-webkit-scrollbar]:hidden"
      >
        {s.people.map((p, i) => (
          <li key={p.name} className="relative aspect-[4/5] w-[78%] max-w-[22rem] shrink-0 snap-start md:w-[20rem] lg:w-[22.5rem]">
            <motion.div
              layoutId={`sherpa-${p.name}`}
              style={{ borderRadius: 16 }}
              className={`absolute inset-0 overflow-hidden bg-navy ${openAt === i ? "invisible" : ""}`}
            >
              <Face p={p} i={i} open={false} />
            </motion.div>
            <button
              ref={(el) => {
                pluses.current[i] = el;
              }}
              type="button"
              aria-haspopup="dialog"
              aria-label={s.more(p.name)}
              onClick={() => setOpenAt(i)}
              className={`absolute top-3 right-3 ${round}`}
            >
              <Icon name="plus" className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open && openAt !== null && (
          <div key="overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy/60"
              onClick={closeCard}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={open.name}
              layoutId={`sherpa-${open.name}`}
              style={{ borderRadius: 16 }}
              className="relative h-[min(85svh,52rem)] w-full max-w-[64rem] overflow-hidden bg-navy"
            >
              <Face p={open} i={openAt} open />
              <motion.button
                ref={close}
                layout="position"
                type="button"
                aria-label={s.less(open.name)}
                onClick={closeCard}
                className={`absolute top-3 right-3 ${round}`}
              >
                <Icon name="close" className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
