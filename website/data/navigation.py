"""Site navigation.

Kept as data so the header, the mobile drawer and the footer cannot drift
apart, and so a new route is added in exactly one place.
"""

from __future__ import annotations

from dataclasses import dataclass, field


DOCS_URL = "https://docling-project.github.io/docling"
GITHUB_URL = "https://github.com/docling-project/docling"
GITHUB_REPO = "docling-project/docling"
PYPI_URL = "https://pypi.org/project/docling"


@dataclass(frozen=True)
class NavItem:
    label: str
    href: str
    external: bool = False


# Primary desktop navigation. The strategy explicitly rejects hiding
# destinations behind a single "Resources" dropdown, so these are all top level.
PRIMARY_NAV: list[NavItem] = [
    NavItem("Product", "/#product"),
    NavItem("Use cases", "/use-cases/"),
    NavItem("Deployments", "/deployments/"),
    NavItem("Ecosystem", "/ecosystem/"),
    NavItem("Benchmarks", "/benchmarks/"),
    NavItem("Docs", DOCS_URL, external=True),
    NavItem("Blog", "/blog/"),
]


@dataclass(frozen=True)
class FooterColumn:
    title: str
    items: list[NavItem] = field(default_factory=list)


FOOTER_COLUMNS: list[FooterColumn] = [
    FooterColumn(
        "Product",
        [
            NavItem("Quickstart", "/#quickstart"),
            NavItem("Capabilities", "/#product"),
            NavItem("Supported formats", "/formats/"),
            NavItem("Use cases", "/use-cases/"),
            NavItem("Deployments", "/deployments/"),
            NavItem("Benchmarks", "/benchmarks/"),
        ],
    ),
    FooterColumn(
        "Develop",
        [
            NavItem("Documentation", DOCS_URL, external=True),
            NavItem("Docling on PyPI", PYPI_URL, external=True),
            NavItem("Docling Serve", "https://github.com/docling-project/docling-serve", external=True),
            NavItem("Docling MCP", "https://github.com/docling-project/docling-mcp", external=True),
            NavItem("Ecosystem", "/ecosystem/"),
            NavItem("GitHub", GITHUB_URL, external=True),
        ],
    ),
    FooterColumn(
        "Community",
        [
            NavItem("Blog", "/blog/"),
            NavItem("Papers", "/papers/"),
            NavItem("Slack", "/community/#slack"),
            NavItem("Hugging Face", "https://huggingface.co/docling-project", external=True),
            NavItem("LinkedIn", "https://linkedin.com/company/docling", external=True),
            NavItem(
                "YouTube",
                "https://www.youtube.com/playlist?list=PLt0drfpBaTa1ywCtPwJGLYg-t0UmxhQP4",
                external=True,
            ),
        ],
    ),
]


@dataclass(frozen=True)
class SocialLink:
    label: str
    href: str
    icon: str


SOCIAL_LINKS: list[SocialLink] = [
    SocialLink("GitHub", GITHUB_URL, "/img/community/github.svg"),
    SocialLink("Hugging Face", "https://huggingface.co/docling-project", "/img/community/huggingface.svg"),
    SocialLink("Slack", "/community/#slack", "/img/community/slack.svg"),
    SocialLink("LinkedIn", "https://linkedin.com/company/docling", "/img/community/linkedin.svg"),
    SocialLink(
        "YouTube",
        "https://www.youtube.com/playlist?list=PLt0drfpBaTa1ywCtPwJGLYg-t0UmxhQP4",
        "/img/community/youtube.svg",
    ),
]


LEGAL_LINKS: list[NavItem] = [
    NavItem("Terms of use", "https://lfprojects.org/policies/terms-of-use", external=True),
    NavItem("Trademark policy", "https://lfprojects.org/policies/trademark-policy", external=True),
    NavItem(
        "General policies",
        "https://lfprojects.org/policies/general-rules-of-operation-policy",
        external=True,
    ),
]
