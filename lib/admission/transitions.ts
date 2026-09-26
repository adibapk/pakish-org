import { randomUUID } from "crypto";
import type { AdmissionLead } from "./lead";
import { getAdminNotification } from "./notification-state";
import type {
  AdminLeadAction,
  AuditEvent,
  LifecycleLead,
  TransitionContext,
} from "./lifecycle";
import {
  defaultProvisioningStage,
  hasVerifiedPayment,
  isFeeSupportLead,
  isTeamInquiry,
  LEAD_SCHEMA_VERSION,
} from "./lifecycle";
import type { LeadPaymentStatus, LeadStatus } from "./lead";

export class TransitionError extends Error {
  readonly status = 409;
  constructor(message: string) {
    super(message);
    this.name = "TransitionError";
  }
}

function pushAudit(
  lead: LifecycleLead,
  event: Omit<AuditEvent, "id">
): AuditEvent[] {
  const entry: AuditEvent = { id: `aud_${randomUUID().replace(/-/g, "").slice(0, 12)}`, ...event };
  return [...(lead.auditEvents ?? []), entry];
}

function snapshotStage(lead: LifecycleLead) {
  return {
    leadStatus: lead.leadStatus,
    paymentStatus: lead.paymentStatus,
    provisioningStage: lead.provisioningStage,
    welcomeStage: lead.welcomeStage,
  };
}

export function migrateLeadDefaults<T extends AdmissionLead>(lead: T): T {
  const applicationKind =
    lead.applicationKind ??
    (lead.trainingPreference === "office-team"
      ? "team-custom"
      : "commercial-individual");

  return {
    ...lead,
    schemaVersion: lead.schemaVersion ?? LEAD_SCHEMA_VERSION,
    applicationKind,
    provisioningStage:
      lead.provisioningStage ?? defaultProvisioningStage(applicationKind),
    welcomeStage: lead.welcomeStage ?? "not-ready",
    auditEvents: lead.auditEvents ?? [],
    paymentReview: lead.paymentReview ?? {},
    manualProvisioning: lead.manualProvisioning ?? {},
    welcome: lead.welcome ?? {},
    feeSupportReview:
      lead.feeSupportReview ??
      (applicationKind === "womens-fee-support"
        ? { status: "pending" }
        : undefined),
    adminNotification: lead.adminNotification ?? getAdminNotification(lead),
  };
}

export function applyAdminAction(
  lead: AdmissionLead,
  action: AdminLeadAction,
  ctx: TransitionContext
): AdmissionLead {
  const current = migrateLeadDefaults(lead);
  const prev = snapshotStage(current);

  switch (action) {
    case "mark-contacted": {
      if (current.leadStatus !== "New") {
        throw new TransitionError("Only New leads can be marked Contacted.");
      }
      return {
        ...current,
        leadStatus: "Contacted",
        auditEvents: pushAudit(current, {
          at: new Date().toISOString(),
          actor: ctx.actor,
          action,
          previous: prev,
          next: { ...prev, leadStatus: "Contacted" },
          note: ctx.note,
        }),
      };
    }

    case "request-payment": {
      if (isFeeSupportLead(current.applicationKind)) {
        throw new TransitionError(
          "Fee-support leads cannot enter payment collection until approved and converted."
        );
      }
      if (isTeamInquiry(current.applicationKind)) {
        throw new TransitionError("Team/custom inquiries do not use individual payment flow.");
      }
      if (current.leadStatus !== "Contacted") {
        throw new TransitionError("Payment can only be requested after Contacted.");
      }
      return {
        ...current,
        leadStatus: "Payment Pending",
        paymentStatus: "Pending",
        auditEvents: pushAudit(current, {
          at: new Date().toISOString(),
          actor: ctx.actor,
          action,
          previous: prev,
          next: {
            ...prev,
            leadStatus: "Payment Pending",
            paymentStatus: "Pending",
          },
          note: ctx.note,
        }),
      };
    }

    case "verify-payment": {
      if (current.paymentStatus !== "Submitted") {
        throw new TransitionError("Payment proof must be submitted before verification.");
      }
      if (isFeeSupportLead(current.applicationKind)) {
        throw new TransitionError("Fee-support leads cannot be payment-verified on this path.");
      }
      const reviewedAt = new Date().toISOString();
      return {
        ...current,
        leadStatus: "Payment Received",
        paymentStatus: "Verified",
        paymentReview: {
          decision: "verified",
          reviewedAt,
          reviewedBy: ctx.actor,
        },
        paymentProof: {
          ...current.paymentProof,
          verifiedAt: reviewedAt,
          verifiedBy: ctx.actor,
        },
        provisioningStage:
          current.provisioningStage === "not-started"
            ? "manual-required"
            : current.provisioningStage,
        auditEvents: pushAudit(current, {
          at: reviewedAt,
          actor: ctx.actor,
          action,
          previous: prev,
          next: {
            ...prev,
            leadStatus: "Payment Received",
            paymentStatus: "Verified",
            provisioningStage: "manual-required",
          },
          note: ctx.note,
        }),
      };
    }

    case "reject-payment": {
      if (current.paymentStatus !== "Submitted") {
        throw new TransitionError("Only submitted payment proofs can be rejected.");
      }
      const reviewedAt = new Date().toISOString();
      return {
        ...current,
        paymentStatus: "Pending",
        leadStatus: "Payment Pending",
        paymentReview: {
          decision: "rejected",
          reviewedAt,
          reviewedBy: ctx.actor,
          rejectionReason: ctx.rejectionReason,
        },
        auditEvents: pushAudit(current, {
          at: reviewedAt,
          actor: ctx.actor,
          action,
          previous: prev,
          next: {
            ...prev,
            paymentStatus: "Pending",
            leadStatus: "Payment Pending",
          },
          note: ctx.rejectionReason ?? ctx.note,
        }),
      };
    }

    case "start-provisioning": {
      if (isTeamInquiry(current.applicationKind)) {
        throw new TransitionError("Team/custom inquiries are not auto-provisioned.");
      }
      if (!current.email?.trim()) {
        throw new TransitionError("Email is required before Academy provisioning.");
      }
      if (!hasVerifiedPayment(current.paymentStatus, current.paymentReview)) {
        throw new TransitionError("Payment must be verified before provisioning.");
      }
      return {
        ...current,
        provisioningStage: "manual-required",
        auditEvents: pushAudit(current, {
          at: new Date().toISOString(),
          actor: ctx.actor,
          action,
          previous: prev,
          next: { ...prev, provisioningStage: "manual-required" },
          note: ctx.note,
        }),
      };
    }

    case "record-manual-provisioning": {
      if (!ctx.studentAccountId?.trim() || !ctx.enrollmentId?.trim()) {
        throw new TransitionError(
          "Manual provisioning requires studentAccountId and enrollmentId."
        );
      }
      const completedAt = new Date().toISOString();
      return {
        ...current,
        provisioningStage: "completed",
        integrations: {
          ...current.integrations,
          studentAccountId: ctx.studentAccountId.trim(),
          enrollmentId: ctx.enrollmentId.trim(),
          academyCourseUuid: ctx.academyCourseUuid?.trim(),
        },
        manualProvisioning: {
          completedAt,
          completedBy: ctx.actor,
          notes: ctx.manualProvisioningNotes,
        },
        auditEvents: pushAudit(current, {
          at: completedAt,
          actor: ctx.actor,
          action,
          previous: prev,
          next: { ...prev, provisioningStage: "completed" },
          note: ctx.manualProvisioningNotes ?? ctx.note,
        }),
      };
    }

    case "mark-enrolled": {
      if (current.provisioningStage !== "completed") {
        throw new TransitionError(
          "Enrolled requires completed manual provisioning with Academy IDs recorded."
        );
      }
      if (!current.integrations.enrollmentId) {
        throw new TransitionError("Enrollment ID is required before Enrolled.");
      }
      return {
        ...current,
        leadStatus: "Enrolled",
        welcomeStage: "preview-ready",
        auditEvents: pushAudit(current, {
          at: new Date().toISOString(),
          actor: ctx.actor,
          action,
          previous: prev,
          next: {
            ...prev,
            leadStatus: "Enrolled",
            welcomeStage: "preview-ready",
          },
          note: ctx.note,
        }),
      };
    }

    case "approve-fee-support": {
      if (!isFeeSupportLead(current.applicationKind)) {
        throw new TransitionError("Not a fee-support application.");
      }
      const reviewedAt = new Date().toISOString();
      return {
        ...current,
        feeSupportReview: {
          status: "approved",
          reviewedAt,
          reviewedBy: ctx.actor,
          note: ctx.note,
        },
        auditEvents: pushAudit(current, {
          at: reviewedAt,
          actor: ctx.actor,
          action,
          previous: prev,
          next: prev,
          note: ctx.note,
        }),
      };
    }

    case "reject-fee-support": {
      if (!isFeeSupportLead(current.applicationKind)) {
        throw new TransitionError("Not a fee-support application.");
      }
      const reviewedAt = new Date().toISOString();
      return {
        ...current,
        feeSupportReview: {
          status: "rejected",
          reviewedAt,
          reviewedBy: ctx.actor,
          note: ctx.rejectionReason ?? ctx.note,
        },
        auditEvents: pushAudit(current, {
          at: reviewedAt,
          actor: ctx.actor,
          action,
          previous: prev,
          next: prev,
          note: ctx.rejectionReason ?? ctx.note,
        }),
      };
    }

    case "preview-welcome": {
      if (current.leadStatus !== "Enrolled") {
        throw new TransitionError("Welcome preview requires Enrolled status.");
      }
      const previewedAt = new Date().toISOString();
      return {
        ...current,
        welcomeStage: "preview-ready",
        welcome: {
          ...current.welcome,
          previewedAt,
        },
        auditEvents: pushAudit(current, {
          at: previewedAt,
          actor: ctx.actor,
          action,
          previous: prev,
          next: { ...prev, welcomeStage: "preview-ready" },
          note: ctx.note,
        }),
      };
    }

    default:
      throw new TransitionError(`Unknown action: ${action}`);
  }
}

export function listAvailableActions(lead: AdmissionLead): AdminLeadAction[] {
  const current = migrateLeadDefaults(lead);
  const actions: AdminLeadAction[] = [];

  if (current.leadStatus === "New") actions.push("mark-contacted");
  if (
    current.leadStatus === "Contacted" &&
    !isTeamInquiry(current.applicationKind) &&
    !isFeeSupportLead(current.applicationKind)
  ) {
    actions.push("request-payment");
  }
  if (current.paymentStatus === "Submitted") {
    actions.push("verify-payment", "reject-payment");
  }
  if (
    hasVerifiedPayment(current.paymentStatus, current.paymentReview) &&
    !isTeamInquiry(current.applicationKind)
  ) {
    actions.push("start-provisioning");
  }
  if (
    current.provisioningStage === "manual-required" ||
    current.provisioningStage === "in-progress"
  ) {
    actions.push("record-manual-provisioning");
  }
  if (current.provisioningStage === "completed" && current.leadStatus !== "Enrolled") {
    actions.push("mark-enrolled");
  }
  if (current.leadStatus === "Enrolled") {
    actions.push("preview-welcome");
  }
  if (isFeeSupportLead(current.applicationKind) && current.feeSupportReview?.status === "pending") {
    actions.push("approve-fee-support", "reject-fee-support");
  }

  return actions;
}

export function getTransitionBlockers(lead: AdmissionLead): string[] {
  const current = migrateLeadDefaults(lead);
  const blockers: string[] = [];

  if (!current.email?.trim()) {
    blockers.push("Missing learner email for Academy account.");
  }
  if (
    current.applicationKind === "commercial-individual" &&
    !hasVerifiedPayment(current.paymentStatus, current.paymentReview)
  ) {
    blockers.push("Payment not verified.");
  }
  if (current.provisioningStage === "manual-required") {
    blockers.push("Academy provisioning is manual-required (no live course mapping yet).");
  }
  if (isFeeSupportLead(current.applicationKind) && current.feeSupportReview?.status === "pending") {
    blockers.push("Women's Empowerment fee-support review pending.");
  }
  if (isTeamInquiry(current.applicationKind)) {
    blockers.push("Team/custom inquiry — individual provisioning not automatic.");
  }

  return blockers;
}

// Re-export for payment proof attachment guard
export type { LeadStatus, LeadPaymentStatus };
