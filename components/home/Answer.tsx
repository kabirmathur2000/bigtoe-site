import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Placeholder } from "@/components/ui/Photo";
import { Split } from "@/components/ui/Split";
import { answer } from "@/content/home";

/**
 * Chapter 4, OUR ANSWER (navy from here on). Split layout: the photo stays
 * pinned while the Strength Reserve and the three steps move past, one per
 * screen on desktop. Phones: step titles only, photo after (short screens: none).
 */
export function Answer() {
  return (
    <Split
      tone="navy"
      photo={<Placeholder ratio="" shot={answer.shot} className="aspect-[5/2] short:hidden md:aspect-[4/5] md:max-h-[72svh]" />}
      blocks={[
        <Reveal key="term" stagger={0.18}>
          <RevealItem as="h2" className="text-h1">{answer.term}</RevealItem>
          <RevealItem as="p" className="mt-2 text-h3 opacity-75 md:mt-4">{answer.definition}</RevealItem>
        </Reveal>,
        ...answer.steps.map((s) => (
          <Reveal key={s.id} stagger={0.15} className="border-t border-current/15 pt-4 md:border-0 md:pt-0">
            {"meta" in s && <RevealItem as="p" className="text-label uppercase opacity-75">{s.meta}</RevealItem>}
            <RevealItem as="h3" className="mt-1 text-h3 md:mt-3 md:text-h1">{s.title}</RevealItem>
            <RevealItem as="p" className="mt-4 hidden text-body-lg opacity-75 md:block">{s.body}</RevealItem>
          </Reveal>
        )),
      ]}
    />
  );
}
