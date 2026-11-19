import { CardRow } from "@/components/site/CardRow";
import { Photo } from "@/components/site/Photo";
import { FadeUp, RiseItem } from "@/components/site/Rise";
import { SectionText } from "@/components/site/SectionText";
import { photoCard } from "@/components/site/styles";
import { anchors } from "@/content/site";
import { team } from "@/content/team";

/** The team (anchor `the-team`): sections 9 to 11. */

/** 9. The four of us.: the Decode story, one group photo, then the row of four founders (name, age, credential beneath each). */
export function Founders() {
  const f = team.founders;
  return (
    <section id={anchors.team} className="section-space">
      <div className="page-wrap">
        <SectionText headline={f.headline} lines={[f.line]} />
        <FadeUp className={`mt-10 aspect-[4/3] md:mt-14 md:aspect-video ${photoCard}`}>
          <Photo shot={f.groupShot} pos="50% 50%" sizes="(min-width: 1760px) 1600px, 100vw" />
        </FadeUp>
      </div>
      <div className="mt-10 md:mt-14">
        <CardRow
          label={f.rowLabel}
          previous={f.previous}
          next={f.next}
          items={f.people.map((p) => ({ title: f.title(p.name, p.age), text: p.role, shot: `${f.shot}: ${p.name}` }))}
        />
      </div>
    </section>
  );
}

/** 10. Your Sherpas.: the line, the row of five (name and first-person line beneath each), then the standard. */
export function Sherpas() {
  const s = team.sherpas;
  return (
    <section className="section-space">
      <SectionText headline={s.headline} lines={[s.line]} className="page-wrap" />
      <div className="mt-10 md:mt-14">
        <CardRow
          label={s.rowLabel}
          previous={s.previous}
          next={s.next}
          items={s.people.map((p) => ({ title: p.name, text: p.line, shot: `${s.shot}: ${p.name}` }))}
        />
      </div>
      <FadeUp as="p" className="page-wrap mt-10 max-w-none ty-sub md:mt-14">{s.standard}</FadeUp>
    </section>
  );
}

/** 11. Why we built this.: Jay's three lines, signed. Text only. */
export function Story() {
  const w = team.why;
  return (
    <section className="page-wrap section-space">
      <SectionText headline={w.headline} lines={w.story}>
        <RiseItem as="p" className="mt-6 ty-sub md:mt-8">{w.signature}</RiseItem>
      </SectionText>
    </section>
  );
}
