async function load() {
  // Highlight code.
  hljs.highlightAll();

  // Fetch GitHub stars.
  const response = await fetch(
    "https://api.github.com/repos/docling-project/docling",
    { cache: "force-cache" },
  );
  const stars = (await response.json()).stargazers_count;

  if (stars) {
    document.getElementById("stars").innerHTML = Math.floor(stars / 1000) + "k";
  }

  // Propagate URL hash to CSS target class for elements with the same id or data-id.
  window.addEventListener("hashchange", function (event) {
    [
      ["remove", "oldURL"],
      ["add", "newURL"],
    ].forEach(([op, tense]) => {
      const hash = new URL(event[tense]).hash.slice(1);
      document
        .querySelectorAll(
          `[data-id="${hash}"], [id="${hash}"], [href="#${hash}"]`,
        )
        .forEach((el) => el.classList[op]("target"));
    });
  });
}
