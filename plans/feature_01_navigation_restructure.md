# Feature 01 — Navigation Restructure

Enables the suppressed Blog link and adds nav entries for the new pages introduced in later features (FAQ, Releases), keeping the header uncluttered as the site grows.

## Current State

- `website/pages/page.px:7` has a `# TODO: add when there are blog posts.` comment that suppresses the Blog nav link.
- The `Resources` dropdown contains: Start, Features, Papers.
- No links to Blog, FAQ, or a releases/changelog page.

## Proposed Changes

### `website/pages/page.px`

Remove the TODO comment and enable the Blog link. Add FAQ and Releases to the `Resources` dropdown:

```
Resources
├── Start          → /#start
├── Features       → /#features
├── Papers         → /papers/
├── Blog           → /blog/
├── FAQ            → /faq/
└── Releases       → /releases/
```

Consider promoting Blog to a top-level link (alongside Docs and Chat) if the dropdown feels overloaded.

### `website/main.py`

Add placeholder routes for `/faq/` and `/releases/` that return a minimal stub page, so nav links don't 404 before Features 2 and 4 land:

```python
@app.get("/faq/", response_class=HTMLResponse)
async def get_faq():
    return str(ComingSoonPage("FAQ"))

@app.get("/releases/", response_class=HTMLResponse)
async def get_releases():
    return str(ComingSoonPage("Releases"))
```

## Files Touched

| File | Change |
|------|--------|
| `website/pages/page.px` | Enable Blog link, add FAQ + Releases to dropdown |
| `website/main.py` | Add stub routes for `/faq/` and `/releases/` |

## Notes

- No new dependencies.
- Stub pages can be a single component: `<Page><main><h1>Coming soon</h1></main></Page>`.
- This PR should land first — it unblocks all other features from being navigable.
