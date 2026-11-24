"""Build the Ledgendary logo kit as standalone SVG files.

Every file is self-contained: text is outlined from Mona Sans (variable, OFL),
no fonts, no external references. Run from anywhere:

    python logo/build/build.py

Needs fonttools, brotli and uharfbuzz.
"""

from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
FONT = ROOT.parent / "site" / "fonts" / "MonaSansVF.woff2"

TILE = "#0b0b0d"   # the app's dark-mode frame
GOLD = "#ffc629"
WHITE = "#ffffff"
EDGE = "rgba(255,255,255,0.1)"

WORDMARK = "Ledgendary"
TAGLINE = "From proposal to paid, on one ledger."

# Glyphs on a 32-unit tile: (x, y, w, h, role). Roles: main, soft (lower
# opacity ledger line, with its opacity), gold.
OPTIONS = {
    "a": ("L with the stripe", [
        (8, 6, 4, 20, "main"), (8, 22, 16, 4, "main"), (8, 14, 12, 4, "gold")]),
    "a-plus": ("L with the stripe and the ledger line", [
        (8, 6, 14, 4, ("soft", 0.4)), (8, 6, 4, 20, "main"), (8, 22, 16, 4, "main"),
        (8, 14, 12, 4, "gold")]),
    "b": ("LE ligature", [
        (6, 6, 4, 20, "main"), (14, 6, 4, 20, "main"), (14, 6, 12, 4, "main"),
        (14, 14, 10, 4, ("soft", 0.8)), (6, 22, 20, 4, "gold")]),
    "c": ("Ledger lines, joined", [
        (8, 6, 4, 20, "main"), (8, 6, 14, 4, ("soft", 0.55)),
        (8, 14, 10, 4, ("soft", 0.8)), (8, 22, 16, 4, "gold")]),
    "d": ("Double underline", [
        (8, 6, 4, 16, "main"), (8, 12, 10, 4, ("soft", 0.8)),
        (8, 20, 16, 2, "gold"), (8, 24, 16, 2, "gold")]),
}


# =========================================================================
# Text to outlines
# =========================================================================

_font = TTFont(FONT)
_upem = _font["head"].unitsPerEm
_cap = _font["OS/2"].sCapHeight
def _sfnt_bytes():
    import io
    f = TTFont(FONT)
    f.flavor = None
    buf = io.BytesIO()
    f.save(buf)
    return buf.getvalue()


_SFNT = _sfnt_bytes()


def outline(text, location, tracking_em=0.0):
    """Return (path_d, bounds) for text at 1 unit per font unit, baseline y=0, y down."""
    face = hb.Face(hb.Blob(_SFNT))
    font = hb.Font(face)
    font.set_variations(location)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True})
    glyphset = _font.getGlyphSet(location=location)
    order = _font.getGlyphOrder()
    pen = SVGPathPen(glyphset)
    bpen = BoundsPen(glyphset)
    x = 0
    n = len(buf.glyph_infos)
    for i, (info, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
        name = order[info.codepoint]
        t = (1, 0, 0, -1, x + pos.x_offset, -pos.y_offset)
        glyphset[name].draw(TransformPen(pen, t))
        glyphset[name].draw(TransformPen(bpen, t))
        x += pos.x_advance
        if i < n - 1:
            x += tracking_em * _upem
    return pen.getCommands(), bpen.bounds  # (xmin, ymin, xmax, ymax), y down


WORD_LOC = {"wght": 800, "wdth": 116, "opsz": 32}
TAG_LOC = {"wght": 520, "wdth": 100, "opsz": 16}
WORD_D, WORD_B = outline(WORDMARK, WORD_LOC, -0.03)
TAG_D, TAG_B = outline(TAGLINE, TAG_LOC, -0.005)


# =========================================================================
# SVG helpers
# =========================================================================

def svg(w, h, body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fmt(w)} {fmt(h)}" '
        f'width="{fmt(w)}" height="{fmt(h)}" role="img" aria-label="{title}">\n'
        f"<title>{title}</title>\n{body}\n</svg>\n"
    )


def fmt(v):
    return f"{v:.3f}".rstrip("0").rstrip(".")


def bars(glyph, colours, ox=0, oy=0, s=1.0):
    """Draw glyph bars. colours maps role -> (fill, opacity) or None to skip."""
    out = []
    for x, y, w, h, role in glyph:
        key = role[0] if isinstance(role, tuple) else role
        fill, op = colours[key]
        if isinstance(role, tuple) and colours.get("keep_soft", True):
            op = op * role[1]
        r = min(w, h) / 2
        attr = f' opacity="{fmt(op)}"' if op < 1 else ""
        out.append(
            f'<rect x="{fmt(ox + x * s)}" y="{fmt(oy + y * s)}" width="{fmt(w * s)}" '
            f'height="{fmt(h * s)}" rx="{fmt(r * s)}" fill="{fill}"{attr}/>'
        )
    return "\n".join(out)


def tile(ox=0, oy=0, s=1.0, fill=TILE, edge=False, circle=False):
    if circle:
        el = f'<circle cx="{fmt(ox + 16 * s)}" cy="{fmt(oy + 16 * s)}" r="{fmt(16 * s)}" fill="{fill}"/>'
    else:
        el = f'<rect x="{fmt(ox)}" y="{fmt(oy)}" width="{fmt(32 * s)}" height="{fmt(32 * s)}" rx="{fmt(8 * s)}" fill="{fill}"/>'
    if edge:
        el += (f'\n<rect x="{fmt(ox + .5 * s)}" y="{fmt(oy + .5 * s)}" width="{fmt(31 * s)}" '
               f'height="{fmt(31 * s)}" rx="{fmt(7.5 * s)}" fill="none" stroke="{EDGE}" stroke-width="{fmt(s)}"/>')
    return el


ON_DARK = {"main": (WHITE, 1), "soft": (WHITE, 1), "gold": (GOLD, 1)}
ON_LIGHT = {"main": (TILE, 1), "soft": (TILE, 1), "gold": (GOLD, 1)}
MONO_INK = {"main": (TILE, 1), "soft": (TILE, 1), "gold": (TILE, 1), "keep_soft": False}
MONO_WHITE = {"main": (WHITE, 1), "soft": (WHITE, 1), "gold": (WHITE, 1), "keep_soft": False}
ON_GOLD = {"main": (TILE, 1), "soft": (TILE, 1), "gold": (TILE, 1), "keep_soft": False}


def glyph_bounds(glyph):
    xs = [x for x, *_ in glyph] + [x + w for x, _, w, *_ in glyph]
    ys = [y for _, y, *_ in glyph] + [y + h for _, y, _, h, _ in glyph]
    return min(xs), min(ys), max(xs), max(ys)


def word(ox, oy_baseline, size, fill, d=WORD_D):
    s = size / _upem
    return f'<path transform="translate({fmt(ox)} {fmt(oy_baseline)}) scale({s:.6f})" fill="{fill}" d="{d}"/>'


# =========================================================================
# Build
# =========================================================================

def write(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)


def build_wordmark():
    out = ROOT / "wordmark"
    xmin, ymin, xmax, ymax = WORD_B  # y-down after flip: ymin is negative (ascender)
    size = 64
    s = size / _upem
    pad = 0
    w = (xmax - xmin) * s + pad * 2
    h = (ymax - ymin) * s + pad * 2
    for name, fill in (("wordmark-ink", TILE), ("wordmark-white", WHITE), ("wordmark-gold", GOLD)):
        body = word(pad - xmin * s, pad - ymin * s, size, fill)
        write(out / f"{name}.svg", svg(w, h, body, "Ledgendary"))
    txmin, tymin, txmax, tymax = TAG_B
    ts = 24 / _upem
    tw, th = (txmax - txmin) * ts, (tymax - tymin) * ts
    for name, fill in (("tagline-ink", TILE), ("tagline-white", WHITE)):
        body = word(-txmin * ts, -tymin * ts, 24, fill, TAG_D)
        write(out / f"{name}.svg", svg(tw, th, body, TAGLINE))


def build_option(key, label, glyph):
    out = ROOT / key
    t = "Ledgendary"
    S = 4  # 32-unit tile drawn at 128
    # Logomark: tile + glyph
    write(out / "logomark.svg", svg(32 * S, 32 * S, tile(s=S) + "\n" + bars(glyph, ON_DARK, s=S), t))
    write(out / "logomark-on-dark.svg",
          svg(32 * S, 32 * S, tile(s=S, edge=True) + "\n" + bars(glyph, ON_DARK, s=S), t))
    # Lettermark: the glyph alone, cropped to its own bounds
    gx0, gy0, gx1, gy1 = glyph_bounds(glyph)
    gw, gh = (gx1 - gx0) * S, (gy1 - gy0) * S
    for name, cols in (("lettermark-on-light", ON_LIGHT), ("lettermark-on-dark", ON_DARK),
                       ("lettermark-mono-ink", MONO_INK), ("lettermark-mono-white", MONO_WHITE)):
        write(out / f"{name}.svg", svg(gw, gh, bars(glyph, cols, -gx0 * S, -gy0 * S, S), t))
    # Containers: circle (avatars, social) and gold tile
    write(out / "container-circle.svg",
          svg(32 * S, 32 * S, tile(s=S, circle=True) + "\n" + bars(glyph, ON_DARK, s=S), t))
    write(out / "container-gold.svg",
          svg(32 * S, 32 * S, tile(s=S, fill=GOLD) + "\n" + bars(glyph, ON_GOLD, s=S), t))
    # Negative space: one colour, glyph cut out of the tile
    cut = bars(glyph, {"main": ("#000", 1), "soft": ("#000", 1), "gold": ("#000", 1), "keep_soft": False}, s=S)
    for name, fill in (("negative-space-ink", TILE), ("negative-space-gold", GOLD), ("negative-space-white", WHITE)):
        body = (f'<defs><mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="{32 * S}" height="{32 * S}">'
                f'<rect width="{32 * S}" height="{32 * S}" fill="#fff"/>\n{cut}</mask></defs>\n'
                f'<rect width="{32 * S}" height="{32 * S}" rx="{8 * S}" fill="{fill}" mask="url(#cut)"/>')
        write(out / f"{name}.svg", svg(32 * S, 32 * S, body, t))
    # Lockups: logomark + wordmark, wordmark cap height centred on the tile
    m = 48  # mark size
    ms = m / 32
    size = 30
    ws = size / _upem
    gap = 14
    xmin, ymin, xmax, ymax = WORD_B
    word_w = (xmax - xmin) * ws
    baseline = m / 2 + (_cap * ws) / 2
    wx = m + gap - xmin * ws
    w = m + gap + word_w
    for theme, wfill, edge in (("light", TILE, False), ("dark", WHITE, True)):
        body = tile(s=ms, edge=edge) + "\n" + bars(glyph, ON_DARK, s=ms) + "\n" + word(wx, baseline, size, wfill)
        write(out / f"lockup-{theme}.svg", svg(w, m, body, t))
    # Tagline lockup: larger mark, wordmark plus tagline beside it
    m2 = 72
    ms2 = m2 / 32
    size2 = 36
    ws2 = size2 / _upem
    tsize = 15
    tsc = tsize / _upem
    txmin, tymin, txmax, tymax = TAG_B
    gap2 = 18
    word_w2 = (xmax - xmin) * ws2
    tag_w = (txmax - txmin) * tsc
    block_h = _cap * ws2 + 12 + _cap * tsc
    top = (m2 - block_h) / 2
    wb = top + _cap * ws2
    tb = wb + 12 + _cap * tsc
    x0 = m2 + gap2
    w2 = x0 + max(word_w2, tag_w)
    for theme, wfill, tfill, edge in (("light", TILE, "#565b68", False), ("dark", WHITE, "#b0b0b7", True)):
        body = (tile(s=ms2, edge=edge) + "\n" + bars(glyph, ON_DARK, s=ms2) + "\n"
                + word(x0 - xmin * ws2, wb, size2, wfill) + "\n"
                + word(x0 - txmin * tsc, tb, tsize, tfill, TAG_D))
        write(out / f"lockup-tagline-{theme}.svg", svg(w2, m2, body, f"Ledgendary. {TAGLINE}"))
    # Favicon: 32 grid, no edge
    write(out / "favicon.svg", svg(32, 32, tile() + "\n" + bars(glyph, ON_DARK), t))


if __name__ == "__main__":
    build_wordmark()
    for key, (label, glyph) in OPTIONS.items():
        build_option(key, label, glyph)
    print("built", sorted(p.relative_to(ROOT).as_posix() for p in ROOT.rglob("*.svg")).__len__(), "files")
