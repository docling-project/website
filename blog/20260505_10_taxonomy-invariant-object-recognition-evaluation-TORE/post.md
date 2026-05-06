---
title: Taxonomy-invariant Object Recognition Evaluation (TORE)
date: 05-05-2026
summary: Document layout analysis evaluation metric that works across heterogeneous class taxonomies
thumbnail: images/thumbnail.png
category: technical
---


Document layout analysis — the task of locating and classifying elements such as titles, tables, figures, and text blocks within a page — is a cornerstone of modern document AI pipelines. Yet evaluating how well a model performs this task turns out to be surprisingly tricky. Two fundamental difficulties stand out immediately:

- By definition each model uses its own taxonomoy of classes, making it very hard to perform cross-taxonomy evaluations.
- The most widely used metric, mean Average Precision (mAP), is known to have many limitations and cannot be applied in a meaningful way when the predictions lack confidence scores.

In this article we will present the "Taxonomy-invariant Object Recognition Evaluation (TORE)" method which allows to:

- Compute a multi-label confusion matrix that provides insights about the recall and precision for each individual class. This can be computed regardless of the existence of confidence scores.
- Allows evaluations across class taxonomies.
- Can be implemented efficiently using SIMD operations.


## Limitations of the mAP metric and qualitative evaluation

As it has already been observed (see [[1]](https://arxiv.org/abs/2509.11720), [[2]](https://arxiv.org/abs/2011.10772), [[5]](https://github.com/cocodataset/cocoapi/issues/678)) the mean Average Precision metric suffers from many limitations.
The most critical shortcoming is that mAP cannot be computed in a meaningful way when the predictions lack confidence scores.
Without a way to rank the predictions, the Precision-Recall curve becomes a single point and this make the computation of the Average Precision meaningless.
Furthermore, mAP does not account for the degree of bounding box overlap in its evaluation. Any prediction that meets the minimum IoU threshold is treated as equally valid — whether it barely clears the threshold or aligns perfectly with the ground truth.
Additional implementation choices like the interpolation of the PR curve, the way how the area under the PR curve is calculated and boundaries on the maximum number of image predictions have been proved to affect the evaluation results.
Finally, mAP offers no mechanism for diagnosing the strengths and weaknesses of a model's predictions. Knowing which specific classes the model excels at or struggles with, for instance, would be invaluable to the model designer.

A qualitative study of layout analysis in real-world documents reveals that the high complexity of documents often yields ambiguous annotations.
As shown in Figure1 it is not clear if the ground truth data (left side) or the model predictions (right side) are correct or maybe both are valid layout resolutions.
In the first example the main body of the page has been annotated as one big `Picture`, but the model predicts a more detailed classification where textual elements have been identified as `Section-Header`, `Text` and `List Item` and the bounding boxes of the pictures have been reduced to cover only the visual content.

![Ambiguous predictions1](images/ambiguous_0e83a04a6b4eaece3ec8284b8a359f45de542aced44968208036fe58b5bbc106.png)
![Ambiguous predictions2](images/ambiguous_f4118d2bc334935c34bd8214f6d9980b39d0e43ba81b145a7ecb0033bc2ca127.png)
*Figure 1. Ambiguous document layout analysis predictions.*


## Pixel-wise Layout Resolution: The Core Idea

The central insight is to project every layout prediction directly onto the image pixels rather than reasoning about bounding boxes as geometric objects.

![Pixel-wise layout resolution illustration](slide-05.jpg)

Each pixel is assigned one or more class labels depending on the predictions that cover it. Ground truth pixels always carry exactly one label (or the background class Z), because ground truth annotations are non-overlapping. Predicted pixels, however, may carry multiple labels whenever predicted bounding boxes overlap. A background class is added automatically for any pixel that falls outside all annotated or predicted regions, so the evaluation is always complete — no pixel is left unaccounted for.

This representation has a clean interpretation: an overlap of predicted bounding boxes becomes a multi-label assignment on the pixels they share, and background "leakage" is simply those pixels that the ground truth marks as background but the model has claimed for some content class (or vice versa).

---

## Building the Confusion Matrix for a Single Taxonomy

When the ground truth and the model share the same classification taxonomy, the evaluation reduces to a standard multi-label confusion matrix. The matrix rows represent ground truth classes and the columns represent predicted classes; each cell (i, j) accumulates the fractional pixel count for pixels that belong to class i according to the ground truth and are predicted as class j.

![Single-taxonomy confusion matrix and recall/precision matrices](slide-06.jpg)

Correct predictions land on the diagonal — these are the **gains**. Off-diagonal entries are the **penalties**, i.e., mispredictions. Two derivative matrices, the **Recall matrix** and the **Precision matrix**, are obtained by dividing each row by its row sum and each column by its column sum, respectively. The main diagonal of these derivative matrices then gives the recall and precision vectors per class, and heatmap visualizations make patterns immediately legible:

- High off-diagonal values signal misclassifications.
- High values in the first row (excluding the background-background cell) indicate that the model predicts content where the ground truth sees background — in other words, bounding boxes that are too large.
- High values in the first column (excluding the background-background cell) indicate the opposite: bounding boxes that are too small, missing content that the ground truth covers.

Because the ground truth can assign at most one class per pixel while predictions may be multi-label, the algorithm that fills the confusion matrix must handle four distinct cases pixel by pixel: (1) prediction and ground truth are a perfect match; (2) prediction is a superset of the ground truth classes (over-prediction); (3) prediction is a subset (under-prediction); and (4) prediction and ground truth have partial overlap and some divergence. The confusion matrices computed at the page level are then summed across the entire dataset to yield the dataset-level matrix.

![Multi-label confusion matrix algorithm](slide-07.jpg)

---

## Extending to Dual Taxonomies

The most novel part of this framework is how it handles the case where the model under evaluation uses a different classification taxonomy from the ground truth (or from a reference model). This scenario is common: two document AI systems trained on different datasets may use different, yet semantically related, label sets.

![Dual-taxonomy confusion matrix structure](slide-08.jpg)

When two taxonomies are involved, the confusion matrix is extended to cover all classes from both taxonomies simultaneously. The resulting matrix is sparse and has a clear block structure: the rows corresponding to the prediction taxonomy and the columns corresponding to the ground truth taxonomy contain zeros (a model trained on taxonomy B never directly predicts a class from taxonomy A), and vice versa. This means the classic recall and precision vectors per class can no longer be computed — the diagonal is no longer meaningful in isolation.

What can be extracted, however, is highly informative. From the **Recall matrix**, one can start from a prediction class (column) and trace which ground truth classes (rows) it maps to most strongly — revealing the semantic relationship between the two vocabularies. From the **Precision matrix**, one starts from a ground truth class (row) and identifies which prediction classes correspond to it. In practice this allows a researcher to see, for instance, that prediction class P₁ is strongly related to ground truth class GTₙ, or that prediction class Pₘ cannot be easily mapped to any ground truth class at all.

---

## Reduced Matrices: A Common Currency Across Taxonomies

Because recall and precision vectors cannot be defined when two taxonomies differ, a further abstraction is needed to consolidate evaluations across settings. The solution is the **reduced matrix**: collapse all non-background classes into a single "non-background" bin by summing the corresponding pixel counts.

![Reduced matrices illustration](slide-09.jpg)

The result is always a 2×2 matrix — background versus non-background — regardless of the original taxonomy size or the number of taxonomies involved. This reduction can be applied to the raw confusion matrix as well as to any of its derivative matrices (recall, precision, F1, and so on), and it works identically whether one or two taxonomies are in play. The reduced matrices serve two concrete purposes: they make it possible to evaluate over- and under-sized predicted bounding boxes in a taxonomy-agnostic way, and they provide a consistent basis for comparing results across heterogeneous experimental settings.

---

## Implementation: Binary Encoding and Parallelism

Efficiency is not an afterthought. The framework encodes every pixel's class assignment as a bit-packed integer using `uint64` values, which can represent up to 63 content classes plus the background class (index 0). Each class occupies one bit at positions 1–63, and the background occupies bit 0.

![Implementation details: binary encoding and compression](slide-10.jpg)

A compression step further reduces the computational cost. Rather than processing every pixel independently, the implementation counts the number of distinct (ground truth, prediction) pixel-pairs that appear on a page. Only the contribution matrix for each unique pair needs to be computed; the page-level confusion matrix is then the weighted sum of these contribution matrices, each multiplied by the number of times its corresponding pixel-pair appears. Because the number of unique pixel-pairs is substantially smaller than the total pixel count, this dramatically reduces the computational overhead. Finally, because each page is entirely independent of the others, page-level matrices can be computed in parallel — something that mAP computation cannot offer.

---

## Summary

This pixel-wise evaluation framework addresses the limitations of existing approaches for document layout analysis in a coherent and systematic way. It handles multi-label predictions arising from overlapping bounding boxes, accounts for background regions even when they are absent from dataset annotations, and — crucially — extends naturally to comparisons across models that operate under different classification taxonomies. The reduced matrix abstraction provides a common currency for cross-taxonomy comparison, while the bit-packed binary encoding and representation compression keep the runtime low enough to support rapid experimentation. Together, these properties make it a practical and principled tool for anyone developing or benchmarking document layout models at scale.


## References

- [[1] "Advanced Layout Analysis Models for Docling"](https://arxiv.org/abs/2509.11720)
- [[2] "Multi-Label Classifier Performance Evaluation with Confusion Matrix"](https://csitcp.org/paper/10/108csit01.pdf)
- [[3] "One Metric to Measure them All: Localisation Recall Precision (LRP) for Evaluating Visual Detection Tasks"](https://arxiv.org/abs/2011.10772)
- [[4] "MinerU2.5: A Decoupled Vision-Language Model for Efficient High-Resolution Document Parsing"](https://arxiv.org/abs/2509.22186)
- [[5] "mAP is wrong if all scores are equal](https://github.com/cocodataset/cocoapi/issues/678)

