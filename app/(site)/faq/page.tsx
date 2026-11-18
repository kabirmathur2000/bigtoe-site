import type { Metadata } from "next";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { PageTitle } from "@/components/site/PageTitle";
import { FadeUp } from "@/components/site/Rise";
import { BookPill } from "@/components/site/VisitPanel";
import { faq, faqGroups } from "@/content/faq";
import { meta } from "@/content/site";

export const metadata: Metadata = meta.pages.faq;

/** All questions in four groups, each under a small label with its own accordion (one open at a time), then the button. */
export default function FaqPage() {
  return (
    <>
      <PageTitle title={faq.title} />
      <section className="tile-wrap pt-12 pb-24 md:pt-20 md:pb-36">
        <div className="max-w-4xl space-y-14 md:space-y-20">
          {faqGroups.map((g, i) => (
            <FadeUp key={g.label}>
              <h2 className="mb-4 ty-label md:mb-6">{g.label}</h2>
              <Faq items={g.items} firstOpen={i === 0} />
            </FadeUp>
          ))}
        </div>
        <FadeUp className="mt-12 md:mt-16">
          <BookPill placement="faq" />
        </FadeUp>
      </section>
      <Footer />
    </>
  );
}
