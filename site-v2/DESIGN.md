---
name: Ledgendary marketing home (v2, site-v2/)
description: Drenched ultramarine product page where the visitor plays the client and then the studio, and the page answers like the real app.
colors:
  blue: "#2433ff"
  blue-deep: "#1b26d8"
  blue-wash: "#f3f4ff"
  blue-line: "#dfe2ff"
  on-blue: "#ffffff"
  on-blue-2: "#dfe2ff"
  headline-tint: "#d3d7ff"
  select-text: "#1a22a8"
  lime: "#c8ff3d"
  lime-deep: "#b4f01e"
  ink: "#0b0c1c"
  ink-2: "#393c58"
  ink-3: "#5a5d7c"
  ink-hover: "#23253f"
  placeholder: "#6a6d8c"
  paper: "#ffffff"
  panel: "#fbfbfe"
  rail: "#f4f5fb"
  neutral-fill: "#eef0f6"
  seg-fill: "#eef0f8"
  line: "#e4e6f2"
  line-2: "#d3d6e8"
  range-track: "#d7daf7"
  draft-stroke: "#8b90d6"
  green: "#0b8a5a"
  green-text: "#0b5c3d"
  green-bg: "#e2f6ec"
  red: "#c81e33"
  tamper-pink: "#ff8fa0"
  switch-on: "#ff5f73"
  error-halo: "#ffb3bd"
  amber: "#8a5300"
typography:
  display:
    fontFamily: "Funnel Display, Funnel Sans, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6.1vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  display-close:
    fontFamily: "Funnel Display, Funnel Sans, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 5.6vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  figure:
    fontFamily: "Funnel Display, Funnel Sans, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 5.2vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.04em"
    fontFeature: "'tnum' 1"
  headline:
    fontFamily: "Funnel Display, Funnel Sans, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.2vw, 4rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Funnel Display, Funnel Sans, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.2vw, 2rem)"
    fontWeight: 750
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  doc-title:
    fontFamily: "Funnel Display, Funnel Sans, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 750
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  money:
    fontFamily: "Funnel Display, Funnel Sans, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 750
    letterSpacing: "-0.02em"
    fontFeature: "'tnum' 1"
  lede:
    fontFamily: "Funnel Sans, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Funnel Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  ui:
    fontFamily: "Funnel Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  button:
    fontFamily: "Funnel Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 650
    lineHeight: 1.1
  label:
    fontFamily: "Funnel Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
  role-tag:
    fontFamily: "Funnel Sans, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    letterSpacing: "0.04em"
rounded:
  xs: "4px"
  tag: "6px"
  sm: "8px"
  r-sm: "9px"
  md: "10px"
  lg: "12px"
  r: "14px"
  xl: "16px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4.4vw, 64px)"
  wrap: "1312px"
  section: "clamp(80px, 11vw, 150px)"
  head-to-content: "clamp(32px, 4vw, 52px)"
  column-gap: "64px"
  window-inset: "22px"
components:
  button-lime:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.8em 1.25em"
    typography: "{typography.button}"
  button-lime-hover:
    backgroundColor: "{colors.lime-deep}"
    textColor: "{colors.ink}"
  button-lime-sm:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.62em 1em"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "0.8em 1.25em"
    typography: "{typography.button}"
  button-ink-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.paper}"
  button-ink-disabled:
    backgroundColor: "{colors.neutral-fill}"
    textColor: "{colors.ink-2}"
  ghost-button:
    textColor: "{colors.on-blue}"
    rounded: "{rounded.pill}"
    padding: "0.4em 0.85em"
  waitlist-input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "50px"
  prompt-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "5px 16px 5px 5px"
  prompt-chip-role:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  pill:
    backgroundColor: "{colors.neutral-fill}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "0.4em 0.7em"
  pill-paid:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  pill-sent:
    backgroundColor: "{colors.blue-line}"
    textColor: "{colors.select-text}"
    rounded: "{rounded.pill}"
  pill-ok:
    backgroundColor: "{colors.green-bg}"
    textColor: "{colors.green-text}"
    rounded: "{rounded.pill}"
  demo-tag:
    backgroundColor: "{colors.blue-wash}"
    textColor: "{colors.ink-3}"
    rounded: "{rounded.pill}"
    padding: "0.15em 0.6em"
  product-window:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r}"
  hero-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
  option-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 14px 14px"
  option-card-chosen-head:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
  journal-entry:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "14px 16px"
  hash-chip:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "5px"
    padding: "0.15em 0.5em"
  tool-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "7px 12px"
  time-cell:
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 8px"
    height: "38px"
---

<!-- Scope: this file records the v2 home in site-v2/ only. It is one of competing alternates (v1 lives in site/, v3 in site-v3/, each in its own world) and makes no claim on the project as a whole. Derived from the shipped site-v2/styles.css, site-v2/index.html and site-v2/app.js as finished on 2026-11-18 after the finish review and its fix round. Where the review screenshots in .impeccable/review/v2-*.png disagree with the CSS (they were captured before the final stylesheet), the CSS wins. -->

# Design System: Ledgendary marketing home (v2)

## Overview

**Creative North Star: "You Drive the Demo"**

A saturated ultramarine field that the visitor plays on. The blue owns three chapters edge to edge (hero with nav, the books, the closing call); white sections sit between them. On the field, white type and crisp white product surfaces; on white, near-black ink. One accent, acid lime, behaves like a stamp of done-ness: the primary button, the chosen option, Paid, a posted hash, the active step. It is always a fill carrying ink, never a line or a text colour, with one exception: the keyboard focus outline on blue grounds.

Every claim is a working product surface (client portal, studio invoice, timesheet, journal chain, organisation settings) built from one anatomy: a 14 to 16px white window, a quiet `panel` bar with workspace mark, breadcrumb and a "Demo data" tag, hairline-divided rows, and Lucide line icons at stroke 2. The visitor's click is the trigger: picking an option, signing, sending, adding time, flipping a tamper switch, dragging a team-size dial. The page answers with short, springy UI responses (200 to 500ms, exponential ease-out); an 8 second idle lets the hero deal finish on its own, and reduced motion opens on the finished state.

Type is one superfamily: Funnel Display set heavy (750 to 800) and tight (-0.025 to -0.04em) for statements, titles and money; Funnel Sans for everything read and every control. Money is tabular wherever it appears.

**Key Characteristics:**
- Drenched: ultramarine is the ground of three chapters, not an accent; white sections alternate with it.
- One accent, acid lime, as fill with ink text; the lime focus outline on blue is the single line use.
- Product surfaces are white on every ground, with soft navy shadows on the field and lighter blue-tinted shadows on white.
- Funnel Display heavy and tight for display and figures; Funnel Sans for reading and UI.
- Interaction-led motion: the visitor triggers state; motion confirms it, and everything has a static reduced-motion state.

## Colors

A cool ultramarine-and-ink system with one acid accent; app semantics (green, red, amber, pink) live only inside product surfaces and form validation.

### Primary
- **Ultramarine Field** (`blue`): the drenched ground of the nav, hero, books chapter and closing call; the theme colour; also the in-window interactive colour on white (focus ring, selected time cell border, signature underline on focus, dial fill, wait dots, the pinned $42,000 figure, footer link hover).
- **Deep Ultramarine** (`blue-deep`): an inset panel on the field (the tamper console, the closing waitlist card), edged with a 1px 14% white inset line instead of a shadow.
- **Blue Wash / Blue Line** (`blue-wash`, `blue-line`): pale tints for selection and info inside windows: demo tags, the provenance note, option letter chips, the "Recommended" tag, signature block, playbook glyph tiles, sent pills.
- **Selection Text** (`select-text`): dark blue text on blue tints (sent pill, provenance note, waiting status, private draft cell).

### Secondary
- **Acid Lime** (`lime`): fill only, always with ink on it. The primary button, the prompt chip's role tag, the chosen option's header band, the paid total and Paid pill, posted and hash chips, the active step dot, new-tag in scale, the books fact icon discs, `mark` highlights, the brand mark, text selection, and the success panel that replaces the waitlist row. Also flashes behind a figure that just changed (time cells, invoice line, total).
- **Lime Deep** (`lime-deep`): the lime button's hover.

### Neutral
- **Ink** (`ink`): text on white, ink buttons (sign, send), the chosen option border, the docked "posted to the books" bar, active story step, the playbook top rule.
- **Ink 2 / Ink 3** (`ink-2`, `ink-3`): ledes and secondary copy; meta, labels and inactive text.
- **On Blue / On Blue 2** (`on-blue`, `on-blue-2`): white headings and active text on the field; soft periwinkle for ledes, nav links and inactive steps on the field.
- **Headline Tint** (`headline-tint`): the second line of the hero headline only ("Keep the books."), a quieter white on blue.
- **Paper / Panel / Rail** (`paper`, `panel`, `rail`): window body; window bars, sign strip, sidebars and quiet rows; the studio app's icon rail.
- **Neutral Fill / Seg Fill** (`neutral-fill`, `seg-fill`): neutral pills and disabled ink buttons; the segmented viewer switch and scale tags.
- **Line / Line 2** (`line`, `line-2`): 1px hairlines inside windows and between white sections; control borders and option-card strokes.
- **Draft Stroke** (`draft-stroke`): the dashed border of a private calendar draft.

### App semantics (inside product surfaces and validation only)
- **Green** (`green`, `green-text` on `green-bg`): signed, accepted, on-estimate.
- **Red** (`red`): a tampered amount, a broken hash, a refusal message.
- **Tamper Pink / Switch On** (`tamper-pink`, `switch-on`): the broken-chain outline and dashed link; the tamper switch when on. Pink rather than red because they sit on blue.
- **Error Halo** (`error-halo`): the invalid waitlist field's halo and dot on blue.
- **Amber** (`amber`): an over-estimate warning in the time sidebar.

### Named Rules
**The Field Owns Three Rule.** Ultramarine drenches exactly the hero (with nav), the books chapter and the closing call. Story, time, scale and playbook are white, separated by 1px `line` hairlines. A fourth blue chapter is a change to the world, not a section choice.

**The Lime Is a Stamp Rule.** Lime is a fill with ink text on it, on any ground. Never lime text, lime borders or lime lines, and never white on lime. The single exception is the keyboard focus outline (and the waitlist input's focus halo) on blue grounds, where lime reads at about 6:1.

**The Semantics Stay Inside Rule.** Green, red, pink and amber appear only inside product surfaces, the tamper console and form validation. Headings, ledes and page chrome use blue, white, ink and lime alone.

## Typography

**Display Font:** Funnel Display variable (with Funnel Sans, system-ui), self-hosted, weight 300 to 800
**Body Font:** Funnel Sans variable (with system-ui), self-hosted, weight 300 to 800

**Character:** A heavy, tightly tracked grotesque display with ink-trap bite set against its plainer text sibling; statements are loud and compact, everything read stays calm.

### Hierarchy
- **Display** (800, `display` clamp, 0.94, -0.04em, balanced): the hero headline in two lines, the second in `headline-tint`.
- **Display close** (800, `display-close` clamp, 0.9): the closing call.
- **Figure** (800, `figure` clamp, tabular, blue): the pinned $42,000 in the story; the scale dial readout uses the same recipe at clamp(2.5rem, 4vw, 3.5rem).
- **Headline** (800, `headline` clamp, 0.98, -0.035em, balanced): section headings.
- **Title** (750, `title` clamp, 1.05): the one sub-heading (privacy).
- **Document title** (750, 1.5rem, up to 1.625rem for the invoice number): portal, screen and invoice titles inside windows; option prices at the same size, tabular.
- **Money** (750, 1.625rem, tabular): invoice totals; 1.375rem in the time sidebar.
- **Lede** (400, `lede` clamp, 1.5, `on-blue-2` on the field or `ink-2` on white, 34 to 58ch, pretty wrap).
- **Body** (400, 17px, 1.55; 16px under 640px).
- **UI** (13 to 15px inside windows, 1.55); buttons 650 at 16px.
- **Label** (600, 12px, `ink-3`, sentence case): table headers and field labels.
- **Role tag** (700, 11px, 0.04em, uppercase): only the Client / Studio / Books tags in the hero step track, and the 12px group heads in the time sidebar. Never above a heading.
- **Signature** (Funnel Display 600 to 650, 1.25 to 1.375rem): a typed or recorded signature.

### Named Rules
**The Heavy and Tight Rule.** Display, titles, prices and totals are Funnel Display at 750 to 800 with negative tracking (-0.02 to -0.04em). Reading text and controls are Funnel Sans at 400 to 650 with no tracking.

**The Money Is Tabular Rule.** Every money figure carries `tabular-nums`: prices, totals, journal amounts, time cells, the pinned figure and the dial readout.

## Layout

One centred container of 1312px with a fluid gutter (clamp 16 to 64px). White sections and the books chapter use clamp(80px, 11vw, 150px) vertical padding; the closing call a little more (to 160px). Section heads are two-column grids (heading left, lede right, aligned to the bottom) set clamp(32px, 4vw, 52px) above their content, with 64px column gaps and asymmetric fractions where the content is asymmetric (hero 4.2fr/7.8fr, scale 5fr/7fr, books head 1.1fr/1fr).

The hero is a headline across the top-left, then lede, waitlist and a five-step track on the left with the playable card at large scale on the right. On short desktop viewports (under 860px tall, over 1000px wide) every hero measure tightens so the whole deal card fits the first screen.

The story is a 520vh scroll with a sticky 100vh stage: the $42,000 figure stays centred while five screens slide in from alternating sides (72px offset) and out the other way; step pills track progress at the top right. The books chapter lays four journal entries in a row joined by 34px link columns.

Breakpoints: 1180px stacks the hero and moves the track beside the copy, wraps the chain to two per row, stacks the time sidebar; 900px hides nav links, collapses every section grid to one column, and turns the story into stacked screens under a sticky ink pill carrying the lime figure; 640px stacks the waitlist form, hides the hero track and the studio rail, turns option cards into compact rows, verticalises the chain, and reflows the timesheet into per-person day grids.

## Elevation & Depth

Sections are flat; depth belongs to product surfaces. On the field, windows sit on a deep navy-tinted shadow so white reads as lifted off saturated blue; on white, the same surfaces take a lighter blue-tinted shadow plus a 1px 8 to 9% blue ring. Inset panels on the field (tamper console, closing waitlist) are a deeper blue with a 1px 14% white inset line, not a shadow. All shadows are soft with negative spread; none are hard or offset-solid.

### Shadow Vocabulary
- **Field** (`box-shadow: 0 44px 90px -30px rgba(5, 9, 78, 0.78), 0 14px 30px -14px rgba(5, 9, 78, 0.5)`): the hero card on the field.
- **Field small** (`box-shadow: 0 14px 30px -18px rgba(5, 9, 78, 0.6), 0 3px 8px -4px rgba(5, 9, 78, 0.3)`): journal entries on the books field.
- **Paper** (`box-shadow: 0 22px 50px -26px rgba(20, 28, 120, 0.32), 0 4px 12px -6px rgba(20, 28, 120, 0.14)`, plus `0 0 0 1px rgba(20, 28, 120, 0.08)` on windows): product windows and the scale dial on white.
- **Lime button** (`box-shadow: 0 1px 0 rgba(255,255,255,0.5) inset, 0 6px 16px -8px rgba(5, 9, 78, 0.6)`): the lime button only.
- **Chosen** (`box-shadow: 0 10px 24px -14px rgba(11, 12, 28, 0.55)`, with a 3px lift): the chosen option card.
- **Current item** (`box-shadow: 0 1px 3px rgba(20, 28, 120, 0.18)`): the active rail icon and segmented option, white on a tint.

### Named Rules
**The Windows Float, Sections Don't Rule.** Shadows belong to product surfaces, the prompt chip and the lime button. Section grounds, headings and copy never cast one, and panels on the field are inset, not raised.

## Shapes

Friendly app-native corners on a fixed ladder: 4 to 6px for marks, hash chips, tags and the workspace mark; 8px for time cells, tool buttons, rail icons and option CTAs; 9 to 10px for buttons, inputs, notes and panels; 12px for option cards, journal entries and the waitlist success panel; 14px for product windows and the tamper console; 16px for the hero card, the dial and the closing waitlist card; full pills for chips, status pills, demo tags, ghost buttons, story steps and the switch. Circles are reserved for avatars, step dots, chain link discs and fact icon discs. Borders are 1px hairlines; option cards and the waitlist input use 1.5px; dashed borders mean unconfirmed (private drafts, the next journal entry, a broken link).

## Components

### Buttons
- **Shape:** gently rounded (10px), 650 weight, 16px; small variant 15px with tighter padding.
- **Primary (lime):** lime fill, ink text, soft inset highlight and navy under-shadow. Labelled plainly ("Join the waitlist"), never a wink.
- **Ink:** ink fill, white text; used inside windows for the signature and send actions. Disabled takes `neutral-fill` with `ink-2` text at full opacity; a disabled lime button on the field becomes 14% white with `on-blue-2` text.
- **Hover / Active:** lime deepens to `lime-deep`, ink lightens to `ink-hover`; active presses 1px down and to 0.98 scale. An armed send button and a ready signature button pulse a 4px 25 to 28% blue ring once.
- **Ghost (on field):** transparent pill with a 1px 32% white border; hover fills 10% white. Used for play controls and reset. Collapses to icon-only under 640px with the label kept for screen readers.
- **Tool button (in windows):** white, 1px `line-2`, 8px; hover turns border and text blue; active scales to 0.96.

### Chips
- **Prompt chip:** white pill on the field with a lime role tag ("You're the client") and a short instruction; it swaps with a 0.92 to 1 scale-in when the role changes.
- **Status pills:** 12px/650 pills: neutral, `pill-ok` green, `pill-sent` blue, `pill-paid` lime.
- **Demo tag:** 11px pill on `blue-wash` with a `blue-line` border, right-aligned in every window bar.

### Cards / Containers
- **Product window:** white, 14px (hero card 16px), field or paper shadow by ground, a `panel` bar with workspace mark, breadcrumb and demo tag, 22px inner inset, `line` hairlines between rows.
- **Option card:** 12px, 1.5px `line-2` stroke, a `panel` header band holding a lettered chip and name; chosen takes an ink border, a lime header band, a 3px lift and an ink "Chosen" CTA, and the others recede to 55% once locked.
- **Inset panel on field:** `blue-deep`, 14 to 16px, 1px 14% white inset line.

### Inputs / Fields
- **Waitlist field:** 50px white input, 10px, 1.5px 55% white border, beside a 50px lime button. Focus: lime border plus 3px lime halo. Error: white border with `error-halo` 3px halo and a white bold message led by a pink dot. Success replaces the row with a lime panel and check icon.
- **Signature field:** borderless with a 2px `line-2` underline, typed in Funnel Display 600; focus turns the underline blue, ready turns it ink.
- **Time cell:** 38px transparent button, 8px; hover `blue-wash`; selected has a blue border with a 3px 14% blue ring; a changed value flashes lime.
- **Dial:** range with an 8px blue-filled track and a 28px lime thumb with a 3px ink border.

### Navigation
- On the field: lime brand mark and Funnel Display 800 wordmark, three links in `on-blue-2` at 550 (white and underlined on hover), small lime button pushed right. Not sticky. Links hide under 900px. Footer repeats the brand in ink on white with `ink-2` links that turn blue on hover.

### Focus
- 3px solid outline, 3px offset, 6px radius. Blue (`blue`) on white and inside every white surface, including surfaces sitting on the field; lime on blue grounds. Option cards ring through `:has(input:focus-visible)`.

### Play surface (signature)
- One card holding two views stacked in the same grid cell: the client portal and the studio invoice. Signing wipes the invoice up over the portal (clip-path, 500ms) while the portal scales to 0.97 and fades. A left step track (dots, uppercase role tags) marks progress, lime on the current step. "Wait for it" shows three bouncing blue dots; Paid stamps the total with a lime fill and a 1.07 scale pulse; the books row docks in ink from the left with a lime "Posted" chip.

### Pinned figure (signature)
- $42,000 in Funnel Display 800, blue, tabular, centred on a 2px blue stem, with a caption that pops on each step while screens slide past. Under 900px it becomes a sticky ink pill with the figure in a lime pill.

### Journal chain (signature)
- White entries on the books field with tabular lines, a lime hash chip and the previous hash, joined by white link discs on a 55% white line; the next entry is a dashed outline placeholder. Tampering rings the entry in pink, turns the amount and hash red, breaks the link (dashed pink, red broken-link disc) and shows a white refusal panel in red; reversing fills the placeholder with a new entry instead.

### Playbook list
- Two-column list under a 2px ink rule; each row a 36px `blue-wash` glyph tile with a blue icon or small CSS-drawn motion glyph that animates only while the list is on screen; hover turns the tile lime.

## Do's and Don'ts

### Do:
- **Do** keep ultramarine to the hero, the books chapter and the closing call, with white sections between.
- **Do** use lime as a fill with ink text: the primary button, the chosen thing, Paid, posted, the current step.
- **Do** switch the focus ring to lime on blue grounds and keep it blue on white and inside white surfaces.
- **Do** set display, titles, prices and totals in Funnel Display 750 to 800 with negative tracking; keep reading text in Funnel Sans.
- **Do** set every money figure in tabular numerals.
- **Do** put every product claim in a white window with the "Demo data" tag and the same job's figures (Northwind Co, option B, $42,000).
- **Do** let the visitor's click drive state, answer within 200 to 500ms on the shared easing, and give every interactive beat a finished static state under reduced motion.

### Don't:
- **Don't** set lime text, lime borders or lime lines (focus on blue excepted), or white text on lime.
- **Don't** use green, red, pink or amber outside product surfaces, the tamper console and validation.
- **Don't** add a fourth blue chapter or tint white sections blue.
- **Don't** put shadows on section grounds or headings, or use hard offset shadows; panels on the field are inset.
- **Don't** add uppercase tracked labels or eyebrows above headings; uppercase is limited to the step track's role tags and the time sidebar's group heads.
- **Don't** use a wink in a primary button label.
