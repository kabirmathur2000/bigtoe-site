"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { booking } from "@/content/booking";

type Values = {
  firstName: string;
  lastName: string;
  contact: string;
  day120: string;
  heardFrom: string;
  note: string;
};
const EMPTY: Values = { firstName: "", lastName: "", contact: "", day120: "", heardFrom: "", note: "" };
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{10,20}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.firstName.trim()) e.firstName = booking.errors.firstName;
  if (!v.lastName.trim()) e.lastName = booking.errors.lastName;
  const c = v.contact.trim();
  if (!c) e.contact = booking.errors.contactMissing;
  else if (!EMAIL.test(c) && !(PHONE.test(c) && c.replace(/\D/g, "").length >= 10))
    e.contact = booking.errors.contactInvalid;
  if (!v.day120) e.day120 = booking.errors.day120;
  if (!v.heardFrom) e.heardFrom = booking.errors.heardFrom;
  return e;
}

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

/**
 * The waitlist / booking form. Layout and validation only for now; it does
 * not send. Reused at the end of Home and on /book-now.
 */
export function BookingForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const set = (k: keyof Values) => (ev: { target: { value: string } }) => {
    const next = { ...values, [k]: ev.target.value };
    setValues(next);
    setStatus(null);
    if (tried) setErrors(validate(next));
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    setTried(true);
    const e = validate(values);
    setErrors(e);
    const first = (Object.keys(e) as (keyof Values)[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus(booking.notSentYet);
  };

  const describe = (k: keyof Values) => (errors[k] ? `${id}-${k}-error` : undefined);

  const f = booking.fields;

  const select = (k: "day120" | "heardFrom") => (
    <div>
      <FieldLabel htmlFor={`${id}-${k}`}>{f[k].label}</FieldLabel>
      <div className="relative">
        <select
          id={`${id}-${k}`} name={k} value={values[k]} onChange={set(k)}
          aria-invalid={!!errors[k]} aria-describedby={describe(k)}
          className={`${field} cursor-pointer appearance-none pr-8 [&>option]:bg-navy [&>option]:text-offwhite ${values[k] ? "" : "text-current/50"}`}
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

  const text = (k: "firstName" | "lastName", autoComplete: string) => (
    <div>
      <FieldLabel htmlFor={`${id}-${k}`}>{f[k].label}</FieldLabel>
      <input
        id={`${id}-${k}`} name={k} type="text" autoComplete={autoComplete}
        value={values[k]} onChange={set(k)}
        aria-invalid={!!errors[k]} aria-describedby={describe(k)} className={field}
      />
      <FieldError id={`${id}-${k}-error`} message={errors[k]} />
    </div>
  );

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="space-y-10">
      <div className="grid gap-10 md:grid-cols-2 md:gap-8">
        {text("firstName", "given-name")}
        {text("lastName", "family-name")}
      </div>

      <div>
        <FieldLabel htmlFor={`${id}-contact`}>{f.contact.label}</FieldLabel>
        <input
          id={`${id}-contact`} name="contact" type="text" inputMode="email" autoComplete="email"
          value={values.contact} onChange={set("contact")}
          aria-invalid={!!errors.contact} aria-describedby={describe("contact")} className={field}
        />
        <FieldError id={`${id}-contact-error`} message={errors.contact} />
      </div>

      {select("day120")}

      {select("heardFrom")}

      <div>
        <FieldLabel htmlFor={`${id}-note`}>
          {f.note.label} <span className="ml-2 font-normal normal-case tracking-normal opacity-70">({f.note.optional})</span>
        </FieldLabel>
        <textarea
          id={`${id}-note`} name="note" rows={3} value={values.note} onChange={set("note")}
          className={`${field} resize-y`}
        />
      </div>

      <div className="pt-2">
        <Button type="submit" className="w-full md:w-auto">{booking.submit}</Button>
        <p aria-live="polite" className="mt-4 min-h-6 text-caption text-terracotta">{status}</p>
      </div>
    </form>
  );
}
