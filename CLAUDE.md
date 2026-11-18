@AGENTS.md

# BigToe website: rulebook

## North star

**One job: get the right person to book a free first hour.** Less is 20x more. If a screen does not serve that, cut it. The three pages together take about two and a half minutes to scroll. Reference: 10squared.com for flow, where each screen is its own setting.

## Copy rules (Version C, 17 Nov 2026)

- **One idea per screen:** a short headline, one supporting line (two or three only where the plan marks them), at most one button.
- **One button label everywhere:** "Book your free first hour" (`facts.ctaLabel`), shown in the button style (19px Bold uppercase). Never a variant. Every button opens the booking panel.
- **Facts are used everywhere from `content/facts.ts`, never retyped:** 20,000+ coaching hours; five Sherpas; five members an hour; hours Monday to Saturday, 6 am to 8 pm, Sunday, 8 am to 1 pm; price ₹25,000 to ₹45,000 a month, by how often you train; the guarantee "Come to your first eight sessions. Not for you? Your money back." (only studio sessions count toward the eight); the free first hour: a body scan, a light session, and a straight talk over coffee; founders Jay Singh 59, Jeevan Aujla 41, Seema Jindal 58, Rodrigo Pérez 51.
- **Member quotes and member photos are placeholders until written consent:** first name and age show as visible TODOs; portraits are grey placeholders named after the shot. A quote is a member's own words, never reworded or added to; a quote not found in `docs/copy/testimonials.md` carries a source TODO.
- **"Reserve Score"** (out of 100) is now the site's name for the audit's score, approved in Version C.
- **All page copy lives in `content/*.ts`,** never inside components. Missing facts become visible TODOs (rendered as `TODO: …`), listed in "Still open".
- **No health promises.** Nothing that says prevent, reverse, cure or live longer; no diagnosis. Medical questions defer to the member's doctor. "Inevitable" only in the Rebellious refusal.
- **American spelling throughout.**
- **Brand colours only:** off-white #F0EEEB, navy #0A212D, terracotta #D4644D. Typeface Anderson Grotesk: Light for large headlines, Regular for text, Bold for the button and labels.

### Words

- **Never:** crush, shred, grind, push, transform, burn, beast, no excuses, limited, spots left, hurry. The list covers force language ("push you past your limits"), not movement names: "push" stays in the Big Seven (Squat. Hinge. Lunge. Push. Pull. Rotate. Walk or run.) and in "lift, push and carry".
- **Prefer:** build, restore, calibrate, cultivate, steward, guide.
- The tone is fitness meets high-end hospitality: calm, warm, unhurried.

Sources: the Version C plan (above), then `docs/website-guide.md`, the decks in `docs/decks/`, and `docs/copy/`. Photos: `docs/shot-list.md`.

---

## The new design (style tile, round six, 18 Nov 2026)

`/style-tile` shows the new design for approval; every page will be rebuilt from it. Not linked, not in the sitemap, `noindex`. Its own layout (`app/(tile)/`), components in `components/tile/`, copy in `content/style-tile.ts`. **Copy comes from `docs/copy/agreed-copy-2026-11-18.md` and the lines in each brief** (a line given in the brief wins); lines that are in neither are marked "proposed" in the content file or shown as TODOs. Facts from `agreed` in `content/facts.ts` (₹25,000 to ₹50,000 a month; the six-session guarantee; "Book your first visit"); the live pages keep the older facts and look until they are rebuilt.

**Reference: ouraring.com and functionhealth.com.** The ten screens copy their layouts, spacing, card shapes, type scale and transitions as closely as possible, in BigToe's brand.

### Base style

- **Page background #F0EEEB, text navy #0A212D** (edges and overscroll included). No navy page.
- **Terracotta #D4644D** only for the button and at most one accent phrase per screen.
- **Anderson Grotesk: Light for headlines, Regular for body, Bold only for small labels.** Named styles in `app/globals.css`, use only these: `ty-display` (hero, 44 to 88px Light), `ty-headline` (36 to 64px Light), `ty-sub` (20 to 24px Regular: lines under headlines, step titles, quotes, questions), `ty-body` (16 to 18px Regular), `ty-small` (14 to 15px Regular, the footer), `ty-label` (13px Bold, sentence case: pills and small labels).
- **Cards:** 16px corners; off-white with a hairline navy border, or a faint navy tint. Pills are fully rounded.
- **Layout:** content in a 1280px column (`tile-wrap`: 20px gutters on phones, 40px on tablets, 64px on desktop); the hero and the Sherpa photo run edge to edge; carousels run to the screen edge with the first card on the column (`tile-edge`). About 96px between screens on phones, 144px on desktop.
- **Photos:** `docs/photos/studio-coffee-bar.jpg` fills every photo slot until the shoot, cropped per slot. Text sits on a photo only in the hero, on the training cards, and in frosted panels and pills.

### Header (floating, every page)

- **Frosted off-white glass** (`bg-offwhite/75`, backdrop blur, hairline border) with the navy logo; it hides on scroll down and returns on scroll up (`HeaderShell glass`).
- On the right the **book pill** (rounded, terracotta, navy text, sentence case, Bold) and a **three-line menu icon** labelled "Menu". **Below 380px screen width the pill reads "Book a visit"; at 380px and wider "Book your first visit".**
- **The menu icon only ever opens the menu overlay;** only the book pills open the request panel. The menu is a full-screen off-white overlay: Home, How we train, Team, Questions, with the book pill at the bottom.

### Inner pages

Method, Team and FAQ start with a clear page title and "← Back to home" at the top.

### Motion

- **Content fades up once as it arrives** (about 16px, 0.6s; lines one after another). Nothing is tied to scroll position: **no scroll-linked effects, no pinning, no stacking, no curtain ending, no parallax.** Native scrolling, no snapping of the page.
- **Carousels are manual** (swipe on phones, arrows on desktop; snap points inside the row only). Never autoplay.
- **The chart draws once** (the dots, then the line).
- Small interface transitions (the plus, the accordion) take about 0.3s.
- **Reduced motion: everything still** and shown as is.

### The ten screens

1. **Hero** (after Function's "Check your health."): a full-screen photo with a soft dark gradient over the lower half; a small frosted pill "Vasant Vihar, New Delhi"; the headline in Light, #F0EEEB, "The second half of life should be stronger than the first."; "One-to-one coaching for life after 40."; the button.
2. **Why** (after Oura's "Understand your body. Own your health."): text only, centred: "We train for a sport called life." / "A suitcase to lift. Unexpected stairs. A trip to say yes to." Two soft navy pill links: "How we train", "Meet the team".
3. **What we train** (after Oura's card row): portrait photo cards (4:5, 16px corners), a pill label with a line icon top left, a round plus top right, a short line low on the photo. Mobility and balance / Strength / Conditioning / Body composition. The plus reveals one sentence in a frosted panel. Phones swipe with the next card peeking; desktop has arrows.
4. **Your first hour** (after Function's "Testing is easy"): "Your first hour is free." Three numbered steps, 01 to 03, in a row on desktop, stacked on phones: a small number, a short title, one sentence.
5. **Know your starting point** (after Function's biomarker card): "Know your starting point." / "Your Reserve Audit measures four dials. Your plan starts with the one that needs the most attention." An off-white card, hairline border, 16px corners: "In range" and "Below range" bands, two dots joined by a line, "First visit" and "Retest". Labelled "Example"; no scores.
6. **Your Sherpa** (after Function's "Next Steps"): "Your Sherpa. Your plan." above a full-bleed photo with a frosted glass panel of four rows (line icon, small label, one line): Your Sherpa / Your Reserve Audit / Your plan / Your progress.
7. **Members' words** (after Oura's quote cards): cards with 16px corners, a small navy pill (the member's goal: Travel, Family, Strength), a large opening quote mark, the quote at `ty-sub`, a small round portrait with first name and age. Three across on desktop, stacked on phones. Quotes in `content/quotes.ts`, drafts with the build check.
8. **What's included** (the shape of Function's pricing card, no price): one centred card, "Everything, one-to-one.", the button, a hairline, five checked bullets.
9. **Questions** (after Function's FAQ): an accordion, one open at a time, then "See all questions →" (/faq).
10. **Ending** (after Function's closing): "Come and meet us." / "Your first hour is free." centred, the button, then the footer: address, hours, WhatsApp, email, Careers, Maps, Terms, Privacy, and the navy LogoTag on the light background.

### Request panel

`VisitPanel`: centred dialog on desktop, bottom sheet on phones. Name, mobile number, preferred time (weekday morning, weekday evening, weekend). Thank you: "Thank you, [name]. We'll confirm your visit on WhatsApp." with the intake form (`facts.intakeFormUrl`, new tab) and WhatsApp. A request, not a confirmed appointment; no health questions (that is the intake form's job). Server action `app/actions/visit.ts`. Analytics: "Visit panel" on open, "Visit submit" on submit.

---

## Site structure

Pages: **Home (`/`), Method (`/method`), Team (`/team`),** plus **`/terms`** and **`/privacy`**. There is no booking page: the panel opens anywhere.

Redirects (permanent, `next.config.ts`): `/membership`, `/faqs` and `/book-now` go to Home.

### Booking panel (`components/booking/BookingPanel.tsx`)

- Every button (`BookButton`) opens it. A calm panel in the brand light colour slides up from the bottom (a modal `<dialog>`; navy backdrop at 60%): heading and button "Book your free first hour", fields first name and WhatsApp number. Close, Escape or a tap outside closes it; focus stays inside and returns to the button; the page behind does not scroll. Reduced motion: a slow fade.
- On submit: server action `app/actions/book.ts` (honeypot, validation shared with the browser in `lib/booking.ts`), email via Resend to `CONTACT_EMAIL`. Then the thank-you: "Thank you, {name}. We'll message you on WhatsApp to set your first hour." Then "Before you come, tell us a little about yourself." and the button "Fill in the short form" (`facts.preVisitFormUrl`, new tab), and a smaller "Message us now" WhatsApp button (TODO until the number is set).
- The spam trap ("Company") is off-screen, `aria-hidden` and out of the tab order.
- Analytics (Vercel): "Booking panel" on open (placement, page); "Booking submit" on every submit (page, result: invalid, sent or failed). Never personal details.

### Home (`app/page.tsx`, `content/home.ts`)

Screens 1 to 3 light; 4 to 6, the FAQs and the footer navy.

1. **Photo: the studio's coffee bar** (`docs/photos/studio-coffee-bar.jpg`, compressed to 2000px in `public/photos/`, served through `next/image`, loaded eagerly at high priority). The square photo is cropped with `object-fit: cover` per screen (`content/home.ts`, `hero.photo`): phones `14% 52%` (the crop shifts left so the BigToe logo wall is never cut off, with the table); wide screens `50% 52%` (the logo wall, the front of the table and the training floor). Small caption on the photo, bottom left: "Vasant Vihar, New Delhi." No facts strip. Text: "The second half should be the stronger half." / "Not a gym. A strength studio for life after 40." / the button (desktop; phones use the bottom bar).
2. **No photo.** "We train for a sport called life." / "Decline is the default. Not a destiny." / text link "Why we built this →" to /team.
3. **Photo: a member at the coffee corner.** "Looking fit isn't being fit." / "Your Reserve Score, out of 100. Measured, trained, retested every sixteen sessions." / the button (desktop).
4. **Navy; the one colour fade happens as this screen arrives.** "Seen. Belong. Progress." / "Don't believe us? Ask them." Three quotes, side by side on desktop, stacked on phones, each under its word (Seen. / Belong. / Progress.) with a member portrait placeholder (same plain wall, same distance), first name and age (`components/home/Members.tsx`).
5. **Photo: a member laughing mid-session.** "Get stronger. Keep the pizza." / "Coffee at the social table. Pizza and beer, once a quarter."
6. **No photo.** "₹25,000 to ₹45,000 a month, by how often you train." Two lines: the free first hour, and the guarantee. The button.
- **FAQs** under screen 6, collapsed (`components/ui/Faqs.tsx`): Can someone like me actually do this?; I have an old injury. Is it safe?; What if I can't make it?; I'm on a GLP-1 medication. Is this for me?; Do you offer nutrition and blood tests?; What is the Reserve Audit?

### Method (`app/method/page.tsx`, `content/method.ts`)

Screens 1 to 2 light; 3 to 4 navy.

1. **Photo: the studio floor (Home 1's shot).** "The Reserve Score." / "Most gyms train in the dark. We turn the lights on." / small line: "Mobility and balance. Strength. Conditioning. Body composition. One number, out of 100."
2. **No photo.** "Three things fade with age. We train all three." Three lines: Muscle, Strength, Power, each with what it means.
3. **Photo: a Sherpa's bare feet, tight vertical crop** (tall beside the words on desktop; across the top on phones). The colour fade runs across it. "It all starts with the big toe." / "Bare feet. Free weights. No machine to hold you up."
4. **No photo.** "How it works." / "It was never motivation. It was the missing scoreboard." The loop diagram (Measure / Train the weakest / Retest / Recalibrate). The button.

**The loop diagram** (`components/method/Loop.tsx`): after Love.Life's "A smarter way to take care of you" panel. One panel, hairline border in the current text colour, 8px corners, four columns divided by three smooth arcs of different curvature. A thin terracotta line rises gently left to right across all four; it never slopes downward. The arcs and line draw together, then the words fade in left to right: about two seconds; static under reduced motion. Phones: stacked, arcs across (bowing upward), no line inside; a short terracotta line rises above the panel. Drawn at the panel's real pixel size.

### Team (`app/team/page.tsx`, `content/team.ts`, `components/team/TeamScreens.tsx`)

Screens 1 to 2 light; 3 and the footer navy.

1. **No photo.** "Why we built this." Jay's story (three short paragraphs), signed "Jay". The button.
2. **Four founder portraits** (same crop and light, on the training floor). "The four of us." The three values, then each founder: name and age, role, one line of background. Phones: a list with a small portrait.
3. **Navy.** "Your Sherpas." / "On Everest, a Sherpa walks the path with you, all the way up." Five portraits (same crop, light and kit): Himanshu, Saurav, Sumit, Tanuj, Kabir, each with "Sherpa" and their own line. Then "Every Sherpa trains under Jeevan, and every workout template is his." Then one member quote with a portrait placeholder. This screen runs longer than one window on phones.

### Terms and privacy (`content/legal.ts`, `components/legal/LegalText.tsx`)

Fetched from bigtoe.in on 17 Nov 2026 and published **word for word**, plain text in the site style. Never edit them; conflicts are flagged under "Still open".

### Footer (every page, navy, light LogoTag)

"Practice Possibility." / the address / the hours / the parking line / "WhatsApp [number TODO]. hello@bigtoe.in." / links: Careers (mailto:hello@bigtoe.in), Location on Maps (TODO link), Terms & Conditions, Privacy Policy. No poem. The footer paints navy even on pages with no navy section.

---

## Look: design direction

**Brief: wealthy, professional and high class, yet welcoming and warm, with modern transitions and flow.** Luxury comes from restraint: fewer elements, more space, larger photographs, slower movement.

### Colour

- **Brand colours only.** Tokens: `--color-navy #0A212D`, `--color-terracotta #D4644D`, `--color-offwhite #F0EEEB`. Tailwind's default palette is switched off (`--color-*: initial`), so no other colour class exists. One exception: the muted green #4A7458 (`--color-dial-green`, 4.6:1 on off-white) for the strongest of the example dials, nowhere else. The new design's Warm panel and photo scrim mix brand colours by design. Tints for hairlines and secondary text are made from these with opacity, never new hues. "Off-white" always means #F0EEEB.
- **Main button:** terracotta fill with off-white text, label 19px Bold uppercase so it passes AA as large text. The same on light and navy. Hover: a slow opacity change. Square corners, no shadows.
- **Terracotta beyond the button** is one accent per screen (the rising line in the loop). Terracotta text must be large (24px+, or 19px+ bold); the temporary TODO text is the only exception and goes at launch.
- **Contrast:** all text passes WCAG AA. Secondary text uses navy or off-white at 75% opacity or more.
- **One button visible at a time.** The navigation button (desktop) and the bottom bar (phones) step aside while an in-page button (`data-cta`) is on screen.
- **Colour zones: each page changes colour once,** light first, then one slow fade to navy, then navy to the footer. No fade back. Method: the fade runs across the bare-feet photo and is complete when it reaches the top. Home ("Seen. Belong. Progress.") and Team ("Your Sherpas."): over about 60% of the screen height as that screen arrives. The legal pages stay light. **Each section keeps its own text colour** (navy on light, off-white on navy), so text never flips mid-fade. Never a hard colour switch, on any setting.
- **No gradients, no drop shadows, no glossy effects.** Hairline rules only.

### Navigation (`components/layout/Header.tsx`, `HeaderShell`)

A floating bar on every page: inset from the screen edges, 8px corners, off-white with a hairline border; the navy logo, then Home, Method, Team and the button (desktop). Phones: the logo and the three links; the button is fixed to the bottom of the screen (`MobileBookBar`). The current page is underlined. 44px tap targets. It hides while scrolling down and slides back as soon as the visitor scrolls up, in both zones; always visible at the very top and when a keyboard user tabs into it. Under reduced motion it stays visible.

### Logo

- The LogoTag ("Practice Possibility") appears once per page, in the navy footer, light version (`public/brand/logo-tag-light.png`), 88px desktop, 72px phones.
- The navy logo in the navigation bar: 36px desktop, 28px phones, on off-white only.

### Typography

- **Anderson Grotesk throughout,** from the files in `docs/fonts` (served as `.woff2` copies in `public/fonts`; the share image reads the `.otf` directly). Licence for web use still to confirm.
- **Weight rule: three weights, Light, Regular and Bold.** Large headlines (`display`, `h1`) are **Light** (Regular read too bold, 17 Nov 2026). Smaller headings (`h2`, `h3`) and body text are **Regular**. **Bold** is only for the button label and small spaced-out labels (form labels). Ultrabold and the obliques are not used.
- Headlines large, sentence case, tight line spacing.
- Type scale (fluid, mobile → desktop), Regular unless noted: `display` 48 → 88px Light; `h1` 40 → 64px Light; `h2` 32 → 44px; `h3` 22 → 26px; `body-lg` 20px; `body` 18px; `caption` 14px; `label` 12 → 13px Bold uppercase 0.16em.

### Screens and layout

- **Desktop: every screen fills the window** (100svh; the first screen of a page 100svh below the navigation) and its content is fully visible.
- **Phones: no empty stretches.** Every screen appears in the same order as desktop. The first photo screen of a page fills the window down to the bottom bar; every other screen sizes to its content with the same space above and below (`--phone-gap`, 3.5rem), so the gap between any two screens is an even 112px. Photos keep a fixed shape on phones (4:3 across, 4:5 for the tall bare-feet photo). The bottom bar's room is reserved once, under the footer, not under every screen. In-page buttons that only show on desktop use `childrenDesktopOnly`, so they leave no gap on phones. Text screens: `TextScreen`; photo screens: `PhotoScreen` (`layout="top"`: photo across the top, words below; `layout="side"`: a tall photo beside the words on desktop; `photo` for a real photograph with its phone and wide crops; `caption` small on the photo, bottom left), in `components/ui/Screen.tsx`. Every screen keeps a band the height of the navigation at its top (`--chapter-band`), except photo screens, whose photo runs to the top edge.
- **Allowed to run longer:** the FAQs, the legal pages, and "Your Sherpas" on phones.
- **Check at 375x667, 390x844 and 1440x900.** On short phones (the `short:` variant: phone layout under about 720px tall) photos shrink and spacing tightens. Never cut copy without asking.
- **One left edge:** content starts at the second column of the 12-column grid (`md:ml-[8.333%]`).
- **Side gutters:** 20px phones, 48px tablet, 64px desktop.

### Photography

- **Warm natural light, one consistent colour grade,** shot like a magazine feature, not an advertisement. Eye contact and real smiles. The Sherpa beside the member, never across the room. No stock images, renders, mirrors or posed flexing. Placeholders name the shot they stand in for.

### Motion

- **Native scrolling: the visitor is always in control of scrolling.** No scroll hijacking, no snapping, no added smoothing.
- **Reveal:** a quiet fade in over about 0.9s, one line after another. No rising.
- **The loop diagram** draws in once (about two seconds). **Quotes** cross-fade slowly. **The booking panel** slides up slowly. **Pages** cross-fade (about one second).
- **Reduced motion:** all movement off (no rising, sliding or drawing); colour and opacity changes keep the same slow fade.

---

## Voice rules

- **First names, both ways.** Never "sir", "ma'am" or "client". The site always says **member**.
- **Never "at your age".**
- **Member, Sherpa, Belong, Reserve Score.** Never Performance Guide, Tribe or trainer.
- **Calm and certain.** No exclamation marks in our own copy (members' quotes keep theirs), no urgency, no countdowns, no scarcity.
- **Plain words, not gym jargon.** **Fun is allowed:** coffee, the clap, pizza.
- **Health statistics carry their source.**

### Deck lines not to use

- Deck 1 slides 12 to 13 ("Mindset can reverse physical decay", "Reversal is real"): break the no-promises rule.
- Deck 1 slide 6 "Roughly half of the extra years…": no source.
- Deck 4 slide 21 "low muscle is linked to a higher risk of death" and slide 5 "how long you stay well": longevity claims.
- Deck 7's test count ("sixteen scored tests"): its own dials add to 15. Don't state a count until confirmed.

---

## Code conventions

- Next.js 16 App Router, TypeScript, Tailwind CSS v4 (CSS-first `@theme` in `app/globals.css`). Read `node_modules/next/dist/docs/` before using an API.
- **Route groups:** `app/(site)/` holds the live pages and their layout (navigation, footer, booking panel); `app/(tile)/` holds the style tile and its layout. The root layout holds only `<html>`, the colour fade, the JSON-LD and analytics.
- **Draft quotes guard:** member quotes live in `content/quotes.ts` with `draft: true` until consent, name and age are recorded. `npm run build` runs `scripts/check-drafts.mjs` first: a production build for bigtoe.in (Vercel production whose domain is bigtoe.in) fails while any quote is a draft; other builds only warn. `npm run check:drafts` runs it alone.
- `content/facts.ts`: every reusable fact. `content/<page>.ts`: that page's copy. `content/site.ts`: navigation, footer labels, metadata. `content/booking.ts`: the panel. `content/legal.ts`: terms and privacy.
- `components/`: layout, motion primitives and UI. No copy inside.
- Motion: `motion` for reveals; scrolling is native. Every primitive checks reduced motion.
- Env vars: `RESEND_API_KEY`, `CONTACT_EMAIL` (comma-separated for several), `RESEND_FROM` (a sender on a domain verified in Resend), `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL` (defaults to https://bigtoe.in). Without Resend keys in development the booking logs instead of sending; in production it shows the failure message with the email address.
- SEO: titles and descriptions in `content/site.ts` (`meta`). LocalBusiness JSON-LD in `app/layout.tsx`, built only from `facts`. `app/opengraph-image.tsx` (the core belief, Anderson Grotesk from `docs/fonts/*.otf`), `app/sitemap.ts` (Home, Method, Team, terms, privacy), `app/robots.ts`.

---

## Still open

- [ ] WhatsApp number to publish (footer, thank-you "Message us now", the tile's request panel).
- [ ] New design: an "All questions" page (the tile links to /faq, which does not exist yet); the member quotes in `content/quotes.ts` are drafts until each member's words, consent, name and age are recorded (see the agreed copy for which cards are illustrative, proposed or real).
- [ ] Map link ("Location on Maps").
- [ ] Member quotes: first name, age and written consent for all four (three on Home, one on Team). Source needed for two not in `docs/copy/testimonials.md`: "It's more than a place. It's family." and "Jeevan can absolutely kick your butt…".
- [ ] Sherpa name spellings (Himanshu, Saurav, Sumit, Tanuj, Kabir), and each Sherpa's OK to publish their line.
- [ ] Jay's son has seen the story before it goes public.
- [ ] Founder lines to confirm with each founder (Hard Rock; MSc, Middlesex University London; Nourish Organics; 20 years leading finance teams).
- [ ] FAQ facts to confirm: health-history form and doctor check; online sessions and pausing; nutritionist and blood markers as a paid option.
- [ ] Resend: API key, verified sending domain (`RESEND_FROM`) and `CONTACT_EMAIL` set in Vercel.
- [ ] The 16 photos in `docs/shot-list.md`; member photos need written consent.
- [ ] Anderson Grotesk licence covers web use. Logo SVG needed (`docs/logo/` has PNGs only).
- [ ] **Terms & Conditions conflicts (not edited):** "Wellness and Membership Services are non-refundable and non-transferable." and "If misused, they will be promptly revoked without refund." contradict the eight-session money-back guarantee; "These charges and services may change at the discretion of the Company…" sits awkwardly with the published price range; "memberships may be transferable subject to approval" contradicts "Memberships are strictly non-transferable."; "The primary objective of BigToe is to promote general wellbeing, injury prevention, and senior citizen welfare." is a health claim; services listed that are not offered (food, medical consultations, merchandise, an app, a Fitness Academy); "Photographs or videos recorded during sessions may be accessible to other users." needs to match the member-photo consent. The terms do not state opening hours, so nothing conflicts with the new hours.
- [ ] **Privacy Policy conflicts (not edited):** contact "via email, SMS, or phone calls" but the booking says WhatsApp; booking details are emailed through Resend (not mentioned); it describes an app, account settings, HealthKit and Google Fit.
