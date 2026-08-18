"""Deployment modes, and what each one honestly adds over the one before it."""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class Capability:
    name: str
    local: bool
    serve: bool
    saas: bool
    on_prem: bool


# Feature parity across modes. `True` means the mode provides it directly;
# `False` means it is the operator's responsibility in that mode.
PARITY_MATRIX: list[Capability] = [
    Capability("Full document model", True, True, True, True),
    Capability("Same configuration vocabulary", True, True, True, True),
    Capability("Markdown / JSON / DocLang export", True, True, True, True),
    Capability("Runs without network access", True, True, False, True),
    Capability("HTTP API", False, True, True, True),
    Capability("Horizontal scale-out", False, False, True, True),
    Capability("Managed queueing and retries", False, False, True, False),
    Capability("Operational dashboards", False, False, True, False),
    Capability("Enterprise identity integration", False, False, True, True),
    Capability("Data residency control", True, True, False, True),
    Capability("Air-gapped operation", True, True, False, True),
    Capability("Support and service commitments", False, False, True, True),
]

MODE_COLUMNS = ["Local library", "Docling Serve", "Managed SaaS", "Private / on-prem"]


@dataclass(frozen=True)
class DeploymentMode:
    id: str
    name: str
    tagline: str
    best_for: str
    adds: list[str]
    caveats: list[str]
    cta_label: str
    cta_href: str


DEPLOYMENT_MODES: list[DeploymentMode] = [
    DeploymentMode(
        id="local",
        name="Local library",
        tagline="One pip install, no account, no upload.",
        best_for="Evaluation, development, custom pipelines, and any workload that fits on the machine running it.",
        adds=[
            "Full document model and every export format",
            "Complete offline operation once models are cached",
            "Direct access to pipeline internals",
        ],
        caveats=[
            "Throughput is bounded by the local machine",
            "No built-in queueing, retries or metrics",
            "Model downloads need network access on first run",
        ],
        cta_label="Install Docling",
        cta_href="/#quickstart",
    ),
    DeploymentMode(
        id="serve",
        name="Docling Serve",
        tagline="The same pipeline behind an HTTP endpoint you operate.",
        best_for="Internal services, team workflows, and applications that should not embed the converter directly.",
        adds=[
            "HTTP API and container images",
            "Shared capacity across a team",
            "Deployment inside your own network boundary",
        ],
        caveats=[
            "You own scaling, monitoring and upgrades",
            "Capacity planning is your responsibility",
        ],
        cta_label="Deploy Docling Serve",
        cta_href="https://github.com/docling-project/docling-serve",
    ),
    DeploymentMode(
        id="saas",
        name="Managed SaaS",
        tagline="Elastic capacity and managed operations, same document model.",
        best_for="Production applications that need throughput and reliability without running the infrastructure.",
        adds=[
            "Elastic throughput with queueing and retries",
            "Usage controls, quotas and observability",
            "Managed runtime updates and regional processing",
            "Enterprise identity, support and service commitments",
        ],
        caveats=[
            "Documents are processed by the provider, not on your hardware",
            "Request size, rate and concurrency limits apply",
            "Retention and processing boundaries are set by the provider's terms",
        ],
        cta_label="Docling for IBM watsonx",
        cta_href="https://www.ibm.com/products/watsonx-ai",
    ),
    DeploymentMode(
        id="on-prem",
        name="Private / on-prem",
        tagline="Your infrastructure, your models, your update windows.",
        best_for="Regulated environments, data-residency requirements and air-gapped networks.",
        adds=[
            "Private cloud, data centre or air-gapped deployment",
            "Control over models, versions and update windows",
            "Logging, secrets and identity integrated with your stack",
            "Capacity planning and accelerator guidance",
        ],
        caveats=[
            "Requires infrastructure and operational ownership",
            "Accelerator availability shapes achievable throughput",
        ],
        cta_label="Docling for IBM watsonx",
        cta_href="https://www.ibm.com/products/watsonx-ai",
    ),
]
