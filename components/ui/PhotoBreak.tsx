import { Section } from "@/components/motion/SectionTone";
import { Placeholder } from "@/components/ui/Photo";

/**
 * A full-bleed photograph screen between the light and navy halves of a
 * page (10 Squared: each screen its own setting). It is the first navy
 * section, so the page's one colour fade happens across it. Until the
 * shoot, a placeholder named for the shot; the caption sits clear of the
 * mobile bottom bar.
 */
export function PhotoBreak({ shot }: { shot: string }) {
  return (
    <Section chapter tone="navy" photoBreak className="p-0">
      <Placeholder ratio="" shot={shot} className="h-svh pb-[calc(var(--bar-h)+1rem)] md:p-6" />
    </Section>
  );
}
