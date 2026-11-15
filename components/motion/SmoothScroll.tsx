"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { MAGNET } from "./scrollConfig";

type VirtualScroll = { deltaX: number; deltaY: number; event: WheelEvent | TouchEvent };

/** Soft ease in and out for the glide. */
const glideEase = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** Ease for ordinary smooth scrolling inside tall chapters. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
/** A new gesture starts after this much quiet (trackpad inertia keeps firing). */
const GESTURE_GAP = 180;

const headerHeight = () => document.querySelector("header")?.offsetHeight ?? 0;

/**
 * Resting points: each chapter's start (just below the header) and, for a
 * chapter taller than the screen, its end too; plus the very bottom (footer).
 */
function chapters() {
  const header = headerHeight();
  // Desktop: a split layout's blocks are the resting points. Phones: the chapter is.
  const desktop = window.matchMedia("(min-width: 768px)").matches;
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter], [data-rest]")).filter((el) =>
    desktop ? !el.hasAttribute("data-split") : !el.hasAttribute("data-rest"),
  );
  return els.map((el) => {
    // In the navy zone the header is hidden, so chapters there start at the very top.
    const offset = el.closest('[data-tone="navy"]') ? 0 : header;
    const visible = window.innerHeight - offset;
    const start = Math.round(el.getBoundingClientRect().top + window.scrollY - offset);
    const tall = el.offsetHeight > visible + 2;
    return { start, end: tall ? Math.round(start + el.offsetHeight - visible) : start, tall };
  });
}

function points() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const list = chapters().flatMap((c) => (c.tall ? [c.start, c.end] : [c.start]));
  return [...new Set([...list, max].map((p) => Math.max(0, Math.min(max, p))))].sort((a, b) => a - b);
}

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

/**
 * Weighted smooth scrolling (Lenis) with magnetic chapters. When the visitor
 * starts scrolling, the page glides a full screen to the next chapter in the
 * direction they began, in about one second (MAGNET in scrollConfig.ts).
 * Chapters taller than the screen scroll freely inside, stop at their edge,
 * then glide on with the next movement. Wheel, trackpad, keys and touch.
 * Off entirely under reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let gliding = false;
    // After a glide (or reaching a tall chapter's edge), ignore the rest of
    // that gesture: trackpads keep sending inertia for a second or more.
    let held = false;
    let last = 0;
    let travelled = 0;

    const glide = (lenis: Lenis, dir: number) => {
      const at = lenis.targetScroll;
      const ahead = points().filter((p) => (dir > 0 ? p > at + 2 : p < at - 2));
      const target = dir > 0 ? ahead[0] : ahead[ahead.length - 1];
      if (target === undefined) return;
      gliding = true;
      lenis.scrollTo(target, {
        duration: MAGNET.duration,
        easing: glideEase,
        lock: true,
        force: true,
        onComplete: () => {
          gliding = false;
          held = true;
          last = performance.now();
        },
      });
    };

    /** The tall chapter whose free zone the page is in, moving in `dir`. */
    const freeZone = (at: number, dir: number) =>
      chapters().find((c) => c.tall && at >= c.start - 1 && at <= c.end + 1 && (dir > 0 ? at < c.end - 1 : at > c.start + 1));

    const onVirtual = (data: VirtualScroll): boolean => {
      const lenis = lenisRef.current;
      const ev = data.event;
      if (!lenis || MAGNET.strength <= 0 || ("ctrlKey" in ev && ev.ctrlKey)) return true;
      const touch = ev.type.startsWith("touch");
      if (touch && ev.type !== "touchmove") return !gliding;
      const block = () => {
        if (ev.cancelable) ev.preventDefault();
        return false;
      };
      // Sideways gestures (the quotes swipe) are not page scrolling.
      if (Math.abs(data.deltaX) > Math.abs(data.deltaY) || data.deltaY === 0) return touch ? block() : true;
      const now = performance.now();
      const gap = now - last;
      last = now;
      if (gliding) return block();
      if (held) {
        if (gap < GESTURE_GAP) return block();
        held = false;
        travelled = 0;
      }
      if (gap >= GESTURE_GAP) travelled = 0;

      const dir = Math.sign(data.deltaY);
      const at = lenis.targetScroll;
      const zone = freeZone(at, dir);
      if (zone) {
        // Free scrolling inside a tall chapter, stopping at its edge.
        const to = Math.max(zone.start, Math.min(zone.end, at + data.deltaY));
        lenis.scrollTo(to, touch ? { immediate: true } : { duration: 0.8, easing: easeOut });
        if (to === zone.start || to === zone.end) held = true;
        return block();
      }

      travelled += Math.abs(data.deltaY);
      const needed = (1 - MAGNET.strength) * 0.4 * window.innerHeight;
      if (travelled >= needed) glide(lenis, dir);
      return block();
    };

    const onKey = (e: KeyboardEvent) => {
      const lenis = lenisRef.current;
      if (!lenis || MAGNET.strength <= 0 || e.defaultPrevented || e.altKey || e.metaKey || e.ctrlKey) return;
      if (isTyping(e.target) || (e.target as HTMLElement)?.closest?.("[data-swipe]")) return;
      const down = e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey);
      const up = e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey);
      if (!down && !up) return;
      const dir = down ? 1 : -1;
      if (freeZone(lenis.targetScroll, dir)) return; // native key scrolling inside tall chapters
      e.preventDefault();
      if (!gliding) glide(lenis, dir);
    };

    const start = () => {
      if (lenisRef.current || mq.matches) return;
      const lenis = new Lenis({
        duration: 1.2,
        easing: easeOut,
        anchors: true,
        allowNestedScroll: true,
        syncTouch: true,
        virtualScroll: (d) => onVirtual(d as VirtualScroll),
      });
      lenisRef.current = lenis;
      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
      window.addEventListener("keydown", onKey);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
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
