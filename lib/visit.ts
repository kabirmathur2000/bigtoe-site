/**
 * The request panel's fields and validation (style tile, new booking flow),
 * shared by the browser and the server action.
 */

export const VISIT_FIELDS = ["name", "mobile", "time"] as const;
export type VisitField = (typeof VISIT_FIELDS)[number];
export type VisitValues = Record<VisitField, string>;
export type VisitErrorKey = "name" | "mobileMissing" | "mobileInvalid" | "time";

export const VISIT_HONEYPOT = "company";
export const VISIT_EMPTY: VisitValues = { name: "", mobile: "", time: "" };
export const VISIT_MAX: Record<VisitField, number> = { name: 80, mobile: 24, time: 40 };

const PHONE = /^\+?[\d\s()-]{10,24}$/;
const digits = (s: string) => s.replace(/\D/g, "").length;

/** Field → error key, for every field that fails. `times` are the allowed preferred times. */
export function validateVisit(v: VisitValues, times: readonly string[]): Partial<Record<VisitField, VisitErrorKey>> {
  const e: Partial<Record<VisitField, VisitErrorKey>> = {};
  if (!v.name.trim()) e.name = "name";
  const m = v.mobile.trim();
  if (!m) e.mobile = "mobileMissing";
  else if (!PHONE.test(m) || digits(m) < 10 || digits(m) > 15) e.mobile = "mobileInvalid";
  if (!times.includes(v.time)) e.time = "time";
  return e;
}
