from pathlib import Path
from pydantic import BaseModel
import markdown


_blog_path = Path("blog")

_markdown_extensions = [
    "markdown.extensions.abbr",
    "markdown.extensions.admonition",
    "markdown.extensions.def_list",
    "markdown.extensions.footnotes",
    "markdown.extensions.tables",
    "pymdownx.caret",
    "pymdownx.emoji",
    "pymdownx.mark",
    "pymdownx.superfences",
    "pymdownx.tilde",
]

_extension_configs = {
    "pymdownx.superfences": {
        "preserve_tabs": True,
        "custom_fences": [],
    }
}


class Post(BaseModel):
    id: str
    title: str
    html: str
    date: str | None = None


def _blog_post(path: Path) -> Post:
    with open(path, "r", encoding="utf-8") as mdf:
        html = markdown.markdown(
            mdf.read(),
            extensions=_markdown_extensions,
            extension_configs=_extension_configs,
        )

        return Post(
            id=path.parts[1],
            title=path.parts[1],
            html=html,
        )


def blog_post(id: str) -> Post:
    """Get a blog post by name."""
    return _blog_post(_blog_path / id / "post.md")


def blog_posts() -> list[Post]:
    """Get all blog posts, ordered by descending date."""

    posts = [
        _blog_post(path)
        for path in _blog_path.glob("*/post.md")
        if path.parts[1] != "template"
    ]
    # TODO: order by date.

    return posts
