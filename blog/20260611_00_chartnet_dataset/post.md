---
title: "ChartNet: The Million-Scale Dataset Behind Robust Chart Understanding"
date: 11-06-2026
summary: Introducing ChartNet, a CVPR 2026 million-scale multimodal dataset of aligned chart images, code, tables, summaries, and reasoning traces — the kind of supervision that powers chart understanding in models like Granite-Docling and Granite Vision.
thumbnail: images/chart_ducky.png
category: technical
---

When Docling [extracts structured tables from charts](https://www.docling.ai/blog/20260203_00_chart_understanding_in_docling/), it relies on vision-language models (VLMs) that can read a bar chart the way an analyst would: recognizing the geometry, recovering the numbers, and organizing them into a tabular format. Getting models to do this reliably has long been bottlenecked by one thing — data. Existing chart datasets are small, narrow in chart types, or missing critical modalities such as plotting code, data tables, or reasoning traces.

**ChartNet**, accepted at **CVPR 2026**, addresses this gap head-on. It is the largest open dataset of its kind: millions of high-quality chart samples, each pairing a rendered chart image with its plotting code, underlying data table, natural-language summary, and question-answer pairs with chain-of-thought reasoning. The dataset is the result of a collaboration between MIT, the MIT-IBM Watson AI Lab, and IBM Research, and it is [available now on Hugging Face](https://huggingface.co/datasets/ibm-granite/ChartNet).

## What's in ChartNet

The key design principle of ChartNet is **cross-modal alignment**: every sample connects five components that describe the same chart.

- **Plotting code** — executable Python that generates the chart
- **Rendered chart image** — the visual itself
- **Data table (CSV)** — the underlying values
- **Natural-language summary** — a grounded description of patterns and trends
- **QA pairs with reasoning** — multi-step questions with chain-of-thought traces

This alignment is what makes the dataset so effective as supervision: a model trained on ChartNet sees not only what a chart looks like, but also the structured data and the program that produced it.

The numbers, as of the latest release:

| | |
|---|---|
| Synthetic chart samples | **4.2M** (2.5M under permissive licensing) |
| Human-verified samples | **94,643** (+ a 2,000 held-out test set) |
| Real-world charts | **30K** (curated with Abaka AI/2077AI) |
| Chart types | **24** — from bar and line charts to treemaps, radar, violin, and tornado charts |
| Plotting libraries | **6** |

Beyond the core synthetic dataset, specialized subsets cover **grounding** (QA pairs with bounding boxes for region-aware comprehension), **human-verified** examples for high-precision training and evaluation, curated **real-world charts** from sources like the World Bank, Pew Research Center, and Our World in Data, and **safety-focused** preference data designed to mitigate harmful outputs in chart contexts (coming soon).

## How it was built: code-guided synthesis

Charts are generated programmatically — so executable plotting code is a natural structured intermediate representation for them. ChartNet exploits this with a **code-guided generation pipeline**: starting from a seed set of chart images, a VLM reconstructs each chart as Python plotting code. An LLM then iteratively augments that code, varying chart types, plotting libraries, styles, and data, to produce visually and semantically diverse charts at scale. Because every chart originates from code, the aligned tables, summaries, and QA pairs can be derived with the code as grounding context — keeping the modalities tightly coupled.

A rigorous quality-filtering stage closes the loop. In a human study, filtering reduced the fraction of charts flagged with readability-affecting issues to <5.9%.

## Why this matters for Docling

ChartNet is directly connected to the Docling family of models. In the CVPR paper, fine-tuning **granite-docling-258M** — the same compact VLM at the heart of Docling's document conversion — on ChartNet directly boosts chart data extraction, chart summarization, and chart QA with reasoning, while unlocking chart-to-code generation.

The trend holds across scales, with a striking headline result: a ChartNet-tuned **granite-vision-3.3-2b** reaches **70.3%** on chart data extraction — far ahead of GPT-4o's 46.7% — and **83.9%** on chart summarization, surpassing open-source baselines an order of magnitude larger. The gains also transfer beyond ChartNet's own evaluation suite, with large improvements on public benchmarks such as ChartCap and ChartMimic-v2.

ChartNet has since been used to train the **Granite Vision 4** series ([Granite-4.0-3B-Vision](https://huggingface.co/ibm-granite/granite-4.0-3b-vision) and [Granite-Vision-4.1-4B](https://huggingface.co/ibm-granite/granite-vision-4.1-4b)). The takeaway for document AI: for tightly coupled visual-numerical-linguistic domains like charts, high-quality code-aligned multimodal supervision beats sheer model scale.

## Getting started

ChartNet integrates with the Hugging Face `datasets` library. The default `core_permissive` subset (2.5M samples) is released under the [Community Data License Agreement – Permissive 2.0](https://cdla.dev/permissive-2-0/):

```python
from datasets import load_dataset

# Default permissive subset (CDLA-Permissive-2.0)
core_permissive = load_dataset("ibm-granite/ChartNet", "core_permissive")
```

The subsets corresponding to the paper's experiments are also available:

```python
# Core and reasoning subsets (joinable on the "id" column)
core = load_dataset("ibm-granite/ChartNet", "core")
reasoning = load_dataset("ibm-granite/ChartNet", "reasoning")

# Human-verified train/test splits (disjoint from the other subsets)
human_verified_test = load_dataset("ibm-granite/ChartNet", "human_verified", split="test")

# Grounded QA with bounding boxes
grounded_qa = load_dataset("ibm-granite/ChartNet", "grounded_qa", split="train")
```

> **Tip**
> Each subset can be several hundred gigabytes. To explore before committing to a full download, load a single file:
>
> ```python
> first_core_file = load_dataset("ibm-granite/ChartNet", data_files="core/core_000.parquet")
> print(first_core_file.shape)  # {'train': (10000, 5)}
> ```

## Try it, build on it, tell us what you find

Whether you are fine-tuning a compact VLM for chart extraction, building evaluation suites for chart reasoning, or studying grounded multimodal alignment, ChartNet offers an open, large-scale foundation — and we would love to see what the community does with it.

- 📦 **Dataset**: [huggingface.co/datasets/ibm-granite/ChartNet](https://huggingface.co/datasets/ibm-granite/ChartNet)
- 📖 **Paper (CVPR 2026)**: [arxiv.org/abs/2603.27064](https://arxiv.org/abs/2603.27064)
- 🌍 **Real-world charts subset**: [ChartNet_RealWorldChart](https://huggingface.co/datasets/2077AIDataFoundation/ChartNet_RealWorldChart)
- 📊 **Chart understanding in Docling**: [from visuals to structured tables](https://www.docling.ai/blog/20260203_00_chart_understanding_in_docling/)

Questions, findings, or ideas for new subsets? Join the discussion on the [dataset's community tab](https://huggingface.co/datasets/ibm-granite/ChartNet/discussions) or reach out to the Docling community.
