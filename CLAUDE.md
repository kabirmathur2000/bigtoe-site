@AGENTS.md

# BigToe website: rulebook

## Baseline

- **Simple and minimal.** As little information per screen as possible, so the reader actually takes it in. One idea per screen. When in doubt, cut. Reference: 10squared.com.
- **Brand colours only:** off-white #F0EEEB, navy #0A212D, terracotta #D4644D. No mixed or darkened shades. Hovers use a slow opacity change instead.
  - **The one exception:** a muted green (#4A7458, `--dial-green`, 4.6:1 on off-white) for the strongest dial on the Scoreboard only, following Deck 5's red/orange/green sorting: weakest terracotta, strongest green, the others navy. Nowhere else.

## First rules

- **Clean, and less is more.** Every chapter fits one screen, with about 40 words of body text at most. When in doubt, cut.
  - **Exempt: Jay's story and the founders' note,** because they are quoted word for word. Jay's story opens Team as a large centred quote (wider column and larger type on desktop). The founders' note opens in a full-screen overlay (brand light colour), centred and large in a reading column of about 38rem; its paragraphs fade in one at a time, then the four founders' names.
- **American spelling throughout** (aging, realizing), matching the studio wall. Deck lines with British spelling (programme, pretence, ageing, practise) are quoted in American spelling; that is the only change allowed to a quoted line.
- **Story first.** Each page is a short story in chapters. **Deck labels shape the order of each page but are not shown** (THE MAIN POINT, THE CORE BELIEF, OUR MISSION, OUR ANSWER, OUR PROMISE, and their equivalents on Method, Team and Book live as comments in `content/*.ts`). Two labels are shown on the site, both small: "Our belief" (above the core belief on Home) and "IN OUR MEMBERS' WORDS".
- **References.** 10 Squared (10squared.com) for absolute simplicity: single column, few words, one ask, no decoration. Apple (apple.com) for a few luxurious transitions: full-bleed chapters, large type, one image pinned while text moves past.
- **Home has at most four signature motions:** the hero video, the Scoreboard dials counting up once, the word cloud building once its chapter arrives, and the one slow fade from light to navy. Everything else only fades in quietly. All motion obeys the soft-fade and reduced-motion rules below, and only the three brand colors are used.

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
4. **No health promises.** Nothing that says prevent, reverse, cure or live longer; nothing "inevitable" (one exception: the Rooted, Real, Rebellious refusal, below); no medical or diagnostic language.
5. **One button label everywhere:** `facts.ctaLabel`, set by `facts.ctaMode`. `"waitlist"` gives the heading "Join the waitlist" and the button JOIN THE WAITLIST; `"book"` gives "Book your free first visit" and BOOK YOUR FREE FIRST VISIT. Currently `"waitlist"`. Never a variant.
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
| Hero line | Home opens with "We train for a sport called life." (THE MAIN POINT); "The second half of life should be the stronger half." follows as THE CORE BELIEF. "Design Your Future Self" is dropped. |
| Scarcity | None. No opening date, Founding 30, member cap or "prices will rise". |
| First step | A free 60-minute first visit, then coffee. The full Reserve Audit follows in sessions 2 to 4. |
| Button | One setting, `facts.ctaMode`: JOIN THE WAITLIST now, BOOK YOUR FREE FIRST VISIT once bookings open. The same label everywhere. Book wording assumed; see open items. |
| Price | ₹25,000 to ₹45,000 a month, set after the audit, given in writing before commitment. Home says only "Memberships from ₹25,000 a month."; the range is a Method question. All from `facts.price`. |
| Guarantee | 30 days, money back. Exact wording still to confirm. |
| Frequency | 2, 3 or 4 sessions a week by goal; set with the Sherpa, not listed as a menu. |
| Two paths | Mobility & Conditioning or Strength & Conditioning; one line on Method only. |
| Training | Built on mobility and balance, strength, and conditioning. Each path's hour is shown in minutes (Deck 4 slide 10) on Method's Two paths chapter; no other minute-by-minute breakdown. |
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

### Home: six chapters and the waitlist

Each chapter fills one screen, in Deck 1's order (the labels are not shown).

1. **THE MAIN POINT** (the hero), 10 Squared style: the video placeholder (a member with a Sherpa beside them) across the top of the screen, then "We train for a sport called life." and "Most people play it untrained. We train for it." (Deck 1 slide 3) below it, with the button on desktop. Exactly one screen at every size.
2. **THE CORE BELIEF.** A small label, "Our belief", then "The second half of life should be the stronger half." Then "The problem isn't your age." (Deck 1 slide 4, cut, never reworded).
3. **THE SCOREBOARD** (moved from Method, unchanged). "Every sport has a score. This is ours." Four dials (InBody, Balance & Mobility, Functional Strength, Conditioning; names only) count up once to Deck 7's example 78, 42, 90 and 66; weakest terracotta, strongest green. The score, 69, is "the average of the four dials". **Always labelled "Example"** so it never reads as a real member's results. Then "Your Strength Reserve is only as good as your weakest dial. That is where we start." Reduced motion shows the final numbers. Last light chapter on Home. (The poem chapter is gone; the full poem is in the footer.)
4. **OUR ANSWER** (navy from here to the footer). Strength Reserve: "The capacity you build above what daily life asks of you." (Deck 1 slide 15). Then three short steps: the free first visit ("An hour with a Sherpa."); the Reserve Audit, sessions 2 to 4; test, train, retest (titles only). **Split layout:** on desktop one photo stays pinned on one half while the text moves past on the other; stacked on phones.
5. **IN OUR MEMBERS' WORDS** (the one label shown). Not pinned: when the chapter arrives, the words build on their own over about three seconds in order of size, **smallest first, largest last**, and stay; the next gesture moves on. Sizes and colours match the BigToe word cloud poster (`content/home.ts`):
   - Small: a way of life, no injuries, balance, seen, sacred, grounding
   - Medium: passion, mindset, honest, trust, patient, rare, home, compassion
   - Large: motivated, pushed, joy, care, family, mobility, noticed, energy, personal
   - Largest, last: stronger
   - **Terracotta key words:** mobility, care, pushed, joy, motivated, passion, sacred, grounding. All others off-white on navy. Every word is at least 24px so terracotta passes contrast on navy.
   - When all are in, "No policy produces that. No manual teaches it." (Deck 9 slide 13) fades in. Reduced motion: all words at once.
   - **Member quotes,** straight after: one quote at a time, centred, verbatim from `docs/copy/testimonials.md`, with first name and age (visible TODOs while missing, plus a consent TODO). Swipe on phones, small arrows on desktop, a slow cross-fade between quotes, no autoplay and **no loop**: the next arrow fades out at the last quote, the previous arrow at the first. Nothing else on that screen. **No quote goes live without recorded written consent.**
6. **OUR PROMISE.** "Look better. Move better. Feel better." (Deck 1 slide 24). Then one small line, "Memberships from ₹25,000 a month.", and the guarantee in one short line. No range and no "set after the audit" note on Home.

**The waitlist** (end of chapter 6, on navy). Modelled on 10 Squared: a heading (`facts.ctaHeading`), the form, nothing else. Four fields only: first name; last name; WhatsApp number or email; "By day 120, I want to be able to…" (select, options still open). Fits one screen at every size; on desktop the heading sits beside the form. The same component serves `/book-now`.

**Not on Home:** the four pattern cards (Method), testimonial 1 (kept in `content/testimonials.ts` for Team or Book), Jay's story (Team only). The header link to Team is enough.

### Method: five chapters and seven questions (built)

All light, no navy. Every line is a deck line, cut, never reworded ("they" may become "you"). Copy in `content/method.ts`; components in `components/method/`.

1. **WHAT FADES.** "Three things fade with age. We train all three." Three line-drawn bulbs: Muscle, "The size of the bulb."; Strength, "How bright the bulb burns."; Power, "How fast the switch works." (Deck 1 slides 10 to 11). Close: "Power goes first, long before size." No medical terms.
2. **BAREFOOT.** "It all starts with the big toe." (Deck 1; Deck 4 slide 8), then "Your foot is built to feel the ground. Barefoot, it gets strong again, and you lift from a solid base." (Deck 4 slide 8), then "Free weights, not machines." (Deck 4 slide 9, cut). One photo (bare feet on the floor) beside the words on desktop, no split layout.
3. **TWO PATHS.** "Neither path is better. We start where you are today." (Deck 4 slide 13). Then two horizontal bars, one 60-minute hour each, from Deck 4 slide 10 ("All three, supervised, in one session"): Strength & Conditioning, Mobility 10, Strength 40, Cardio 10; Mobility & Conditioning, Mobility 30, Strength 25, Cardio 5. **Path minutes are now shown, from Deck 4.** Every segment labelled with name and minutes (Mobility terracotta, Strength navy, Cardio a navy outline), so colour is never the only cue. Then "Arrive 10 minutes early to foam roll." The bars grow in once, slowly; static under reduced motion. (`components/method/Paths.tsx`.)
4. **WHO WE SERVE.** "Find your pattern." The four persona cards (Deck 1 slide 19, Deck 3 slide 8), one "what you need" line each, `components/method/Patterns.tsx`.
5. **QUESTIONS.** Seven collapsed, approved:
   - "Only twice a week? Will I see results?" (Deck 4 slide 21)
   - "Isn't heavy lifting risky?" (Deck 4 slide 21; source Watson et al, J Bone Miner Res 2018, doi 10.1002/jbmr.3284, confirmed as the 101-woman trial)
   - "Why so much strength, not cardio?": "Most members already walk or do cardio. Strength is what most of us lack."
   - "Will I feel out of place?" (Deck 1 slide 22)
   - "I've never enjoyed exercise. Is this for me?": four deck sentences, not joined: "Fun is how people stay in the game." "There is no finish line. So the journey has to be fun." "Every hour ends in a clap." "You don't climb alone."
   - "Can I train at home or online?" (Deck 5 slide 17)
   - "What does it cost?": the range, "set after your Reserve Audit, and given in writing before you commit", and the guarantee, all from `facts.price` and `facts.guarantee`.

The page ends with one button (`facts.ctaLabel`).

Held back for now: "Same score, different person" (Deck 7 slide 12) and the tap-a-test piece (Deck 7 slides 7 to 10); the Deck 1 slide 22 percentages (sources not mapped to figures).

### Team

- **Order:** Jay's words, the founders, the Sherpas (light); the social space, its button and the footer (navy).
- **Jay's words** (no heading). Jay's story from `docs/copy/jay-story.md`, verbatim, as a large centred quote signed "Jay, 59. Co-founder." On desktop a wider column and larger type, filling the screen comfortably. "at a gym", "if he had to look after me" and "Stronger is what you build." are in Bold (`story.bold`), the one exception to Bold-for-labels.
- **The founders,** two screens, each a glide stop:
  - "Rooted. Real. Rebellious." Each word large with its Deck 1 slide 7 definition, revealed one at a time.
  - "At BigToe, we Practice Possibility." (the poem's last line) above the four founder portraits with name and age, then a "Read the founders' note" button (outline).
- **The founders' note** (`docs/copy/founders-note.md`, approved, three paragraphs) opens from that button in a full-screen overlay in the brand light colour that rises and fades in slowly; paragraphs reveal one at a time, centred and large, then the four founders' names. Close button, Escape or a tap outside the text closes it with a slow fade. The page behind does not scroll; focus stays inside and returns to the button. Reduced motion: a slow fade, no movement. The "Kilimanjaro at 80" TODO stays in `content/team.ts` and is not shown.
- **Sherpas.** Portrait, first name and one-line story each, from Deck 1 slide 25 (Himanshu, Saurav, Sumit, Tanuj).
- **Founder one-liners** (Deck 1 slide 8, `docs/copy/founder-lines.md`) are not shown until approved.
- **The social space.** Coffee table, the clap, the Bell, Pizza & Beer, in photos.

### Book (`/book-now`)

- **The same form as Home** (`BookingSection`), so it can be shared as a link on WhatsApp. Heading and button follow `facts.ctaMode`.
- **Address, hours, map,** and "There's no parking at the studio. Come by cab or get dropped off." The footer leaves out its own address and hours on this page.

### Redirects

- `/membership` → `/` and `/faqs` → `/method`, permanent (308), in `next.config.ts`.

---

## Look: design direction

**Brief: wealthy, professional and high class, yet welcoming and warm, with modern transitions and flow.** Luxury comes from restraint: fewer elements, more space, larger photographs, slower movement. Warmth comes from faces, first names and coffee.

### Colour

- **Deck colours only.** No new colours. Tokens: `--color-navy #0A212D`, `--color-terracotta #D4644D`, `--color-offwhite #F0EEEB`. Tints for hairlines and secondary text are made from these with opacity, not new hues.
- **"Off-white" always means the brand light colour `#F0EEEB`,** anywhere in this project. Never introduce another light shade. Only the three brand colours are used.
- **Proportions:** roughly half off-white, half navy, with terracotta for the button and one accent per screen.
- **Main button:** terracotta fill with off-white (#F0EEEB) text, label 19px Bold uppercase so it passes AA as large text (3.17:1). The same on light and navy. Hover: a slow opacity change. Square corners, no shadows.
- **Terracotta beyond the button** is one accent per screen (the Power bulb, the weakest dial, the key words). Terracotta text must be large (24px+, or 19px+ bold) to pass AA, on light and on navy; the temporary TODO text is the only exception and goes at launch.
- **Contrast:** all text passes WCAG AA. Secondary text and labels use navy or off-white at 75% opacity or more, never less.
- **One button visible at a time.** The header button (desktop) and the bottom bar (mobile) step aside while an in-page button or the form is on screen. On `/book-now` every button scrolls to the form (`#waitlist`) instead of reloading the page.
- **Colour zones: each page changes colour once.** Brand light first, then one slow fade to navy at about the halfway point, then navy to the end, including the footer. Each colour holds for at least three sections where the page has them. **No fade back to light anywhere.**
  - Home: The main point, Our belief, The scoreboard on light. From Our answer to the footer, navy.
  - Method: What fades, Barefoot, Two paths on light. Who we serve, Questions and the footer, navy.
  - Team: Jay's words, the Sherpas, the founders' note on light. The social space, the button and the footer, navy.
  - Book: where we train on light; the form and the footer, navy.
  - Mark zone sections `tone="navy"`; the first one starts the fade (`SectionToneController`). On navy, text is #F0EEEB.
- **The fade is gradual,** over about 60% of the screen height, so the page never jumps. Our members are over 40; nothing on the page should startle.
- **Footer links:** Method and Team in the navy footer on every page.
- **Footer poem:** the full Practice Possibility poem, word for word, in small type at 75% opacity below hours and contact, on every page including Home (`components/layout/FooterPoem.tsx`).
- **The header keeps out of the navy zone.** It stays off-white with the navy logo, slides away while the visitor scrolls down and slides back slowly when they scroll up, but only while the page is still light; in the navy zone it stays away, and navy chapters take the full screen (`HeaderShell`, `--chapter-offset`). It returns at the top of the page and when a keyboard user tabs into it. Under reduced motion it simply stays visible.
- **Never switch colour all at once, on any setting.** Under `prefers-reduced-motion`, movement goes (no rising, sliding or zooming), but colour changes keep the same slow fade.
- **No gradients, no drop shadows, no glossy effects.** Thin hairline rules instead.

### Core beliefs

The two core beliefs, quoted from Deck 1, are "We train for a sport called life." and "The second half of life should be the stronger half." Use them exactly.

### Fixed wording: the Practice Possibility poem

The text on the studio wall. It lives in `content/home.ts` (`poem`) and **must never be edited**: not a word, capital, comma or spelling (including "realizing"). Three stanzas, a blank line between each:

> We get better at what we practice.
>
> If we practice hesitation, we get better at it.
> If we practice fear, we get better at it.
> If we practice movement, we get better at it.
> People practice decline without realizing it.
>
> At BigToe, we Practice Possibility.

### Logo

- The logo appears with the tagline "Practice Possibility" at least once per page (the LogoTag file, `docs/logo/B&O BT Logo+Tag.png`, served as `public/brand/logo-tag.png`). It sits in the footer, which is navy on every page, so the footer uses the light version (`docs/logo/W&O BT Logo+Tag.png`, served as `public/brand/logo-tag-light.png`) at the same size.
- Sizes: 44px tall in the header on desktop, 36px on mobile, larger in the footer (about twice the header size).
- The navy logo (header) goes on off-white only; the W&O LogoTag goes on navy only. A light version of the plain logo (no tag) is still needed if the header should ever turn navy.

### Typography

- **Anderson Grotesk throughout,** self-hosted from `public/fonts` (licence for web use still to confirm).
- **Headlines Light or Regular, 64 to 88px on desktop,** sentence case, tight line spacing (about 1.05).
- **Bold only for small spaced-out labels** (field and row labels such as Price or Hours, "Example" on the dials, "Our belief" and "IN OUR MEMBERS' WORDS"; other chapter labels are not shown): about 12 to 13px, uppercase, letter-spacing about 0.16em. Exceptions: the 19px button label, and the three Bold phrases in Jay's words.
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
- **Split layout in one place only:** Home's Our answer. On desktop one photo stays pinned on one half while the text moves past on the other; stacked on phones.
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

- **Smooth, weighted scrolling** across the site (Lenis). See the scrolling rule below.
- **Home's four signature motions, and no others:** the hero video (slow silent loop; headline readable immediately), the Scoreboard dials counting up once, the word cloud build, and the one slow fade from light to navy.
- **Reveal (everything else):** a quiet fade in over about 0.9s, one line after another. No rising.
- **Method and Team** may use, sparingly: Find Your Pattern cards that widen when chosen; one pinned photograph while text moves past (Apple style); the Strength Reserve score counting up once; ImageReveal (soft wipe with a very slight settle).
- **Section colour changes cross-fade with the scroll,** over about 60% of the viewport height, instead of cutting hard from off-white to navy.
- **Pages cross-fade slowly** (about one second) between Home, Method and Team.
- **Hover:** photographs zoom about 3%; buttons and links change opacity slowly. No darkened or mixed shades.
- **Limits:** nothing bounces, spins or delays reading; smooth on a mid-range phone.
- **Reduced motion:** under `prefers-reduced-motion`, all movement is off: no rising, sliding, zooming, resizing, looping, pinning or snapping. Colour and opacity changes stay as the same slow fade (section colours, the page cross-fade, hover colours). Never a hard colour switch.

### Scrolling: full screens and guided scrolling

- **Every chapter fills the screen** (100svh below the header) and its text and images are fully visible, never cut off, clear of the mobile bottom bar. Use `<Section chapter>`; the `.chapter` style in `globals.css` sets the height, centring and padding.
- **Check at 375x667, 390x844, 768x1024, 1280x720 and 1440x900.** Where a chapter does not fit, tighten spacing or image size. Never cut copy without asking.
- **Exempt, scrolling freely:** only the questions (`<Section free>`), where taller than the screen. Everything else, the waitlist form included, fits one screen. On desktop each step of the split layout is one stop. The founders' note scrolls inside its own overlay.
- **One left edge.** Chapter content starts at the second column of the 12-column grid (`md:ml-[8.333%]` or `md:col-start-2`), including the poem, the word cloud and the footer. Exceptions: Jay's story and the founders' note are centred; the header logo sits at the gutter.
- **Room below the header.** Chapters taller than the screen (Jay's story, the questions) start at least 48px below the header.
- **Tap targets** are at least 44px tall, including header and footer links.
- **Phones.** On short phones (phone layout and under about 720px tall; the `short:` variant), photos in Our answer and Barefoot step aside and chapter padding tightens; taller phones keep their photos. On all phones: Our answer shows step titles only; the What fades, Scoreboard and Book headlines are 34px; the Scoreboard dials sit 2x2 with each name beside a small dial; Who we serve shows the four titles only until a card is opened; the Sherpas are a list with a small portrait beside name and line; the social space shows one photo.
- **Guided scrolling on fixed stops** (Lenis, `components/motion/SmoothScroll.tsx`). The page keeps a list of every stop: the top of each chapter and, on desktop, each step of the split layout, plus the very bottom; rebuilt on resize. Each new gesture (a wheel burst, a swipe of about 30px, an arrow, page or space key) moves exactly one stop forward or back from the current stop index, never by how far the visitor scrolled. Up behaves exactly like down. The glide takes about 0.8 seconds with a soft ease; input is ignored until it settles, trackpad momentum included, and a new wheel burst after a short pause (about 150ms of quiet) is a new gesture. Holding a key is one gesture. One listener on the whole window. Only Questions, where taller than the screen, scrolls freely inside, then the next gesture moves on. If the page is ever off a stop (a link, the scrollbar), the next gesture starts from the nearest stop. Any other chapter taller than the screen would get an end stop too, so keep chapters within one screen. **The one setting:** `GLIDE.duration` in `components/motion/scrollConfig.ts`.
- **Reduced motion: magnetic scrolling is off completely** (Lenis is off).

### Tone on the page

- **Calm and certain.** No exclamation marks, no urgency, no countdowns.
- **The price is stated plainly,** once, without apology.
- **Warm details:** Jay's pizza-and-beer line ("I train to eat pizza and drink beer whenever I feel like.", Deck 1 slide 2) as a large pull-quote, a handwritten Passbook page, coffee after the audit.

---

## Voice rules

- **First names, both ways.** Never "sir", "ma'am" or "client". The decks say "client" internally; the site always says **member**.
- **Never "at your age".**
- **Member, Sherpa, Belong, Strength Reserve.** Deck words only. Never Performance Guide, Tribe, Reserve Score, trainer.
- **No health promises.** Nothing that says prevent, reverse, cure, live longer or "inevitable"; no medical or diagnostic language. **"Inevitable" is allowed only in Deck 1's refusal: "We refuse to accept that decline is inevitable."** (Rooted, Real, Rebellious; founders' note).
- **One idea per block, explainable in 20 seconds.**
- **Fun is allowed.** Coffee, pizza, the clap and the Bell belong on the page.
- **Borrow the decks' "say it to a member" lines.** They are written for a nervous first-timer, who is who reads the site.
- **"They" becomes "you".** Where a deck line speaks about members to Sherpas ("they"), the site may turn it to address the member as "you", changing nothing else. Examples: "Progress you can see." (Deck 1: "Progress they can see."), "You can see yourself getting better." (Deck 2: "They can see themselves getting better.").
- **Plain words, not gym jargon.** If a beginner can't picture it, rewrite it.
- **Never "this will make you live longer".** The deck line is "This is a capability worth protecting, and it is improving."
- **Health statistics carry their source,** as the decks do.

### Deck vs guide: lines not to use

The decks are training material for Sherpas, so some lines must not reach the site:

- Deck 1 slides 12 to 13 (intellectual foundation): quotes such as "Mindset can reverse physical decay" and "Reversal is real" break the no-promises rule. Do not use.
- Deck 1 slide 7: "inevitable" is banned everywhere except the Rebellious refusal itself, "We refuse to accept that decline is inevitable.", which is approved word for word.
- Deck 1 slide 6: "Roughly half of the extra years…" has no source on the slide. Not usable until a source is given.
- Deck 4 slide 21: "low muscle is linked to a higher risk of death" and slide 5 "how long you stay well" lean on longevity. Do not use.
- Deck 1 slide 16 (nutrition as a pillar) and Deck 5 slide 6 (1:23 clock): overridden by the decisions table.
- Deck 4 slide 10 minute splits: used only for the two path bars on Method (approved); no other minute-by-minute breakdown.
- Deck 7 says the audit takes "about 45 to 60 minutes"; the guide says "about 60 minutes". Use the guide's wording unless told otherwise.
- Deck 7 says "sixteen scored tests", but its own dial counts add to 15 scored tests. Don't state a test count on the site until confirmed.
- Testimonial 1 ends with an exclamation mark. It is a member's own words, so it stays verbatim; the no-exclamation rule applies to our copy.

---

## Code conventions

- Next.js 16 App Router, TypeScript, Tailwind CSS v4 (CSS-first `@theme` in `app/globals.css`). Read `node_modules/next/dist/docs/` before using an API.
- `content/facts.ts`: every reusable fact, including `ctaLabel`. `content/<page>.ts`: that page's copy.
- `components/`: layout, motion primitives and UI. No copy inside.
- Motion: `lenis` for smooth scroll, `motion` for reveals. Every primitive checks reduced motion.
- Env vars: `RESEND_API_KEY`, `CONTACT_EMAIL` (comma-separated for several), `RESEND_FROM` (a sender on a domain verified in Resend; defaults to Resend's test sender), `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL` (defaults to https://bigtoe.in).
- SEO: titles and descriptions in `content/site.ts` (`meta`); descriptions are deck lines. Home's title is "BigToe · Personal training for adults over 40 · Vasant Vihar, New Delhi". LocalBusiness JSON-LD in `app/layout.tsx`, built only from `facts`. `app/opengraph-image.tsx` (off-white, LogoTag, the core belief, Anderson Grotesk from `docs/fonts/*.otf`), `app/sitemap.ts`, `app/robots.ts`. Redirects in `next.config.ts`.
- Analytics: Vercel Analytics. Events: "Booking button" (placement, page, mode) on every `BookButton` tap; "Form submit" (page, result: invalid, sent or failed, mode) on every submit. Never send personal details.
- The form sends through the server action `app/actions/waitlist.ts`: honeypot, server-side validation (`lib/waitlist.ts`, shared with the browser), then Resend with every field. Without keys in development it logs instead of sending; in production it shows the failure message with the email address.

---

## Still open

- [ ] WhatsApp number to publish, and how fast a Sherpa replies after a booking.
- [ ] Guarantee wording: "no argument" or "refund with interest".
- [ ] Billing: monthly, or four-month blocks.
- [ ] Address and hours (43 Basant Lok, 3rd Floor; 6 am to 10 pm daily) still current.
- [ ] Does every audit end with coffee, or only sometimes.
- [ ] The six "By day 120" options from the pre-trial form.
- [ ] Names, ages and written consent for the four testimonials (all four now show as cards on Home, with TODOs).
- [ ] Jay's son has seen the founder story before it goes public.
- [ ] What the free first visit includes and what to call it. Confirmed: the Reserve Audit itself happens in sessions 2 to 4.
- [ ] Resend: API key, verified sending domain (`RESEND_FROM`) and `CONTACT_EMAIL` set in Vercel.
- [ ] Thank-you wording and the pre-filled WhatsApp message (written for the site, not from a deck).
- [ ] Sherpa name spellings, and each Sherpa's OK to publish their Deck 1 line.
- [ ] Saurav's line ("Quit drinking at 22…") held off Team until he agrees to it going public; name and portrait only.
- [ ] Founder one-line stories (`docs/copy/founder-lines.md`), all awaiting approval; none shown yet.
- [ ] "Kilimanjaro at 80" in the founders' note, for Jay to confirm.
- [ ] Map link for the address.
- [ ] Founders' comments: one round per preview link, by page and block name.
- [ ] Anderson Grotesk licence covers web use.
- [ ] Logo SVG needed. `docs/logo/` has PNGs only.
- [ ] TODO: a light (off-white) version of the plain logo, without the tagline, so the header can turn navy over the navy zone later. Until then the header hides there.
- [ ] Button wording BOOK YOUR FREE FIRST VISIT confirmed with Jay.
- [x] Home and online sessions: studio, home or online at no extra charge (Deck 5). Goes in the FAQs.
