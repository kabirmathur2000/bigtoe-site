import { Accent } from "@/components/site/Accent";
import { Rise, RiseItem } from "@/components/site/Rise";
import { space } from "@/components/site/styles";
import { BookPill } from "@/components/site/VisitPanel";
import { team } from "@/content/team";
import { PortraitCards } from "./PortraitCards";

/** Team: three screens on the light page, after the page title. */

/** 1. Why we built this: Jay's story, text only, with generous space. */
export function Why() {
  const w = team.why;
  return (
    <section className="tile-wrap pt-16 pb-24 md:pt-24 md:pb-44">
      <Rise className="max-w-3xl">
        <RiseItem as="h2" className="ty-headline">
          <Accent value={w.headline} />
        </RiseItem>
        {w.story.map((l, i) => (
          <RiseItem key={l} as="p" className={`max-w-2xl ty-sub ${i === 0 ? "mt-8 md:mt-12" : "mt-5 md:mt-6"}`}>
            {l}
          </RiseItem>
        ))}
        <RiseItem as="p" className="mt-8 ty-sub opacity-80 md:mt-10">{w.signature}</RiseItem>
      </Rise>
    </section>
  );
}

/** 2. The four of us: the Decode story, then the four founders as portrait cards (PortraitCards): the plus shows age and credential. */
export function Founders() {
  const f = team.founders;
  return (
    <section className={space}>
      <Rise className="tile-wrap">
        <RiseItem as="h2" className="max-w-3xl ty-headline">
          <Accent value={f.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 max-w-2xl ty-body opacity-80 md:mt-6 md:ty-sub">{f.line}</RiseItem>
      </Rise>
      {/* Not inside a fade: a moving parent would break the open card's fixed position. */}
      <PortraitCards
        id="founder"
        items={f.people.map((p) => ({ name: p.name, label: f.age(p.age), line: p.role, shot: `${f.shot}: ${p.name}`, more: f.more(p.name), less: f.less(p.name) }))}
        labels={{ previous: f.previous, next: f.next }}
      />
    </section>
  );
}

/** 3. Your Sherpas: the line, the five cards (PortraitCards), Jeevan's standard, the button. */
export function Sherpas() {
  const s = team.sherpas;
  return (
    <section className={space}>
      <Rise className="tile-wrap">
        <RiseItem as="h2" className="max-w-3xl ty-headline">
          <Accent value={s.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 max-w-2xl ty-sub opacity-80 md:mt-6">{s.line}</RiseItem>
      </Rise>
      {/* Not inside a fade: a moving parent would break the open card's fixed position. */}
      <PortraitCards id="sherpa" items={s.people.map((p) => ({ ...p, shot: `${s.shot}: ${p.name}`, more: s.more(p.name), less: s.less(p.name) }))}
        labels={{ previous: s.previous, next: s.next }} />
      <Rise className="tile-wrap mt-12 md:mt-16">
        <RiseItem as="p" className="max-w-2xl ty-sub">{s.standard}</RiseItem>
        <RiseItem className="mt-8 md:mt-10">
          <BookPill placement="team-sherpas" />
        </RiseItem>
      </Rise>
    </section>
  );
}
