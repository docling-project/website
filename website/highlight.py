"""Build-time syntax highlighting.

The previous site pulled highlight.js and two language grammars from a CDN and
highlighted in the browser on load. Doing it here instead removes three
render-blocking third-party requests and means code is already coloured in the
HTML, so it never flashes unstyled.
"""

from __future__ import annotations

import re
from html import unescape

from pygments import highlight as _highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import get_lexer_by_name
from pygments.util import ClassNotFound


# `nowrap` emits only the token spans, so the surrounding <pre><code> stays ours.
_FORMATTER = HtmlFormatter(nowrap=True)


def highlight_code(text: str, language: str = "") -> str:
    """Return `text` as HTML token spans, with newlines encoded.

    Newlines become ``&#10;`` because pyjsx pretty-prints multiline children and
    would otherwise inject indentation into the rendered source.
    """
    if not language:
        return _encode(_escape(text))

    try:
        lexer = get_lexer_by_name(language, stripall=False)
    except ClassNotFound:
        return _encode(_escape(text))

    return _encode(_highlight(text, lexer, _FORMATTER).rstrip("\n"))


def _escape(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def _encode(html: str) -> str:
    return html.replace("\n", "&#10;")


# Fenced blocks as emitted by pymdownx.superfences.
_FENCE_RE = re.compile(
    r'<pre><code class="language-(?P<lang>[\w+-]+)">(?P<body>.*?)</code></pre>',
    re.DOTALL,
)


def highlight_markdown_html(html: str) -> str:
    """Colour the fenced code blocks in rendered Markdown.

    pymdownx.highlight cannot be used for this: it hands Pygments a `filename`
    of None, which Pygments 2.20 rejects. Post-processing here also means blog
    code and component code go through exactly one highlighter.
    """

    def replace(match: re.Match[str]) -> str:
        body = unescape(match.group("body"))
        return (
            f'<pre><code class="language-{match.group("lang")}">'
            f'{highlight_code(body, match.group("lang"))}'
            "</code></pre>"
        )

    return _FENCE_RE.sub(replace, html)
