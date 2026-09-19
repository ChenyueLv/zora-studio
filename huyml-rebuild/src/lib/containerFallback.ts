/**
 * Container query units (cqw/cqh) and @container for engines that lack them:
 * Chromium < 105 (many Android vendor browsers) and Safari < 16.
 *
 * scripts/legacy-css-fallbacks.ts rewrites every `2cqw` into a fallback
 * `calc(2 * var(--cqw))` placed before the original declaration, and copies each
 * `@container (max-width: N)` rule for subjects inside a `[data-cq-max~="N"]`. This
 * module supplies those variables and attributes. Engines with native support
 * never run it and keep using the original declarations.
 */

/** Every selector that declares `container-type`; the build fails if one is missing. */
export const CONTAINERS: Record<string, "size" | "inline-size"> = {
  ".ppt-skill": "size",
  ".education-card": "size",
  ".edu-product-canvas": "size",
  ".story-canvas": "size",
  ".story-canvas-board": "inline-size",
  ".ch-music.music-player": "size",
  ".music-record-column": "size",
  ".ch-agent.cv-agent": "size",
  ".create-canvas-card": "inline-size",
};
/** Every `@container (max-width: Npx)` threshold; the build fails on any other. */
export const CONTAINER_BREAKPOINTS = [380, 400];

/** Returns a function that removes the fallback again, or nothing when unneeded. */
export function installContainerFallback(force = false) {
  if (typeof ResizeObserver === "undefined") return;
  if (!force && window.CSS?.supports?.("width", "1cqw")) return;
  const selector = Object.keys(CONTAINERS).join(",");
  const style = document.head.appendChild(document.createElement("style"));
  const sheet = style.sheet as CSSStyleSheet;
  // Without a container the units measure the small viewport, as the native ones do.
  sheet.insertRule(":root { --cqw: 1vw; --cqh: 1vh; }", 0);
  const rules = new Map<Element, CSSStyleRule>();
  let nextId = 0;

  const resize = new ResizeObserver((entries) => {
    for (const { target, contentRect } of entries) {
      const rule = rules.get(target);
      if (!rule) continue;
      rule.style.setProperty("--cqw", `${contentRect.width / 100}px`);
      const sized = Object.entries(CONTAINERS).some(
        ([container, type]) => type === "size" && target.matches(container),
      );
      if (sized)
        rule.style.setProperty("--cqh", `${contentRect.height / 100}px`);
      target.setAttribute(
        "data-cq-max",
        CONTAINER_BREAKPOINTS.filter((max) => contentRect.width <= max).join(
          " ",
        ),
      );
    }
  });
  const adopt = (element: Element) => {
    if (rules.has(element)) return;
    const id = `[data-cq-id="${nextId}"]`;
    element.setAttribute("data-cq-id", String(nextId++));
    // The units describe a container to its contents, never to itself: a nested
    // container sizes its own box with the units of the container around it.
    const index = sheet.insertRule(
      `${id} > *, ${id}::before, ${id}::after {}`,
      sheet.cssRules.length,
    );
    rules.set(element, sheet.cssRules[index] as CSSStyleRule);
    resize.observe(element);
  };
  const release = (element: Element) => {
    const rule = rules.get(element);
    if (!rule) return;
    rules.delete(element);
    resize.unobserve(element);
    const index = Array.prototype.indexOf.call(sheet.cssRules, rule);
    if (index >= 0) sheet.deleteRule(index);
  };
  const each = (node: Node, visit: (element: Element) => void) => {
    if (!(node instanceof Element)) return;
    if (node.matches(selector)) visit(node);
    node.querySelectorAll(selector).forEach(visit);
  };

  const mutations = new MutationObserver((records) => {
    for (const record of records) {
      record.removedNodes.forEach((node) => each(node, release));
      record.addedNodes.forEach((node) => each(node, adopt));
    }
  });
  mutations.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  each(document.documentElement, adopt);
  return () => {
    mutations.disconnect();
    resize.disconnect();
    style.remove();
  };
}
