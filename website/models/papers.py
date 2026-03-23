import json
import re

from enum import Enum
from functools import lru_cache
from pathlib import Path
from pydantic import BaseModel
from typing import Optional


class PublicationCategory(str, Enum):
    """Publication category filter categories."""
    ALL = "all"
    DOCUMENT_CONVERSION = "document_conversion"
    DOCUMENT_ENRICHMENTS = "document_enrichments"
    USE_CASES = "use_cases"
    
    @property
    def label(self) -> str:
        """Get the display label for this filter."""
        labels = {
            PublicationCategory.ALL: "All",
            PublicationCategory.DOCUMENT_CONVERSION: "Document conversion",
            PublicationCategory.DOCUMENT_ENRICHMENTS: "Document enrichments",
            PublicationCategory.USE_CASES: "Use cases",
        }
        return labels[self]


class PaperFigure(BaseModel):
    src: str
    caption: str


class Paper(BaseModel):
    venue: str
    title: str
    url: str
    category: PublicationCategory = PublicationCategory.DOCUMENT_CONVERSION
    arxiv_id: str | None = None
    abstract: str | None = None
    bibtex: str | None = None
    google_scholar: str | None = None
    thumbnail: str | None = None
    figures: list[PaperFigure] = []


class PaperYear(BaseModel):
    year: str
    papers: list[Paper]


class PaperIndex(BaseModel):
    years: list[PaperYear]


def parse_paper_frontmatter(content: str) -> dict:
    """Parse frontmatter from paper.md file."""
    frontmatter_match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', content, re.DOTALL)
    if not frontmatter_match:
        return {}
    
    frontmatter_text = frontmatter_match.group(1)
    body = frontmatter_match.group(2)
    
    metadata = {}
    current_key = None
    
    for line in frontmatter_text.split('\n'):
        if ':' in line and not line.startswith(' ') and not line.startswith('-'):
            key, value = line.split(':', 1)
            current_key = key.strip()
            # Strip quotes from value
            value = value.strip()
            if value.startswith('"') and value.endswith('"'):
                value = value[1:-1]
            metadata[current_key] = value
        elif current_key and line.strip():
            # Multi-line value
            metadata[current_key] += '\n' + line.strip()
    
    # Parse figures from body
    figures = []
    figure_pattern = r'image \d+:\s*\n-\s*caption:\s*(.*?)\n-\s*filename:\s*(.*?)(?=\n\n|$)'
    for match in re.finditer(figure_pattern, body, re.DOTALL):
        figures.append({
            'caption': match.group(1).strip(),
            'src': match.group(2).strip()
        })
    
    metadata['figures'] = figures
    return metadata


@lru_cache()
def load_papers_from_folders() -> PaperIndex:
    """Load papers from individual paper folders."""
    papers_dir = Path("papers")
    years_dict = {}
    
    # Scan for paper directories
    for paper_dir in sorted(papers_dir.iterdir(), reverse=True):
        if not paper_dir.is_dir() or paper_dir.name.startswith('.') or paper_dir.name == 'template':
            continue
        
        paper_md = paper_dir / "paper.md"
        if not paper_md.exists():
            continue
        
        # Parse paper.md
        with open(paper_md, 'r', encoding='utf-8') as f:
            content = f.read()
        
        metadata = parse_paper_frontmatter(content)
        if not metadata:
            continue
        
        # Extract year from folder name (YYYYMMDD format) or from grouping field
        year = metadata.get('grouping')
        if not year:
            # Extract from folder name (first 4 digits are year)
            folder_name = paper_dir.name
            if len(folder_name) >= 8 and folder_name[:8].isdigit():
                year = folder_name[:4]
        
        if not year:
            continue
        
        # Read bibtex file if exists
        bibtex_file = paper_dir / "paper.bib"
        bibtex = None
        if bibtex_file.exists():
            with open(bibtex_file, 'r', encoding='utf-8') as f:
                bibtex = f.read()
        
        # Determine paper category
        category_str = metadata.get('category', '').lower().replace(' ', '_')
        
        # Map category string to enum
        category_map = {
            'document_conversion': PublicationCategory.DOCUMENT_CONVERSION,
            'document_enrichments': PublicationCategory.DOCUMENT_ENRICHMENTS,
            'use_cases': PublicationCategory.USE_CASES,
        }
        paper_category = category_map.get(category_str, PublicationCategory.DOCUMENT_CONVERSION)
        
        # Construct full thumbnail path if thumbnail exists and file is present
        thumbnail = metadata.get('thumbnail')
        if thumbnail:
            thumbnail_path = paper_dir / thumbnail
            if thumbnail_path.exists():
                thumbnail = f"/papers/{paper_dir.name}/{thumbnail}"
            else:
                thumbnail = None
        
        # Create Paper object
        paper = Paper(
            venue=metadata.get('venue', ''),
            title=metadata.get('title', ''),
            url=metadata.get('url', ''),
            category=paper_category,
            arxiv_id=metadata.get('arxiv'),
            abstract=metadata.get('summary'),
            bibtex=bibtex or metadata.get('bibtex'),
            google_scholar=metadata.get('google_scholar'),
            thumbnail=thumbnail,
            figures=[PaperFigure(**fig) for fig in metadata.get('figures', [])]
        )
        
        # Group by year
        if year not in years_dict:
            years_dict[year] = []
        years_dict[year].append(paper)
    
    # Convert to PaperIndex structure
    years = [
        PaperYear(year=year, papers=papers)
        for year, papers in sorted(years_dict.items(), reverse=True)
    ]
    
    return PaperIndex(years=years)


@lru_cache()
def paper_index(filter: PublicationCategory = PublicationCategory.ALL) -> PaperIndex:
    """Get all registered papers from paper folders.
    
    Args:
        filter: Optional category filter (ALL, DOCUMENT_CONVERSION, DOCUMENT_ENRICHMENTS, or USE_CASES).
    """
    all_papers = load_papers_from_folders()
    
    # Apply category filter if specified
    if filter == PublicationCategory.ALL:
        return all_papers
    
    # Filter papers by category
    filtered_years = []
    for year in all_papers.years:
        filtered_papers = [p for p in year.papers if p.category == filter]
        if filtered_papers:
            filtered_years.append(PaperYear(year=year.year, papers=filtered_papers))
    
    return PaperIndex(years=filtered_years)


@lru_cache()
def last_paper() -> Paper:
    """Get the latest paper."""
    return paper_index(PublicationCategory.ALL).years[0].papers[0]
