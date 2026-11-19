/**
 * The team (anchor `the-team`), sections 9 to 11 of the one page (agreed
 * copy, 18 Nov 2026, with the 19 Nov one-page brief).
 */
import { facts } from "./facts";
import type { Accented } from "./site";

const [jay, jeevan, seema, rodrigo] = facts.founders;
const [himanshu, saurav, sumit, tanuj, kabir] = facts.sherpas;

export const team = {
  /** 9. The Decode story, one group photo, then a row of four portrait cards. */
  founders: {
    headline: { text: "The four of us.", accent: "four of us." } as Accented,
    line: "We met at Decode, Jeevan's gym. Through his coaching, Sunday get-togethers in the park and taking part in 5k runs as a team, training became part of a shared life. Decode closed during Covid, but that experience stayed with us. It's what we wanted to build on at BigToe.",
    groupShot: "the four founders together in the studio",
    shot: "founder portrait on the training floor (same crop and light for all four)",
    /** Beneath each photo, as the agreed copy writes it: "Jay Singh, 59." */
    title: (name: string, age: number) => `${name}, ${age}.`,
    previous: "Previous founder",
    next: "Next founder",
    rowLabel: "The founders",
    people: [
      { ...jay, role: "Co-founder and CEO. Founded the hospitality group behind Hard Rock Cafe India and Shiro." },
      { ...jeevan, role: `Co-founder and Chief Training Officer. ${facts.coachingHours} coaching hours. MSc, Middlesex University London.` },
      { ...seema, role: "Co-founder and Chief Community and Relationship Officer. Founder, Nourish Organics." },
      { ...rodrigo, role: "Co-founder. A career leading finance teams." },
    ],
  },

  /** 10. The same row, five cards, each name and first-person line beneath. */
  sherpas: {
    headline: { text: "Your Sherpas.", accent: "Your Sherpas." } as Accented,
    line: "A Sherpa walks the path with you: guiding your movements, keeping you motivated, looking out for your safety and making the journey fun.",
    shot: "Sherpa portrait in the studio (same crop, light and kit for all five)",
    previous: "Previous Sherpa",
    next: "Next Sherpa",
    rowLabel: "The Sherpas",
    people: [
      { name: himanshu, line: "I keep track of your training and pay attention to how you're feeling each day." },
      { name: saurav, line: "I notice what you're doing well and use that progress to keep you motivated." },
      { name: sumit, line: "I challenge you to give your best, with practical guidance on how to get there." },
      { name: tanuj, line: "I coach patiently, helping you build strength one session at a time." },
      { name: kabir, line: "Our health dictates the bounds of our life. Everyone deserves to be free." },
    ],
    standard: "Every Sherpa trains under Jeevan, and every workout template is his.",
  },

  /** 11. Jay's story, text only. */
  why: {
    headline: { text: "Why we built this.", accent: "we built this." } as Accented,
    story: [
      "In 2019, I injured my back at a gym. Six months flat.",
      "One thought stayed: what would my son's life be like if he had to look after me?",
      "You can't buy a new body. So we built BigToe.",
    ],
    signature: "Jay",
  },
} as const;
