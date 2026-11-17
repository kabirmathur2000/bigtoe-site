import { Section } from "@/components/motion/SectionTone";
import type { LegalBlock } from "@/content/legal";

/**
 * A legal page as plain text in the site style: light, one reading column.
 * The text is published word for word; consecutive list items form a list.
 */
export function LegalText({ blocks }: { blocks: LegalBlock[] }) {
  const groups: (LegalBlock | LegalBlock[])[] = [];
  for (const b of blocks) {
    const last = groups[groups.length - 1];
    if (b.type === "item") {
      if (Array.isArray(last)) last.push(b);
      else groups.push([b]);
    } else groups.push(b);
  }
  return (
    <Section className="pt-12 pb-24 md:pt-20 md:pb-36">
      <div className="mx-auto max-w-wide px-gutter">
        <article className="max-w-text md:ml-[8.333%]">
          {groups.map((g, i) => {
            if (Array.isArray(g)) {
              return (
                <ul key={i} className="mt-4 list-disc space-y-2 pl-5 text-body">
                  {g.map((b, j) => (
                    <li key={j}>{b.text}</li>
                  ))}
                </ul>
              );
            }
            if (g.type === "title") return <h1 key={i} className="text-h2 md:text-h1">{g.text}</h1>;
            if (g.type === "heading") return <h2 key={i} className="mt-10 text-h3">{g.text}</h2>;
            return <p key={i} className="mt-4 text-body">{g.text}</p>;
          })}
        </article>
      </div>
    </Section>
  );
}
