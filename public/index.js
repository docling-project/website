async function load() {
  // Highlight code.
  hljs.highlightAll();

  // Fetch GitHub stars.
  const response = await fetch(
    "https://api.github.com/repos/docling-project/docling",
    { cache: "force-cache" }
  );
  const stars = (await response.json()).stargazers_count;

  if (stars) {
    document.getElementById("stars").textContent =
      Math.floor(stars / 1000) + "k";
  }

  // Propagate URL hash to CSS target class for elements with the same id or data-id.
  function clearTargets() {
    document
      .querySelectorAll(".target")
      .forEach((el) => el.classList.remove("target"));
  }

  function addTargets(hash) {
    const pre = hash.split("-")[0];
    const query = [hash, pre].map(
      (t) => `[data-id="${t}"],[id="${t}"],[href="#${t}"]`
    ).join(",");

    document
      .querySelectorAll(query)
      .forEach((el) => el.classList.add("target"));
  }

  const hash = () => window.location.hash.slice(1);
  const hashOf = (url) => new URL(url).hash.slice(1);

  window.addEventListener("hashchange", (event) => {
    clearTargets();
    addTargets(hashOf(event.newURL));
  });

  // Update target on page load.
  addTargets(hash());

  // Switch between targets periodically, when no target is active.
  const targets = Array.from(document.querySelectorAll(".overview a"));
  let targetIndex = 0;

  function swap() {
    const explicit = hash()
      ? document.querySelector(`.overview a[href='#${hash()}'].target`)
      : null;

    if (!explicit) {
      const nextTarget = targets[targetIndex];
      clearTargets();
      addTargets(nextTarget.href.split("#")[1]);
      targetIndex = (targetIndex + 1) % targets.length;
    }
  }
  swap();
  setInterval(swap, 10000);

  // Prevent scroll to stack page.
  document
    .querySelectorAll(".stack a")
    .forEach((el) =>
      el.addEventListener("click", (e) => window.scrollTo(0, window.scrollY))
    );
}
