/**
 * Build guard: a production build for bigtoe.in fails while any member
 * quote in content/quotes.ts is still a draft (no written consent, name and
 * age yet). Preview builds and local builds only warn.
 *
 * "Production for bigtoe.in" means Vercel's production environment
 * (VERCEL_ENV=production) whose production domain (VERCEL_PROJECT_PRODUCTION_URL)
 * or NEXT_PUBLIC_SITE_URL is bigtoe.in. Node 22.6+ reads the .ts file directly.
 */
import { memberQuotes } from "../content/quotes.ts";

const host = (u) => {
  try {
    return new URL(u.startsWith("http") ? u : `https://${u}`).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const isProduction = process.env.VERCEL_ENV === "production";
const domains = [process.env.VERCEL_PROJECT_PRODUCTION_URL, process.env.NEXT_PUBLIC_SITE_URL].filter(Boolean).map(host);
const forBigtoe = isProduction && domains.includes("bigtoe.in");

const drafts = memberQuotes.filter((q) => q.draft);
if (drafts.length) {
  const list = drafts.map((q) => `  - "${q.quote.slice(0, 60)}…"`).join("\n");
  if (forBigtoe) {
    console.error(`\n✖ ${drafts.length} member quote(s) are still drafts (no recorded consent, name and age):\n${list}\n\nRecord consent in docs/copy/testimonials.md, set draft: false and fill in name and age in content/quotes.ts, or remove the quote.\n`);
    process.exit(1);
  }
  console.warn(`⚠ ${drafts.length} member quote(s) are drafts. This is allowed here, but a production build for bigtoe.in will fail.`);
}
