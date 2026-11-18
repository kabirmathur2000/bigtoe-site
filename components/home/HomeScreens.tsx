import Link from "next/link";
import { Accent } from "@/components/site/Accent";
import { Faq } from "@/components/site/Faq";
import { MemberStack } from "@/components/site/Members";
import { Photo } from "@/components/site/Photo";
import { FadeUp, Rise, RiseItem } from "@/components/site/Rise";
import { softPill, space } from "@/components/site/styles";
import { BookPill } from "@/components/site/VisitPanel";
import { faq, homeQuestions } from "@/content/faq";
import { home } from "@/content/home";

/**
 * Home, built from the approved style tile: a light page, Light
 * headlines, 16px cards, quiet fade-ins; navy from "Your coach. Your
 * plan." to the footer (NavyZone in the page).
 */

/** 1. Hero, after Function's "Check your health.": a full-screen photo, a navy gradient rising behind the words. */
export function Hero() {
  const h = home.hero;
  const shadow = "[text-shadow:0_1px_20px_rgb(10_33_45_/_0.35)]";
  return (
    <section className="relative h-svh min-h-[36rem] overflow-hidden bg-navy">
      {/* Phones: the frame runs 40% above the screen, so the logo wall sits higher, clear of the words. */}
      <div className="absolute inset-x-0 -top-[40%] bottom-0 md:top-0">
        <Photo shot={h.shot} posClass="object-[16%_50%] md:object-[50%_55%]" sizes="100vw" preload />
      </div>
      {/* Deepest behind the text block, clear at the top. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-navy from-25% via-navy/75 via-60% to-transparent md:h-[70%] md:from-15%" />
      <Rise className={`tile-wrap absolute inset-x-0 bottom-0 pb-[max(2.5rem,calc(env(safe-area-inset-bottom)+1.5rem))] text-offwhite md:pb-16 ${shadow}`} stagger={0.1}>
        <RiseItem>
          <span className="inline-flex items-center rounded-full border border-offwhite/25 bg-offwhite/15 px-3.5 py-2 ty-label backdrop-blur-md">{h.place}</span>
        </RiseItem>
        <RiseItem as="h1" className="mt-6 max-w-5xl ty-hero">
          <Accent value={h.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 max-w-xl ty-sub md:mt-8">{h.line}</RiseItem>
        <RiseItem className="mt-8 md:mt-10">
          <BookPill placement="home-hero" />
        </RiseItem>
      </Rise>
    </section>
  );
}

/** 2. Text only, centred, after Oura's "Understand your body.": the headline, two lines, one soft pill link. */
export function Why() {
  const w = home.why;
  return (
    <section className={`tile-wrap text-center ${space} md:py-44`}>
      <Rise>
        <RiseItem as="h2" className="mx-auto max-w-3xl ty-headline">
          <Accent value={w.headline} />
        </RiseItem>
        {w.lines.map((l, i) => (
          <RiseItem key={l} as="p" className={`mx-auto max-w-xl ty-sub opacity-80 ${i === 0 ? "mt-5 md:mt-6" : "mt-3"}`}>
            {l}
          </RiseItem>
        ))}
        <RiseItem className="mt-8 md:mt-10">
          <Link href={w.link.href} className={softPill}>{w.link.label}</Link>
        </RiseItem>
      </Rise>
    </section>
  );
}

/** 3. The split: the text on the left, one photo card on the right (below on phones). The navy switch begins here. */
export function Coach() {
  const c = home.coach;
  return (
    <section className={`tile-wrap grid gap-10 md:grid-cols-12 md:items-center md:gap-12 ${space}`}>
      <Rise className="md:col-span-5">
        <RiseItem as="h2" className="ty-headline">
          <Accent value={c.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 max-w-md ty-sub opacity-80 md:mt-6">{c.line}</RiseItem>
        <RiseItem className="mt-8">
          <Link href={c.link.href} className={softPill}>{c.link.label}</Link>
        </RiseItem>
      </Rise>
      <FadeUp className="relative aspect-[4/5] overflow-hidden rounded-2xl md:col-span-7 md:aspect-[5/4]">
        <Photo shot={c.shot} pos="70% 50%" sizes="(min-width: 768px) 60vw, 100vw" />
      </FadeUp>
    </section>
  );
}

/** 4. In our members' words, after Neko's cards. */
export function Members() {
  return (
    <section className={`tile-wrap ${space}`}>
      <FadeUp>
        <h2 className="max-w-2xl ty-headline">
          <Accent value={home.members.headline} />
        </h2>
      </FadeUp>
      <MemberStack />
    </section>
  );
}

/** 5. The headline and line, then one photo card (members at the social table). */
export function Pizza() {
  const p = home.pizza;
  return (
    <section className={`tile-wrap ${space}`}>
      <Rise>
        <RiseItem as="h2" className="max-w-3xl ty-headline">
          <Accent value={p.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 max-w-xl ty-sub opacity-80 md:mt-6">{p.line}</RiseItem>
      </Rise>
      <FadeUp className="relative mt-10 aspect-[4/5] overflow-hidden rounded-2xl md:mt-14 md:aspect-video">
        <Photo shot={p.shot} pos="60% 60%" sizes="(min-width: 1280px) 1152px, 100vw" />
      </FadeUp>
    </section>
  );
}

/** 6. Your first hour, after Function's "Testing is easy": three numbered steps, titles only. */
export function FirstHour() {
  const f = home.firstHour;
  return (
    <section className={`tile-wrap ${space}`}>
      <FadeUp>
        <h2 className="max-w-2xl ty-headline">
          <Accent value={f.headline} />
        </h2>
      </FadeUp>
      <Rise as="ol" className="mt-10 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-8" stagger={0.12}>
        {f.steps.map((title, i) => (
          <RiseItem as="li" key={title} className="border-t border-current/20 pt-6">
            <span className="ty-label tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-6 max-w-xs ty-sub md:mt-10">{title}</h3>
          </RiseItem>
        ))}
      </Rise>
    </section>
  );
}

/** 7. The ending: the invitation, the price, the free hour, the guarantee, the button. Centred. */
export function Ending() {
  const e = home.ending;
  return (
    <section className={`tile-wrap ${space} md:py-44`}>
      <Rise className="text-center">
        <RiseItem as="h2" className="mx-auto max-w-3xl ty-headline">
          <Accent value={e.headline} />
        </RiseItem>
        <RiseItem as="p" className="mx-auto mt-6 max-w-xl ty-sub md:mt-8">{e.price}</RiseItem>
        <RiseItem as="p" className="mx-auto mt-3 max-w-xl ty-sub">{e.free}</RiseItem>
        <RiseItem as="p" className="mx-auto mt-6 max-w-md ty-body opacity-80">{e.guarantee}</RiseItem>
        <RiseItem className="mt-8 md:mt-10">
          <BookPill placement="home-ending" />
        </RiseItem>
      </Rise>
    </section>
  );
}

/** 8. Three questions, after Function's FAQ, then "See all questions →". */
export function Questions() {
  return (
    <section className={`tile-wrap grid gap-8 md:grid-cols-12 md:gap-12 ${space}`}>
      <FadeUp className="md:col-span-4">
        <h2 className="ty-headline">{faq.homeHeadline}</h2>
      </FadeUp>
      <FadeUp className="md:col-span-8">
        <Faq items={homeQuestions} all={faq.all} />
      </FadeUp>
    </section>
  );
}
