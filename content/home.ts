/**
 * Home (Version C, 17 Nov 2026): six screens and the FAQs. Screens 1 to 3
 * light; 4 to 6, the FAQs and the footer navy. Facts are imported, never
 * retyped. American spelling.
 */
import { facts, todo } from "./facts";

/** Screen 1 (light, photo). */
export const hero = {
  headline: facts.heroLine,
  line: "Not a gym. A strength studio for life after 40.",
  /** Small caption on the photo, bottom left. */
  caption: `${facts.address.short}.`,
  /** docs/photos/studio-coffee-bar.jpg, compressed into public/photos. Alt text describes the photo. */
  photo: {
    alt: "The BigToe coffee bar: a long wooden table and stools under pendant lamps, the BigToe logo on the wall, the training floor behind",
    /** Crop per screen (object-position): phones keep the logo wall and table; wide screens centre on the table and logo, with the floor in view. */
    phone: "14% 52%",
    wide: "50% 52%",
  },
} as const;

/** Screen 2 (light, no photo). */
export const sport = {
  headline: "We train for a sport called life.",
  line: "Decline is the default. Not a destiny.",
  link: { label: "Why we built this →", href: "/team" },
} as const;

/** Screen 3 (light, photo). */
export const score = {
  headline: "Looking fit isn't being fit.",
  line: "Your Reserve Score, out of 100. Measured, trained, retested every sixteen sessions.",
  shot: "A member at the coffee corner, real cups and chairs",
} as const;

/**
 * Screen 4 (navy). Three quotes, each under its word, with a member
 * portrait placeholder. Placeholders until written consent: first name and
 * age show as TODOs.
 */
export const members = {
  headline: "Seen. Belong. Progress.",
  line: "Don't believe us? Ask them.",
  quotes: [
    {
      word: "Seen.",
      /** docs/copy/testimonials.md, testimonial 2 (cut). */
      quote: "It’s that level of attention that makes you feel seen.",
      source: null,
    },
    {
      word: "Belong.",
      quote: "It’s more than a place. It’s family.",
      source: todo("source: not in docs/copy/testimonials.md"),
    },
    {
      word: "Progress.",
      /** docs/copy/testimonials.md, testimonial 3 (cut). */
      quote: "Today, I wake up without an alarm, looking forward to coming in.",
      source: null,
    },
  ].map((q) => ({ ...q, source: q.source as string | null })),
  /** Same plain wall, same distance, for all three. */
  shot: (word: string) => `Member portrait for "${word.replace(".", "")}": plain wall, same distance as the others`,
  name: todo("first name"),
  age: todo("age"),
} as const;

/** Screen 5 (navy, photo). */
export const social = {
  headline: "Get stronger. Keep the pizza.",
  line: "Coffee at the social table. Pizza and beer, once a quarter.",
  shot: "A member laughing mid-session",
} as const;

/** Screen 6 (navy, no photo). Two supporting lines. */
export const price = {
  headline: facts.price.range,
  lines: [facts.firstHour, facts.guarantee],
} as const;

/** FAQs, collapsed, under screen 6 (navy). */
export const faqs = {
  label: "Questions",
  items: [
    {
      q: "Can someone like me actually do this?",
      a: "Yes. Some of our members haven't trained in years. Some never have. Your Sherpa starts where you are, not where you think you should be.",
    },
    {
      q: "I have an old injury. Is it safe?",
      a: "You fill in a health-history form first. Where it matters, we check with your doctor. Hard is okay. Painful never is.",
    },
    {
      q: "What if I can't make it?",
      a: `Life gets busy. Move a session to a time that works for you, train online, or pause when you travel. ${facts.guaranteeRule}`,
    },
    {
      q: "I'm on a GLP-1 medication. Is this for me?",
      a: "Your doctor decides what's right for you. What we do is measure and train. Your Reserve Audit tracks strength and body composition, so you can see what your body is keeping, not just what it's losing.",
    },
    {
      q: "Do you offer nutrition and blood tests?",
      a: "Yes, as an option, for an added fee. Add a functional nutritionist and blood markers, and your Sherpa builds them into your program.",
    },
    {
      q: "What is the Reserve Audit?",
      a: "Your first session as a member, after your free hour, and deeper than its body scan. We assess mobility and balance, strength, conditioning and body composition. It gives your Reserve Score, out of 100: our own measure of what your body can do. It's your starting line, not a grade. It doesn't diagnose.",
    },
  ],
} as const;
