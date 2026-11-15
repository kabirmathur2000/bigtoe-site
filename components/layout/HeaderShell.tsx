"use client";

import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/**
 * The fixed off-white header. It slides away while the visitor scrolls down
 * and slides back slowly when they scroll up, but only while the page is
 * still light: in the navy zone it stays away, so the off-white bar never
 * sits over navy. It comes back at the top of the page and whenever a
 * keyboard user tabs into it. Reduced motion: it simply stays visible.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [state, setState] = useState({ path: pathname, hidden: false });
  const hidden = !reduce && state.path === pathname && state.hidden;

  useEffect(() => {
    if (reduce) return;
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const dy = y - last;
      last = y;
      const navy = document.documentElement.dataset.zone === "navy";
      setState((s) => {
        let next = s.path === pathname ? s.hidden : false;
        if (y < 8) next = false;
        else if (navy || dy > 2) next = true;
        else if (dy < -2) next = false;
        return next === s.hidden && s.path === pathname ? s : { path: pathname, hidden: next };
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [reduce, pathname]);

  return (
    <header
      onFocusCapture={() => setState({ path: pathname, hidden: false })}
      className={`fixed inset-x-0 top-0 z-40 border-b border-navy/10 bg-offwhite text-navy transition-transform duration-[900ms] ease-soft ${
        hidden ? "-translate-y-full" : ""
      }`}
    >
      {children}
    </header>
  );
}
