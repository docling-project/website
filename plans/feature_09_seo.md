# Feature 09 — Per-Page SEO (Titles and Meta Descriptions)

Gives every page a unique `<title>` and `<meta name="description">` so that search engines and link-preview cards show meaningful, page-specific information instead of generic "Docling" text.

## Current State

`website/pages/page.px` hardcodes:

```html
<title>Docling</title>
<meta name="description" content="Docling converts messy documents..." />
<meta property="og:title" content="Docling" />
<meta property="og:description" content="Docling converts messy documents..." />
```

Every page — home, blog listing, individual blog posts, papers, FAQ, releases — shares these identical tags. Blog posts and papers that get shared on social media show no useful preview text.

## Proposed Changes

### `website/pages/page.px`

Accept optional `title` and `description` props, with sensible defaults:

```python
def Page(children, title: str = "Docling", description: str = _description) -> JSX:
    full_title = title if title == "Docling" else f"{title} — Docling"
    ...
    <title>{full_title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={full_title} />
    <meta property="og:description" content={description} />
```

### Per-page updates

| Page | Title | Description |
|------|-------|-------------|
| Home | `Docling` | existing tagline |
| Papers | `Papers — Docling` | "Research papers on document conversion, layout analysis, and AI document processing." |
| Blog | `Blog — Docling` | "Tutorials and updates from the Docling team." |
| Blog post | `{post.title} — Docling` | `post.summary` |
| FAQ | `FAQ — Docling` | "Frequently asked questions about installing and using Docling." |
| Releases | `Releases — Docling` | "Release history for Docling and its related packages." |

### `website/pages/blog.px`

Pass `title` and `description` to `<Page>` for individual post pages:

```python
<Page title={post.title} description={post.summary}>
```

### `website/pages/papers.px`, `faq.px`, `releases.px`

Pass the appropriate static `title` and `description` to `<Page>`.

## Files Touched

| File | Change |
|------|--------|
| `website/pages/page.px` | Accept `title` and `description` props |
| `website/pages/blog.px` | Pass post title and summary to `<Page>` |
| `website/pages/papers.px` | Pass static title/description to `<Page>` |
| `website/pages/faq.px` | Pass static title/description (created in Feature 2) |
| `website/pages/releases.px` | Pass static title/description (created in Feature 4) |

## Notes

- No new dependencies.
- The `og:url` and `og:type` meta tags are also currently missing — worth adding in the same PR:
  ```html
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.docling.ai{path}" />
  ```
  This requires passing the current path into `Page`, which can be done via a FastAPI `Request` dependency.
- This is a small, fully independent PR — it can land at any point in the roadmap.
