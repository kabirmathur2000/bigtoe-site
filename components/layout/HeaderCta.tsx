"use client";

import { BookButton } from "@/components/ui/BookButton";
import { useCtaHidden } from "./useCtaHidden";

/** Desktop header button; fades away while another button or the form is on screen. */
export function HeaderCta() {
  const hidden = useCtaHidden();
  return (
    <div
      aria-hidden={hidden}
      inert={hidden}
      className={`hidden transition-opacity duration-700 ease-soft md:block ${hidden ? "pointer-events-none opacity-0" : ""}`}
    >
      <BookButton />
    </div>
  );
}
