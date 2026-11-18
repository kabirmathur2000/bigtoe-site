/**
 * Member quotes for the member card (style tile now, the rebuilt pages
 * next). Every quote stays `draft: true` until the member's written
 * consent, first name and age are recorded; then set `draft: false` and
 * fill in `name` and `age`.
 *
 * Guard: scripts/check-drafts.mjs fails a production build for bigtoe.in
 * while any quote in this list is a draft. Keep this file free of imports
 * so the check can read it directly.
 */
export type MemberQuote = {
  quote: string;
  name: string | null;
  age: number | null;
  draft: boolean;
  /** What the portrait shows, for the placeholder. */
  shot: string;
  /** Where the words come from. */
  source: string;
};

export const memberQuotes: MemberQuote[] = [
  {
    quote:
      "I hadn't exercised in years and was sure I'd be the least fit person in the room. Nobody made me feel it. We started with what I could do.",
    name: null,
    age: null,
    draft: true,
    shot: "Member portrait, relaxed, in the studio (same crop and size for every member)",
    source: "Style tile brief, 18 Nov 2026 (not in docs/copy/testimonials.md)",
  },
  {
    quote:
      "Every session is thoughtful and I've genuinely felt the benefits. In fact I've now enrolled my daughter too which says it all!",
    name: null,
    age: null,
    draft: true,
    shot: "Member portrait, relaxed, in the studio (same crop and size for every member)",
    source: "docs/copy/testimonials.md 4, with \"which says it all!\" added in the brief (not in the member's words)",
  },
  {
    quote:
      "Pickleball on the court. Skiing in the mountains. I've had my share of injuries, but I'm not ready to give up either. I train at BigToe because I want my body to keep up with my appetite for life.",
    name: null,
    age: null,
    draft: true,
    shot: "Member portrait, relaxed, in the studio (same crop and size for every member)",
    source: "Style tile brief, 18 Nov 2026 (not in docs/copy/testimonials.md)",
  },
];
