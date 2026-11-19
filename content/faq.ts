/**
 * The questions (anchor `questions`, section 13 of the one page). The ten
 * agreed questions word for word (docs/copy/agreed-copy-2026-11-18.md),
 * then three drafted from facts on the site (18 Nov brief), with TODOs
 * where a fact needs confirming.
 */
import { facts, todo } from "./facts";
import type { Accented } from "./site";

export type Question = { q: string; a: string };

export const faq = {
  headline: { text: "Questions.", accent: "Questions." } as Accented,
  items: [
    {
      q: "Who is BigToe for?",
      a: "Men and women in their 40s, 50s, 60s, 70s and beyond. Whether you're new to training, returning after a break or already active, we start with your ability and your goals. There is no one else's pace to keep up with.",
    },
    {
      q: "I have an old injury or a health condition. Can I train?",
      a: "Tell us in your intake form before your first visit, and check any exercise restrictions with your doctor. We already train members taking GLP-1 medication. We'll discuss what's appropriate for you before you begin.",
    },
    {
      q: "Who trains me, and how do you decide what I need?",
      a: "A dedicated coach, whom we call a Sherpa, guides you through every session. Your plan starts with the Reserve Audit: body composition, balance and mobility, functional strength, and conditioning. We review your progress together and adjust your training as you go.",
    },
    {
      q: "How long is a session, and what does it cover?",
      a: "Sessions are 60 minutes. Every one works on mobility, strength and conditioning together, making the most of your training time. We recommend training two to four times a week.",
    },
    {
      q: "How many people train at the same time?",
      a: `We train up to ${facts.membersAtOnce} members at a time, each one-to-one with their own Sherpa.`,
    },
    {
      q: "How do I schedule or change a session?",
      a: "You'll have regular slots that are yours. Need to move one? Change it by the day before. And when you travel, train online or pause until you're back.",
    },
    {
      q: "What does it cost?",
      a: `${facts.price} ${facts.firstHourFree} Nutrition support and blood work are available at an additional cost.`,
    },
    {
      q: "What if BigToe isn't for me?",
      a: facts.guaranteeFull,
    },
    {
      q: "Is there a community beyond training?",
      a: "Yes. Quarterly Vinyl Nights, community runs, book readings, lifestyle talks and beer-and-pizza lunches. Different reasons to get together, share an interest and get to know the people you train alongside.",
    },
    {
      q: "What happens at my first visit?",
      a: "You'll meet a founder, have a body scan and a light assessment, and stay for coffee and a chat. It's a chance to talk about your goals and understand how we train. The team will confirm your preferred time.",
    },
    // Drafted from facts on the site (18 Nov brief).
    {
      q: "What should I wear and bring?",
      a: `Comfortable clothes you can move in. We train barefoot, so no trainers needed. Water and towels are ready for you. ${todo("confirm towels and water are provided")}`,
    },
    {
      q: "Will I be training in front of other people?",
      a: `No more than ${facts.membersAtOnce} members train at a time, each with their own Sherpa. There is no open gym floor and nobody watching from the sidelines.`,
    },
    {
      q: "How does membership work? Can I pause it?",
      a: `Membership is monthly, by how often you train. When you travel, train online or pause until you're back. ${todo("confirm monthly billing and pause rules")}`,
    },
  ] as Question[],
};

const [who, injury, trainer, session, howMany, schedule, cost, notForMe, community, firstVisit, wear, others, membership] = faq.items;

/** The thirteen in four groups, each under a small label with its own expandable rows. */
export const faqGroups: { label: string; items: Question[] }[] = [
  { label: "Getting started", items: [who, firstVisit, wear] },
  { label: "Training", items: [trainer, session, others, howMany] },
  { label: "Health and safety", items: [injury] },
  { label: "Membership", items: [cost, membership, schedule, notForMe, community] },
];

