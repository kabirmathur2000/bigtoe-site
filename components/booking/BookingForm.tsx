"use client";

import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";
import { useId, useRef, useState, useTransition, type FormEvent } from "react";
import { submitWaitlist } from "@/app/actions/waitlist";
import { Button, ButtonLink } from "@/components/ui/Button";
import { booking } from "@/content/booking";
import { facts, mailtoHref, whatsappHref } from "@/content/facts";
import { EMPTY, HONEYPOT, MAX_LENGTH, validate, type Field, type Values } from "@/lib/waitlist";

type Errors = Partial<Record<Field, string>>;

const messages = (v: Values): Errors =>
  Object.fromEntries(Object.entries(validate(v)).map(([k, key]) => [k, booking.errors[key]]));

const field =
  "block w-full border-0 border-b border-current/30 bg-transparent px-0 py-3 text-body-lg placeholder:opacity-40 transition-colors duration-500 focus:border-terracotta focus:outline-none focus:ring-0 aria-[invalid=true]:border-terracotta";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-label uppercase opacity-70">
      {children}
    </label>
  );
}

function Chevron() {
  return (
    <svg aria-hidden viewBox="0 0 12 8" className="pointer-events-none absolute top-1/2 right-1 h-2 w-3 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M1 1.5 6 6.5l5-5" />
    </svg>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p id={id} className="mt-2 text-caption text-terracotta">{message}</p> : null;
}

/** After sending: thanks, then WhatsApp with a pre-filled message, or the email address. */
function Thanks({ firstName }: { firstName: string }) {
  const t = booking.thanks;
  const wa = whatsappHref(t.whatsappMessage(firstName));
  const email = (
    <a href={mailtoHref} className="underline underline-offset-4">{facts.email}</a>
  );
  return (
    <div role="status" className="fade-up">
      <p className="text-h2">{t.heading(firstName)}</p>
      <p className="mt-4 text-caption text-terracotta">{t.reply}</p>
      {wa ? (
        <>
          <div className="mt-10">
            <ButtonLink href={wa} target="_blank" rel="noopener noreferrer">
              {t.whatsappLabel}
            </ButtonLink>
          </div>
          <p className="mt-6 text-body opacity-75">{t.emailLead} {email}</p>
        </>
      ) : (
        <p className="mt-10 text-body-lg">{t.emailOnlyLead} {email}</p>
      )}
    </div>
  );
}

/**
 * The waitlist / booking form, reused at the end of Home and on /book-now.
 * Checks in the browser for instant feedback, then sends through the
 * server action (which checks again and emails CONTACT_EMAIL via Resend).
 */
export function BookingForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const page = usePathname();

  const set = (k: Field) => (ev: { target: { value: string } }) => {
    const next = { ...values, [k]: ev.target.value };
    setValues(next);
    setFailed(false);
    if (tried) setErrors(messages(next));
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setTried(true);
    const e = messages(values);
    setErrors(e);
    const first = (Object.keys(e) as Field[])[0];
    // Every submit is an analytics event (no personal details): invalid, sent or failed.
    const event = (result: string) => track("Form submit", { page, result, mode: facts.ctaMode });
    if (first) {
      event("invalid");
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const data = new FormData(ev.currentTarget);
    startTransition(async () => {
      const res = await submitWaitlist(data);
      event(res.ok ? "sent" : "failed");
      if (res.ok) setSentTo(values.firstName.trim());
      else setFailed(true);
    });
  };

  if (sentTo !== null) return <Thanks firstName={sentTo} />;

  const describe = (k: Field) => (errors[k] ? `${id}-${k}-error` : undefined);
  const f = booking.fields;

  const text = (k: "firstName" | "lastName", autoComplete: string) => (
    <div>
      <FieldLabel htmlFor={`${id}-${k}`}>{f[k].label}</FieldLabel>
      <input
        id={`${id}-${k}`} name={k} type="text" autoComplete={autoComplete} maxLength={MAX_LENGTH[k]}
        value={values[k]} onChange={set(k)}
        aria-invalid={!!errors[k]} aria-describedby={describe(k)} className={field}
      />
      <FieldError id={`${id}-${k}-error`} message={errors[k]} />
    </div>
  );

  const select = (k: "day120") => (
    <div>
      <FieldLabel htmlFor={`${id}-${k}`}>{f[k].label}</FieldLabel>
      <div className="relative">
        <select
          id={`${id}-${k}`} name={k} value={values[k]} onChange={set(k)}
          aria-invalid={!!errors[k]} aria-describedby={describe(k)}
          className={`${field} cursor-pointer appearance-none pr-8 [&>option]:bg-navy [&>option]:text-offwhite ${values[k] ? "" : "text-current/75"}`}
        >
          <option value="" disabled>{f[k].placeholder}</option>
          {f[k].options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <Chevron />
      </div>
      <FieldError id={`${id}-${k}-error`} message={errors[k]} />
    </div>
  );

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-busy={pending} className="space-y-7 md:space-y-8">
      {/* Spam trap: off-screen, skipped by keyboard and screen readers. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-${HONEYPOT}`}>{booking.honeypotLabel}</label>
        <input id={`${id}-${HONEYPOT}`} name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-7 md:grid-cols-2 md:gap-8">
        {text("firstName", "given-name")}
        {text("lastName", "family-name")}
      </div>

      <div>
        <FieldLabel htmlFor={`${id}-contact`}>{f.contact.label}</FieldLabel>
        <input
          id={`${id}-contact`} name="contact" type="text" inputMode="email" autoComplete="email" maxLength={MAX_LENGTH.contact}
          value={values.contact} onChange={set("contact")}
          aria-invalid={!!errors.contact} aria-describedby={describe("contact")} className={field}
        />
        <FieldError id={`${id}-contact-error`} message={errors.contact} />
      </div>

      {select("day120")}

      <div>
        <Button type="submit" disabled={pending} className="w-full disabled:opacity-60 md:w-auto">
          {booking.submit}
        </Button>
        <p aria-live="polite" className="mt-4 min-h-6 text-caption text-terracotta">
          {failed ? booking.errors.failed : null}
        </p>
      </div>
    </form>
  );
}
