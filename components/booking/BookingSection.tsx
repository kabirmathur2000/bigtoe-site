import { BookingForm } from "@/components/booking/BookingForm";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { ButtonLink } from "@/components/ui/Button";
import { booking } from "@/content/booking";
import { whatsappHref } from "@/content/facts";

/** The form on navy, with the WhatsApp button beside it. Home block 6 and /book-now. */
export function BookingSection({ id = "book" }: { id?: string }) {
  const wa = whatsappHref();
  return (
    <Section id={id} tone="navy" className="py-section">
      <div className="mx-auto grid max-w-wide gap-16 px-gutter md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <Reveal>
            <RevealItem as="p" className="text-label uppercase opacity-70">{booking.label}</RevealItem>
            <RevealItem as="h2" className="mt-6 text-h1">{booking.headline}</RevealItem>
            <RevealItem as="p" className="mt-6 max-w-text text-body-lg opacity-80">{booking.subline}</RevealItem>
            <RevealItem as="p" className="mt-3 text-caption text-terracotta">{booking.replyTime}</RevealItem>
          </Reveal>
          <div className="mt-10">
            {wa ? (
              <ButtonLink href={wa} variant="outline-light" target="_blank" rel="noopener noreferrer">
                {booking.whatsappLabel}
              </ButtonLink>
            ) : (
              <div>
                <span aria-disabled className="inline-flex cursor-not-allowed items-center border border-offwhite/25 px-7 py-4 text-label font-bold uppercase opacity-50">
                  {booking.whatsappLabel}
                </span>
                <p className="mt-3 text-caption text-terracotta">{booking.whatsappMissing}</p>
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <BookingForm />
        </div>
      </div>
    </Section>
  );
}
