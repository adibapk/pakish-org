import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { AdmissionLead } from "./lead";
import {
  applyAdminAction,
  migrateLeadDefaults,
  TransitionError,
} from "./transitions";

function baseLead(overrides: Partial<AdmissionLead> = {}): AdmissionLead {
  return migrateLeadDefaults({
    id: "adm_test123",
    fullName: "Synthetic Learner",
    whatsapp: "+923001234567",
    email: "learner@example.invalid",
    courseSlug: "ai-productivity",
    courseTitle: "AI Productivity",
    trainingPreference: "live-online",
    leadStatus: "New",
    paymentStatus: "Pending",
    source: "web-admission-form",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    integrations: {},
    ...overrides,
  });
}

describe("admission transitions", () => {
  it("migrates historical leads with defaults", () => {
    const lead = migrateLeadDefaults({
      ...baseLead(),
      schemaVersion: undefined,
      applicationKind: undefined,
    });
    assert.equal(lead.applicationKind, "commercial-individual");
    assert.equal(lead.provisioningStage, "not-started");
  });

  it("allows contacted -> payment requested", () => {
    const lead = baseLead({ leadStatus: "Contacted" });
    const next = applyAdminAction(lead, "request-payment", { actor: "admin" });
    assert.equal(next.leadStatus, "Payment Pending");
    assert.equal(next.paymentStatus, "Pending");
  });

  it("rejects payment verify without submitted proof", () => {
    const lead = baseLead({ leadStatus: "Payment Pending", paymentStatus: "Pending" });
    assert.throws(
      () => applyAdminAction(lead, "verify-payment", { actor: "admin" }),
      TransitionError
    );
  });

  it("payment proof submission path does not auto-verify", () => {
    const lead = baseLead({
      leadStatus: "Payment Pending",
      paymentStatus: "Submitted",
    });
    assert.notEqual(lead.paymentStatus, "Verified");
    assert.throws(
      () => applyAdminAction(lead, "mark-enrolled", { actor: "admin" }),
      TransitionError
    );
  });

  it("requires manual provisioning IDs before enrolled", () => {
    let lead = baseLead({
      leadStatus: "Payment Received",
      paymentStatus: "Verified",
      paymentReview: { decision: "verified", reviewedAt: "2026-01-01T00:00:00.000Z", reviewedBy: "admin" },
      provisioningStage: "manual-required",
    });
    lead = applyAdminAction(lead, "record-manual-provisioning", {
      actor: "admin",
      studentAccountId: "lh-user-1",
      enrollmentId: "lh-enroll-1",
    });
    lead = applyAdminAction(lead, "mark-enrolled", { actor: "admin" });
    assert.equal(lead.leadStatus, "Enrolled");
    assert.equal(lead.welcomeStage, "preview-ready");
  });

  it("blocks fee-support payment verification path", () => {
    const lead = baseLead({
      applicationKind: "womens-fee-support",
      feeSupportReview: { status: "pending" },
      leadStatus: "Payment Pending",
      paymentStatus: "Submitted",
    });
    assert.throws(
      () => applyAdminAction(lead, "verify-payment", { actor: "admin" }),
      TransitionError
    );
  });

  it("isolates team inquiries from provisioning", () => {
    const lead = baseLead({
      applicationKind: "team-custom",
      trainingPreference: "office-team",
      leadStatus: "Contacted",
    });
    assert.throws(
      () => applyAdminAction(lead, "request-payment", { actor: "admin" }),
      TransitionError
    );
  });
});
