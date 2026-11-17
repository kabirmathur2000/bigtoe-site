@AGENTS.md

# BigToe website: rulebook

## North star

**One job: get the right person to book a free first hour.** Less is 20x more. If a screen does not serve that, cut it. The whole site, all pages, takes about two minutes to scroll. Reference: 10squared.com for flow, where each screen is its own setting.

## Rules

- **One idea per screen:** a short headline, one supporting line, at most one button.
- **One button label everywhere:** "Book your first hour" (`facts.ctaLabel`), shown in the button style (19px Bold uppercase). Never a variant. Every button opens the booking panel.
- **Visuals only:** the space, the Sherpas, the founders, plus the one loop diagram on The Method. Grey placeholders named for the shot until the shoot. No member photos.
- **Member quotes are placeholders until written consent:** first name, age and consent show as visible TODOs. A quote is a member's own words, cut but never reworded or added to.
- **Every reusable fact lives in `content/facts.ts`** and is imported (price, guarantee, address, hours, email, WhatsApp, button label, frequency). **All page copy lives in `content/*.ts`,** never inside components.
- **Wording:** the approved final plan (17 Nov 2026) for the site; the decks for anything new. Never invent claims, statistics, prices or member quotes. If something is missing, put a visible TODO in the content file (rendered as `TODO: …`) and list it.
- **No health promises.** Nothing that says prevent, reverse, cure or live longer; no medical or diagnostic language. "Inevitable" only in the Rebellious refusal.
- **American spelling throughout** (aging, realizing, pretense).
- **Brand colours only:** off-white #F0EEEB, navy #0A212D, terracotta #D4644D. No mixed or darkened shades; hovers are a slow opacity change. Typeface Anderson Grotesk.

Sources: the final plan (above), then `docs/website-guide.md`, then the decks in `docs/decks/`, then `docs/copy/`.

---

## Site structure

Pages: **Home (`/`), The Method (`/method`), Team (`/team`),** plus **`/terms`** and **`/privacy`**. There is no booking page: the panel opens anywhere.

Redirects (permanent, `next.config.ts`): `/membership`, `/faqs` and `/book-now` go to Home.

### Booking panel (`components/booking/BookingPanel.tsx`)

- Every button (`BookButton`) opens it. A calm panel in the brand light colour slides up from the bottom (a modal `<dialog>`; navy backdrop at 60%): heading "Book your first hour", fields first name and WhatsApp number, button "Book your first hour". Close, Escape or a tap outside closes it; focus stays inside and returns to the button; the page behind does not scroll. Reduced motion: a slow fade.
- On submit: server action `app/actions/book.ts` (honeypot, validation shared with the browser in `lib/booking.ts`), email via Resend to `CONTACT_EMAIL`. Then the thank-you: "Thank you, {name}. We'll message you on WhatsApp to set your first hour." Then "Before you come, tell us a little about yourself." and the button "Fill in the short form" (`facts.preVisitFormUrl`, new tab), and a smaller "Message us now" WhatsApp button (TODO until the number is set).
- The spam trap ("Company") is off-screen, `aria-hidden` and out of the tab order.
- Analytics (Vercel): "Booking panel" on open (placement, page); "Booking submit" on every submit (page, result: invalid, sent or failed). Never personal details.

### Home (`app/page.tsx`, `content/home.ts`)

1. **Light, photo (the studio floor).** "The second half should be the stronger half." / "A strength studio for life after 40. Post-physio to lifelong athletes." / the button (desktop; phones use the bottom bar).
2. **Light, no visual.** "We train for a sport called life." / "No off-season. No substitutes. Most people play it untrained." / text link "Why we built this" to /team.
3. **Light, photo (the coffee corner).** "Looking fit isn't being fit." / "Start with one free hour. A body scan. A session at your pace. Coffee, and a straight talk about what's next."
4. **Navy, photo (Sherpas at work); the colour fade runs across it.** "Seen. Belong. Progress." / "In our members' words." Five quotes, one at a time (`components/home/Quotes.tsx`): arrows below the quote on desktop, swipe on phones, never automatic, no loop, slow cross-fade, no member photos.
5. **Navy, no visual.** "₹25,000 to ₹45,000 a month." / "Set with you in your first hour. In writing, before you commit." / "Not seeing progress in your functional scores after 30 days? Your money back." / the button.
- **FAQs** under screen 5, collapsed (`components/ui/Faqs.tsx`): Who is BigToe for?; I have an old injury. Is it safe?; How often will I train?; What is the Reserve Audit? Not a full screen; it runs as long as it needs.

### The Method (`app/method/page.tsx`, `content/method.ts`)

Photos of the space and the Sherpas only.

1. **Light, photo (the training floor).** "The Strength Reserve." / "More strength than your day demands."
2. **Light, no visual.** "What fades." / "Muscle. Strength. Power."
3. **Navy, photo (a Sherpa coaching); the colour fade runs across it.** "What we train." / "Mobility and balance. Strength. Conditioning."
4. **Navy.** "What we promise." Then the loop diagram (`components/method/Loop.tsx`), then "If your numbers don't move, the failure is ours." and the button.

**The loop diagram:** after Love.Life's "A smarter way to take care of you" panel, in BigToe's words and brand. One panel, hairline border in the current text colour, 8px corners, four columns divided by three smooth arcs of different curvature: **Measure / Train the weakest / Retest / Recalibrate**. A thin terracotta line rises gently left to right across all four (the Strength Reserve widening); it never slopes downward. As it arrives the arcs and the line draw together, then the words fade in left to right: about two seconds in all; static under reduced motion. Phones: stacked, arcs across (bowing upward, clear of the words), no line inside; a short terracotta line rises bottom-left to top-right above the panel. Drawn at the panel's real pixel size so hairlines stay crisp.

### Team (`app/team/page.tsx`, `content/team.ts`, `components/team/TeamScreens.tsx`)

1. **Light, no visual.** "Why we built this." Jay's story as cut for the final plan (three short paragraphs), signed "Jay".
2. **Light, the four founder portraits.** "The four of us." The three values (Rooted, Real, Rebellious, from Deck 1 slide 7), then each founder: Jay Singh, 59. Co-founder.; Jeevan Aujla. Chief Training Officer. UK-certified. Over 20,000 hours coaching real people.; Seema Jindal and Rodrigo Pérez with role TODOs. Phones: a list with a small portrait; desktop: four portraits in a row.
3. **Navy, four Sherpa portraits.** "Your Sherpas." First names only: Himanshu, Saurav, Sumit, Tanuj (spellings TODO).
4. **Navy.** The button alone, on a shorter closing screen (60% of the screen height).

### Terms and privacy (`content/legal.ts`, `components/legal/LegalText.tsx`)

Fetched from bigtoe.in on 17 Nov 2026 and published **word for word**, plain text in the site style. Never edit them; conflicts are flagged under "Still open".

### Footer (every page, navy, light LogoTag)

"BigToe. 43 Basant Lok, 3rd Floor, Vasant Vihar, New Delhi 110057. 6 am to 10 pm, every day." with the map link (TODO); "WhatsApp [number TODO]. hello@bigtoe.in."; "There's no parking at the studio. Come by cab or get dropped off."; links Terms & Conditions and Privacy Policy; then the Practice Possibility poem, small (`content/poem.ts`, fixed wording). The footer paints navy even on pages with no navy section.

---

## Look: design direction

**Brief: wealthy, professional and high class, yet welcoming and warm, with modern transitions and flow.** Luxury comes from restraint: fewer elements, more space, larger photographs, slower movement.

### Colour

- **Brand colours only.** Tokens: `--color-navy #0A212D`, `--color-terracotta #D4644D`, `--color-offwhite #F0EEEB`. Tailwind's default palette is switched off (`--color-*: initial`), so no other colour class exists. No exceptions (the dials' green is gone with the Scoreboard). Tints for hairlines and secondary text are made from these with opacity, never new hues. "Off-white" always means #F0EEEB.
- **Main button:** terracotta fill with off-white text, label 19px Bold uppercase so it passes AA as large text. The same on light and navy. Hover: a slow opacity change. Square corners, no shadows.
- **Terracotta beyond the button** is one accent per screen (the rising line in the loop). Terracotta text must be large (24px+, or 19px+ bold); the temporary TODO text is the only exception and goes at launch.
- **Contrast:** all text passes WCAG AA. Secondary text uses navy or off-white at 75% opacity or more.
- **One button visible at a time.** The navigation button (desktop) and the bottom bar (phones) step aside while an in-page button (`data-cta`) is on screen.
- **Colour zones: each page changes colour once,** light first, then one slow fade to navy, then navy to the footer. No fade back. Home and The Method: the fade runs across the first navy photo screen and is complete when that screen reaches the top. Team: over about 60% of the screen height as "Your Sherpas" arrives. The legal pages stay light. **Each section keeps its own text colour** (navy on light, off-white on navy), so text never flips mid-fade. Never a hard colour switch, on any setting.
- **No gradients, no drop shadows, no glossy effects.** Hairline rules only.

### Navigation (`components/layout/Header.tsx`, `HeaderShell`)

A floating bar on every page: inset from the screen edges, 8px corners, off-white with a hairline border; the navy logo, then Home, The Method, Team and the button (desktop). Phones: the logo and the three links; the button is fixed to the bottom of the screen (`MobileBookBar`). The current page is underlined. 44px tap targets. It hides while scrolling down and slides back as soon as the visitor scrolls up, in both zones; always visible at the very top and when a keyboard user tabs into it. Under reduced motion it stays visible.

### Logo

- The LogoTag ("Practice Possibility") appears once per page, in the navy footer, light version (`public/brand/logo-tag-light.png`), 88px desktop, 72px phones.
- The navy logo in the navigation bar: 36px desktop, 28px phones, on off-white only.

### Typography

- **Anderson Grotesk throughout,** from the files in `docs/fonts` (served as `.woff2` copies in `public/fonts`; the share image reads the `.otf` directly). Licence for web use still to confirm.
- **Weight rule: two weights only, Regular and Bold.** Every headline is **Regular**, to match the logo, the decks and the studio wall. **Bold** is only for the button label and small spaced-out labels (form labels). **Never Light** (it reads thinner than the brand): it is not loaded, and its files are removed. Ultrabold and the obliques are not used.
- Headlines large, sentence case, tight line spacing.
- Type scale (fluid, mobile → desktop), all Regular unless noted: `display` 48 → 88px; `h1` 40 → 64px; `h2` 32 → 44px; `h3` 22 → 26px; `body-lg` 20px; `body` 18px; `caption` 14px; `label` 12 → 13px Bold uppercase 0.16em.

### Screens and layout

- **Every screen fills the window** (100svh; the first screen of a page 100svh below the navigation) and its content is fully visible, clear of the mobile bottom bar. Text screens: `TextScreen`; photo screens: `PhotoScreen` (photo across the top, words below), in `components/ui/Screen.tsx`. Every screen keeps a band the height of the navigation at its top (`--chapter-band`), except photo screens, whose photo runs to the top edge.
- **Allowed to run longer:** the FAQs, the legal pages, and the closing Team screen (shorter, 60%).
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
- **Member, Sherpa, Belong, Strength Reserve.** Never Performance Guide, Tribe, trainer, or "Reserve Score" alone (Deck 7's term is "Strength Reserve Score").
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
- `content/facts.ts`: every reusable fact. `content/<page>.ts`: that page's copy. `content/site.ts`: navigation, footer labels, metadata. `content/booking.ts`: the panel. `content/legal.ts`: terms and privacy. `content/poem.ts`: the poem.
- `components/`: layout, motion primitives and UI. No copy inside.
- Motion: `motion` for reveals; scrolling is native. Every primitive checks reduced motion.
- Env vars: `RESEND_API_KEY`, `CONTACT_EMAIL` (comma-separated for several), `RESEND_FROM` (a sender on a domain verified in Resend), `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL` (defaults to https://bigtoe.in). Without Resend keys in development the booking logs instead of sending; in production it shows the failure message with the email address.
- SEO: titles and descriptions in `content/site.ts` (`meta`). LocalBusiness JSON-LD in `app/layout.tsx`, built only from `facts`. `app/opengraph-image.tsx` (the core belief, Anderson Grotesk from `docs/fonts/*.otf`), `app/sitemap.ts` (Home, The Method, Team, terms, privacy), `app/robots.ts`.

---

## Still open

- [ ] WhatsApp number to publish (footer, thank-you "Message us now").
- [ ] Map link for the address. Address and hours still current?
- [ ] Member quotes: first name, age and written consent for all five. Quote 4 ("He can absolutely kick your butt…") is not in `docs/copy/testimonials.md`: add its source. Quote 5 is shown as the member wrote it ("I've now enrolled my daughter too."); the plan's "which says it all!" is not in their words.
- [ ] Seema Jindal and Rodrigo Pérez: role and one line each.
- [ ] Sherpa name spellings.
- [ ] Jay's son has seen the story before it goes public.
- [ ] FAQ facts to confirm: "health-history form", "we check with your doctor"; "About two thirds women" (Deck 1 says 65%).
- [ ] Jeevan's line ("UK-certified. Over 20,000 hours coaching real people.") to confirm; not in the decks.
- [ ] Guarantee: "functional scores" to match what the Reserve Audit measures.
- [ ] Resend: API key, verified sending domain (`RESEND_FROM`) and `CONTACT_EMAIL` set in Vercel.
- [ ] The 9 placeholder photos (studio floor, coffee corner, Sherpas at work, training floor, Sherpa coaching, four founders, four Sherpas).
- [ ] Anderson Grotesk licence covers web use. Logo SVG needed (`docs/logo/` has PNGs only).
- [ ] **Terms & Conditions conflicts (not edited):** "Wellness and Membership Services are non-refundable and non-transferable." contradicts the 30-day money-back guarantee; "memberships may be transferable subject to approval" contradicts "Memberships are strictly non-transferable."; "The primary objective of BigToe is to promote general wellbeing, injury prevention, and senior citizen welfare." is a health claim; the services listed (food, medical consultations, merchandise, an app, a Fitness Academy) are not offered; "By accessing or using the App" (no app).
- [ ] **Privacy Policy conflicts (not edited):** it covers contact "via email, SMS, or phone calls" but the booking says "We'll message you on WhatsApp"; it does not mention that booking details are emailed through Resend; it describes an app, account settings, HealthKit and Google Fit, which the site does not have; the "Sharing of Personal Information" section does not say with whom data is shared.
