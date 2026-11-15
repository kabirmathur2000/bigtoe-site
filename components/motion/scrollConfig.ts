/**
 * Magnetic scrolling: the one setting to adjust.
 *
 * strength  1   = the page glides to the next chapter on the first movement.
 *           0.5 = the visitor scrolls about a fifth of a screen first.
 *           0   = off: plain smooth scrolling, no glide.
 * duration  seconds the glide takes (about one second feels calm).
 */
export const MAGNET = {
  strength: 1,
  duration: 1.0,
} as const;
