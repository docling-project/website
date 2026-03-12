from datetime import datetime
from enum import Enum
from functools import lru_cache
from pathlib import Path
import re
from pydantic import BaseModel
import markdown


_blog_path = Path("blog")

_markdown_extensions = [
    "markdown.extensions.abbr",
    "markdown.extensions.admonition",
    "markdown.extensions.def_list",
    "markdown.extensions.fenced_code",
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
        "preserve_tabs": False,
        "custom_fences": [],
    }
}


_code_tag_re = re.compile(r"(<code\b[^>]*>)(.*?)(</code>)", re.DOTALL)


def _stabilize_code_newlines(html: str) -> str:
    # pyjsx pretty-prints multiline child strings and injects indentation after
    # each newline. Encoding newlines in <code> blocks avoids false indentation.
    newline_encoded = '&#10;'
    return _code_tag_re.sub(
        lambda m: m.group(1) + m.group(2).replace('\n', newline_encoded) + m.group(3),
        html,
    )


class BlogFilter(str, Enum):
    """Blog post filter categories."""
    ALL = "all"
    TECHNICAL = "technical"
    EVENT = "event"
    FEATURE = "feature"
    
    @property
    def label(self) -> str:
        """Get the display label for this filter."""
        labels = {
            BlogFilter.ALL: "All",
            BlogFilter.TECHNICAL: "Technical",
            BlogFilter.EVENT: "Event",
            BlogFilter.FEATURE: "New feature",
        }
        return labels[self]


class Post(BaseModel):
    id: str
    date: datetime
    title: str
    summary: str
    html: str
    thumbnail: str | None = None
    category: BlogFilter = BlogFilter.TECHNICAL


@lru_cache()
def _blog_post(path: Path, mtime_ns: int) -> Post:
    # `mtime_ns` is part of the cache key so markdown edits invalidate cached HTML.
    _ = mtime_ns
    with open(path, "r", encoding="utf-8") as mdf:
        md = markdown.Markdown(
            extensions=_markdown_extensions,
            extension_configs=_extension_configs,
        )
        content = mdf.read()
        html = md.convert(content)
        
        # Access metadata after conversion
        category_str = md.Meta.get("category", ["technical"])[0] # type: ignore
     
        return Post(
            id=path.parts[1],
            html=_stabilize_code_newlines(html),
            date=datetime.strptime(md.Meta.get("date", ["01-01-0001"])[0], "%d-%m-%Y"), # type: ignore
            title=md.Meta.get("title", ["Missing Title"])[0], # type: ignore
            summary=md.Meta.get("summary", [""])[0], # type: ignore
            thumbnail=md.Meta.get("thumbnail", [None])[0], # type: ignore
            category=BlogFilter(category_str),
        )


def blog_post(id: str) -> Post:
    """Get a blog post by name."""
    path = _blog_path / id / "post.md"
    return _blog_post(path, path.stat().st_mtime_ns)


def blog_posts(filter: BlogFilter) -> list[Post]:
    """Get all blog posts, ordered by descending date.
    
    Args:
        filter: Optional category filter.
    """

    posts = [
        _blog_post(path, path.stat().st_mtime_ns)
        for path in _blog_path.glob("*/post.md")
        if path.parts[1] != "template"
    ]
    
    # Apply category filter if specified
    if filter != BlogFilter.ALL:
        posts = [post for post in posts if post.category == filter]
    
    posts.sort(key=lambda post: post.date, reverse=True)

    return posts


def last_blog_post() -> Post | None:
    """Get the most recent blog post."""
    return next(iter(blog_posts(BlogFilter.ALL)), None)
