import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { courses } from "@/lib/courses/data";
import {
  ACADEMY_COURSE_MAPPINGS,
  ACADEMY_PILOT_COURSE_UUID,
} from "./course-mapping";

describe("Academy course mapping consistency", () => {
  it("maps exactly one entry per canonical course", () => {
    assert.equal(ACADEMY_COURSE_MAPPINGS.length, courses.length);
    const courseIds = new Set(courses.map((course) => course.id));
    const mappingIds = new Set(
      ACADEMY_COURSE_MAPPINGS.map((mapping) => mapping.websiteCourseId)
    );
    assert.deepEqual(mappingIds, courseIds);
  });

  it("keeps slug and title aligned with lib/courses/data.ts", () => {
    for (const mapping of ACADEMY_COURSE_MAPPINGS) {
      const course = courses.find((item) => item.id === mapping.websiteCourseId);
      assert.ok(course, `missing canonical course for ${mapping.websiteCourseId}`);
      assert.equal(mapping.websiteSlug, course.slug);
      assert.equal(mapping.websiteTitle, course.title);
      assert.equal(mapping.proposedAcademyTitle, course.title);
      assert.equal(
        mapping.moduleCount,
        course.curriculum.length,
        `${course.slug} module count mismatch`
      );
    }
  });

  it("does not duplicate slugs or UUIDs", () => {
    const slugs = ACADEMY_COURSE_MAPPINGS.map((mapping) => mapping.websiteSlug);
    const uuids = ACADEMY_COURSE_MAPPINGS
      .map((mapping) => mapping.academyCourseUuid)
      .filter(Boolean);
    assert.equal(new Set(slugs).size, slugs.length);
    assert.equal(new Set(uuids).size, uuids.length);
  });

  it("assigns the verified pilot UUID only to AI Productivity", () => {
    const withUuid = ACADEMY_COURSE_MAPPINGS.filter(
      (mapping) => mapping.academyCourseUuid
    );
    assert.equal(withUuid.length, 1);
    assert.equal(withUuid[0]?.websiteSlug, "ai-productivity");
    assert.equal(withUuid[0]?.academyCourseUuid, ACADEMY_PILOT_COURSE_UUID);
    assert.equal(withUuid[0]?.status, "pilot-private");
  });
});
