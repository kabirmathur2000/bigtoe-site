import Image from "next/image";
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
import logoTagLight from "@/public/brand/logo-tag-light.png";

/**
 * The one page's first and last parts: the hero, Why BigToe, the pizza,
 * the members' words, the questions, "Come and meet us." Light page,
 * Light headlines, every section left-aligned, its words together and the
 * visual below or beside. No buttons in any section: the header books.
 */

/** 1. Hero: a full-screen photo; a deep navy gradient; the LogoTag, the headline on the darkest part, the line, the place as a small caption. */
export function Hero() {
  const h = home.hero;
  return (
    <section className="relative h-svh min-h-150 overflow-hidden bg-navy text-offwhite">
      {/* Phones: the frame runs 40% above the screen, so the coffee bar's logo wall sits higher, clear of the words. */}
      <div className="absolute inset-x-0 -top-[40%] bottom-0 md:top-0">
        <Photo shot={h.shot} posClass="object-[16%_50%] md:object-[50%_55%]" sizes="100vw" preload />
      </div>
      {/* Solid navy behind the words, rising to clear at the top. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[85%] bg-gradient-to-t from-navy from-45% via-navy/80 via-70% to-transparent md:h-[80%] md:from-35%" />
      <Rise className="page-wrap absolute inset-x-0 bottom-0 pb-[max(1.5rem,calc(env(safe-area-inset-bottom)+1rem))] md:pb-10" stagger={0.1}>
        <RiseItem>
          <Image src={logoTagLight} alt={home.hero.logoAlt} priority className="h-12 w-auto md:h-16" sizes="(min-width: 1440px) 260px, (min-width: 768px) 190px, 140px" />
        </RiseItem>
        <RiseItem as="h1" className="mt-8 max-w-5xl ty-hero md:mt-12">
          <Accent value={h.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-4 max-w-xl ty-sub md:mt-6">{h.line}</RiseItem>
        <RiseItem as="p" className="mt-10 ty-small opacity-75 md:mt-16">{h.place}</RiseItem>
      </Rise>
    </section>
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
