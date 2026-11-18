# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS and JavaScript (home pages and audience landing pages). No framework, no build step. Kept outside the Ledgendary app repository until Michael decides where it lives.

## Users

Agencies and creative service businesses of every size: a freelancer billing alone, a studio of a handful, and large agencies with many teams, approvers and finance staff. The people who decide are owners and operators who sell work by proposal, run it on time, bill it, and need books an accountant trusts. Inside a large agency the same product serves members logging time, administrators who approve weeks and handle money, and an external accountant who only reads.

## Product Purpose

Ledgendary takes an agency's money from the first proposal to cash in the bank, and keeps the books that follow from it: proposals with options a client chooses between, estimates, invoices, a client portal where clients accept, sign and pay, time capture and timesheets, expenses, bills, bank feeds and reports. Success on the marketing site during the alpha: a visitor understands that "win work to paid, with real books underneath" is one product, and joins the waitlist.

## Positioning

Most tools stop at one end: a proposal tool that hands off to an invoicing tool that hands off to an accounting tool. Ledgendary is one ledger underneath the whole path, so the proposal a client picks becomes the invoice, the hours become the line items, the payment becomes the posting, and the report reads the same posted books. Postings are immutable and hash-chained, so the books are tamper-evident by construction, not by policy.

## Operating Context

- The path a job follows: proposal (with options) or estimate, client decision in the portal (accept, e-sign), invoice, reminders and late fees, payment (online card or bank), reports.
- Time: people log hours in a weekly grid; calendar events can become private drafts only their owner sees; weeks are submitted and approved; unbilled time lands on invoices.
- Money outside the path: expenses, bills owed to vendors, bank feeds, period close.
- Teams: owners, administrators, members, and an external accountant with read-only access. Members see only the projects they are on. (Finance roles and per-project approvers are specified, not built: never claim them.)
- Durations read as "4 h 30 m". US is the launch market; multi-currency is supported.

## Capabilities and Constraints

- Alpha is invite only. The marketing site's one action is joining the waitlist; no trial, checkout or pricing table promised on the home page this round.
- Tiers exist (Solo, Team, Pro) but the home page states no prices.
- Never promise an integration that is not verified (a Microsoft calendar connection and a payroll connection are unverified).
- Anything a person can reach that takes money off the books (voids, write-offs, refunds, period close and reopen) asks them to confirm who they are again (password, passkey or emailed code) first.
- A recurring template issues one invoice per period, and never two, even if the scheduler runs twice.
- Weeks are submitted by the person and approved by an owner or administrator; an approved week is locked, and an invoiced entry takes a note and nothing else.
- Personal-data stance is a real feature: private calendar drafts stay private, capture keeps titles and durations only, sensitive identifiers like full tax ids are never stored.
- The books, as built (safe to claim, phrase plainly):
  - Every posting and reversal is hash-chained in the same transaction; a posting the chain cannot record does not happen.
  - Posted entries are never edited, only reversed; three layers refuse an edit (no service path, a model guard, a database trigger).
  - Every entry balances, checked when it is built, when it posts, and again every night.
  - The chain is anchored outside the app: an organisation's unanchored rows are reduced to a Merkle root that a third-party timestamp authority signs, and the evidence is kept in storage that nobody, us included, can delete before its retention date. Someone with full database access could rewrite a chain; they could not make the timestamp authority have signed the old root last March.
  - Closed periods refuse changes; an edit to a document in a closed period is refused rather than quietly restated.
  - Reports can be read as of any past date and reconstruct what was owed then.
  - A report over several currencies states no fake total; each currency keeps its own.
  - Document numbers come from one counter inside the transaction, so there are no gaps an auditor asks about.
  - A payment a provider sends twice is applied once; a refund is charged at the provider first and recorded second.
  - Another organisation's record does not exist for you (it answers "not found"); tenancy is enforced on every read and write.
  - A bill paid is never also an expense, so spend is not counted twice.
  - Full taxpayer identification numbers are never stored (kind and last four only); W-9 collection is tracked as a lifecycle.
  - Personal context on signatures (address, browser) is kept only as a keyed fingerprint, never raw.
  - Data-subject requests anonymise rather than delete financial records, which are retained as the law requires.
- Also real: milestones and celebrations (an organisation can turn them on; badges for firsts like the first invoice paid, with reactions from the team).
- Never claim: SSO/SAML, SOC 2 or other certifications, uptime or support SLAs, data residency choices, an API or MCP (planned during the alpha), finance roles, per-project approvers, payroll, a Microsoft calendar connection, prices, customer counts.
- Undecided: final domain copy for the waitlist form, whether a public roadmap is linked.

## Brand Commitments

- Name: Ledgendary (domain ledgendary.app). The product never mentions how it was built.
- No existing visual identity is inherited for this round: Michael asked for a fresh direction (2026-11-18).
- Voice: plain, confident, specific; says what the product does in words a stranger can repeat.
- The marketing site is a SaaS product page, product-led, at the craft level of Linear, Stripe and Mercury. No metaphor or costume worlds (departure boards, ledgers-as-paper, maps): ruled by Michael 2026-11-18 after rejecting a direction round.
- The name winks at "Legen— wait for it —dary". The voice carries small nods to that sitcom's catchphrases (wait for it, challenge accepted, true story, the playbook, "Haaaave you met...", "Kids, ..."): ruled by Michael 2026-11-18. Winks live in microcopy, headings and motion beats; never in the primary action's label, never naming the show, its characters or its imagery.

## Evidence on Hand

- No customers, testimonials, logos, metrics or press exist. None may be invented.
- Product demonstrations are authored in the page with invented demo data, labelled as demo data, to be matched to the real app later.

## Product Principles

1. Show the money moving, do not describe it.
2. One path, one ledger: every section should connect to the same job's journey.
3. Honest books are the differentiator; tamper-evidence is shown as a property, not a slogan.
4. Scale from one person to a large agency without changing the story.

## Accessibility & Inclusion

WCAG 2.2 AA. Every animation respects reduced motion and never hides content that is needed to understand the page.
