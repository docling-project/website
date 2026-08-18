/**
 * The hero conversion sequence.
 *
 * Motion rules from the strategy, all enforced here:
 *   - play only while visible (IntersectionObserver)
 *   - pause when the tab is hidden (visibilitychange)
 *   - respect prefers-reduced-motion (settles on the final stage, no cycling)
 *   - provide a pause control
 *   - stop once the meaning is clear, rather than looping forever
 */

const STAGE_MS = 2200;
// Stop after this many full passes: the sequence has made its point by then.
const MAX_LOOPS = 3;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function createSequence(root) {
  const layers = Array.from(root.querySelectorAll(".hero-layer"));
  const dots = Array.from(root.querySelectorAll(".stage-dot"));
  const pauseButton = root.querySelector("[data-hero-pause]");
  const pauseLabel = root.querySelector("[data-pause-label]");

  let index = 0;
  let loops = 0;
  let timer = null;
  let visible = false;
  let paused = false;
  let finished = false;

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
    index += 1;

    if (index >= layers.length) {
      loops += 1;
      if (loops >= MAX_LOOPS) {
        // Settle on the finished state: annotations plus output, inspectable.
        index = layers.length - 1;
        finished = true;
        render();
        stop();
        setPauseVisible(false);
        return;
      }
      index = 0;
    }

    render();
    schedule();
  }

  function schedule() {
    stop();
    if (!visible || paused || finished) return;
    timer = setTimeout(tick, STAGE_MS);
  }

  function setPauseVisible(show) {
    if (pauseButton) pauseButton.hidden = !show;
  }

  function settleFinal() {
    index = layers.length - 1;
    finished = true;
    render();
    stop();
    setPauseVisible(false);
  }

  // --- Controls ------------------------------------------------------------

  if (pauseButton) {
    pauseButton.addEventListener("click", () => {
      paused = !paused;
      pauseButton.setAttribute(
        "aria-label",
        paused ? "Play the conversion animation" : "Pause the conversion animation",
      );
      if (pauseLabel) pauseLabel.textContent = paused ? "Play" : "Pause";
      schedule();
    });
  }

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
    if (reduceMotion.matches) {
      settleFinal();
    }
  }

  reduceMotion.addEventListener("change", applyMotionPreference);

  render();
  applyMotionPreference();

  return { settleFinal };
}

export function setupHeroDemo(root = document) {
  root.querySelectorAll("[data-hero-demo]").forEach(createSequence);
}
