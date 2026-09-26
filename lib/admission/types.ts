/**
 * Admission / enrollment types — CMS & future portal ready.
 */

import type { CourseSlug } from "@/lib/courses/types";
import type { LeadPaymentStatus, LeadStatus } from "./lead";

export type TrainingPreference =
  | "live-online"
  | "in-center"
  | "office-team"
  | "home-onsite";

/** @deprecated Prefer LeadStatus from ./lead */
export type AdmissionRequestStatus =
  | "submitted"
  | "contacted"
  | "awaiting_payment"
  | "payment_received"
  | "confirmed"
  | "enrolled";

/** @deprecated Prefer LeadPaymentStatus from ./lead */
export type PaymentStatus =
  | "not_started"
  | "pending_verification"
  | "verified"
  | "failed";

/** Client-facing success payload after API create */
export interface AdmissionRequestPayload {
  clientRequestId: string;
  fullName: string;
  whatsapp: string;
  email?: string;
  courseSlug: CourseSlug;
  courseTitle: string;
  trainingPreference: TrainingPreference;
  message?: string;
  submittedAt: string;
  source: "web-admission-form";
  leadStatus: LeadStatus;
  paymentStatus: LeadPaymentStatus;
  integrations: {
    studentAccountId?: string;
    enrollmentId?: string;
    lmsCourseId?: string;
    aiTutorId?: string;
  };
}

export interface TrainingPreferenceOption {
  value: TrainingPreference;
  label: string;
}
