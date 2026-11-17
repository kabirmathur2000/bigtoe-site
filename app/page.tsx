import Link from "next/link";
import coffeeBar from "@/public/photos/studio-coffee-bar.jpg";
import { Members } from "@/components/home/Members";
import { BookButton } from "@/components/ui/BookButton";
import { Faqs } from "@/components/ui/Faqs";
import { PhotoScreen, TextScreen } from "@/components/ui/Screen";
import { faqs, hero, price, score, social, sport } from "@/content/home";

/**
 * Home: six screens, then the FAQs. Light: the core belief, the sport, the
 * score. Navy (one slow fade as the members' words arrive): seen, belong,
 * progress; the pizza; the price; the questions. See CLAUDE.md.
 */
export default function Home() {
  return (
    <>
      <PhotoScreen first as="h1" photo={{ src: coffeeBar, ...hero.photo }} caption={hero.caption} headline={hero.headline} line={hero.line} childrenDesktopOnly>
        <div data-cta>
          <BookButton placement="home-hero" />
        </div>
      </PhotoScreen>

      <TextScreen headline={sport.headline} lines={[sport.line]}>
        <Link
          href={sport.link.href}
          className="inline-flex min-h-11 items-center text-body-lg underline decoration-current/40 underline-offset-[6px] transition-opacity duration-500 hover:opacity-75"
        >
          {sport.link.label}
        </Link>
      </TextScreen>

      <PhotoScreen shot={score.shot} headline={score.headline} line={score.line} childrenDesktopOnly>
        <div data-cta>
          <BookButton placement="home-score" />
        </div>
      </PhotoScreen>

      <Members />

      <PhotoScreen tone="navy" shot={social.shot} headline={social.headline} line={social.line} />

      <TextScreen tone="navy" headline={price.headline} lines={price.lines}>
        <div data-cta>
          <BookButton placement="home-price" />
        </div>
      </TextScreen>

      <Faqs label={faqs.label} items={faqs.items} />
    </>
  );
}
