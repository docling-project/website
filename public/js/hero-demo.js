/**
 * The hero conversion sequence.
 *
 * Motion rules from the strategy, all enforced here:
 *   - play only while visible (IntersectionObserver)
 *   - pause when the tab is hidden (visibilitychange)
 *   - respect prefers-reduced-motion (settles on the final stage, no cycling)
 *   - provide a pause control (always visible)
 *   - loop indefinitely; the reader can pause or jump between stages
 */

const STAGE_MS = 2200;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function createSequence(root) {
  const layers = Array.from(root.querySelectorAll(".hero-layer"));
  const dots = Array.from(root.querySelectorAll(".stage-dot"));
  const pauseButton = root.querySelector("[data-hero-pause]");
  const pauseLabel = root.querySelector("[data-pause-label]");

  let index = 0;
  let timer = null;
  let visible = false;
  let paused = false;

  function render() {
    layers.forEach((layer, i) => {
      layer.dataset.active = i === index ? "true" : "false";
    });
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
    root.dataset.stageActive = layers[index]?.dataset.stage ?? "";
  }

  function stop() {
    clearTimeout(timer);
    timer = null;
  }

  function tick() {
    index = (index + 1) % layers.length;
    render();
    schedule();
  }

  function schedule() {
    stop();
    if (!visible || paused) return;
    timer = setTimeout(tick, STAGE_MS);
  }

  function setPaused(next) {
    paused = next;
    if (pauseButton) {
      pauseButton.setAttribute(
        "aria-label",
        paused ? "Play the conversion animation" : "Pause the conversion animation",
      );
    }
    if (pauseLabel) pauseLabel.textContent = paused ? "Play" : "Pause";
    schedule();
  }

  function settleFinal() {
    index = layers.length - 1;
    setPaused(true);
  }

  // --- Controls ------------------------------------------------------------

  if (pauseButton) {
    pauseButton.addEventListener("click", () => setPaused(!paused));
  }

  // Clicking a stage dot jumps to that stage and pauses, so the reader can
  // inspect it without the sequence advancing under them. Attributes are set
  // here rather than in markup because the dots do nothing without this JS.
  dots.forEach((dot, i) => {
    dot.setAttribute("role", "button");
    dot.setAttribute("tabindex", "0");
    const jump = () => {
      index = i;
      render();
      setPaused(true);
    };
    dot.addEventListener("click", jump);
    dot.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        jump();
      }
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else schedule();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      schedule();
    },
    { threshold: 0.25 },
  );
  observer.observe(root);

  // --- Reduced motion ------------------------------------------------------

  function applyMotionPreference() {
    if (reduceMotion.matches) settleFinal();
  }

  reduceMotion.addEventListener("change", applyMotionPreference);

  render();
  applyMotionPreference();

  return { settleFinal };
}

export function setupHeroDemo(root = document) {
  root.querySelectorAll("[data-hero-demo]").forEach(createSequence);
}
