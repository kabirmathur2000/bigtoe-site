import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * The pill buttons inside the request panel (submit, the intake form),
 * matching BookPill: terracotta, navy text in sentence case, Bold 19px.
 */
const base =
  "inline-flex items-center justify-center rounded-full bg-terracotta px-7 py-3.5 text-[clamp(19px,calc(19px+5*var(--fl)),24px)] leading-tight font-bold whitespace-nowrap text-navy transition-transform duration-500 ease-soft hover:-translate-y-0.5";

type ButtonLinkProps = ComponentProps<typeof Link>;

export function ButtonLink({ className = "", ...props }: ButtonLinkProps) {
  return <Link className={`${base} ${className}`} {...props} />;
}

export function Button({ className = "", ...props }: ComponentProps<"button">) {
  return <button className={`${base} ${className}`} {...props} />;
}
