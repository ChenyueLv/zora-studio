import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import postcss from "postcss";
import { expect, it } from "vitest";
import { legacyCssFallbacks } from "../scripts/legacy-css-fallbacks";

// Compared without whitespace: generated nodes carry no formatting of their own.
const tight = (css: string) => css.replace(/\s+/g, "");
const run = (css: string, only = false) =>
  tight(
    postcss([legacyCssFallbacks({ only })]).process(css, { from: undefined })
      .css,
  );
const gives = (css: string, expected: string, only = false) =>
  expect(run(css, only)).toBe(tight(expected));
const includes = (css: string, expected: string) =>
  expect(run(css)).toContain(tight(expected));

it("writes a variable fallback in front of every container unit", () => {
  gives(
    ".a { margin: 0 -1.5cqw; font-size: min(1.7cqw, 2.89cqh) }",
    `.a { margin: 0 calc(-1.5 * var(--cqw)); margin: 0 -1.5cqw;
      font-size: min(calc(1.7 * var(--cqw)), calc(2.89 * var(--cqh)));
      font-size: min(1.7cqw, 2.89cqh) }`,
  );
  gives(
    ".a { width: calc(100% + .5cqw) !important }",
    `.a { width: calc(100% + calc(.5 * var(--cqw))) !important;
      width: calc(100% + .5cqw) !important }`,
  );
});
it("falls back from small viewport units and prefixes masks once", () => {
  gives(
    ".a { max-height: min(78svh, 40dvh) }",
    ".a { max-height: min(78vh, 40vh); max-height: min(78svh, 40dvh) }",
  );
  gives(
    ".a { mask-image: none }",
    ".a { -webkit-mask-image: none; mask-image: none }",
  );
  gives(
    ".a { -webkit-mask-image: none; mask-image: none }",
    ".a { -webkit-mask-image: none; mask-image: none }",
  );
});
it("copies container queries onto subjects inside a matching container", () => {
  const css =
    "@container (max-width: 380px) { .card[data-x] .title, .note::after { font-size: 2cqw } }";
  // `.card` may be the container itself, so only the subject is scoped.
  includes(
    css,
    `.card[data-x] .title:where([data-cq-max~="380"] *),
     .note:where([data-cq-max~="380"] *)::after
     { font-size: calc(2 * var(--cqw)); font-size: 2cqw }`,
  );
  includes(css, "@container (max-width: 380px) {");
});
it("overrides custom properties, which old engines never reject", () => {
  gives(
    ".a { --size: max(36px, 6.4cqw) }",
    `.a { --size: max(36px, 6.4cqw) }
     @supports not ((width: 1cqw)) { .a { --size: max(36px, calc(6.4 * var(--cqw))) } }`,
  );
  includes(
    "@media (min-width: 1px) { .a { --step: 26svh } }",
    "@supports not ((height: 1svh)) { .a { --step: 26vh } } }",
  );
});
it("can render the fallbacks alone, as an old engine would", () => {
  gives(
    `.a { --size: 2cqw; gap: 2cqw; height: 90svh }
     @container (max-width: 400px) { .a { gap: 1px } }`,
    `.a { --size: calc(2 * var(--cqw)); gap: calc(2 * var(--cqw)); height: 90vh }
     .a:where([data-cq-max~="400"] *) { gap: 1px }`,
    true,
  );
});
it("refuses what the runtime would not handle", () => {
  expect(() => run(".unlisted { container-type: size }")).toThrow(/CONTAINERS/);
  expect(() => run(".ppt-skill { container-type: inline-size }")).toThrow(
    /CONTAINERS/,
  );
  expect(() => run("@container (max-width: 500px) { .a { gap: 0 } }")).toThrow(
    /CONTAINER_BREAKPOINTS/,
  );
  expect(() =>
    run("@container card (min-width: 380px) { .a { gap: 0 } }"),
  ).toThrow(/CONTAINER_BREAKPOINTS/);
  expect(() => run(".a { width: 2cqi }")).toThrow(/cqw and cqh/);
});
it("accepts every stylesheet of the site", () => {
  const sheets = (directory: string): string[] =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory()
        ? sheets(join(directory, entry.name))
        : entry.name.endsWith(".css")
          ? [join(directory, entry.name)]
          : [],
    );
  const files = sheets(join(__dirname, "../src"));
  expect(files.length).toBeGreaterThan(10);
  for (const file of files)
    expect(() => run(readFileSync(file, "utf8")), file).not.toThrow();
});
