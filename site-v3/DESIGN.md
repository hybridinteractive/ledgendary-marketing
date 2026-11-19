---
name: Ledgendary marketing home (v3, site-v3/)
description: An evening-lit product canvas where scroll is time; the visitor scrubs one job from Oct 27 to Nov 18 and reads the books as of any day.
colors:
  ground: "#0e1613"
  inset: "#121b17"
  panel: "#16211c"
  panel-2: "#1b2822"
  line: "#24332c"
  line-2: "#33463d"
  text: "#f3efe6"
  text-2: "#d3d6cd"
  mut: "#a9b8b0"
  mut-2: "#8a9c93"
  coral: "#ff6b4a"
  coral-hi: "#ff825f"
  ink: "#0e1613"
  mint: "#9fdcb9"
  mint-bg: "rgba(159, 220, 185, .12)"
  err: "#ffb4a3"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7.2vw, 6rem)"
    fontWeight: 760
    lineHeight: 0.92
    letterSpacing: "-0.022em"
    fontVariation: "'wdth' 82"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.2vw, 4.5rem)"
    fontWeight: 760
    lineHeight: 0.94
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 75"
  date-numeral:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 4.6vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 0.86
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 75"
  figure:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 760
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 75"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.125rem"
    fontWeight: 740
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 80"
  doc-title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  ui:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.45
  button:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 650
  label:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 600
rounded:
  tag: "6px"
  control: "7px"
  sm: "8px"
  md: "10px"
  r: "12px"
  r-lg: "16px"
  pill: "999px"
spacing:
  nav: "64px"
  gutter: "clamp(16px, 4vw, 64px)"
  wrap: "1312px"
  section: "clamp(88px, 12vw, 160px)"
  head-to-content: "48px"
  column-gap: "64px"
  pane-inset: "22px"
components:
  button-coral:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 22px"
    height: "52px"
    typography: "{typography.button}"
  button-coral-hover:
    backgroundColor: "{colors.coral-hi}"
    textColor: "{colors.ink}"
  button-coral-disabled:
    backgroundColor: "{colors.panel-2}"
    textColor: "{colors.mut}"
  button-coral-sm:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "38px"
  button-ghost:
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "0 22px"
  button-ghost-hover:
    backgroundColor: "{colors.panel-2}"
  button-ui:
    backgroundColor: "{colors.panel-2}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "6px 10px"
    height: "30px"
  button-ui-pressed:
    backgroundColor: "{colors.text}"
    textColor: "{colors.ink}"
  button-ui-done:
    backgroundColor: "{colors.mint-bg}"
    textColor: "{colors.mint}"
  waitlist-input:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "52px"
  pill:
    backgroundColor: "{colors.panel-2}"
    textColor: "{colors.text-2}"
    rounded: "{rounded.pill}"
    padding: "0 10px"
    height: "26px"
  pill-ok:
    backgroundColor: "{colors.mint-bg}"
    textColor: "{colors.mint}"
    rounded: "{rounded.pill}"
  pill-paid:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  demo-tag:
    textColor: "{colors.mut}"
    rounded: "{rounded.pill}"
    padding: "0 8px"
    height: "22px"
  event-chip:
    textColor: "{colors.mut-2}"
    rounded: "{rounded.control}"
    padding: "0 9px"
    height: "26px"
  event-chip-past:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
  event-chip-paid:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.ink}"
  product-frame:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.r-lg}"
  inset-panel:
    backgroundColor: "{colors.inset}"
    textColor: "{colors.text}"
    rounded: "{rounded.r}"
    padding: "14px 16px"
  journal-entry:
    backgroundColor: "{colors.inset}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
  seat-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.r-lg}"
    padding: "16px"
---

<!-- Scope: this file records the v3 look in site-v3/ only: the home (index.html) and the three audience pages (solo.html, team.html, enterprise.html). It is one of competing alternates (v1 lives in site/, v2 in site-v2/, each in its own world) and makes no claim on the project as a whole. Derived from the shipped site-v3/styles.css, site-v3/audiences.css, the four HTML pages, site-v3/app.js and site-v3/audiences.js at 5a2fceb (audience pages after their review rounds). audiences.css loads after styles.css and extends it; its review blocks are scoped to the audience pages (`.aud`) and win over earlier declarations. The stylesheet layers a finish-round block over earlier declarations; every value here is the final cascaded one. Where the direction contract (.impeccable/surfaces/site-v3-index-html.md) and the build diverge, the build is recorded and the divergence noted. -->

# Design System: Ledgendary marketing home (v3)

## Overview

**Creative North Star: "Scroll Is Time"**

One evening, one ground. A deep green-black field runs edge to edge under every chapter; there are no light sections. The product is drawn in its own dark theme on that field: tonal steps of the same green (inset, panel, raised panel) separated by crisp 1px lines, with no glow, no neon edge and no glass. Warm off-white carries the text. One accent, signal coral, marks two things only: *now* (the scrubber, the current-date marker, today's column, the as-of thumb) and *settled* (Paid, the received figure, the primary button). Ink sits on coral, always.

The page is a date. The first chapter pins a product canvas under a horizontal rail from Oct 27 to Nov 18, and the canvas state is a pure function of that date: proposal, portal, timesheet and invoice panes swap as scroll moves the marker, the activity column fills, the tally and the received figure follow. A large light date numeral in the hero is the image; it settles into the chapter's readout as the stage pins. Later chapters repeat the idea at smaller scale: five seats read on Nov 18, a books window with its own date control reconstructs receivables, P&L and the journal as of any day, and the closing call ends on a rested rail at Nov 18, paid.

Type is one variable family, Bricolage Grotesque, used on its width axis: statements condensed (75 to 82%) and heavy (740 to 760), dates condensed and light (300), everything read at full width and 400 to 650. Numbers in columns and money are tabular.

The audience pages (solo, team, enterprise) carry the same idea per audience: each hero pins its own rail over any number of days (enterprise jumps nine years to 2036 across a hatched gap) with a product frame whose panes follow the date, then feature sections in which a copy column sits beside one window, a seat switcher, an as-of scrubber over a month, and a comparison table. Inside every audience window the content is rows and plain blocks under hairlines, never boxes inside the box.

**Key Characteristics:**
- Evening ground everywhere; depth from tonal steps of one green and 1px inset lines, not from light sections or glow.
- Coral is now and paid: the scrubbers, today, Paid, the received figure and the primary button. Ink on coral.
- Mint is a quiet second signal for done (signed, approved, success), as text or a 12% tint, never a fill under text.
- Refusal salmon (`err`) is the product's no: text and icons only.
- Bricolage Grotesque on its width axis: condensed heavy statements, condensed light dates, full-width text.
- Every product surface carries "Demo data" and the same job: Lumen Studio, Northwind Co, P-0018, INV-0042, $42,000.

## Colors

A single green-black hue stepped into grounds and lines, warm off-white for reading, one coral signal and one mint confirmation.

### Primary
- **Signal Coral** (`coral`): the scrubber fill, knob and 2px marker; the as-of thumb; the today bar over the timesheet column; the Paid pill, paid event chip, paid tally cell, paid total row and paid activity icon; the received figure as it fills on Nov 18; the primary button; text selection, the caret and the skip link. Always carries `ink` text.
- **Coral Hi** (`coral-hi`): the coral button's hover only.

### Secondary
- **Done Mint** (`mint` on `mint-bg`): signed, approved and on-track states inside product surfaces (done tool button, ok pill, job dot, success check in the waitlist message, trial-balance total, the "who sees it" yes row). Text or a 12% tint; a solid mint fill appears only on marks with no text on them (job dots, switch knobs, the twelve-week streak cells), never under text.

### Neutral
- **Evening Ground** (`ground`): every section ground, the nav, the browser chrome colour. `ink` is the same value used as text on coral and off-white.
- **Inset** (`inset`): sunk regions inside product frames: the app sidebar and activity column, panels, journal entries, payment strip, the as-of bar, signature field.
- **Panel / Panel 2** (`panel`, `panel-2`): the product frame body, seat and calendar cards, the waitlist input; raised selections, tool buttons, the owner seat, the chosen portal option.
- **Line / Line 2** (`line`, `line-2`): 1px hairlines between rows and around frames; control rings, ghost button ring, demo tag ring, the rail's day ticks.
- **Warm Off-white** (`text`): headings and primary text; the focus outline; small selected-state fills only (pressed tool button, recommended option letter, workspace mark, chosen radio, the hours bar).
- **Text 2** (`text-2`): nav links, secondary emphasis, the resting date numeral.
- **Muted / Muted 2** (`mut`, `mut-2`): ledes, meta, labels, captions; inactive and future states (future event chips, zero figures, placeholders, struck calendar fields).
- **Refusal Salmon** (`err`): what the system said no to. The invalid waitlist field's 2px ring and message; on audience pages the refusal heading icon, the "Refused" status text and icons of refused checks, a refused locked-week message icon, and the heading of a failed anchor check.

### Named Rules
**The Evening Ground Rule.** Every section sits on `ground`. Surfaces step up through `inset`, `panel` and `panel-2`; off-white is never a surface or section ground, only text and fills no larger than a chip or a progress bar.

**The Salmon Says No Rule.** A refusal or an invalid entry is told in `err`, as text, an icon or a 2px ring, on a calm `panel-2` or ground; never as a fill, never as a border on a row, and never for anything that is merely pending or overdue. Coral says paid, mint says done, salmon says refused.

**The Coral Is Now and Paid Rule.** Coral marks the current date and settled money, plus the one primary action. It is a fill carrying `ink`, or the scrubber's own marker and fill line; never coral text on the dark ground and never a decorative coral border.

## Typography

**Display Font:** Bricolage Grotesque variable (with ui-sans-serif, system-ui), self-hosted, weight 200 to 800, width 75 to 100%, optical sizing auto
**Body Font:** the same family at 100% width

**Character:** A quirky grotesque squeezed narrow and heavy for statements, narrow and thin for dates, and let out to full width and calm weights for reading; one family carries the whole voice.

### Hierarchy
- **Display** (760, `display` clamp, 0.92, 82% width, balanced, 15ch): the hero headline only. 3.25rem on phones.
- **Headline** (760, `headline` clamp, 0.94, 75% width, balanced): section headings; the closing "Suit up." runs larger at clamp(3rem, 7vw, 5.5rem). 2.6rem on phones.
- **Date numeral** (300, `date-numeral` clamp, 0.86, 75% width, `text-2`): the scrubbed chapter's date readout. Above the pinned stage it scales up to 1.3x (1.25x under 1400px), about 86px at 1440px, so it stays under the H1; it settles to 1x as the stage pins. No scaling at 720px and below, where it is 2rem.
- **Figure** (760, 3.5rem, 75% width, tabular): the received figure that fills coral on Nov 18; the rest row's date (2rem) and the timesheet totals (26px, 85% width) follow the same condensed recipe.
- **Title** (740, 2.125rem, 80% width): the chapter's story line and the playbook preview name (2rem).
- **Document title** (700, 21px, -0.01em): titles inside product frames and caption titles. 17px on phones inside frames.
- **Lede** (400, 18px, 1.55, `mut`, 46 to 60ch, pretty wrap). 16 to 16.5px on phones.
- **Body** (400, 17px, 1.55). 16px on phones.
- **UI** (13 to 14.5px inside frames, 1.45); tool buttons 13px/550; buttons 16px/650 (14px small).
- **Label** (550 to 600, 12 to 12.5px, `mut`, sentence case): table heads, panel heads, sidebar groups, demo tags.
- **Signature** (300, 24px, 75% width): the recorded signature, wiped in left to right.

### Named Rules
**The Heavy Statement, Light Date Rule.** Statements are condensed (75 to 82%) at 740 to 760 with negative tracking; dates and signatures are condensed at 300; everything read or clicked is full width at 400 to 650 with no tracking.

**The Tabular Columns Rule.** Figures in columns, totals, tallies, money and rail dates carry `tabular-nums`; running copy does not.

## Layout

One centred container of 1312px with a fluid gutter (clamp 16 to 64px) under a sticky 64px nav (56px on phones) that gains a `line` bottom border once scrolled. Sections open with clamp(88px, 12vw, 160px) top padding and a head 48px above their content. Section heads vary by chapter: two columns (heading left, lede right, bottom-aligned, 64px gap) for the books, stacked for seats, centred for the playbook.

The hero is a grid: headline left, a 440px column with lede and waitlist right, bottom-aligned. Below it the story stage pins under the nav for the chapter's scroll length: a 300px left column (date readout over title, caption, received figure, hint) beside the rail, and the product frame (184px sidebar, flexible main, 236px activity) beneath the rail, capped at 580px tall. Scroll speed is weighted per day so the wait between Sent and Paid scrolls slowest.

Audience heroes reuse the stage with a rail over any number of days; a skipped stretch is one hatched day-width band (135deg 14% `mut` stripes) with its label in `mut-2`. Feature sections are a split of copy (5fr) beside one window (7fr) at 64px, alternating sides, or a duo or trio of windows at 16px.

Breakpoints: 1360px collapses the app sidebar to a 56px icon rail, narrows the stage column to 260px and shortens event chip labels; 1100px drops the activity column and stacks the hero, section heads, books grid and closing call; 720px un-pins the frame into flowing screens, hides rail chips and intermediate dates, inlines captions, hides the received figure and tally, and stacks every grid. On audience pages 720px also hides the nav links (the footer carries them, with the current page in off-white), reduces breadcrumbs to the current item, and stacks money tables (below).

**The Money Column Stays Rule.** On a phone a table holding money never drops a column: each row becomes a wrapped line with the name left and the amount right, the amount labelled from its column head, and the remaining columns as small `mut` meta prefixed with their own label. A non-money column (a date, a team) may be hidden; a figure may not.

## Elevation & Depth

Flat by tone. Depth is the green stepping up from `ground` through `inset`, `panel` and `panel-2`, outlined by 1px inset rings (`box-shadow: inset 0 0 0 1px`) rather than borders. Only product windows cast a shadow: the pinned product frame and every standalone window (the home's books and playbook, each feature window on the audience pages), each a single soft, deep, negatively spread drop. Coral controls on the rail are separated from the ground by a ground-coloured ring, not a glow. Nothing glows, nothing is frosted, nothing has a hard offset shadow.

### Shadow Vocabulary
- **Frame** (`box-shadow: inset 0 0 0 1px #24332c, 0 30px 60px -24px rgba(0, 0, 0, .7)`): the pinned product frame.
- **Window** (`box-shadow: inset 0 0 0 1px #24332c, 0 30px 60px -30px rgba(0, 0, 0, .6)`): every standalone window.
- **Ring** (`box-shadow: inset 0 0 0 1px` in `line` or `line-2`): every card, control, chip and tag.
- **Knob** (`box-shadow: 0 0 0 4px #0e1613, 0 2px 8px rgba(0, 0, 0, .5)`): the scrubber knob; the as-of thumb and the rest marker use the ring without the drop.

### Named Rules
**The Lines, Not Lifts Rule.** Containers are separated by tone and a 1px inset ring. A cast shadow belongs only to product windows; everything inside them and the sections around them stay flat.

**The Rows, Not Boxes Rule.** Inside an audience-page window nothing is boxed: panels, journal entries, chain rows, payment strips, messages, stamps and outcome blocks lose their fill, ring and radius and become rows under a 1px `line` top hairline. Rings stay only on controls (tool buttons, option tabs, the seat switcher trough, the URL bar, reaction pills). A not-yet row is a hairline row with a `mut-2` note, not a dashed box.

## Shapes

Small app-native corners on a short ladder: 5 to 6px for hash chips, option letters, tally cells, the workspace mark and as-of cells; 7px for tool buttons, event chips and sidebar items; 8px for small buttons, list rows and the rail hit area; 9 to 10px for buttons, inputs, payment strip, journal entries, portal options and the received figure; 12px for inset panels; 16px for product frames, cards and windows (14px on phones); full pills for status pills, demo tags and inline tags. Circles are for avatars, the rail knob, event dots, seat dots and radios. Dashed 1px `line-2` means "not yet": an unposted journal slot or an empty journal.

## Components

### Buttons
- **Shape:** gently rounded (10px), 52px tall, 650 at 16px; small variant 38px, 8px, 14px.
- **Primary (coral):** coral fill, ink text, labelled plainly ("Join the waitlist"). Hover `coral-hi`; active presses 1px down; disabled takes `panel-2` with `mut` text.
- **Ghost:** transparent with a 1px `line-2` inset ring; hover fills `panel-2`. Used for the reduced-motion Earlier / Later stepper.
- **Tool button (in frames):** 30px, 7px, `panel-2` with a `line-2` ring, 13px/550 with a 14px icon; hover darkens to a slightly lighter green; pressed inverts to off-white with ink; done takes the mint tint; off is transparent `mut-2`.

### Chips
- **Status pill:** 26px pill, 12.5px/600 with a 13px icon; neutral on `panel-2`, draft in `mut`, ok in mint tint, paid coral with ink.
- **Event chip (rail):** 26px, 7px, a `line` ring and `mut-2` text while the event is ahead; once the date passes it lifts to `panel` with a `line-2` ring and off-white text; Paid turns coral.
- **Demo tag:** 22px ring-only pill, 11.5px/550 `mut`, right-aligned in every frame bar and card head.

### Cards / Containers
- **Product frame:** `panel`, 16px, frame shadow; `inset` sidebar and activity column divided by 1px lines; a 50px bar with breadcrumb and demo tag; panes 20 to 22px inset with 16px gaps.
- **Inset panel:** `inset`, 12px, `line` ring, 14 to 16px padding, a 12.5px/600 muted head with a 14px icon.
- **Seat card:** `panel`, 16px, `line` ring, 16px padding; the owner seat steps up to `panel-2` with a `line-2` ring; a hairline footnote closes each card.

### Inputs / Fields
- **Waitlist field:** 52px, 10px, `panel` with a `line-2` ring beside a 176px-minimum coral button; hover strengthens the ring; focus a 2px off-white ring; invalid a 2px `err` ring with an `err` message. Success replaces the hint with "Challenge accepted. You're on the list." beside a mint check.
- **Signature field:** `inset`, 9px, `line-2` ring; the name wipes in left to right (clip-path, 700ms).

### Navigation
- Audience pages carry Home, Solo, Team, Enterprise; the current page (`aria-current`) is off-white with a 2px underline at a 0.4em offset, in the nav and the footer.
- Sticky, on `ground`, gaining a `line` border on scroll. Brand mark (a short off-white rule crossed by a coral tick) and a 750 wordmark at 85% width; three links in `text-2` that turn off-white and underline on hover; small coral button pushed right. Links hide at 720px. The footer repeats the brand over a `line` top border with `mut` links.

### Focus
- 2px solid off-white outline, 3px offset, 6px radius, everywhere. The rail and as-of control take a 2px offset. Inputs replace the outline with a 2px inset off-white ring.

### Date rail (signature)
- A 6px `line` track with day ticks every 1/23, coral fill scaled to the date, a 2px coral marker and an 18px coral knob ringed in `ground`, event dots, event chips above and dates below in tabular `mut`. A faint 8% band marks the hours stretch. Drag, keys or scroll set the date; while the invoice waits (Nov 17 to Nov 18) the knob breathes a coral halo on a 1.6s loop. The readout to its left shows the weekday and the light date numeral.

### As-of control (signature)
- In the books window's inset bar: 23 cells drawn as one gradient strip with 2px gaps, filled in a mid green up to the latest posted day, and a coral cell-wide thumb ringed in `inset`. Quick tool buttons jump to Nov 6, 17 and 18. Aging, P&L and the journal below re-derive for that day; journal entries land with a short rise.

### Seat switcher
- A tablist trough (`inset`, 14px, `line` ring, 6px padding) of five (or four) equal tabs, each a 30px avatar with the name at 600 and the seat in 12px; the selected tab steps up to `panel-2` with a `line-2` ring. The window under it re-renders for that seat and states what the seat cannot do in plain words. Under 1100px the seat line drops; on phones each tab stacks avatar over name, and the four-seat version goes two by two.

### As-of scrubber (audience pages)
- The home's as-of control over a month or any number of days: equal cells with 2px `inset` gaps in mid green (#43594e), a coral thumb one cell wide ringed in `inset`, dates beneath in `mut`, and quick tool buttons whose pressed state inverts to off-white. Receivables, cash lines and the latest posted entry re-derive for the chosen day.

### Refusal block
- A row set headed by an `err` icon and an off-white heading ("Three layers, three refusals"), each layer a hairline row with an icon, a bold name, the reason and "Refused" in `err` on the right; below it, plain rows saying what is unchanged, and a muted note naming the way out.

### Step-up
- Inside the window, below the amount: a 15px/650 heading with a key icon, one muted line, and password / passkey / code as tool buttons; confirmed, the heading turns mint and a hairline stamp records who confirmed and how.

### Journal entry
- `inset`, 10px, `line` ring, 12 to 14px padding; a 650 entry id, a `hash` chip (`panel-2`, `line-2` ring, 5px, tabular) and tabular debit and credit lines; a chain row under a hairline. Unposted slots are a dashed `line-2` outline with a `mut-2` note on the home; inside audience windows the entry is a hairline row (The Rows, Not Boxes Rule).

### Motion
- One easing, `cubic-bezier(.16, 1, .3, 1)`. Hover and press 150ms; state colour 250 to 350ms; captions, panes, entries and activity rows land in 320 to 500ms with a 6 to 8px rise; the signature wipes in 700ms. Reduced motion un-pins the stage, shows the Earlier / Later stepper and drops every duration to near zero; without JavaScript the panes stack as dated static screens.

## Do's and Don'ts

### Do:
- **Do** keep every section on the evening ground and build depth from `inset`, `panel`, `panel-2` and 1px inset rings.
- **Do** use coral for the current date and for settled money, plus the one primary button, always with ink text on it.
- **Do** use mint as text or a 12% tint for signed, approved and success states.
- **Do** set statements condensed and heavy and dates condensed and light in Bricolage Grotesque; keep reading text at full width.
- **Do** set figures in columns, totals and money in tabular numerals.
- **Do** make product state a function of the date, and give it a finished static form under reduced motion and without JavaScript.
- **Do** tag every product surface "Demo data" and keep the one job's names and figures.
- **Do** tell a refusal in `err` text and icons, and keep everything inside an audience window as hairline rows.
- **Do** stack money tables on phones so every figure keeps its column and its label.

### Don't:
- **Don't** add a light section, or use off-white as a surface or section ground.
- **Don't** set coral text on the dark ground or use coral as a decorative border; its lines belong to the scrubbers.
- **Don't** add glow, neon edges, glass or hard offset shadows; cast shadows stay on the three product windows.
- **Don't** add uppercase tracked labels or eyebrows above headings; labels are sentence case.
- **Don't** let the hero's date numeral scale past 1.3x or compete with the H1.
- **Don't** use a wink in a primary button label.
- **Don't** fill or box a refusal, or use `err` for pending or overdue.
- **Don't** drop a money column on a phone.
