# Build brief: Ledgendary marketing home (round 1)

Project root: `/Users/michtio/dev/hybridinteractive/ledgendary-marketing/` (its own local git; NOT the ledgerly app repo). Do not read, copy from, or look at anything in `/Users/michtio/dev/hybridinteractive/ledgerly/` — Michael wants a fresh start. Do not push anywhere.

## Read first (all mandatory; stop if one is missing)

1. `PRODUCT.md` — product truth, brand commitments, the HIMYM-wink rule, no invented claims.
2. `.impeccable/surfaces/site-index-html.md` — the direction contract. The finish review audits against it.
3. `/Users/michtio/.claude-engy/plugins/cache/impeccable/impeccable/4.5.2/skills/impeccable/reference/craft-floor.md` — quality floor and bans (no eyebrows/kickers above headings, no section numbers, no identical icon cards, no gradient text, no decorative glass).
4. `/Users/michtio/.claude-engy/plugins/cache/impeccable/impeccable/4.5.2/skills/impeccable/reference/animate.md` — motion guidance.

## Deliverable

`site/index.html`, `site/styles.css`, `site/app.js`. Static, no build step. Fonts: Mona Sans from Google Fonts (`family=Mona+Sans:wdth,wght@75..125,200..900`, verified 200). Icons: lucide-static pinned `@0.460.0` from jsdelivr (inline the SVGs you use, or reference files; verified 200). No other dependencies. Viewable by opening the file or a local static server.

## The bar

Linear, Stripe, Mercury marketing pages. The product UI drawn in the page must look like a real, shipped, beautiful app: real chrome (sidebar or tab rail, toolbar, breadcrumbs, avatars as initials, status pills, tabular figures), dense and believable, not wireframe boxes or skeleton bars. Every product panel carries a small "Demo data" label.

## One job runs through everything (keep the figures consistent)

- Agency: "Lumen Studio" (synthetic). Client: Northwind Co. Job: "Site build".
- Proposal with three options: A "Essentials" $28,000, B "Full build" $42,000, C "Build + retainer" $42,000 + $4,500/mo. Client picks B, e-signs in the portal (name + timestamp).
- Time: the week grid for the job, people with initials, durations written "4 h 30 m" style, week total e.g. "38 h 15 m"; a calendar event arriving as a private draft only its owner sees.
- Invoice INV-0042 for $42,000 (deposit or full; your call, consistent everywhere), lines from the accepted option and unbilled time; Sent → "wait for it…" → Paid, card payment.
- Books: journal entries that the story posts: invoice (Dr Accounts receivable / Cr Revenue $42,000), payment (Dr Bank / Cr Accounts receivable). Each entry shows a short chain hash linking to the previous one.

## Page, top to bottom

1. **Nav**: wordmark "Ledgendary" (authored SVG/type mark, gold detail), links Product, Agencies, The books, then "Join the waitlist" button. Sticky with a subtle hairline on scroll.
2. **Hero**: per FIRST VIEWPORT in the contract. Headline proposal: "From proposal to paid, on one ledger." (wide, heavy, gold highlighter behind "paid"). Subline: proposals clients choose from, time that bills itself, invoices that get paid, books your accountant trusts; for agencies of one or of hundreds. Inline waitlist (email + gold "Join the waitlist"; ink text on gold). Small line under it: invite-only alpha. Then the **hero product window** (signature #1): a looping, pausable ~15s timeline: proposal with A/B/C → cursor picks B → portal "Accepted, signed" → invoice INV-0042 composes → Sent → "wait for it…" (a deliberate held beat with animated ellipsis) → Paid with a gold flash and the amount → a toast "Posted to the books". Scene chips under the window (Propose, Accept, Invoice, Paid, Posted) jump to scenes; a Pause/Play control (WCAG 2.2.2). Caption below can carry "Legen— wait for it —dary." as a quiet wink.
3. **Story chapter**: heading "Kids, this is the story of how we got paid." Sticky product window (left or centre, large) that morphs between five screens as five text steps scroll by on the other side: Propose (options), Decide (client portal, e-sign), Track (week grid filling, the private calendar draft), Bill (unbilled hours flow into invoice lines), Get paid (reminder schedule, card payment, late fee posts as its own entry). Morph with real transitions (shared elements, rows inserting, numbers rolling), not crossfades only. Mobile: steps become stacked panels, each with its own screen.
4. **Scale**: "One person or three hundred." Role switcher (Owner, Finance, Member, Approver, Accountant): the same screen re-renders for each role (what each can see and do: member sees only own time; approver approves weeks per project; accountant reads only; finance records money). Plus a short line on solo, studio, agency.
5. **The books** (dark ink chapter): heading "Haaaave you met your books?" Live journal posting the story's entries with chain links drawn between them; an interactive "Try to edit a posted entry" that is refused with "Posted entries are never edited. Reverse it instead." and shows the reversal. Mention period close and the read-only accountant seat. Line: "Every number here is a true story." A small P&L that matches the journal.
6. **Privacy**: "Your calendar stays yours." Calendar event → private draft visible only to its owner; titles and durations only, nothing else kept. Show it, briefly.
7. **The playbook**: a typographic index (not cards) of everything else: Estimates, Recurring invoices, Reminders and late fees, Credit notes, Client portal, Card and bank payments, Expenses and receipts, Bills and vendors, Bank feeds, Multi-currency, Reports (profit and loss, balance sheet, aging, cash basis), Period close, Roles and approvals. Hover/focus reveals a small live UI preview for the item.
8. **Final call**: "Suit up." with the waitlist form again; success state in-page: "Challenge accepted. You're on the list." (client-side only; validate email; error states named). Invite-only alpha note.
9. **Footer**: wordmark, few links, "© 2026 Ledgendary", a tiny "True story." wink.

Only claims in PRODUCT.md. Unverified integrations (Microsoft calendar, payroll) are not mentioned. No prices, customer counts, logos, testimonials.

## Motion and behaviour

One motion grammar: exponential ease-out, 300 to 700ms, UI that changes the way real app UI changes. Content visible by default; animations enhance. `prefers-reduced-motion`: loop paused on a meaningful final frame, morphs become instant swaps. Off-screen loops pause (IntersectionObserver). Keyboard: everything reachable, visible focus rings in the palette, scene chips and role switcher are proper buttons/tabs with ARIA. Theme the browser surfaces (selection, caret, focus, scrollbar, tabular numerals). WCAG 2.2 AA contrast; gold never carries text on white.

## Responsive

1440, 1280 and 390 wide must all be composed, not just wrapped. No horizontal scroll at 390. Product windows scale down or recompose for phone.

## Verify (bounded: two inspection rounds max)

Serve `site/` with `python3 -m http.server` from the project (or open the file). Screenshot with the `chrome-devtools` MCP tools (`new_page` with an `isolatedContext` name; never Claude in Chrome, never the user's browser). Capture `.impeccable/review/desktop.png` (1440 full page, motion settled) and `.impeccable/review/mobile.png` (390 full page). Fix everything round one shows in one batch, recapture once. Then run `"/Users/michtio/.claude-engy/plugins/cache/impeccable/impeccable/4.5.2/skills/impeccable/scripts/impeccable" detect --json site/index.html site/styles.css` once and fix mechanical findings. Stop the server and close your pages when done.

Commit locally in the project's git (short imperative subject, no attribution trailers, no mention of AI).

## Report back

What you built per section, the screenshot paths, detector findings fixed and left (with reasons), and anything you could not do.
