---
title: Docling at NVIDIA GTC
date: 11-03-2026
summary: Accelerating Document Processing with NVIDIA Nemotron OCR
thumbnail: images/thumbnail.png
category: event
---

## Meet the Docling team at GTC

1. **Tuesday**, luncheon Title: SE82111: Agentic AI Starts With Data: How IT Leaders Deliver AI-Ready Data at Scale (invite only)
2. **Tuesday**, 2pm @ IBM-booth (\#2007): 

## Accelerating Document Processing with NVIDIA Nemotron OCR

Extracting reliable text and structure from enterprise documents is often the most time-consuming step in building document AI pipelines. Many organizations process thousands or millions of PDFs, scanned reports, and technical documents every day. The speed and accuracy of OCR therefore directly determine how quickly this information can become available to search systems, retrieval pipelines, and downstream AI applications.

To accelerate this stage of the pipeline, we integrated **NVIDIA Nemotron OCR** into the **Docling** document conversion framework. Nemotron OCR is designed to take advantage of GPU-accelerated infrastructure to process large document collections efficiently while preserving high extraction quality. Combined with Docling’s structured document representation and traceability, the integration enables fast ingestion of complex multi-modal documents without sacrificing reliability.

In internal evaluations, Nemotron OCR significantly increased document processing throughput compared to the default OCR engine used in Docling. Across eight industry domains, the system achieved an **average throughput improvement of approximately 60%**, processing between **4.02 and 11.59 pages per second**, compared with **1.90 to 6.82 pages per second** previously. These improvements translate directly into increased processing capacity for enterprise document pipelines.

Importantly, the performance gains did not come at the cost of retrieval quality. Using the **ViDoRe v3 benchmark**, which evaluates downstream retrieval performance with the **NDCG@10** metric, Nemotron OCR maintained or improved accuracy across all evaluated domains. In some cases the gains were substantial, including improvements in the **Finance-FR** and **Energy** domains.

The evaluation covered **19,252 pages across 188 documents** spanning multiple domains such as computer science, finance, pharmaceuticals, and energy, and included both **English and French** documents. The results demonstrate that GPU-accelerated OCR can dramatically increase ingestion speed while preserving the document understanding quality required for enterprise AI systems.

### Performance Overview

| Domain | Default OCR Throughput (pages/sec) | Nemotron OCR Throughput (pages/sec) | Improvement |
|------|------|------|------|
| Computer Science | 6.82 | 11.59 | +70% |
| Finance (EN) | 4.10 | 6.76 | +65% |
| Finance (FR) | 1.90 | 4.02 | +112% |
| Pharmaceuticals | 5.32 | 8.14 | +53% |
| HR | 4.75 | 7.42 | +56% |
| Industrial | 3.96 | 6.21 | +57% |
| Physics | 4.63 | 7.01 | +51% |
| Energy | 3.87 | 6.02 | +55% |

**Key results**

- **60% average throughput improvement**
- **Up to 2× document processing capacity**
- **Retrieval accuracy maintained or improved across all domains**