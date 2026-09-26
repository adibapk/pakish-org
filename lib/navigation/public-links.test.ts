import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  HOMEPAGE_ANCHOR_IDS,
  RETIRED_HOMEPAGE_ANCHOR_IDS,
  collectPublicNavHrefs,
  parseInternalHref,
  validatePublicNavHrefs,
} from "./public-links";

describe("public internal route and anchor links", () => {
  it("parses same-origin paths and hash fragments", () => {
    assert.deepEqual(parseInternalHref("/#faq"), { pathname: "/", hash: "faq" });
    assert.deepEqual(parseInternalHref("/admission?training=office-team"), {
      pathname: "/admission",
      hash: null,
    });
    assert.deepEqual(parseInternalHref("/courses/ai-productivity"), {
      pathname: "/courses/ai-productivity",
      hash: null,
    });
  });

  it("keeps retired homepage anchors out of active navigation", () => {
    assert.ok(RETIRED_HOMEPAGE_ANCHOR_IDS.has("team"));
    assert.ok(RETIRED_HOMEPAGE_ANCHOR_IDS.has("glimpses"));
    assert.ok(!HOMEPAGE_ANCHOR_IDS.has("team"));
    assert.ok(!HOMEPAGE_ANCHOR_IDS.has("glimpses"));
  });

  it("validates all collected public nav/footer links", () => {
    const hrefs = collectPublicNavHrefs();
    const issues = validatePublicNavHrefs(hrefs);
    assert.deepEqual(
      issues,
      [],
      issues.map((issue) => `${issue.source}: ${issue.href} — ${issue.reason}`).join("\n")
    );
  });

  it("flags retired team/glimpses anchors if reintroduced", () => {
    const issues = validatePublicNavHrefs([
      { href: "/#team", label: "Team", source: "test" },
      { href: "/#glimpses", label: "Glimpses", source: "test" },
    ]);
    assert.equal(issues.length, 2);
  });
});
