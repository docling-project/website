# Docling website makeover — feedback plan

Consolidated, code-mapped plan for the redesign feedback round. Organised into
**iterations** so they can be picked up independently after handoff. Each item
notes: **what**, **where** (file:line), **type** (fix / copy / reorder / content
/ design), and any **open decision**.

Branch: `dev/update-the-website` (redesign). Original site is on `main`.

Confirmed decisions (2026-08-18):
- "Product" nav tab → **"Overview"**. Footer "Product" column → rename too (approved).
- **DocTags is obsolete — remove every mention. Use DocLang only** (link https://doclang.ai).
- Blog filter: no functional break reproduced in static build *or* dev server
  (`localhost:5001`); filtering + URL sync work, no console errors. Treated as:
  empty "New feature" tag + fragile native form-submit + tag naming. Revisit if a
  hard repro surfaces.
- Iteration 1 = plan-approved before building.

---

## Homepage section map (current)

`website/pages/home.px:32-44` renders, in order:

1. `Hero` — "Your documents are more than text" (`components/hero.px`, copy in `data/product.py`)
2. `ProofStrip` — stats/badges strip (`components/proof_strip.px`, `data/proof.py`)
3. `DocumentDemo` — "See what survives conversion" (`components/document_demo.px`, `data/samples.py`)
4. `CapabilityGrid` — "What you get that a text extractor cannot give you" (`components/capability_grid.px`) — `#product` anchor
5. `Matrix` — "Four jobs, one document model" (`components/matrix.px`, `data/product.py`)
6. `Quickstart` — "Start in under a minute" (`components/quickstart.px`)
7. `DeploymentContinuum` — "From laptop to production" (`components/deployment_continuum.px`)
8. `UseCaseGrid` → 9. `RunRoutes` → 10. `Ecosystem` → 11. `Latest` → 12. `FinalCTA`

---

## Iteration 1 — fixes, rephrasing, reorder (low risk)

### 1.1 Hero animation freeze — FIX ✅ DONE
- **Where:** `public/js/hero-demo.js:12-14, 50-87`; dots in `components/hero.px:59-68`.
- **Problem:** `MAX_LOOPS = 3` → after 3 passes sets `finished=true`, stops, and
  *hides the pause button* → reads as "stuck / timeout". Stage dots have no click
  handler, so "clicking around" does nothing.
- **Do:** remove `MAX_LOOPS`/`finished`; loop indefinitely; keep pause button always
  visible; add click handlers to stage dots (jump to stage + pause). Keep
  reduced-motion, `visibilitychange`, and IntersectionObserver gating.
- **Verify:** live in browser (loops, pause/resume, dot-click).

### 1.2 Move Quickstart up — REORDER ✅ DONE
- **Where:** `website/pages/home.px:32-44`.
- **Do:** move `<Quickstart />` to directly after `<ProofStrip />`, before
  `<DocumentDemo />`. Result: Hero → ProofStrip → **Quickstart** → DocumentDemo →
  CapabilityGrid → Matrix → … (rest unchanged).

### 1.3 Hero lead paragraph — COPY ✅ DONE
- **Where:** `website/data/product.py:16-25` (`HERO_SUBTITLE`, `HERO_SUBTITLE_2`).
- **Problem:** opens on internals ("preserves the structure…").
- **Do:** lead with plainly *what Docling does*. Proposed:
  > "Docling converts messy documents — PDFs, Office files, HTML, images and audio —
  > into structured data, detecting tables, formulas, reading order, OCR and much more."
  Keep or trim `HERO_SUBTITLE_2` (local→scale line).

### 1.4 "Product" → "Overview" — COPY/IA ✅ DONE
- **Where:** `website/data/navigation.py:28` (nav label), `:46` (footer column title),
  section id `#product` in `components/capability_grid.px:20`.
- **Do:** nav label `"Product"` → `"Overview"` (href stays `/#product`). Footer
  column title `"Product"` → rename (e.g. "Overview" / "Explore"). Anchor id may stay
  `#product` to avoid churn, or rename to `#overview` (optional).

### 1.5 Header selectors: Docs external + swap with Blog — FIX/IA ✅ DONE
- **Where:** `website/data/navigation.py:27-35` (`PRIMARY_NAV`), `components/header.px:22-34`.
- **Do:** (a) swap order of `Docs` (external) and `Blog` so Blog precedes Docs (put the
  external link last, consistent with other external links). (b) Render an external-link
  icon next to external nav items — `external_icon()` exists in `components/icons.py:47`;
  add it in `NavLinks` when `item.external`.

### 1.6 Remove DocTags, use DocLang only — CONTENT/FIX ✅ DONE
- **Where (3 refs):**
  - `website/data/formats.py:52` — `EXPORT_GROUPS` "Structured": `["JSON", "DocTags"]` → `["JSON", "DocLang"]`. ✅
  - `website/data/product.py:132` — VALUES "model" body "…HTML and DocTags" → "…and DocLang". ✅
  - `website/data/deployments.py:22` — "Markdown / JSON / DocTags export" → "…DocLang export". ✅
- **Deferred:** the doclang.ai *link* + positive featuring = Iteration 2 (2.1); word swap only here.
- **Left intentionally:** `pages/papers/` SmolDocling abstract still says "DocTags" — it is a
  verbatim published paper abstract (DocTags is that paper's contribution). Editing it would
  misrepresent the publication. Flag for decision, not a silent change.

### 1.7 De-noise the stats/badges strip — CONTENT ✅ DONE
- Dropped **Forks**; strip is now GitHub stars + Contributors + Licence. `PROOF_FACTS`
  emptied (kept the list + a render guard so a fact can be re-added without churn).
- **Where:** `website/data/proof.py:24-38`; rendered by `components/proof_strip.px`.
- **Do:** `PROOF_ITEMS` — drop **Forks** (`:26`); keep GitHub stars + Contributors + Licence.
  `PROOF_FACTS` — remove "Runs locally", "LF AI & Data", "PyPI" (already hero chips /
  belong in footer); keep at most "Python · CLI · API · MCP", or drop `PROOF_FACTS`
  entirely so the strip is just the counts. Recommend: counts + licence only.

### 1.8 Provenance fields under the demo — CONTENT ✅ DONE
- **Where:** `components/document_demo.px:77-111` (`Provenance()`), data `data/samples.py:100-114`.
- **Problem:** "Status: Not yet reproduced" is meaningless to a normal reader on a
  static site; "Licence: CC BY 4.0" is irrelevant there.
- **Do:** remove the **Licence** and **Status** rows; keep **Source** (optionally the
  Regenerate command).

### 1.9 Hide Benchmarks — CONTENT ✅ DONE
- **Where:** `website/data/navigation.py:32` (nav), `:53` (footer column).
- **Problem:** the page (`pages/benchmarks.px`) reads as an excuse for missing evidence.
- **Do:** unlink from primary nav + footer (page/route stays reachable by URL,
  reversible). Full removal (also `build.py` + `seo.py` `STATIC_ROUTES`) optional.

### 1.10 Matrix — factual + tone fix + title rework — COPY ✅ DONE
- **Problem (all addressed):** overclaimed "same converter and the same output shape";
  false "one document model" (conversion → DoclingDocument/DocLang, extraction → user
  JSON schema — *not* one model); "low latency" too technical; title implied the 2×2 was
  the ceiling of Docling's utility.
- **Done:**
  - Title `"Four jobs, one document model"` → **"One document or a whole corpus — you're
    covered"**; eyebrow `"One pipeline"` → **"Ad-hoc to bulk"**.
  - Row labels `"Low latency" / "High throughput"` → **"One at a time" / "In bulk"**
    (data keys in `data/product.py` MATRIX + `MATRIX_MODES` kept in sync).
  - Columns kept: "Conversion for search" / "Extraction for databases" (user decision).
  - Lede rewritten: names the two axes plainly, states the two *different* outputs
    (DoclingDocument/DocLang vs. your schema), and explicitly de-narrows — "this grid
    isn't the limit: chunk, enrich or re-serialize downstream".
  - Internal docstrings/comments updated to match ("common jobs, not a limit").
- **Kept as-is:** the separate "One document model" value card (`product.py:129`) — it is
  accurate for the *conversion* side only, so it stands.
- **Still open:** structural/visual redesign of this block → Iteration 3 (3.2).

### 1.11 Blog tags — naming + empty tag — FIX/COPY ✅ DONE
- **Where:** `website/models/blog.py:44-70` (`BlogFilter` + `.label`), `pages/blog.px:29-42`.
- **Do:** rename labels (e.g. **Technical → "Deep dives"**; confirm others). Render
  filter buttons only for categories with ≥1 post (compute in `blog.px`), removing the
  empty "New feature" tag. Align README category slugs with the enum while here.
- **Note:** buttons are native `type="submit"` form submits → a JS-load failure silently
  degrades to the unfiltered list. Optional hardening: neutralise the submit fallback.

### 1.12 "Retrieval" use-case → visual grounding — COPY ✅ DONE
- Headline → **"Retrieval with visual grounding"**; `why_docling` reframed to region-level
  (page + bounding-box → highlight the exact region). Aligned `product.py:87` matrix cell
  ("traced back to the exact region on the page"). `samples.py` provenance layer already region-level.
- **Where:** `website/data/use_cases.py:29, 37-41`.
- **Do:** headline "Retrieval that can cite the page it came from" → **"Retrieval with
  visual grounding"**. Reframe `why_docling` from page-granularity to *fine-grained
  provenance*: every element/chunk keeps page **and bounding-box** coordinates, enabling
  visual grounding (highlight the exact region), not just a page citation.
- **Related copy to align:** `data/product.py:88`, `data/samples.py:285` (provenance layer).

### 1.13 Verbose section titles — COPY ✅ DONE
- `capability_grid.px:24` "What you get that a text extractor cannot give you" →
  **"Built for structure, not just text"**.
- `use_case_grid.px:79` "What people actually build with it" → **"What people build with it"**.
- `sections.px:67` "What the project is doing" → **"Latest activities"**.
- Kept (per sign-off): `deployment_continuum.px:21` "From laptop to production, without a
  rewrite"; plus the already-concise titles (`sections.px:25`, `matrix.px:27`,
  `quickstart.px:16`, `ecosystem.px:43`, `document_demo.px:104`).

### 1.14 Drop "proof/prove" from user-visible copy — COPY ✅ DONE
- **Rationale:** the word reads as "proof/evidence"; intended meaning is "convince
  yourself / see for yourself".
- **Done (visible strings only):**
  - `components/document_demo.px:103` — section eyebrow `"Product proof"` →
    **"See for yourself"**.
  - `data/product.py:22` — hero `"…and prove it on your own documents"` →
    **"…and try it on your own documents"**.
- **Deliberately kept (not reader-visible, per decision):** code identifiers and
  the `#proof` anchor — `ProofStrip`, `proof_strip.px`, `data/proof.py`,
  `PROOF_ITEMS`, `PROOF_FACTS`, `.proof-*` CSS, `#proof` id + its refs
  (`product.py:126`, `formats.px:68`, `hero.px:136`), and internal docstrings.
- **Unrelated, left alone:** `blog/20260315_00_the_latex_story/post.md:164`
  ("theorem-style statements and proofs" = mathematical proofs).

---

## Iteration 2 — content additions & refocus (medium)

_Validated 2026-08-18 (post-iteration-1). All four items still target real, unaddressed
work; iteration 1 did not do any of them. Line refs re-anchored below; one caveat on 2.4._

**Decision 2026-08-18 — merge 2.1 + 2.2 into ONE homepage section.** Background from
maintainer: DocLang is an open, standardized export format Docling produces; it is *the*
format that preserves full-fidelity conversion (vs. lossy Markdown/HTML/text). Convert once
from any input → keep everything in DocLang → re-serialize to other formats later without
reconverting. Do **not** explain DoclingDocument-vs-DocLang internals — just "Docling
produces DocLang". The two items are the two halves of one arc (breadth in → faithful
standard format out), so they ship as a single narrative section: **"Convert once,
re-serialize forever."** Input breadth (2.2, incl. the Office-richness-others-drop point)
is the "in" side; DocLang portability (2.1) is the "out" side; lossy Markdown/HTML are
regenerable views, not the stored artifact.

### 2.1 + 2.2 shipped as one section — ✅ DONE (2026-08-18)
- **New component:** `components/portability.px` (`Portability`), placed on the homepage
  after `DocumentDemo`, before `CapabilityGrid` (`pages/home.px`). Section id `#portability`,
  title **"Convert once, reuse forever"**. Copy leads on PDF (the hard case), avoids jargon
  ("re-serialize"/"views" cut), and states that inputs normalize into DocLang while each
  format's own detail (PDF tables/reading order, Word structure/comments) is preserved.
- **Shape:** section lede (breadth + Office-richness-others-drop + DocLang) over a 3-card
  arc — **Any format in** (input chips) → **DocLang** (accent anchor card, links
  https://doclang.ai) → **Any format out, anytime** (output chips). Chip lists in
  `data/formats.py` (`HOME_INPUTS`, `HOME_OUTPUTS`); full matrix still lives on `/formats/`
  (linked via the section header "All formats").
- **CSS:** one new rule `.card--anchor` (accent-soft bg + accent-line border) in
  `components.css`; everything else reuses existing `.grid grid--3`, `.card`, `.tag`,
  `.chip-row`, `.section-lede`.
- **Deliberately left alone:** the `CapabilityGrid` "One document model" value card — it is
  complementary (1 line in a 4-grid) and does not conflict; DoclingDocument-vs-DocLang
  internals intentionally not explained.

### 2.1 Feature DocLang as the portability story — CONTENT
- **Where:** homepage "One document model" value (`data/product.py:135-145`, the `id="model"`
  `Value`); consider a dedicated callout/section; `/formats/` export section
  (`data/formats.py:48-59`, `EXPORT_GROUPS` "Structured" already lists `["JSON", "DocLang"]`).
- **Validated:** DocLang is now *named* (word-swap from 1.6) in that value body and in
  `EXPORT_GROUPS`, but the **doclang.ai link is still absent everywhere** and DocLang is not
  yet *featured* as a differentiator. Task stands as written.
- **Do:** present DocLang (https://doclang.ai) as a key differentiator — a unified,
  portable document representation that travels across the ecosystem. Link doclang.ai.
  (Builds on the DocTags removal in 1.6.)

### 2.2 Input-format breadth story — CONTENT
- **Where:** data exists in `data/formats.py:19-45` (`IMPORT_GROUPS`) but only on
  `/formats/`; not surfaced on the homepage. Reference: `docling_release/README.md:35,52`
  (PDF, DOCX, PPTX, XLSX, HTML, EPUB, WAV, MP3, WebVTT, EML/MSG, images, ODF, LaTeX, …).
- **Validated:** unchanged and still homepage-absent. `IMPORT_GROUPS` "Rich" group already
  frames PDF/DOCX/PPTX as "layout carries meaning" — a ready hook for the Office-conversion
  angle. Task stands.
- **Do:** add a homepage section/narrative that Docling **unifies a wide range of input
  formats**. PDF stays the primary hero story; explicitly call out that *rich* conversion
  of Office formats (Word/PowerPoint — graphics, shapes, charts, embedded tabular data)
  is non-trivial and silently dropped by most other converters. Position this as a
  differentiator, not a trivial checkbox.

### 2.3 Refocus Deployments on docling-serve — CONTENT/IA
- **Where:** `pages/deployments.px`, `data/deployments.py`; homepage `DeploymentContinuum`
  (`components/deployment_continuum.px`, stages in `data/product.py:263-304` `CONTINUUM`).
- **Problem:** current Deployments reads as commercial product-page material (managed
  SaaS / on-prem framed as offerings).
- **Update 2026-08-18 — partial, per maintainer direction (middle-ground, not full de-IBM).**
  - **Homepage continuum** (`product.py` `CONTINUUM`): collapsed the `saas` + `private`
    stages into ONE commercial item — id `commercial`, name "Managed & private — commercial",
    experience names it as IBM's commercial offering (managed SaaS **or** private/on-prem),
    CTA "Docling for IBM watsonx" → `ibm.com/products/watsonx-ai`. Continuum is now 3 stages:
    Local library → Docling Serve → commercial.
  - **Deployments page** (`data/deployments.py`): `on-prem` mode CTA repointed to the IBM
    product page (label "Docling for IBM watsonx"), matching the `saas` mode — private/on-prem
    is now presented as available through the IBM commercial offering "for now".
  - Removed the **"Pick the path that matches where you are"** section from `deployments.px`
    (+ its `VISITOR_STATES` / `SectionHeader` imports; `VISITOR_STATES` data def left in place,
    unused).
- **Homepage parity table removed (2026-08-18).** `deployment_continuum.px` "What stays the
  same" table pulled entirely (maintainer: "too much vague or half-truth information"). Dropped
  the `PARITY` import/usage; `PARITY` / `ParityRow` data defs left in `product.py` (unused,
  reversible). Homepage continuum is now just the three stages. Both parity tables (this one +
  the deployments-page one from 2.4) are now gone.
- **Still deferred (not done):** making docling-serve the *primary* narrative and de-emphasising
  the remaining sales-page tone across `deployments.px` copy. This edit was the middle-ground
  IBM-consolidation only.

### 2.4 "Feature parity across modes" + note — COPY
- **Where:** `pages/deployments.px` — title at `:77`, `Notice` at `:106-115`; homepage
  parity table `data/product.py:321-328` (`PARITY`, incl. "More operations, same parser"
  at `:327`).
- **Update 2026-08-18 — table removed.** Maintainer: the parity table is "not ready and even
  factually wrong". Removed the whole `#compare` section from `deployments.px` (SectionHeader
  "Feature parity across modes" + table + Notice — the Notice referenced "specifics that this
  table cannot carry", so it went too). Dropped now-unused imports (`MODE_COLUMNS`,
  `PARITY_MATRIX`, `Notice`). Repointed the two `/deployments/#compare` anchors in
  `data/deployments.py` → `/deployments/` so nothing links into the deleted section.
  `PARITY_MATRIX` / `MODE_COLUMNS` **data definitions kept** in `data/deployments.py` (unused,
  reversible — "for now").
- **Still open:** (a) the two CTAs that used to point at the table — on-prem card "Review
  deployment options" and VISITOR "Needs an architecture review → Compare deployments" — now
  land on the page top; their labels over-promise a comparison that no longer exists (fold
  into 2.3). (b) homepage `deployment_continuum.px` "What stays the same" table (`product.py`
  `PARITY`, incl. "More operations, same parser") is a *separate* table, left untouched —
  revisit whether it has the same accuracy problem.

---

## Iteration 3 — design reworks (larger)

### 3.1 Extend "See what survives conversion" — DESIGN
- **Where:** `components/document_demo.px`, `LAYERS` in `data/samples.py:122-309`
  (currently: reading-order, tables, pictures, formulas, chunks, provenance).
- **Problem:** prettier than the old clickable matrix but weaker — can't show table
  **cell structure**, **image descriptions**, and similar detail the old one could.
- **Do:** plan how to extend the demo to expose finer detail (cell-level table structure,
  picture descriptions/classification, etc.) without losing the current visual clarity.
  Coordinate with `data/formats.py:68-74` `EXTRACT_GROUPS` (already lists Table→Cell,
  Picture→Description) as the target inventory.

### 3.2 Matrix — feature the four concepts visually — DESIGN
- **Where:** `components/matrix.px`, `data/product.py:58-102`.
- **Do:** beyond the Iter-1 copy fix, present low-latency / high-throughput / conversion /
  extraction more simply and visually; stop over-prescribing "what Docling is for".

### 3.3 Ecosystem — visual diagram instead of tiles — DESIGN
- **Where:** `components/ecosystem.px`, `data/integrations.py` (5 groups: frameworks,
  agents/MCP, data/pipelines, infrastructure, retrieval).
- **Problem:** over-structured; dry tabular grouping tiles.
- **Do:** replace tiles with a more visual treatment — a hub-and-spoke / "arms" diagram
  with Docling at the centre and the integration groups radiating out. Keep every entry a
  real link (no logo wall).

---

## Cross-cutting — tone pass (any iteration)

- **D3 (general "LLM smell"):** overconfident tone without enough substance, pervasive in
  `data/product.py`, `data/proof.py`, and section ledes. Do a dedicated tightening pass —
  prefer concrete, checkable claims over superlatives. Fold into whichever iteration
  touches each string, plus a final sweep.

---

## Quick index by file

- `public/js/hero-demo.js` — 1.1
- `website/pages/home.px` — 1.2
- `website/data/product.py` — 1.3, 1.6, 1.10, 2.1, 2.4, 3.2, D3
- `website/data/navigation.py` — 1.4, 1.5, 1.9
- `website/components/header.px` — 1.5
- `website/components/hero.px` — 1.1
- `website/data/formats.py` — 1.6, 2.2, 3.1
- `website/data/deployments.py` — 1.6, 2.3
- `website/data/proof.py` — 1.7, D3
- `website/components/document_demo.px` — 1.8, 3.1
- `website/data/samples.py` — 1.8, 1.12, 3.1
- `website/pages/benchmarks.px` (+ nav/footer) — 1.9
- `website/components/matrix.px` — 1.10, 3.2
- `website/models/blog.py`, `website/pages/blog.px` — 1.11
- `website/data/use_cases.py` — 1.12
- `website/components/capability_grid.px` — 1.4, 1.13
- `website/pages/deployments.px` — 2.3, 2.4
- `website/components/ecosystem.px`, `website/data/integrations.py` — 3.3
