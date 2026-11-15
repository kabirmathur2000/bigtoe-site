import { BookingForm } from "@/components/booking/BookingForm";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { booking } from "@/content/booking";

/**
 * The form on navy, modelled on 10 Squared: a heading, the form, nothing
 * else. Heading and button follow facts.ctaMode. End of Home and /book-now.
 */
export function BookingSection({ id = "waitlist", leadIn = false }: { id?: string; leadIn?: boolean }) {
  return (
    // leadIn: when the form starts the navy zone (Book), extra room above it
    // lets the fade finish before the button comes into view on wide screens.
    <Section chapter free id={id} tone="navy" className={`pb-(--chapter-pad) ${leadIn ? "md:pt-[calc(var(--chapter-pad)+28svh)]" : ""}`}>
      {/* Marks the form so the mobile bottom bar hides while it is on screen. */}
      <div data-booking-form />
      <div className="mx-auto max-w-wide px-gutter">
        {/* Stacked on phones and tablets; heading beside the form on wide screens. */}
        <div className="max-w-2xl md:ml-[8.333%] lg:grid lg:max-w-none lg:grid-cols-12 lg:gap-12 lg:ml-0">
          <Reveal className="lg:col-span-4 lg:col-start-2">
            <RevealItem as="h2" className="text-h1">{booking.heading}</RevealItem>
          </Reveal>
          <div className="mt-8 md:mt-10 lg:col-span-6 lg:col-start-6 lg:mt-0">
            <BookingForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
