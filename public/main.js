async function load() {
  // Analytics.
  window.dataLayer = window.dataLayer ?? [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-MP75NXFDH4");

  // Highlight code.
  hljs.highlightAll();

  // Open dropdown on hover.
  document.querySelectorAll("nav details").forEach((details) => {
    details.addEventListener("mouseenter", () => {
      details.setAttribute("data-hover", "true");
      details.open = true;
    });

    details.addEventListener("mouseleave", () => {
      details.removeAttribute("data-hover");
      setTimeout(
        () => (details.open = details.hasAttribute("data-hover")),
        1000,
      );
    });
  });
  document.addEventListener("click", () => {
    const menu = document.querySelector("nav details");
    if (menu.open) {
      menu.open = false;
    }
  });

  // Fetch GitHub stars.
  const response = await fetch(
    "https://api.github.com/repos/docling-project/docling",
    { cache: "force-cache" },
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
    const query = [hash, pre]
      .map((t) => `[data-id="${t}"],[id="${t}"],[href="#${t}"]`)
      .join(",");

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
      if (nextTarget) {
        addTargets(nextTarget.href.split("#")[1]);
        targetIndex = (targetIndex + 1) % targets.length;
      }
    }
  }
  swap();
  setInterval(swap, 10000);

  // Prevent scroll to stack page.
  document
    .querySelectorAll(".stack a")
    .forEach((el) =>
      el.addEventListener("click", (e) => window.scrollTo(0, window.scrollY)),
    );

  // Client-side filtering for the blog and papers listings (the static site
  // has no server to handle the `?filter=` query param).
  setupFilters();
}

function setupFilters() {
  document.querySelectorAll("form.filters").forEach((form) => {
    const container = form.parentElement;
    const buttons = Array.from(form.querySelectorAll("button"));

    // Don't navigate away — filter in place instead.
    form.addEventListener("submit", (e) => e.preventDefault());

    function select(value) {
      buttons.forEach((b) => b.classList.toggle("active", b.value === value));
      applyFilter(container, value);

      const url = new URL(window.location);
      if (value && value !== "all") {
        url.searchParams.set("filter", value);
      } else {
        url.searchParams.delete("filter");
      }
      history.replaceState(null, "", url);
    }

    buttons.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        select(btn.value);
      }),
    );

    // Apply the filter requested via the URL on first load.
    const initial = new URL(window.location).searchParams.get("filter") || "all";
    select(buttons.some((b) => b.value === initial) ? initial : "all");
  });
}

function applyFilter(container, value) {
  const items = container.querySelectorAll("[data-category]");
  items.forEach((el) => {
    const show = value === "all" || el.dataset.category === value;
    el.style.display = show ? "" : "none";
  });

  // Papers are grouped under <h3> year headings; hide a heading when none of
  // its papers are visible.
  container.querySelectorAll("h3").forEach((heading) => {
    let visible = false;
    let node = heading.nextElementSibling;
    while (node && node.tagName !== "H3") {
      if (node.dataset.category !== undefined && node.style.display !== "none") {
        visible = true;
        break;
      }
      node = node.nextElementSibling;
    }
    heading.style.display = visible ? "" : "none";
  });

  // Show a placeholder when a blog filter matches nothing.
  const posts = container.querySelector(".posts");
  if (posts) {
    let empty = posts.querySelector(".no-match");
    const anyVisible = Array.from(posts.querySelectorAll(".post")).some(
      (el) => el.style.display !== "none",
    );
    if (!anyVisible) {
      if (!empty) {
        empty = document.createElement("div");
        empty.className = "no-match";
        empty.textContent = "No matching posts";
        posts.appendChild(empty);
      }
      empty.style.display = "";
    } else if (empty) {
      empty.style.display = "none";
    }
  }
}
