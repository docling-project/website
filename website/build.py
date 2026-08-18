"""Static site generator for the Docling website.

Renders every route of the FastAPI app (``website/main.py``) to a plain HTML
file and copies the static assets, producing a fully static site that can be
published on GitHub Pages (or any static host).

Usage::

    uv run website/build.py                       # build into ./dist
    uv run website/build.py --out _site            # custom output dir
    uv run website/build.py --base-path /docling-website

The ``--base-path`` prefix (also read from the ``BASE_PATH`` env var) is
prepended to every root-relative link (``/css/base.css``, ``/blog/`` ...) so the
same build works both on a project page served under a sub-path
(``docling-project.github.io/docling-website``) and later on a custom domain
served at the root (``docling.ai``, where the base path is empty).
"""

from __future__ import annotations

import argparse
import os
import re
import shutil
from pathlib import Path

from pyjsx import auto_setup  # type: ignore  # noqa: F401  (registers the .px import hook)

from website.models.blog import BlogFilter, blog_posts
from website.pages.benchmarks import BenchmarksPage  # type: ignore
from website.pages.blog import BlogPostPage  # type: ignore
from website.pages.blog import BlogPage  # type: ignore
from website.pages.components import ComingSoonPage, CommunityPage  # type: ignore
from website.pages.deployments import DeploymentsPage  # type: ignore
from website.pages.ecosystem import EcosystemPage  # type: ignore
from website.pages.formats import FormatsPage  # type: ignore
from website.pages.home import HomePage  # type: ignore
from website.pages.papers import PapersPage  # type: ignore
from website.pages.use_cases import UseCasesPage  # type: ignore
from website.seo import robots_txt, sitemap_xml


# Matches root-relative URLs in href/src attributes, e.g. href="/style.css".
# Protocol-relative ("//cdn...") and absolute ("https://...") URLs are skipped.
_ROOT_LINK_RE = re.compile(r'\b(href|src)=(["\'])(/(?!/)[^"\']*)\2')


def _apply_base_path(html: str, base_path: str) -> str:
    """Prefix every root-relative href/src with ``base_path``."""
    if not base_path:
        return html
    return _ROOT_LINK_RE.sub(
        lambda m: f'{m.group(1)}={m.group(2)}{base_path}{m.group(3)}{m.group(2)}',
        html,
    )


# Root-relative url() inside a stylesheet, e.g. url(/font/plex.woff2).
_CSS_ROOT_URL_RE = re.compile(r'url\(\s*["\']?(/(?!/)[^"\')]*)')


def _check_css_urls(css_dir: Path) -> None:
    """Fail on root-relative url() in stylesheets.

    ``_apply_base_path`` only rewrites href/src attributes in HTML, so a
    root-relative URL inside CSS silently 404s on a sub-path deploy. Stylesheet
    URLs must be relative to the stylesheet (``../font/...``) instead.
    """
    offenders: list[str] = []
    for css in sorted(css_dir.glob("*.css")):
        for match in _CSS_ROOT_URL_RE.finditer(css.read_text(encoding="utf-8")):
            offenders.append(f"{css.name}: url({match.group(1)})")

    if offenders:
        raise SystemExit(
            "Root-relative url() found in CSS; these break sub-path deploys.\n"
            "Use a path relative to the stylesheet instead (e.g. ../font/x.woff2):\n  "
            + "\n  ".join(offenders)
        )


def _write_page(out_dir: Path, route: str, html: str, base_path: str) -> None:
    """Write ``html`` for ``route`` as ``<route>/index.html`` under ``out_dir``."""
    rel = route.strip("/")
    target_dir = out_dir / rel if rel else out_dir
    target_dir.mkdir(parents=True, exist_ok=True)
    target = target_dir / "index.html"
    target.write_text(_apply_base_path(html, base_path), encoding="utf-8")
    print(f"  {route:<40} -> {target.relative_to(out_dir)}")


def _copy_assets(src: Path, dst: Path, *, ignore_suffixes: tuple[str, ...] = ()) -> None:
    """Copy a directory tree, skipping the template folder, markdown/bibtex sources
    and hidden files. ``dst`` is created if missing."""

    def _ignore(dir_path: str, names: list[str]) -> set[str]:
        ignored: set[str] = set()
        for name in names:
            if name.startswith(".") or name == "template" or name == "__pycache__":
                ignored.add(name)
            elif ignore_suffixes and name.endswith(ignore_suffixes):
                ignored.add(name)
        return ignored

    shutil.copytree(src, dst, dirs_exist_ok=True, ignore=_ignore)


def build(out_dir: Path, base_path: str, cname: str | None = None) -> None:
    root = Path.cwd()

    if out_dir.exists():
        shutil.rmtree(out_dir)
    out_dir.mkdir(parents=True)

    print(f"Building static site into {out_dir}/ (base_path={base_path or '/'})")

    # 1. Copy static assets. ``public`` maps to the site root; ``blog`` and
    #    ``papers`` keep their asset trees (images, thumbnails, figures) but the
    #    markdown/bibtex sources are rendered into HTML below, not served raw.
    print("Copying assets...")
    _copy_assets(root / "public", out_dir)
    _copy_assets(root / "blog", out_dir / "blog", ignore_suffixes=(".md",))
    _copy_assets(root / "papers", out_dir / "papers", ignore_suffixes=(".md", ".bib"))
    _check_css_urls(out_dir / "css")

    # 2. Render pages.
    print("Rendering pages...")
    _write_page(out_dir, "/", str(HomePage()), base_path)
    _write_page(out_dir, "/use-cases/", str(UseCasesPage()), base_path)
    _write_page(out_dir, "/deployments/", str(DeploymentsPage()), base_path)
    _write_page(out_dir, "/benchmarks/", str(BenchmarksPage()), base_path)
    _write_page(out_dir, "/ecosystem/", str(EcosystemPage()), base_path)
    _write_page(out_dir, "/formats/", str(FormatsPage()), base_path)
    _write_page(out_dir, "/blog/", str(BlogPage(filter=BlogFilter.ALL)), base_path)
    for post in blog_posts(BlogFilter.ALL):
        _write_page(out_dir, f"/blog/{post.id}/", str(BlogPostPage(id=post.id)), base_path)
    _write_page(out_dir, "/papers/", str(PapersPage()), base_path)
    _write_page(out_dir, "/community/", str(CommunityPage()), base_path)
    _write_page(out_dir, "/faq/", str(ComingSoonPage("FAQ", path="/faq/")), base_path)
    _write_page(out_dir, "/releases/", str(ComingSoonPage("Releases", path="/releases/")), base_path)

    # 3. Crawl metadata. Both are absolute-URL documents, so the base path does
    #    not apply to them.
    print("Writing sitemap.xml and robots.txt...")
    (out_dir / "sitemap.xml").write_text(sitemap_xml(), encoding="utf-8")
    (out_dir / "robots.txt").write_text(robots_txt(), encoding="utf-8")

    # 4. GitHub Pages housekeeping: ``.nojekyll`` disables Jekyll processing so
    #    files/folders are served exactly as generated.
    (out_dir / ".nojekyll").write_text("", encoding="utf-8")

    # 5. Optional custom domain (e.g. docling.ai). When set, GitHub Pages serves
    #    at the root, so build with an empty base path.
    if cname:
        (out_dir / "CNAME").write_text(cname + "\n", encoding="utf-8")
        print(f"Wrote CNAME -> {cname}")

    print("Done.")


def main() -> None:
    parser = argparse.ArgumentParser(description="Build the static Docling website.")
    parser.add_argument(
        "--out",
        default="dist",
        type=Path,
        help="Output directory (default: dist).",
    )
    parser.add_argument(
        "--base-path",
        default=os.environ.get("BASE_PATH", ""),
        help="URL prefix for root-relative links, e.g. /docling-website. "
        "Leave empty for a custom-domain / root deployment.",
    )
    parser.add_argument(
        "--cname",
        default=os.environ.get("CNAME"),
        help="Custom domain to write into a CNAME file (e.g. docling.ai).",
    )
    args = parser.parse_args()

    base_path = "/" + args.base_path.strip("/") if args.base_path.strip("/") else ""
    build(args.out, base_path, args.cname)


if __name__ == "__main__":
    main()
