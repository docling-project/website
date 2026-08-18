"""Proof strip content.

Only claims that are verifiable and cheap to maintain. Live counts come from
the GitHub API at runtime (``js/github.js``); everything else here is a
property of the project that does not drift week to week.
"""

from __future__ import annotations

from dataclasses import dataclass

from .navigation import GITHUB_URL


@dataclass(frozen=True)
class ProofItem:
    value: str
    label: str
    href: str = ""
    # When set, js/github.js replaces `value` with the live figure.
    live_key: str = ""


PROOF_ITEMS: list[ProofItem] = [
    ProofItem(value="—", label="GitHub stars", href=GITHUB_URL, live_key="stars"),
    ProofItem(value="—", label="Contributors", href=f"{GITHUB_URL}/graphs/contributors", live_key="contributors"),
    ProofItem(value="MIT", label="Licence", href=f"{GITHUB_URL}/blob/main/LICENSE"),
]


# Deliberately empty: the strip is just the counts + licence now. The old facts
# ("Runs locally", "LF AI & Data", "PyPI") duplicated the hero chips / footer.
# ponytail: keep the list + render guard so a fact can be re-added without churn.
PROOF_FACTS: list[ProofItem] = []
