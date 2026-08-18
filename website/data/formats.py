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
        "Documents",
        "Page-based documents where layout carries meaning.",
        ["PDF", "DOCX", "DOC", "PPTX", "PPT", "ODT", "ODP"],
    ),
    FormatGroup(
        "Web & publishing",
        "Text and publishing formats with existing structure.",
        [
            "Markdown",
            "Plain text",
            "HTML",
            "AsciiDoc",
            "LaTeX",
            "EPUB",
            "Box Note",
        ],
    ),
    FormatGroup(
        "Spreadsheets & data",
        "Tabular and legacy data formats.",
        ["XLSX", "XLS", "ODS", "CSV", "EBCDIC"],
    ),
    FormatGroup(
        "Images",
        "Scans and photographs, read through the OCR engine of your choice.",
        ["PNG", "JPEG", "TIFF", "BMP", "WEBP"],
    ),
    FormatGroup(
        "Audio & video",
        "Recorded media, transcribed into the same document model.",
        [
            "WAV",
            "MP3",
            "M4A",
            "AAC",
            "OGG",
            "FLAC",
            "MP4",
            "AVI",
            "MOV",
            "MKV",
            "WEBM",
        ],
    ),
    FormatGroup(
        "XML & Docling",
        "Domain XML and native Docling representations.",
        [
            "JATS XML",
            "USPTO XML",
            "XBRL XML",
            "METS/GBS",
            "Docling JSON",
            "DocLang",
            "DCLX",
        ],
    ),
    FormatGroup(
        "Messaging & captions",
        "Email messages and timed text.",
        ["EML", "MSG", "WebVTT"],
    ),
]


# Homepage "convert once, re-serialize forever" section — a curated arc, not the
# full matrix (that stays on /formats/). Story: any input in -> DocLang (faithful,
# standard) -> any format out later, without reconverting.
HOME_INPUTS: list[str] = ["PDF", "DOCX", "PPTX", "XLSX", "HTML", "Images", "Audio"]
HOME_OUTPUTS: list[str] = ["Markdown", "HTML", "JSON", "Text"]


EXPORT_GROUPS: list[FormatGroup] = [
    FormatGroup(
        "Structured",
        "Lossless representations of the full document model.",
        ["JSON", "YAML", "DocLang", "DCLX"],
    ),
    FormatGroup(
        "Markup & text",
        "Human-readable output for downstream text pipelines.",
        ["Markdown", "HTML", "Split-page HTML", "Text", "DocTags", "WebVTT"],
    ),
    FormatGroup(
        "Retrieval",
        "Serialized chunks ready for indexing and retrieval.",
        ["Chunks (JSONL)"],
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
