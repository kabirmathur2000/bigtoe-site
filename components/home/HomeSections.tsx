import type { ReactNode } from "react";
import { Accent } from "@/components/site/Accent";
import { Faq } from "@/components/site/Faq";
import { JumpLink } from "@/components/site/Jump";
import { MemberStories } from "@/components/site/Members";
import { Photo } from "@/components/site/Photo";
import { FadeUp, Rise, RiseItem } from "@/components/site/Rise";
import { SectionText } from "@/components/site/SectionText";
import { photoCard, softPill } from "@/components/site/styles";
import { faq, faqGroups } from "@/content/faq";
import { home } from "@/content/home";
import { anchors } from "@/content/site";

/**
 * The one page's first and last parts: the hero, Why BigToe, the pizza,
 * the members' words, the questions, "Come and meet us." Light page,
 * Light headlines, every section left-aligned, its words together and the
 * visual below or beside. No buttons in any section: the header books.
 */

/**
 * 1. Hero, scrolling after 10 Squared: the photo is pinned full screen
 * (sticky) while the headline, line and caption scroll up and away with
 * the page, then the sections after it (`children`) slide over the photo.
 * Native scroll, no snapping. A navy band on the lower 40% of the screen,
 * strongest at the very bottom and clear above, holds the words and
 * scrolls away with them. Under
 * reduced motion the photo is not pinned: a normal section.
 */
export function Hero({ children }: { children: ReactNode }) {
  const h = home.hero;
  return (
    <div>
      {/* The tone, on the hero photo only: a slight cool shift (red down, blue up). */}
      <svg aria-hidden className="absolute h-0 w-0">
        <filter id="hero-cool" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0.95 0 0 0 0  0 1 0 0 0  0 0 1.06 0 0  0 0 0 1 0" />
        </filter>
      </svg>
      <div className="top-0 h-[max(100svh,37.5rem)] overflow-hidden bg-navy motion-safe:sticky motion-reduce:relative">
        <Photo
          shot={h.shot}
          // Phones: the full height of the room, the logo wall and the bar in frame. Desktop: the whole width of the
          // room; on screens taller than wide the photo shows whole, sitting on the bottom, navy above.
          posClass="object-[38%_50%] md:object-[50%_53%] [@media(min-width:768px)_and_(max-aspect-ratio:1/1)]:object-contain [@media(min-width:768px)_and_(max-aspect-ratio:1/1)]:object-bottom"
          filter="url(#hero-cool) saturate(0.9) contrast(1.1)"
          sizes="(min-width: 768px) 100vw, 230vw"
          preload
        />
      </div>
      <section className="relative -mt-[max(100svh,37.5rem)] flex h-[max(100svh,37.5rem)] flex-col justify-end text-offwhite">
        {/* The band travels with the words, so they keep their navy as they scroll away over the photo. */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-navy via-navy/80 via-65% to-transparent" />
        <Rise className="relative page-wrap pb-[max(1.5rem,calc(env(safe-area-inset-bottom)+1rem))] [text-shadow:0_1px_24px_rgb(10_33_45_/_0.45)] md:pb-10" stagger={0.1}>
          <RiseItem as="h1" className="max-w-5xl ty-hero">
            <Accent value={h.headline} />
          </RiseItem>
          <RiseItem as="p" className="mt-3 max-w-xl ty-sub md:mt-5">{h.line}</RiseItem>
          <RiseItem as="p" className="mt-5 ty-small opacity-80 md:mt-8">{h.place}</RiseItem>
        </Rise>
      </section>
      <div className="relative bg-offwhite">{children}</div>
    </div>
  );
}

/** 2. Why BigToe: the headline and two lines, then two jump links. Text only. */
export function Why() {
  const w = home.why;
  return (
    <section id={anchors.why} className="page-wrap section-space">
      <SectionText headline={w.headline} lines={w.lines}>
        <RiseItem className="mt-8 flex flex-wrap gap-3 md:mt-10">
          {w.links.map((l) => (
            <JumpLink key={l.id} id={l.id} className={softPill}>{l.label}</JumpLink>
          ))}
        </RiseItem>
      </SectionText>
    </section>
  );
}

/** 3. The headline and line, then one photo card (the social table). */
export function Pizza() {
  const p = home.pizza;
  return (
    <section className="page-wrap section-space">
      <SectionText headline={p.headline} lines={[p.line]} />
      <FadeUp className={`mt-10 aspect-[4/5] md:mt-14 md:aspect-video ${photoCard}`}>
        <Photo shot={p.shot} space="table" pos="60% 60%" sizes="(min-width: 1760px) 1600px, (min-width: 768px) 100vw, 240vw" />
      </FadeUp>
    </section>
  );
}

/** 12. Member stories: the headline, then the photo cards stacked down the page. */
export function Members() {
  return (
    <section id={anchors.members} className="page-wrap section-space">
      <SectionText headline={home.members.headline} />
      <MemberStories />
    </section>
  );
}

/** 13. Questions: the headline beside (above on phones) the four groups, each with its own expandable rows. */
export function Questions() {
  return (
    <section id={anchors.questions} className="page-wrap section-space grid gap-10 md:grid-cols-12 md:gap-12">
      <FadeUp className="md:col-span-4">
        <h2 className="ty-headline md:sticky md:top-[calc(var(--header-h)+var(--gutter))]">
          <Accent value={faq.headline} />
        </h2>
      </FadeUp>
      <div className="space-y-12 md:col-span-8 md:space-y-16">
        {faqGroups.map((g, i) => (
          <FadeUp key={g.label}>
            <h3 className="mb-4 ty-label md:mb-6">{g.label}</h3>
            <Faq items={g.items} firstOpen={i === 0} level="h4" />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/** 14. Come and meet us: the invitation and the agreed lines. No button. The footer follows. */
export function Visit() {
  const v = home.visit;
  return (
    <section id={anchors.visit} className="page-wrap section-space">
      <SectionText headline={v.headline} lines={v.lines}>
        <RiseItem as="p" className="mt-6 max-w-xl ty-body opacity-80 md:mt-8">{v.guarantee}</RiseItem>
      </SectionText>
    </section>
  );
}
