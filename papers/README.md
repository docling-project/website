# Papers Directory Structure

This directory contains papers in a self-contained folder structure. Each paper has its own directory with all associated assets.

## Directory Structure

Each paper should follow this structure:

```
papers/
├── YYYYMMDD_paper_title_in_lowercase/
│   ├── paper.md              # Paper metadata and content
│   ├── paper.bib             # BibTeX citation
│   ├── paper.pdf             # (Optional) Original PDF
│   ├── docling-document.json # (Optional) Docling document
│   └── images/
│       ├── thumbnail.jpeg    # Required thumbnail image
│       ├── figure1.png       # Optional figures
│       └── figure2.png
└── template/
    └── paper.md              # Template for new papers
```

## Paper Metadata Format

Each `paper.md` file should contain frontmatter with the following fields:

```markdown
---
title: Full Paper Title
authors: Author One, Author Two, Author Three
date: YYYY-MM-DD
venue: Conference/Journal Name (optional)
summary: Brief abstract or summary (2-3 sentences)
thumbnail: images/thumbnail.jpeg
keywords: technical
bibtex: paper.bib
url: https://example.com/paper (optional)
arxiv: YYMM.NNNNN (optional)
category: paper or patent
grouping: YYYY (optional, defaults to year from folder name)
---

image 1:
- caption: Description of the first figure
- filename: images/figure1.png

image 2:
- caption: Description of the second figure
- filename: images/figure2.png
```

## Field Descriptions

- **title**: Full title of the paper
- **authors**: Comma-separated list of authors
- **date**: Publication date in YYYY-MM-DD format
- **venue**: Conference or journal name (optional)
- **summary**: Brief abstract (will be shown in expandable section)
- **thumbnail**: Path to thumbnail image (relative to paper folder)
- **keywords**: Category keywords (e.g., "technical")
- **bibtex**: Filename of BibTeX file (e.g., "paper.bib")
- **url**: Link to paper (optional)
- **arxiv**: arXiv ID if applicable (optional)
- **google_scholar**: Google Scholar link for the paper (optional)
- **category**: "paper" or "patent"
- **grouping**: Year for grouping (optional, auto-detected from folder name)

## Folder Naming Convention

Folders should be named: `YYYYMMDD_title_in_lowercase_with_underscores`

Example: `20250117_docling_an_efficient_open_source_toolkit_for_ai_driven_document_conversion`

The first 8 digits (YYYYMMDD) represent the date and are used to:
1. Sort papers chronologically
2. Auto-detect the year if `grouping` is not specified

## Adding a New Paper

1. Create a new folder following the naming convention
2. Copy `template/paper.md` to your new folder
3. Fill in all required metadata fields
4. Create a `paper.bib` file with the BibTeX citation
5. Add a thumbnail image to the `images/` subfolder
6. (Optional) Add figure images and reference them in the paper.md

## Migration from index.json

The system automatically detects if paper folders exist and uses them instead of `papers/index.json`. Both systems can coexist during migration:

- If paper folders with `paper.md` files exist, they take precedence
- If no paper folders exist, the system falls back to `papers/index.json`

## Features

The enhanced papers page includes:

- **Expandable abstracts**: Click to reveal the full summary
- **BibTeX download**: One-click download of citation
- **arXiv links**: Direct links to arXiv papers
- **Figure previews**: Horizontal scrollable gallery of paper figures
- **Responsive design**: Mobile-friendly layout

## Example

See `250117_docling_an_efficient_open_source_toolkit_for_ai_driven_document_conversion/` for a complete example.
