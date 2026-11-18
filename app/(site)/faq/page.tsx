import type { Metadata } from "next";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { PageTitle } from "@/components/site/PageTitle";
import { FadeUp } from "@/components/site/Rise";
import { BookPill } from "@/components/site/VisitPanel";
import { faq } from "@/content/faq";
import { meta } from "@/content/site";

export const metadata: Metadata = meta.pages.faq;

/** All questions: an accordion, one open at a time, then the button. */
export default function FaqPage() {
  return (
    <>
      <PageTitle title={faq.title} />
      <section className="tile-wrap pt-12 pb-24 md:pt-20 md:pb-36">
        <FadeUp className="max-w-4xl">
          <Faq items={faq.items} />
        </FadeUp>
        <FadeUp className="mt-12 md:mt-16">
          <BookPill placement="faq" />
        </FadeUp>
      </section>
      <Footer />
    </>
  );
}
