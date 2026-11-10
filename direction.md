# Integrate homepage film: direction

Branch `feature/homepage-film`. Replaces `app/page.tsx` only.

## Concept

**One enquiry, followed from the moment it would have been lost to the moment it is a booked job.**
Integrate takes the messy, manual side of a trade business (missed calls, unanswered WhatsApps, quotes on paper, chased invoices) and turns it into a quiet system that runs in the background. The film is that transformation, told through a single line: the path of one enquiry. In the noise it is tangled and dropped. At the turn it is pulled straight. In the system it becomes the wiring. At the end it arrives at the button.

## Facts in hand (intake, 2026-11-10)

- Build: this repo, new branch, homepage route only.
- Primary action: "Book a free call" to `/contact#book`. Email `sales@integrate.co.uk`. WhatsApp 07765 977085.
- Trades with their own page: electricians, plumbers, kitchen fitters (`/web-design/...`). Named and routed to `/trades`: roofers, builders, heating engineers, joiners, landscapers, bathroom fitters.
- Proof: real client names and live sites only (Allied Insurance, Polished Insurance, Ramsay Timber, CloudKicks, PoundMart, ModelMentions, Golden Days), described in Integrate's voice. No quotes (all quotes in the repo are placeholders), no numbers.
- Trust: Integrate AI Solutions Limited, company no. 17340859, registered office from `lib/legalData.ts`, in the footer. No founder photo or surname yet.
- Lead with: AI automation and more booked jobs.
- Logo: `Logo.png` (ink double chevron, sheen on the upper limb, Instrument Sans wordmark).
- Higgsfield: connected, 2,134 credits. Stills first, check in with Jack before the video batch.
- Inspiration Library "wins": empty, so nothing approved to match yet.

## Brand system

Integrate Design System, tokens v1. Achromatic first.

- Film runs in two rooms: **carbon** (`#0a0a0c`, ivory `#f2f1ec` text) for the noise, **paper** (`#f7f5f0`, ink `#1b1a16`) for the system. The turn is the cut between them.
- Accent: brushed silver, spent on two things only: the primary action's sheen and the line at the moment of the turn.
- Fraunces display (opsz 90, -0.02em), Instrument Sans body, IBM Plex Mono for labels and every number. `SYS.01` to `SYS.03` for the services, `PHASE 01` to `PHASE 04` for the process.
- Hairlines, pills for primary actions, expo-out easing, nothing linear.
- Token extensions (to record in OVERVIEW.md): none planned beyond a `--film-progress` custom property.

## Reference takeaways (technique only)

All five captured directly at 1440x900 (none blocked automation). Screenshots are outside the repo in the session scratchpad.

- **metic.** One persistent stage accretes over captioned steps and the last frame is the real button. Takeaway: build the "Book a free call" button on screen as the story, so the film's final frame is the button itself. Avoid its 3.8-screen pin.
- **EnduroSat Space Service.** A ghost CTA sits in the corner for the whole journey and is promoted to centre at the end. Takeaway: keep the primary action on screen in a quiet state throughout and let the payoff promote it. Avoid its 47-screen single pin.
- **Shopify Editions Spring 2026.** No pins at all: one fixed background dissolves and re-forms between chapters while content scrolls normally over it. Takeaway: put the continuity in one fixed layer (our line) behind free-scrolling content, so the film feeling does not depend on pinning.
- **Oryzo.** One object stays on screen the whole way and the world changes around it. Takeaway: the line is our one object; it never leaves the frame, only its role changes (tangle, thread, spine, rail, button).
- **DataBahn.** No scroll choreography; looping diagrams show scattered dots in, ordered lanes through, clean lines out. Takeaway: the system beat should read on its own as a looping diagram (messy in, ordered out), so it still works with reduced motion and for someone who stops scrolling.

## The film: shot list

Total length about 9 to 10 screens on desktop, no pin longer than 1.5 screens. The line persists through every cut.

| # | Beat | On screen | Camera | Persists from before | Transition out | Length | Copy it carries |
|---|------|-----------|--------|----------------------|----------------|--------|-----------------|
| 01 | Cold open | Headline, one-line offer, "Book a free call" pill, WhatsApp link, the hero media. The line starts drawing within 300ms from the chevron mark. Headline and button are in the HTML and painted before any script loads. | Slow push in on the hero media (loop, not scrubbed). | n/a | The line leaves the hero downward and the frame darkens around it. | 1 screen, not pinned | "Missed calls answered. Quotes sent. Jobs booked." + "AI automation, lead generation and websites for UK trades." |
| 02 | The noise | Carbon room. Live HTML notification chips (missed call, WhatsApp, voicemail, "quote?", unpaid invoice) drift at three depths over a generated still of a workbench at the end of a day. The line tangles through them. | Slow lateral drift, foreground chips faster than background. | The line; the hero media's dark tones. | The chips are pulled toward one point. | 1.25 screens, lightly pinned | "You are on the tools. The phone is not." |
| 03 | The turn (signature) | The tangle is pulled taut into one straight line. See the three directions below. Carbon becomes paper. | Depends on direction. | The line; the chips, now in order. | The straight line becomes the spine of the system diagram. | 1.5 screens, pinned and scrubbed | "Integrate turns the mess into a system." |
| 04 | The system | Paper room. The line runs through three stations, `SYS.01` AI automation and agents, `SYS.02` lead generation, `SYS.03` web design. Each station opens a small live example in HTML (a WhatsApp reply thread, an ad to form to calendar flow, a site frame). | Vertical travel along the line; each station eases in from the line itself. | The line as spine. | The line fans out into branches, one per trade. | 2 screens, free scroll with scrubbed draws | "Three systems. One line from enquiry to booked job." Each links to its `/services/...` page. |
| 05 | Who it is for | Short cuts, one per trade: a generated still of the trade's material (copper pipe, cable, a worktop edge) with the trade name set large and a link. Wider trades listed in mono underneath, linking to `/trades`. | Hard match cuts on a shared horizon line; each cut holds briefly. | The line as the horizon in every still. | The branches rejoin and run into a row of real site frames. | 1.25 screens | "Built around how your trade actually works." |
| 06 | Proof | Real screenshots of real client sites sliding along the line as a filmstrip, each with the client's name, what was built, and a link. Stated plainly as work for clients, none of it trades-specific claims. | Horizontal travel driven by vertical scroll, short. | The line as the filmstrip rail. | The rail turns downward into the process. | 1 screen | "Real builds, live now." |
| 07 | How it works | `PHASE 01` to `PHASE 04` as a moving diagram on the line. Each phase answers one objection in plain words: what the call is, what gets built, what you need to do, what happens after. Only statements Jack has confirmed or the site already publishes. | Vertical travel; the active phase's node fills. | The line. | The line straightens for the last time and thickens. | 1.5 screens | "From first call to running system." |
| 08 | The payoff | The line arrives and becomes the outline of the "Book a free call" button. Carbon room again, so the film ends where it began but quiet. Minimum form (name, phone) or the direct link, WhatsApp and email beside it, company details under it. | Push in, then hold. | The line, now the button. | End. | 1 screen | "Book a free call. We will show you what we would build first." |

**Mobile cut (375px):** vertical framing, 4:5 and 9:16 crops, chips in two depths not three, the trade cuts become a vertical stack of full-width stills, proof filmstrip becomes swipeable, no pin longer than 1 screen. A slim bottom bar with "Book a free call" and a WhatsApp icon slides up once the hero button has scrolled out of view and sits above the safe area.

**Reduced motion:** every beat in its finished state, the line fully drawn, stills instead of video, nothing at opacity 0.

## Conversion path

- **Act:** hero button and WhatsApp (beat 01), persistent bar after the hero (all beats), end of the system (04), under the trades (05), next to proof (06), the payoff (08), plus the nav.
- **Persuaded:** the noise (recognition), the turn (the promise shown, not told), the system (what you actually get).
- **Objections answered:** how it works (07) covers what the call is, how long it takes, what it costs and whether you are tied in. Each answer ships only once Jack confirms the true wording; until then the beat says what the site already publishes (a call back within one business day, a 30-minute call, pricing page link for web design).
- **Proof beside the decision:** the client filmstrip sits directly before the process and the final action; company number and registered office sit under the final button.

## Three directions for the hero and the turn

1. **Through the mark (recommended).** Carbon hero: headline left, a generated mono loop of a phone lighting up on a workbench right, the chevron mark small at the line's origin. At the turn the chevron scales up to fill the screen and becomes a doorway: the tangled chips and the line pass through its apex and come out the other side as one straight line, and the room flips from carbon to paper through the chevron-shaped mask.
2. **The line.** Paper hero, almost no media: the headline and beside it one scribbled, tangled line drawn live. At the turn the scribble is pulled taut across the full width, like a chalk line snapped on a wall, and what it snaps onto is the system diagram.
3. **The 6pm phone.** Full-bleed generated video hero: a van cab at dusk, a phone buzzing on the dash, type over it. At the turn the camera pushes into the phone's screen, its glow becomes the white page, and the notifications fall into a calendar.

## Open items for Jack

- True wording for: typical build time, pricing model, contract or lock-in terms. Left out until supplied.
- Founder photo and surname, when ready.
- The existing schema carries the Chorley address and North West area names. The brief says UK-wide with no town wording in schema, so the homepage schema drops the areas and keeps the registered address only if Jack wants it there.
