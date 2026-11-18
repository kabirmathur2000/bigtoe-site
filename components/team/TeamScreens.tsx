import { Accent } from "@/components/site/Accent";
import { Photo } from "@/components/site/Photo";
import { Rise, RiseItem } from "@/components/site/Rise";
import { space } from "@/components/site/styles";
import { BookPill } from "@/components/site/VisitPanel";
import { team } from "@/content/team";
import { SherpaCards } from "./SherpaCards";

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

/** 2. The four of us: the story, then four founder portraits (a list with small portraits on phones). */
export function Founders() {
  const f = team.founders;
  return (
    <section className={`tile-wrap ${space}`}>
      <Rise>
        <RiseItem as="h2" className="max-w-3xl ty-headline">
          <Accent value={f.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 max-w-2xl ty-body opacity-80 md:mt-6 md:ty-sub">{f.line}</RiseItem>
      </Rise>
      <Rise as="ul" className="mt-10 grid gap-6 md:mt-14 md:grid-cols-4 md:gap-6" stagger={0.1}>
        {f.people.map((p, i) => (
          <RiseItem as="li" key={p.name} className="flex items-start gap-5 md:flex-col md:gap-0">
            <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-2xl md:w-full">
              <Photo shot={`${f.shot}: ${p.name}`} pos={["20% 50%", "45% 50%", "65% 50%", "85% 50%"][i]} sizes="(min-width: 768px) 25vw, 112px" />
            </div>
            <div className="md:mt-5">
              <p className="ty-sub">{`${p.name}, ${p.age}.`}</p>
              <p className="mt-2 ty-small opacity-80">{p.role}</p>
            </div>
          </RiseItem>
        ))}
      </Rise>
    </section>
  );
}

/** 3. Your Sherpas: the line, the five cards (SherpaCards), Jeevan's standard, the button. */
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
      <SherpaCards />
      <Rise className="tile-wrap mt-12 md:mt-16">
        <RiseItem as="p" className="max-w-2xl ty-sub">{s.standard}</RiseItem>
        <RiseItem className="mt-8 md:mt-10">
          <BookPill placement="team-sherpas" />
        </RiseItem>
      </Rise>
    </section>
  );
}
