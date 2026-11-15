"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookButton } from "@/components/ui/Button";

/**
 * Mobile only: the button fixed to the bottom of the screen. It slides away
 * while a booking form ([data-booking-form] inside its section) is on screen.
 */
export function MobileBookBar() {
  const pathname = usePathname();
  // Keyed by path so a stale "hidden" never carries over to another page.
  const [state, setState] = useState({ path: pathname, hidden: false });
  const hidden = state.path === pathname && state.hidden;

  useEffect(() => {
    const forms = Array.from(document.querySelectorAll<HTMLElement>("[data-booking-form]"))
      .map((m) => m.closest("section"))
      .filter((s): s is HTMLElement => !!s);
    if (!forms.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setState({ path: pathname, hidden: visible.size > 0 });
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    forms.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <div
      aria-hidden={hidden}
      inert={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-offwhite px-gutter py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-700 ease-soft md:hidden ${
        hidden ? "pointer-events-none translate-y-full opacity-0" : ""
      }`}
    >
      <BookButton className="w-full" />
    </div>
  );
}
