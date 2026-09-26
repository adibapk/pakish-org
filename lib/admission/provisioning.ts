/**
 * Academy provisioning boundary.
 * Academy Admin API enrollment is proven on production (Prompt 13) but website
 * automation stays manual-required until Prompt 14 wires API tokens securely.
 */

export type ProvisioningMode = "manual-required" | "automated";

export interface ProvisioningResult {
  mode: ProvisioningMode;
  studentAccountId?: string;
  enrollmentId?: string;
  academyCourseUuid?: string;
  message: string;
}

export interface ProvisioningRequest {
  leadId: string;
  email: string;
  courseSlug: string;
  placeholderLmsCourseId?: string;
}

export function getProvisioningMode(): ProvisioningMode {
  return "manual-required";
}

export async function provisionAcademyAccess(
  request: ProvisioningRequest
): Promise<ProvisioningResult> {
  void request;
  return {
    mode: "manual-required",
    message:
      "Automatic Academy enrollment is not enabled. An academic administrator must create or locate the learner account and enrollment on academy.pakish.org, then record the returned IDs against this lead.",
  };
}

export const MANUAL_PROVISIONING_CHECKLIST = [
  "Confirm verified payment and learner email on the admission lead.",
  "On Academy (https://academy.pakish.org), locate or invite the learner using the admission email.",
  "Enroll the learner in the correct course using the canonical course UUID from lib/academy/course-mapping.ts.",
  "Optional (proven): POST /api/v1/admin/default/enrollments/{user_id}/{course_uuid} with org API token.",
  "Record the Academy user/account ID and enrollment ID back on the lead via Record Manual Provisioning.",
  "Mark the lead Enrolled, then preview (do not auto-send) the welcome/access message.",
];
