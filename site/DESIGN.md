---
name: Ledgendary marketing home (v1, site/)
description: Daylight SaaS product page where one job travels from proposal to paid to posted books inside live product windows.
colors:
  gold: "#ffc629"
  gold-hover: "#ffd24f"
  gold-soft: "#fff1c7"
  ink: "#0d0e12"
  ink-2: "#2f323b"
  ink-3: "#5b5f6b"
  white: "#ffffff"
  mist: "#f4f5f7"
  mist-2: "#eceef2"
  quiet-panel: "#fbfbfc"
  line: "#e3e5ea"
  line-2: "#d4d7de"
  draft-stroke: "#9aa0ac"
  green: "#0f7a55"
  green-bg: "#e3f4ec"
  red: "#b42318"
  blue: "#2457e6"
  blue-text: "#1d47bf"
  blue-bg: "#e8eefd"
  grey-bg: "#eef0f3"
  d-panel: "#15171d"
  d-panel-2: "#1b1e25"
  d-line: "#2a2d36"
  d-text: "#eef0f4"
  d-mut: "#a3a8b4"
typography:
  display:
    fontFamily: "Mona Sans, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.75rem, 6.1vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 118"
  display-wide:
    fontFamily: "Mona Sans, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Mona Sans, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.25rem, 4.4vw, 4rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Mona Sans, ui-sans-serif, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 115"
  lede:
    fontFamily: "Mona Sans, ui-sans-serif, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'wdth' 100"
  body:
    fontFamily: "Mona Sans, ui-sans-serif, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'wdth' 100"
  ui:
    fontFamily: "Mona Sans, ui-sans-serif, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Mona Sans, ui-sans-serif, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.45
  figure-column:
    fontFamily: "Mona Sans, ui-sans-serif, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    fontFeature: "'tnum' 1"
  mono:
    fontFamily: "ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 400
rounded:
  xs: "4px"
  sm: "8px"
  md: "10px"
  r: "12px"
  lg: "14px"
  pill: "999px"
spacing:
  gut: "32px"
  gut-compact: "16px"
  wrap: "1200px"
  section: "128px"
  section-compact: "88px"
  head-to-content: "56px"
  column-gap: "48px"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 22px"
    height: "48px"
  button-gold-hover:
    backgroundColor: "{colors.gold-hover}"
    textColor: "{colors.ink}"
  button-gold-disabled:
    backgroundColor: "{colors.mist-2}"
    textColor: "{colors.ink-3}"
  button-gold-sm:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "9px"
    padding: "0 16px"
    height: "38px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "48px"
  chip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "34px"
  chip-pressed:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  ui-button:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "30px"
  ui-button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "30px"
  pill-green:
    backgroundColor: "{colors.green-bg}"
    textColor: "{colors.green}"
    rounded: "{rounded.pill}"
    padding: "0 8px"
    height: "22px"
  pill-blue:
    backgroundColor: "{colors.blue-bg}"
    textColor: "{colors.blue-text}"
    rounded: "{rounded.pill}"
    padding: "0 8px"
    height: "22px"
  pill-grey:
    backgroundColor: "{colors.grey-bg}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "0 8px"
    height: "22px"
  demo-tag:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink-3}"
    rounded: "{rounded.pill}"
    padding: "2px 7px"
  product-window:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  journal-entry:
    backgroundColor: "{colors.d-panel}"
    textColor: "{colors.d-text}"
    rounded: "{rounded.r}"
    padding: "14px 16px"
  journal-button:
    backgroundColor: "{colors.d-panel-2}"
    textColor: "{colors.d-text}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "34px"
  journal-button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "34px"
---

<!-- Scope: this file records the v1 home in site/ only. It is one of competing alternates (v2 lives in site-v2/ in a different world) and makes no claim on the project as a whole. Derived from the shipped site/styles.css, site/index.html and site/app.js at fcc4957. -->

# Design System: Ledgendary marketing home (v1)

## Overview

**Creative North Star: "The Product Is the Hero"**

A daylight SaaS page whose proof is working product UI. White and cool mist grounds carry near-black ink; one saturated gold is the only brand colour and it behaves like a highlighter: it fills, it rarely draws. Every section is built from the same product-window anatomy (1px hairlines, 10 to 14px corners, soft layered shadows, Lucide line icons at 1.75 stroke), so the page reads as one application seen from several angles rather than a marketing collage. The same demo job and the same figures recur in every window.

Type is one variable family, Mona Sans, used at two widths: wide, heavy and tight for display, normal width for everything a person reads. Density changes by register: marketing copy is generous (17px body, 1.55 leading, 120 to 128px section padding), the product windows are app-dense (13px, 1.45 leading, 30px controls). One chapter, the books, inverts to an ink ground with dark panels; everything else stays light.

Motion is narrative rather than decorative: rows rise in, a cursor moves and presses, a highlighter sweeps under a word, a gold flash marks the money landing, a journal line draws between entries. All of it collapses under reduced motion without hiding content.

**Key Characteristics:**
- One accent, gold, used as fill on light grounds; app semantics (green paid, blue selection, red error) live only inside product UI and form validation.
- Two type registers from one family: wide display (wdth 112 to 125, weight 800) and normal-width reading text (wdth 100).
- Product windows as the universal container, with labelled demo data.
- Flat light sections separated by mist bands and 1px hairlines; one ink chapter.
- Proportional figures by default; tabular figures only in columns.

## Colors

A cool neutral daylight palette with a single warm gold, plus app-semantic tints confined to product UI.

### Primary
- **Legendary Gold** (`gold`): the highlighter under one word per display heading, the primary button fill (ink text on it, never white), the Paid flash and amount chip, the journal chain dots and links, hash chips, the active marker in the playbook list, the text-selection colour, and the halo of the focus ring.
- **Gold Hover** (`gold-hover`): the lightened gold a gold button or journal gold button takes on hover.
- **Soft Gold** (`gold-soft`): a pale wash for secondary gold moments: the "recommended" tag, the kept-fields sweep in the privacy demo, the claimed row in the final window.

### Neutral
- **Ink** (`ink`): text, the ink chapter ground, ink UI buttons, chip and role selection borders, the focus outline.
- **Ink 2 / Ink 3** (`ink-2`, `ink-3`): secondary copy and ledes; muted labels, meta and inactive states.
- **White / Mist / Mist 2** (`white`, `mist`, `mist-2`): page ground; alternating section bands and app sidebars, note panels; disabled fills and neutral key chips.
- **Quiet Panel** (`quiet-panel`): the near-white of activity rails, idle bars and draft cards inside windows.
- **Line / Line 2** (`line`, `line-2`): 1px hairlines and window borders; control borders and stronger dividers.
- **Draft Stroke** (`draft-stroke`): the dashed border that marks something unconfirmed (private drafts, signature boxes).

### App semantics (inside product UI only)
- **Paid Green** (`green` on `green-bg`): paid, signed, done.
- **Selection Blue** (`blue`, `blue-text` on `blue-bg`): chosen option, viewing mode, demo cursor, caret.
- **Error Red** (`red`): invalid waitlist field and its message, nothing else.
- **Neutral Grey** (`grey-bg`): neutral status pills and activity icons.

### The ink chapter
- **Dark panels** (`d-panel`, `d-panel-2`) on the `ink` ground, separated by `d-line`, with `d-text` and `d-mut` for type. Used only for the books section and the docked books bar and mini journal lines inside the light windows.

### Named Rules
**The Highlighter Rule.** On light grounds gold is a fill (highlighter, button, chip, flash, dot), never a text or line colour: gold text on white is illegible. On the ink chapter gold may also colour a few marks (the chain line, fact icons, a refusal's key phrase) because there it is legible.

**The Semantics Stay Inside Rule.** Green, blue and grey tints appear only inside product windows; red appears only for form validation. Marketing copy, headings and page chrome use ink, mist and gold alone.

## Typography

**Display Font:** Mona Sans variable (with ui-sans-serif, sans-serif), self-hosted, wdth 75 to 125, weight 200 to 900
**Body Font:** Mona Sans at wdth 100
**Label/Mono Font:** ui-monospace, SF Mono, Menlo for hashes only

**Character:** One grotesque stretched wide and set heavy for statements, held at normal width for reading; the contrast is width, not family.

### Hierarchy
- **Display** (800, wdth 118, `display` clamp, 0.98, -0.035em, balanced): the hero headline, about 13.5ch wide.
- **Display wide** (800, wdth 125, `display-wide` clamp, 0.9, -0.04em): the closing call and the feature index title; the widest setting on the page.
- **Headline** (800, wdth 118, `headline` clamp, max 18ch): section headings.
- **Title** (800, wdth 115, 1.75rem, -0.025em): story step headings; the same wide-heavy recipe at 1.25rem labels the size tiers and at 1.375rem the playbook items.
- **Lede** (400, 1.1875rem section / 1.25rem hero, 1.5 to 1.55, ink-2, max 44 to 58ch, pretty wrap).
- **Body** (400, 17px, 16px under 860px, 1.55).
- **UI** (13px, 1.45) inside product windows, with document titles at 20px/700/wdth 108 and money totals at 18 to 22px/750.
- **Label** (600, 12px, ink-3, sentence case): table headers, field labels, sidebar group heads. No uppercase or tracked labels exist in the build.

### Named Rules
**The Width Is the Voice Rule.** Hierarchy comes from width plus weight (wdth 112 to 125 at 800) on display, and only display; reading text stays at wdth 100.

**The Columns Get Tabular Rule.** Figures default to proportional lining (`pnum`, `lnum`). Tabular figures (`tnum`) apply only where numbers stand in columns: table cells, totals, journal amounts, timesheet cells. Mona Sans's tabular zero is dotted with no plain alternate, so it is kept out of prose and headline figures.

## Layout

Single centered container of 1200px plus a 32px gutter each side (16px under 860px). Sections stack full width with 128px vertical padding (88px under 860px; the story band is 120/80). Section heads sit 56px above their content; two-column section grids use 48 to 64px gaps with asymmetric fractions (7fr/4fr story, 1.35fr/1fr books, 1.25fr/1fr playbook) rather than equal halves. Alternate sections take the mist band with a 1px top hairline.

The hero is left-aligned: headline, then a two-column row of lede and inline waitlist form (field and gold button side by side), then a full-width product window 640px tall with demo controls beneath.

Two sticky patterns carry the interaction: the story window pins beside scrolling step text (top max(88px, 50vh - 240px)) and morphs between screens; the playbook preview pins at 100px beside its list.

Breakpoints: 1320px narrows the hero window's rails; 1100px drops its sidebar; 860px collapses every grid to one column, stacks the form, hides nav links, inlines a window into each story step, and turns chip and role rows into horizontal scrollers.

## Elevation & Depth

Mostly flat: sections are separated by tone (white, mist, ink) and hairlines. Elevation is reserved for product windows and the one sheet or card that sits above them, and it is always soft, layered and ink-tinted. There are no hard offset shadows.

### Shadow Vocabulary
- **Window** (`box-shadow: 0 1px 2px rgba(13,14,18,0.06), 0 12px 32px -8px rgba(13,14,18,0.14), 0 40px 80px -24px rgba(13,14,18,0.18)`): every product window.
- **Pop** (`box-shadow: 0 2px 4px rgba(13,14,18,0.06), 0 16px 36px -10px rgba(13,14,18,0.22)`): a surface above a window (the client sheet, the derived calendar draft).
- **Gold bevel** (`inset 0 -2px 0 rgba(13,14,18,0.12), 0 1px 2px rgba(13,14,18,0.1)`; hover adds `0 6px 16px -6px rgba(176,124,0,0.55)`): the gold button only.
- **Current item** (`0 1px 2px rgba(13,14,18,0.08), 0 0 0 1px line`): the active sidebar or rail item, lifted white on mist.

### Named Rules
**The Windows Float, Sections Don't Rule.** Shadows belong to product UI. Section bands, headings and copy never cast one.

## Shapes

Gently rounded, app-native corners on a fixed ladder: 4px (hash chips, checkboxes), 8px (UI buttons, sidebar items), 10px (marketing button, input, option cards, note panels), 12px (sheets, journal entries, calendar cards), 14px (windows, P&L panel), and full pills for chips, status pills and tags. Borders are 1px hairlines; dashed `draft-stroke` borders mean unconfirmed. Circles are reserved for avatars, the play control and chain dots. The highlighter keeps a 2px corner.

## Components

### Buttons
- **Shape:** gently rounded (10px; 9px small).
- **Primary (gold):** gold fill, ink text, 48px high (38px in the nav), weight 650 at wdth 105, gold bevel. Always labelled plainly ("Join the waitlist").
- **Hover / Focus / Active:** lightens to `gold-hover` with a warm under-glow; presses 1px down; focus is the global ring (2px ink outline plus 5px gold halo).
- **Disabled:** mist-2 fill, ink-3 text, no shadow.
- **In-product buttons:** 30px, 8px corners, white with line-2 border or ink fill; a scripted press scales to 0.95. On the ink chapter, journal buttons are 34px on `d-panel-2` with a gold variant and a ghost variant.

### Chips
- **Style:** 34px pills, white with line-2 border, ink-2 text at 600.
- **State:** pressed takes an ink border and ink text; a 2px ink progress bar fills along the bottom as the demo scene plays. Role tabs are the larger cousin: 12px corners, avatar plus two-line label, selected with an ink 1px ring.

### Cards / Containers
- **Product window:** white, 1px line border, 14px corners, window shadow, 13px UI type; a 46px top bar with breadcrumbs, a pill "Demo data" tag and avatars.
- **Note panels:** mist fill, 9 to 10px corners, no border (notes, totals strips, unbilled summaries).
- **State cards:** green-bg for paid and signed; blue border with 3px blue halo for the chosen option; dashed draft-stroke for private drafts.

### Inputs / Fields
- **Style:** 48px, white, 1px line-2 border, 10px corners, 16px padding.
- **Focus:** ink border plus 4px gold halo. **Error:** red border, red halo, red message below. Success replaces the field row with an ink line led by a gold check disc, holding the same height.

### Navigation
- **Style:** sticky 64px bar, 86% white with blur and saturate, wordmark at 800/wdth 116, links 15px/520 ink-2 to ink on hover, small gold button right. Gains a hairline once scrolled and turns ink (86% ink, d-mut links, gold focus) over the books chapter. Under 860px links hide and only wordmark and button remain.

### Status pills
- 22px pills at 12px/600: green paid, blue sent/viewing, grey neutral.

### Journal chain (signature)
- Dark entries (`d-panel`, 12px corners, d-line border) stacked with a gold dot per entry and a 2px gold line drawn between them; each entry shows lines with tabular amounts and a mono hash chip. An edit attempt shakes the target and opens a refusal panel (warm dark `#241d10` with gold key phrase); a reversal posts a new entry rather than changing the old one.

### Highlighter (signature)
- A gold band at 42% height behind one word of a display heading, sweeping in from 0% over 900ms. One per heading, on the payoff word.

## Do's and Don'ts

### Do:
- **Do** use gold as a fill on light grounds: one highlighter word per display heading, the primary button, the money-landed moment.
- **Do** put every product claim inside a product window with the "Demo data" tag and the same job's figures.
- **Do** set display at 800 weight, wdth 112 to 125, negative tracking (-0.025 to -0.04em); keep reading text at wdth 100.
- **Do** apply tabular figures only in columns of numbers.
- **Do** keep the focus ring as 2px ink outline with gold halo on light, gold outline on the ink chapter.
- **Do** use soft layered ink-tinted shadows for windows and popped surfaces only.
- **Do** make every motion beat collapse under reduced motion with its content fully visible.

### Don't:
- **Don't** set gold text or gold lines on white or mist.
- **Don't** use green, blue or grey tints outside product UI, or red outside validation.
- **Don't** put white text on gold.
- **Don't** use hard offset shadows or shadows on section bands.
- **Don't** add uppercase tracked labels or eyebrows above headings; the build has none.
- **Don't** use tabular figures in prose or headline figures (the dotted zero).
