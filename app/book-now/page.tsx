import type { Metadata } from "next";
import { Visit } from "@/components/book/Visit";
import { BookingSection } from "@/components/booking/BookingSection";
import { facts } from "@/content/facts";
import { meta } from "@/content/site";

export const metadata: Metadata = { title: facts.ctaHeading, description: meta.pages.book.description };

/**
 * Book: where and when, then the same form as Home on navy (the page's one
 * navy section), reached by the slow fade. Shareable as a link on WhatsApp.
 */
export default function BookPage() {
  return (
    <>
      <Visit />
      <BookingSection leadIn />
    </>
  );
}
