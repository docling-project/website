/**
 * Google Analytics, loaded lazily.
 *
 * The tag used to sit in <head> as a blocking-ish request on every page. Here
 * it is injected after the page is interactive, so it never competes with the
 * hero for bandwidth.
 */

const MEASUREMENT_ID = "G-MP75NXFDH4";

export function setupAnalytics() {
  if (document.querySelector("script[data-analytics]")) return;

  const script = document.createElement("script");
  script.async = true;
  script.dataset.analytics = "true";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID);
}

/**
 * Interaction events named after the strategy's conversion funnel, so the
 * funnel can actually be measured rather than inferred from page views.
 */
export function setupEvents(root = document) {
  const send = (name, params) => window.gtag?.("event", name, params);

  root.querySelectorAll(".copy-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const where = button.closest(".install") ? "install_command" : "code_block";
      send("copy_code", { location: where });
    });
  });

  root.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.addEventListener("click", () => {
      send("inspect_structure", { layer: tab.id.replace(/^\w+tab-/, "") });
    });
  });
}
