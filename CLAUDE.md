@AGENTS.md

# BigToe website: rulebook

## North star

**One job: get the right person to book a first visit.** Less is 20x more. If a screen does not serve that, cut it. One idea per screen.

## Copy rules (agreed copy, 18 Nov 2026)

- **Copy comes from `docs/copy/agreed-copy-2026-11-18.md`, with the changes in the 18 Nov build brief** (a line in the brief wins). Lines in neither are marked "proposed" in the content file or shown as TODOs.
- **One idea per screen:** a short headline, a supporting line or two, at most one button.
- **One button label everywhere:** "Book your first visit" (`facts.cta`); "Book a visit" (`facts.ctaShort`) only in the phone header, where the full label does not fit. Every button opens the request panel.
- **Facts are used everywhere from `content/facts.ts`, never retyped:** price "₹25,000 to ₹50,000 a month, depending on how often you train."; "Your first hour is free."; the guarantee "Complete six sessions within three weeks of joining. Not for you? Your money back, no questions asked." (the FAQ adds "Studio and online sessions both count."); hours Monday to Saturday, 6 am to 8 pm, Sunday, 8 am to 1 pm; up to five members at a time; 20,000+ coaching hours (Jeevan); founders Jay Singh 59, Jeevan Aujla 41, Seema Jindal 58, Rodrigo Pérez 51; Sherpas Himanshu, Saurav, Sumit, Tanuj, Kabir.
- **Member quotes and photos are placeholders until written consent:** first name and age show as visible TODOs and each card carries a "Draft" badge. A quote is a member's own words, never reworded or added to; `source` in `content/quotes.ts` says where each comes from.
- **"Reserve Audit"** is the assessment; its example dials (Method only) show four dials (Body composition 78, Balance and mobility 42, Functional strength 90, Conditioning 66), always labelled "Example".
- **All page copy lives in `content/*.ts`,** never inside components. Missing facts become visible TODOs (rendered as `TODO: …`), listed in "Still open".
- **No health promises.** Nothing that says prevent, reverse, cure or live longer; no diagnosis. Medical questions defer to the member's doctor.
- **American spelling throughout.**
- **Brand colours only:** off-white #F0EEEB, navy #0A212D, terracotta #D4644D. Typeface Anderson Grotesk: Light for headlines, Regular for text, Bold for the button and small labels.

### Words

- **Never:** crush, shred, grind, push, transform, burn, beast, no excuses, limited, spots left, hurry. The list covers force language ("push you past your limits"), not movement names: "push" stays in the Big Seven (Squat. Hinge. Lunge. Push. Pull. Rotate. Walk or run.) and in "lift, push and carry".
- **Prefer:** build, restore, calibrate, cultivate, steward, guide.
- The tone is fitness meets high-end hospitality: calm, warm, unhurried.

---

## Design (built from the approved style tile, 18 Nov 2026)

References: ouraring.com and functionhealth.com for layouts, cards, type and spacing; Oura's "Sleep and Rest" cards for the founder and Sherpa cards. `/style-tile` (round seven, as approved) stays reachable for reference: noindex, not in the sitemap or the menu. Its tile-only screens live in `components/tile/` and `content/style-tile.ts`; everything shared is in `components/site/`.

### Base style

- **Page background #F0EEEB, text navy #0A212D** (edges and overscroll included) on every page.
- **The navy switch (Home only):** from "Your coach. Your plan." to the footer the page is navy with #F0EEEB text; cards stay off-white with navy text. A slow fade of the page colour over about half a screen as that section arrives (`NavyZone`, which sets `--site-bg`). One change only, never back. Method, Team, FAQ and the legal pages stay light, footer included.
- **Terracotta #D4644D** only for the button and at most one accent phrase per headline (`Accented` in the content files). Never terracotta text on a photo: the hero headline is all #F0EEEB with only its full stop in terracotta.
- **Type, named styles in `app/globals.css` only:** `ty-hero` (40px phones, 88px desktop, Light: the Home hero and the inner page titles), `ty-headline` (36 to 64px Light), `ty-sub` (20 to 24px Regular: lines under headlines, step titles, quotes, questions), `ty-body` (16 to 18px), `ty-small` (14 to 15px, the footer), `ty-label` (13px Bold, sentence case: pills and small labels). The member card title is the one uppercase label (13px Bold, spaced).
- **Cards:** 16px corners; off-white with a hairline navy border on the light page; off-white in the navy zone. Pills are fully rounded.
- **Layout:** content in a 1280px column (`tile-wrap`: 20px gutters on phones, 40px on tablets, 64px on desktop); the hero runs edge to edge; carousels run to the screen edge with the first card on the column (`tile-edge`). About 96px between screens on phones, 144px on desktop (`space` in `components/site/styles.ts`).
- **Photos:** every slot shows the coffee bar photo until the shoot, cropped per slot (`components/site/Photo.tsx`); the alt text names the shot it stands in for (`docs/shot-list.md`). Text sits on a photo only in the hero and in frosted pills and panels.

### Header and menu (every page, `components/site/Header.tsx`)

- **Always visible, never hides.** A full-width frosted light bar (`bg-offwhite/80`, backdrop blur) with a hairline at the bottom: the navy logo (links to Home) on the left; on the right the terracotta pill ("Book your first visit" on desktop, "Book a visit" on phones) and the three-line icon (labelled "Menu"). No text links in the bar. 44px tap targets.
- **The menu:** a full-screen off-white list, Home, Method, Team, FAQ (the current page in terracotta), with the book pill at the bottom. Close or Escape closes it; focus returns to the icon.

### Footer (every page, `components/site/Footer.tsx`)

The LogoTag; the address; the hours; "WhatsApp [TODO]. hello@bigtoe.in."; Careers (mailto), Location on Maps (TODO), Terms & Conditions, Privacy Policy. Each page renders its own footer: on Home it sits in the navy zone with the light LogoTag (`tone="navy"`); elsewhere light, with the navy LogoTag.

### Inner pages

Method, Team and FAQ start with "← Back to home", then the page title in `ty-hero` (`components/site/PageTitle.tsx`).

### Motion

- **Content fades up once as it arrives** (about 16px, 0.6s; lines one after another; `components/site/Rise.tsx`). Native scrolling, no page snapping, no scroll hijacking.
- **The dials appear once, on Method screen 1** (`FourDials` in `components/site/Dials.tsx`): the four fill one after another, once, as the card arrives. (`DialSplit`, the scroll-linked version, is used only by /style-tile.)
- **Member cards** (`components/site/Members.tsx`): no stacking; the cards scroll normally, each fully visible. The photo keeps its own shape and is never cropped: about 85% of the card's width on phones with the name and quote below it, beside them on desktop.
- **Founder and Sherpa cards** (Oura's "Sleep and Rest", `components/team/PortraitCards.tsx`): the plus grows the card to fill most of the screen (a shared layout animation) and reveals the label (founders: "Age 59") and line beneath the name; ×, Escape or a tap outside returns it and focus goes back to the plus.
- **Carousels are manual** (swipe on phones, arrows on desktop; snap points inside the row only). Never autoplay.
- Small interface transitions (the plus, the accordion) take about 0.3s.
- **Reduced motion: everything still** and shown in its final state; an opened portrait card appears without growing. The navy switch still runs: it is a colour fade, not movement.

---

## Site structure

Pages (all in `app/(site)/`, one layout: header and request panel): **Home (`/`), Method (`/method`), Team (`/team`), FAQ (`/faq`),** plus **`/terms`** and **`/privacy`**; `/style-tile` (reference). There is no booking page: the panel opens anywhere.

Redirects (permanent, `next.config.ts`): `/membership` and `/book-now` go to Home; `/faqs` goes to `/faq`.

### Request panel (`components/site/VisitPanel.tsx`, `content/booking.ts`)

Centred dialog on desktop, bottom sheet on phones. Name, mobile number, preferred time (weekday morning, weekday evening, weekend). Thank you: "Thank you, [name]. We'll confirm your visit on WhatsApp." with the intake form (`facts.intakeFormUrl`, new tab) and WhatsApp. A request, not a confirmed appointment; no health questions (that is the intake form's job). Server action `app/actions/visit.ts` (honeypot, validation shared with the browser in `lib/visit.ts`), email via Resend to `CONTACT_EMAIL`. Analytics (Vercel): "Visit panel" on open (placement, page), "Visit submit" on submit (page, result). Never personal details.

### Home (`content/home.ts`, `components/home/HomeScreens.tsx`)

1. **Hero** (after Function's "Check your health."): a full-screen photo; a navy gradient rising from the bottom to about 60% of the height on phones and 70% on desktop, solid navy behind the text block and clear at the top. The frosted pill "Vasant Vihar, New Delhi."; "The second half of life should be stronger than the first." (all #F0EEEB, only the full stop terracotta); "One-to-one training for life after 40."; the button. Text #F0EEEB with a faint shadow; phones crop the photo higher so the logo wall clears the words; safe-area padding below.
2. **Text only, centred:** "We train for a sport called life." / "A suitcase to lift. Unexpected stairs. A trip to say yes to." / "Build the strength for what comes next." Pill link "How we train" → /method.
3. **The split (the navy switch begins here):** "Your coach. Your plan." / "A dedicated coach guides you through every session. Your Reserve Audit sets the starting point. Your progress shapes what comes next." Pill link "Meet the team" → /team. One photo card on the right (below on phones): a coach guiding a member.
4. **"In our members' words."** Three cards (`content/quotes.ts`), scrolling normally: the photo at its own shape, "TODO: first name, TODO: age" with a Draft badge, the quote. Each quote has a `video` slot for later, not used yet.
5. **"Get stronger. Keep the pizza."** / "A healthier life shouldn't mean giving up the things you enjoy." One photo card.
6. **"Your first hour."** Function's three steps, titles only: 01 Meet a founder. 02 A body scan and light assessment. 03 Coffee and a chat.
7. **Ending, centred:** "Come and meet us." / the price / "Your first hour is free." / the guarantee / the button.
8. **Questions:** "Questions." and an accordion of three (Who is BigToe for?; the injury question; What does it cost?), answers as on the FAQ page, then "See all questions →" → /faq. Then the footer.

### Method, "How we train" (`content/method.ts`, `components/method/MethodScreens.tsx`)

1. "Know your starting point." / "The Reserve Audit measures four dials." / the four example dials (2 x 2 on phones, "Example") / "Your plan starts with the dial that needs the most attention."
2. "Build more than appearance." Three icon-and-text cards (line icons: a flexed arm, a dumbbell, a lightning bolt; stacked on phones): Muscle. What you're made of. / Strength. What you can lift, push and carry. / Power. How fast you can move when it counts. Then "Capacity you can use outside the studio."
3. "Train from the ground up." / "Bare feet. Free weights. Attention to movement." The photo (bare feet on the training floor), then the Big Seven as large Light type: Squat. Hinge. Lunge. Push. Pull. Rotate. Walk or run.
4. "Your goals. Our shared commitment." / "Set goals with your coach, whom we call a Sherpa. Train with their guidance. Review your progress together." The pledge photo; the button.

### Team (`content/team.ts`, `components/team/`)

1. "Why we built this." Jay's story in three lines, signed "Jay". Text only, generous space.
2. "The four of us." The Decode story, then the four founders as portrait cards (4:5, `PortraitCards`): the name in a pill and a round plus; opened, "Age 59" (proposed wording) and the credential. Swipe on phones, arrows on desktop.
3. "Your Sherpas." / "A Sherpa walks the path with you: …" Five portrait cards (4:5, `PortraitCards`) with the first name in a pill and a round plus, each Sherpa's line in first person when opened. Then "Every Sherpa trains under Jeevan, and every workout template is his." and the button.

### FAQ, "Questions" (`content/faq.ts`)

Thirteen questions in four groups (`faqGroups`), each under a small label with its own accordion (one open at a time; the first group opens its first question): Getting started (who it's for, first visit, what to wear), Training (who trains me, session length, training in front of others, how many at a time), Health and safety (injury or condition), Membership (cost, membership and pausing, scheduling, if it isn't for me, community). The ten agreed answers word for word; three drafted from site facts, with TODOs where a fact needs confirming. Then the button.

### Terms and privacy (`content/legal.ts`, `components/legal/LegalText.tsx`)

Fetched from bigtoe.in on 17 Nov 2026 and published **word for word**, plain text in the site style. Never edit them; conflicts are flagged under "Still open".

---

## Voice rules

- **First names, both ways.** Never "sir", "ma'am" or "client". The site always says **member**.
- **Never "at your age".**
- **Member, Sherpa, Reserve Audit.** Never Performance Guide, Tribe or trainer.
- **Calm and certain.** No exclamation marks in our own copy (members' quotes keep theirs), no urgency, no countdowns, no scarcity.
- **Plain words, not gym jargon.** **Fun is allowed:** coffee, pizza.
- **Health statistics carry their source.**

### Deck lines not to use

- Deck 1 slides 12 to 13 ("Mindset can reverse physical decay", "Reversal is real"): break the no-promises rule.
- Deck 1 slide 6 "Roughly half of the extra years…": no source.
- Deck 4 slide 21 "low muscle is linked to a higher risk of death" and slide 5 "how long you stay well": longevity claims.
- Deck 7's test count ("sixteen scored tests"): its own dials add to 15. Don't state a count until confirmed.

---

## Code conventions

- Next.js 16 App Router, TypeScript, Tailwind CSS v4 (CSS-first `@theme` in `app/globals.css`; Tailwind's default palette is switched off, so only the brand colours exist). Read `node_modules/next/dist/docs/` before using an API.
- **Folders:** `app/(site)/` holds every page and the one layout; the root layout holds only `<html>`, the JSON-LD and analytics. `components/site/` holds the shared pieces (header, footer, request panel, reveal, dials, member cards, navy zone, accordion, photo slot); `components/home|method|team/` each page's screens; `components/tile/` the style tile's own screens.
- **Draft quotes guard:** member quotes live in `content/quotes.ts` with `draft: true` until consent, name and age are recorded. `npm run build` runs `scripts/check-drafts.mjs` first: a production build for bigtoe.in (Vercel production whose domain is bigtoe.in) fails while any quote is a draft; other builds only warn. `npm run check:drafts` runs it alone. Keep `content/quotes.ts` free of imports.
- `content/facts.ts`: every reusable fact. `content/<page>.ts`: that page's copy (`home`, `method`, `team`, `faq`). `content/site.ts`: menu, footer labels, the example dials, member card labels, metadata. `content/booking.ts`: the request panel. `content/legal.ts`: terms and privacy.
- Components hold no copy. Motion: `motion` for reveals and the scroll-linked pieces; scrolling is native. Every primitive checks reduced motion.
- Env vars: `RESEND_API_KEY`, `CONTACT_EMAIL` (comma-separated for several), `RESEND_FROM` (a sender on a domain verified in Resend), `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL` (defaults to https://bigtoe.in).
- SEO: titles and descriptions in `content/site.ts` (`meta`). LocalBusiness JSON-LD in `app/layout.tsx`, built only from `facts`. `app/opengraph-image.tsx` (the hero line, Anderson Grotesk from `docs/fonts/*.otf`), `app/sitemap.ts` (Home, Method, Team, FAQ, terms, privacy; not /style-tile), `app/robots.ts`.

---

## Still open

- [ ] WhatsApp number to publish (footer, the request panel's thank-you).
- [ ] Map link ("Location on Maps").
- [ ] Member quotes (`content/quotes.ts`): first name, age and written consent for each; card 1 is an illustrative draft and card 4 proposed wording (see the agreed copy), not yet members' words.
- [ ] FAQ drafts to confirm: towels and water provided; monthly billing and pause rules.
- [ ] The example dial numbers (Method): the agreed copy's direction says "without invented scores"; the 18 Nov brief keeps the example numbers.
- [ ] "Age 59" on the opened founder cards is proposed wording.
- [ ] Sherpa name spellings, and each Sherpa's OK to publish their line.
- [ ] Jay's son has seen the story before it goes public.
- [ ] Founder lines to confirm with each founder (Hard Rock Cafe India and Shiro; MSc, Middlesex University London; Nourish Organics; a career leading finance teams).
- [ ] Resend: API key, verified sending domain (`RESEND_FROM`) and `CONTACT_EMAIL` set in Vercel.
- [ ] The 16 photos in `docs/shot-list.md`; member photos need written consent.
- [ ] Anderson Grotesk licence covers web use. Logo SVG needed (`docs/logo/` has PNGs only).
- [ ] **Terms & Conditions conflicts (not edited):** "Wellness and Membership Services are non-refundable and non-transferable." and "If misused, they will be promptly revoked without refund." contradict the money-back guarantee; "These charges and services may change at the discretion of the Company…" sits awkwardly with the published price range; "memberships may be transferable subject to approval" contradicts "Memberships are strictly non-transferable."; "The primary objective of BigToe is to promote general wellbeing, injury prevention, and senior citizen welfare." is a health claim; services listed that are not offered (food, medical consultations, merchandise, an app, a Fitness Academy); "Photographs or videos recorded during sessions may be accessible to other users." needs to match the member-photo consent.
- [ ] **Privacy Policy conflicts (not edited):** contact "via email, SMS, or phone calls" but the booking says WhatsApp; booking details are emailed through Resend (not mentioned); it describes an app, account settings, HealthKit and Google Fit.
