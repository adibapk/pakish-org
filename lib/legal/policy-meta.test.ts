import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ADMISSION_PAGE_COPY } from "@/lib/admission/constants";
import {
  NO_CHANGE_OF_MIND_CORE,
  POLICY_VERSION,
  REFUND_POLICY_PATH,
  TERMS_PATH,
} from "@/lib/legal/policy-meta";
import { STUDENT_GUIDE_SECTIONS } from "@/lib/help/guides";
import { OG_CARDS } from "@/lib/og";
import { STATIC_ROUTES } from "@/lib/seo";

describe("published training policy", () => {
  it("keeps a statutory savings clause beside the no-change-of-mind rule", () => {
    assert.match(NO_CHANGE_OF_MIND_CORE, /not refunded/i);
    assert.match(NO_CHANGE_OF_MIND_CORE, /change of mind/i);
    assert.match(NO_CHANGE_OF_MIND_CORE, /applicable law/i);
    assert.match(NO_CHANGE_OF_MIND_CORE, /faulty service/i);
    assert.doesNotMatch(
      NO_CHANGE_OF_MIND_CORE,
      /under any circumstances|never refundable|waive.*rights/i
    );
  });

  it("registers terms and refund-policy routes and OG keys", () => {
    assert.equal(POLICY_VERSION, "2026-09-27");
    assert.equal(TERMS_PATH, "/terms");
    assert.equal(REFUND_POLICY_PATH, "/refund-policy");
    assert.ok(STATIC_ROUTES.some((route) => route.path === "/terms"));
    assert.ok(STATIC_ROUTES.some((route) => route.path === "/refund-policy"));
    assert.ok(OG_CARDS.terms);
    assert.ok(OG_CARDS["refund-policy"]);
  });

  it("removes the old no-public-Terms stance from admission copy", () => {
    assert.doesNotMatch(
      ADMISSION_PAGE_COPY.policyRequestNote,
      /do not publish a fixed public Terms/i
    );
    assert.match(ADMISSION_PAGE_COPY.policyRequestNote, /Terms of Training/i);
    assert.match(ADMISSION_PAGE_COPY.policyRequestNote, /2026-09-27/);
  });

  it("points the student guide at published policy URLs", () => {
    const support = STUDENT_GUIDE_SECTIONS.find(
      (section) => section.id === "support-privacy"
    );
    assert.ok(support);
    assert.ok(
      support!.body.some((line) => /pakish\.org\/terms/i.test(line))
    );
    assert.ok(
      support!.body.some((line) => /pakish\.org\/refund-policy/i.test(line))
    );
  });
});
