"use server";

import { facts } from "@/content/facts";
import { tile } from "@/content/style-tile";
import { VISIT_FIELDS, VISIT_HONEYPOT, VISIT_MAX, validateVisit, type VisitValues } from "@/lib/visit";

export type VisitResult = { ok: true } | { ok: false; reason: "invalid" | "failed" };

const oneLine = (s: string) => s.replace(/[\r\n\t]+/g, " ").trim();

/**
 * Sends a first-visit request (name, mobile, preferred time) to
 * CONTACT_EMAIL through Resend. Honeypot and validation run here
 * regardless of the browser.
 */
export async function submitVisit(formData: FormData): Promise<VisitResult> {
  if (String(formData.get(VISIT_HONEYPOT) ?? "").trim()) return { ok: true };

  const values = Object.fromEntries(
    VISIT_FIELDS.map((k) => [k, String(formData.get(k) ?? "").slice(0, VISIT_MAX[k])]),
  ) as VisitValues;
  const f = tile.panel.fields;
  if (Object.keys(validateVisit(values, f.time.options)).length) return { ok: false, reason: "invalid" };

  const text = [
    `${f.name.label}: ${values.name.trim()}`,
    `${f.mobile.label}: ${values.mobile.trim()}`,
    `${f.time.label}: ${values.time}`,
    "",
    `Form: ${tile.panel.heading}`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[visit] Not sent (RESEND_API_KEY or CONTACT_EMAIL missing):\n${text}`);
      return { ok: true };
    }
    console.error("[visit] RESEND_API_KEY or CONTACT_EMAIL is not set");
    return { ok: false, reason: "failed" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || `${facts.brand} website <onboarding@resend.dev>`,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        subject: oneLine(`${tile.panel.heading}: ${values.name}`),
        text,
      }),
    });
    if (!res.ok) {
      console.error(`[visit] Resend responded ${res.status}: ${await res.text()}`);
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[visit] Resend request failed", err);
    return { ok: false, reason: "failed" };
  }
}
