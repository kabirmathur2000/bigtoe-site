/**
 * Home: five screens and the FAQs. Wording as approved in the final plan
 * (17 Nov 2026); facts are imported, never retyped. American spelling.
 */
import { facts, todo } from "./facts";

/** Screen 1 (light, photo). */
export const hero = {
  headline: facts.heroLine,
  line: "A strength studio for life after 40. Post-physio to lifelong athletes.",
  shot: "The studio floor in warm morning light",
} as const;

/** Screen 2 (light, no visual). Deck 1 slide 3 and slide 4 (cut). */
export const sport = {
  headline: "We train for a sport called life.",
  line: "No off-season. No substitutes. Most people play it untrained.",
  link: { label: "Why we built this", href: "/team" },
} as const;

/** Screen 3 (light, photo). The free first hour. */
export const firstHour = {
  headline: "Looking fit isn't being fit.",
  line: "Start with one free hour. A body scan. A session at your pace. Coffee, and a straight talk about what's next.",
  shot: "The coffee corner after a session",
} as const;

/**
 * Screen 4 (navy, photo). Member quotes, one at a time. Placeholders until
 * written consent: first name, age and consent show as TODOs. Quotes 1 to 3
 * and 5 are cut from docs/copy/testimonials.md; quote 4 is not in that file yet.
 */
export const members = {
  headline: "Seen. Belong. Progress.",
  line: "In our members' words.",
  shot: "Sherpas at work on the training floor",
  quotes: [
    { quote: "I look forward to every session, something I never imagined would happen!", todo: null },
    { quote: "It’s that level of attention that makes you feel seen.", todo: null },
    { quote: "Today, I wake up without an alarm, looking forward to coming in.", todo: null },
    {
      quote: "He can absolutely kick your butt during a workout, yet somehow you leave standing tall instead of crawling home!",
      todo: todo("source: this quote is not in docs/copy/testimonials.md"),
    },
    /** testimonials.md has "In fact I've now enrolled my daughter too."; "which says it all!" is not in the member's words. */
    { quote: "I’ve now enrolled my daughter too.", todo: null },
  ].map((q) => ({ ...q, todo: q.todo as string | null })),
  name: todo("first name"),
  age: todo("age"),
  consent: todo("written consent"),
  regionLabel: "Member quotes",
  previous: "Previous quote",
  next: "Next quote",
} as const;

/** Screen 5 (navy, no visual). Price, how it is set, the guarantee. */
export const price = {
  headline: facts.price.range,
  line: facts.price.note,
  guarantee: facts.guarantee,
} as const;

/** FAQs, collapsed, under screen 5 (navy). */
export const faqs = {
  label: "Questions",
  items: [
    {
      q: "Who is BigToe for?",
      /** Deck 1: youngest 40, oldest 69, average 54, 65% women. */
      a: "Our youngest member is 40. Our oldest is 69, so far. Average age 54. About two thirds women. All you need is an open mind.",
    },
    {
      q: "I have an old injury. Is it safe?",
      a: "You fill in a health-history form first. Where it matters, we check with your doctor. Hard is okay. Painful never is.",
    },
    {
      q: "How often will I train?",
      a: `${facts.frequency} Your goal decides. Your Sherpa sets it with you.`,
    },
    {
      q: "What is the Reserve Audit?",
      /** "Strength Reserve Score" (Deck 7); the plan's "Reserve Score" is on the banned-words list. */
      a: "Your first session as a member. We assess mobility and balance, strength, conditioning and body composition. It gives your Strength Reserve Score: our own measure of what your body can do. It tracks capability. It doesn't diagnose.",
    },
  ],
} as const;
