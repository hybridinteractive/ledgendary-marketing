# Build brief: audience landing pages for one look

You build the three audience landing pages (solo, team, enterprise) for ONE look, named in your prompt. Project root: `/Users/michtio/dev/hybridinteractive/ledgendary-marketing/` (own local git; never read the ledgerly app repo). Do not push.

## Read first (stop if any is missing)

1. `PRODUCT.md` (read "The books, as built" and "Never claim" twice).
2. `.impeccable/briefs/audiences.md` — the shared content for all looks. Every page must carry its audience's signature features and voice rules.
3. The look's own system:
   - v1: `site/DESIGN.md`, `site/styles.css`, `.impeccable/surfaces/site-index-html.md`
   - v2: `site-v2/DESIGN.md`, `site-v2/styles.css`, `.impeccable/surfaces/site-v2-index-html.md`
   - v3: `site-v3/DESIGN.md`, `site-v3/styles.css`, `.impeccable/surfaces/site-v3-index-html.md`
   - v4: `.impeccable/brief-look-v4.md` (new look; no code yet)
   - v5: `.impeccable/brief-look-v5.md` (new look; no code yet)
4. `/Users/michtio/.claude-engy/plugins/cache/impeccable/impeccable/4.5.2/skills/impeccable/reference/craft-floor.md`
5. `/Users/michtio/.claude-engy/plugins/cache/impeccable/impeccable/4.5.2/skills/impeccable/reference/animate.md`

## Deliverable

In the look's folder (`site/`, `site-v2/`, `site-v3/`, `site-v4/`, `site-v5/`): `solo.html`, `team.html`, `enterprise.html`, sharing the look's stylesheet and script. For v1 to v3, extend the existing `styles.css`/`app.js` (or add `audiences.css`/`audiences.js` beside them) without breaking the home page; reuse the look's components, tokens, fonts, icon sprite and motion grammar. For v4 and v5, create the look: self-hosted fonts from the family's official source with its licence (Google Fonts only if no official webfonts), lucide-static `@0.460.0` icons inlined as a sprite, a minimal `index.html` linking the three pages. Every page's nav links Home, Solo, Team, Enterprise and "Join the waitlist"; the look's home page nav gains the three audience links.

Also, for v1 to v3: fix the look's home page per "Fix on the existing home pages" in audiences.md (no per-project approver, no finance roles).

## The bar

Linear, Stripe, Mercury. Each page is product-led: live drawn UI, dense and believable, labelled "Demo data", animated in the look's motion grammar, every figure adding up. Three pages of one look must feel like one site, and each audience page must feel written for that reader (solo intimate and quick, team practical, enterprise serious and proud, all fully in voice). The enterprise page is where the tamper-proof story plays at full strength.

## Lessons from five review rounds (avoid up front)

- Figures identical everywhere; never name a document before the story creates it; every drawn panel says "Demo data".
- No claim beyond PRODUCT.md; nothing from "Never claim"; no competitor names.
- Overlays opaque from frame one; toasts and badges never cover totals, the paid figure, provenance lines or labels.
- No dead space inside product windows; size windows to their content.
- The hero H1 is the largest type on each page (rendered, including transforms); display max 6rem.
- Tabular figures only in columns if the face's tabular zero is dotted or slashed.
- Reserve space for anything that appears later, filled with a real pre-state; nothing jumps.
- No text glyphs as icons; lucide only. The accent follows the look's rule (fill only unless the look's DESIGN.md says otherwise).
- Phone: nothing scrolls sideways (not even inside windows), captions never truncated, durations ("5 h 30 m") never break.
- Winks never in the primary button; never name the show or its people, places or objects.
- Waitlist errors name the actual problem; success "Challenge accepted. You're on the list."

## Motion, accessibility, responsive

The look's motion grammar; content visible by default; reduced motion handled; off-screen animation paused; keyboard operable with ARIA on every widget; live regions for demo state; WCAG 2.2 AA; 1440, 1280 and 390 composed.

## Verify (two inspection rounds max)

Serve the look's folder with `python3 -m http.server <port> --bind 127.0.0.1` on the port named in your prompt (check first with `lsof -nP -iTCP:<port> -sTCP:LISTEN`; if taken, pick a free one and say so; never stop a server you did not start). Chrome-devtools MCP with an `isolatedContext`; `emulate` takes the page id `new_page` returns; never Claude in Chrome. Viewport captures only (`history.scrollRestoration='manual'`, verify scrollY, settle motion, open each file to confirm it shows its name). Save to `.impeccable/review/aud-<look>-<page>-d01-hero.png` onwards (1440x900, one per section, plus key demo states), `...-d-1280.png` (1280x800 top), and `aud-<look>-<page>-m01-hero.png` onwards (390x844, m01 at scrollY 0). Run `"/Users/michtio/.claude-engy/plugins/cache/impeccable/impeccable/4.5.2/skills/impeccable/scripts/impeccable" detect --json <your html and css>` once; fix real findings. Run no other impeccable command. Stop your server, close your pages.

Commit locally only your look's folder (`git add <folder>` explicitly; never -A), short imperative subjects, no trailers, no AI mention.

## Report back

Per page: sections built and which signature features each shows, wink lines used, screenshot paths, detector findings fixed and left with reasons, anything not done.
