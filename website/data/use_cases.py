"""The four real workflows Docling is built for."""

from __future__ import annotations

from dataclasses import dataclass, field

from .navigation import DOCS_URL


@dataclass(frozen=True)
class UseCase:
    id: str
    name: str
    headline: str
    problem: str
    evidence: list[str]
    scale_bridge: list[str]
    why_docling: str
    recipe_language: str
    recipe: str
    doc_label: str = ""
    doc_href: str = ""


USE_CASES: list[UseCase] = [
    UseCase(
        id="rag",
        name="RAG and enterprise search",
        headline="Retrieval that can cite the page it came from",
        problem=(
            "Flat text extraction destroys the two things retrieval depends on: "
            "where a passage sits in the document, and where it came from on the "
            "page. Chunks split mid-table and answers cannot be traced."
        ),
        evidence=["Reading order", "Structure-aware chunks", "Tables", "Figures", "Provenance"],
        scale_bridge=["Batch processing", "Concurrency", "Managed queues", "Private deployment"],
        why_docling=(
            "Chunks are cut on real structural boundaries and every chunk keeps a "
            "back-reference to its page and bounding box, so a citation is a "
            "coordinate, not a guess."
        ),
        recipe_language="python",
        recipe="""from docling.document_converter import DocumentConverter
from docling.chunking import HybridChunker

doc = DocumentConverter().convert("report.pdf").document

for chunk in HybridChunker().chunk(doc):
    embed(chunk.text, metadata={
        "headings": chunk.meta.headings,
        "page": chunk.meta.doc_items[0].prov[0].page_no,
    })""",
        doc_label="RAG examples",
        doc_href=f"{DOCS_URL}/examples/",
    ),
    UseCase(
        id="agents",
        name="Agents and automation",
        headline="Give an agent a document it can actually read",
        problem=(
            "An agent handed raw PDF bytes or a wall of stripped text has to guess "
            "at structure on every step. Tool calls become unreliable exactly where "
            "the document is hardest."
        ),
        evidence=["MCP server", "Schema-based extraction", "Machine-readable output"],
        scale_bridge=["API reliability", "Job orchestration", "Governance"],
        why_docling=(
            "Docling exposes documents to agents through MCP, so reading, "
            "converting and extracting are typed tool calls against a stable "
            "document model instead of prompt-level parsing."
        ),
        recipe_language="json",
        recipe="""{
  "mcpServers": {
    "docling": {
      "command": "uvx",
      "args": ["--from", "docling-mcp", "docling-mcp-server"]
    }
  }
}""",
        doc_label="Docling MCP",
        doc_href="https://github.com/docling-project/docling-mcp",
    ),
    UseCase(
        id="research",
        name="Research and technical documents",
        headline="Equations, captions and citations stay intact",
        problem=(
            "Scientific PDFs are the worst case for naive parsers: multi-column "
            "layouts, display equations, dense tables and figure captions that "
            "carry as much meaning as the body text."
        ),
        evidence=["Formulas as LaTeX", "Captions bound to figures", "Multi-column reading order", "Citations"],
        scale_bridge=["Accelerators", "Model versioning", "Reproducibility"],
        why_docling=(
            "Docling was built by a team that publishes on document conversion, "
            "against datasets they released. The hard cases are the design target, "
            "not an edge case."
        ),
        recipe_language="bash",
        recipe="""# Enable formula and code enrichment
docling paper.pdf \\
  --to md \\
  --enrich-formula \\
  --enrich-code""",
        doc_label="Enrichment options",
        doc_href=f"{DOCS_URL}/usage/enrichments/",
    ),
    UseCase(
        id="archives",
        name="Enterprise archives",
        headline="Decades of mixed formats, one document model",
        problem=(
            "Real archives are not PDFs. They are Office files, scans, email, "
            "images, spreadsheets and media, accumulated over decades, and each "
            "format usually arrives with its own bespoke parser."
        ),
        evidence=["Office documents", "Scans and OCR", "Images", "Audio", "Tabular formats"],
        scale_bridge=["Data locality", "Private infrastructure", "Operational controls"],
        why_docling=(
            "One converter covers the format spread and lands everything in the "
            "same DoclingDocument, so downstream systems are written once rather "
            "than once per source format."
        ),
        recipe_language="python",
        recipe="""from docling.document_converter import DocumentConverter

converter = DocumentConverter()

# Same call for PDF, DOCX, PPTX, XLSX, HTML, images, audio
for result in converter.convert_all(paths):
    store(result.document.export_to_dict())""",
        doc_label="Supported formats",
        doc_href="/formats/",
    ),
]
