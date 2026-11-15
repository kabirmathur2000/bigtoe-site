"use client";

import { BookButton } from "@/components/ui/BookButton";
import { useCtaHidden } from "./useCtaHidden";

/**
 * Mobile only: the button fixed to the bottom of the screen. It slides away
 * while another button or the booking form is on screen, so one shows at a time.
 */
export function MobileBookBar() {
  const hidden = useCtaHidden("0px 0px -15% 0px");

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
