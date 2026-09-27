import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ADMISSION_NEXT_STEPS,
  ADMISSION_PAGE_COPY,
  getAdmissionPath,
} from "@/lib/admission/constants";
import { getAllCourses } from "@/lib/courses";
import {
  STUDENT_GUIDE_SECTIONS,
  STUDENT_JOURNEY_STATES,
} from "@/lib/help/guides";

describe("admission journey and help copy", () => {
  it("states that applications need no invitation", () => {
    assert.match(ADMISSION_PAGE_COPY.noInviteNote, /without an invitation/i);
    assert.match(ADMISSION_PAGE_COPY.heroDescription, /without an invitation/i);
    assert.match(ADMISSION_PAGE_COPY.academyAccessNote, /invite-only/i);
  });

  it("puts staff review and fee confirmation before payment", () => {
    assert.equal(ADMISSION_NEXT_STEPS[0].step, "1");
    assert.match(ADMISSION_NEXT_STEPS[0].title, /confirm/i);
    assert.match(ADMISSION_NEXT_STEPS[1].title, /fee/i);
    assert.match(ADMISSION_PAGE_COPY.paymentConfirmNote, /only after/i);
  });

  it("builds admission links for all seven published courses", () => {
    const courses = getAllCourses();
    assert.equal(courses.length, 7);
    for (const course of courses) {
      const path = getAdmissionPath(course.slug);
      assert.equal(path, `/admission?course=${encodeURIComponent(course.slug)}`);
    }
  });

  it("publishes an explicit student journey state sequence", () => {
    const ids = STUDENT_JOURNEY_STATES.map((state) => state.id);
    assert.deepEqual(ids, [
      "application",
      "review",
      "fee-confirmation",
      "payment-proof",
      "verification",
      "invitation",
      "enrollment",
    ]);
  });

  it("answers the invitation FAQ for AI agents and search", () => {
    const qa = STUDENT_GUIDE_SECTIONS.flatMap((section) => section.qa ?? []);
    assert.ok(
      qa.some((item) =>
        /invitation code/i.test(item.question) && /No\./i.test(item.answer)
      )
    );
  });
});
