/**
 * Entry point.
 *
 * Loaded as a module, so it is deferred by default and never blocks rendering.
 * Each concern lives in its own module and is a no-op on pages that do not use
 * it, so there is no per-page bundle to maintain.
 */

import { setupAnalytics, setupEvents } from "./analytics.js";
import { setupClipboard } from "./clipboard.js";
import { setupFilters } from "./filters.js";
import { setupGithubStats } from "./github.js";
import { setupHeroDemo } from "./hero-demo.js";
import { setupNavigation } from "./navigation.js";
import { setupTabs } from "./tabs.js";

function init() {
  setupNavigation();
  setupClipboard();
  setupTabs();
  setupHeroDemo();
  setupFilters();
  setupGithubStats();

  setupAnalytics();
  setupEvents();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
