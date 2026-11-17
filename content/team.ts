/**
 * Team: four screens. Wording as approved in the final plan (17 Nov 2026).
 */
import { todo } from "./facts";

/** Screen 1 (light, no visual). Jay's story, as cut for the final plan. */
export const story = {
  headline: "Why we built this.",
  paragraphs: [
    "In 2019, I injured my back at a gym. Six months flat.",
    "One thought stayed: what would my son’s life be like if he had to look after me?",
    "You can’t buy a new body. So we built BigToe.",
  ],
  signature: "Jay",
  /** CLAUDE.md, still open. */
  todo: todo("Jay's son to see this story before it goes public"),
} as const;

/** Screen 2 (light, the four founder portraits). Values from Deck 1 slide 7. */
export const founders = {
  headline: "The four of us.",
  /** "pretence" in the plan, in American spelling. */
  values: [
    "Rooted in fundamentals, not trends.",
    "Real in how we show up: honest, present, without pretense.",
    "Rebellious in refusing to accept that decline is inevitable.",
  ],
  people: [
    { name: "Jay Singh, 59.", role: "Co-founder.", todo: null },
    { name: "Jeevan Aujla.", role: "Chief Training Officer. UK-certified. Over 20,000 hours coaching real people.", todo: null },
    { name: "Seema Jindal.", role: null, todo: todo("role, one line") },
    { name: "Rodrigo Pérez.", role: null, todo: todo("role, one line") },
  ].map((p) => ({
    ...p,
    role: p.role as string | null,
    todo: p.todo as string | null,
    shot: `Portrait of ${p.name.split(" ")[0]}, co-founder, on the training floor`,
  })),
} as const;

/** Screen 3 (navy, four Sherpa portraits). First names only. */
export const sherpas = {
  headline: "Your Sherpas.",
  todo: todo("confirm Sherpa name spellings"),
  people: ["Himanshu", "Saurav", "Sumit", "Tanuj"].map((name) => ({
    name,
    shot: `Portrait of ${name}, Sherpa, on the training floor`,
  })),
} as const;
