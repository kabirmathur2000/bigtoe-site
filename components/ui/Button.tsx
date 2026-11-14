import Link from "next/link";
import type { ComponentProps } from "react";
import { facts } from "@/content/facts";

type Variant = "primary" | "outline" | "outline-light";

const base =
  "inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-label uppercase tracking-[0.16em] font-bold whitespace-nowrap transition-colors duration-700 ease-soft";

const variants: Record<Variant, string> = {
  primary: "bg-terracotta text-offwhite hover:bg-[var(--terracotta-deep)]",
  outline: "border border-navy/30 text-navy hover:border-navy hover:bg-navy hover:text-offwhite",
  "outline-light":
    "border border-offwhite/40 text-offwhite hover:border-offwhite hover:bg-offwhite hover:text-navy",
};

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

/** The one call to action. Label and destination always come from facts. */
export function BookButton({ className = "", variant = "primary" }: { className?: string; variant?: Variant }) {
  return (
    <ButtonLink href={facts.bookHref} variant={variant} className={className}>
      {facts.ctaLabel}
    </ButtonLink>
  );
}
