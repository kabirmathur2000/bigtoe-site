import { ReserveDials } from "@/components/site/Dials";
import { Photo } from "@/components/site/Photo";
import { FadeUp, Rise, RiseItem } from "@/components/site/Rise";
import { SectionText } from "@/components/site/SectionText";
import { photoCard } from "@/components/site/styles";
import { method } from "@/content/method";
import { anchors } from "@/content/site";

/** How we train (anchor `how-we-train`): sections 4 to 8. */

/** A closing line: after the lines, full strength. */
function After({ children }: { children: string }) {
  return <RiseItem as="p" className="mt-6 max-w-2xl ty-sub md:mt-8">{children}</RiseItem>;
}

/** The split: the words on the left, the visual on the right (below on phones). */
const split = "page-wrap section-space grid gap-10 md:grid-cols-12 md:items-center md:gap-12";

/** 4. Your coach. Your plan.: the three lines and the closing line, then the photo card. */
export function Coach() {
  const c = method.coach;
  return (
    <section id={anchors.method} className={split}>
      <SectionText headline={c.headline} lines={c.lines} className="md:col-span-5">
        <After>{c.after}</After>
      </SectionText>
      <FadeUp className={`aspect-[4/5] md:col-span-7 md:aspect-[5/4] ${photoCard}`}>
        <Photo shot={c.shot} pos="70% 50%" sizes="(min-width: 768px) 60vw, 100vw" />
      </FadeUp>
    </section>
  );
}

/** 5. Know your starting point.: the words together, then the Reserve Audit dials. */
export function Start() {
  const s = method.start;
  return (
    <section className={split}>
      <SectionText headline={s.headline} lines={[s.line]} className="md:col-span-5">
        <After>{s.after}</After>
      </SectionText>
      <div className="md:col-span-7">
        <ReserveDials />
      </div>
    </section>
  );
}

/** 6. Build more than appearance.: the words together, then three numbered rows (Function style). */
export function Build() {
  const b = method.build;
  return (
    <section className="page-wrap section-space">
      <SectionText headline={b.headline} lines={[b.after]} />
      <Rise as="ol" className="mt-10 grid gap-8 md:mt-14 md:grid-cols-3" stagger={0.12}>
        {b.rows.map((r, i) => (
          <RiseItem as="li" key={r.name} className="border-t border-current/20 pt-6">
            <span className="ty-label tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-6 ty-sub md:mt-10">{r.name}</h3>
            <p className="mt-1 max-w-xs ty-body opacity-80">{r.line}</p>
          </RiseItem>
        ))}
      </Rise>
    </section>
  );
}

/** 7. Train from the ground up.: the line, the Big Seven, then the photo card. */
export function Ground() {
  const g = method.ground;
  return (
    <section className={split}>
      <SectionText headline={g.headline} lines={[g.line, g.teach]} className="md:col-span-5">
        <After>{g.movements}</After>
      </SectionText>
      <FadeUp className={`aspect-[4/5] md:col-span-7 md:aspect-[5/4] ${photoCard}`}>
        <Photo shot={g.shot} pos="35% 80%" sizes="(min-width: 768px) 60vw, 100vw" />
      </FadeUp>
    </section>
  );
}

/** 8. Your goals. Our shared commitment.: the line, then the pledge photo card. */
export function Goals() {
  const g = method.goals;
  return (
    <section className="page-wrap section-space">
      <SectionText headline={g.headline} lines={[g.line]} />
      <FadeUp className={`mt-10 aspect-[4/5] md:mt-14 md:aspect-video ${photoCard}`}>
        <Photo shot={g.shot} pos="45% 50%" sizes="(min-width: 1760px) 1600px, 100vw" />
      </FadeUp>
    </section>
  );
}
