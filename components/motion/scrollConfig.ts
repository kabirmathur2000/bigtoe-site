/**
 * Magnetic scrolling: the one setting to adjust.
 *
 * strength  1    = the page glides to the next chapter on the first movement.
 *           0.75 = the page scrolls normally for the first tenth of a screen,
 *                  then glides the rest of the way (25% gentler).
 *           0.5  = normal scrolling for a fifth of a screen, then the glide.
 *           0    = off: plain smooth scrolling, no glide.
 * duration  seconds the glide takes (about one second feels calm).
 */
export const MAGNET = {
  strength: 0.75,
  duration: 1.0,
} as const;
