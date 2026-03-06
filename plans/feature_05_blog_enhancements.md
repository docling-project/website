# Feature 05 — Blog Enhancements (Tags, Reading Time, Featured Post)

Makes the blog listing more navigable and educational by adding tags for topic filtering, an estimated reading time, and a "featured" flag to highlight important posts.

## Current State

The blog listing (`website/pages/blog.px`) renders every post identically: title, date, and a one-line summary. Posts have no categorization, no reading time estimate, and no way to highlight a particularly important entry. The `Post` model has `id`, `date`, `title`, `summary`, and `html`.

## Proposed Changes

### Blog post front-matter

Extend each `post.md` front-matter with new optional fields:

```markdown
---
title: Understanding Docling's Chunking Strategy
date: 15-01-2025
summary: A deep dive into how Docling splits documents for RAG pipelines.
tags: chunking, rag, tutorial
featured: true
---
```

### `website/models/blog.py`

Parse the new fields from `md.Meta`:

```python
class Post(BaseModel):
    id: str
    date: datetime
    title: str
    summary: str
    html: str
    tags: list[str] = []
    featured: bool = False
    reading_time: int = 0   # minutes, computed from word count
```

Reading time computation (add to `_blog_post()`):

```python
word_count = len(post_html_text.split())
reading_time = max(1, round(word_count / 200))
```

### `website/pages/blog.px`

- **Featured post** — render the first `featured=True` post at the top in a larger card before the regular list.
- **Reading time** — show alongside the date: `Jan 15, 2025 · 4 min read`.
- **Tag chips** — render each tag as a small `<span class="tag">` badge on the post card.
- **Tag filter** — a row of tag buttons above the list that toggles a `.hidden` class on non-matching posts client-side (no server round-trip needed).

### `public/style.css`

```css
.tag { ... }          /* small pill badge */
.tag-filters { ... }  /* row of filter buttons above the post list */
.tag-filters button.active { ... }
.post.hidden { display: none; }
```

### `public/main.js` (or a new `public/blog.js`)

~20 lines to wire up the tag filter buttons:

```js
document.querySelectorAll('.tag-filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    const tag = btn.dataset.tag;
    // toggle active state and filter posts
  });
});
```

## Files Touched

| File | Change |
|------|--------|
| `blog/*/post.md` | Add optional `tags` and `featured` fields to front-matter |
| `website/models/blog.py` | Parse `tags`, `featured`, compute `reading_time` |
| `website/pages/blog.px` | Featured card, reading time display, tag chips and filter |
| `public/style.css` | Tag and filter styles |
| `public/main.js` | Tag filter interaction (or extract to `blog.js`) |

## Notes

- All new front-matter fields are optional — existing posts remain valid without modification.
- The tag filter should be progressive enhancement: if JS is disabled, all posts remain visible.
- Reading time is intentionally approximate (200 wpm) and rounds to a minimum of 1 minute.
- Keep the tag vocabulary small and consistent to avoid tag proliferation. A good starting set: `tutorial`, `rag`, `chunking`, `models`, `integrations`, `release`, `research`.
