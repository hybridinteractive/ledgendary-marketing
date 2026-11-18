# Audience landing pages: shared content brief

Michael, 2026-11-18: "3 different landing pages, focus on solo/team/enterprise. As we have crazy features, tamper proof etc ... all in HIMYM tone of voice." Then: today's three looks plus two new ones, and from each look the solo, team and enterprise pages, with our best features for each. 5 looks x 3 audiences = 15 pages.

This file is the content every look builds from, so Michael compares looks, not copy. A look may reorder, merge or re-stage sections in its own grammar; it may not add claims, drop an audience's signature feature, or rewrite the facts. Product truth: `PRODUCT.md` (read "The books, as built" and "Never claim" twice).

## Voice: fully in voice

The whole page talks like the friend who knows the playbook: confident, quick, a little smug about how good the books are. Catchphrase nods carry headlines, section titles, captions, empty states, errors and success states. Use them freely, vary them per page, never repeat the same one twice on one page:

- "Legen— wait for it —dary." (and "wait for it…" as a motion beat before money lands)
- "Suit up." · "Challenge accepted." · "True story." · "Haaaave you met …?" · "Kids, …" (story openers) · "The playbook" · "The bro code" is OUT (gendered) · "High five." / "Up top." (celebration beats) · "Nothing good happens after 2 a.m." (late-night invoicing, the solo page) · "When I get sad, I stop being sad and be awesome instead." (once at most, paraphrased) · "It's going to be legendary." · "Have you met Ted?" is OUT (names a character).
- Rules: never in the primary button label ("Join the waitlist" stays plain); never name the show, its characters, actors, places (no bar names, no yellow umbrella, no blue French horn, no slap bet); no imagery from it. Every wink sits next to a plain sentence that says what the product does, so a visitor who never saw the show loses nothing.
- Each page ends with its own "Suit up." style call and the waitlist (invite-only alpha). Success state: "Challenge accepted. You're on the list." Errors name the actual problem.

## Shared demo world (identical everywhere; label every drawn panel "Demo data")

- Solo: Maya Ortiz, freelance designer ("Maya Ortiz Studio"), client Northwind Co (Dana Whitfield), job "Brand refresh", proposal P-0007 with options A $6,000 / B $9,500 / C $9,500 + $800/mo; B chosen; invoice INV-0012 $9,500 (fixed fee $6,500 + 20 h at $150 = $3,000), paid by card; one recurring retainer for Halcyon at $800/mo; a late fee posted as its own entry on an overdue invoice from Ferro (INV-0010, $2,400, 5% late fee $120).
- Team: Lumen Studio (from the home pages): Maya Ortiz (owner), Sam Okafor (admin), Theo Brandt and Priya Nair (members), Jules Carter (accountant, read only). Job Northwind "Site build": B = $30,000 + time, est. 80 h, est. total $42,000; INV-0042 $42,000; weeks 41 h 45 m + 38 h 15 m; JE-1041 / JE-1042.
- Enterprise: "Meridian & Vale" (synthetic, about 300 people, three offices, USD, EUR and GBP). Use figures that add up; a multi-currency report shows per-currency totals and no blended total. Chain hashes short (#9c07 style). An anchor batch: "Batch 0418 · 12,906 entries · root 3f9a…c21e · signed by the timestamp authority Nov 17, 02:00 UTC · evidence locked until Nov 2036". (Synthetic; label it.)

## Solo page: "One person. Books like an empire."

Who: a freelancer or one-person studio who sells by proposal, does their own billing, dreads the tax season, and works late.
Promise: win the work, get paid, and have books an accountant would sign, without becoming an accountant.
Signature features (must all appear, in this priority):
1. Proposals with options the client picks from; the picked option becomes the invoice (no retyping).
2. Get paid: card or bank in the client portal; reminders on a schedule you set; a late fee posts as its own entry (the invoice is never rewritten). "wait for it…" → Paid.
3. Time that bills itself: log hours (or accept a private calendar draft only you see; titles and durations only), unbilled hours land on the invoice.
4. Recurring retainers that issue one invoice per period and never two, even if the scheduler runs twice.
5. Expenses and bills, kept apart so spend is never counted twice; cash-basis view per client.
6. Books an accountant reads: invite them read only; reports as of any date; tamper-evident chain (lighter touch than enterprise).
7. Milestones: a real badge from PRODUCT.md's list (e.g. first retainer, paid on time 5 times) gets a celebration ("Up top."). Never invent a badge.
Voice hooks: "Nothing good happens after 2 a.m. Except your invoice going out on schedule." · "Kids, this is the story of how I stopped chasing invoices."

## Team page: "Your whole studio, on one ledger."

Who: studios and agencies of 3 to 50: an owner, an admin or two who handle money, members who log time, an outside accountant.
Promise: everyone sees what their seat needs and nothing they shouldn't; the money path from proposal to paid is one product, so nobody re-keys anything.
Signature features:
1. Seats: owner, administrator, member, accountant (read only). Members see only the projects they are on. Show the same screen through each seat.
2. Time: weekly grid; private calendar drafts only their owner sees (not even the owner of the company); submit the week; an owner or admin approves; approved weeks lock; invoiced entries take a note and nothing else.
3. Unbilled time to invoice: approved hours flow onto the invoice, priced at the agreed rate.
4. Money actions behind a second check: voids, write-offs, refunds and period close ask the person to confirm who they are again first.
5. The client portal: clients pick, sign and pay; the signature keeps the name and moment, not their raw address or browser.
6. Bills and vendors: W-9 collection tracked; full tax ids never stored; paying a bill never doubles as an expense.
7. Milestones with team reactions ("High five." moments), using a real badge from PRODUCT.md's list (e.g. first week submitted, 12 weeks on schedule).
Voice hooks: "Haaaave you met your team's timesheets?" · "Challenge accepted: month end without a spreadsheet."

## Enterprise page: "Books you can prove. Legen— wait for it —dary."

Who: large agencies and groups (hundreds of people, several offices and currencies), their finance leads, controllers and auditors.
Promise: books you can prove, not just books you keep. This page shows the crazy features at full strength.
Signature features (the tamper-proof story is the spine):
1. Posted entries are never edited. Reverse, never edit; three layers refuse an edit. Show an attempted edit refused and the reversal that replaces it.
2. Every posting is hash-chained in the same transaction; no chain row, no posting.
3. Anchored outside the app: a Merkle root of the organisation's entries signed by a third-party timestamp authority; evidence kept in storage nobody can delete before its retention date, us included. The line to land: someone with full database access could rewrite a chain; they cannot make a timestamp authority have signed the old root last March.
4. Every entry balances three times: when built, when posted, and every night.
5. Period close that means closed; edits to a closed period are refused, not quietly restated.
6. Reports as of any date that reconstruct what was owed then; multi-currency reports never invent a blended total.
7. No gaps: one counter numbers every document inside the transaction.
8. Money never lands twice: a provider's duplicate notification is applied once; refunds charge the provider first, record second.
9. Tenancy you can't see past: another organisation's record answers "not found".
10. Privacy by construction: full tax ids never stored; signature context kept as keyed fingerprints; calendar capture keeps titles and durations only; data-subject requests anonymise rather than delete records the law says to keep.
11. Step-up on every action that takes money off the books.
Voice hooks: "Haaaave you met your auditor? They're going to love you." · "True story. Signed by someone who isn't us." · "Kids, in the year 2036, your auditor asked about one invoice from last March…"
Never on this page: courtroom or legal-admissibility claims, SSO, SOC 2, SLAs, data residency, an API, dedicated support, prices, customer logos, "enterprise-grade" filler. The CTA is the same waitlist ("Join the waitlist"), invite-only alpha.

## Page anatomy (each look composes it in its own grammar)

Nav with the three audience links (Solo, Team, Enterprise) plus Home, and "Join the waitlist". Hero with audience headline, plain subline, waitlist form, and a live product moment specific to the audience. Then the signature features as product-led sections with real drawn UI and the look's own motion. A section that compares nothing to competitors (no rival names). Final call + footer. Pages in one look share that look's CSS file; the home page of that look links to the three.

## Fix on the existing home pages (same pass, per look)

v1, v2 and v3 home pages show an "Approver" seat (Lena Park) with per-project approval, which is not built. Change that seat so the copy matches what exists: an owner or administrator approves weeks; members see their own projects. Keep the five people if useful, but no seat or claim may describe per-project approvers or finance roles.
