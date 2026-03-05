# Feature 02 — FAQ Page

Adds a dedicated `/faq/` page with categorized, accordion-style questions and answers to help users quickly resolve common blockers without digging through documentation.

## Current State

No FAQ exists. Common questions (installation issues, supported formats, output options, integrations) are only answerable via the docs or GitHub issues.

## Proposed Changes

### `website/faq.json` (new)

Stores FAQ content as structured data, keeping questions editable without touching code:

```json
{
  "sections": [
    {
      "title": "Installation",
      "items": [
        {
          "question": "How do I install Docling?",
          "answer": "Run `pip install docling`. See the [docs](https://docling-project.github.io/docling) for optional extras."
        }
      ]
    },
    {
      "title": "Supported Formats"
    },
    {
      "title": "Output & Exports"
    },
    {
      "title": "Integrations"
    },
    {
      "title": "Performance & Models"
    }
  ]
}
```

### `website/models/faq.py` (new)

Pydantic model to load and validate `faq.json`, following the same pattern as `models/papers.py`.

### `website/pages/faq.px` (new)

Renders each section as a heading with `<details>`/`<summary>` accordions beneath. The existing `details` CSS in `style.css:587` covers this out of the box — no new styles needed.

### `website/main.py`

Replace the stub route from Feature 1 with the real `FaqPage`.

### `website/pages/page.px`

Update the nav stub added in Feature 1 to point at `/faq/` (already done if Feature 1 landed).

## Files Touched

| File | Change |
|------|--------|
| `website/faq.json` | New — FAQ content |
| `website/models/faq.py` | New — Pydantic model + loader |
| `website/pages/faq.px` | New — page component |
| `website/main.py` | Replace stub route with real `FaqPage` |

## Notes

- No new dependencies.
- Answers support Markdown if rendered through the existing `markdown` library, or can be plain HTML strings for simplicity.
- The FAQ data file should be easy for non-developers to edit — keep the JSON schema flat and well-commented.
- Consider adding a brief intro paragraph at the top: "Can't find your answer? Ask in [Discord] or open a [GitHub issue]."
