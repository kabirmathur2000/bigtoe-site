/**
 * Member testimonials, verbatim from docs/copy/testimonials.md.
 * No consent recorded yet: name and age stay visible TODOs.
 */
import { todo } from "./facts";

/** Testimonial 1. Off Home; kept for Team or Book. Its "!" is the member's own. */
export const pride = {
  quote:
    "A space where those of us in our 40s, 50s and 60s can genuinely feel pride and joy. I look forward to every session, something I never imagined would happen!",
  name: todo("first name"),
  age: todo("age"),
} as const;

/** Testimonial 2: the Sherpa who noticed. Home, chapter 5. */
export const noticed = {
  quote:
    "Once I was absentmindedly rubbing my arm after an exercise, and he picked up on it instantly, checked on me throughout the class, and adjusted the workout. It's that level of attention that makes you feel seen.",
  name: todo("first name"),
  age: todo("age"),
} as const;

/** Testimonial 3 (spare). */
export const wakeUp = {
  quote:
    "Today, I wake up without an alarm, looking forward to coming in. Even on holiday, I continue with my mobility exercises.",
  name: todo("first name"),
  age: todo("age"),
} as const;

/** Testimonial 4 (spare). */
export const enrolled = {
  quote:
    "Every session is thoughtful and I've genuinely felt the benefits. In fact I've now enrolled my daughter too.",
  name: todo("first name"),
  age: todo("age"),
} as const;

/**
 * Home, after the word cloud: one card per quote in
 * docs/copy/testimonials.md, in its order. None has written consent yet,
 * so every card shows a consent TODO; none may go live until it is recorded.
 */
export const memberQuotes = {
  regionLabel: "Member quotes",
  previous: "Previous quote",
  next: "Next quote",
  consent: todo("written consent"),
  items: [pride, noticed, wakeUp, enrolled],
} as const;
