/**
 * Guided scrolling: one gesture, one screen. Any wheel tick, swipe, or
 * arrow or page key glides to the next screen straight away; further input
 * is ignored until the glide has settled.
 *
 * duration  seconds the glide takes (about one second feels calm).
 */
export const GLIDE = {
  duration: 1.0,
} as const;
