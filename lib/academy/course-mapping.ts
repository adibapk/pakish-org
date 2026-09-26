/**
 * Canonical website ↔ Academy course mapping.
 * Unmapped courses must never use invented UUIDs.
 */

export type AcademyMappingStatus =
  | "unmapped"
  | "pilot-private"
  | "mapped"
  | "deprecated";

export type ContentReadiness =
  | "not-started"
  | "inventory-pending"
  | "template-only"
  | "partial"
  | "ready";

export interface AcademyCourseMapping {
  websiteCourseId: string;
  websiteSlug: string;
  websiteTitle: string;
  status: AcademyMappingStatus;
  /** Real Academy course UUID only when created and verified. */
  academyCourseUuid?: string;
  proposedAcademyTitle: string;
  moduleCount: number;
  instructorOwner: "unconfirmed" | "assigned" | "none";
  recordingReadiness: ContentReadiness;
  liveCohortReadiness: ContentReadiness;
  publicationState: "unpublished" | "private-pilot" | "published";
  notes?: string;
}

/** Verified on production 2026-09-26 (Prompt 13 private pilot). */
export const ACADEMY_PILOT_COURSE_UUID =
  "course_05275db9-cddf-4a68-825a-01e4e2714066";

export const ACADEMY_COURSE_MAPPINGS: AcademyCourseMapping[] = [
  {
    websiteCourseId: "course-ai-productivity",
    websiteSlug: "ai-productivity",
    websiteTitle: "AI Productivity & Automation",
    status: "pilot-private",
    academyCourseUuid: ACADEMY_PILOT_COURSE_UUID,
    proposedAcademyTitle: "AI Productivity & Automation",
    moduleCount: 4,
    instructorOwner: "unconfirmed",
    recordingReadiness: "template-only",
    liveCohortReadiness: "inventory-pending",
    publicationState: "private-pilot",
    notes: "Prompt 13 private pilot; UUID recorded in docs/academy/PILOT_ACCEPTANCE_REPORT.md after provisioning.",
  },
  {
    websiteCourseId: "course-ai-business",
    websiteSlug: "ai-business",
    websiteTitle: "AI for Business & Workplace Automation",
    status: "unmapped",
    proposedAcademyTitle: "AI for Business & Workplace Automation",
    moduleCount: 4,
    instructorOwner: "unconfirmed",
    recordingReadiness: "inventory-pending",
    liveCohortReadiness: "inventory-pending",
    publicationState: "unpublished",
  },
  {
    websiteCourseId: "course-full-stack-ai",
    websiteSlug: "full-stack-ai-development",
    websiteTitle: "Modern Full Stack Web Development with AI",
    status: "unmapped",
    proposedAcademyTitle: "Modern Full Stack Web Development with AI",
    moduleCount: 4,
    instructorOwner: "unconfirmed",
    recordingReadiness: "inventory-pending",
    liveCohortReadiness: "inventory-pending",
    publicationState: "unpublished",
  },
  {
    websiteCourseId: "course-wordpress-woocommerce",
    websiteSlug: "wordpress-woocommerce",
    websiteTitle: "Professional WordPress & WooCommerce Development",
    status: "unmapped",
    proposedAcademyTitle: "Professional WordPress & WooCommerce Development",
    moduleCount: 4,
    instructorOwner: "unconfirmed",
    recordingReadiness: "inventory-pending",
    liveCohortReadiness: "inventory-pending",
    publicationState: "unpublished",
  },
  {
    websiteCourseId: "course-cloud-devops",
    websiteSlug: "cloud-devops",
    websiteTitle: "Cloud, Servers & DevOps Fundamentals",
    status: "unmapped",
    proposedAcademyTitle: "Cloud, Servers & DevOps Fundamentals",
    moduleCount: 4,
    instructorOwner: "unconfirmed",
    recordingReadiness: "inventory-pending",
    liveCohortReadiness: "inventory-pending",
    publicationState: "unpublished",
  },
  {
    websiteCourseId: "course-ai-freelancing",
    websiteSlug: "ai-freelancing",
    websiteTitle: "AI-Powered Freelancing Career",
    status: "unmapped",
    proposedAcademyTitle: "AI-Powered Freelancing Career",
    moduleCount: 4,
    instructorOwner: "unconfirmed",
    recordingReadiness: "inventory-pending",
    liveCohortReadiness: "inventory-pending",
    publicationState: "unpublished",
  },
  {
    websiteCourseId: "course-business-english",
    websiteSlug: "business-english-professional-communication",
    websiteTitle: "Business English & Professional Communication",
    status: "unmapped",
    proposedAcademyTitle: "Business English & Professional Communication",
    moduleCount: 6,
    instructorOwner: "assigned",
    recordingReadiness: "not-started",
    liveCohortReadiness: "not-started",
    publicationState: "unpublished",
    notes:
      "Website-only commercial course led by Irfan Velmi. No LearnHouse UUID or cohort in Prompt 20.",
  },
];

export function getAcademyMappingForSlug(slug: string): AcademyCourseMapping | undefined {
  return ACADEMY_COURSE_MAPPINGS.find((m) => m.websiteSlug === slug);
}

export function getAcademyMappingForCourseId(
  courseId: string
): AcademyCourseMapping | undefined {
  return ACADEMY_COURSE_MAPPINGS.find((m) => m.websiteCourseId === courseId);
}

export function getMappedAcademyCourseUuid(slug: string): string | undefined {
  const mapping = getAcademyMappingForSlug(slug);
  if (!mapping?.academyCourseUuid) return undefined;
  if (mapping.status === "unmapped") return undefined;
  return mapping.academyCourseUuid;
}
