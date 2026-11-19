# Space photos

BigToe's own 3D renders of the studio (from the current bigtoe.in), with the "3D artistic impressions" caption cropped off the bottom. Use them only where the space is the subject, never for people, and only until the real photos arrive (both are on the shot list as "replace with real photo"). The hero keeps the coffee bar photo.

Each slot takes the first file found under one of its names:

| File | Slot |
|---|---|
| `coach.jpg` or `training-floor.jpg` | The photo card under "Your coach. Your plan." |
| `table.jpg` or `coffee-bar-render.jpg` | The "Get stronger. Keep the pizza." card |

`.jpeg`, `.png`, `.webp` and `.avif` work too. `npm run dev` and `npm run build` pick them up (`scripts/space-photos.mjs`); a slot with no file shows the coffee bar photo. Crop any caption off a new render before adding it.
