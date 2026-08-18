"""sitemap.xml and robots.txt.

Routes live in one list so the sitemap cannot drift away from what the static
build actually writes — ``build.py`` renders from the same list.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from xml.sax.saxutils import escape

from website.models.blog import BlogFilter, blog_posts


SITE_URL = "https://docling.ai"


@dataclass(frozen=True)
class Route:
    path: str
    priority: str = "0.6"
    changefreq: str = "monthly"


STATIC_ROUTES: list[Route] = [
    Route("/", priority="1.0", changefreq="weekly"),
    Route("/use-cases/", priority="0.8"),
    Route("/deployments/", priority="0.8"),
    Route("/benchmarks/", priority="0.7"),
    Route("/ecosystem/", priority="0.7"),
    Route("/formats/", priority="0.6"),
    Route("/blog/", priority="0.8", changefreq="weekly"),
    Route("/papers/", priority="0.6"),
    Route("/community/", priority="0.5"),
]


def all_routes() -> list[Route]:
    """Static routes plus one route per blog post."""
    routes = list(STATIC_ROUTES)
    routes.extend(
        Route(f"/blog/{post.id}/", priority="0.6")
        for post in blog_posts(BlogFilter.ALL)
    )
    return routes


def sitemap_xml(lastmod: str | None = None) -> str:
    stamp = lastmod or date.today().isoformat()

    entries = "\n".join(
        "  <url>\n"
        f"    <loc>{escape(SITE_URL + route.path)}</loc>\n"
        f"    <lastmod>{stamp}</lastmod>\n"
        f"    <changefreq>{route.changefreq}</changefreq>\n"
        f"    <priority>{route.priority}</priority>\n"
        "  </url>"
        for route in all_routes()
    )

    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{entries}\n"
        "</urlset>\n"
    )


def robots_txt() -> str:
    return (
        "User-agent: *\n"
        "Allow: /\n"
        "\n"
        f"Sitemap: {SITE_URL}/sitemap.xml\n"
    )
