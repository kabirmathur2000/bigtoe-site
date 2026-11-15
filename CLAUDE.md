@AGENTS.md

# BigToe website: rulebook

A four-page site in Next.js on Vercel: **Home (`/`), Method (`/method`), Team (`/team`), Book (`/book-now`).** One job: get the visitor to book the free first visit. The look is quiet luxury in the deck colours: large photographs of real members, generous space, editorial type and slow, smooth scroll transitions.

Sources, in order of authority:
1. `docs/website-guide.md` (the guide), including the decisions table below.
2. The decks in `docs/decks/` (Decks 0 to 11 and Cheat Sheets).
3. `docs/copy/` (facts, Jay's story, testimonials).

Where the live Framer site disagrees with these, the live site is out of date. Where a deck disagrees with the decisions table, the decisions table wins (see "Deck vs guide" below).

---

## Standing rules

1. **All BigToe wording comes from the decks or the guide.** Never invent claims, statistics, prices or member quotes. If something is missing, put a visible TODO in the content file (rendered on the page as `TODO: …`) and list it at the end of your reply.
2. **Every reusable fact lives in `content/facts.ts` and is imported.** Price, guarantee, address, hours, email, WhatsApp, button label, session length, frequency and the like are never typed twice.
3. **All page copy lives in `content/*.ts`, never inside components.** Components take copy as props or import it from `content/`. No sentences of copy in `.tsx` files.
4. **No health promises.** Nothing that says prevent, reverse, cure or live longer; nothing "inevitable"; no medical or diagnostic language.
5. **One button label everywhere:** `facts.ctaLabel` (BOOK YOUR FREE FIRST VISIT). Never a variant.
6. **Member quotes are verbatim,** with first name, age and written consent. No consent recorded in `docs/copy/testimonials.md`, no quote on the page.
7. **No real photos of people we don't have consent for.** Mood-board images (film stills, public figures) never go on the site. Until the shoot, use grey placeholders sized for the final photo, with alt text describing the shot the shot list calls for.
8. **Work one piece per prompt,** check at 375px and 1440px, and stop to show the result.

---

## If any other design skill or plugin is active

CLAUDE.md wins. Colours, typeface, button label, page structure and
all wording come from this file and the decks. Another skill may
improve spacing, hierarchy, contrast and motion quality, but may not
introduce new colours, fonts, copy, sections or decorative elements.
Hairline rules only; no shadows, gradients or pill buttons.

---

## Decisions already made

From Jay's conversation and the decks. The site is built on these.

| Topic | Decision |
| --- | --- |
| Hero line | "The second half of life should be the stronger half." "Design Your Future Self" is dropped. |
| Scarcity | None. No opening date, Founding 30, member cap or "prices will rise". |
| First step | A free 60-minute first visit, then coffee. The full Reserve Audit follows in sessions 2 to 4. |
| Button | BOOK YOUR FREE FIRST VISIT, the same label everywhere. Wording assumed; see open items. |
| Price | ₹25,000 to ₹45,000 a month, set after the audit, given in writing before commitment. |
| Guarantee | 30 days, money back. Exact wording still to confirm. |
| Frequency | 2, 3 or 4 sessions a week by goal; set with the Sherpa, not listed as a menu. |
| Two paths | Mobility & Conditioning or Strength & Conditioning; one line on Method only. |
| Training | Built on mobility and balance, strength, and conditioning. No minute-by-minute breakdown. |
| What fades | Muscle, strength and power. |
| Nutrition | Say nothing until the programme is built. |
| 1:23 rule | Removed. |
| Founder story | Jay's story only, about 80 words, top of Team. Other founders one line each. |
| Sherpas | Shown first on Team. |
| Testimonials | Four of the eleven, each with first name, age and written consent. |
| Contact | WhatsApp or email. No parking at the studio. |
| Length | Short. The benchmark is Peter Attia's 10 Squared site. |
| Book page | Lives at `/book-now`. Every button links there via `facts.bookHref`. |

**Brand, locked:** logo is navy with a terracotta mark and the tagline "Practice Possibility". Navy `#0A212D`, terracotta `#D4644D`, warm off-white `#F0EEEB`. Typeface Anderson Grotesk (Light, Regular, Bold, Ultrabold).

---

## Site structure

Four pages, one job: get the visitor to book the free first visit.

### Home: five blocks and a form

1. **Hero.** "The second half of life should be the stronger half." Full-width photo or silent video of a real member with a Sherpa beside them. One button.
2. **The problem.** "The problem isn't your age. It's the narrative." Then: "We train for a sport called life." Then one line: muscle, strength and power fade quietly; they can be built at any age.
3. **Find Your Pattern.** The four patterns as tappable cards with a member photo each, followed by one testimonial. The four patterns are the four personas (Deck 1 slide 19, Deck 3 slide 8): Never trained (feel safe, win early); Life got in the way (easy timing changes, home or online sessions); Train but don't progress (progress they can see); Start and stop (an easy restart, with no blame). Testimonial 1 from `docs/copy/testimonials.md` follows.
4. **Your first hour.** The first visit is free: an hour with a Sherpa. Then, in sessions 2 to 4, the Reserve Audit: about 60 minutes, four dials (body composition, balance and mobility, functional strength, conditioning), you leave with your Strength Reserve Score, then coffee. Then "Seen. Belong. Progress." with testimonial 2 (the Sherpa who noticed).
5. **Investment.** First step is free. The price range. The guarantee.
6. **Form.** First name; WhatsApp number or email; "By day 120, I want to be able to…"; anything we should know. A WhatsApp button beside it.

### Method: five short blocks and eight questions

Every line comes from Decks 1, 4, 5 and 7, using the decks' own "say it to a member" wording.

- **Strength Reserve.** "Every sport has a score. This is ours." The gap between what you can do and what life asks, scored out of 100.
- **What fades.** Muscle, strength and power, told with the house and light-bulb picture (Deck 1 slides 10 to 11). Power goes first.
- **How we train.** Barefoot, because it all starts with the big toe. Free weights, no machines. Mobility, strength and cardio in one supervised hour. Seven movement patterns, each tied to an ordinary day: squat is getting out of a car, hinge is lifting a bag off the floor (Deck 4 slide 14).
- **Two paths.** Mobility & Conditioning or Strength & Conditioning. "Neither path is better. We start where you are today."
- **Test, train, retest.** The six-step loop: test, sort, set goals, pledge, train, review, every 16 sessions. "We sell outcomes, not sessions." Reuses the pinned-scroll pattern from Home block 4.
- **Eight collapsed questions,** grouped as fit, money, logistics and trust. Deck 4 slide 21 answers four (twice a week, why strength, heavy lifting at my age, stretching). One confirms studio, home or online sessions at no extra charge (Deck 5). Draft the list and get approval before building.

**Three interactive pieces, all from Deck 7:**

- **The four dials.** Body composition (InBody), Balance & Mobility, Functional Strength and Conditioning, each out of 100, animating to an example score. "Your Strength Reserve is only as good as your weakest dial. That is where we start."
- **Same score, different person.** Two example members both score 69; one has dials of 78, 42, 90 and 66, the other 69, 69, 69, 69. Tap to see why the dials matter more than the total.
- **Every test is a job your body does in daily life.** Tap a test to see its job: floor rise is getting up off the floor on your own; dead hang is holding on to a handrail or a heavy bag; farmer's carry is carrying the shopping in from the car. Use the Deck 7 slide 7 to 10 wording for the others.

### Team

- **Why we built this.** Jay's story from `docs/copy/jay-story.md`, verbatim.
- **Sherpas.** Portrait, first name and one-line story each, from Deck 1 slide 25 (Himanshu, Saurav, Sumit, Tanuj).
- **Founders.** Jeevan, Seema and Rodrigo at one line each (Deck 1 slide 8).
- **The social space.** Coffee table, the clap, the Bell, Pizza & Beer, in photos.

### Book (`/book-now`)

- **The same form as Home,** so it can be shared as a link on WhatsApp.
- **Address, hours, map,** and "There's no parking at the studio. Come by cab or get dropped off."

### Redirects

- `/membership` → `/` and `/faqs` → `/method`, permanent.

---

## Look: design direction

**Brief: wealthy, professional and high class, yet welcoming and warm, with modern transitions and flow.** Luxury comes from restraint: fewer elements, more space, larger photographs, slower movement. Warmth comes from faces, first names and coffee.

### Colour

- **Deck colours only.** No new colours. Tokens: `--color-navy #0A212D`, `--color-terracotta #D4644D`, `--color-offwhite #F0EEEB`. Tints for hairlines and secondary text are made from these with opacity, not new hues.
- **Proportions:** roughly 70% off-white, 20% navy, 10% terracotta.
- **Terracotta is for the button and one accent per screen.**
- **Navy sections are rare, like stepping into an evening lounge.** At most two navy sections on any page, never adjacent, with at least two off-white sections between them. Home has one: the form (block 6). The footer is off-white.
- **Colour changes between sections are rare and gentle.** The cross-fade runs over about 60% of the viewport height so the page never jumps. Our members are over 40; nothing on the page should startle.
- **No gradients, no drop shadows, no glossy effects.** Thin hairline rules instead.

### Core beliefs

The two core beliefs, quoted from Deck 1, are "We train for a sport called life." and "The second half of life should be the stronger half." Use them exactly.

### Logo

- The logo appears with the tagline "Practice Possibility" at least once per page (the LogoTag file, `docs/logo/B&O BT Logo+Tag.png`, served as `public/brand/logo-tag.png`). It sits in the footer.
- Sizes: 44px tall in the header on desktop, 36px on mobile, larger in the footer (about twice the header size).
- Both logo files are navy, so they go on off-white only. A light (off-white) version is needed before the logo can sit on navy.

### Typography

- **Anderson Grotesk throughout,** self-hosted from `public/fonts` (licence for web use still to confirm).
- **Headlines Light or Regular, 64 to 88px on desktop,** sentence case, tight line spacing (about 1.05).
- **Bold only for small spaced-out labels above headlines** (the deck device, e.g. "THE CORE BELIEF"): about 12 to 13px, uppercase, letter-spacing about 0.16em.
- **Body 18 to 20px Regular,** left-aligned, lines no longer than about 65 characters.

Type scale (fluid, mobile → desktop):

| Token | Size | Weight | Line height |
| --- | --- | --- | --- |
| `display` | 48 → 88px | Light | 1.02 |
| `h1` | 40 → 64px | Light | 1.05 |
| `h2` | 32 → 44px | Regular | 1.1 |
| `h3` | 22 → 26px | Regular | 1.25 |
| `body-lg` | 20px | Regular | 1.55 |
| `body` | 18px | Regular | 1.6 |
| `caption` | 14px | Regular | 1.45 |
| `label` | 12 → 13px | Bold, uppercase, 0.16em | 1.3 |

### Space and layout

- **One idea per screen.** Each block fills most of a screen: one headline, a few lines, one photograph.
- **Section gaps:** about 140px on desktop, 80px on mobile (`--space-section`).
- **Side gutters:** 20px on mobile, 48px tablet, 64px desktop.
- **Containers:** `wide` 1440px (full-bleed photos may exceed it), `content` 1200px, `text` 65ch.
- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 80, 104, 140.
- **Full-width and half-width photographs,** never small thumbnails in boxes.
- **Captions in small type:** first name, age, and what the photo shows.
- **Visible navigation:** Method, Team and the button. On mobile the button is fixed to the bottom of the screen.

### Photography

- **Warm natural light, one consistent colour grade,** shot like a magazine feature, not an advertisement.
- **Eye contact and real smiles.**
- **The Sherpa beside the member, never across the room.**
- **No stock images, no renders, no mirrors, no posed flexing.**
- Shot list is section 7 of the guide; placeholders name the shot they stand in for.

### Motion and flow

- **Smooth, weighted scrolling** across the site (Lenis).
- **Hero:** slow silent video loop; headline readable immediately, then subline and button fade up.
- **Reveal:** text rises about 20px and fades in over 0.7s, one line after another.
- **ImageReveal:** soft wipe, settling with a very slight zoom.
- **Find Your Pattern:** four tall photo cards; the chosen card widens and its text appears.
- **Your first hour:** the photograph stays pinned while the audit steps change beside it as you scroll.
- **Strength Reserve score:** the number counts up once when it enters the screen.
- **Section colour changes cross-fade with the scroll,** over about 60% of the viewport height, instead of cutting hard from off-white to navy.
- **Pages cross-fade slowly** (about one second) between Home, Method and Team.
- **Hover:** photographs zoom about 3%; buttons darken slowly.
- **Limits:** nothing bounces, spins or delays reading; all motion off under `prefers-reduced-motion`; smooth on a mid-range phone.

### Tone on the page

- **Calm and certain.** No exclamation marks, no urgency, no countdowns.
- **The price is stated plainly,** once, without apology.
- **Warm details:** Jay's pizza-and-beer line ("I train to eat pizza and drink beer whenever I feel like.", Deck 1 slide 2) as a large pull-quote, a handwritten Passbook page, coffee after the audit.

---

## Voice rules

- **First names, both ways.** Never "sir", "ma'am" or "client". The decks say "client" internally; the site always says **member**.
- **Never "at your age".**
- **Member, Sherpa, Belong, Strength Reserve.** Deck words only. Never Performance Guide, Tribe, Reserve Score, trainer.
- **No health promises.** Nothing that says prevent, reverse, cure, live longer or "inevitable"; no medical or diagnostic language.
- **One idea per block, explainable in 20 seconds.**
- **Fun is allowed.** Coffee, pizza, the clap and the Bell belong on the page.
- **Borrow the decks' "say it to a member" lines.** They are written for a nervous first-timer, who is who reads the site.
- **Plain words, not gym jargon.** If a beginner can't picture it, rewrite it.
- **Never "this will make you live longer".** The deck line is "This is a capability worth protecting, and it is improving."
- **Health statistics carry their source,** as the decks do.

### Deck vs guide: lines not to use

The decks are training material for Sherpas, so some lines must not reach the site:

- Deck 1 slides 12 to 13 (intellectual foundation): quotes such as "Mindset can reverse physical decay" and "Reversal is real" break the no-promises rule. Do not use.
- Deck 1 slide 7: "decline is inevitable" uses a banned word. Rephrase or skip.
- Deck 1 slide 6: "Roughly half of the extra years…" has no source on the slide. Not usable until a source is given.
- Deck 4 slide 21: "low muscle is linked to a higher risk of death" and slide 5 "how long you stay well" lean on longevity. Do not use.
- Deck 1 slide 16 (nutrition as a pillar) and Deck 5 slide 6 (1:23 clock): overridden by the decisions table.
- Deck 4 slide 10 minute-by-minute splits: overridden ("no minute-by-minute breakdown").
- Deck 7 says the audit takes "about 45 to 60 minutes"; the guide says "about 60 minutes". Use the guide's wording unless told otherwise.
- Deck 7 says "sixteen scored tests", but its own dial counts add to 15 scored tests. Don't state a test count on the site until confirmed.
- Testimonial 1 ends with an exclamation mark. It is a member's own words, so it stays verbatim; the no-exclamation rule applies to our copy.

---

## Code conventions

- Next.js 16 App Router, TypeScript, Tailwind CSS v4 (CSS-first `@theme` in `app/globals.css`). Read `node_modules/next/dist/docs/` before using an API.
- `content/facts.ts`: every reusable fact, including `ctaLabel`. `content/<page>.ts`: that page's copy.
- `components/`: layout, motion primitives and UI. No copy inside.
- Motion: `lenis` for smooth scroll, `motion` for reveals. Every primitive checks reduced motion.
- Env vars: `RESEND_API_KEY`, `CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`.

---

## Still open

- [ ] WhatsApp number to publish, and how fast a Sherpa replies after a booking.
- [ ] Guarantee wording: "no argument" or "refund with interest".
- [ ] Billing: monthly, or four-month blocks.
- [ ] Address and hours (43 Basant Lok, 3rd Floor; 6 am to 10 pm daily) still current.
- [ ] Does every audit end with coffee, or only sometimes.
- [ ] The six "By day 120" options from the pre-trial form.
- [ ] Names, ages and written consent for the four testimonials.
- [ ] Jay's son has seen the founder story before it goes public.
- [ ] What the free first visit includes and what to call it. Confirmed: the Reserve Audit itself happens in sessions 2 to 4.
- [ ] Founders' comments: one round per preview link, by page and block name.
- [ ] Anderson Grotesk licence covers web use.
- [ ] Logo SVG needed. `docs/logo/` has PNGs only.
- [ ] Button wording BOOK YOUR FREE FIRST VISIT confirmed with Jay.
- [x] Home and online sessions: studio, home or online at no extra charge (Deck 5). Goes in the FAQs.
