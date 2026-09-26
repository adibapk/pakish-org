/**
 * Admission lead model — future-ready for student portal / LMS.
 *
 * Planned relations (not built yet):
 * - StudentAccount (1) ← AdmissionLead (n)
 * - Enrollment (courseSlug, leadId, studentId)
 * - CourseProgress / LessonCompletion
 * - Certificate
 * - AiTutorSession
 */

import type { CourseSlug } from "@/lib/courses/types";
import type { AdmissionLeadLifecycle } from "./lifecycle";
import type { TrainingPreference } from "./types";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Payment Pending"
  | "Payment Received"
  | "Enrolled";

export type LeadPaymentStatus = "Pending" | "Submitted" | "Verified";

export interface PaymentProof {
  referenceNumber?: string;
  /** Relative path under .data store, or future object-storage URL */
  screenshotPath?: string;
  screenshotFileName?: string;
  notes?: string;
  submittedAt?: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

/** Future portal stubs kept on the lead for easy migration */
export interface LeadIntegrations {
  studentAccountId?: string;
  enrollmentId?: string;
  lmsCourseId?: string;
  academyCourseUuid?: string;
  aiTutorId?: string;
  certificateId?: string;
  progressPercent?: number;
}

export interface AdmissionLead extends AdmissionLeadLifecycle {
  id: string;
  fullName: string;
  whatsapp: string;
  email?: string;
  courseSlug: CourseSlug;
  courseTitle: string;
  trainingPreference: TrainingPreference;
  message?: string;
  createdAt: string;
  updatedAt: string;
  leadStatus: LeadStatus;
  paymentStatus: LeadPaymentStatus;
  paymentProof?: PaymentProof;
  source: "web-admission-form";
  integrations: LeadIntegrations;
  /** Admin notification tracking */
  adminNotifiedAt?: string;
  adminNotifyChannel?: "email" | "log-fallback";
  /** Soft spam metadata (never returned to client) */
  meta?: {
    ipHash?: string;
    userAgent?: string;
  };
}

export interface CreateAdmissionLeadInput {
  fullName: string;
  whatsapp: string;
  email?: string;
  courseSlug: CourseSlug;
  trainingPreference: TrainingPreference;
  message?: string;
  enrollmentType?: string;
  /** Honeypot — must be empty */
  website?: string;
}

export interface PublicAdmissionLeadResponse {
  requestId: string;
  courseTitle: string;
  leadStatus: LeadStatus;
  paymentStatus: LeadPaymentStatus;
  createdAt: string;
}

export interface SubmitPaymentProofInput {
  requestId: string;
  referenceNumber: string;
  notes?: string;
  /** Optional base64 data URL — kept small; prefer WhatsApp for large screenshots */
  screenshotDataUrl?: string;
  screenshotFileName?: string;
}
