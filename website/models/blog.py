from datetime import datetime
from functools import lru_cache
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
    "meta",
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
    date: datetime
    title: str
    summary: str
    html: str


@lru_cache()
def _blog_post(path: Path) -> Post:
    with open(path, "r", encoding="utf-8") as mdf:
        md = markdown.Markdown(
            extensions=_markdown_extensions,
            extension_configs=_extension_configs,
        )

        return Post(
            id=path.parts[1],
            html=md.convert(mdf.read()),
            date=datetime.strptime(md.Meta.get("date", ["01-01-0001"])[0], "%d-%m-%Y"), # type: ignore
            title=md.Meta.get("title", ["Missing Title"])[0], # type: ignore
            summary=md.Meta.get("summary", [""])[0], # type: ignore
        )


@lru_cache()
def blog_post(id: str) -> Post:
    """Get a blog post by name."""
    return _blog_post(_blog_path / id / "post.md")


@lru_cache()
def blog_posts() -> list[Post]:
    """Get all blog posts, ordered by descending date."""

    posts = [
        _blog_post(path)
        for path in _blog_path.glob("*/post.md")
        if path.parts[1] != "template"
    ]
    posts.sort(key=lambda post: post.date, reverse=True)

    return posts


@lru_cache()
def last_blog_post() -> Post | None:
    """Get the most recent blog post."""
    return next(iter(blog_posts()), None)
