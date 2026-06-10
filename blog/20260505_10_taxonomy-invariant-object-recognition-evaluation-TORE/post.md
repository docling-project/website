---
title: Taxonomy-invariant Object Recognition Evaluation (TORE)
date: 10-06-2026
summary: Document layout analysis evaluation metric that works across heterogeneous class taxonomies
thumbnail: images/thumbnail.png
category: technical
---

<style>
dialog.lb { padding: 0; border: none; background: transparent; max-width: 95vw; max-height: 95vh; }
dialog.lb::backdrop { background: rgba(0,0,0,0.85); cursor: zoom-out; }
dialog.lb img { max-width: 95vw; max-height: 95vh; object-fit: contain; display: block; }
figure img { cursor: zoom-in; }
</style>

Document layout analysis — the task of locating and classifying elements such as titles, tables, figures, and text blocks within a page — is a cornerstone of modern document AI pipelines.
Yet evaluating how well a model performs this task turns out to be surprisingly tricky.
Three fundamental difficulties stand out immediately:

- The most widely used metric, mean Average Precision (mAP), is known to have many limitations which makes mAP inappropriate for the evaluation of document layout analysis.
- Most evaluation methods are applicable only between layout resolutions that use the same class taxonomy. This leaves outside cases like:
  - Evaluate a model on an annotated dataset that uses a different class taxonomy.
  - Use a non-annotated dataset to evaluate two models against each other, and each model uses its own class taxonomy.
- How to accelerate the computation of the metric on the CPU using SIMD operations.

In this article we will present the **"Taxonomy-invariant Object Recognition Evaluation (TORE)"** method which allows to overcome all above limitations.

In a typical TORE workflow the following steps take place:
- Generate rasterizations of the reference and predicted layout resolutions (bounding boxes + labels).
  - Each resolution is projected on top of the input image.
  - Each rasterized pixel is assigned one or more labels.
  - Assign the special class "Background" to the pixels without any annotation/detection.
  - The reference resolution can be either ground-truth annotations or the detections of a "reference" model.
- Convert the rasterized layout resolutions into a compressed binary format.
  - Each pixel is represented by a `uint64` number.
  - Only unique combinations of `(reference, predicted)` pixel pairs take part in the computation.
- Compute the Confusion Matrix and its derivatives Recall Matrix and Precision Matrix.
- Reduce the matrices to their `2x2` variants by collapsing the non-background classes together.

In the next sections we provide more insight.


## 1. Evaluation Challenges in Layout Analysis

As it has already been observed (see [[1]](https://arxiv.org/abs/2509.11720), [[3]](https://arxiv.org/abs/2011.10772), [[5]](https://github.com/cocodataset/cocoapi/issues/678)) mean Average Precision suffers from several notable limitations.
Most critically, mAP becomes meaningless when predictions lack confidence scores. Without a ranking mechanism, the Precision-Recall curve degenerates into a single point, rendering Average Precision nonsensical.
However many models provide predictions without confidence scores.
Beyond this, mAP treats all predictions that meet the minimum IoU threshold as equally valid, regardless of how precisely they overlap with the ground truth.
Implementation details such as PR curve interpolation, area computation methods, and caps on the number of predictions per image have also been shown to affect the evaluation results.
Finally, mAP offers no diagnostic value: it provides no insight into which classes a model excels at or struggles with — information that would be invaluable during model development.

A qualitative study of layout analysis in real-world documents reveals that the high complexity of documents often yield ambiguous annotations.
As shown in Figure 1 it is not clear if the ground truth data (left side) or the model predictions (right side) are correct or maybe both are valid layout resolutions.
In the example the main body of the page has been annotated as one big `Picture`, but the model predicts a more detailed classification where textual elements have been identified as `Section-Header`, `Text` and `List Item` and the bounding boxes of the pictures have been reduced to cover only the visual content.

<figure>
  <figcaption style="font-size: 1.1em; font-weight: 600; font-style: italic; margin-bottom: 0.5em;"><em>Figure 1. Ambiguous document layout analysis predictions.</em></figcaption>
  <img src="images/cropped_ambiguous_f4118d2bc334935c34bd8214f6d9980b39d0e43ba81b145a7ecb0033bc2ca127.png" alt="Ambiguous predictions1" onclick="this.nextElementSibling.showModal()" />
  <dialog class="lb" onclick="this.close()"><img src="images/cropped_ambiguous_f4118d2bc334935c34bd8214f6d9980b39d0e43ba81b145a7ecb0033bc2ca127.png" alt="Ambiguous predictions1" /></dialog>
</figure>
<!-- ![Ambiguous predictions2](images/ambiguous_0e83a04a6b4eaece3ec8284b8a359f45de542aced44968208036fe58b5bbc106.png) -->


## 2. Single Taxonomy Confusion Matrix and Derivatives

A confusion matrix is a tabular representation of a classifier’s predictions, where each row corresponds to a ground-truth class and each column to a predicted class.
The element `c[i,j]` denotes the number of pixels belonging to class `i` that were predicted as class `j`.
For a perfect classifier, the confusion matrix is purely diagonal.
In real-life classifications, the diagonal entries quantify correct predictions and count as "Gains",
while the off-diagonal entries correspond to mis-predictions and count as "Penalties".

In Figure 4 we can see a Confusion Matrix built for the classes `C1, C2, ... , Cn` and the special "Background" class `BG`.

<figure>
  <figcaption style="font-size: 1.1em; font-weight: 600; font-style: italic; margin-bottom: 0.5em;"><em>Figure 4. The Confusion Matrix quantifies the strengths and weaknesses of the predictions both globally and on a per-class basis</em></figcaption>
  <img src="images/scaled_confusion_matrix.png" alt="Confusion Matrix" onclick="this.nextElementSibling.showModal()" />
  <dialog class="lb" onclick="this.close()"><img src="images/scaled_confusion_matrix.png" alt="Confusion Matrix" /></dialog>
</figure>

Several performance measurements can derive out of the confusion matrix:

- **Recall matrix (row-wise normalized confusion matrix):** Provides a class-wise overview of recall. It shows how accurately each class is predicted and highlights systematic confusions, e.g., “class (X) is misclassified as class (Y) with this frequency”.
- **Precision matrix (column-wise normalized confusion matrix):** Provides a class-wise overview of precision by showing how reliable the predictions of each class are.
- **Recall and precision vectors:** Contain the exact recall and precision values for each class individually.

Finally, the confusion matrix and its derived recall and precision matrices can be visualized effectively using heatmaps, enabling intuitive inspection of prediction patterns and systematic errors.


## 3. Building the Confusion Matrix

Document layout analysis is a multi-class and multi-label task as it involves multiple classes and the prediction can assign multiple labels at the same pixel due to bounding box overlaps.
We can compute the confusion matrix per page by applying the approach of [[3]](https://csitcp.org/paper/10/108csit01.pdf) for each pixel.
The main idea of [[3]](https://csitcp.org/paper/10/108csit01.pdf) is the _"Algorithm 1"_ listed on page 9, which distinguishes 4 cases and assigns fractional _"Gains"_ and _"Penalties"_ for each sample of the dataset.
These 4 cases are:

- Case 1: The prediction has assigned to the sample the same label as in ground-truth (perfect match).
- Case 2: The prediction has assigned to the sample the label of the ground-truth plus some additional wrong label(s) (over-prediction).
- Case 3: The prediction has assigned to the sample only a subset of the ground-truth labels (under-prediction).
- Case 4: Predicted and ground-truth labels have some partial overlap and some diff (diff-prediction).

The "TORE" algorithm is an application of "Algorithm 1" for the use case where the samples are image pixels.
Additionally in TORE we omit the case 3, as the ground-truth has single-label annotations.
First we compute the confusion matrix for all pixels of a page and then we sum up to produce the dataset-level confusion matrix.


## 4. Example 2: TORE with a single Taxonomy

In the next example we will show how the confusion, recall and precision matrices look like when we apply the TORE metric on the "Heron" model for document layout analysis
([[1] "Advanced Layout Analysis Models for Docling"](https://arxiv.org/abs/2509.11720), [[2] "Heron - Docling"](https://huggingface.co/docling-project/docling-layout-heron))

The "Heron" model uses a taxonomy of 17 classes:

```python
[
    "Caption", "Footnote", "Formula", "List-item", "Page-footer", "Page-header", "Picture",
    "Section-header", "Table", "Text", "Title", "Document Index", "Code",
    "Checkbox-Selected", "Checkbox-Unselected", "Form", "Key-Value Region"
]
```

Additionally, the class `"Background"` has been added as the first row/column.

Figure 5 shows the "Confusion Matrix" of the model against the DocLayNet-v2 dataset which uses the same class taxonomy.
The rows correspond to the ground-truth, the columns to the predictions and each `cell(i,j)` shows the number of pixels that belong to `class-i` but have been predicted as `class-j`.
Notice that the pixel counts are fractional due the way the algorithm distributes "gains" and "penalties" for each predicted label.
We use a color code to indicate the magnitude of the cell counts and highlight the main diagonal with pink.

<figure>
  <figcaption style="font-size: 1.1em; font-weight: 600; font-style: italic; margin-bottom: 0.5em;"><em>Figure 5. The Confusion Matrix of Heron model on the DocLayNet v2 dataset</em></figcaption>
  <img src="images/heron_DLNv2_confusion_matrix.png" alt="Heron - Confusion Matrix" onclick="this.nextElementSibling.showModal()" />
  <dialog class="lb" onclick="this.close()"><img src="images/heron_DLNv2_confusion_matrix.png" alt="Heron - Confusion Matrix" /></dialog>
</figure>

If we normalize the confusion matrix row-wise (divide each cell with the sum of its row), we get the "Recall Matrix", as shown in Figure 6.
Given that an ideal recall matrix has values only on the main diagonal, the perfect predictor should have red cells on the diagonal and black elsewhere.

As we can see in the example of "Heron" the recall matrix provides invaluable insight on the performance of the model.
We can see immediately for which classes the model performs well or bad and in case of mis-classifications which classes are confusing the model.
For example we can see that "Heron" performs excellent for "Background" and quite well for the classes: "Picture", "Table", "Text", "Document Index", "Code" and "Form".
The recall for "Checkbox-Selected" and "Checkbox-Unselected" is still high but a bit lower.
The model lacks recall mostly for the classes "Key-Value Region", and "Title".
Also the recall reveals that "Heron" tends to mis-classify "Title" as "Section-Header".

If we extract the main diagonal elements we get the _Recall Vector_.

<figure>
  <figcaption style="font-size: 1.1em; font-weight: 600; font-style: italic; margin-bottom: 0.5em;"><em>Figure 6. The Recall Matrix of Heron model on the DocLayNet v2 dataset</em></figcaption>
  <img src="images/heron_DLNv2_recall_matrix.png" alt="Heron - Recall Matrix" onclick="this.nextElementSibling.showModal()" />
  <dialog class="lb" onclick="this.close()"><img src="images/heron_DLNv2_recall_matrix.png" alt="Heron - Recall Matrix" /></dialog>
</figure>

The Precision Matrix is the normalization of the confusion matrix column-wise (divide each cell with the sum of its column).
This is shown in Figure 7.
The precision matrix can also help to derive interesting conclusions for the performance of a model.
For example we see high off-diagonal value for the cell `["Background", "Key-Value Region"]`, which indicates that Heron misses key-value bounding boxes and mis-classifies them as "Background".

<figure>
  <figcaption style="font-size: 1.1em; font-weight: 600; font-style: italic; margin-bottom: 0.5em;"><em>Figure 7. The Precision Matrix of Heron model on the DocLayNet v2 dataset</em></figcaption>
  <img src="images/heron_DLNv2_precision_matrix.png" alt="Heron - Precision Matrix" onclick="this.nextElementSibling.showModal()" />
  <dialog class="lb" onclick="this.close()"><img src="images/heron_DLNv2_precision_matrix.png" alt="Heron - Precision Matrix" /></dialog>
</figure>

TODO: Add examples of specific images


## 5. Reduced Matrices

As we saw in the previous section the Confusion, Recall and Precision matrices are an invaluable source of information for the performance of a classifier.
At the same time this information can be intimidating. In case of Heron it means to analyze the information of 3 matrices (confusion, recall, precision) with dimensions `18x18`.
One way to abstract this information into a reduced form, is to sum up the cell values for all "non-background" classes into one class.
This way we produce reduced `2x2` matrices for the "Background" class and the "non-Background" super-class.
This abstraction allows to quickly check if the classifier can detect the elements of the page correctly, regardless of the type of document element.

In case of Heron, Figure 8 shows the reduced Recall and Precision matrices:


<figure>
  <figcaption style="font-size: 1.1em; font-weight: 600; font-style: italic; margin-bottom: 0.5em;"><em>Figure 8. Reduced Recall & Precision Matrices of Heron model on the DocLayNet v2 dataset</em></figcaption>
  <img src="images/heron_DLNv2_reduced_Recall_Precision.png" alt="Heron - Reduced Recall & Precision Matrices" onclick="this.nextElementSibling.showModal()" />
  <dialog class="lb" onclick="this.close()"><img src="images/heron_DLNv2_reduced_Recall_Precision.png" alt="Heron - Reduced Recall & Precision Matrices" /></dialog>
</figure>


## 6. Dual Taxonomies Confusion Matrix

So far we have constructed confusion matrices where both the ground truth (rows) and the model predictions (columns) use the same classes.
However very often we need to compare model predictions against datasets or other models that use different class taxonomies.
Assuming that the ground truth uses the classes `BG, GT1, ..., GTn` and a model uses the classes `BG, P1, ... , Pm`,
we can create a confusion matrix on top of the union-taxonomy with the classes `BG, GT1, ..., GTn, P1, ... Pm`.

This extended matrix will be sparse and have the block structure shown in Figure 9 where the non-zero values are:
- First column (Background) for the rows: `[BG, GT1, ..., GTn]`
- Top left block, for the rows `[BG, GT1, ..., GTn]` and columns: `[BG, P1, ..., Pm]`.

All other values are zero as the model never predicts on the ground truth taxonomy and the evaluation is never done against the model's taxonomy.

<figure>
  <figcaption style="font-size: 1.1em; font-weight: 600; font-style: italic; margin-bottom: 0.5em;"><em>Figure 9. Dual class taxonomies matrices</em></figcaption>
  <img src="images/scaled_dual_taxonomy_confusion_matrix.png" alt="Dual taxonomy confusion matrix" onclick="this.nextElementSibling.showModal()" />
  <dialog class="lb" onclick="this.close()"><img src="images/scaled_dual_taxonomy_confusion_matrix.png" alt="Dual taxonomy confusion matrix" /></dialog>
</figure>

As shown in Figure 9 we can derive Recall and Precision matrices by dividing each value over its row/column sum.
Notice that the classic recall and precision vectors per class can no longer be computed,
as the diagonal of the recall and precision matrices are no longer meaningful.

What can be extracted, however, is highly informative.
From the **Recall matrix**, one can start from a prediction class (column) and trace which ground truth classes (rows) it maps to most strongly — revealing the semantic relationship between the two vocabularies.
From the **Precision matrix**, one starts from a ground truth class (row) and identifies which prediction classes correspond to it.
In practice this allows a researcher to see, for instance, that prediction class `P1` is strongly related to ground truth class `GTn`, or that prediction class `Pm` cannot be easily mapped to any ground truth class at all.

Additionally, similarly to what happens with the same class taxonomy matrices, it is possible to reduce the matrix but collapsing all non-background classes into one class.

Figure 10 shows the full picture for the same class taxonomy and dual class taxonomies confusion matrices and their derivatives.

<figure>
  <figcaption style="font-size: 1.1em; font-weight: 600; font-style: italic; margin-bottom: 0.5em;"><em>Figure 10. Multiple class taxonomies matrices (read the diagram in the indicated order)</em></figcaption>
  <img src="images/scaled_TORE_multiple_taxonomies.png" alt="Multiple taxonomies matrices" onclick="this.nextElementSibling.showModal()" />
  <dialog class="lb" onclick="this.close()"><img src="images/scaled_TORE_multiple_taxonomies.png" alt="Multiple taxonomies matrices" /></dialog>
</figure>


## 7. Example 2: TORE with Dual Taxonomies

In this example we want to demonstrate how TORE can be used to compare models with different class taxonomies.
We will use "Heron" ([2](https://huggingface.co/docling-project/docling-layout-heron)) as the rerference and compare it to "nemotron-page-elements-v3" ([7](https://huggingface.co/nvidia/nemotron-page-elements-v3)).
The "nemotron-page-elements-v3" model uses the following class taxonomy:

```python
["table", "chart", "title", "infographic", "text", "header_footer"]
```

The input pages are taken from the test split of the "ViDoRe V3" dataset ([6](https://huggingface.co/collections/vidore/vidore-benchmark-v3)).
Notice that in this example we do not compare the models against any ground truth, but against each other.
We have selected "Heron" as the reference and "nemotron-page-elements-v3" as the measured model, but it could be the other way around.

In Figure 11 we illustrate the generated Confusion Matrix (click on the Figure to zoom in).
This dual-taxonomy confusion matrix has the expected block shape as described in [Section 6](#6.-dual-taxonomies-confusion_matrix), where certain parts of the matrix are all-zeros:

- The columns corresponding to the classes of the reference model ("Heron"). This happens because the measured model ("nemotron-page-elements-v3") is never going to predict such classes.
- The rows corresponding to the classes of the measured model ("nemotron-page-elements-v3"). This happens because the evaluation is done only for the classes of the reference model.

<figure>
  <figcaption style="font-size: 1.1em; font-weight: 600; font-style: italic; margin-bottom: 0.5em;"><em>Figure 11. The full Confusion Matrix of Heron vs nemotron-page-elements-v3 over the ViDoRe V3 dataset</em></figcaption>
  <img src="images/heron_vs_nemotron_page_elements_vidore_confusion_matrix.png" alt="Heron - nemotron - Confusion Matrix" onclick="this.nextElementSibling.showModal()" />
  <dialog class="lb" onclick="this.close()"><img src="images/heron_vs_nemotron_page_elements_vidore_confusion_matrix_unhidden.png" alt="Heron - nemotron - Full Confusion Matrix" /></dialog>
</figure>

In order to improve the readability of the confusion matrix, we have redrawn it while hiding the all-zeros rows and columns in Figure 12.
This allows to focus on the non-zero elements and make some semantic comparison across the predictions of the two models.

<figure>
  <figcaption style="font-size: 1.1em; font-weight: 600; font-style: italic; margin-bottom: 0.5em;"><em>Figure 12. The Confusion Matrix of Heron vs nemotron-page-elements-v3 without the zero rows/columns</em></figcaption>
  <img src="images/heron_vs_nemotron_page_elements_vidore_confusion_matrix.png" alt="Heron - nemotron - Confusion Matrix" onclick="this.nextElementSibling.showModal()" />
  <dialog class="lb" onclick="this.close()"><img src="images/heron_vs_nemotron_page_elements_vidore_confusion_matrix.png" alt="Heron - nemotron - Confusion Matrix" /></dialog>
</figure>

Similarly we provide illustrations while hiding the all-zero rows/columns of the Recall and Precision matrices in Figures 13 and 14 respectively.

<figure>
  <figcaption style="font-size: 1.1em; font-weight: 600; font-style: italic; margin-bottom: 0.5em;"><em>Figure 13. The Recall Matrix of Heron vs nemotron-page-elements-v3 over the ViDoRe V3 dataset</em></figcaption>
  <img src="images/heron_vs_nemotron_page_elements_vidore_recall_matrix.png" alt="Heron - nemotron - Recall Matrix" onclick="this.nextElementSibling.showModal()" />
  <dialog class="lb" onclick="this.close()"><img src="images/heron_vs_nemotron_page_elements_vidore_recall_matrix.png" alt="Heron - nemotron - Recall Matrix" /></dialog>
</figure>


<figure>
  <figcaption style="font-size: 1.1em; font-weight: 600; font-style: italic; margin-bottom: 0.5em;"><em>Figure 13. The Precision Matrix of Heron vs nemotron-page-elements-v3 over the ViDoRe V3 dataset</em></figcaption>
  <img src="images/heron_vs_nemotron_page_elements_vidore_precision_matrix.png" alt="Heron - nemotron - Recall Matrix" onclick="this.nextElementSibling.showModal()" />
  <dialog class="lb" onclick="this.close()"><img src="images/heron_vs_nemotron_page_elements_vidore_precision_matrix.png" alt="Heron - nemotron - Recall Matrix" /></dialog>
</figure>

First we can examine the Recall matrix column-by-column, to see how the predictions of "nemotron-page-elements-v3" map to the classes of "Heron":

- The `nvidia_table` class, as expected, maps mainly to `heron_Table` class. However there also some mappings to `heron_Document Index` and `heron_Form`. Most probably due to the fact that "Document Indices" and "Forms" look similar to a "Table".
- The `nvidia_chart` and `nvidia_infographic` map mainly to `heron_Picture`. Most probably because there are no "chart" and "infographic" classes in the taxonomy of "Heron". Then a Heron "picture" comes the closest to nemotron's "chart" and "infographic".
- The `nvidia_title` maps to `heron_page_header`, `heron_Section-header` and `heron_Title`. That comes without a surprise as all of them are essentially "titles", it's only that heron has a more fine-grained classification.
- The `nvidia_text` class is spread over multiple classes of heron. We would expect a stronger focus on the `heron_Text` class. Such discrepancy indicates that "nemotron-page-elements-v3` tends to be less precise than "Heron" and overuse the "nvidia_text" class in cases where another more-precise class could be more suitable.
- The `nvidia_header_footer` class maps mainly to `heron_Page-footer`, as was expected.

Examining the Precision matrix, we can see that the `Background` row has a non-neglidible mapping to columns other than the `Background`.
This indicates that that "nemotron-page-elements-v3" tends to produce larger bounding boxes, in comparison to "Heron", that extend over the page background.

Next we can show visualisations of the predictions from both models that support the findings revealed by the examination of the matrices,
where on the left side is the prediction of Nvidia's "nemotron-page-elements-v3" and on the right side is "heron":

+++


## 8. Implementation Optimizations

As already mentioned, the first step in TORE is to project the document layout resolution on the image pixels.
This process happens both for the reference resolutions and the predictions.
In the TORE implementation we bit-pack up to 64 labels per pixel inside an unsigned 64-bit integer (`uint64`).
In our encoding we allocate the `index-0` to the `BG` class and support up to 63 additional labels per pixel,
which provides enough space for overlapping bounding boxes.
This dense representation enables an efficient implementation of the [TORE algorithm](#3.-building-a-multi-class,-multi-label-confusion-matrix),
which computes multiple pixels in parallel using SIMD operations.

Figure 14 provides an example of the binary representation for the pixel labels used in TORE.

After the rasterization, compression step further reduces the computational cost.
Instead of processing every pixel independently, the implementation counts the number of distinct pixel-pairs `[reference, prediction]` that appear on the page.
The contribution matrix of each unique pair should be computed only once and then multiplied by the number of times this pair appears.
Because the number of unique pixel-pairs is substantially smaller than the total pixel count, this dramatically reduces the computational overhead.
Finally we parallelize the computation of the page-level confusion matrices.

<figure>
  <figcaption style="font-size: 1.1em; font-weight: 600; font-style: italic; margin-bottom: 0.5em;"><em>Figure 14. Example of TORE binary representation using uint4 (TORE implementation uses uint64). The bboxes with dashed lines correspond to the reference resolution (e.g. ground-truth) and the solid ones to the predictions.</em></figcaption>
  <img src="images/scaled_TORE_binary_representation.png" alt="TORE Binary Representation" onclick="this.nextElementSibling.showModal()" />
  <dialog class="lb" onclick="this.close()"><img src="images/scaled_TORE_binary_representation.png" alt="TORE Binary Representation" /></dialog>
</figure>


## 9. Summary

This pixel-wise evaluation framework addresses the limitations of existing approaches for document layout analysis in a coherent and systematic way.
It handles multi-label predictions arising from overlapping bounding boxes, accounts for background regions, and extends to comparisons across models that operate under different classification taxonomies.
The reduced matrix abstraction provides a common currency for cross-taxonomy comparison, while the bit-packed binary encoding and representation compression keep the runtime low enough to support rapid experimentation.
Together, these properties make it a practical and principled tool for anyone developing or benchmarking document layout models at scale.


## 10. References

- [1] "Advanced Layout Analysis Models for Docling" — [https://arxiv.org/abs/2509.11720](https://arxiv.org/abs/2509.11720)
- [2] "Heron for Docling on Hugging Face" — [https://huggingface.co/docling-project/docling-layout-heron](https://huggingface.co/docling-project/docling-layout-heron)
- [3] "Multi-Label Classifier Performance Evaluation with Confusion Matrix" — [https://csitcp.org/paper/10/108csit01.pdf](https://csitcp.org/paper/10/108csit01.pdf)
- [4] "One Metric to Measure them All: Localisation Recall Precision (LRP) for Evaluating Visual Detection Tasks" — [https://arxiv.org/abs/2011.10772](https://arxiv.org/abs/2011.10772)
- [5] "mAP is wrong if all scores are equal" — [https://github.com/cocodataset/cocoapi/issues/678](https://github.com/cocodataset/cocoapi/issues/678)
- [6] "ViDoRe V3" — [https://huggingface.co/collections/vidore/vidore-benchmark-v3](https://huggingface.co/collections/vidore/vidore-benchmark-v3)
- [7] "nemotron-page-elements-v3" — [https://huggingface.co/nvidia/nemotron-page-elements-v3](https://huggingface.co/nvidia/nemotron-page-elements-v3)


<!-- - [[4] "MinerU2.5: A Decoupled Vision-Language Model for Efficient High-Resolution Document Parsing"](https://arxiv.org/abs/2509.22186)  -->

