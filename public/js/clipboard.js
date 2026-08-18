/**
 * Copy-to-clipboard for install commands and code blocks.
 *
 * A button may carry its text in `data-copy` (single-line commands). Multi-line
 * source is read from the sibling <code> instead, because pyjsx re-indents
 * multi-line attribute values and would corrupt the copied text.
 */

const RESET_MS = 2000;

function textFor(button) {
  const explicit = button.dataset.copy;
  if (explicit) return explicit;

  const container = button.closest(".code-block, .install");
  const code = container?.querySelector("code");
  return code ? code.textContent : "";
}

async function copy(button) {
  const text = textFor(button);
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Clipboard API needs a secure context; fall back to a scratch selection.
    const scratch = document.createElement("textarea");
    scratch.value = text;
    scratch.setAttribute("readonly", "");
    scratch.style.position = "fixed";
    scratch.style.opacity = "0";
    document.body.appendChild(scratch);
    scratch.select();
    try {
      document.execCommand("copy");
    } finally {
      scratch.remove();
    }
  }

  button.dataset.copied = "true";
  const label = button.getAttribute("aria-label");
  button.setAttribute("aria-label", "Copied");

  clearTimeout(button._resetTimer);
  button._resetTimer = setTimeout(() => {
    delete button.dataset.copied;
    if (label) button.setAttribute("aria-label", label);
  }, RESET_MS);
}

export function setupClipboard(root = document) {
  root.querySelectorAll(".copy-btn").forEach((button) => {
    button.addEventListener("click", () => copy(button));
  });
}
