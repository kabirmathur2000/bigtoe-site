/** Home (agreed copy, 18 Nov 2026, with the 18 Nov build brief). */
import { facts } from "./facts";
import type { Accented } from "./site";

export const home = {
  /** 1. Hero, Function style: a full-screen photo, a navy gradient, the words on it. */
  hero: {
    place: facts.address.short,
    /** Only the full stop in terracotta: no terracotta text on the orange wood. */
    headline: { text: facts.heroLine, accent: "." } as Accented,
    line: "One-to-one training for life after 40.",
    shot: "a real member training with a coach, the studio around them",
  },

  /** 2. Text only, centred. */
  why: {
    headline: { text: "We train for a sport called life." } as Accented,
    lines: ["A suitcase to lift. Unexpected stairs. A trip to say yes to.", "Build the strength for what comes next."],
    link: { label: "How we train", href: "/method" },
  },

  /** 3. The split: text left, one photo card right. The navy switch begins here. */
  coach: {
    headline: { text: "Your coach. Your plan.", accent: "Your plan." } as Accented,
    line: "A dedicated coach guides you through every session. Your Reserve Audit sets the starting point. Your progress shapes what comes next.",
    link: { label: "Meet the team", href: "/team" },
    shot: "one coach guiding one member: the attention and interaction, not the equipment",
  },

  /** 4. Neko-style member cards (quotes in content/quotes.ts). */
  members: {
    headline: { text: "In our members' words." } as Accented,
  },

  /** 5. One photo card. */
  pizza: {
    headline: { text: "Get stronger. Keep the pizza.", accent: "Keep the pizza." } as Accented,
    line: "A healthier life shouldn't mean giving up the things you enjoy.",
    shot: "members around the social table, talking and laughing",
  },

  /** 6. Function's three steps, titles only. */
  firstHour: {
    headline: { text: "Your first hour." } as Accented,
    steps: ["Meet a founder.", "A body scan and light assessment.", "Coffee and a chat."],
  },

  /** 7. The ending: the invitation, the price, the free hour, the guarantee, the button. */
  ending: {
    headline: { text: "Come and meet us.", accent: "meet us." } as Accented,
    price: facts.price,
    free: facts.firstHourFree,
    guarantee: facts.guarantee,
  },
} as const;
