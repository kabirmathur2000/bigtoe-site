import type { Accented } from "@/content/site";

/** A headline with at most one phrase in terracotta. */
export function Accent({ value }: { value: Accented }) {
  const { text, accent } = value;
  if (!accent || !text.includes(accent)) return <>{text}</>;
  const i = text.indexOf(accent);
  return (
    <>
      {text.slice(0, i)}
      <span className="text-terracotta">{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}
