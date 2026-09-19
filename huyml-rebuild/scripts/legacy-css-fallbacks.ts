import type { AtRule, Declaration, Helpers, Plugin, Rule } from "postcss";
import {
  CONTAINER_BREAKPOINTS,
  CONTAINERS,
} from "../src/lib/containerFallback";

/**
 * Keeps the modern CSS as written and adds what older engines need in front of
 * it, so engines that understand the original declaration still use it:
 *
 * - `2cqw` → `calc(2 * var(--cqw))`; `@container (max-width: N)` rules are copied
 *   with `:where([data-cq-max~="N"] *)` on their subject.
 *   src/lib/containerFallback.ts feeds both.
 * - `90svh` → `90vh` (Chromium < 108, Safari < 15.4).
 * - `mask-image` → `-webkit-mask-image` (Chromium < 120).
 *
 * `only` drops the modern declarations instead, which lets a current browser
 * render exactly what an old one would, to compare the two.
 */
const NUMBER = "(-?(?:\\d+\\.?\\d*|\\.\\d+))";
const CONTAINER_UNIT = new RegExp(`${NUMBER}cq([wh])\\b`, "g");
const OTHER_CONTAINER_UNIT = /\dcq(i|b|min|max)\b/;
const SMALL_VIEWPORT_UNIT = new RegExp(`${NUMBER}[sdl]v(h|w|min|max)\\b`, "g");
const MASK = /^mask(-image|-size|-position|-repeat)?$/;
const MAX_WIDTH = /^\(\s*max-width\s*:\s*(\d+)px\s*\)$/;
const PSEUDO_ELEMENT =
  /(::[\w-]+(\([^)]*\))?|:(before|after|first-line|first-letter))$/;

export function legacyCssFallbacks({ only = false } = {}): Plugin {
  const container = (decl: Declaration) => {
    const selectors = (decl.parent as Rule).selectors ?? [];
    if (selectors.some((selector) => CONTAINERS[selector] !== decl.value))
      throw decl.error(
        `List "${selectors.join(", ")}" as "${decl.value}" in CONTAINERS (src/lib/containerFallback.ts).`,
      );
  };
  const containerQuery = (query: AtRule) => {
    const max = Number(MAX_WIDTH.exec(query.params.trim())?.[1]);
    if (!CONTAINER_BREAKPOINTS.includes(max))
      throw query.error(
        `Only @container (max-width: ${CONTAINER_BREAKPOINTS.join(" | ")}px) has a fallback; add the threshold to CONTAINER_BREAKPOINTS.`,
      );
    // A query tests the containers around the rule's subject, and other parts of
    // the selector may name the container itself: `.card[data-x] .title`.
    const scope = `:where([data-cq-max~="${max}"] *)`;
    const copy = query.clone();
    copy.each((node) => {
      if (node.type === "atrule")
        throw node.error("Nested at-rules in @container have no fallback.");
      if (node.type === "rule")
        node.selectors = node.selectors.map((selector) => {
          const pseudo = selector.search(PSEUDO_ELEMENT);
          return pseudo < 0
            ? selector + scope
            : selector.slice(0, pseudo) + scope + selector.slice(pseudo);
        });
    });
    query.after(copy.nodes ?? []);
    if (only) query.remove();
  };
  const declaration = (decl: Declaration, { AtRule }: Helpers) => {
    if (OTHER_CONTAINER_UNIT.test(decl.value))
      throw decl.error("Only cqw and cqh have a fallback.");
    const contained = decl.value.replace(
      CONTAINER_UNIT,
      "calc($1 * var(--cq$2))",
    );
    const value = contained.replace(SMALL_VIEWPORT_UNIT, "$1v$2");
    if (MASK.test(decl.prop)) {
      const prefixed = `-webkit-${decl.prop}`;
      const written = decl.parent?.some(
        (node) => node.type === "decl" && node.prop === prefixed,
      );
      if (!written) decl.cloneBefore({ prop: prefixed, value });
    }
    if (value === decl.value) return;
    const rule = decl.parent as Rule;
    if (only) decl.value = value;
    else if (!decl.prop.startsWith("--")) decl.cloneBefore({ value });
    // Any value parses for a custom property, so an old engine would keep the
    // modern one; it needs an explicit override instead of an earlier fallback.
    else if (rule.type === "rule" && !/keyframes$/.test(parentName(rule))) {
      const tests = [
        contained !== decl.value && "(width: 1cqw)",
        value !== contained && "(height: 1svh)",
      ].filter(Boolean);
      const override = rule.clone({ nodes: [] });
      override.append(decl.clone({ value }));
      rule.after(
        new AtRule({
          name: "supports",
          params: `not (${tests.join(" and ")})`,
          nodes: [override],
        }),
      );
    }
  };
  const parentName = (rule: Rule) =>
    rule.parent?.type === "atrule" ? (rule.parent as AtRule).name : "";
  return {
    postcssPlugin: "legacy-css-fallbacks",
    Once(root, helpers) {
      root.walkDecls("container-type", container);
      root.walkAtRules("container", containerQuery);
      // Snapshot first: what is written while walking must not be revisited.
      const declarations: Declaration[] = [];
      root.walkDecls((decl) => void declarations.push(decl));
      declarations.forEach((decl) => declaration(decl, helpers));
    },
  };
}
