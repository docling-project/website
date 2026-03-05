# Feature 03 — Enhanced Papers (Abstract, BibTeX, Figures)

Enriches the papers listing with expandable abstracts, a one-click BibTeX download, and optional figure previews with captions — turning the page from a bare link list into a genuine reference section.

## Current State

Each paper in `papers/index.json` only has `venue`, `title`, and `url`. The papers page (`website/pages/papers.px`) renders a flat list of title links grouped by year. No abstracts, no citation support, no visuals.

## Proposed Changes

### `papers/index.json`

Extend each paper entry with optional new fields:

```json
{
  "venue": "AAAI",
  "title": "Docling: An Efficient Open-Source Toolkit for AI-driven Document Conversion",
  "url": "https://arxiv.org/abs/2501.17887",
  "arxiv_id": "2501.17887",
  "abstract": "We present Docling...",
  "bibtex": "@inproceedings{docling2025,\n  title={...},\n  ...}",
  "figures": [
    { "src": "img/papers/2501.17887/fig1.png", "caption": "Pipeline overview." }
  ]
}
```

All new fields are optional so existing entries remain valid without changes.

### `website/models/papers.py`

Add optional fields to the `Paper` model:

```python
class PaperFigure(BaseModel):
    src: str
    caption: str

class Paper(BaseModel):
    venue: str
    title: str
    url: str
    arxiv_id: str | None = None
    abstract: str | None = None
    bibtex: str | None = None
    figures: list[PaperFigure] = []
```

### `website/pages/papers.px`

Redesign the `Paper` component to include:

- **Abstract toggle** — a `<details>`/`<summary>` dropdown below the title. Already styled by `style.css:587`.
- **Cite button** — an `<a download="paper.bib" href="data:...">Cite</a>` link that triggers a `.bib` file download client-side, or a small inline code block showing the BibTeX.
- **Figure strip** — if `figures` is non-empty, render a horizontally scrollable row of `<figure>` thumbnails with `<figcaption>`. On click, expand to a lightbox or full-width view.

### `public/img/papers/` (new folder)

Store per-paper figure images as `public/img/papers/{arxiv_id}/fig1.png`, etc.

### `public/style.css`

Minor additions:
- `.paper-figures` — horizontal scroll strip for figure thumbnails
- `.cite-btn` — small secondary button style (can reuse existing `.button` with a size modifier)

## Files Touched

| File | Change |
|------|--------|
| `papers/index.json` | Add `abstract`, `bibtex`, `arxiv_id`, `figures` fields |
| `website/models/papers.py` | Extend `Paper` model with new optional fields |
| `website/pages/papers.px` | Redesign `Paper` component with abstract, cite, figures |
| `public/img/papers/` | New folder for per-paper figure images |
| `public/style.css` | Add styles for figure strip and cite button |

## Notes

- BibTeX can be inlined in `papers/index.json` or auto-derived for arXiv papers from the `arxiv_id` field (arXiv exposes a BibTeX endpoint at `https://arxiv.org/bibtex/{id}`). The latter avoids duplicating data.
- For arXiv papers, abstracts can also be fetched from the arXiv API at build time and cached in the JSON, rather than hand-authored.
- Figure images should be small thumbnails (~400px wide WebP) to keep page weight low. Full-res can be linked from the paper URL.
- This feature is a prerequisite for Feature 6 (docling-ts viewer), which reuses the per-paper static assets infrastructure set up here.
