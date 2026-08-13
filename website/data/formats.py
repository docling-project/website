"""Supported input and output formats, and the components Docling extracts.

Moved off the homepage: the strategy calls the large format matrix useful
reference but the wrong primary homepage device. It now lives at /formats/.
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class FormatGroup:
    name: str
    blurb: str
    formats: list[str]


IMPORT_GROUPS: list[FormatGroup] = [
    FormatGroup(
        "Rich",
        "Page-based documents where layout carries meaning.",
        ["PDF", "DOCX", "PPTX"],
    ),
    FormatGroup(
        "Markup",
        "Already-structured text formats.",
        ["Markdown", "HTML", "AsciiDoc", "WebVTT"],
    ),
    FormatGroup(
        "Tabular",
        "Spreadsheets and delimited data.",
        ["XLSX", "CSV"],
    ),
    FormatGroup(
        "Image",
        "Scans and photographs, read through the OCR engine of your choice.",
        ["PNG", "JPEG", "TIFF", "BMP", "WEBP"],
    ),
    FormatGroup(
        "Audio",
        "Spoken content, transcribed into the same document model.",
        ["MP3", "WAV"],
    ),
]


EXPORT_GROUPS: list[FormatGroup] = [
    FormatGroup(
        "Structured",
        "Lossless representations of the full document model.",
        ["JSON", "DocTags"],
    ),
    FormatGroup(
        "Markup",
        "Human-readable output for downstream text pipelines.",
        ["Markdown", "HTML", "Text"],
    ),
]


@dataclass(frozen=True)
class ExtractGroup:
    name: str
    items: list[str]


EXTRACT_GROUPS: list[ExtractGroup] = [
    ExtractGroup("Page", ["Image", "Number", "Header", "Footer"]),
    ExtractGroup("Text", ["Header", "Paragraph", "List item", "Code", "Formula"]),
    ExtractGroup("Table", ["Structure", "Cell", "Caption"]),
    ExtractGroup("Picture", ["Image", "Class", "Description", "Caption"]),
    ExtractGroup("Document", ["Reading order", "Chunks", "Bounding boxes", "Provenance"]),
]
