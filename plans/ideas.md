# Docling Website — Improvement Plan

## Context

The website is a Python/FastAPI + pyjsx (JSX-style `.px` templating) app with vanilla JS and custom CSS. Blog content is Markdown, paper data is JSON. Deployed on Vercel.

## Feature Roadmap

| # | Feature | Effort | Value |
|---|---------|--------|-------|
| 1 | [Navigation restructure](feature_01_navigation_restructure.md) | Low | High |
| 2 | [FAQ page](feature_02_faq_page.md) | Low | High |
| 3 | [Enhanced papers — abstract, BibTeX, figures](feature_03_enhanced_papers.md) | Medium | High |
| 4 | [Release timeline — "What is New?"](feature_04_release_timeline.md) | Medium-High | High |
| 5 | [Blog enhancements — tags, reading time, featured](feature_05_blog_enhancements.md) | Medium | Medium |
| 6 | [docling-ts paper viewer](feature_06_docling_ts_viewer.md) | High | High |
| 7 | [Live demo / playground section](feature_07_live_demo.md) | Medium | High |
| 8 | [Package ecosystem overview page](feature_08_ecosystem_overview.md) | Low-Medium | Medium |
| 9 | [SEO — per-page titles and meta descriptions](feature_09_seo.md) | Low | Medium |

## Suggested Implementation Order

1. Feature 1 (navigation) — unblocks everything else; add nav stubs for pages that don't exist yet
2. Feature 9 (SEO) — tiny, independent, easy win
3. Feature 2 (FAQ) — low effort, high user value
4. Feature 3 (papers) — medium effort, no external dependencies
5. Feature 4 (timeline) — needs a GitHub Action and a JS charting library
6. Feature 5 (blog) — medium effort, iterative
7. Feature 7 (live demo) — depends on docling-serve availability
8. Feature 8 (ecosystem page) — evergreen content, can be done anytime
9. Feature 6 (docling-ts viewer) — highest effort, do after the data pipeline is established in Feature 3

## General Architecture Notes

- **`lru_cache` with no TTL** on `paper_index()` and `blog_posts()` means content changes require a server restart. Acceptable for now.
- **Static generation** would be a worthwhile long-term refactor: run the same Python code at deploy time to emit static HTML, eliminating the FastAPI server entirely.
- **Accessibility pass** is needed on the interactive feature section (`section.bar`) — the SVG overlays and JS-driven `setInterval` carousel have no keyboard navigation or ARIA labels.
