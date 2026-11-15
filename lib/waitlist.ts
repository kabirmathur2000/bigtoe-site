/**
 * The form's fields and validation, shared by the browser (instant
 * feedback) and the server action (never trust the browser).
 */

export const FIELDS = ["firstName", "lastName", "contact", "day120"] as const;
export type Field = (typeof FIELDS)[number];
export type Values = Record<Field, string>;
export type ErrorKey = "firstName" | "lastName" | "contactMissing" | "contactInvalid" | "day120";

/** Hidden field real people never see or fill; bots usually do. */
export const HONEYPOT = "company";

export const EMPTY: Values = { firstName: "", lastName: "", contact: "", day120: "" };

/** Generous caps so a pasted essay or a bot can't flood the inbox. */
export const MAX_LENGTH: Record<Field, number> = {
  firstName: 80,
  lastName: 80,
  contact: 120,
  day120: 200,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{10,20}$/;

export const isEmail = (c: string) => EMAIL.test(c.trim());

/** Field → error key, for every field that fails. */
export function validate(v: Values): Partial<Record<Field, ErrorKey>> {
  const e: Partial<Record<Field, ErrorKey>> = {};
  if (!v.firstName.trim()) e.firstName = "firstName";
  if (!v.lastName.trim()) e.lastName = "lastName";
  const c = v.contact.trim();
  if (!c) e.contact = "contactMissing";
  else if (!isEmail(c) && !(PHONE.test(c) && c.replace(/\D/g, "").length >= 10)) e.contact = "contactInvalid";
  if (!v.day120) e.day120 = "day120";
  return e;
}
