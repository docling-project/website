import json
from pathlib import Path
from pydantic import BaseModel


class Paper(BaseModel):
    venue: str
    title: str
    url: str


class PaperYear(BaseModel):
    year: str
    papers: list[Paper]


class PaperIndex(BaseModel):
    years: list[PaperYear]


def paper_index() -> PaperIndex:
    """Get all registered papers."""
    
    papers_index = Path("papers/index.json")
    
    with open(papers_index, "r", encoding="utf-8") as f:
        return PaperIndex.model_validate(json.load(f))
