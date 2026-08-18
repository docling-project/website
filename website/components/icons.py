"""Inline SVG icons.

Returned as raw markup rather than as pyjsx elements: icon paths are static, and
inlining them avoids both an icon-font request and a per-tag element factory.
Every icon inherits ``currentColor`` so it themes automatically, and is marked
``aria-hidden`` because icons here always sit beside a text label.
"""

from __future__ import annotations

from pyjsx import HTMLDontEscape


def _svg(body: str, *, size: str = "16", stroke: bool = True, view: str = "0 0 16 16") -> HTMLDontEscape:
    paint = (
        'fill="none" stroke="currentColor" stroke-width="1.25" '
        'stroke-linecap="round" stroke-linejoin="round"'
        if stroke
        else 'fill="currentColor"'
    )
    return HTMLDontEscape(
        f'<svg viewBox="{view}" width="{size}" height="{size}" {paint} '
        f'aria-hidden="true" focusable="false">{body}</svg>'
    )


def copy_icon() -> HTMLDontEscape:
    return _svg(
        '<rect x="5.5" y="5.5" width="8" height="8" rx="1"/>'
        '<path d="M10.5 3.5v-1h-8v8h1"/>',
        size="16",
    )


def check_icon() -> HTMLDontEscape:
    return _svg('<path d="M3 8.5 6.5 12 13 4.5"/>', size="16")


def arrow_right() -> HTMLDontEscape:
    return _svg('<path d="M3 8h10M9 4l4 4-4 4"/>', size="16")


def arrow_down() -> HTMLDontEscape:
    return _svg('<path d="M8 3v10M4 9l4 4 4-4"/>', size="16")


def external_icon() -> HTMLDontEscape:
    return _svg('<path d="M6.5 3.5H3.5v9h9v-3M9.5 3.5h3v3M12.5 3.5 7 9"/>', size="14")


def menu_icon() -> HTMLDontEscape:
    return _svg('<path d="M2 4h12M2 8h12M2 12h12"/>', size="20", view="0 0 16 16")


def close_icon() -> HTMLDontEscape:
    return _svg('<path d="M4 4l8 8M12 4l-8 8"/>', size="20", view="0 0 16 16")


def info_icon() -> HTMLDontEscape:
    return _svg('<circle cx="8" cy="8" r="6.25"/><path d="M8 7.25v4M8 4.9v.1"/>', size="18")


def github_icon() -> HTMLDontEscape:
    # GitHub's own mark-github-16 octicon path. Kept on one line: splitting it
    # across concatenated string literals silently drops the spaces that
    # separate path coordinates, which produces a malformed `d`.
    return _svg(
        '<path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>',
        size="16",
        stroke=False,
    )


# Value-proposition icons, drawn from the document-processing vocabulary the
# strategy asks for: page sheets, bounding boxes, table grids, reading order.
def icon_structure() -> HTMLDontEscape:
    """Bounding boxes over a page."""
    return _svg(
        '<rect x="2.5" y="1.5" width="11" height="13" rx="0.5"/>'
        '<rect x="4.5" y="3.5" width="7" height="2.5"/>'
        '<rect x="4.5" y="8" width="3" height="4.5"/>'
        '<rect x="8.5" y="8" width="3" height="2"/>',
        size="28",
    )


def icon_model() -> HTMLDontEscape:
    """Many inputs converging on one node."""
    return _svg(
        '<path d="M2 3.5h3.5M2 8h3.5M2 12.5h3.5"/>'
        '<path d="M5.5 3.5C8 3.5 8 8 10 8M5.5 8h4.5M5.5 12.5C8 12.5 8 8 10 8"/>'
        '<circle cx="12" cy="8" r="2"/>',
        size="28",
    )


def icon_private() -> HTMLDontEscape:
    """A page behind a shield."""
    return _svg(
        '<path d="M8 1.75 13 3.5v4.25c0 3-2.1 5.4-5 6.5-2.9-1.1-5-3.5-5-6.5V3.5z"/>'
        '<path d="M6 7.75h4M6 10h2.5"/>',
        size="28",
    )


def icon_ai() -> HTMLDontEscape:
    """Chunks feeding a pipeline."""
    return _svg(
        '<rect x="1.75" y="2.5" width="5" height="3.25" rx="0.5"/>'
        '<rect x="1.75" y="10.25" width="5" height="3.25" rx="0.5"/>'
        '<path d="M6.75 4.15h2.5v7.7h-2.5"/>'
        '<circle cx="12" cy="8" r="2.25"/>',
        size="28",
    )
