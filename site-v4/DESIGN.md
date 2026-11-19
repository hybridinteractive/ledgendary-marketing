---
name: Ledgendary audience pages (v4 "Episodes", site-v4/)
description: Every feature is an episode; a type-led title card on a soft colour field, then the product doing it, live, on white.
colors:
  ground: "#ffffff"
  ink: "#121212"
  ink-2: "#333333"
  muted: "#4a4a4a"
  hair: "#e4e4e4"
  hair-2: "#f2f2f2"
  wash: "#f7f7f5"
  mint: "#b8f0d4"
  sky: "#bfe2ff"
  peach: "#ffd0b5"
  lilac: "#dacbff"
  mint-soft: "#e6faf0"
  sky-soft: "#e8f4ff"
  peach-soft: "#fff0e7"
  lilac-soft: "#f1ebff"
  tomato: "#ff4a1c"
  placeholder: "#6b6b6b"
typography:
  display:
    fontFamily: "Gabarito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 7.4vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  title-card-big:
    fontFamily: "Gabarito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 5.5rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.045em"
  title-card:
    fontFamily: "Gabarito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 4.1vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  episode-code:
    fontFamily: "Gabarito, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 500
    letterSpacing: "-0.02em"
    fontFeature: "'tnum' 1"
  headline:
    fontFamily: "Gabarito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.4vw, 3.75rem)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  lede:
    fontFamily: "Gabarito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.5
  wink:
    fontFamily: "Gabarito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.55
  body:
    fontFamily: "Gabarito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  figure:
    fontFamily: "Gabarito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.03em"
    fontFeature: "'tnum' 1"
  window-title:
    fontFamily: "Gabarito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  ui:
    fontFamily: "Gabarito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  button:
    fontFamily: "Gabarito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 800
    letterSpacing: "-0.005em"
  label:
    fontFamily: "Gabarito, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
rounded:
  tile: "6px"
  sm: "8px"
  control: "9px"
  md: "10px"
  lg: "12px"
  frame: "16px"
  win: "18px"
  field: "32px"
  field-phone: "24px"
  pill: "999px"
spacing:
  nav: "72px"
  gutter: "32px"
  gutter-phone: "16px"
  wrap: "1312px"
  index-column: "228px"
  season-gap: "48px"
  episode-gap: "28px"
  episode-inset: "52px 52px 44px"
  title-to-demo: "34px"
  win-inset: "20px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.tomato}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
    typography: "{typography.button}"
  button-primary-sm:
    backgroundColor: "{colors.tomato}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "40px"
  button-primary-disabled:
    backgroundColor: "{colors.hair-2}"
    textColor: "{colors.ink}"
  icon-button:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "40px"
  icon-button-hover:
    backgroundColor: "{colors.hair-2}"
  waitlist-field:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px"
  nav-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  nav-link-hover:
    backgroundColor: "{colors.hair-2}"
  nav-link-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
  beat:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 14px 0 6px"
    height: "36px"
  beat-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
  chip:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "2px 9px"
    typography: "{typography.label}"
  chip-paid:
    backgroundColor: "{colors.tomato}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  chip-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
  demo-tag:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "2px 9px"
  episode-field:
    backgroundColor: "{colors.peach}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "52px 52px 44px"
  product-window:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.win}"
  window-sidebar:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink-2}"
    width: "188px"
  recap-frame:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.frame}"
    padding: "14px 14px 16px"
  note:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  note-refusal:
    backgroundColor: "{colors.peach-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  window-control:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "6px 12px"
  window-control-go:
    backgroundColor: "{colors.tomato}"
    textColor: "{colors.ink}"
  paid-stamp:
    backgroundColor: "{colors.tomato}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "6px 16px 6px 12px"
  index-pin:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    width: "32px"
    height: "26px"
  index-pin-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
---

<!-- Scope: this file records look v4 "Episodes" in site-v4/ only (index.html, solo.html, team.html, enterprise.html, styles.css, app.js, fonts/). It is one of several competing alternates (site/, site-v2/, site-v3/ and others each hold their own world) and makes no claim on the project as a whole. Derived from the shipped build as finished on 2026-11-19 after the finish review and two fix rounds. The stylesheet appends late override blocks (the finale's layout, frame labels); every value here is the final cascaded one. Where the direction contract (.impeccable/brief-look-v4.md) and the build diverge, the build is recorded and the divergence noted. -->

# Design System: Ledgendary audience pages (v4 "Episodes")

## Overview

**Creative North Star: "The Season Guide"**

A white page that reads like a season of a sitcom, told in type and product. Every signature feature is an episode: a soft colour field with large rounded corners carrying a heavy, tight title card ("S01E04 · The Late Fee Incident") and, beneath it, a white product window outlined in ink that plays the feature in beats. The episode code sits on the same heading line as the title at a lighter weight, so the title card is one statement rather than a label over a heading. There is no TV imagery anywhere: no screens, no remotes, no frames styled as television. The streaming-title craft lives entirely in type and timing.

Four pastel fields carry meaning, not decoration: peach for proposals and clients, sky for time and people, mint for getting paid, lilac for the books and trust. They tint the episode fields, the index pins once seen, avatars, chips and the soft notes inside windows. One hot colour, tomato, is reserved for the action and for Paid, and it always carries ink text. Ink (near-black) draws everything structural at 1.5px: window outlines, chip rings, the window bar's rule, table head rules, the nav's scrolled rule.

The hero opens on white with a huge two-line audience headline, a subline, the waitlist field and a quiet "Season 1 · 8 episodes" line, then a "Previously on…" strip of five live frames that autoplay with a segmented progress bar and pause. On desktop a sticky season index runs beside the episodes, tracking progress and jumping between them. The page closes on a "No handoffs" special and a finale box that repeats the waitlist beside a recap of the season.

**Key Characteristics:**
- White ground; colour arrives as large rounded episode fields, one role per field.
- Ink at 1.5px draws every outline; product windows are white, ink-outlined and softly lifted.
- Tomato only for the action and Paid, always under ink text.
- Gabarito alone, 400 to 900; display at 900 and tight, the episode code at 500 on the same line.
- Every product surface carries a dashed "Demo data" tag and plays its feature in numbered beats.

## Colors

White ground and ink line, four soft fields with fixed roles, their paler "soft" twins for notes inside windows, and one hot accent.

### Primary
- **Tomato** (`tomato`): the primary button (Join the waitlist, nav and form), the Paid chip, the rotated Paid stamp, the in-window "go" control (Accept, Sign and accept, Submit week, Pay from bank), and the Paid frame in the recap. Always a fill with `ink` text (about 5.6:1); never text on white, never a border.

### Secondary (the four fields)
- **Peach** (`peach`): proposals and clients. Episode fields, the picked option's wash, the waitlist's error ring.
- **Sky** (`sky`): time and people. Episode fields, hour bars, the Sent chip.
- **Mint** (`mint`): getting paid. Episode fields, the ok/accepted chip, earned badges.
- **Lilac** (`lilac`): the books and trust. Episode fields, the lock chip, text selection, the waitlist's focus ring.
- **Soft twins** (`peach-soft`, `sky-soft`, `mint-soft`, `lilac-soft`): notes, refusals, step-up panels, draft rows, hash chips and the finale's season rows, inside white windows or the white finale box. A field colour is never laid on its own field.

### Neutral
- **Ground** (`ground`): the page, every product window, chips and tags at rest, the waitlist field.
- **Ink** (`ink`): all text at full strength, every 1.5px outline and rule, the current nav link, the current beat and index pin, focus outlines, progress fills, the scrollbar thumb.
- **Ink 2** (`ink-2`): sublines, secondary copy in windows and the index.
- **Muted** (`muted`): meta, table heads, captions, timestamps, the waitlist hint.
- **Hair / Hair 2** (`hair`, `hair-2`): 1px row dividers and empty progress tracks; button and link hover fills, the disabled button.
- **Wash** (`wash`): the window sidebar, option cards, layers, badges and plain notes.
- **Placeholder** (`placeholder`): input placeholder text only.

### Named Rules
**The One Field, One Role Rule.** Peach is proposals and clients, sky is time and people, mint is getting paid, lilac is the books and trust. An episode takes the field of its subject, and every tint inside it follows the same mapping.

**The Tomato Is Action and Paid Rule.** Tomato fills the one action a visitor or a demo user takes and the moment money lands. It carries ink, never white, and it is never a field, a border or text.

## Typography

**Display Font:** Gabarito variable (with ui-sans-serif, system-ui), self-hosted, weight 400 to 900
**Body Font:** the same family

**Character:** A round, friendly geometric grotesque pushed to 900 with tight negative tracking for anything that is a title, and left at 400 to 700 for reading; one family carries the whole voice.

### Hierarchy
- **Display** (900, `display` clamp, 0.92, -0.04em, balanced): the audience headline, two stacked lines. clamp(2.75rem, 13vw, 3.5rem) on phones, lines run inline.
- **Big title card** (900, `title-card-big` clamp, 0.9, -0.045em, 17ch): one episode per page, with lede and wink set side by side beneath it.
- **Title card** (900, `title-card` clamp, 0.98, -0.035em, 820px max): every other episode. The leading code "S01E04 ·" drops to 500 with tabular figures inside the same heading. clamp(1.875rem, 8.6vw, 2.375rem) on phones.
- **Headline** (900, `headline` clamp): the special and the finale. The home page's season rows use clamp(2.25rem, 4vw, 3.25rem) at 0.95.
- **Lede** (400, 1.1875rem, 1.5, 60ch): title card ledes and the special; the hero subline is 1.25rem/1.42 in `ink-2` at 46ch.
- **Wink** (700 italic, 1.0625rem; 1.375rem on the big card): one line of in-voice aside under a title card. Italic heavy type is also the recap's "Previously on…" (900, 1.375rem), the "wait for it…" frame and the recorded signature.
- **Body** (400, 1.0625rem, 1.55); 1rem on phones.
- **Figure** (900, 1.5rem, -0.03em, tabular): big numbers in recap frames; window totals 800 at 1.375rem; option prices 900 at 1.25rem.
- **Window title** (800, 1.25rem, -0.02em) over a 0.875rem `muted` subline; UI text in windows is 0.875rem.
- **Button** (800, 1rem; 0.9375rem small).
- **Label** (600 to 800, 0.6875 to 0.8125rem, sentence case): chips, tags, table heads, index pins, avatar initials.

### Named Rules
**The Code On The Line Rule.** The episode code and the episode title are one heading: code at 500, title at 900, separated by a middle dot. Nothing sits above a title card.

**The Tabular Columns Rule.** Money, durations, figures, table cells, hashes, chain rows, timestamps and episode codes carry tabular numerals; running copy does not.

## Layout

One 1312px container with a 32px gutter (16px on phones) under a sticky 72px nav. The hero is a single column: the headline, then a two-column lower band (subline and season line left, waitlist right, bottom-aligned, 48px gap), then the recap strip of five equal frames with a five-segment progress bar above them.

Below the hero the season is a two-column grid: a 228px sticky index (96px from the top) and the episodes, 48px apart. Episodes stack 28px apart, each a field with 32px corners and 52/52/44px padding; the title card holds 34px above its demo (40px for the big card). Inside, the demo is a row of beat buttons, the product window, then a one-line caption. Windows split into a 188px sidebar and a main pane, padded 20px.

After the episodes: the special (104px top, two equal columns, 56px gap) and the finale (96px top, a white ink-outlined box with 32px corners, a 12px four-field stripe across its top, copy and form left, the season's five rows right). The footer sits under a 1.5px ink rule.

Breakpoints: 1200px narrows the index to 196px, the episode padding to 44/40px and the window sidebar to 164px. 1023px drops the index entirely, stacks the hero band, special, finale and big card body. 820px stacks the recap frames into one slot that shows only the current frame, hides window sidebars and stacks every in-window grid. 640px wraps nav links to their own row, stacks the waitlist into a 22px-cornered column with a full-width button, tightens field corners to 24px and episode padding to 32/16/24px.

## Elevation & Depth

Outline first, soft lift second. Every surface is drawn by a 1.5px ink line; depth is added only to things that are "on" or are product windows, and always as a soft, negatively spread drop. There are no hard offset shadows, no glow and no glass apart from the nav's light frosting.

### Shadow Vocabulary
- **Window** (`box-shadow: 0 22px 44px -26px rgba(18, 18, 18, 0.42), 0 3px 8px -4px rgba(18, 18, 18, 0.16)`): product windows, the current recap frame (with a 6px rise), hovered season rows on the home page.
- **Small** (`box-shadow: 0 10px 22px -14px rgba(18, 18, 18, 0.38), 0 2px 4px -2px rgba(18, 18, 18, 0.12)`): the waitlist field; the current recap frame on phones.
- **Button** (`box-shadow: 0 8px 18px -10px rgba(18, 18, 18, 0.5)`): the standalone primary button; deepens on hover with a 1px rise, flattens on press. Inside the waitlist field the button has no shadow.
- **Ring** (`box-shadow: 0 0 0 4px` in `lilac`, or `peach` on error): the waitlist field's focus and error state, layered over the small shadow.

### Named Rules
**The Ink Line Rule.** Structure is a 1.5px ink line; 1px `hair` only divides rows. Fields carry no outline at all: their colour is the edge.

## Shapes

Generous and friendly at the large end, app-native at the small end. Episode fields and the finale box take 32px corners (24px on phones); product windows 18px; recap frames 16px; option cards, stamps, step-up panels, draft rows and badges 12px; notes, layers and field-like rows 10px; window controls 9px; option rows, sidebar items and index pins 8px; numbered tiles, hashes and hour bars 6px. Buttons, nav links, beats, chips, tags, the waitlist field and icon buttons are full pills. Avatars, beat numbers and the season-line dot are circles.

A dashed 1.5px ink line means "not real yet": the Demo data tag, a Draft chip, the broken three-tool path. The Paid stamps sit rotated (-3deg in the recap, -2deg in windows) and land with a scale-and-blur stamp. The brand mark is a 30px ink-outlined square split into the four fields.

## Components

### Buttons
- **Shape:** full pill, 48px tall (40px small), 1.5px ink outline.
- **Primary:** tomato fill, ink text at 800, plainly labelled "Join the waitlist". Hover rises 1px with a deeper shadow; press sinks 1px; disabled takes `hair-2` with no shadow.
- **Icon button:** 40px white circle with an ink outline (play, pause, replay); hover `hair-2`, press scales to 0.95.

### Waitlist field
- A white pill with an ink outline and 6px inner padding holding a borderless input and the primary button. Focus-within adds a 4px lilac ring; error a 4px peach ring with the note in bold ink beside an alert icon; success replaces the note in bold ink with a check.

### Navigation
- Sticky, 94% white with a light blur, gaining a 1.5px ink rule once scrolled. Brand mark plus a 900 wordmark; pill links at 600 that fill `hair-2` on hover and invert to ink with white text for the current page; small primary button at the end. Links wrap to their own row on phones.

### Chips and tags
- **Status chip:** pill, 1.5px ink ring, 0.75rem/700, optional 13px icon. White at rest; sky for sent, mint for ok, peach for due, lilac for locked, tomato for Paid, ink with white text for emphasis; dashed ring for Draft.
- **Demo data tag:** the same pill with a dashed ring, on every window bar and above the recap.

### Season index (signature)
- A 228px sticky list on desktop: a 2px `hair` spine with an ink fill that grows with progress, 32x26px pins carrying the episode code. Seen pins take an ink ring and their field colour; the current pin inverts to ink with bold ink title. Hover underlines the title.

### Title card (signature)
- The heading (code at 500, title at 900) over a lede and an optional italic wink. Ordinary cards wipe in left to right with a clip-path over 800ms; the big card sets word by word, each word rising 0.45em out of a 6px blur over 700ms, staggered 55ms after a 120ms wait; lede and wink fade in at 400ms.

### Beats and product window (signature)
- **Beats:** numbered pills (36px, ink ring, 55% white) preceded by a play/pause/replay icon button; done beats fill their number in ink, the current beat inverts to ink. A caption with an arrow below the window says what just happened. Beats advance every 2.3s by default while the window is on screen.
- **Window:** white, 18px, ink outline, window shadow. A 52px bar under a 1.5px ink rule holds the org mark, breadcrumbs, the Demo data tag and the signed-in avatar. Content follows app patterns: tables with an ink head rule and `hair` rows, key-value lists, soft notes and refusals, step-up panels, activity logs, chain rows, 9px window controls (tomato only for the go action). Every state is in the DOM from frame one and swaps in place with a 450ms fade and 6px rise.

### "Previously on…" recap (signature)
- Five white 16px frames with an ink outline, each led by a numbered 6px tile in its field (tomato for Paid). A five-segment bar fills in ink as each frame plays for 2.6s; the current frame rises 6px with the window shadow and its content animates (hour bars grow, dots pulse, the stamp lands). Pausable; segments are buttons. Under reduced motion it rests on the last frame.

### Finale
- White box, 32px corners, ink outline, a 12px stripe of the four fields across its top. Heading, line and waitlist left; "The season so far" over five borderless rows in the soft twins of their fields (a full peach row stands in for tomato) right.

### Focus
- 3px solid ink outline, 3px offset, 6px radius, everywhere. The waitlist field shows focus with its lilac ring instead.

### Motion
- One easing, `cubic-bezier(0.16, 1, 0.3, 1)`, and `cubic-bezier(0.7, 0, 0.84, 0)` for things leaving. Hover and press 150ms; state colours 200 to 250ms; swaps 450ms in and 200ms out. Reduced motion drops animations to near zero, keeps state swaps as a 200ms fade, and the recap rests on its final frame; without JavaScript the first state of every window shows.

## Do's and Don'ts

### Do:
- **Do** give every episode one field from its subject: peach proposals and clients, sky time and people, mint getting paid, lilac books and trust.
- **Do** draw structure with a 1.5px ink line and keep product windows white with the soft window shadow.
- **Do** set the episode code and title on one heading line, code at 500 and title at 900.
- **Do** use tomato only for the action and for Paid, always with ink text.
- **Do** tag every product surface with the dashed "Demo data" tag and play it in numbered, pausable beats.
- **Do** set money, durations and figures in tabular numerals.
- **Do** give every animated piece a finished resting state under reduced motion and without JavaScript.

### Don't:
- **Don't** use TV imagery (screens, remotes, broadcast frames) or name a show; the season is told in type.
- **Don't** put a label or kicker above a title card; the code belongs on the title's line.
- **Don't** put white text on tomato, or use tomato as text, border or field.
- **Don't** lay a field colour on its own field; inside a field use white windows and the soft twins inside them.
- **Don't** use hard offset shadows, glow or glass; lift is soft and reserved for windows, the current frame and the primary button.
- **Don't** add a second display family or a system display face; Gabarito carries everything.
