"""Homepage product narrative: hero copy, the mode/application matrix, the four
value propositions, the quickstart tabs and the local-to-scale continuum."""

from __future__ import annotations

from dataclasses import dataclass, field

from .navigation import DOCS_URL, GITHUB_URL


# --- Hero -------------------------------------------------------------------

HERO_EYEBROW = "Open-source document intelligence"
HERO_TITLE_LEAD = "Your documents are"
HERO_TITLE_ACCENT = "more than text."
HERO_SUBTITLE = (
    "Docling converts messy documents — PDFs, Office files, HTML, images and "
    "audio — into structured data, detecting tables, formulas, reading order, "
    "OCR and much more."
)
HERO_SUBTITLE_2 = (
    "Install it locally and try it on your own documents. Move the same "
    "workflow to a service or private on-prem capacity when you are ready."
)

INSTALL_COMMAND = "pip install docling"


@dataclass(frozen=True)
class Chip:
    label: str
    href: str = ""


HERO_CHIPS: list[Chip] = [
    Chip("MIT licensed", GITHUB_URL),
    Chip("Runs fully offline"),
    Chip("Python · CLI · API · MCP", "/#quickstart"),
    Chip("LF AI & Data project", "https://lfaidata.foundation/projects/"),
]


# --- Mode x application matrix ---------------------------------------------
#
# Two axes: scale (one document at a time vs. in bulk) against what you want back
# (content-preserving conversion vs. schema extraction). Common jobs, not a limit:
# chunking, enrichment and re-serialization all live outside this grid.

@dataclass(frozen=True)
class MatrixCell:
    mode: str
    application: str
    title: str
    body: str
    example: str


MATRIX_MODES = ["One at a time", "In bulk"]
MATRIX_APPLICATIONS = ["Conversion for search", "Extraction for databases"]

# The plain row label kept beside the performance property it stands for, so the
# axis reads as "one at a time → instant" / "in bulk → high throughput".
MODE_TAGLINES = {
    "One at a time": "instant result",
    "In bulk": "high throughput",
}

MATRIX: list[MatrixCell] = [
    MatrixCell(
        mode="One at a time",
        application="Conversion for search",
        title="Interactive conversion",
        body=(
            "A user uploads a document and expects structured Markdown back while "
            "they wait. Content-preserving, single-document, latency-bound."
        ),
        example="converter.convert(source)",
    ),
    MatrixCell(
        mode="One at a time",
        application="Extraction for databases",
        title="On-demand extraction",
        body=(
            "Pull a defined set of fields out of one PDF or image against a schema, "
            "in time to answer a request or drive an agent step."
        ),
        example="extractor.extract(source, template=Invoice)",
    ),
    MatrixCell(
        mode="In bulk",
        application="Conversion for search",
        title="Corpus ingestion",
        body=(
            "Convert an archive once, chunk it, embed it, and keep provenance so "
            "retrieved passages trace back to the exact region on the page."
        ),
        example="converter.convert_all(sources)",
    ),
    MatrixCell(
        mode="In bulk",
        application="Extraction for databases",
        title="Batch structuring",
        body=(
            "Run a fixed schema across a population of PDFs or images and land typed "
            "rows in a warehouse rather than blobs of text."
        ),
        example="for r in extractor.extract_all(sources, template=Invoice): ...",
    ),
]


# --- Four core value propositions -------------------------------------------

@dataclass(frozen=True)
class Value:
    id: str
    title: str
    body: str
    link_label: str = ""
    link_href: str = ""


VALUES: list[Value] = [
    Value(
        id="structure",
        title="Structure, not a text dump",
        body=(
            "Hierarchy, layout, reading order, tables, formulas, pictures and "
            "provenance all survive conversion. What the page meant is still "
            "recoverable after parsing."
        ),
        link_label="See what survives",
        link_href="/#proof",
    ),
    Value(
        id="model",
        title="One document model",
        body=(
            "Many input formats converge on the same expressive DoclingDocument, "
            "serializable to Markdown, JSON, HTML and DocLang. One shape to write "
            "your application against."
        ),
        link_label="DoclingDocument",
        link_href=f"{DOCS_URL}/concepts/docling_document/",
    ),
    Value(
        id="private",
        title="Private by design",
        body=(
            "Everything runs on your machine by default. No account, no upload, no "
            "outbound call — then the same pipeline moves to a private environment "
            "or managed infrastructure on your terms."
        ),
        link_label="Deployment options",
        link_href="/deployments/",
    ),
    Value(
        id="ai",
        title="Ready for AI applications",
        body=(
            "Structure-aware chunking, exports and an MCP server connect Docling to "
            "RAG, agents, extraction and automation without a bespoke adapter."
        ),
        link_label="Real workflows",
        link_href="/use-cases/",
    ),
]


# --- Quickstart tabs ---------------------------------------------------------

@dataclass(frozen=True)
class QuickstartTab:
    id: str
    label: str
    language: str
    filename: str
    code: str
    note: str = ""
    link_label: str = ""
    link_href: str = ""


QUICKSTART: list[QuickstartTab] = [
    QuickstartTab(
        id="python",
        label="Python",
        language="python",
        filename="convert.py",
        code="""from docling.document_converter import DocumentConverter

converter = DocumentConverter()
result = converter.convert("report.pdf")

print(result.document.export_to_markdown())""",
        note="pip install docling",
        link_label="Python API reference",
        link_href=f"{DOCS_URL}/reference/document_converter/",
    ),
    QuickstartTab(
        id="cli",
        label="CLI",
        language="bash",
        filename="terminal",
        code="""# Convert a local file or a URL straight from the shell
docling report.pdf --to md --to json

# Point it at a whole directory
docling ./corpus --to md --output ./out""",
        note="pip install docling",
        link_label="CLI reference",
        link_href=f"{DOCS_URL}/reference/cli/",
    ),
    QuickstartTab(
        id="api",
        label="API",
        language="bash",
        filename="docling-serve",
        code="""# Run the same pipeline behind an HTTP endpoint
docker run -p 5001:5001 quay.io/docling-project/docling-serve

curl -X POST http://localhost:5001/v1/convert/source \\
  -H 'Content-Type: application/json' \\
  -d '{"sources": [{"kind": "http", "url": "https://arxiv.org/pdf/2206.01062"}]}'""",
        note="Same document model, different transport.",
        link_label="Docling Serve",
        link_href="https://github.com/docling-project/docling-serve",
    ),
    QuickstartTab(
        id="mcp",
        label="MCP",
        language="json",
        filename="mcp.json",
        code="""{
  "mcpServers": {
    "docling": {
      "command": "uvx",
      "args": ["--from", "docling-mcp", "docling-mcp-server"]
    }
  }
}""",
        note="Give an agent the ability to read documents properly.",
        link_label="Docling MCP",
        link_href="https://github.com/docling-project/docling-mcp",
    ),
]


# --- Local to production continuum ------------------------------------------

@dataclass(frozen=True)
class Stage:
    id: str
    index: str
    name: str
    goal: str
    experience: str
    cta_label: str
    cta_href: str
    code: str = ""


CONTINUUM: list[Stage] = [
    Stage(
        id="library",
        index="01",
        name="Local library",
        goal="Prove extraction quality and learn the document model.",
        experience="Python package, CLI, examples and notebooks with reproducible output.",
        cta_label="Install locally",
        cta_href="/#quickstart",
        code="converter = DocumentConverter()\nresult = converter.convert(source)",
    ),
    Stage(
        id="serve",
        index="02",
        name="Docling Serve",
        goal="Wrap the pipeline in a service and test team workflows.",
        experience="Containers, an HTTP API and an optional UI, running inside your network.",
        cta_label="Deploy a local service",
        cta_href="https://github.com/docling-project/docling-serve",
        code="client = DoclingServiceClient(url='http://docling.internal:5001')\nresult = client.convert(source)",
    ),
    Stage(
        id="commercial",
        index="03",
        name="Managed & private — commercial",
        goal="Add managed capacity or run privately, operated for you.",
        experience="IBM's commercial offering: managed SaaS or private / on-prem deployment, with the same document model and API.",
        cta_label="Docling for IBM watsonx",
        cta_href="https://www.ibm.com/products/docling",
        code="client = DoclingServiceClient(url=MANAGED_ENDPOINT, api_key=KEY)\nresult = client.convert(source)",
    ),
]

CONTINUUM_PROMISE = (
    "Prove the pipeline locally, keep the same document model and configuration, "
    "then change where the processing runs."
)


@dataclass(frozen=True)
class ParityRow:
    area: str
    local: str
    saas: str
    on_prem: str
    promise: str


PARITY: list[ParityRow] = [
    ParityRow("Document model", "Native object", "Serialized equivalent", "Same API and schema", "Stable output semantics"),
    ParityRow("Configuration", "Python / CLI config", "Request or saved pipeline", "Same pipeline config", "Portable configuration"),
    ParityRow("Client", "Direct library", "SDK / API", "SDK / API", "Minimal migration"),
    ParityRow("Outputs", "Local files and objects", "API artifacts", "Private artifacts", "Equivalent formats"),
    ParityRow("Evaluation", "Local harness", "Remote harness", "Private harness", "Comparable test suite"),
    ParityRow("Observability", "Developer logs", "Managed metrics", "Enterprise metrics", "More operations, same parser"),
]


# --- Run routes --------------------------------------------------------------

@dataclass(frozen=True)
class Route:
    name: str
    best_for: str
    cta_label: str
    cta_href: str
    external: bool = False


ROUTES: list[Route] = [
    Route("Python library", "Local development and custom pipelines", "Install Docling", "/#quickstart"),
    Route("CLI", "Batch conversion and scripts", "View CLI", f"{DOCS_URL}/reference/cli/", True),
    Route("Docling Serve", "Internal APIs and production services", "Deploy Serve", "https://github.com/docling-project/docling-serve", True),
    Route("Managed SaaS", "Elastic capacity and managed operations", "Scale with Docling", "/deployments/#saas"),
    Route("On-prem / private cloud", "Security, residency, private infrastructure", "Deploy privately", "/deployments/#on-prem"),
]


# --- Final CTA ---------------------------------------------------------------

FINAL_CTA_TITLE = "Give your AI the document structure it is missing."
FINAL_CTA_BODY = (
    "Start on your laptop with one command. Nothing to sign up for, nothing to "
    "upload, no proprietary SDK to adopt before you can judge the output."
)
