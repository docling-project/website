"""Benchmark page scaffolding.

Deliberately carries no numbers. The strategy requires every benchmark claim to
ship with dataset, version, configuration, hardware, baselines, limitations and
a reproducible script; publishing figures without those is explicitly listed
under "things to avoid". The page therefore states the methodology contract and
points at the peer-reviewed work, until a real run is published here.

To publish results:
    1. fill REQUIRED_DISCLOSURES for the run;
    2. add rows to RESULTS with the same fields;
    3. link the script that regenerates them;
    4. set PUBLISHED = True.
"""

from __future__ import annotations

from dataclasses import dataclass, field


PUBLISHED = False


@dataclass(frozen=True)
class Disclosure:
    field_name: str
    why: str


# Every published figure must be accompanied by all of these.
REQUIRED_DISCLOSURES: list[Disclosure] = [
    Disclosure("Dataset", "Which documents, at which revision, and where to obtain them."),
    Disclosure("Docling version", "The exact release that produced the numbers."),
    Disclosure("Configuration", "Pipeline, OCR engine, enrichments and export settings."),
    Disclosure("Hardware", "CPU, GPU or accelerator, and memory available to the run."),
    Disclosure("Quality metric", "What was measured, and how it was scored."),
    Disclosure("Throughput", "Pages or documents per second, and the concurrency used."),
    Disclosure("Baselines", "What Docling was compared against, at which versions."),
    Disclosure("Limitations", "Where the configuration is known to do badly."),
    Disclosure("Script", "A command that reproduces the table from scratch."),
]


@dataclass(frozen=True)
class Result:
    dataset: str
    metric: str
    value: str
    baseline: str
    config: str


RESULTS: list[Result] = []


@dataclass(frozen=True)
class Reference:
    title: str
    venue: str
    href: str
    blurb: str


# Peer-reviewed work behind the models, which is citable today.
PUBLISHED_WORK: list[Reference] = [
    Reference(
        title="DocLayNet: A Large Human-Annotated Dataset for Document-Layout Segmentation",
        venue="KDD 2022",
        href="https://arxiv.org/abs/2206.01062",
        blurb="The layout dataset the detection models are trained and evaluated against.",
    ),
    Reference(
        title="TableFormer: Table Structure Understanding with Transformers",
        venue="CVPR 2022",
        href="https://arxiv.org/abs/2203.01017",
        blurb="The table-structure model behind row, column and header recovery.",
    ),
    Reference(
        title="Docling Technical Report",
        venue="Technical report, 2024",
        href="https://arxiv.org/abs/2408.09869",
        blurb="Pipeline architecture and the measurements published with it.",
    ),
    Reference(
        title="SmolDocling: An Ultra-Compact Vision-Language Model for End-to-End Multi-Modal Document Conversion",
        venue="2025",
        href="https://arxiv.org/abs/2503.11576",
        blurb="Compact end-to-end conversion model released alongside Docling.",
    ),
]
