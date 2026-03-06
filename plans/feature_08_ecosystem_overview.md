# Feature 08 — Package Ecosystem Overview Page

Adds a `/ecosystem/` page (or a home-page section) that gives newcomers a clear mental map of the Docling package family — what each package does, how they relate, and where to go next.

## Current State

The Docling project has grown to multiple packages (`docling`, `docling-core`, `docling-parse`, `docling-serve`, `docling-mcp`, `docling-ts`) but the website presents only the core library. Visitors who arrive from a search for "docling serve" or "docling mcp" have no overview of how the pieces fit together.

## Proposed Changes

### Option A — Home page section (Lower effort)

Add a new `<section id="ecosystem">` on the home page between the Start and Features sections. Render a card grid where each card has:
- Package name and a one-line description
- The primary use case ("Deploy as an API", "Use in agents", "Render in the browser")
- Links to the GitHub repo and, if applicable, the package docs

### Option B — Dedicated `/ecosystem/` page (Higher effort, more complete)

A standalone page with:
- A visual diagram (SVG or a simple CSS flexbox layout) showing the dependency/relationship graph
- Per-package cards with: description, install command, links
- A "Which package do I need?" decision guide

## Recommendation

Start with **Option A** (home page section) for immediate value, then promote to a full page if there is enough content to justify it.

### Data file: `website/ecosystem.json` (new)

```json
[
  {
    "name": "docling",
    "description": "Core document conversion library.",
    "install": "pip install docling",
    "github": "https://github.com/docling-project/docling",
    "docs": "https://docling-project.github.io/docling"
  },
  {
    "name": "docling-serve",
    "description": "REST API wrapper for deploying Docling as a service.",
    "install": "pip install docling-serve",
    "github": "https://github.com/docling-project/docling-serve"
  },
  {
    "name": "docling-mcp",
    "description": "Model Context Protocol server for agentic access to Docling.",
    "github": "https://github.com/docling-project/docling-mcp"
  },
  {
    "name": "docling-ts",
    "description": "TypeScript library for rendering Docling Documents in the browser.",
    "github": "https://github.com/docling-project/docling-ts"
  }
]
```

### `website/models/ecosystem.py` (new)

Pydantic model matching the JSON schema above.

### `website/pages/home.px` or `website/pages/ecosystem.px`

Render the package cards from the data file.

### `public/style.css`

- `.ecosystem-grid` — responsive card grid, similar to the existing `.starters` layout

## Files Touched

| File | Change |
|------|--------|
| `website/ecosystem.json` | New — package data |
| `website/models/ecosystem.py` | New — Pydantic model + loader |
| `website/pages/home.px` | Add ecosystem section (Option A) |
| `website/pages/ecosystem.px` | New page (Option B only) |
| `website/main.py` | Add `/ecosystem/` route (Option B only) |
| `public/style.css` | Ecosystem grid styles |

## Notes

- The "Start" section already links to docling-serve and docling-mcp individually (`home.px:87–102`). The ecosystem section would consolidate and expand this.
- Keep descriptions to one sentence each — this is a navigation aid, not documentation.
- Update this page whenever a new package joins the project.
