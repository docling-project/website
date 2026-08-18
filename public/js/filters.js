/**
 * Client-side filtering for the blog and papers listings.
 *
 * The static build has no server to handle `?filter=`, so the query parameter
 * is applied here and kept in sync with the URL for shareable links.
 */

function applyFilter(container, value) {
  container.querySelectorAll("[data-category]").forEach((element) => {
    const show = value === "all" || element.dataset.category === value;
    element.hidden = !show;
  });

  // Papers are grouped under year headings; hide a heading whose papers are
  // all filtered out.
  container.querySelectorAll("[data-year]").forEach((heading) => {
    let node = heading.nextElementSibling;
    let visible = false;
    while (node && !node.hasAttribute("data-year")) {
      if (node.dataset.category !== undefined && !node.hidden) {
        visible = true;
        break;
      }
      node = node.nextElementSibling;
    }
    heading.hidden = !visible;
  });

  const list = container.querySelector(".posts");
  if (!list) return;

  const anyVisible = Array.from(list.querySelectorAll(".post")).some((el) => !el.hidden);
  let empty = list.querySelector(".no-match");

  if (!anyVisible && !empty) {
    empty = document.createElement("p");
    empty.className = "no-match";
    empty.textContent = "No matching posts";
    list.appendChild(empty);
  }
  if (empty) empty.hidden = anyVisible;
}

export function setupFilters(root = document) {
  root.querySelectorAll("form.filters").forEach((form) => {
    const container = form.parentElement;
    const buttons = Array.from(form.querySelectorAll("button"));

    form.addEventListener("submit", (event) => event.preventDefault());

    function select(value) {
      buttons.forEach((button) => {
        const active = button.value === value;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
      applyFilter(container, value);

      const url = new URL(window.location);
      if (value && value !== "all") url.searchParams.set("filter", value);
      else url.searchParams.delete("filter");
      history.replaceState(null, "", url);
    }

    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        select(button.value);
      });
    });

    const requested = new URL(window.location).searchParams.get("filter") || "all";
    select(buttons.some((b) => b.value === requested) ? requested : "all");
  });
}
