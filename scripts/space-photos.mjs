/**
 * BigToe's own 3D renders of the space (docs/photos/space/), for the photo
 * slots where the space is the subject: the hero (until the real hero
 * photo) and the social-table card. Never for people.
 *
 * Name the files by slot: hero.jpg and table.jpg (.jpeg, .png, .webp and
 * .avif work too). This copies them to public/photos/space/ (not tracked)
 * and writes content/space-photos.json, which the slots read; a slot with
 * no file shows the coffee bar photo as before. Runs before `dev` and
 * `build`.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

const SLOTS = ["hero", "table"];
const EXT = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
const from = "docs/photos/space";
const to = "public/photos/space";

const files = existsSync(from) ? readdirSync(from) : [];
rmSync(to, { recursive: true, force: true });
const found = {};
for (const slot of SLOTS) {
  const file = files.find((f) => f.toLowerCase().startsWith(`${slot}.`) && EXT.includes(extname(f).toLowerCase()));
  found[slot] = null;
  if (!file) continue;
  mkdirSync(to, { recursive: true });
  copyFileSync(join(from, file), join(to, file));
  found[slot] = `/photos/space/${file}`;
}
writeFileSync("content/space-photos.json", `${JSON.stringify(found, null, 2)}\n`);
const used = SLOTS.filter((s) => found[s]);
console.log(`[space photos] ${used.length ? `using ${used.map((s) => found[s]).join(", ")}` : "none in docs/photos/space yet: the coffee bar photo stands in"}`);
