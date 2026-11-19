---
name: Ledgendary audience pages (v5 "Prove it", site-v5/)
description: Every claim has a receipt; a plain sentence, a Prove it control, and a loupe over the exact piece of product that proves it, in cool daylight with one violet.
colors:
  ground: "#eceef2"
  surface: "#ffffff"
  surface-2: "#f5f6f9"
  ink: "#15161a"
  ink-2: "#565b68"
  line: "#d9dce3"
  line-2: "#e7e9ee"
  line-strong: "#b9bdc8"
  placeholder: "#6a6f7c"
  violet: "#6b2cff"
  violet-deep: "#5418e8"
  violet-wash: "#f1ebff"
typography:
  display:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.4rem + 4vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.1vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  subline:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 1.1rem + 0.9vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  claim:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-0.012em"
  lead:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.98rem + 0.35vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'CRSV' 0, 'SHRP' 0"
  receipt:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.45
  button:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "-0.005em"
  stamp:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.005em"
    fontVariation: "'slnt' -10"
  ui:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
  window-title:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 650
    letterSpacing: "-0.01em"
  label:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
  id:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    letterSpacing: "0.01em"
    fontFeature: "'zero' 1"
rounded:
  mark: "3px"
  xs: "6px"
  seg-item: "7px"
  sm: "8px"
  seg: "9px"
  control: "10px"
  md: "12px"
  frame: "14px"
  lg: "16px"
  pill: "999px"
spacing:
  nav: "68px"
  wrap: "1280px"
  gutter: "32px"
  gutter-phone: "16px"
  section: "88px"
  section-phone: "72px"
  head-to-proof: "44px"
  claims-column: "320px"
  proof-gap: "36px"
  loupe: "188px"
  loupe-phone: "168px"
  win-inset: "16px"
  final: "120px 0 96px"
components:
  button-primary:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "44px"
    typography: "{typography.button}"
  button-primary-hover:
    backgroundColor: "{colors.violet-deep}"
  prove-it:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 13px 0 10px"
    height: "36px"
  prove-it-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
  prove-it-open:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.surface}"
  claim-open:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 16px"
    typography: "{typography.claim}"
  stamp:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.surface}"
    rounded: "{rounded.xs}"
    padding: "3px 9px 3px 7px"
    typography: "{typography.stamp}"
  waitlist-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "48px"
  nav-link:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  nav-link-current:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  product-window:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    typography: "{typography.ui}"
  window-sidebar:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-2}"
    width: "168px"
  demo-tag:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "1px 8px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "1px 7px"
    typography: "{typography.label}"
  chip-paid:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
  chip-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
  window-control:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "32px"
  window-control-primary:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.surface}"
  segmented:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.seg}"
    padding: "3px"
  segmented-on:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.seg-item}"
  refusal:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px"
  draft-row:
    backgroundColor: "{colors.violet-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
  confirmed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.xs}"
    padding: "2px 8px"
  loupe:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    size: "188px"
  compare:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "28px 30px 30px"
---

<!-- Scope: this file records look v5 "Prove it" in site-v5/ only (index.html, solo.html, team.html, enterprise.html, styles.css, app.js, fonts/). It is one of several competing alternates (site/, site-v2/, site-v3/, site-v4/ and others each hold their own world) and makes no claim on the project as a whole. Derived from the shipped build as finished on 2026-11-19 after the finish review (ship verdict) and a polish round. Where the direction contract (.impeccable/brief-look-v5.md) and the build diverge, the build is recorded and the divergence noted. -->

# Design System: Ledgendary audience pages (v5 "Prove it")

## Overview

**Creative North Star: "The Receipt Drawer"**

A cool, daylight page where nothing is asserted without evidence. Each feature is one plain, confident sentence; under it a pill-shaped "Prove it" control opens the receipt: the claim lifts onto a white card, a short text receipt slides in (usually led by a violet, slanted "True story." stamp), and a circular loupe beside the product window magnifies the exact cell, chip or row that proves it, while the same target is washed violet in the window itself. The evidence is always stated in words as well as shown.

The world is grey-blue ground, white working surfaces, graphite ink and one electric violet. Product UI is drawn crisp, dense and light-themed at 13px with 1px cool lines, the way the app itself looks. Depth is layering plus one soft shadow recipe; the loupe is the single lifted object, ringed in violet. Geologica carries everything, upright and tight at 700 to 800 for headlines, 500 for claims, and slanted only where something is being attested.

Pages open on the ground with a full-width two-line headline, a lead, the waitlist and a two-column table of contents of "the other receipts on this page", beside the boldest claim already proven. Sections follow as claims-plus-stage pairs, one macro-to-full sequence where a close-up of a journal row zooms out to the whole screen on scroll, a two-column comparison, and a final waitlist with a tally of receipts opened.

**Key Characteristics:**
- Cool grey ground, white surfaces, graphite ink, one violet; no other hue anywhere.
- Every claim is a sentence, a Prove it control and a text receipt; the loupe shows, the receipt says.
- Product windows are light, dense, 1px-lined and tagged "Demo data".
- One soft shadow for cards and windows; one lifted object, the loupe.
- Geologica alone; slant means "attested" (the stamp, a recorded signature).

## Colors

Cool daylight neutrals in three surface steps and three line steps, graphite ink in two strengths, and a single violet with a deeper press state and a pale wash.

### Primary
- **Electric Violet** (`violet`): always a fill under white text (about 7:1). The waitlist and nav button, an opened Prove it control, the "True story." stamp, the Paid chip, the in-window primary control, the brand mark, earned badges, pressed reactions, the loupe ring, the wait bar and the tally's lit cells; also the focus outline, the field's focus ring, text selection and the caret. Never body text, never a section field.
- **Deep Violet** (`violet-deep`): hover on violet buttons only.
- **Violet Wash** (`violet-wash`): the highlighted table row, private draft rows inside windows. The loupe target uses violet at 13% with a 2px violet underline.

### Neutral
- **Ground** (`ground`): the page and the frosted sticky nav (92% with blur).
- **Surface** (`surface`): product windows, opened claim cards, the comparison, chips, fields, the current nav link and segmented choice.
- **Surface 2** (`surface-2`): window sidebars, refusals, step-up panels, segmented tracks, URL rows, quiet chips and index-row hover.
- **Ink** (`ink`): all primary text, the Prove it outline and its hover fill, the ink chip (Overdue, Closed), "confirmed" labels, avatars, and every error state.
- **Ink 2** (`ink-2`): leads, nav links at rest, table heads, captions, the "usual way" column, footer.
- **Line / Line 2 / Line strong** (`line`, `line-2`, `line-strong`): structural 1px rules (window edges, bar rules, section dividers, head rules); row dividers; hover borders on fields and window controls.
- **Placeholder** (`placeholder`): input placeholder only.

### Named Rules
**The One Violet Rule.** Violet is the only hue, and it is a fill with white text or a ring, never copy colour. If a second hue seems needed, use ink, a wash or a line instead.

**The Ink Is The Alarm Rule.** Errors, invalid fields, overdue and closed states are ink, not red: an ink border with a 1px ink ring, a bold ink message led by an 8px ink dot, an ink chip. The page keeps one accent even when something is wrong.

## Typography

**Display Font:** Geologica variable (with ui-sans-serif, system-ui), self-hosted, weight 100 to 900, oblique 0 to 12deg
**Body Font:** the same family, with the cursive and sharpness axes held at zero (`CRSV` 0, `SHRP` 0)

**Character:** A clean, slightly technical grotesque that tightens convincingly at 800 for headlines and stays calm and legible at 400 to 500 for claims and receipts; one family is the whole voice.

### Hierarchy
- **Display** (800, `display` clamp, 0.98, -0.04em, balanced): the page headline, two lines with a hard break, spanning the hero grid.
- **Headline** (700, `headline` clamp, 1.02, -0.035em): every section head, the macro head, the final.
- **Subline** (500, `subline` clamp, 1.15): the enterprise hero's "Legen— wait for it —dary." line, which resolves in three beats.
- **Title** (650, 1.25rem): comparison column heads.
- **Claim** (500, 1.0625rem, 1.35, -0.012em, pretty wrap): every claim sentence.
- **Lead** (400, `lead` clamp, 1.5, 58ch, `ink-2`): under headlines.
- **Body** (400, 16px, 1.55); comparison rows 15.5px; TOC 14.5px.
- **Receipt** (400, 14.5px, 1.45): the receipt text under a claim.
- **Button** (600, 15px).
- **Stamp** (700, 0.875rem, slant -10): "True story." only.
- **UI** (13px window base; tables 12.75px; crumbs, sidebar and controls 12.5px; table heads and labels 12px at 500 to 600). Window title 650 at 16px.
- **IDs and hashes** (`id`): slashed zero and +0.01em (hashes +0.02em at 500).
- **Signature** (300, 20px, slant -10): a recorded e-signature inside a window.

### Named Rules
**The Slant Attests Rule.** Oblique type appears only where something is being vouched for: the "True story." stamp and a person's recorded signature. Headlines, claims and UI stay upright.

**The Sentence Case Rule.** No uppercase labels, no tracking-out. Labels, chips, table heads and the TOC heading are sentence case at 12 to 14px.

## Layout

One 1280px container with a 32px gutter (16px at 760px and below) under a sticky 68px nav. The hero is a two-column grid (0.9fr copy, 1.1fr proof; 28px by 56px gaps) with the display headline spanning both; the copy column holds lead, waitlist and a two-column receipt TOC under a 1px rule.

Sections are 88px tall in padding (72px on phones) and divided by a 1px `line` rule. A section head (max 760px) sits 44px above its proof. A proof is a 320px claims column and the stage, 36px apart; it can flip sides, or go wide with claims in three or four columns above the stage. On desktop above 1180px the stage is sticky 92px from the top and splits into the window and a 188px lens column (loupe above caption). The macro sequence pins a full-height viewport under the nav across a 230vh track (190vh on phones). The final is a two-column grid (copy and tally, 440px form) bottom-aligned, 64px apart.

Breakpoints: 1180px stacks hero, proofs and final, flows claims as auto-fit 260px columns, and moves the loupe under the window beside its caption. 760px wraps nav links onto their own row, stacks the waitlist, hides window sidebars, shrinks the loupe to 168px, stacks the comparison, and turns tables marked for stacking into labelled card rows (labels written from the column heads by script).

## Elevation & Depth

Layering first, one soft shadow second. The ground is grey, working surfaces are white with a 1px line, and an opened claim, a product window and the comparison share one soft two-part shadow. Exactly one object is lifted: the loupe. There are no hard offset shadows; the only blur is the nav's frosting.

### Shadow Vocabulary
- **Soft** (`box-shadow: 0 1px 2px rgba(21, 22, 26, 0.06), 0 18px 40px -18px rgba(21, 22, 26, 0.22)`): product windows, the opened claim card, the comparison. Removed inside the loupe and inside the macro view.
- **Lift** (`box-shadow: 0 2px 4px rgba(21, 22, 26, 0.08), 0 28px 60px -20px rgba(31, 14, 84, 0.38)`): the loupe only, under a 3px violet ring and a 7px violet halo at 14%.
- **Hairline ring** (`box-shadow: 0 0 0 1px` in `line`): current nav link, current sidebar item, segmented track and selected item, quiet avatars, the index list.
- **Focus ring** (`box-shadow: 0 0 0 3px rgba(107, 44, 255, 0.22)`): the email field on focus.

### Named Rules
**The One Lifted Object Rule.** The lift shadow belongs to the loupe. Everything else is either flat on the ground or carries the soft shadow.

## Shapes

App-native and modest. Product windows and claim cards 12px; the macro view and index list 14px; the comparison 16px. Buttons and fields 10px; segmented track 9px; nav links, window controls, refusals, step-up panels and draft rows 8px; segmented items and URL rows 7px; the stamp, sidebar items, confirmed labels and focus outlines 6px; tally cells and the loupe target 3px. Prove it controls, chips, the Demo data tag and reactions are full pills. The loupe, brand mark, avatars and badges are circles. Lines are 1px everywhere; the Prove it control is the one outlined (ink) pill.

## Components

### Buttons
- **Primary:** violet fill, white 600 text, 10px corners, 44px tall (48px in the waitlist, 40px in the phone nav). Hover deepens to `violet-deep`; press sinks 1px; disabled at 55% opacity.
- **Prove it (signature):** a 36px pill with a 1px ink outline, a zoom-in icon and 600 text. Hover fills ink with white text; open (aria-expanded) fills violet. Opening one closes its siblings in the group.
- **Window controls:** 32px, 8px corners, white with a 1px line, 12.5px/600; hover takes `surface-2` and `line-strong`. The primary in-window action is violet.

### Waitlist
- A label above a 48px white field (10px corners, 1px line, violet caret) and the primary button in a row; one idle note below in `ink-2`. Focus: violet border plus 3px violet ring at 22%. Error: ink border and ring, the note in 500 ink led by an ink dot. Success: the note in 600 ink, the row dims to 60%.

### Navigation
- Sticky, 92% ground with saturate-and-blur frosting, gaining a 1px line once scrolled. Violet circle mark with a check and an 800 wordmark; 15px/500 `ink-2` links in 8px-cornered boxes that take a 5% ink wash on hover; the current page sits on white with a hairline ring. Primary button at the end.

### Claims and receipts (signature)
- A list of claims, 6px apart. At rest a claim is text on the ground; opened, it becomes a white 12px card with a line and the soft shadow. Under the claim, the Prove it control; under that, the receipt, which expands by grid-row animation (450ms) and swaps a "Receipt: …" pre-line for the proof text rising 6px. A live region announces the proof.

### Loupe (signature)
- A 188px circle at the stage's side, violet-ringed and lifted. It shows a live clone of the product window, scaled (2.3 by default, down until the whole target fits), centred on the target and masked so only the target and a faded sliver of its row show. Idle it sits at 94% scale and 50% opacity with a caption; aimed it settles to full. The target in the real window is washed violet at 13% with a 2px violet underline. A caption beside it names the evidence in 600 ink over a 14px `ink-2` line.

### Product window
- White, 12px, 1px line, soft shadow, 13px text. A 42px bar under a 1px line holds breadcrumbs (current crumb 600 ink), the "Demo data" pill and the signed-in avatar. Optional 168px `surface-2` sidebar. Content follows app patterns: tables with a `line` head rule and `line-2` row rules, right-aligned amounts, key-value lists, refusals and step-up panels on `surface-2`, violet-wash draft rows, ink "confirmed" labels, segmented controls, a 4px violet wait bar. States are all in the DOM and swap in place with a 350ms fade.

### Chips
- 12px/600 pills with a 1px line on white; violet fill for Paid, ink fill for Overdue and Closed, `surface-2` for quiet. Icons 12px.

### Macro to full (signature)
- A sticky viewport over a long track: the window starts at 2.6x on a focus cell and eases (cubic out) to the whole screen as the visitor scrolls, the caption swapping from "Close-up" to "Whole screen" past 60%. On phones it ends at 1x from the top. Reduced motion shows the whole screen, unpinned.

### Comparison
- One white 16px panel split in two by a 1px line: the usual way in `ink-2` with task icons, the Ledgendary way in ink with checks, rows divided by `line-2`.

### Tally
- "Receipts opened: n of N" with a row of 10px 3px-cornered cells that light violet as receipts are opened; at all, "Every one. True story." appears.

### Focus and motion
- Focus is a 2px violet outline, 3px offset, 6px radius. One easing, `cubic-bezier(0.16, 1, 0.3, 1)`; hover 150 to 180ms, claim and loupe 300 to 700ms. Reduced motion collapses transitions, keeps claim, receipt, loupe and state swaps as 200ms fades, and unpins the macro.

## Do's and Don'ts

### Do:
- **Do** pair every claim with a Prove it control and a receipt stated in words, so the evidence never lives only in the loupe.
- **Do** keep violet a fill under white text or a ring; deepen it for hover.
- **Do** draw product windows light, dense and 1px-lined, and tag every one "Demo data".
- **Do** keep the soft shadow for windows, opened claims and the comparison, and the lift for the loupe alone.
- **Do** show errors and closed states in ink.
- **Do** set IDs and hashes with slashed zeros, and right-align amounts.
- **Do** give every moving piece a finished state under reduced motion.

### Don't:
- **Don't** introduce a second hue, including red for errors or green for paid.
- **Don't** use violet as text colour on copy or as a section background.
- **Don't** slant anything that is not attesting: the stamp and a recorded signature only.
- **Don't** lift any object other than the loupe, and don't use hard offset shadows.
- **Don't** put uppercase labels or kickers above headings; section heads are a headline and a lead.
- **Don't** add a second family or a system display face; Geologica carries everything.
