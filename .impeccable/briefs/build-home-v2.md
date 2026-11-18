# Build brief: Ledgendary marketing home, version 2

Project root: `/Users/michtio/dev/hybridinteractive/ledgendary-marketing/` (own local git; not the ledgerly app repo, do not read anything there). Do not push. Do not edit `site/` (that is v1).

## Read first (stop if any is missing)

1. `PRODUCT.md`
2. `.impeccable/surfaces/site-v2-index-html.md` — the v2 direction contract. The finish review audits against it.
3. `/Users/michtio/.claude-engy/plugins/cache/impeccable/impeccable/4.5.2/skills/impeccable/reference/craft-floor.md`
4. `/Users/michtio/.claude-engy/plugins/cache/impeccable/impeccable/4.5.2/skills/impeccable/reference/animate.md`
5. Look at v1 (`site/index.html`, its screenshots `.impeccable/review/d0*.png`) ONLY to make sure v2 does not repeat its composition, palette or signature. You may reuse v1's demo data and figures (Lumen Studio, Northwind Co, Site build, P-0018, options A/B/C, INV-0042 $42,000, JE-1041/JE-1042, people Maya Ortiz, Sam Okafor, Theo Brandt, Lena Park, Jules Carter, Dana at Northwind), so both versions tell the same true story. Do not copy v1's CSS or markup.

## Deliverable

`site-v2/index.html`, `site-v2/styles.css`, `site-v2/app.js`. Fonts: Funnel Display + Funnel Sans from Google Fonts (`family=Funnel+Display:wght@300..800&family=Funnel+Sans:wght@300..800`, verified 200). Icons: lucide-static `@0.460.0` from jsdelivr, inlined as a sprite. No other dependencies.

## The bar

Linear, Stripe, Mercury, Ramp. The drawn product UI must look like a real shipped app, dense and believable, every panel labelled "Demo data". Michael rejects gimmicks and costume metaphors: this is a SaaS product page.

## Page, top to bottom (compose differently from v1; no split hero with floating screenshot, no equal feature cards, no eyebrows, no section numbers)

1. **Nav** on the blue field: wordmark (authored mark, distinct from v1's), Product, Agencies, The books, "Join the waitlist" (lime, ink text).
2. **Hero, play it yourself** (signature 1). Per FIRST VIEWPORT. The client portal card: three options, the visitor clicks one (any; B is recommended, and the story follows the chosen one; A and C must also work with correct figures), types or auto-fills a signature, signs. A prompt chip guides each step ("You're the client. Pick one." → "Sign it." → "Now you're the studio. Send the invoice." → "wait for it…" → "Paid."). The card transforms into the studio's invoice view, the visitor presses Send, a held "wait for it…" beat, Paid in lime, a toast posts to the books. Restart control. Idle for 8s at any step: it continues on its own. Keyboard operable throughout. Reduced motion: show the completed state with a "Play it" button that steps without animation.
3. **"Kids, this is the story of how we got paid."** (signature 2): $42,000 pinned in the centre while scrolling; around it, five screens slide in and out (proposal, client portal, invoice, payment, journal), each showing where that same figure lives. Phone: stacked screens, the figure as a sticky chip at the top.
4. **Time that bills itself**: an interactive week grid for the job; the visitor taps +15m / +30m / +1h on a cell and the unbilled total and the draft invoice line beside it update live (durations written "4 h 30 m"). Show the private calendar draft only its owner sees, briefly, with "Your calendar stays yours."
5. **"Haaaave you met your books?"** on the blue field: the journal entries with chain links; a "tamper" toggle that alters a posted amount and shows the chain break in red and the refusal, then the proper reversal. "Every number here is a true story." Period close and the read-only accountant seat in a line each.
6. **"One person or three hundred."**: a range slider (1 to 300 people) that reconfigures an org panel live: seats, members, approvers per project, finance roles and the accountant seat appear as size grows. No prices, no seat-limit claims.
7. **The playbook**: everything else (Estimates, Recurring invoices, Reminders and late fees, Credit notes, Client portal, Card and bank payments, Expenses and receipts, Bills and vendors, Bank feeds, Multi-currency, Reports, Period close, Roles and approvals), laid out differently from v1's index (e.g. a two-column ledger list with a tiny live glyph per row); not equal cards.
8. **Final call** on the blue field: "Suit up." waitlist form with validation, errors named, success "Challenge accepted. You're on the list."
9. **Footer**: mark, links, "© 2026 Ledgendary · True story."

Only claims in PRODUCT.md. No prices, logos, testimonials, counts. Unverified integrations not mentioned.

## Motion, accessibility, responsive

Same standards as v1's brief: one motion grammar (here: snappier, springy UI responses to the visitor's clicks, 200 to 500ms, exponential ease-out), content visible by default, reduced-motion handled, off-screen animation paused, everything keyboard reachable with palette focus rings, ARIA on interactive widgets, live region announcing demo state changes, browser surfaces themed, WCAG 2.2 AA (white on #2433ff passes; lime only as fill with ink text). 1440, 1280 and 390 composed; no horizontal scroll at 390.

## Verify (two inspection rounds max)

Serve with `python3 -m http.server 8812` from `site-v2/`. Screenshot with the chrome-devtools MCP (`new_page` with an `isolatedContext`; never Claude in Chrome). VIEWPORT captures only (full-page captures blank the sticky sections): before each capture set `history.scrollRestoration='manual'`, scroll to the section, wait for motion to settle, and verify scrollY. Save desktop 1440x900 as `.impeccable/review/v2-d01-hero.png` onwards (one per section), mobile 390x844 as `.impeccable/review/v2-m01-hero.png` (taken at scrollY 0) onwards. Open each file once to confirm it shows what its name says. Fix round one in a batch, recapture once. Run `"/Users/michtio/.claude-engy/plugins/cache/impeccable/impeccable/4.5.2/skills/impeccable/scripts/impeccable" detect --json site-v2/index.html site-v2/styles.css` once and fix mechanical findings. Stop your server and close your pages.

Commit locally (short imperative subject, no trailers, no AI mention).

## Report back

Per section what you built, the screenshot paths, detector findings fixed and left with reasons, anything not done.
