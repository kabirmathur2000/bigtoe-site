import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Buttons. The main button is terracotta with off-white text, label 19px
 * Bold so it passes AA as large text, on light and navy alike. Hovers are a
 * slow opacity change, never a darker or mixed shade.
 */
type Variant = "primary" | "outline" | "outline-light";

const base =
  "inline-flex items-center justify-center gap-3 px-4 py-3.5 md:px-6 text-[1.1875rem] leading-tight font-bold uppercase tracking-[0.04em] md:tracking-[0.08em] whitespace-nowrap transition-opacity duration-700 ease-soft hover:opacity-80";

const variants: Record<Variant, string> = {
  primary: "bg-terracotta text-offwhite",
  outline: "border border-navy/40 text-navy",
  "outline-light": "border border-offwhite/40 text-offwhite",
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
