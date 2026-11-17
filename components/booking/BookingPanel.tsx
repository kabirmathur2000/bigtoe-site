"use client";

import { track } from "@vercel/analytics";
import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  type FormEvent,
  type ReactNode,
} from "react";
import { submitBooking } from "@/app/actions/book";
import { Button, ButtonLink } from "@/components/ui/Button";
import { booking } from "@/content/booking";
import { facts, whatsappHref } from "@/content/facts";
import { footer } from "@/content/site";
import { EMPTY, HONEYPOT, MAX_LENGTH, validate, type Field, type Values } from "@/lib/booking";

type Ctx = { open: (placement: string) => void };
const BookingContext = createContext<Ctx>({ open: () => {} });

/** Opens the booking panel from anywhere: `useBooking().open("hero")`. */
export const useBooking = () => useContext(BookingContext);

/** How long the panel takes to slide up and to fade away (ms). */
const FADE = 700;

type Errors = Partial<Record<Field, string>>;
const messages = (v: Values): Errors =>
  Object.fromEntries(Object.entries(validate(v)).map(([k, key]) => [k, booking.errors[key]]));

const field =
  "block w-full border-0 border-b border-navy/30 bg-transparent px-0 py-3 text-body-lg transition-colors duration-500 focus:border-terracotta focus:outline-none focus:ring-0 aria-[invalid=true]:border-terracotta";

/** After sending: thanks, the short form, then WhatsApp. */
function Thanks({ firstName }: { firstName: string }) {
  const t = booking.thanks;
  // The form has just been replaced: keep keyboard and screen-reader focus here.
  const heading = useRef<HTMLParagraphElement>(null);
  useEffect(() => heading.current?.focus(), []);
  const wa = whatsappHref(t.whatsappMessage(firstName));
  return (
    <div role="status">
      <p ref={heading} tabIndex={-1} className="text-h3 focus:outline-none md:text-h2">{t.heading(firstName)}</p>
      <p className="mt-6 text-body-lg md:mt-8">{t.formLead}</p>
      <div className="mt-4">
        <ButtonLink href={facts.preVisitFormUrl} target="_blank" rel="noopener noreferrer">
          {t.formLabel}
        </ButtonLink>
      </div>
      <div className="mt-6 border-t border-navy/15 pt-5">
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center border border-navy/40 px-4 text-label uppercase transition-opacity duration-500 hover:opacity-75"
          >
            {t.whatsappLabel}
          </a>
        ) : (
          <p className="text-caption text-terracotta">{footer.missingWhatsapp}</p>
        )}
      </div>
    </div>
  );
}

/**
 * The booking panel, opened by every button on the site. A calm panel in
 * the brand light colour slides up from the bottom: the heading, first name
 * and WhatsApp number, one button. On submit the details go by email
 * (Resend, server action), then the thank-you step. A modal <dialog>: focus
 * stays inside and returns to the button; Close, Escape or a tap outside
 * closes it; the page behind does not scroll. Reduced motion: a slow fade.
 * Analytics: "Booking panel" on open and "Booking submit" on every submit.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const page = usePathname();
  const ref = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const openPanel = useCallback(
    (placement: string) => {
      track("Booking panel", { placement, page });
      // A finished booking starts fresh next time.
      if (sentTo !== null) {
        setSentTo(null);
        setValues(EMPTY);
        setTried(false);
        setErrors({});
      }
      setOpen(true);
    },
    [page, sentTo],
  );

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const root = document.documentElement;
    if (open) {
      if (!d.open) d.showModal();
      root.style.overflow = "hidden";
      const f = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(f);
    }
    if (!d.open) return;
    const t = window.setTimeout(() => {
      setShown(false);
      d.close();
      root.style.overflow = "";
    }, FADE);
    return () => window.clearTimeout(t);
  }, [open]);

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
    const event = (result: string) => track("Booking submit", { page, result });
    const first = (Object.keys(e) as Field[])[0];
    if (first) {
      event("invalid");
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const data = new FormData(ev.currentTarget);
    startTransition(async () => {
      const res = await submitBooking(data);
      event(res.ok ? "sent" : "failed");
      if (res.ok) setSentTo(values.firstName.trim());
      else setFailed(true);
    });
  };

  // Closing fades at once; the dialog itself closes when the fade ends.
  const visible = open && shown;
  const describe = (k: Field) => (errors[k] ? `${id}-${k}-error` : undefined);
  const f = booking.fields;

  return (
    <BookingContext.Provider value={{ open: openPanel }}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby={`${id}-heading`}
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        // The dialog box itself is only reached by a tap on the backdrop.
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        className={`fixed inset-x-0 top-auto bottom-0 m-0 mx-auto max-h-[92dvh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-t-lg border border-b-0 border-navy/15 bg-offwhite p-0 text-navy transition-[opacity,translate] duration-700 ease-soft backdrop:bg-navy/60 md:bottom-6 md:rounded-lg md:border-b ${
          visible ? "translate-y-0 opacity-100" : `opacity-0 ${reduce ? "" : "translate-y-12"}`
        }`}
      >
        <div className="px-gutter pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:px-10 md:pt-6 md:pb-10">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 items-center px-2 text-label uppercase opacity-80 transition-opacity duration-500 hover:opacity-100"
            >
              {booking.close}
            </button>
          </div>

          <h2 id={`${id}-heading`} className={sentTo === null ? "text-h2 md:text-h1" : "sr-only"}>
            {booking.heading}
          </h2>

          {sentTo !== null ? (
            <div className="mt-2">
              <Thanks firstName={sentTo} />
            </div>
          ) : (
            <form ref={formRef} noValidate onSubmit={onSubmit} aria-busy={pending} className="mt-6 space-y-6 md:mt-8">
              {/* Spam trap: off-screen, hidden from screen readers and the keyboard. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={`${id}-${HONEYPOT}`} aria-hidden="true">{booking.honeypotLabel}</label>
                <input id={`${id}-${HONEYPOT}`} name={HONEYPOT} type="text" aria-hidden="true" tabIndex={-1} autoComplete="off" defaultValue="" />
              </div>

              <div>
                <label htmlFor={`${id}-firstName`} className="block text-label uppercase opacity-75">{f.firstName.label}</label>
                <input
                  id={`${id}-firstName`} name="firstName" type="text" autoComplete="given-name" maxLength={MAX_LENGTH.firstName}
                  value={values.firstName} onChange={set("firstName")}
                  aria-invalid={!!errors.firstName} aria-describedby={describe("firstName")} className={field}
                />
                {errors.firstName && <p id={`${id}-firstName-error`} className="mt-2 text-caption text-terracotta">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor={`${id}-whatsapp`} className="block text-label uppercase opacity-75">{f.whatsapp.label}</label>
                <input
                  id={`${id}-whatsapp`} name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" maxLength={MAX_LENGTH.whatsapp}
                  value={values.whatsapp} onChange={set("whatsapp")}
                  aria-invalid={!!errors.whatsapp} aria-describedby={describe("whatsapp")} className={field}
                />
                {errors.whatsapp && <p id={`${id}-whatsapp-error`} className="mt-2 text-caption text-terracotta">{errors.whatsapp}</p>}
              </div>

              <div>
                <Button type="submit" disabled={pending} className="w-full disabled:opacity-60">
                  {booking.submit}
                </Button>
                <p aria-live="polite" className="mt-3 min-h-5 text-caption text-terracotta">
                  {failed ? booking.errors.failed : null}
                </p>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}
