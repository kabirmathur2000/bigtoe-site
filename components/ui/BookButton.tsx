"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { facts } from "@/content/facts";
import { buttonClass } from "./Button";

/**
 * The one call to action. Label and destination always come from facts.
 * On the Book page itself it scrolls to the form (#waitlist) instead of
 * reloading the page. Every tap is a Vercel Analytics event, with where
 * the button sits and on which page.
 */
export function BookButton({
  placement,
  className = "",
  variant = "primary",
}: {
  /** Where the button sits, for analytics: "header", "hero", "mobile-bar"… */
  placement: string;
  className?: string;
  variant?: "primary" | "on-navy";
}) {
  const page = usePathname();
  const onBookPage = page === facts.bookHref;
  const cls = buttonClass(variant, className);
  const onClick = () => track("Booking button", { placement, page, mode: facts.ctaMode });
  if (onBookPage) {
    return <a href="#waitlist" className={cls} onClick={onClick}>{facts.ctaLabel}</a>;
  }
  return <Link href={facts.bookHref} className={cls} onClick={onClick}>{facts.ctaLabel}</Link>;
}
