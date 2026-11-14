# BigToe website rebuild guide

Nov 14, 2026 · @Kabir

**Rebuild as a four-page site in Next.js on Vercel: Home, Method, Team, Book.** **Home is five short blocks plus a form, and every button says BOOK YOUR FREE FIRST VISIT.** **The look is quiet luxury in the deck colours: large photographs of real members, generous space, editorial type and slow, smooth scroll transitions.** Content follows the decks and the decisions in Jay's conversation; anything on the live site that disagrees is treated as out of date.

Basis: Decks 0, 1, 2, 4, 5 and 7, the Brand Assets folder in the project, Jay's pasted conversation, and screenshots of the live home page at desktop width. Decks 3, 6 and 8 to 11 are not yet folded in; they mostly cover Sherpa practice, and I'll draw on them when writing the Team page and FAQs.

## 1. The current site: look

- **No people anywhere.** The only picture I saw on the home page is an architect's 3D render of the coffee bar, labelled as an artist's impression.
- **The hero is text on an empty beige screen.** The headline animates in late, so the first second shows almost nothing.
- **About twelve screens of centred text on flat colour bands.** Beige, terracotta, navy, taupe, repeat; nothing breaks the rhythm.
- **It reads like a slide deck.** The boxed "Engine / Force Multipliers" diagram and the long founders' note on navy are consulting visuals, not a place you'd want to walk into.
- **The headline typeface feels like a tech startup.** Space Grotesk is geometric and cool; the brand is warm and human.
- **Navigation hides behind a menu icon** even on a wide screen.
- **What works and should stay:** the terracotta, navy and warm off-white palette, the readable 18px body text, and the logo.

**Brand, locked from the project's Brand Assets:** the logo is navy with a terracotta mark and the tagline "Practice Possibility". Navy is `#0A212D`, terracotta is `#D4644D`, and the page colour is warm off-white `#F0EEEB`. The brand typeface is Anderson Grotesk, in Light, Regular, Bold and Ultrabold. The live site already uses these colours but not the typeface.

The mood board is a reference for the culture pictures (Sherpa, Everest, GPS, the lock, the Living House). Its images include a film still and portraits of public figures, so none of them go on the public site.

## 2. The current site: content

- **Pre-launch copy is still live.** Opening date, Founding 30 and the 90-member cap all come off.
- **It describes a different product from the decks.** A daily score and an app, 16 sessions a month, a 1:23 rule, nutrition as an equal pillar, and medical-sounding claims do not match what Sherpas deliver.
- **It uses the wrong words.** Decks say member, Sherpa, Belong, Strength Reserve; the site says Performance Guide, Tribe and Reserve Score.
- **The front door is missing.** The Reserve Audit, the thing you want people to book, is never named.
- **No proof and no Sherpas.** Eleven member testimonials exist and none are on the site; the Team page shows founders only.
- **It says the same thing several times.** Jay's review counted 14 home sections carrying about six ideas.

## 3. Decisions already made

These come from Jay's conversation and the decks. The new site is built on them.

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

## 4. Site structure

Four pages, one job: get the visitor to book the free first visit.

### Home: five blocks and a form

1. **Hero.** "The second half of life should be the stronger half." Full-width photo or silent video of a real member with a Sherpa beside them. One button.
2. **The problem.** "The problem isn't your age. It's the narrative." Then: "We train for a sport called life." Then one line: muscle, strength and power fade quietly; they can be built at any age.
3. **Find Your Pattern.** The four patterns as tappable cards with a member photo each, followed by one testimonial.
4. **Your first hour.** The first visit is free: an hour with a Sherpa. Then, in sessions 2 to 4, the Reserve Audit: about 60 minutes, four dials (body composition, balance and mobility, functional strength, conditioning), you leave with your Strength Reserve Score, then coffee. Then "Seen. Belong. Progress." with the testimonial about the Sherpa who noticed.
5. **Investment.** First step is free. The price range. The guarantee.
6. **Form.** First name; WhatsApp number or email; "By day 120, I want to be able to…"; anything we should know. A WhatsApp button beside it.

### Method: five short blocks and eight questions

Every line on this page comes from Decks 1, 4, 5 and 7, using the decks' own "say it to a member" wording.

- **Strength Reserve.** "Every sport has a score. This is ours." The gap between what you can do and what life asks, scored out of 100.
- **What fades.** Muscle, strength and power, told with the house and light-bulb picture. Power goes first.
- **How we train.** Barefoot, because it all starts with the big toe. Free weights, no machines. Mobility, strength and cardio in one supervised hour. Seven movement patterns, each tied to an ordinary day: squat is getting out of a car, hinge is lifting a bag off the floor.
- **Two paths.** Mobility & Conditioning or Strength & Conditioning. "Neither path is better. We start where you are today."
- **Test, train, retest.** The six-step loop: test, sort, set goals, pledge, train, review, every 16 sessions. "We sell outcomes, not sessions."
- **Eight collapsed questions,** grouped as fit, money, logistics and trust. Deck 4 already answers four of them, including "Isn't heavy lifting risky at my age?"

### Three interactive pieces, all from Deck 7

- **The four dials.** Body composition, Balance & Mobility, Functional Strength and Conditioning, each out of 100, animating to an example score. "Your Strength Reserve is only as good as your weakest dial. That is where we start."
- **Same score, different person.** Two example members both score 69; one has dials of 78, 42, 90 and 66. Tap to see why the dials matter more than the total.
- **Every test is a job your body does in daily life.** Tap a test to see its job: floor rise is getting up off the floor on your own, dead hang is holding a handrail, farmer's carry is bringing the shopping in from the car.

### Team

- **Why we built this.** Jay's 80-word story, as agreed in his conversation.
- **Sherpas.** Portrait, first name and one-line story each, from Deck 1.
- **Founders.** Jeevan, Seema and Rodrigo at one line each.
- **The social space.** Coffee table, the clap, the Bell, Pizza & Beer, in photos.

### Book

- **The same form as Home,** so it can be shared as a link on WhatsApp.
- **Address, hours, map,** and "There's no parking at the studio. Come by cab or get dropped off."

### Redirects

- `/membership` goes to Home and `/faqs` goes to Method, so old links and Google results keep working.

## 5. Look: design direction

**The brief: wealthy, professional and high class, yet welcoming and warm, with modern transitions and flow.** Luxury on a screen comes from restraint: fewer elements, more space, larger photographs and slower movement. Warmth comes from faces, first names and coffee.

### Colour

- **Deck colours only.** No new colours are introduced.
- **Proportions do the work:** roughly 70% warm off-white, 20% navy, 10% terracotta.
- **Terracotta is for the button and one accent per screen.** Used everywhere, it stops feeling premium.
- **One or two full navy sections,** for the testimonial and the form, like stepping into an evening lounge.
- **No gradients, no drop shadows, no glossy effects.** Thin hairline rules instead.

### Typography

- **Anderson Grotesk throughout,** matching the logo and the decks.
- **Headlines in Light or Regular at 64 to 88px,** sentence case, tight line spacing. Large and light reads as expensive; bold and tight reads as a gym.
- **Bold only for small spaced-out labels above headlines,** the device the decks use ("THE CORE BELIEF").
- **Body text 18 to 20px Regular,** left-aligned, lines no longer than about 65 characters.
- **Self-host the font files** from the project, after confirming the licence covers web use.

### Space and layout

- **One idea per screen.** Each block fills most of a screen and holds one headline, a few lines and one photograph.
- **Wide margins and generous gaps.** About 140px between sections on desktop, 80px on mobile.
- **Full-width and half-width photographs,** never small thumbnails in boxes.
- **Captions in small type:** first name, age, and what the photo shows.
- **Visible navigation:** Method, Team and the button.

### Photography

- **Warm natural light, one consistent colour grade,** shot like a magazine feature rather than an advertisement.
- **Eye contact and real smiles.** This is where welcoming comes from.
- **The Sherpa beside the member, never across the room.**
- **No stock images, no renders, no mirrors, no posed flexing.**

### Motion and flow

- **Smooth, weighted scrolling** across the whole site.
- **Hero:** a slow silent video loop; the headline is readable immediately, then the subline and button fade up.
- **Blocks reveal as you scroll:** text rises about 20px and fades in over 0.7 seconds, one line after another.
- **Photographs unveil** with a soft wipe and settle with a very slight zoom.
- **Find Your Pattern:** four tall photo cards; the chosen card widens and its text appears.
- **Your first hour:** the photograph stays pinned while the four audit steps change beside it as you scroll.
- **Strength Reserve score:** the number counts up once when it enters the screen.
- **Colour changes between sections cross-fade** instead of cutting hard from off-white to navy.
- **Pages cross-fade** when you move between Home, Method and Team.
- **Hover:** photographs zoom by about 3%; buttons darken slowly.
- **Limits:** nothing bounces, spins or delays reading; all motion switches off for visitors who have reduced motion set on their device; it must stay smooth on a mid-range phone.

### Tone on the page

- **Calm and certain.** No exclamation marks, no urgency, no countdowns.
- **The price is stated plainly,** once, without apology.
- **Warm details:** Jay's pizza-and-beer line as a large pull-quote, a handwritten Passbook page, coffee after the audit.

## 6. Voice rules

- **First names, both ways.** Never "sir", "ma'am" or "client".
- **Never "at your age".**
- **Member, Sherpa, Belong, Strength Reserve.** Use the deck words only.
- **No health promises.** Nothing that says prevent, reverse, cure or "inevitable"; no medical or diagnostic language.
- **One idea per block, explainable in 20 seconds.**
- **Fun is allowed.** Coffee, pizza, the clap and the Bell belong on the page.

* **Borrow the decks' "say it to a member" lines.** They are already written for a nervous first-timer, which is who reads the site.
* **Plain words, not gym jargon.** If a beginner can't picture it, rewrite it.
* **Never "this will make you live longer".** The deck line is "a capability worth protecting, and it is improving".
* **Health statistics carry their source,** as the decks do.

## 7. The shoot (do this first)

One half-day on a normal busy morning, documentary style. Without it the new site will look as empty as the old one.

- **Hero:** a 15-second silent loop and three stills of a member mid-lift with a Sherpa beside them.
- **Sherpas:** a portrait each, plus each one coaching.
- **Founders:** four portraits on the floor and one together at the coffee table.
- **Four pattern photos:** one member for each of the four patterns.
- **Audit:** the body scan and one test in progress.
- **Details:** bare feet on the floor, a Passbook being filled in, the Bell, coffee being poured.
- **Moments:** the greeting at the door, the clap at the end of the hour, coffee after.
- **Member video:** two or three 30 to 45 second phone clips answering what they did before, what they can do now, and what they'd tell someone unsure.
- **Consent:** written yes from every member shown or quoted, with first name and age.

## 8. Build steps with Claude Code

**Order of work: set up accounts and assets, give Claude Code this guide as its rulebook, then build one piece per prompt and check each on your phone.** Seven prompts take you from an empty folder to a finished preview site.

### A. Set up before opening Claude Code

1. **GoDaddy.** Confirm you can log in and reach the DNS page for bigtoe.in. Screenshot the current records.
2. **Framer.** Find out who holds the login. Nothing changes there until launch day.
3. **GitHub and Vercel.** Use the same accounts as the scheduling app.
4. **Email sending for the form.** Create a free Resend account and an API key. Verify bigtoe.in there later; it adds DNS records and must not replace the existing mail records.
5. **Google.** Get manager access to the BigToe Google Business Profile and Search Console.
6. **Book the shoot** from section 7. The build uses placeholders until the photos arrive.
7. **Answer the open items in section 10.** The WhatsApp number and guarantee wording are the two the build needs first.

### B. Collect the files

Make one folder on your computer with these inside, before you start:

```
bigtoe-site-inputs/
  website-guide.md        this guide, exported as Markdown
  decks/                  Deck 1, 2, 4, 5, 7 as PDFs
  logo/                   navy and terracotta logo, SVG if possible, plus the PNGs
  fonts/                  the 8 Anderson Grotesk .otf files
  copy/testimonials.md    the four chosen quotes with first name and age
  copy/jay-story.md       the agreed 80-word founder story
  copy/facts.md           price range, hours, address, WhatsApp, email, guarantee
  photos/                 empty until the shoot
```

### C. Create the project

Run these in your terminal, then open the folder in Claude Code.

```
npx create-next-app@latest bigtoe-site --typescript --tailwind --app --eslint
cd bigtoe-site
mkdir docs && cp -r ../bigtoe-site-inputs/* docs/
echo "docs/decks" >> .gitignore
gh repo create bigtoe-site --private --source=. --push
```

Then in Vercel: Add New Project, import `bigtoe-site`, deploy. Add three environment variables in Vercel and in a local `.env.local` file: `RESEND_API_KEY`, `CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`.

### D. How to work with Claude Code on this

- **One piece per prompt.** Never ask for the whole site at once.
- **Start each prompt in plan mode,** read the plan, then approve.
- **Commit and push after each piece.** Vercel gives you a preview link; open it on your phone.
- **Give feedback with screenshots** and the block name: "Home, block 3, cards too small on mobile".
- **Founders see only the preview link,** after prompt 5, not before.

### E. The prompts, in order

**Prompt 1: the rulebook**

```
Read docs/website-guide.md in full, and the deck PDFs in docs/decks.
Write CLAUDE.md for this repo. It must contain, taken from the guide:
the decisions table, the site structure, the look (colour, typography,
space, photography, motion), the voice rules, and the open items.
Add these standing rules:
- All BigToe wording comes from the decks or the guide. Never invent
  claims, statistics, prices or member quotes. If something is missing,
  leave a visible TODO and list it at the end of your reply.
- Every reusable fact lives in content/facts.ts and is imported.
- All page copy lives in content/*.ts, never inside components.
- No health promises: nothing that says prevent, reverse, cure or
  live longer.
Do not write any site code yet. Show me CLAUDE.md.
```

**Prompt 2: the foundation**

```
Build the foundation only. No page content yet.
1. Convert the Anderson Grotesk .otf files in docs/fonts to .woff2,
   put them in public/fonts, and load them with next/font/local.
2. Tailwind theme with CSS variables: navy #0A212D, terracotta #D4644D,
   off-white #F0EEEB. Type scale, spacing scale and container widths
   from CLAUDE.md.
3. content/facts.ts from docs/copy/facts.md, including one ctaLabel
   used by every button.
4. Layout: header with logo, Method, Team and the button; footer with
   address, hours, WhatsApp and email. Mobile: button fixed to the
   bottom of the screen.
5. Motion primitives using the lenis and motion packages: smooth
   scroll, Reveal (20px rise and fade, 0.7s, staggered), ImageReveal
   (soft wipe and slight zoom), section colour cross-fade, page
   cross-fade. All disabled under prefers-reduced-motion.
6. A /styleguide page showing colours, type, buttons, a photo with
   caption, and every motion primitive, using grey placeholders.
Stop when /styleguide works and show me.
```

**Prompt 3: Home, one block at a time**

Send this once per block, changing the number. Six sends in total.

```
Build Home block [N] exactly as described in CLAUDE.md, using the
foundation components. Copy goes in content/home.ts. Use placeholder
images sized for the final photos, with alt text describing the photo
the shot list calls for. Check it at 375px and 1440px wide. Stop
after this block and show me.
```

**Prompt 4: Method**

```
Build /method as described in CLAUDE.md: five short blocks, the three
interactive pieces from Deck 7 (four dials, same score different
person, every test is a job in daily life), and eight collapsed
questions. Take wording from Decks 1, 4, 5 and 7, including the
"say it to a member" lines. Include one question confirming studio,
home or online sessions at no extra charge. The "Your first hour"
style pinned scroll is reused for the six-step loop. Draft the eight
questions and show me the list before building them.
```

**Prompt 5: Team, Book and the form**

```
Build /team and /book-now as described in CLAUDE.md.
Team: Jay's story from docs/copy/jay-story.md at the top, then the
four Sherpas with their one-line stories from Deck 1, then the other
three founders at one line each, then the social space.
Book: the form (first name; WhatsApp number or email; "By day 120,
I want to be able to..." as a select; optional note), address, hours,
map link and the no-parking line. On submit, a server action emails
CONTACT_EMAIL through Resend and shows a thank-you state with a
button that opens WhatsApp with a pre-filled message. Add spam
protection with a honeypot field. The same form component sits at
the bottom of Home.
```

**Prompt 6: search, redirects and sharing**

```
Add: permanent redirects /membership -> / and /faqs -> /method;
page titles and descriptions; an Open Graph image using the logo and
the hero line; LocalBusiness JSON-LD from content/facts.ts;
sitemap.xml and robots.txt; Vercel Analytics with a custom event on
every button tap and form submit.
```

**Prompt 7: quality pass**

```
Audit the whole site and fix what you find. Check: mobile Lighthouse
above 90 on every page; no layout shift from fonts or images; all
motion smooth on a throttled mid-range phone and off under reduced
motion; keyboard navigation and visible focus; colour contrast AA;
alt text on every image; every fact imported from facts.ts; no TODOs
left except missing photos. Then list every place still using a
placeholder image and every open item that blocks launch.
```

### F. After the prompts

1. **Drop in the real photos** when the shoot is done, and ask Claude Code to replace each placeholder by name.
2. **Send the preview link to the founders.** Collect one round of comments by page and block.
3. **Fix, then go live** using section 9.

## 9. Moving off Framer

1. **Confirm access** to GoDaddy DNS and to the Framer account.
2. **Screenshot the current GoDaddy DNS records.** That is your rollback.
3. **Add `bigtoe.in` and `www.bigtoe.in` in Vercel** under Project, Domains. Vercel shows the exact records to set.
4. **Change only the web records in GoDaddy:** the `A` record for `@` and the `CNAME` for `www`.
5. **Leave MX and TXT records alone.** They run hello@bigtoe.in.
6. **Wait for Vercel's green tick,** then test every page, both redirects and the form on a phone.
7. **Update the Google Business Profile link and submit the sitemap** in Search Console.
8. **Keep Framer for two weeks,** then cancel.

## 10. Still open

- [ ] WhatsApp number to publish, and how fast a Sherpa replies after a booking.
- [ ] Guarantee wording: "no argument" or "refund with interest".
- [ ] Billing: monthly, or four-month blocks.
- [ ] Address and hours (43 Basant Lok, 3rd Floor; 6 am to 10 pm daily) still current.
- [ ] Does every audit end with coffee, or only sometimes.
- [ ] The six "By day 120" options from the pre-trial form.
- [ ] Names, ages and written consent for the four testimonials.
- [ ] Jay's son has seen the founder story before it goes public.
- [ ] What the free first visit includes and what to call it. Confirmed: the Reserve Audit itself happens in sessions 2 to 4.
- [ ] Founders' comments: one round per preview link, sent to you by page and block name.

* [ ] Anderson Grotesk licence covers web use.
* [ ] Logo confirmed as navy and terracotta; an SVG file is needed. The Brand Assets folder holds the navy and terracotta logo and an all-blue version.
* [ ] Home and online sessions: Deck 5 says studio, home or online at no extra charge. Confirmed; it goes in the FAQs.
