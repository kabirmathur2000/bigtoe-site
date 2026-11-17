"use client";

import { useBooking } from "@/components/booking/BookingPanel";
import { facts } from "@/content/facts";
import { buttonClass } from "./Button";

/**
 * The one call to action, "Book your first hour", on every page. It opens
 * the booking panel; the panel records the tap (with where the button sits
 * and on which page) as a Vercel Analytics event.
 */
export function BookButton({ placement, className = "" }: { placement: string; className?: string }) {
  const { open } = useBooking();
  return (
    <button type="button" aria-haspopup="dialog" className={buttonClass("primary", className)} onClick={() => open(placement)}>
      {facts.ctaLabel}
    </button>
  );
}
