"use server";

import { booking } from "@/content/booking";
import { facts } from "@/content/facts";
import { FIELDS, HONEYPOT, MAX_LENGTH, validate, type Values } from "@/lib/booking";

export type SubmitResult = { ok: true } | { ok: false; reason: "invalid" | "failed" };

/** One line, no control characters: safe for an email subject. */
const oneLine = (s: string) => s.replace(/[\r\n\t]+/g, " ").trim();

/**
 * Sends a booking request (first name and WhatsApp number) to CONTACT_EMAIL
 * through Resend. Public form, so no auth; validation and the honeypot run
 * here regardless of what the browser did.
 */
export async function submitBooking(formData: FormData): Promise<SubmitResult> {
  // Honeypot filled: a bot. Pretend it worked and send nothing.
  if (String(formData.get(HONEYPOT) ?? "").trim()) return { ok: true };

  const values = Object.fromEntries(
    FIELDS.map((k) => [k, String(formData.get(k) ?? "").slice(0, MAX_LENGTH[k])]),
  ) as Values;
  if (Object.keys(validate(values)).length) return { ok: false, reason: "invalid" };

  const f = booking.fields;
  const name = oneLine(values.firstName);
  const text = [
    `${f.firstName.label}: ${values.firstName.trim()}`,
    `${f.whatsapp.label}: ${values.whatsapp.trim()}`,
    "",
    `Form: ${booking.heading}`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    // Local development without keys: log instead of sending, so the
    // thank-you step can be tried. In production this is a failure.
    if (process.env.NODE_ENV !== "production") {
      console.info(`[booking] Not sent (RESEND_API_KEY or CONTACT_EMAIL missing):\n${text}`);
      return { ok: true };
    }
    console.error("[booking] RESEND_API_KEY or CONTACT_EMAIL is not set");
    return { ok: false, reason: "failed" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        // A sender on a domain verified in Resend; Resend's test sender until then.
        from: process.env.RESEND_FROM || `${facts.brand} website <onboarding@resend.dev>`,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        subject: oneLine(`${booking.heading}: ${name}`),
        text,
      }),
    });
    if (!res.ok) {
      console.error(`[booking] Resend responded ${res.status}: ${await res.text()}`);
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[booking] Resend request failed", err);
    return { ok: false, reason: "failed" };
  }
}
