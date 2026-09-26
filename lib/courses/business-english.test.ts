import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getAcademyMappingForSlug } from "@/lib/academy/course-mapping";
import { createAdmissionSchema } from "@/lib/admission/schema";
import {
  getAllCourses,
  getCourseBySlug,
  getFeaturedCourses,
  getProfessionalSkillsCourses,
  getTechnologyCourses,
} from "@/lib/courses";
import { businessEnglishCourse } from "@/lib/courses/business-english-course";

const FORBIDDEN_PUBLIC_STRINGS = [
  "Rs 3000",
  "Rs. 3000",
  "from Rs 3000",
  "Digiera",
  "KU-KUBS",
  "FUUAST",
  "ILMA",
  "FATMIYA",
  "all age groups",
];

const FORBIDDEN_POSITIVE_CLAIMS = [
  /is an ielts test centre/i,
  /ielts partner/i,
  /guaranteed band score/i,
  /accredited ielts provider/i,
];

const ROOT = process.cwd();

function collectPublicSourceFiles(): string[] {
  const paths = [
    "lib/courses/business-english-course.ts",
    "components/courses/course-detail-page.tsx",
    "app/courses/page.tsx",
    "public/llms.txt",
  ];
  return paths
    .map((relative) => join(ROOT, relative))
    .filter((file) => existsSync(file));
}

describe("Business English course catalogue", () => {
  it("publishes seven courses with six core technology programmes", () => {
    assert.equal(getAllCourses().length, 7);
    assert.equal(getTechnologyCourses().length, 6);
    assert.equal(getProfessionalSkillsCourses().length, 1);
    assert.equal(getFeaturedCourses().length, 6);
  });

  it("keeps the approved slug, instructor spelling, and consultation-led pricing", () => {
    const course = getCourseBySlug("business-english-professional-communication");
    assert.ok(course);
    assert.equal(course?.instructor?.name, "Irfan Velmi");
    assert.equal(course?.durationMode, "consultation-led");
    assert.equal(course?.pricing.mode, "custom-quote");
    assert.equal(course?.catalogueGroup, "professional-skills");
    assert.equal(course?.showOnHomepageFeatured, false);
    assert.equal(course?.isoDuration, undefined);
  });

  it("uses skills-focused section labelling instead of technologies wording", () => {
    assert.equal(
      businessEnglishCourse.toolsSectionLabel,
      "Skills & Practice Areas"
    );
  });

  it("keeps an unmapped unpublished Academy mapping without a UUID", () => {
    const mapping = getAcademyMappingForSlug(
      "business-english-professional-communication"
    );
    assert.ok(mapping);
    assert.equal(mapping?.status, "unmapped");
    assert.equal(mapping?.publicationState, "unpublished");
    assert.equal(mapping?.academyCourseUuid, undefined);
  });

  it("accepts the new slug in admission schema and rejects invalid slugs", () => {
    const valid = createAdmissionSchema.safeParse({
      fullName: "Test Applicant",
      whatsapp: "+923001234567",
      courseSlug: "business-english-professional-communication",
      trainingPreference: "live-online",
      website: "",
    });
    assert.equal(valid.success, true);

    const invalid = createAdmissionSchema.safeParse({
      fullName: "Test Applicant",
      whatsapp: "+923001234567",
      courseSlug: "fake-business-english",
      trainingPreference: "live-online",
      website: "",
    });
    assert.equal(invalid.success, false);
  });

  it("does not include brochure-private strings in public course sources", () => {
    const haystack = collectPublicSourceFiles()
      .map((file) => readFileSync(file, "utf8"))
      .join("\n")
      .toLowerCase();

    for (const forbidden of FORBIDDEN_PUBLIC_STRINGS) {
      assert.equal(
        haystack.includes(forbidden.toLowerCase()),
        false,
        `found forbidden brochure string: ${forbidden}`
      );
    }

    for (const pattern of FORBIDDEN_POSITIVE_CLAIMS) {
      assert.equal(
        pattern.test(haystack),
        false,
        `found forbidden positive claim: ${pattern}`
      );
    }
  });

  it("ships optimized portrait and classroom imagery", () => {
    const classroom = join(
      ROOT,
      "public/images/courses/business-english/irfan-velmi-classroom.webp"
    );
    const portrait = join(
      ROOT,
      "public/images/courses/business-english/irfan-velmi-portrait.webp"
    );
    assert.ok(existsSync(classroom));
    assert.ok(existsSync(portrait));
    assert.ok(readFileSync(classroom).byteLength > 10_000);
    assert.ok(readFileSync(portrait).byteLength > 10_000);
    assert.equal(
      businessEnglishCourse.instructor?.image.src,
      "/images/courses/business-english/irfan-velmi-portrait.webp"
    );
    assert.equal(businessEnglishCourse.media?.hero, undefined);
    assert.ok(businessEnglishCourse.media?.spotlight);
  });
});
