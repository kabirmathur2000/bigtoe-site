import { Quotes } from "@/components/home/Quotes";
import { BookButton } from "@/components/ui/BookButton";
import { Faqs } from "@/components/ui/Faqs";
import { PhotoScreen, TextScreen } from "@/components/ui/Screen";
import { faqs, firstHour, hero, members, price, sport } from "@/content/home";
import Link from "next/link";

/**
 * Home: five screens, then the FAQs. Light: the core belief, the sport,
 * the first hour. Navy (the fade runs across the Sherpas photo): members'
 * words, the price, the questions. See CLAUDE.md.
 */
export default function Home() {
  return (
    <>
      <PhotoScreen first as="h1" shot={hero.shot} headline={hero.headline} line={hero.line}>
        <div data-cta className="hidden md:block">
          <BookButton placement="home-hero" />
        </div>
      </PhotoScreen>

      <TextScreen headline={sport.headline} line={sport.line}>
        <Link
          href={sport.link.href}
          className="inline-flex min-h-11 items-center text-body-lg underline decoration-current/40 underline-offset-[6px] transition-opacity duration-500 hover:opacity-75"
        >
          {sport.link.label}
        </Link>
      </TextScreen>

      <PhotoScreen shot={firstHour.shot} headline={firstHour.headline} line={firstHour.line} />

      <PhotoScreen tone="navy" photoBreak shot={members.shot} headline={members.headline} line={members.line}>
        <Quotes />
      </PhotoScreen>

      <TextScreen tone="navy" headline={price.headline} line={<>{price.line}<span className="mt-4 block">{price.guarantee}</span></>}>
        <div data-cta>
          <BookButton placement="home-price" />
        </div>
      </TextScreen>

      <Faqs label={faqs.label} items={faqs.items} />
    </>
  );
}
