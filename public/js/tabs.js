/**
 * Accessible tabs for the document demo and the quickstart.
 *
 * Implements the ARIA authoring-practices tab pattern: arrow keys move between
 * tabs, Home/End jump to the ends, and only the selected tab is in the tab
 * sequence so Tab moves out of the tablist rather than through it.
 */

function panelFor(tab) {
  return document.getElementById(tab.getAttribute("aria-controls"));
}

function select(tabs, next, { focus = true } = {}) {
  tabs.forEach((tab) => {
    const selected = tab === next;
    tab.setAttribute("aria-selected", selected ? "true" : "false");

    if (selected) {
      tab.removeAttribute("tabindex");
    } else {
      tab.setAttribute("tabindex", "-1");
    }

    const panel = panelFor(tab);
    if (panel) panel.hidden = !selected;
  });

  if (focus) next.focus();
}

function onKeydown(event, tabs) {
  const current = tabs.indexOf(event.target);
  if (current === -1) return;

  const keys = {
    ArrowRight: current + 1,
    ArrowLeft: current - 1,
    Home: 0,
    End: tabs.length - 1,
  };

  const target = keys[event.key];
  if (target === undefined) return;

  event.preventDefault();
  select(tabs, tabs[(target + tabs.length) % tabs.length]);
}

export function setupTabs(root = document) {
  root.querySelectorAll("[data-demo]").forEach((container) => {
    const tablist = container.querySelector('[role="tablist"]');
    if (!tablist) return;

    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => select(tabs, tab, { focus: false }));
    });

    tablist.addEventListener("keydown", (event) => onKeydown(event, tabs));
  });
}
