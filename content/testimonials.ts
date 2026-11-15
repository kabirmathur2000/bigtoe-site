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
