"""Renders annotation overlays onto a document page as inline SVG.

Emitted as raw markup rather than pyjsx elements: the shapes come from data, so
building them with a string join is both shorter and easier to read than a
per-tag element factory. Strokes use `vector-effect="non-scaling-stroke"` so a
1px rule stays 1px at any rendered size.
"""

from __future__ import annotations

from html import escape

from pyjsx import HTMLDontEscape

from website.data.samples import PAGE_H, PAGE_W, Shape


def _shape_markup(shape: Shape) -> str:
    cls = f"anno anno--{shape.style}"
    common = f'class="{cls}" vector-effect="non-scaling-stroke"'

    if shape.kind == "rect":
        return (
            f'<rect {common} x="{shape.x}" y="{shape.y}" '
            f'width="{shape.width}" height="{shape.height}"/>'
        )
    if shape.kind == "line":
        return (
            f'<line {common} x1="{shape.x1}" y1="{shape.y1}" '
            f'x2="{shape.x2}" y2="{shape.y2}"/>'
        )
    if shape.kind == "polyline":
        marker = ' marker-mid="url(#anno-dot)" marker-end="url(#anno-arrow)"' if shape.style == "flow" else ""
        return f'<polyline {common} points="{escape(shape.points, quote=True)}"{marker}/>'
    if shape.kind == "path":
        return f'<path {common} d="{escape(shape.d, quote=True)}"/>'
    return ""


def _defs() -> str:
    """Reading-order markers. Ids are document-global, so they are defined once
    per page render and reused by every flow polyline on it."""
    return (
        "<defs>"
        '<marker id="anno-dot" viewBox="0 0 2 2" refX="1" refY="1" '
        'markerWidth="3" markerHeight="3" orient="auto">'
        '<circle cx="1" cy="1" r="1" class="anno-marker"/></marker>'
        '<marker id="anno-arrow" viewBox="0 0 10 10" refX="9" refY="5" '
        'markerWidth="3" markerHeight="3" orient="auto">'
        '<path d="M 0 0 L 10 5 L 0 10 z" class="anno-marker"/></marker>'
        "</defs>"
    )


def annotated_page(
    page: str,
    shapes: list[Shape],
    *,
    alt: str = "",
    lazy: bool = True,
    group_id: str = "",
) -> HTMLDontEscape:
    """One page image with its annotation overlay."""
    body = "".join(_shape_markup(s) for s in shapes)
    group = f' data-layer="{escape(group_id, quote=True)}"' if group_id else ""
    loading = "lazy" if lazy else "eager"

    return HTMLDontEscape(
        f'<svg class="page-svg" viewBox="0 0 {PAGE_W} {PAGE_H}" '
        f'role="img" aria-label="{escape(alt, quote=True)}">'
        f"{_defs()}"
        f'<image href="{escape(page, quote=True)}" width="{PAGE_W}" height="{PAGE_H}" '
        f'loading="{loading}" preserveAspectRatio="xMidYMid meet"/>'
        f"<g{group}>{body}</g>"
        "</svg>"
    )
