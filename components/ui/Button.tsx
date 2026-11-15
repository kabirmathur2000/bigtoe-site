import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Buttons. Navy fill with off-white text on light sections; off-white fill
 * with navy text on navy sections. Terracotta is never a button colour: it
 * is the one accent per screen. Hover darkens slowly.
 */
type Variant = "primary" | "on-navy" | "outline" | "outline-light";

const base =
  "inline-flex items-center justify-center gap-3 px-7 py-4 text-label uppercase tracking-[0.16em] font-bold whitespace-nowrap transition-[color,background-color,border-color,opacity] duration-700 ease-soft";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-offwhite hover:bg-[var(--navy-deep)]",
  "on-navy": "bg-offwhite text-navy hover:bg-[var(--offwhite-deep)]",
  outline: "border border-navy/30 text-navy hover:border-navy hover:bg-navy hover:text-offwhite",
  "outline-light":
    "border border-offwhite/40 text-offwhite hover:border-offwhite hover:bg-offwhite hover:text-navy",
};

export const buttonClass = (variant: Variant = "primary", className = "") =>
  `${base} ${variants[variant]} ${className}`;

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={buttonClass(variant, className)} {...props} />;
}
