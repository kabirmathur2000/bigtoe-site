import { Accent } from "@/components/site/Accent";
import { FourDials } from "@/components/site/Dials";
import { Icon } from "@/components/site/Icons";
import { Photo } from "@/components/site/Photo";
import { FadeUp, Rise, RiseItem } from "@/components/site/Rise";
import { space } from "@/components/site/styles";
import { BookPill } from "@/components/site/VisitPanel";
import { method } from "@/content/method";

/** Method, "How we train": four screens on the light page, after the page title. */

/** 1. Know your starting point: the text, then the four example dials (2 x 2 on phones), then the closing line. */
export function Start() {
  const s = method.start;
  return (
    <section className="tile-wrap grid gap-10 pt-16 pb-24 md:grid-cols-12 md:gap-12 md:pt-24 md:pb-36">
      <Rise className="md:col-span-5">
        <RiseItem as="h2" className="ty-headline">
          <Accent value={s.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 max-w-md ty-sub opacity-80 md:mt-6">{s.line}</RiseItem>
      </Rise>
      <div className="md:col-span-7">
        <FadeUp>
          <FourDials />
        </FadeUp>
        <FadeUp as="p" className="mt-8 max-w-lg ty-sub">{s.after}</FadeUp>
      </div>
    </section>
  );
}

/** 2. Build more than appearance: three icon-and-text blocks (stacked on phones), then one line. */
export function Build() {
  const b = method.build;
  return (
    <section className={`tile-wrap ${space}`}>
      <FadeUp>
        <h2 className="max-w-3xl ty-headline">
          <Accent value={b.headline} />
        </h2>
      </FadeUp>
      <Rise as="ul" className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6" stagger={0.12}>
        {b.blocks.map((x) => (
          <RiseItem as="li" key={x.name} className="flex gap-5 rounded-2xl border border-navy/15 p-6 md:flex-col md:gap-10 md:p-8">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy/[0.07]">
              <Icon name={x.icon} className="h-7 w-7" />
            </span>
            <span>
              <span className="block ty-sub">{x.name}</span>
              <span className="mt-1 block ty-body opacity-80">{x.line}</span>
            </span>
          </RiseItem>
        ))}
      </Rise>
      <FadeUp as="p" className="mt-10 max-w-xl ty-sub md:mt-14">{b.after}</FadeUp>
    </section>
  );
}

/** 3. Train from the ground up: the text beside the photo (bare feet on the floor), then the Big Seven as clean type. */
export function Ground() {
  const g = method.ground;
  return (
    <section className={`tile-wrap ${space}`}>
      <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-12">
        <Rise className="md:col-span-5 md:pb-4">
          <RiseItem as="h2" className="ty-headline">
            <Accent value={g.headline} />
          </RiseItem>
          <RiseItem as="p" className="mt-5 max-w-md ty-sub opacity-80 md:mt-6">{g.line}</RiseItem>
        </Rise>
        <FadeUp className="relative aspect-[4/5] overflow-hidden rounded-2xl md:col-span-7 md:aspect-[5/4]">
          <Photo shot={g.shot} pos="70% 85%" sizes="(min-width: 768px) 60vw, 100vw" />
        </FadeUp>
      </div>
      <Rise as="ul" className="mt-14 flex flex-wrap gap-x-[0.4em] gap-y-1 ty-headline md:mt-20" stagger={0.07}>
        {g.movements.map((m) => (
          <RiseItem as="li" key={m}>{m}</RiseItem>
        ))}
      </Rise>
    </section>
  );
}

/** 4. Your goals: the text and button beside the pledge photo; on phones the photo sits between them. */
export function Goals() {
  const g = method.goals;
  return (
    <section className={`tile-wrap grid gap-10 md:grid-cols-12 md:gap-x-12 md:gap-y-8 ${space}`}>
      <Rise className="md:col-span-5 md:row-start-1 md:self-end">
        <RiseItem as="h2" className="ty-headline">
          <Accent value={g.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 max-w-md ty-sub opacity-80 md:mt-6">{g.line}</RiseItem>
      </Rise>
      <FadeUp className="relative aspect-[4/5] overflow-hidden rounded-2xl md:col-span-7 md:col-start-6 md:aspect-[5/4] md:row-span-2 md:row-start-1">
        <Photo shot={g.shot} pos="35% 50%" sizes="(min-width: 768px) 60vw, 100vw" />
      </FadeUp>
      <FadeUp className="md:col-span-5 md:row-start-2">
        <BookPill placement="method-goals" />
      </FadeUp>
    </section>
  );
}
