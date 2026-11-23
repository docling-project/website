/**
 * Benchmark explorer embed.
 *
 * The explorer keeps its view in the URL hash; a docling.ai/benchmarks/#… link
 * hands that hash to the framed explorer so shared links open the same view.
 */

export function setupExplorerEmbed() {
  const frame = document.querySelector("[data-explorer-embed]");
  if (frame && location.hash) frame.src = frame.src.split("#")[0] + location.hash;
}
