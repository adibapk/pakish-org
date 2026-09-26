import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  CURRICULUM_TICKER_DURATION_SEC,
  CURRICULUM_TICKER_HEADING,
  getCurriculumTickerPauseLabel,
} from "./curriculum-ticker";
import { trustTools } from "./trust-tools";

const tickerComponentPath = join(
  process.cwd(),
  "components/layout/sections/curriculum-tools-ticker.tsx"
);

describe("curriculum tools ticker", () => {
  it("keeps the approved curriculum tool list", () => {
    assert.deepEqual(
      trustTools.map((tool) => tool.name),
      [
        "WordPress",
        "GitHub",
        "Next.js",
        "React",
        "OpenAI",
        "Canva",
        "Figma",
        "Cursor",
        "Git",
        "cPanel",
      ]
    );
  });

  it("uses truthful curriculum positioning copy", () => {
    assert.match(CURRICULUM_TICKER_HEADING, /students learn/i);
    assert.doesNotMatch(CURRICULUM_TICKER_HEADING, /partner|sponsor|client|certif/i);
  });

  it("uses a calm duration scaled to tool count", () => {
    assert.equal(CURRICULUM_TICKER_DURATION_SEC, 33);
    assert.ok(CURRICULUM_TICKER_DURATION_SEC >= 25);
    assert.ok(CURRICULUM_TICKER_DURATION_SEC <= 45);
  });

  it("exposes accessible pause labels", () => {
    assert.equal(getCurriculumTickerPauseLabel(false), "Pause tool scroll");
    assert.equal(getCurriculumTickerPauseLabel(true), "Resume tool scroll");
  });

  it("renders one semantic list and one aria-hidden visual clone", () => {
    const source = readFileSync(tickerComponentPath, "utf8");
    assert.equal((source.match(/<ul\b/g) ?? []).length, 1);
    assert.match(source, /aria-hidden="true"/);
    assert.match(source, /aria-pressed=\{paused\}/);
    assert.match(source, /clone-/);
  });

  it("namespaces reduced-motion overrides in globals.css", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    assert.match(css, /\.curriculum-ticker-track/);
    assert.match(css, /@keyframes curriculum-ticker/);
    assert.match(css, /\.curriculum-ticker-fade/);
    assert.match(css, /\.curriculum-ticker-track > \[aria-hidden="true"\]/);
  });
});
