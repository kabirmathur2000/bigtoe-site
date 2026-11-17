/**
 * Team (Version C, 17 Nov 2026): three screens. 1 to 2 light; 3 navy.
 */
import { facts, todo } from "./facts";

/** Screen 1 (light, no photo). Jay's story, signed "Jay". */
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

const founderLines: Record<string, string[]> = {
  "Jay Singh": ["Co-founder and CEO.", "Three decades in hospitality, including Hard Rock."],
  "Jeevan Aujla": ["Chief Training Officer.", `Coaching real people for ${facts.coachingHours} hours. MSc, Middlesex University London.`],
  "Seema Jindal": ["Chief Community and Relationship Officer.", "Founder, Nourish Organics."],
  "Rodrigo Pérez": ["Co-founder.", "20 years leading finance teams."],
};

/** Screen 2 (light, four founder portraits: same crop and light, on the training floor). */
export const founders = {
  headline: "The four of us.",
  values: [
    "Rooted in fundamentals, not trends.",
    "Real in how we show up: honest and present.",
    "Rebellious in refusing to accept that decline is inevitable.",
  ],
  people: facts.founders.map((f) => ({
    name: `${f.name}, ${f.age}.`,
    role: founderLines[f.name][0],
    background: founderLines[f.name][1],
    shot: `Portrait of ${f.name.split(" ")[0]}, co-founder, on the training floor (same crop and light as the others)`,
  })),
} as const;

/** Screen 3 (navy): five Sherpa portraits (same crop, light and kit), then Jeevan, then one member quote. */
export const sherpas = {
  headline: "Your Sherpas.",
  line: "On Everest, a Sherpa walks the path with you, all the way up.",
  role: "Sherpa",
  todo: todo("confirm Sherpa name spellings"),
  people: [
    { name: "Himanshu", line: "I help you break through your own limits and build genuine self-belief." },
    { name: "Saurav", line: "I know what it feels like to believe life is stuck. I help you reclaim yours." },
    { name: "Sumit", line: "Once cycled 140 km in 8 hours. Now I make fitness enjoyable enough to last." },
    { name: "Tanuj", line: "I know the pain of feeling incapable. You can do far more than you think." },
    { name: "Kabir", line: "Our health dictates the bounds of our life. Everyone deserves to be free." },
  ].map((p) => ({ ...p, shot: `Portrait of ${p.name}, Sherpa (same crop, light and kit as the others)` })),
  jeevan: "Every Sherpa trains under Jeevan, and every workout template is his.",
  quote: {
    text: "Jeevan can absolutely kick your butt during a workout, yet somehow you leave standing tall instead of crawling home!",
    shot: "Member portrait: plain wall, same distance as the Home portraits",
    name: todo("first name"),
    age: todo("age"),
    source: todo("source: not in docs/copy/testimonials.md"),
  },
} as const;
