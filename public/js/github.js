/**
 * Live repository counts.
 *
 * Fills any `[data-github="<key>"]` element. Counts are cached in
 * sessionStorage so navigating the site does not re-hit the unauthenticated
 * API, which is rate-limited per IP.
 */

const REPO = "docling-project/docling";
const CACHE_KEY = "docling:gh";
const CACHE_MS = 60 * 60 * 1000;

function format(value) {
  if (typeof value !== "number") return "—";
  if (value >= 1000) {
    const thousands = value / 1000;
    return `${thousands >= 10 ? Math.round(thousands) : thousands.toFixed(1)}k`;
  }
  return String(value);
}

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (Date.now() - cached.at > CACHE_MS) return null;
    return cached.data;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // Storage may be unavailable (private mode, blocked cookies); not fatal.
  }
}

/**
 * The contributors endpoint has no count field. Asking for a single-item page
 * and reading the last page number off the `Link` header gives the total in
 * one request instead of walking every page.
 */
async function fetchContributors() {
  const response = await fetch(
    `https://api.github.com/repos/${REPO}/contributors?per_page=1&anon=true`,
  );
  if (!response.ok) return null;

  const link = response.headers.get("Link");
  if (!link) {
    // No Link header means a single page, so the count is however many came back.
    const page = await response.json();
    return Array.isArray(page) ? page.length : null;
  }

  const last = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
  return last ? Number(last[1]) : null;
}

async function fetchStats() {
  const response = await fetch(`https://api.github.com/repos/${REPO}`);
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  const repo = await response.json();

  return {
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    contributors: await fetchContributors().catch(() => null),
  };
}

export async function setupGithubStats(root = document) {
  const targets = Array.from(root.querySelectorAll("[data-github]"));
  if (!targets.length) return;

  const apply = (stats) => {
    targets.forEach((element) => {
      const value = stats[element.dataset.github];
      if (value === null || value === undefined) {
        // Leave the placeholder rather than render a wrong number.
        return;
      }
      element.textContent = format(value);
    });
  };

  const cached = readCache();
  if (cached) {
    apply(cached);
    return;
  }

  try {
    const stats = await fetchStats();
    writeCache(stats);
    apply(stats);
  } catch {
    // Offline or rate-limited: the placeholder stays, nothing breaks.
  }
}
