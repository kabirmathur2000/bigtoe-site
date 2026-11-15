"use client";

import { usePathname } from "next/navigation";
import { poem } from "@/content/home";

/**
 * The Practice Possibility poem in the footer, word for word, in small
 * type at 75% opacity (passes AA on navy). Home already shows the full
 * poem, so there only its last line appears.
 */
export function FooterPoem({ className = "" }: { className?: string }) {
  const home = usePathname() === "/";
  const stanzas = home ? poem.stanzas.slice(-1) : poem.stanzas;
  return (
    <div className={`text-caption opacity-75 ${className}`}>
      {stanzas.map((lines, i) => (
        <p key={i} className={i ? "mt-3" : ""}>
          {lines.map((l) => (
            <span key={l} className="block">{l}</span>
          ))}
        </p>
      ))}
    </div>
  );
}
