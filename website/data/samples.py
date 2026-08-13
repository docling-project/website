"""Canonical sample documents and the annotation layers drawn over them.

Every sample carries provenance: where the source came from, which Docling
version produced the output, and the exact command that regenerates it. When
``verified`` is False the UI says so in plain text rather than presenting the
excerpt as a reproduced result — the strategy forbids hardcoding output that
cannot be regenerated, so the honest state is visible instead of hidden.

To promote a sample to verified:
    1. pin DOCLING_VERSION below to the release actually used;
    2. run the sample's ``regenerate`` command against ``source_url``;
    3. paste the real output into the excerpt fields;
    4. set ``verified=True``.
"""

from __future__ import annotations

from dataclasses import dataclass, field


# Pin this to the Docling release used to regenerate every sample below.
DOCLING_VERSION = "TODO: pin release"


@dataclass(frozen=True)
class Shape:
    """One annotation primitive, in the page's own coordinate space."""

    kind: str  # "rect" | "line" | "polyline" | "path"
    # rect
    x: float = 0
    y: float = 0
    width: float = 0
    height: float = 0
    # line
    x1: float = 0
    y1: float = 0
    x2: float = 0
    y2: float = 0
    # polyline / path
    points: str = ""
    d: str = ""
    # presentation
    style: str = "box"  # "box" | "rule" | "flow" | "chunk"
    label: str = ""


@dataclass(frozen=True)
class Layer:
    """A tab in the document demo: one facet of what Docling recovers."""

    id: str
    label: str
    title: str
    body: str
    page: str  # image asset the shapes are drawn over
    shapes: list[Shape] = field(default_factory=list)
    output_label: str = "Markdown"
    output: str = ""
    doc_link: str = ""


# Page geometry of the canonical sample. Both annotated pages are rendered at
# 914x1184, which is the coordinate space every shape below is expressed in.
PAGE_W = 914
PAGE_H = 1184

PAGE_MAIN = "/img/features-1.png"
PAGE_SEQ = "/img/features-2.png"
PAGE_FORMULA = "/img/features-3.png"


# Shown in the hero's final stage. An excerpt, so it stays legible at hero size.
HERO_OUTPUT = """## 5 EXPERIMENTS

The primary goal of DocLayNet is to obtain
high-quality ML models capable of accurate
document-layout analysis [...]

|                | human | MRCNN | FRCNN | YOLO |
|----------------|-------|-------|-------|------|
| Caption        | 84-89 |  68.4 |  70.1 | 77.7 |
| Table          | 77-81 |  82.2 |  82.2 | 86.3 |
| All            | 82-83 |  72.4 |  73.4 | 76.8 |"""


@dataclass(frozen=True)
class Sample:
    id: str
    title: str
    kind: str
    source_url: str
    license: str
    page: str
    regenerate: str
    verified: bool = False
    note: str = ""


CANONICAL_SAMPLE = Sample(
    id="doclaynet",
    title="DocLayNet: A Large Human-Annotated Dataset for Document-Layout Segmentation",
    kind="Academic paper — two columns, complex table, figure with caption, page header",
    source_url="https://arxiv.org/pdf/2206.01062",
    license="arXiv — CC BY 4.0",
    page=PAGE_MAIN,
    regenerate="docling https://arxiv.org/pdf/2206.01062 --to md --to json",
    verified=False,
    note=(
        "The annotation overlays trace the real page. The output excerpts are "
        "illustrative of the structure Docling recovers and have not yet been "
        "regenerated against a pinned release."
    ),
)


# --- Annotation layers -----------------------------------------------------
#
# Coordinates are carried over from the previous site, where they were tuned
# against these exact page images.

LAYERS: list[Layer] = [
    Layer(
        id="reading-order",
        label="Reading order",
        title="Reading order, not page order",
        body=(
            "A two-column page does not read top-to-bottom. Docling resolves the "
            "sequence a human would follow and stores components in that order, so "
            "text never interleaves across columns."
        ),
        page=PAGE_MAIN,
        doc_link="https://docling-project.github.io/docling/concepts/docling_document/",
        shapes=[
            Shape(
                kind="polyline",
                style="flow",
                points=(
                    "250,50 250,210 250,430 250,710 250,895 250,1000 "
                    "650,250 650,460 650,650 650,750 650,900 650,1100"
                ),
            )
        ],
        output_label="Markdown",
        output="""## 5 EXPERIMENTS

The primary goal of DocLayNet is to obtain high-quality ML models
capable of accurate document-layout analysis on a wide variety of
challenging layouts. [...]

## Baselines for Object Detection

In Table 2, we present baseline experiments (given in mAP) on Mask
R-CNN, Faster R-CNN, and YOLOv5. [...]""",
    ),
    Layer(
        id="tables",
        label="Tables",
        title="Table structure survives",
        body=(
            "Rows, columns and multi-level headers are recovered as structure — not "
            "flattened into a run of whitespace-separated numbers. Cells keep their "
            "spans, and the caption stays attached to the table it describes."
        ),
        page=PAGE_MAIN,
        doc_link="https://docling-project.github.io/docling/examples/export_tables/",
        shapes=[
            Shape(kind="rect", x=85, y=286, width=348, height=246, style="box", label="table"),
            Shape(kind="line", x1=75, y1=325, x2=443, y2=325, style="rule"),
            Shape(kind="line", x1=190, y1=276, x2=190, y2=545, style="rule"),
            Shape(kind="line", x1=240, y1=276, x2=240, y2=545, style="rule"),
            Shape(kind="rect", x=73, y=120, width=372, height=160, style="chunk", label="caption"),
        ],
        output_label="Markdown",
        output="""**Table 2**: Prediction performance (mAP@0.5-0.95) of object
detection networks on DocLayNet test set.

|                | human | MRCNN R50 | MRCNN R101 | FRCNN R101 | YOLO v5x6 |
|----------------|-------|-----------|------------|------------|-----------|
| Caption        | 84-89 |      68.4 |       71.5 |       70.1 |      77.7 |
| Footnote       | 83-91 |      70.9 |       71.8 |       73.7 |      77.2 |
| Formula        | 83-85 |      60.1 |       63.4 |       63.5 |      66.2 |
| List-item      | 87-88 |      81.2 |       80.8 |       81.0 |      86.2 |
| ...            |       |           |            |            |           |
| All            | 82-83 |      72.4 |       73.5 |       73.4 |      76.8 |""",
    ),
    Layer(
        id="pictures",
        label="Pictures",
        title="Figures, captions and classification",
        body=(
            "Pictures are extracted as image data, kept with their caption, and "
            "classified by content — so a chart is retrievable as a chart rather "
            "than lost as a gap in the text."
        ),
        page=PAGE_MAIN,
        doc_link="https://docling-project.github.io/docling/examples/export_figures/",
        shapes=[
            Shape(kind="rect", x=475, y=120, width=365, height=280, style="box", label="picture"),
            Shape(kind="rect", x=470, y=412, width=375, height=130, style="chunk", label="caption"),
        ],
        output_label="JSON",
        output="""{
  "pictures": [
    {
      "self_ref": "#/pictures/0",
      "label": "picture",
      "annotations": [
        { "kind": "classification", "predicted_class": "line_chart" }
      ],
      "captions": [ { "$ref": "#/texts/14" } ],
      "prov": [
        { "page_no": 6, "bbox": { "l": 475, "t": 120, "r": 840, "b": 400 } }
      ]
    }
  ]
}""",
    ),
    Layer(
        id="formulas",
        label="Formulas",
        title="Mathematics as LaTeX",
        body=(
            "Inline and display equations are detected and converted to LaTeX, so "
            "the notation stays searchable and renderable instead of degrading into "
            "broken glyph sequences."
        ),
        page=PAGE_FORMULA,
        doc_link="https://docling-project.github.io/docling/usage/enrichments/",
        shapes=[
            Shape(kind="rect", x=530, y=218, width=250, height=42, style="box", label="formula"),
            Shape(kind="rect", x=568, y=348, width=178, height=30, style="box", label="formula"),
        ],
        output_label="Markdown",
        output="""The estimator is defined as

$$\\hat{\\mu} = \\frac{1}{N} \\sum_{i=1}^{N} f(x_i)$$

with variance

$$\\sigma^2 = \\mathbb{E}[f(x)^2] - \\mu^2$$""",
    ),
    Layer(
        id="chunks",
        label="Chunks",
        title="Chunks that respect structure",
        body=(
            "Docling partitions the document into contiguous, structure-aware chunks "
            "ready for embedding — split on real boundaries such as sections and "
            "tables rather than on a fixed character count."
        ),
        page=PAGE_MAIN,
        doc_link="https://docling-project.github.io/docling/concepts/chunking/",
        shapes=[
            Shape(
                kind="polyline",
                style="chunk",
                points="70,1080 70,875 445,875 445,1080",
            ),
            Shape(
                kind="polyline",
                style="chunk",
                points="468,560 468,720 843,720 843,560",
            ),
            Shape(kind="line", x1=70, y1=905, x2=445, y2=905, style="rule"),
            Shape(kind="line", x1=468, y1=605, x2=843, y2=605, style="rule"),
        ],
        output_label="Python",
        output="""from docling.chunking import HybridChunker

chunker = HybridChunker(tokenizer="BAAI/bge-small-en-v1.5")

for chunk in chunker.chunk(doc):
    print(chunk.text)
    print(chunk.meta.headings)     # section path
    print(chunk.meta.doc_items)    # back-references into the document""",
    ),
    Layer(
        id="provenance",
        label="Provenance",
        title="Every element knows where it came from",
        body=(
            "Each component keeps its page number and bounding box. An answer built "
            "from a Docling document can be traced back to the exact region of the "
            "exact page it came from."
        ),
        page=PAGE_MAIN,
        doc_link="https://docling-project.github.io/docling/concepts/docling_document/",
        shapes=[
            Shape(kind="rect", x=70, y=80, width=775, height=30, style="chunk", label="page-header"),
            Shape(kind="rect", x=70, y=875, width=160, height=25, style="box", label="section-header"),
            Shape(kind="rect", x=85, y=286, width=348, height=246, style="box", label="table"),
            Shape(kind="rect", x=475, y=120, width=365, height=280, style="box", label="picture"),
        ],
        output_label="JSON",
        output="""{
  "self_ref": "#/texts/22",
  "label": "section_header",
  "text": "5 EXPERIMENTS",
  "prov": [
    {
      "page_no": 6,
      "bbox": { "l": 70, "t": 875, "r": 230, "b": 900 },
      "charspan": [0, 13]
    }
  ]
}""",
    ),
]
