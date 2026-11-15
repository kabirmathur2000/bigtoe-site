"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { GLIDE } from "./scrollConfig";

type VirtualScroll = { deltaX: number; deltaY: number; event: WheelEvent | TouchEvent };

/** A stop on the page. `free` marks the two ends of a chapter that scrolls freely inside (Questions). */
type Stop = { y: number; free?: { start: number; end: number } };

/** Soft ease in and out for the glide. */
const glideEase = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** Ease for free scrolling inside Questions. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
/** A wheel burst after this much quiet (ms) is a new gesture; trackpad momentum never pauses this long. */
const GESTURE_GAP = 150;
/** A swipe this long (px) is a gesture. */
const SWIPE = 30;

const headerHeight = () => document.querySelector("header")?.offsetHeight ?? 0;

/**
 * Every stop on the page, top to bottom: the top of each chapter and, on
 * desktop, each step of a split layout (instead of the split's own top).
 * A `data-free` chapter taller than the screen (Questions) adds its end as
 * a stop and scrolls freely between the two. Any other chapter taller than
 * the screen also gets an end stop, so nothing is ever out of reach. Then
 * the very bottom (the footer).
 */
function buildStops(): Stop[] {
  const header = headerHeight();
  const desktop = window.matchMedia("(min-width: 768px)").matches;
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const clamp = (y: number) => Math.max(0, Math.min(max, Math.round(y)));
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter], [data-rest]")).filter((el) =>
    desktop ? !el.hasAttribute("data-split") : !el.hasAttribute("data-rest"),
  );
  const list: Stop[] = [];
  for (const el of els) {
    // In the navy zone the header is hidden, so chapters there start at the very top.
    const offset = el.closest('[data-tone="navy"]') ? 0 : header;
    const visible = window.innerHeight - offset;
    const start = clamp(el.getBoundingClientRect().top + window.scrollY - offset);
    const tall = el.offsetHeight > visible + 2;
    if (!tall) {
      list.push({ y: start });
      continue;
    }
    const end = clamp(start + el.offsetHeight - visible);
    const free = el.hasAttribute("data-free") ? { start, end } : undefined;
    list.push({ y: start, free }, { y: end, free });
  }
  list.push({ y: max });
  list.sort((a, b) => a.y - b.y);
  // One stop per position (a free chapter's marks win over a plain stop).
  return list.filter((s, i) => !(list[i + 1] && Math.abs(list[i + 1].y - s.y) <= 2 && (list[i + 1].free || !s.free)));
}

const nearest = (stops: Stop[], y: number) =>
  stops.reduce((best, s, i) => (Math.abs(s.y - y) < Math.abs(stops[best].y - y) ? i : best), 0);

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
const isControl = (t: EventTarget | null) => t instanceof HTMLElement && !!t.closest("button, a, summary, [role='button']");
/** The founders' note overlay is open: it scrolls natively and the page stays still. */
const overlayOpen = () => document.documentElement.hasAttribute("data-overlay");

/**
 * Guided scrolling on fixed stops (Lenis). The page keeps a list of stops
 * and the index of the current one. Each new gesture (a wheel burst, a swipe
 * of about 30px, an arrow, page or space key) moves exactly one stop forward
 * or back from that index, never by how far the visitor scrolled, gliding
 * about 0.8 seconds with a soft ease (GLIDE in scrollConfig.ts). Up behaves
 * exactly like down. Input is ignored until the glide settles and the
 * gesture has gone quiet, trackpad momentum included. Only Questions, where
 * taller than the screen, scrolls freely inside before the next stop.
 * The stops are rebuilt on resize. Off entirely under reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const syncRef = useRef<() => void>(() => {});

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let stops: Stop[] = [];
    let index = 0;
    let gliding = false;
    // The current wheel burst is used up: ignore it until it goes quiet.
    let held = false;
    let last = 0;
    // The current touch: distance so far, and whether it has been used.
    let swipe = 0;
    let touchSpent = false;

    /** Rebuild the stops. If the page is not resting on the current stop (a link, the scrollbar, a new page), take the nearest. */
    const refresh = (lenis: Lenis) => {
      stops = buildStops();
      const at = lenis.targetScroll;
      const inFree = stops.some((s) => s.free && at > s.free.start + 1 && at < s.free.end - 1);
      if (!inFree && (!stops[index] || Math.abs(stops[index].y - at) > 4)) index = nearest(stops, at);
    };

    const glideTo = (lenis: Lenis, i: number) => {
      if (i < 0 || i >= stops.length || i === index) return;
      index = i;
      gliding = true;
      lenis.scrollTo(stops[i].y, {
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

    /**
     * Inside Questions (taller than the screen), moving in `dir` and not
     * yet at its edge: returns its ends, else null.
     */
    const freeZone = (at: number, dir: number) => {
      const s = stops.find((s) => s.free && at >= s.free.start - 1 && at <= s.free.end + 1);
      if (!s?.free) return null;
      const { start, end } = s.free;
      return (dir > 0 ? at < end - 1 : at > start + 1) ? s.free : null;
    };

    /** Free scrolling inside Questions; at its edge the index lands on that edge's stop. Returns true at the edge. */
    const freeScroll = (lenis: Lenis, zone: { start: number; end: number }, to: number, immediate: boolean) => {
      const y = Math.max(zone.start, Math.min(zone.end, to));
      lenis.scrollTo(y, immediate ? { immediate: true, force: true } : { duration: 0.6, easing: easeOut, force: true });
      if (y === zone.start || y === zone.end) {
        index = nearest(stops, y);
        return true;
      }
      return false;
    };

    /** One gesture in `dir`: free scroll inside Questions, or one stop on. Returns true if the gesture is used up. */
    const gesture = (lenis: Lenis, dir: number, delta: number, immediate: boolean) => {
      refresh(lenis);
      const zone = freeZone(lenis.targetScroll, dir);
      if (zone) return freeScroll(lenis, zone, lenis.targetScroll + delta, immediate);
      glideTo(lenis, index + dir);
      return true;
    };

    const onVirtual = (data: VirtualScroll): boolean => {
      const lenis = lenisRef.current;
      const ev = data.event;
      if (!lenis || overlayOpen()) return false; // native scrolling (the overlay)
      if ("ctrlKey" in ev && ev.ctrlKey) return true; // pinch zoom
      const block = () => {
        if (ev.cancelable) ev.preventDefault();
        return false;
      };

      if (ev.type.startsWith("touch")) {
        if (ev.type === "touchstart") {
          swipe = 0;
          // A touch that starts mid-glide is used up too.
          touchSpent = gliding;
        }
        if (ev.type !== "touchmove") return false; // no touch inertia: each swipe is one gesture
        if (gliding || touchSpent) return block();
        swipe += data.deltaY;
        const dir = Math.sign(swipe);
        // Inside Questions the finger moves the page directly.
        const zone = freeZone(lenis.targetScroll, dir);
        if (zone) {
          if (freeScroll(lenis, zone, lenis.targetScroll + data.deltaY, true)) touchSpent = true;
          return block();
        }
        // Sideways swipes (the quotes) are not page scrolling.
        if (Math.abs(swipe) >= SWIPE && Math.abs(data.deltaY) >= Math.abs(data.deltaX)) {
          touchSpent = true;
          gesture(lenis, dir, 0, true);
        }
        return block();
      }

      // Wheel and trackpad.
      if (Math.abs(data.deltaX) > Math.abs(data.deltaY) || data.deltaY === 0) return block();
      const now = performance.now();
      const gap = now - last;
      last = now;
      if (gliding) return block();
      if (held) {
        if (gap < GESTURE_GAP) return block(); // the same burst, or its momentum
        held = false;
      }
      if (gesture(lenis, Math.sign(data.deltaY), data.deltaY, false)) held = true;
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
      const ends = e.key === "Home" || e.key === "End";
      if (!down && !up && !ends) return;
      e.preventDefault();
      // Holding a key is one gesture: repeats never move on.
      if (gliding || e.repeat) return;
      if (ends) {
        refresh(lenis);
        glideTo(lenis, e.key === "Home" ? 0 : stops.length - 1);
        return;
      }
      const dir = down ? 1 : -1;
      const step = e.key.startsWith("Arrow") ? 120 : window.innerHeight * 0.85;
      gesture(lenis, dir, dir * step, false);
    };

    /** Keep the current stop in place when the window changes size. */
    const onResize = () => {
      const lenis = lenisRef.current;
      if (!lenis || gliding) return;
      const was = index;
      stops = buildStops();
      index = Math.min(was, stops.length - 1);
      const at = lenis.targetScroll;
      const inFree = stops.some((s) => s.free && at > s.free.start + 1 && at < s.free.end - 1);
      if (!inFree && stops[index]) lenis.scrollTo(stops[index].y, { immediate: true, force: true });
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
      stops = buildStops();
      index = nearest(stops, window.scrollY);
      syncRef.current = () => {
        lenis.resize();
        stops = buildStops();
        index = nearest(stops, window.scrollY);
      };
      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
      window.addEventListener("keydown", onKey);
      window.addEventListener("resize", onResize);
      // For checking the stops in development only.
      if (process.env.NODE_ENV !== "production") {
        (window as unknown as { __stops?: () => { stops: number[]; index: number } }).__stops = () => ({
          stops: (stops = buildStops()).map((s) => s.y),
          index,
        });
      }
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
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

  // New page: Lenis forgets the old page's height and position; the stops are rebuilt.
  useEffect(() => {
    syncRef.current();
  }, [pathname]);

  return null;
}
