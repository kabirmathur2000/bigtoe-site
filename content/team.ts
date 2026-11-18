/** Team (agreed copy, 18 Nov 2026, with the 18 Nov build brief). */
import { facts } from "./facts";
import type { Accented } from "./site";

const [jay, jeevan, seema, rodrigo] = facts.founders;
const [himanshu, saurav, sumit, tanuj, kabir] = facts.sherpas;

export const team = {
  title: "Team",

  /** 1. Jay's story, text only. */
  why: {
    headline: { text: "Why we built this." } as Accented,
    story: [
      "In 2019, I injured my back at a gym. Six months flat.",
      "One thought stayed: what would my son's life be like if he had to look after me?",
      "You can't buy a new body. So we built BigToe.",
    ],
    signature: "Jay",
  },

  /** 2. The founders: four portrait placeholders. */
  founders: {
    headline: { text: "The four of us." } as Accented,
    line: "We met at Decode, Jeevan's gym. Through his coaching, Sunday get-togethers in the park and taking part in 5k runs as a team, training became part of a shared life. Decode closed during Covid, but that experience stayed with us. It's what we wanted to build on at BigToe.",
    shot: "founder portrait on the training floor (same crop and light for all four)",
    /** Shown above the credential when a founder's card is open (proposed). */
    age: (age: number) => `Age ${age}`,
    more: (name: string) => `More about ${name}`,
    less: (name: string) => `Close ${name}`,
    previous: "Previous founder",
    next: "Next founder",
    people: [
      { ...jay, role: "Co-founder and CEO. Founded the hospitality group behind Hard Rock Cafe India and Shiro." },
      { ...jeevan, role: `Co-founder and Chief Training Officer. ${facts.coachingHours} coaching hours. MSc, Middlesex University London.` },
      { ...seema, role: "Co-founder and Chief Community and Relationship Officer. Founder, Nourish Organics." },
      { ...rodrigo, role: "Co-founder. A career leading finance teams." },
    ],
  },

  /** 3. The Sherpas: Oura's "Sleep and Rest" cards; the plus grows a card and reveals the Sherpa's line. */
  sherpas: {
    headline: { text: "Your Sherpas.", accent: "Sherpas." } as Accented,
    line: "A Sherpa walks the path with you: guiding your movements, keeping you motivated, looking out for your safety and making the journey fun.",
    shot: "Sherpa portrait in the studio (same crop, light and kit for all five)",
    people: [
      { name: himanshu, line: "I keep track of your training and pay attention to how you're feeling each day." },
      { name: saurav, line: "I notice what you're doing well and use that progress to keep you motivated." },
      { name: sumit, line: "I challenge you to give your best, with practical guidance on how to get there." },
      { name: tanuj, line: "I coach patiently, helping you build strength one session at a time." },
      { name: kabir, line: "Our health dictates the bounds of our life. Everyone deserves to be free." },
    ],
    more: (name: string) => `More about ${name}`,
    less: (name: string) => `Close ${name}`,
    previous: "Previous Sherpa",
    next: "Next Sherpa",
    standard: "Every Sherpa trains under Jeevan, and every workout template is his.",
  },
} as const;
