import { poem } from "@/content/home";

/**
 * The Practice Possibility poem in the footer on every page, word for
 * word, in small type at 75% opacity (passes AA on navy).
 */
export function FooterPoem({ className = "" }: { className?: string }) {
  return (
    <div className={`text-caption opacity-75 ${className}`}>
      {poem.stanzas.map((lines, i) => (
        <p key={i} className={i ? "mt-3" : ""}>
          {lines.map((l) => (
            <span key={l} className="block">{l}</span>
          ))}
        </p>
      ))}
    </div>
  );
}
