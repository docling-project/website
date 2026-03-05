# Feature 07 — Live Demo / Playground Section

Adds a "Try it" entry point on the home page that lets visitors experience Docling without installing anything, lowering the barrier for evaluators and new users.

## Current State

The "Start" section (`website/pages/home.px:65`) shows install instructions, a CLI example, and a code snippet. There is no interactive path — users must install the library locally before seeing any output.

## Proposed Changes

The simplest viable approach depends on infrastructure availability. Options are listed from lowest to highest effort:

### Option A — Link to hosted notebook (Low effort)

Add a "Try in Colab" button on the home page and in the Start section:

```html
<a class="button" href="https://colab.research.google.com/...">
  Try in Colab
</a>
```

Requires: a maintained Colab notebook in the `docling-project` org.

### Option B — Link to docling-serve demo instance (Medium effort)

If a public `docling-serve` instance is available, embed a minimal form on the website:
- A URL input field
- A "Convert" button that POSTs to docling-serve and displays the Markdown output
- Fallback message if the demo instance is unavailable

This requires a stable, publicly accessible docling-serve deployment (e.g., on HuggingFace Spaces).

### Option C — Embedded HuggingFace Space (Low-Medium effort)

Embed a HuggingFace Space Gradio demo via `<iframe>` in a new section or modal. HuggingFace Spaces handles the compute; the website just hosts the embed.

```html
<iframe src="https://huggingface.co/spaces/docling-project/demo" ...></iframe>
```

## Recommendation

Start with **Option A** (Colab link) as an immediate win. Progress to **Option C** (HuggingFace Space) once a maintained demo Space exists. Option B requires the most coordination but gives the most integrated experience.

### `website/pages/home.px`

- Add a "Try it" row in the Start section with button(s) pointing to the available demo option(s).
- The section header can change from "Start" to "Start & Try".

### `public/style.css`

- `.demo-embed` — constrained iframe container with a fallback message for browsers that block iframes

## Files Touched

| File | Change |
|------|--------|
| `website/pages/home.px` | Add "Try it" buttons / embed to Start section |
| `public/style.css` | Demo embed container styles (if using iframe) |

## Notes

- Any embedded demo must have a clear "powered by docling-serve" attribution and a link to the self-hosting docs.
- Rate-limit and abuse considerations apply to Option B — the demo instance should be sandboxed (no local file access, URL allowlist, short timeouts).
- Even a simple Colab link is valuable: it gives a zero-install, shareable path into the library that can be linked from docs, blog posts, and social media.
