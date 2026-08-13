/**
 * Mobile navigation drawer.
 *
 * Replaces the previous hover-driven <details> dropdown, which was unusable on
 * touch and closed itself on a timer.
 */

export function setupNavigation(root = document) {
  const toggle = root.querySelector("[data-menu-toggle]");
  const drawer = root.querySelector("#mobile-nav");
  if (!toggle || !drawer) return;

  function setOpen(open) {
    drawer.dataset.open = open ? "true" : "false";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", () => {
    setOpen(drawer.dataset.open !== "true");
  });

  // Following a link inside the drawer should close it.
  drawer.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.dataset.open === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // A resize back to desktop must not leave the drawer stuck open.
  window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}
