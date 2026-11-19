/**
 * The one page, first part and last part (agreed copy, 18 Nov 2026, with
 * the 19 Nov one-page brief): the hero, "We train for a sport called
 * life.", "Get stronger. Keep the pizza.", the members' words heading and
 * "Come and meet us." The method is in content/method.ts, the team in
 * content/team.ts, the questions in content/faq.ts.
 *
 * Every section headline carries its key words (3 to 4) in terracotta.
 */
import { facts } from "./facts";
import { anchors, type Accented } from "./site";

export const home = {
  /** 1. Hero: a pinned full-screen photo, a navy band on its lower 40%, the words in it. No button. */
  hero: {
    headline: { text: facts.heroLine, accent: "stronger than the first." } as Accented,
    line: "One-to-one training for life after 40.",
    /** A small plain caption at the photo's bottom left. */
    place: facts.address.short,
    shot: "a real member training with a coach, the studio around them",
  },

  /** 2. Why BigToe. Text only, then two jump links. */
  why: {
    headline: { text: "We train for a sport called life.", accent: "a sport called life." } as Accented,
    lines: ["A suitcase to lift. Unexpected stairs. A trip to say yes to.", "Build the strength for what comes next."],
    links: [
      { label: "How we train", id: anchors.method },
      { label: "Meet the team", id: anchors.team },
    ],
  },

  /** 3. The headline and line, then one photo card. */
  pizza: {
    headline: { text: "Get stronger. Keep the pizza.", accent: "Keep the pizza." } as Accented,
    line: "A healthier life shouldn't mean giving up the things you enjoy.",
    shot: "members around the social table, talking and laughing",
  },

  /** 12. Member stories (the quotes are in content/quotes.ts). */
  members: {
    headline: { text: "In our members' words.", accent: "our members' words." } as Accented,
  },

  /** 14. The invitation and the agreed lines. No button: the header pill books. */
  visit: {
    headline: { text: "Come and meet us.", accent: "Come and meet us." } as Accented,
    lines: [
      "Meet a founder. Have a body scan and light assessment. Stay for coffee and a chat.",
      facts.price,
      facts.firstHourFree,
    ],
    guarantee: facts.guarantee,
  },
} as const;
