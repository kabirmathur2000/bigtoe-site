"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { facts } from "@/content/facts";
import { buttonClass } from "./Button";

/**
 * The one call to action. Label and destination always come from facts.
 * On the Book page itself it scrolls to the form (#waitlist) instead of
 * reloading the page.
 */
export function BookButton({ className = "", variant = "primary" }: { className?: string; variant?: "primary" | "on-navy" }) {
  const onBookPage = usePathname() === facts.bookHref;
  const cls = buttonClass(variant, className);
  if (onBookPage) {
    return <a href="#waitlist" className={cls}>{facts.ctaLabel}</a>;
  }
  return <Link href={facts.bookHref} className={cls}>{facts.ctaLabel}</Link>;
}
