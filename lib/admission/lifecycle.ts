/**
 * Admission lifecycle model — backward-compatible extensions for Prompt 12.
 */

import type { CourseSlug } from "@/lib/courses/types";
import type { TrainingPreference } from "./types";
import type { LeadPaymentStatus, LeadStatus } from "./lead";

export const LEAD_SCHEMA_VERSION = 2;

export type ApplicationKind =
  | "commercial-individual"
  | "team-custom"
  | "womens-fee-support";

export type ProvisioningStage =
  | "not-started"
  | "blocked"
  | "manual-required"
  | "in-progress"
  | "completed"
  | "failed";

export type WelcomeStage = "not-ready" | "preview-ready" | "sent";

export type PaymentReviewDecision = "verified" | "rejected";

export type FeeSupportReviewStatus = "pending" | "approved" | "rejected";

export interface AuditEvent {
  id: string;
  at: string;
  actor: string;
  action: string;
  previous?: Record<string, string | undefined>;
  next?: Record<string, string | undefined>;
  note?: string;
}

export interface PaymentReview {
  decision?: PaymentReviewDecision;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface ManualProvisioningRecord {
  completedAt?: string;
  completedBy?: string;
  notes?: string;
}

export interface WelcomeAccessRecord {
  previewedAt?: string;
  sentAt?: string;
  sentBy?: string;
}

export interface FeeSupportReview {
  status: FeeSupportReviewStatus;
  reviewedAt?: string;
  reviewedBy?: string;
  note?: string;
}

export interface AdmissionLeadLifecycle {
  schemaVersion?: number;
  applicationKind?: ApplicationKind;
  provisioningStage?: ProvisioningStage;
  welcomeStage?: WelcomeStage;
  paymentReview?: PaymentReview;
  manualProvisioning?: ManualProvisioningRecord;
  welcome?: WelcomeAccessRecord;
  feeSupportReview?: FeeSupportReview;
  auditEvents?: AuditEvent[];
  parseWarning?: string;
}

export type AdminLeadAction =
  | "mark-contacted"
  | "request-payment"
  | "verify-payment"
  | "reject-payment"
  | "start-provisioning"
  | "record-manual-provisioning"
  | "mark-enrolled"
  | "approve-fee-support"
  | "reject-fee-support"
  | "preview-welcome";

export interface TransitionContext {
  actor: string;
  note?: string;
  rejectionReason?: string;
  studentAccountId?: string;
  enrollmentId?: string;
  academyCourseUuid?: string;
  manualProvisioningNotes?: string;
}

export function inferApplicationKind(input: {
  trainingPreference: TrainingPreference;
  sourcePath?: string;
  enrollmentType?: string;
}): ApplicationKind {
  if (
    input.sourcePath?.includes("womens-empowerment") ||
    input.enrollmentType === "subsidy"
  ) {
    return "womens-fee-support";
  }
  if (input.trainingPreference === "office-team") {
    return "team-custom";
  }
  return "commercial-individual";
}

export function defaultProvisioningStage(
  kind: ApplicationKind
): ProvisioningStage {
  return kind === "team-custom" ? "blocked" : "not-started";
}

export function isTeamInquiry(kind?: ApplicationKind): boolean {
  return kind === "team-custom";
}

export function isFeeSupportLead(kind?: ApplicationKind): boolean {
  return kind === "womens-fee-support";
}

export function hasVerifiedPayment(
  paymentStatus: LeadPaymentStatus,
  paymentReview?: PaymentReview
): boolean {
  return (
    paymentStatus === "Verified" && paymentReview?.decision === "verified"
  );
}

export function canUploadPaymentProof(lead: {
  applicationKind?: ApplicationKind;
  feeSupportReview?: FeeSupportReview;
  leadStatus: LeadStatus;
  paymentStatus: LeadPaymentStatus;
}): boolean {
  if (isFeeSupportLead(lead.applicationKind)) {
    if (lead.feeSupportReview?.status !== "approved") return false;
  }
  if (isTeamInquiry(lead.applicationKind)) return false;
  return ["Payment Pending", "Payment Received"].includes(lead.leadStatus);
}

export type LifecycleLead = AdmissionLeadLifecycle & {
  id: string;
  email?: string;
  courseSlug: CourseSlug;
  courseTitle: string;
  trainingPreference: TrainingPreference;
  leadStatus: LeadStatus;
  paymentStatus: LeadPaymentStatus;
  paymentProof?: import("./lead").PaymentProof;
  integrations: {
    studentAccountId?: string;
    enrollmentId?: string;
    lmsCourseId?: string;
    academyCourseUuid?: string;
  };
};
