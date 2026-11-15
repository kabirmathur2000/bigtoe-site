"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { GLIDE } from "./scrollConfig";

type VirtualScroll = { deltaX: number; deltaY: number; event: WheelEvent | TouchEvent };

/** Soft ease in and out for the glide. */
const glideEase = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** Ease for ordinary smooth scrolling inside tall chapters. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
/** A new gesture starts after this much quiet (trackpad inertia keeps firing). */
const GESTURE_GAP = 180;

const headerHeight = () => document.querySelector("header")?.offsetHeight ?? 0;

/**
 * Screens: each chapter's start (just below the header). A chapter taller
 * than the screen also has its end as a stop; only `data-free` chapters
 * (the form, Questions) scroll freely between the two.
 */
function chapters() {
  const header = headerHeight();
  // Desktop: a split layout's blocks are the stops. Phones: the chapter is.
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
    return { start, end: tall ? Math.round(start + el.offsetHeight - visible) : start, tall, free: tall && el.hasAttribute("data-free") };
  });
}

function points() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const list = chapters().flatMap((c) => (c.tall ? [c.start, c.end] : [c.start]));
  return [...new Set([...list, max].map((p) => Math.max(0, Math.min(max, p))))].sort((a, b) => a - b);
}

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
const isControl = (t: EventTarget | null) => t instanceof HTMLElement && !!t.closest("button, a, summary, [role='button']");
/** The founders' note overlay is open: it scrolls natively and the page stays still. */
const overlayOpen = () => document.documentElement.hasAttribute("data-overlay");

/**
 * Guided scrolling (Lenis): one gesture, one screen. The first wheel tick,
 * swipe, or arrow or page key starts the glide to the next screen, up or
 * down, in about one second (GLIDE in scrollConfig.ts). Until the glide has
 * settled and the gesture has ended, every further input is ignored,
 * trackpad momentum included, so one swipe never skips two screens. Only
 * the form and Questions, where taller than the screen, scroll freely
 * inside, stop at their edge, then glide on with the next gesture.
 * Off entirely under reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let gliding = false;
    // The current wheel gesture is used up (a glide ran, or a free chapter's
    // edge was reached): ignore it, momentum included, until it goes quiet.
    let held = false;
    let last = 0;
    // The current touch has been used; the next touch is a new gesture.
    let touchSpent = false;

    const glide = (lenis: Lenis, dir: number) => {
      const at = lenis.targetScroll;
      const ahead = points().filter((p) => (dir > 0 ? p > at + 2 : p < at - 2));
      const target = dir > 0 ? ahead[0] : ahead[ahead.length - 1];
      if (target === undefined) return;
      gliding = true;
      lenis.scrollTo(target, {
        duration: GLIDE.duration,
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

    /** The free chapter whose inside the page is in, moving in `dir`. */
    const freeZone = (at: number, dir: number) =>
      chapters().find((c) => c.free && at >= c.start - 1 && at <= c.end + 1 && (dir > 0 ? at < c.end - 1 : at > c.start + 1));

    const onVirtual = (data: VirtualScroll): boolean => {
      const lenis = lenisRef.current;
      const ev = data.event;
      if (!lenis || overlayOpen()) return false; // native scrolling (the overlay)
      if ("ctrlKey" in ev && ev.ctrlKey) return true; // pinch zoom
      const touch = ev.type.startsWith("touch");
      if (touch && ev.type !== "touchmove") {
        // A touch that starts mid-glide is used up too.
        if (ev.type === "touchstart") touchSpent = gliding;
        return false; // no touch inertia: each swipe is one gesture
      }
      const block = () => {
        if (ev.cancelable) ev.preventDefault();
        return false;
      };
      // Sideways gestures (the quotes swipe) are not page scrolling.
      if (Math.abs(data.deltaX) > Math.abs(data.deltaY) || data.deltaY === 0) return block();

      const now = performance.now();
      const gap = now - last;
      if (!touch) last = now;
      if (gliding) return block();
      if (touch) {
        if (touchSpent) return block();
      } else if (held) {
        if (gap < GESTURE_GAP) return block();
        held = false;
      }

      const dir = Math.sign(data.deltaY);
      const at = lenis.targetScroll;
      const zone = freeZone(at, dir);
      if (zone) {
        // Free scrolling inside the form or Questions, stopping at the edge.
        const to = Math.max(zone.start, Math.min(zone.end, at + data.deltaY));
        lenis.scrollTo(to, touch ? { immediate: true } : { duration: 0.8, easing: easeOut });
        if (to === zone.start || to === zone.end) {
          if (touch) touchSpent = true;
          else held = true;
        }
        return block();
      }

      if (touch) touchSpent = true;
      glide(lenis, dir);
      return block();
    };

    const onKey = (e: KeyboardEvent) => {
      const lenis = lenisRef.current;
      if (!lenis || overlayOpen() || e.defaultPrevented || e.altKey || e.metaKey || e.ctrlKey) return;
      if (isTyping(e.target) || (e.target as HTMLElement)?.closest?.("[data-swipe]")) return;
      const space = e.key === " ";
      if (space && isControl(e.target)) return; // Space presses the focused button
      const down = e.key === "ArrowDown" || e.key === "PageDown" || (space && !e.shiftKey);
      const up = e.key === "ArrowUp" || e.key === "PageUp" || (space && e.shiftKey);
      if (!down && !up) return;
      e.preventDefault();
      // Holding a key is one gesture: repeats never glide on.
      if (gliding || e.repeat) return;
      const dir = down ? 1 : -1;
      const at = lenis.targetScroll;
      const zone = freeZone(at, dir);
      if (zone) {
        const step = e.key.startsWith("Arrow") ? 120 : window.innerHeight * 0.85;
        lenis.scrollTo(Math.max(zone.start, Math.min(zone.end, at + dir * step)), { duration: 0.6, easing: easeOut });
        return;
      }
      glide(lenis, dir);
    };

    const start = () => {
      if (lenisRef.current || mq.matches) return;
      const lenis = new Lenis({
        duration: 1.2,
        easing: easeOut,
        anchors: true,
        // One listener on the whole window for wheel and touch; no element
        // (pinned photos, the word cloud, the quotes) handles scrolling itself.
        wrapper: window,
        eventsTarget: window,
        allowNestedScroll: false,
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
