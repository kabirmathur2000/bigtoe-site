/**
 * The booking panel's fields and validation, shared by the browser (instant
 * feedback) and the server action (never trust the browser).
 */

export const FIELDS = ["firstName", "whatsapp"] as const;
export type Field = (typeof FIELDS)[number];
export type Values = Record<Field, string>;
export type ErrorKey = "firstName" | "whatsappMissing" | "whatsappInvalid";

/** Hidden field real people never see or fill; bots usually do. */
export const HONEYPOT = "company";

export const EMPTY: Values = { firstName: "", whatsapp: "" };

/** Generous caps so a pasted essay or a bot can't flood the inbox. */
export const MAX_LENGTH: Record<Field, number> = { firstName: 80, whatsapp: 24 };

/** Digits, spaces, brackets, dashes and an optional leading +; 10 to 15 digits. */
const PHONE = /^\+?[\d\s()-]{10,24}$/;
const digits = (s: string) => s.replace(/\D/g, "").length;

/** Field → error key, for every field that fails. */
export function validate(v: Values): Partial<Record<Field, ErrorKey>> {
  const e: Partial<Record<Field, ErrorKey>> = {};
  if (!v.firstName.trim()) e.firstName = "firstName";
  const w = v.whatsapp.trim();
  if (!w) e.whatsapp = "whatsappMissing";
  else if (!PHONE.test(w) || digits(w) < 10 || digits(w) > 15) e.whatsapp = "whatsappInvalid";
  return e;
}
