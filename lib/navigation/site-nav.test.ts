import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  DESKTOP_PRIMARY_LINKS,
  getCourseNavItems,
  isNavActive,
  MOBILE_SUPPORT_LINKS,
  resolveNavHref,
  TRAINING_LINKS,
} from "./site-nav";

describe("site navigation information architecture", () => {
  it("exposes all published courses in the courses menu", () => {
    const items = getCourseNavItems();
    assert.equal(items.length, 7);
    assert.ok(items.every((item) => item.href.startsWith("/courses/")));
  });

  it("keeps approved desktop primary links without payment methods or FAQ", () => {
    const labels = DESKTOP_PRIMARY_LINKS.map((link) => link.label);
    assert.deepEqual(labels, ["Women's Empowerment", "Insights", "Academy"]);
    assert.ok(
      !labels.some((label) =>
        ["Payment Methods", "FAQ", "Campuses", "Training Options"].includes(label)
      )
    );
  });

  it("places Karachi, live online and team training in the training group", () => {
    assert.deepEqual(
      TRAINING_LINKS.map((link) => link.label),
      ["Karachi Campus", "Live Online", "Team Training"]
    );
    assert.equal(TRAINING_LINKS[0].href, "/campus/gulshan-e-iqbal");
    assert.equal(TRAINING_LINKS[1].href, "/#learning-options");
    assert.equal(TRAINING_LINKS[2].href, "/admission?training=office-team");
  });

  it("keeps payment methods and FAQ in mobile support only", () => {
    const labels = MOBILE_SUPPORT_LINKS.map((link) => link.label);
    assert.ok(labels.includes("Payment Methods"));
    assert.ok(labels.includes("FAQ"));
    assert.ok(labels.includes("Apply for Admission"));
  });

  it("resolves hash links from non-home routes", () => {
    assert.equal(resolveNavHref("#faq", "/courses"), "/#faq");
    assert.equal(resolveNavHref("/#learning-options", "/admission"), "/#learning-options");
    assert.equal(resolveNavHref("#faq", "/"), "#faq");
    assert.equal(resolveNavHref("/#faq", "/courses"), "/#faq");
  });

  it("marks active internal routes", () => {
    assert.equal(isNavActive("/insights", "/insights"), true);
    assert.equal(isNavActive("/insights", "/insights/sample"), true);
    assert.equal(isNavActive("/womens-empowerment", "/courses"), false);
  });
});
