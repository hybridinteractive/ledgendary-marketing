# Build brief: Ledgendary marketing home, version 3

Project root: `/Users/michtio/dev/hybridinteractive/ledgendary-marketing/` (own local git; not the ledgerly app repo, do not read anything there). Do not push. Work only in `site-v3/`; never edit `site/` (v1) or `site-v2/` (v2).

## Read first (stop if any is missing)

1. `PRODUCT.md`
2. `.impeccable/surfaces/site-v3-index-html.md` — the v3 direction contract. The finish review audits against it.
3. `/Users/michtio/.claude-engy/plugins/cache/impeccable/impeccable/4.5.2/skills/impeccable/reference/craft-floor.md`
4. `/Users/michtio/.claude-engy/plugins/cache/impeccable/impeccable/4.5.2/skills/impeccable/reference/animate.md`
5. `site/DESIGN.md` (v1's recorded system) and v1/v2 screenshots in `.impeccable/review/` (`d*.png` are v1, `v2-*.png` are v2) ONLY to make sure v3 does not repeat their composition, palette or signature. Reuse the shared demo story and figures; do not copy their CSS or markup.

## The shared story (identical in all versions)

Lumen Studio (agency) · client Northwind Co, contact Dana Whitfield · job "Site build" · people Maya Ortiz (owner), Sam Okafor (finance), Theo Brandt (member), Lena Park (approver), Jules Carter (accountant).
Proposal P-0018 sent Oct 27, viewed Oct 28 (3 times), option chosen and signed Oct 30, 10:42 AM. Options: A $22,000 + time, est. 40 h, est. total $28,000; B $30,000 + time, est. 80 h, est. total $42,000 (recommended, chosen); C $30,000 + time, then $4,500/mo.
Time Nov 2–15: 41 h 45 m + 38 h 15 m = 80 h 0 m at $150 = $12,000. Invoice INV-0042 issued Nov 16, due Dec 1: fixed fee $30,000 + time $12,000 = $42,000. Paid by card (Visa ending 1881) Nov 18. Journal JE-1041 (Accounts receivable / Revenue $42,000, Nov 16) and JE-1042 (Bank / Accounts receivable $42,000, Nov 18), chained hashes #9c07, #e21a. Durations written "4 h 30 m". Never name a document before the story has created it (no INV-0042 before Nov 16).

## Deliverable

`site-v3/index.html`, `site-v3/styles.css`, `site-v3/app.js`. Font: Bricolage Grotesque (variable opsz, wdth, wght; Google Fonts `family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800` verified 200; self-host from the official repo with its licence if it provides webfonts, otherwise Google Fonts). Icons: lucide-static `@0.460.0` from jsdelivr inlined as a sprite. No other dependencies, no animation libraries.

## The bar

Linear, Stripe, Mercury, and Apple's scroll-scrubbed product pages. Product UI dense, believable, shipped-looking, every panel labelled "Demo data". Michael rejects gimmicks and costume metaphors: this is a SaaS product page.

## Page, top to bottom (no split hero with floating screenshot, no equal feature cards, no eyebrows, no section numbers)

1. **Nav** on the dark ground: wordmark (authored mark distinct from v1 and v2), Product, Agencies, The books, "Join the waitlist" (coral, dark text).
2. **Hero** per FIRST VIEWPORT, the scrubber rail visible across the bottom third at Oct 27.
3. **"Kids, this is the story of how we got paid."** (signature 1): a long pinned chapter (roughly 5 to 6 viewports of scroll). The product canvas is pinned; scroll position maps to a date between Oct 27 and Nov 18; the canvas renders the app's state for that date as a pure function (proposal list and activity, portal with Dana's choice and signature on Oct 30, the week grid filling day by day Nov 2–15 with the unbilled total climbing, the invoice composing Nov 16, Sent, then the "wait for it…" stretch Nov 16–18 where the rail visibly slows, Paid in coral on Nov 18, the journal posting). Short captions appear beside the rail at the events. The rail stays draggable (pointer and keyboard: arrow keys step a day) and dragging scrolls the page to match. Phone: the same chapter with a compact rail pinned at the top and the canvas recomposed for portrait.
4. **"One person or three hundred."**: roles at scale, composed differently from v1's tabs and v2's slider (e.g. the same Nov 18 state seen through five seats side by side as narrow columns, each showing only what that seat sees: member own time, approver approve weeks per project, finance money actions, accountant read only, owner everything).
5. **"Haaaave you met your books?"** (signature 2): a draggable "as of" date control; receivables, a small P&L and the journal reconstruct for that day (before Nov 16 nothing receivable; Nov 16–17 $42,000 receivable; Nov 18 settled). Posted entries chained; "Posted entries are never edited. Reverse it instead." shown honestly. "Every number here is a true story." Period close and the read-only accountant seat in a line each.
6. **Privacy**: "Your calendar stays yours." A calendar event reduced to a private draft (title and duration only) visible only to its owner.
7. **The playbook**: everything else (Estimates, Recurring invoices, Reminders and late fees, Credit notes, Client portal, Card and bank payments, Expenses and receipts, Bills and vendors, Bank feeds, Multi-currency, Reports, Period close, Roles and approvals), in a composition unlike v1's index and v2's list.
8. **Final call**: "Suit up." waitlist with validation, errors named, success "Challenge accepted. You're on the list.", ending on the product (e.g. the rail resting on Nov 18, Paid).
9. **Footer**: mark, links, "© 2026 Ledgendary · True story."

Only claims in PRODUCT.md. No prices beyond the demo job, no logos, testimonials, counts. Unverified integrations not mentioned.

## Lessons from v1 and v2 review rounds (avoid up front)

- Figures identical everywhere; never name a document before it exists.
- Overlays opaque from frame one; toasts never cover totals, the paid figure or provenance lines.
- No dead space inside product windows; size them to their state.
- Hero H1 stays the largest type on the page; display max 6rem.
- Check Bricolage's tabular zero; tnum only in columns.
- Reserve space for anything that appears later; fill reserved slots with a real pre-state, never an empty hole; nothing jumps on submit.
- Cursors and badges never cover labels.
- Scroll-scrubbed work: drive it with one rAF-throttled scroll handler mapping progress to date; never animate layout properties per frame; reduced motion: the chapter becomes a stepped sequence of dated screens with prev/next buttons and no scrubbing animation; the page must be fully readable with JS off (static dated screens).

## Motion, accessibility, responsive

One motion grammar (here: scrub-linked, continuous, eased only at event landings). Content visible by default. Off-screen work paused. Keyboard: the rail and the as-of control are proper sliders (role slider, aria-valuetext with the date), palette focus rings. Live region announces the date's event. Browser surfaces themed for the dark ground. WCAG 2.2 AA (coral as fill with dark text; secondary text #a9b8b0 on #0e1613 must be checked). 1440, 1280 and 390 composed; no horizontal scroll at 390.

## Verify (two inspection rounds max)

Serve with `python3 -m http.server 8813` from `site-v3/`. Chrome-devtools MCP (`new_page` with an `isolatedContext`; `emulate` with the page id new_page returns; never Claude in Chrome). VIEWPORT captures only: `history.scrollRestoration='manual'`, scroll, settle, verify scrollY, open each file to confirm it shows its name. Save as `.impeccable/review/v3-d01-hero.png` onwards (1440x900; include the scrubbed chapter at Oct 28, Oct 30, Nov 9, Nov 17 "wait for it", Nov 18 Paid; the books at two as-of dates; success state; 1280x800 top) and `.impeccable/review/v3-m01-hero.png` onwards (390x844, m01 at scrollY 0). Fix round one in a batch, recapture once. Run `"/Users/michtio/.claude-engy/plugins/cache/impeccable/impeccable/4.5.2/skills/impeccable/scripts/impeccable" detect --json site-v3/index.html site-v3/styles.css` once; fix mechanical findings. Run no other impeccable command. Stop your server, close your pages.

Commit locally (short imperative subject, no trailers, no AI mention).

## Report back

Per section what you built, the screenshot paths, detector findings fixed and left with reasons, anything not done.
