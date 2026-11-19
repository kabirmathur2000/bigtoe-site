# Space photos

BigToe's own 3D renders of the studio (from the current bigtoe.in). Use them only where the space is the subject, never for people.

Each slot takes the first file found under one of its names:

| File | Slot |
|---|---|
| `hero.jpg` or `training-floor.jpg` | The hero photo, until the real hero photo (a member training with a coach) arrives |
| `table.jpg` or `coffee-bar-render.jpg` | The "Get stronger. Keep the pizza." card (the social table), until the real photo arrives |

The renders carry a burned-in disclaimer along the bottom edge ("3D artistic impressions are indicative of design intent…"); the slots enlarge them 8% from the top so the strip falls outside the frame.

`.jpeg`, `.png`, `.webp` and `.avif` work too. `npm run dev` and `npm run build` pick them up (`scripts/space-photos.mjs`); a slot with no file shows the coffee bar photo.
