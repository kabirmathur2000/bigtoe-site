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
import { submitVisit } from "@/app/actions/visit";
import { Button, ButtonLink } from "@/components/ui/Button";
import { facts, whatsappHref } from "@/content/facts";
import { footer } from "@/content/site";
import { tile } from "@/content/style-tile";
import { VISIT_EMPTY, VISIT_HONEYPOT, VISIT_MAX, validateVisit, type VisitField, type VisitValues } from "@/lib/visit";

const VisitContext = createContext<{ open: (placement: string) => void; isOpen: boolean }>({ open: () => {}, isOpen: false });
export const useVisit = () => useContext(VisitContext);

/**
 * "Book your first visit" as a soft rounded pill: terracotta, navy text in
 * sentence case, Bold (navy on terracotta passes AA at any size), a soft
 * lift on hover. `size="small"` for the header (15px phones, 17px desktop);
 * `size="large"` (19px) in the menu and the ending.
 */
export function BookPill({
  placement,
  size = "large",
  className = "",
  onOpen,
}: {
  placement: string;
  size?: "small" | "large";
  className?: string;
  /** Called as the panel opens (the menu closes itself). */
  onOpen?: () => void;
}) {
  const { open } = useVisit();
  const sizes = size === "small" ? "px-3.5 py-2 text-[0.9375rem] md:px-5 md:text-[1.0625rem]" : "px-7 py-3.5 text-[1.1875rem]";
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => {
        onOpen?.();
        open(placement);
      }}
      className={`inline-flex items-center justify-center rounded-full bg-terracotta leading-tight font-bold whitespace-nowrap text-navy transition-transform duration-500 ease-soft hover:-translate-y-0.5 ${sizes} ${className}`}
    >
      {size === "small" ? (
        <>
          {/* On phones the header pill reads "Book a visit"; on desktop "Book your first visit". */}
          <span className="md:hidden">{tile.ctaShort}</span>
          <span className="hidden md:inline">{tile.cta}</span>
        </>
      ) : (
        tile.cta
      )}
    </button>
  );
}

const FADE = 700;
type Errors = Partial<Record<VisitField, string>>;
const p = tile.panel;
const messages = (v: VisitValues): Errors =>
  Object.fromEntries(Object.entries(validateVisit(v, p.fields.time.options)).map(([k, key]) => [k, p.errors[key]]));

const field =
  "block w-full border-0 border-b border-navy/30 bg-transparent px-0 py-3 text-body-lg transition-colors duration-500 focus:border-terracotta focus:outline-none focus:ring-0 aria-[invalid=true]:border-terracotta";

function Thanks({ name }: { name: string }) {
  const t = p.thanks;
  const wa = whatsappHref(t.whatsappMessage(name));
  const heading = useRef<HTMLParagraphElement>(null);
  useEffect(() => heading.current?.focus(), []);
  return (
    <div role="status">
      <p ref={heading} tabIndex={-1} className="text-h3 focus:outline-none md:text-h2">{t.heading(name)}</p>
      <div className="mt-8 flex flex-col items-start gap-4">
        <ButtonLink href={facts.intakeFormUrl} target="_blank" rel="noopener noreferrer">
          {t.formLabel}
        </ButtonLink>
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
 * The request panel (style tile, new booking flow). A centred dialog on
 * desktop, a bottom sheet that slides up on phones: name, mobile number,
 * preferred time, one button. On submit: email via Resend (server action),
 * then the thank-you with the intake form (new tab) and WhatsApp. Modal
 * <dialog>: focus stays inside and returns to the button; Close, Escape or
 * a tap outside closes it; the page does not scroll behind it. Reduced
 * motion: a slow fade. Analytics: "Visit panel" on open, "Visit submit" on
 * every submit.
 */
export function VisitProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const page = usePathname();
  const ref = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [values, setValues] = useState<VisitValues>(VISIT_EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const openPanel = useCallback(
    (placement: string) => {
      track("Visit panel", { placement, page });
      if (sentTo !== null) {
        setSentTo(null);
        setValues(VISIT_EMPTY);
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

  const set = (k: VisitField) => (ev: { target: { value: string } }) => {
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
    const event = (result: string) => track("Visit submit", { page, result });
    const first = (Object.keys(e) as VisitField[])[0];
    if (first) {
      event("invalid");
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const data = new FormData(ev.currentTarget);
    startTransition(async () => {
      const res = await submitVisit(data);
      event(res.ok ? "sent" : "failed");
      if (res.ok) setSentTo(values.name.trim());
      else setFailed(true);
    });
  };

  const visible = open && shown;
  const describe = (k: VisitField) => (errors[k] ? `${id}-${k}-error` : undefined);
  const f = p.fields;

  return (
    <VisitContext.Provider value={{ open: openPanel, isOpen: open }}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby={`${id}-heading`}
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        // Phones: a bottom sheet. Desktop: a centred dialog.
        className={`fixed inset-x-0 top-auto bottom-0 m-0 mx-auto max-h-[92dvh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-t-lg border border-b-0 border-navy/15 bg-offwhite p-0 text-navy transition-[opacity,translate] duration-700 ease-soft backdrop:bg-navy/60 md:inset-0 md:m-auto md:h-fit md:rounded-lg md:border-b ${
          visible ? "translate-y-0 opacity-100" : `opacity-0 ${reduce ? "" : "translate-y-12 md:translate-y-4"}`
        }`}
      >
        <div className="px-gutter pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:px-10 md:pt-6 md:pb-10">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 items-center px-2 text-label uppercase opacity-80 transition-opacity duration-500 hover:opacity-100"
            >
              {p.close}
            </button>
          </div>

          <h2 id={`${id}-heading`} className={sentTo === null ? "text-h2 md:text-h1" : "sr-only"}>{p.heading}</h2>

          {sentTo !== null ? (
            <div className="mt-2">
              <Thanks name={sentTo} />
            </div>
          ) : (
            <form ref={formRef} noValidate onSubmit={onSubmit} aria-busy={pending} className="mt-6 space-y-6 md:mt-8">
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={`${id}-${VISIT_HONEYPOT}`} aria-hidden="true">{p.honeypotLabel}</label>
                <input id={`${id}-${VISIT_HONEYPOT}`} name={VISIT_HONEYPOT} type="text" aria-hidden="true" tabIndex={-1} autoComplete="off" defaultValue="" />
              </div>

              <div>
                <label htmlFor={`${id}-name`} className="block text-label uppercase opacity-75">{f.name.label}</label>
                <input
                  id={`${id}-name`} name="name" type="text" autoComplete="name" maxLength={VISIT_MAX.name}
                  value={values.name} onChange={set("name")}
                  aria-invalid={!!errors.name} aria-describedby={describe("name")} className={field}
                />
                {errors.name && <p id={`${id}-name-error`} className="mt-2 text-caption text-terracotta">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor={`${id}-mobile`} className="block text-label uppercase opacity-75">{f.mobile.label}</label>
                <input
                  id={`${id}-mobile`} name="mobile" type="tel" inputMode="tel" autoComplete="tel" maxLength={VISIT_MAX.mobile}
                  value={values.mobile} onChange={set("mobile")}
                  aria-invalid={!!errors.mobile} aria-describedby={describe("mobile")} className={field}
                />
                {errors.mobile && <p id={`${id}-mobile-error`} className="mt-2 text-caption text-terracotta">{errors.mobile}</p>}
              </div>

              <fieldset aria-describedby={describe("time")}>
                <legend className="text-label uppercase opacity-75">{f.time.label}</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {f.time.options.map((o) => (
                    <label
                      key={o}
                      className="inline-flex min-h-11 cursor-pointer items-center border border-navy/30 px-4 text-body transition-colors duration-500 has-checked:border-navy has-checked:bg-navy has-checked:text-offwhite has-focus-visible:outline-2 has-focus-visible:outline-terracotta"
                    >
                      <input type="radio" name="time" value={o} checked={values.time === o} onChange={set("time")} className="sr-only" />
                      {o}
                    </label>
                  ))}
                </div>
                {errors.time && <p id={`${id}-time-error`} className="mt-2 text-caption text-terracotta">{errors.time}</p>}
              </fieldset>

              <div>
                <Button type="submit" disabled={pending} className="w-full disabled:opacity-60">
                  {p.submit}
                </Button>
                <p aria-live="polite" className="mt-3 min-h-5 text-caption text-terracotta">{failed ? p.errors.failed : null}</p>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </VisitContext.Provider>
  );
}
