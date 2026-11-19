import type { ReactNode } from "react";
import type { Accented } from "@/content/site";
import { Accent } from "./Accent";
import { Rise, RiseItem } from "./Rise";

/**
 * A section's words, always together and left-aligned: the headline (its
 * key words in terracotta), the lines beneath it, then anything after
 * (`children`, each a RiseItem). The visual follows below or beside,
 * never between the lines.
 */
export function SectionText({
  headline,
  lines = [],
  children,
  className = "",
  as = "h2",
}: {
  headline: Accented;
  lines?: readonly string[];
  children?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Rise className={className}>
      <RiseItem as={as} className={`max-w-4xl ${as === "h1" ? "ty-hero" : "ty-headline"}`}>
        <Accent value={headline} />
      </RiseItem>
      {lines.map((l, i) => (
        <RiseItem key={l} as="p" className={`max-w-2xl ty-sub opacity-80 ${i === 0 ? "mt-5 md:mt-7" : "mt-3"}`}>
          {l}
        </RiseItem>
      ))}
      {children}
    </Rise>
  );
}
