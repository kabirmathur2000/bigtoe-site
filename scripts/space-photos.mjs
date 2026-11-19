/**
 * BigToe's own 3D renders of the space (docs/photos/space/), for the photo
 * slots where the space is the subject: the hero (until the real hero
 * photo) and the social-table card. Never for people.
 *
 * Each slot takes the first file found under one of its names (any of
 * .jpg, .jpeg, .png, .webp, .avif): hero (hero, training-floor) and table
 * (table, coffee-bar-render). This copies them to public/photos/space/ (not tracked)
 * and writes content/space-photos.json, which the slots read; a slot with
 * no file shows the coffee bar photo as before. Runs before `dev` and
 * `build`.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

/** Slot → the file names it accepts, in order. */
const NAMES = { hero: ["hero", "training-floor"], table: ["table", "coffee-bar-render"] };
const SLOTS = Object.keys(NAMES);
const EXT = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
const from = "docs/photos/space";
const to = "public/photos/space";

const files = existsSync(from) ? readdirSync(from) : [];
rmSync(to, { recursive: true, force: true });
const found = {};
for (const slot of SLOTS) {
  const ok = (f) => EXT.includes(extname(f).toLowerCase());
  const file = NAMES[slot].map((n) => files.find((f) => ok(f) && f.toLowerCase() === `${n}${extname(f).toLowerCase()}`)).find(Boolean);
  found[slot] = null;
  if (!file) continue;
  mkdirSync(to, { recursive: true });
  copyFileSync(join(from, file), join(to, file));
  found[slot] = `/photos/space/${file}`;
}
writeFileSync("content/space-photos.json", `${JSON.stringify(found, null, 2)}\n`);
const used = SLOTS.filter((s) => found[s]);
console.log(`[space photos] ${used.length ? `using ${used.map((s) => found[s]).join(", ")}` : "none in docs/photos/space yet: the coffee bar photo stands in"}`);
