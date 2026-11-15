"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** How close (share of the screen) a chapter start must be before scrolling settles on it. */
const THRESHOLD = 0.28;
/** Quiet time after the last wheel or key movement before settling. */
const SETTLE_DELAY = 180;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Snap points for the chapters on the page: the start of each, just below
 * the fixed header, and for a chapter taller than the screen, its end too,
 * so it can be read to the bottom without being pulled onward.
 */
function snapPoints() {
  const header = document.querySelector("header")?.offsetHeight ?? 0;
  const vh = window.innerHeight;
  const points: number[] = [];
  document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((el) => {
    const top = el.getBoundingClientRect().top + window.scrollY - header;
    points.push(Math.round(top));
    if (el.offsetHeight > vh - header + 2) points.push(Math.round(top + header + el.offsetHeight - vh));
  });
  return points.sort((a, b) => a - b);
}

/**
 * Weighted smooth scrolling (Lenis) with gentle guided scrolling between
 * chapters. When the visitor pauses near the start of the chapter they are
 * heading into, the page glides the rest of the way and settles softly.
 * Proximity only, in the direction of travel: a small scroll stays a small
 * scroll, nothing is pulled back, and the middle of a tall chapter scrolls
 * freely. Touch screens use the browser's own proximity snap (globals.css).
 * Off entirely under reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let timer = 0;
    let gliding = false;

    const settle = () => {
      const lenis = lenisRef.current;
      if (!lenis || gliding) return;
      const at = lenis.targetScroll;
      const dir = lenis.direction;
      if (!dir) return;
      const reach = window.innerHeight * THRESHOLD;
      const ahead = snapPoints().filter((p) => (dir > 0 ? p > at + 1 : p < at - 1));
      const next = dir > 0 ? ahead[0] : ahead[ahead.length - 1];
      if (next === undefined || Math.abs(next - at) > reach) return;
      gliding = true;
      lenis.scrollTo(next, {
        duration: 0.9,
        easing: easeOut,
        userData: { initiator: "snap" },
        onComplete: () => (gliding = false),
      });
      window.setTimeout(() => (gliding = false), 1100);
    };

    const onVirtual = (e: { event: Event }) => {
      if (e.event.type.startsWith("touch")) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, SETTLE_DELAY);
    };

    const start = () => {
      if (lenisRef.current || mq.matches) return;
      const lenis = new Lenis({ duration: 1.2, easing: easeOut, anchors: true, allowNestedScroll: true });
      lenis.on("virtual-scroll", onVirtual);
      lenisRef.current = lenis;
      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
    const onChange = () => (mq.matches ? stop() : start());

    start();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  // New page: Lenis must forget the old page's height and position.
  useEffect(() => {
    lenisRef.current?.resize();
  }, [pathname]);

  return null;
}
