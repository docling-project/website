"""Ecosystem integrations, grouped by the job they do.

The strategy rejects an undifferentiated logo wall: every entry is grouped and
every entry links somewhere a developer can actually use.

Names and paths are taken from the official integrations index at
``{DOCS_URL}/integrations/``. Grouping is editorial; the links are not — add a
new entry only once its documentation page exists.
"""

from __future__ import annotations

from dataclasses import dataclass, field

from .navigation import DOCS_URL


_INTEGRATIONS = f"{DOCS_URL}/integrations"


@dataclass(frozen=True)
class Integration:
    name: str
    href: str


@dataclass(frozen=True)
class IntegrationGroup:
    id: str
    name: str
    blurb: str
    items: list[Integration] = field(default_factory=list)


INTEGRATION_GROUPS: list[IntegrationGroup] = [
    IntegrationGroup(
        id="frameworks",
        name="Frameworks",
        blurb="Drop Docling in as the document loader for an existing AI stack.",
        items=[
            Integration("LangChain", f"{_INTEGRATIONS}/langchain/"),
            Integration("LlamaIndex", f"{_INTEGRATIONS}/llamaindex/"),
            Integration("Haystack", f"{_INTEGRATIONS}/haystack/"),
            Integration("Langflow", f"{_INTEGRATIONS}/langflow/"),
            Integration("txtai", f"{_INTEGRATIONS}/txtai/"),
            Integration("spaCy", f"{_INTEGRATIONS}/spacy/"),
        ],
    ),
    IntegrationGroup(
        id="agents",
        name="Agents and MCP",
        blurb="Expose document reading to agents as typed tool calls.",
        items=[
            Integration("Docling MCP", "https://github.com/docling-project/docling-mcp"),
            Integration("Crew AI", f"{_INTEGRATIONS}/crewai/"),
            Integration("Bee Agent Framework", f"{_INTEGRATIONS}/bee/"),
            Integration("Open WebUI", f"{_INTEGRATIONS}/openwebui/"),
            Integration("Kotaemon", f"{_INTEGRATIONS}/kotaemon/"),
        ],
    ),
    IntegrationGroup(
        id="pipelines",
        name="Data and pipelines",
        blurb="Prepare, label and transform document corpora at volume.",
        items=[
            Integration("Data Prep Kit", f"{_INTEGRATIONS}/data_prep_kit/"),
            Integration("DocETL", f"{_INTEGRATIONS}/docetl/"),
            Integration("Apify", f"{_INTEGRATIONS}/apify/"),
            Integration("Prodigy", f"{_INTEGRATIONS}/prodigy/"),
            Integration("InstructLab", f"{_INTEGRATIONS}/instructlab/"),
        ],
    ),
    IntegrationGroup(
        id="infrastructure",
        name="Platforms and infrastructure",
        blurb="Run the same pipeline as a service, on a cluster, or on the edge.",
        items=[
            Integration("Docling Serve", "https://github.com/docling-project/docling-serve"),
            Integration("NVIDIA", f"{_INTEGRATIONS}/nvidia/"),
            Integration("RHEL AI", f"{_INTEGRATIONS}/rhel_ai/"),
            Integration("Cloudera", f"{_INTEGRATIONS}/cloudera/"),
            Integration("Quarkus", f"{_INTEGRATIONS}/quarkus/"),
            Integration("Arconia", f"{_INTEGRATIONS}/arconia/"),
        ],
    ),
    IntegrationGroup(
        id="retrieval",
        name="Search and retrieval",
        blurb="Land structured chunks where your application reads them.",
        items=[
            Integration("Vectara", f"{_INTEGRATIONS}/vectara/"),
            Integration("OpenContracts", f"{_INTEGRATIONS}/opencontracts/"),
            Integration("Hector", f"{_INTEGRATIONS}/hector/"),
            Integration("Semantica", f"{_INTEGRATIONS}/semantica/"),
            Integration("Metaxy", f"{_INTEGRATIONS}/metaxy/"),
        ],
    ),
]
