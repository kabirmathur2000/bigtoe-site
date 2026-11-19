@AGENTS.md

# BigToe website: rulebook

## North star

**One job: get the right person to book a first visit.** Less is 20x more. If a screen does not serve that, cut it. One idea per screen.

## Copy rules (agreed copy, 18 Nov 2026)

- **Copy comes from `docs/copy/agreed-copy-2026-11-18.md`, with the changes in the 19 Nov one-page brief** (a line in the brief wins). Lines in neither are marked "proposed" in the content file or shown as TODOs.
- **One idea per section:** a short headline, a supporting line or two, a closing line at most. **No buttons in any section.**
- **One button label everywhere:** "Book your first visit" (`facts.cta`); "Book a visit" (`facts.ctaShort`) only in the phone header, where the full label does not fit. The only buttons are the header pill and the menu's pill; both open the request panel.
- **Facts are used everywhere from `content/facts.ts`, never retyped:** price "₹25,000 to ₹50,000 a month, depending on how often you train."; "Your first hour is free."; the guarantee "Complete six sessions within three weeks of joining. Not for you? Your money back, no questions asked." (the FAQ adds "Studio and online sessions both count."); hours Monday to Saturday, 6 am to 8 pm, Sunday, 8 am to 1 pm; up to five members at a time; 20,000+ coaching hours (Jeevan); founders Jay Singh 59, Jeevan Aujla 41, Seema Jindal 58, Rodrigo Pérez 51; Sherpas Himanshu, Saurav, Sumit, Tanuj, Kabir.
- **Member quotes and photos are placeholders until written consent:** first name and age show as visible TODOs and each card carries a "Draft" badge. A quote is a member's own words, never reworded or added to; `source` in `content/quotes.ts` says where each comes from.
- **"Reserve Audit"** is the assessment; its example dials ("Know your starting point.") show the Strength Reserve ring (69) and four dials (Body composition 78, Balance and mobility 42, Functional strength 90, Conditioning 66), always labelled "Example".
- **All page copy lives in `content/*.ts`,** never inside components. Missing facts become visible TODOs (rendered as `TODO: …`), listed in "Still open".
- **No health promises.** Nothing that says prevent, reverse, cure or live longer; no diagnosis. Medical questions defer to the member's doctor.
- **American spelling throughout.**
- **Brand colours only:** off-white #F0EEEB, navy #0A212D, terracotta #D4644D. Typeface Anderson Grotesk: Light for headlines, Regular for text, Bold for the button and small labels.

### Words

- **Never:** crush, shred, grind, push, transform, burn, beast, no excuses, limited, spots left, hurry. The list covers force language ("push you past your limits"), not movement names: "push" stays in the Big Seven (Squat. Hinge. Lunge. Push. Pull. Rotate. Walk or run.) and in "lift, push and carry".
- **Prefer:** build, restore, calibrate, cultivate, steward, guide.
- The tone is fitness meets high-end hospitality: calm, warm, unhurried.

---

## Design (one scrolling page, 19 Nov 2026)

Built from the approved style tile (round seven, commit 6be62d3; the /style-tile page itself is retired and redirects to Home). References: ouraring.com and functionhealth.com for layouts, cards, type and spacing.

### Base style

- **Page background #F0EEEB, text navy #0A212D** (edges and overscroll included), top to bottom. There is no navy switch any more.
- **Left-aligned everywhere, nothing centred.** In every section the words sit together (headline, lines, closing line), then the visual below or beside them (beside on desktop, below on phones); never a visual between lines of text. No section labels (eyebrows) on the page.
- **Terracotta #D4644D:** the button, and **3 to 4 key words in every section headline** (`Accented` in the content files: one phrase, which must appear in the text). Headlines shorter than three words ("Your Sherpas.", "Questions.") and "Come and meet us." are terracotta throughout. On the hero the terracotta words sit on the solid navy of the gradient, never on the bare photo. Thin progress bars are terracotta too.
- **Fluid sizing (`app/globals.css`):** every size runs in a straight line from a 375px phone to a 2560px (27-inch) display, clamped at both ends, so a large screen shows a larger version of the design, never a small one. `--fl` is the fluid unit; `--gutter` (20 to 96px), `--space-section` (96 to 200px, about 144 at 1440) and `--header-h`. Tailwind's spacing unit `--spacing` is 4px up to 1024px wide and grows to 5.25px at 2560, so every margin, gap, box, container width (`max-w-xl` …) and corner scales with it. Never hard-code px or rem sizes in components: use the spacing scale, the `ty-*` styles or the tokens.
- **Type, named styles only:** `ty-hero` (40px phones, about 87px at 1440, 136px at 2560, Light: the hero headline), `ty-headline` (36 to 96px Light), `ty-sub` (20 to 32px Regular: lines under headlines, row titles, quotes, questions), `ty-body` (16 to 23px), `ty-small` (14 to 19px: the footer, the hero caption), `ty-label` (13 to 17px Bold, sentence case: small labels). The member card name line is the one uppercase label.
- **Cards and photos:** 16px corners at 1440 (they scale with the spacing unit); the dials card off-white with a hairline navy border. Pills are fully rounded.
- **Layout:** content in a column capped at 1600px and centred (`page-wrap`); the hero runs edge to edge; card rows run to the screen edge with the first card on the column (`page-edge`); `section-space` above and below every section.
- **Logos:** only the hero shows the LogoTag (light, above the headline); the header, menu and footer show the plain BigToe logo.
- **Photos:** every slot shows the coffee bar photo until the shoot, cropped per slot (`components/site/Photo.tsx`); the alt text names the shot it stands in for (`docs/shot-list.md`). **Space renders:** BigToe's own 3D renders go in `docs/photos/space/` as `hero.*` and `table.*`; `scripts/space-photos.mjs` (run by `dev` and `build`) copies them to `public/photos/space/` and writes `content/space-photos.json`, and the hero and the social-table card show them in place of the coffee bar. Renders only where the space is the subject, never for people.

### Header and menu (every page, `components/site/Header.tsx`)

- **Always visible, never hides.** A frosted light bar with a hairline at the bottom: the plain logo on the left (glides back to the top of Home; on the legal pages it goes to Home); on the right the terracotta pill ("Book your first visit" on desktop, "Book a visit" on phones) and the three-line icon (labelled "Menu"). 44px tap targets.
- **The menu:** a full-screen off-white list of jump links: Why BigToe, How we train, The team, Members' words, Questions, Come and meet us; the book pill at the bottom. Choosing one closes the menu while the page glides to the section. Close or Escape closes it; focus returns to the icon.
- **Jump links** (`components/site/Jump.tsx`, the menu and "How we train" / "Meet the team" in Why BigToe): smooth scroll to the anchor, stopping below the header (`scroll-padding-top: var(--header-h)`); the address bar shows the anchor. From the legal pages they go to `/#anchor`. Reduced motion: a jump.

### Footer (every page, `components/site/Footer.tsx`)

The plain logo; the address; the hours; "WhatsApp [TODO]. hello@bigtoe.in."; Careers (mailto), Location on Maps (TODO), Terms & Conditions, Privacy Policy.

### Motion

- **Content fades up once as it arrives** (about 16px, 0.6s; lines one after another; `components/site/Rise.tsx`). Native scrolling, no page snapping, no scroll hijacking, nothing pinned.
- **The dials** (`ReserveDials` in `components/site/Dials.tsx`): in step with scroll on every screen. As the card comes up the screen the big Strength Reserve ring counts up to 69, then the four smaller dials grow out of it and settle beneath it (2 x 2 on phones, a row of four on desktop; the big ring stays), each filling to its value. Scrolling back rewinds.
- **Card rows** (`components/site/CardRow.tsx`, founders and Sherpas): 4:5 photos, the words always visible beneath; swipe on phones, mouse drag or arrows on desktop; snap points inside the row only, never autoplay. A thin terracotta bar beneath shows the position (hidden, with the arrows, when every card fits).
- **Member stories** (`components/site/Members.tsx`): cards stacked down the page, each a photo filling the card (no frame), as tall as the screen allows below the header. As a card passes the middle of the screen its quote fades in over the photo's lower quarter on a soft navy gradient, with first name and age. A thin terracotta bar, held under the header while the stories are on screen, follows the scroll position.
- Small interface transitions (the accordion) take about 0.3s.
- **Reduced motion: everything still** and shown in its final state (the dials full, the quotes shown); jump links jump.

---

## Site structure

One page, `/` (`app/(site)/page.tsx`), plus **`/terms`** and **`/privacy`**. One layout (`app/(site)/layout.tsx`): header and request panel. There is no booking page: the panel opens from the header and the menu.

Redirects (`next.config.ts`): `/method` → `/#how-we-train`, `/team` → `/#the-team`, `/faq` and `/faqs` → `/#questions`, `/membership` and `/book-now` → `/` (permanent); `/style-tile` → `/` (temporary).

### Request panel (`components/site/VisitPanel.tsx`, `content/booking.ts`)

Centred dialog on desktop, bottom sheet on phones. **Name and mobile number only.** Thank you: "Thank you, [name]. We'll confirm your visit on WhatsApp." with the intake form (`facts.intakeFormUrl`, new tab) and WhatsApp. A request, not a confirmed appointment; no health questions (that is the intake form's job). Server action `app/actions/visit.ts` (honeypot, validation shared with the browser in `lib/visit.ts`), email via Resend to `CONTACT_EMAIL`. Analytics (Vercel): "Visit panel" on open (placement, page), "Visit submit" on submit (page, result). Never personal details.

### The page, in order (anchors in `content/site.ts`, `anchors`)

Home (`content/home.ts`, `components/home/HomeSections.tsx`)

1. **Hero:** a full-screen photo (the space render `hero.*` when present); a deep navy gradient, solid behind the words, clear at the top. The light LogoTag; "The second half of life should be **stronger than the first.**" on the darkest part; "One-to-one training for life after 40."; "Vasant Vihar, New Delhi." as a small plain caption at the bottom left. No button. (If the headline ever fights a new photo at 390x844, fall back to a frosted panel at about 15% behind the text block.)
2. **Why BigToe (`why-bigtoe`):** "We train for **a sport called life.**" / "A suitcase to lift. Unexpected stairs. A trip to say yes to." / "Build the strength for what comes next." Jump links: How we train, Meet the team. Text only.
3. "Get stronger. **Keep the pizza.**" / "A healthier life shouldn't mean giving up the things you enjoy." / the social-table photo card (the space render `table.*` when present).

How we train (`how-we-train`; `content/method.ts`, `components/method/MethodSections.tsx`)

4. "Your **coach. Your plan.**" / "A dedicated coach guides you through every session." / "Your Reserve Audit sets the starting point." / "Your progress shapes what comes next." / "Mobility, strength and conditioning for the life you want to lead." Then the photo card (a coach guiding a member).
5. "Know **your starting point.**" / "The Reserve Audit measures four dials." / "Your plan starts with the dial that needs the most attention." Then the dials card ("Your Reserve Audit", "Example").
6. "Build **more than appearance.**" / "Capacity you can use outside the studio." Then three numbered rows, no cards or icons: 01 Muscle. What you're made of. / 02 Strength. What you can lift, push and carry. / 03 Power. How fast you can move when it counts.
7. "Train **from the ground up.**" / "Bare feet. Free weights. Attention to movement." / "Mastering the Big Seven is what we teach." / "Squat. Hinge. Lunge. Push. Pull. Rotate. Walk or run." Then the bare-feet photo card.
8. "Your goals. **Our shared commitment.**" / "Set goals with your coach, whom we call a Sherpa. …" Then the pledge photo card.

The team (`the-team`; `content/team.ts`, `components/team/TeamSections.tsx`)

9. "The **four of us.**" / the Decode paragraph. One group photo card, then the row of four founders: "Jay Singh, 59." and the credential beneath each photo.
10. "**Your Sherpas.**" / the Sherpa line. The row of five: name and first-person line beneath each. Then "Every Sherpa trains under Jeevan, and every workout template is his."
11. "Why **we built this.**" Jay's three lines, signed "Jay". Text only.

12. **Members' words (`members-words`):** "In **our members' words.**" Three stories (`content/quotes.ts`, `draft: true`): "TODO: first name, TODO: age" with a Draft badge until consent. Each quote has a `video` slot for later, not used yet.
13. **Questions (`questions`, `content/faq.ts`):** "**Questions.**" beside the thirteen questions in four groups (`faqGroups`), each under a small label with its own expandable rows (one open at a time; the first group opens its first question): Getting started (who it's for, first visit, what to wear), Training (who trains me, session length, training in front of others, how many at a time), Health and safety (injury or condition), Membership (cost, membership and pausing, scheduling, if it isn't for me, community). The ten agreed answers word for word; three drafted from site facts, with TODOs where a fact needs confirming.
14. **Come and meet us (`come-and-meet-us`):** "**Come and meet us.**" / "Meet a founder. Have a body scan and light assessment. Stay for coffee and a chat." / the price / "Your first hour is free." / the guarantee. No button. Then the footer.

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
- **Folders:** `app/(site)/` holds the one page, the legal pages and the one layout; the root layout holds only `<html>` (with `data-scroll-behavior="smooth"`), the JSON-LD and analytics. `components/site/` holds the shared pieces (header, jump links, footer, request panel, reveal, section text, dials, card row, member stories, accordion, photo slot); `components/home|method|team/` the sections of each part of the page.
- **Draft quotes guard:** member quotes live in `content/quotes.ts` with `draft: true` until consent, name and age are recorded. `npm run build` runs `scripts/check-drafts.mjs` first: a production build for bigtoe.in (Vercel production whose domain is bigtoe.in) fails while any quote is a draft; other builds only warn. `npm run check:drafts` runs it alone. Keep `content/quotes.ts` free of imports.
- `content/facts.ts`: every reusable fact. `content/home.ts`, `method.ts`, `team.ts`, `faq.ts`: each part of the page. `content/site.ts`: the anchors, menu, footer labels, the example dials, member card labels, metadata. `content/space-photos.json`: written by `scripts/space-photos.mjs`, never by hand. `content/booking.ts`: the request panel. `content/legal.ts`: terms and privacy.
- Components hold no copy. Motion: `motion` for reveals and the scroll-linked pieces; scrolling is native. Every primitive checks reduced motion.
- Env vars: `RESEND_API_KEY`, `CONTACT_EMAIL` (comma-separated for several), `RESEND_FROM` (a sender on a domain verified in Resend), `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL` (defaults to https://bigtoe.in).
- SEO: titles and descriptions in `content/site.ts` (`meta`). LocalBusiness JSON-LD in `app/layout.tsx`, built only from `facts`. `app/opengraph-image.tsx` (the hero line, Anderson Grotesk from `docs/fonts/*.otf`), `app/sitemap.ts` (Home, terms, privacy), `app/robots.ts`.

---

## Still open

- [ ] WhatsApp number to publish (footer, the request panel's thank-you).
- [ ] Map link ("Location on Maps").
- [ ] Member quotes (`content/quotes.ts`): first name, age and written consent for each; card 1 is an illustrative draft and card 4 proposed wording (see the agreed copy), not yet members' words.
- [ ] FAQ drafts to confirm: towels and water provided; monthly billing and pause rules.
- [ ] The example dial numbers: the agreed copy's direction says "without invented scores"; the 18 and 19 Nov briefs keep the example numbers.
- [ ] Space renders for `docs/photos/space/` (`hero.*`, `table.*`).
- [ ] Sherpa name spellings, and each Sherpa's OK to publish their line.
- [ ] Jay's son has seen the story before it goes public.
- [ ] Founder lines to confirm with each founder (Hard Rock Cafe India and Shiro; MSc, Middlesex University London; Nourish Organics; a career leading finance teams).
- [ ] Resend: API key, verified sending domain (`RESEND_FROM`) and `CONTACT_EMAIL` set in Vercel.
- [ ] The 18 photos in `docs/shot-list.md`; member photos need written consent.
- [ ] Anderson Grotesk licence covers web use. Logo SVG needed (`docs/logo/` has PNGs only).
- [ ] **Terms & Conditions conflicts (not edited):** "Wellness and Membership Services are non-refundable and non-transferable." and "If misused, they will be promptly revoked without refund." contradict the money-back guarantee; "These charges and services may change at the discretion of the Company…" sits awkwardly with the published price range; "memberships may be transferable subject to approval" contradicts "Memberships are strictly non-transferable."; "The primary objective of BigToe is to promote general wellbeing, injury prevention, and senior citizen welfare." is a health claim; services listed that are not offered (food, medical consultations, merchandise, an app, a Fitness Academy); "Photographs or videos recorded during sessions may be accessible to other users." needs to match the member-photo consent.
- [ ] **Privacy Policy conflicts (not edited):** contact "via email, SMS, or phone calls" but the booking says WhatsApp; booking details are emailed through Resend (not mentioned); it describes an app, account settings, HealthKit and Google Fit.
