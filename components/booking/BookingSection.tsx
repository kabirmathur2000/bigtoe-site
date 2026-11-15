import { BookingForm } from "@/components/booking/BookingForm";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { booking } from "@/content/booking";

/**
 * The form on navy, modelled on 10 Squared: a heading, the form, nothing
 * else. Heading and button follow facts.ctaMode. End of Home and /book-now.
 */
export function BookingSection({ id = "waitlist" }: { id?: string }) {
  return (
    <Section id={id} tone="navy" className="py-section">
      {/* Marks the form so the mobile bottom bar hides while it is on screen. */}
      <div data-booking-form />
      <div className="mx-auto max-w-wide px-gutter">
        <div className="max-w-2xl md:ml-[8.333%]">
          <Reveal>
            <RevealItem as="h2" className="text-h1">{booking.heading}</RevealItem>
          </Reveal>
          <div className="mt-12 md:mt-16">
            <BookingForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
