/**
 * The style tile, round seven (/style-tile, 18 Nov 2026): screens after
 * ouraring.com, functionhealth.com, soma-health.co and Neko, in BigToe's brand. Copy from
 * docs/copy/agreed-copy-2026-11-18.md and the round-six brief; facts from facts.ts. Lines
 * marked "proposed" are not in the agreed copy and need approval. Not
 * linked, not in the sitemap, noindex. Kept as approved; the live pages
 * were built from it.
 */
import { facts, todo } from "./facts";
import { dials, members, type Accented } from "./site";

export type { Accented };

export type TrainIcon = "balance" | "strength" | "conditioning" | "body";
export type StepIcon = "sherpa" | "audit" | "plan" | "progress";

/** Words that appear once on the whole page, each in one section only. */
export const onceOnly = ["Your first hour is free", "one-to-one", "Reserve Audit"] as const;

export const tile = {
  title: "Style tile",
  /** Every photo slot uses the coffee bar photo until the shoot, cropped per slot. */
  photoAlt: "The BigToe coffee bar: the long wooden table and stools under pendant lamps, the training floor behind",

  /** 1. Hero, after Function's "Check your health.": a full-screen photo. */
  hero: {
    place: facts.address.short.replace(/\.$/, ""),
    headline: { text: "The second half of life should be stronger than the first.", accent: "stronger than the first" } as Accented,
    /** "one-to-one" appears only in What's included. */
    line: "Strength coaching for life after 40.",
  },

  /** 2. Why, after Oura's "Understand your body. Own your health.": text only, centred. */
  why: {
    headline: { text: "We train for a sport called life." } as Accented,
    line: "A suitcase to lift. Unexpected stairs. A trip to say yes to.",
    links: [
      { label: "How we train", href: "/method" },
      { label: "Meet the team", href: "/team" },
    ],
  },

  /** 3. What we train, after Oura's card row. `line` sits on the photo (proposed); `more` is revealed by the plus. */
  train: {
    headline: { text: "What we train." } as Accented,
    previous: "Previous",
    next: "Next",
    moreLabel: (name: string) => `More about ${name}`,
    cards: [
      { name: "Mobility and balance", icon: "balance", line: "Move well. Stay steady.", more: todo("one sentence on mobility and balance"), pos: "18% 50%" },
      { name: "Strength", icon: "strength", line: "Bare feet. Free weights.", more: "What you can lift, push and carry.", pos: "48% 50%" },
      { name: "Conditioning", icon: "conditioning", line: "Keep going for longer.", more: todo("one sentence on conditioning"), pos: "72% 55%" },
      { name: "Body composition", icon: "body", line: "Muscle, measured.", more: "What you're made of.", pos: "90% 45%" },
    ] as { name: string; icon: TrainIcon; line: string; more: string; pos: string }[],
  },

  /** 4. Your first hour, after Function's "Testing is easy" steps. The only place "Your first hour is free" appears. */
  firstHour: {
    headline: { text: "Your first hour is free." } as Accented,
    steps: [
      { title: "Meet a founder.", line: "A chance to talk about your goals and understand how we train." },
      { title: "A body scan and a light assessment.", line: todo("one sentence on the scan and assessment") },
      { title: "Coffee and a chat about what's next.", line: todo("one sentence on the chat") },
    ],
  },

  /** 5. Know your starting point, Soma-style: the text stays put while the dials diagram evolves with scroll. */
  start: {
    headline: { text: "Know your starting point.", accent: "starting point." } as Accented,
    line: "Four dials. One score. Your plan starts with the dial that needs the most attention.",
    /** The only place "Reserve Audit" appears. */
    ...dials,
  },

  /** 6. Your Sherpa, after Function's "Next Steps" glass panel. */
  sherpa: {
    headline: { text: "Your Sherpa. Your plan.", accent: "Your plan." } as Accented,
    rows: [
      { icon: "sherpa", label: "Your Sherpa", line: "A dedicated coach for every session" },
      { icon: "audit", label: "Your starting point", line: "Where your plan begins" },
      { icon: "plan", label: "Your plan", line: "Built from your dials" },
      { icon: "progress", label: "Your progress", line: "Shapes what comes next" },
    ] as { icon: StepIcon; label: string; line: string }[],
  },

  /** Your Sherpas: five round portrait placeholders with first names. */
  sherpas: {
    headline: { text: "Five Sherpas. One standard.", accent: "One standard." } as Accented,
    line: "Every Sherpa trains under Jeevan, and every workout template is his.",
    names: ["Himanshu", "Saurav", "Sumit", "Tanuj", "Kabir"],
    placeholder: "Portrait to come",
  },

  /** Members' words, after Neko's cards: a large photo, the name and age, the quote. Quotes in content/quotes.ts (drafts). */
  members: {
    headline: { text: "In our members' words." } as Accented,
    ...members,
  },

  /** Beyond training: one photo card. */
  beyond: {
    headline: { text: "Get stronger. Keep the pizza.", accent: "Keep the pizza." } as Accented,
    line: "Quarterly lunches, community runs, book readings, lifestyle talks.",
  },

  /** 8. What's included, the shape of Function's pricing card, no price. */
  included: {
    headline: { text: "Everything, one-to-one." } as Accented,
    /** The only place "one-to-one" appears. */
    items: [
      "60-minute sessions with your own Sherpa",
      "Two to four sessions a week, by your goal",
      "Studio, home or online",
      "Six sessions in three weeks, or your money back",
    ],
  },

  /** 9. Questions, after Function's FAQ: one open at a time. */
  questions: {
    headline: { text: "Questions." } as Accented,
    items: [
      {
        q: "Who is BigToe for?",
        a: "Men and women in their 40s, 50s, 60s, 70s and beyond. Whether you're new to training, returning after a break or already active, we start with your ability and your goals. There is no one else's pace to keep up with.",
      },
      {
        q: "I have an old injury or a health condition. Can I train?",
        a: "Tell us in your intake form before your first visit, and check any exercise restrictions with your doctor. We already train members taking GLP-1 medication. We'll discuss what's appropriate for you before you begin.",
      },
      { q: "What does it cost?", a: facts.price },
    ],
    all: { label: "See all questions →", href: "/faq" },
  },

  /** 10. Ending, after Function's closing: two lines, the button, the footer. */
  ending: {
    headline: { text: "Come and meet us. Stay for coffee.", accent: "Stay for coffee." } as Accented,
    hours: facts.hours,
  },

} as const;
