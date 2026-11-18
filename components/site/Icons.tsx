/** Simple line icons, 1.5px strokes in the current text colour, drawn on a 24px grid. */
const paths = {
  // A figure standing on one leg.
  balance: "M12 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12 8v6m0 0-2 7m2-7 4 3M6 10.5h12",
  // A dumbbell.
  strength: "M3 12h18M6.5 8v8M9.5 6.5v11M14.5 6.5v11M17.5 8v8",
  // A pulse line.
  conditioning: "M3 12h4l2-5 4 10 2-5h6",
  // A dial: an arc with a needle.
  body: "M4.5 16a7.5 7.5 0 1 1 15 0M12 16l3.5-4.5M4.5 19h15",
  // One person beside another.
  sherpa: "M9 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 21v-2a6 6 0 0 1 12 0v2M17 4.5a2.5 2.5 0 0 1 0 5M18.5 14a5 5 0 0 1 2.5 4.5V21",
  // A target.
  audit: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 12h.01",
  // A list.
  plan: "M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01",
  // A rising line.
  progress: "M3 17l6-6 4 4 8-8M15 7h6v6",
  // A flexed arm.
  muscle: "M3 20h12.5a4.5 4.5 0 0 0 4.5-4.5V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v5.5C13.5 8.5 11 7 8.5 7.5 5.5 8 3.5 10.5 3 13.5Z",
  // A lightning bolt.
  power: "M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z",
  plus: "M12 5v14M5 12h14",
  close: "M6 6l12 12M18 6 6 18",
  check: "M5 12.5l4.5 4.5L19 7.5",
  left: "M15 5l-7 7 7 7",
  right: "M9 5l7 7-7 7",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  );
}
