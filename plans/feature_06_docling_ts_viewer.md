# Feature 06 — docling-ts Paper Viewer

Integrates the [docling-ts](https://github.com/docling-project/docling-ts) library to render Docling's own papers directly in the browser — parsed by Docling itself. A compelling "dogfooding" demo that showcases the library's capabilities.

## Current State

Papers are displayed as a list of links (enhanced with Feature 03). There is no in-browser visualization of document structure.

## Prerequisites

- Feature 03 must be merged (provides the per-paper static asset infrastructure).
- Docling must be run offline to pre-process each paper PDF into a Docling Document JSON.

## Proposed Changes

### Pre-processing pipeline: `scripts/process_papers.py` (new)

An offline script (not part of the server) that:
1. Reads `papers/index.json`
2. For each paper with an `arxiv_id`, downloads the PDF from arXiv
3. Runs Docling conversion and exports to JSON
4. Writes the output to `public/papers/{arxiv_id}/docling.json`

```bash
uv run python scripts/process_papers.py
```

This script is run manually or in CI when a new paper is added. The resulting JSON files are committed as static assets.

### Optional GitHub Action: `.github/workflows/process_papers.yml`

Runs `process_papers.py` when `papers/index.json` changes and opens a PR with the new JSON files.

### `website/pages/papers.px`

Add a "View in Docling" button to each paper that has a `public/papers/{arxiv_id}/docling.json`. The button opens a modal or expands an inline viewer.

### `public/paper-viewer.js` (new)

Client-side script that:
1. Loads `docling-ts` from a CDN or bundled asset
2. Fetches the paper's `docling.json`
3. Instantiates the docling-ts viewer in a `<dialog>` or dedicated `<div>`

```js
import { DoclingViewer } from 'docling-ts';

async function openViewer(arxivId) {
  const data = await fetch(`/papers/${arxivId}/docling.json`).then(r => r.json());
  const viewer = new DoclingViewer(document.getElementById('paper-viewer'));
  viewer.load(data);
  document.getElementById('paper-modal').showModal();
}
```

### `public/style.css`

- `.paper-viewer-modal` — full-screen `<dialog>` with a close button
- Overrides for docling-ts default styles to match the site theme

## Files Touched

| File | Change |
|------|--------|
| `scripts/process_papers.py` | New — offline pre-processing script |
| `.github/workflows/process_papers.yml` | New (optional) — CI automation |
| `public/papers/{arxiv_id}/docling.json` | New (generated) — one file per paper |
| `website/pages/papers.px` | Add "View in Docling" button |
| `public/paper-viewer.js` | New — viewer client script |
| `public/style.css` | Modal and viewer theme overrides |

## Dependencies

- `docling` Python package (already a project dependency for running the pre-processing script)
- `docling-ts` JS library (loaded from CDN or bundled; isolated to the papers page)

## Notes

- The `docling.json` files can be large (several MB for dense PDFs). Consider gzip compression and lazy loading — only fetch when the user clicks "View in Docling".
- Not all papers in `papers/index.json` are from the Docling team; third-party papers may have download restrictions. Apply the viewer only to papers with confirmed open-access PDFs (arXiv papers are safe).
- This feature is intentionally the last in the roadmap. It has the highest effort but also the highest demo value — showing Docling parsing its own research papers is a strong proof-of-concept for new users.
