---
title: Advanced Layout Analysis Models for Docling
authors: N Livathinos, C Auer, A Nassar, RT de Lima, M Lysak, B Ebouky, ...
date: 2025-09-15
venue: arXiv
summary: "This technical report documents the development of novel Layout Analysis models integrated into the Docling document-conversion pipeline. We trained several state-of-the-art object detectors based on the RT-DETR, RT-DETRv2 and DFINE architectures on a heterogeneous corpus of 150,000 documents (both openly available and proprietary). Post-processing steps were applied to the raw detections to make them more applicable to the document conversion task. We evaluated the effectiveness of the layout analysis on various document benchmarks using different methodologies while also measuring the runtime performance across different environments (CPU, Nvidia and Apple GPUs). We introduce five new document layout models achieving 20.6% - 23.9% mAP improvement over Docling's previous baseline, with comparable or better runtime. Our best model, \"heron-101\", attains 78% mAP with 28 ms/image inference time on a single NVIDIA A100 GPU. Extensive quantitative and qualitative experiments establish best practices for training, evaluating, and deploying document-layout detectors, providing actionable guidance for the document conversion community. All trained checkpoints, code, and documentation are released under a permissive license on HuggingFace."
thumbnail: images/thumbnail.png
keywords: document layout analysis, object detection, document conversion, deep learning
bibtex: paper.bib
url: https://scholar.google.com/citations?view_op=view_citation&hl=en&user=sPuvIfgAAAAJ&cstart=20&pagesize=80&citation_for_view=sPuvIfgAAAAJ:PELIpwtuRlgC
arxiv: 2509.11720
google_scholar: https://scholar.google.com/scholar?q=Advanced+Layout+Analysis+Models+for+Docling

category: paper
grouping: 2025
---
