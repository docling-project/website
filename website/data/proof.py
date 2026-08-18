"""Proof strip content.

Only claims that are verifiable and cheap to maintain. Live counts come from
the GitHub API at runtime (``js/github.js``); everything else here is a
property of the project that does not drift week to week.
"""

from __future__ import annotations

from dataclasses import dataclass

from .navigation import GITHUB_URL, PYPI_URL


@dataclass(frozen=True)
class ProofItem:
    value: str
    label: str
    href: str = ""
    # When set, js/github.js replaces `value` with the live figure.
    live_key: str = ""


PROOF_ITEMS: list[ProofItem] = [
    ProofItem(value="—", label="GitHub stars", href=GITHUB_URL, live_key="stars"),
    ProofItem(value="—", label="Forks", href=f"{GITHUB_URL}/forks", live_key="forks"),
    ProofItem(value="—", label="Contributors", href=f"{GITHUB_URL}/graphs/contributors", live_key="contributors"),
    ProofItem(value="MIT", label="Licence", href=f"{GITHUB_URL}/blob/main/LICENSE"),
]


# Short, checkable statements that sit beside the counts.
PROOF_FACTS: list[ProofItem] = [
    ProofItem(value="Runs locally", label="No account or upload required to evaluate"),
    ProofItem(value="Python · CLI · API · MCP", label="Four ways to call the same pipeline", href="/#quickstart"),
    ProofItem(value="LF AI & Data", label="Hosted as a Linux Foundation project", href="https://lfaidata.foundation/projects/"),
    ProofItem(value="PyPI", label="Released as a standard Python package", href=PYPI_URL),
]
