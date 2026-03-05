# Feature 04 — Release Timeline ("What is New?")

Adds a `/releases/` page with an interactive, zoomable timeline showing all releases across the Docling package family, with controls to switch between daily, weekly, monthly, and quarterly views.

## Current State

No release history is surfaced on the website. Users who want to track what changed across `docling`, `docling-core`, `docling-parse`, and `docling-serve` must navigate four separate GitHub release pages.

## Proposed Changes

### GitHub Action: `.github/workflows/fetch_releases.yml` (new)

Fetches releases from the GitHub API for all tracked packages and writes a static `public/releases.json`. Runs on a nightly schedule and can be triggered manually.

Packages tracked:
- `docling-project/docling`
- `docling-project/docling-core`
- `docling-project/docling-parse`
- `docling-project/docling-serve`

Output schema:

```json
[
  {
    "package": "docling",
    "version": "2.14.0",
    "date": "2025-02-28",
    "url": "https://github.com/docling-project/docling/releases/tag/v2.14.0",
    "body": "## What's Changed\n- ..."
  }
]
```

### `public/releases.json` (new, generated)

Static asset committed to the repo (or generated at build time). The page loads it client-side, so no server query is needed at runtime.

### `website/pages/releases.px` (new)

Minimal server-rendered shell that loads the vis-timeline JS library and passes the static data path. The heavy lifting happens client-side.

### `website/main.py`

Replace the stub route from Feature 1 with the real `ReleasesPage`.

### `public/releases.js` (new)

Client-side script that:
1. Fetches `/releases.json`
2. Builds a `vis.DataSet` with one group per package (color-coded)
3. Renders a `vis.Timeline` into a `#timeline` container
4. Wires up the time-range toggle buttons (Day / Week / Month / Quarter) to call `timeline.setWindow()`
5. On item click, opens the GitHub release URL

```js
const RANGES = {
  day:     7 * 24 * 3600 * 1000,
  week:    4 * 7 * 24 * 3600 * 1000,
  month:   6 * 30 * 24 * 3600 * 1000,
  quarter: 2 * 365 * 24 * 3600 * 1000,
};
```

### `public/style.css`

- `.timeline-controls` — flex row of toggle buttons above the chart
- Minor overrides for the vis-timeline default theme to match the site's dark/light color scheme via CSS variables

## Dependencies

- **vis-timeline** — loaded from CDN (`https://cdn.jsdelivr.net/npm/vis-timeline`). Adds ~200 kB to the page, isolated to `/releases/` only.

## Files Touched

| File | Change |
|------|--------|
| `.github/workflows/fetch_releases.yml` | New — nightly GitHub Action |
| `public/releases.json` | New (generated) — release data |
| `website/pages/releases.px` | New — page shell |
| `website/main.py` | Replace stub route |
| `public/releases.js` | New — timeline client script |
| `public/style.css` | Timeline controls + theme overrides |

## Notes

- The GitHub API returns up to 100 releases per page; the Action should handle pagination for packages with a long history.
- `releases.json` should be committed so the page works even without the Action having run yet (seed it manually for the first PR).
- A release's `body` field (the GitHub release notes Markdown) can be shown in a tooltip or a side panel on item click, giving a compact changelog view without leaving the page.
- Consider also including `docling-mcp` and `docling-ts` in the tracked packages as those projects mature.
