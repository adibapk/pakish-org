import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, describe, it } from "node:test";

describe("admission notify", () => {
  let tempRoot = "";
  const originalCwd = process.cwd();
  const originalResendKey = process.env.RESEND_API_KEY;

  before(async () => {
    tempRoot = await mkdtemp(path.join(tmpdir(), "pakish-notify-"));
    process.chdir(tempRoot);
  });

  after(async () => {
    process.chdir(originalCwd);
    if (originalResendKey === undefined) {
      delete process.env.RESEND_API_KEY;
    } else {
      process.env.RESEND_API_KEY = originalResendKey;
    }
    await rm(tempRoot, { recursive: true, force: true });
  });

  it("records logged-only when Resend is not configured", async () => {
    delete process.env.RESEND_API_KEY;
    const { createAdmissionLead, getAdmissionLead } = await import("./store");
    const { notifyAdminOfAdmission } = await import("./notify");
    const { getAdminNotification } = await import("./notification-state");

    const lead = await createAdmissionLead({
      fullName: "Test Learner",
      whatsapp: "+923001234567",
      courseSlug: "ai-productivity",
      trainingPreference: "live-online",
    });

    const result = await notifyAdminOfAdmission(lead);
    assert.equal(result.status, "logged-only");
    assert.equal(result.ok, true);

    const saved = await getAdmissionLead(lead.id);
    assert.ok(saved);
    const notification = getAdminNotification(saved!);
    assert.equal(notification?.status, "logged-only");
    assert.ok(notification?.attemptedAt);
    assert.equal(saved!.adminNotifiedAt, undefined);
  });

  it("does not retry when already provider-accepted", async () => {
    delete process.env.RESEND_API_KEY;
    const { createAdmissionLead, updateAdmissionLead } = await import("./store");
    const { notifyAdminOfAdmission, retryAdminNotification } = await import(
      "./notify"
    );

    const lead = await createAdmissionLead({
      fullName: "Accepted Lead",
      whatsapp: "+923001234571",
      courseSlug: "ai-productivity",
      trainingPreference: "live-online",
    });

    await updateAdmissionLead(lead.id, {
      adminNotification: {
        status: "provider-accepted",
        acceptedAt: "2026-01-01T00:00:00.000Z",
        providerMessageId: "msg_existing",
        attemptCount: 1,
      },
      adminNotifiedAt: "2026-01-01T00:00:00.000Z",
      adminNotifyChannel: "email",
    });

    const skipped = await notifyAdminOfAdmission(lead);
    assert.equal(skipped.status, "provider-accepted");
    assert.equal(skipped.providerMessageId, "msg_existing");

    await assert.rejects(
      () => retryAdminNotification(lead.id),
      /NOTIFICATION_RETRY_NOT_ALLOWED/
    );
  });

  it("allows admin retry for failed notifications", async () => {
    delete process.env.RESEND_API_KEY;
    const { createAdmissionLead, getAdmissionLead } = await import("./store");
    const { retryAdminNotification } = await import("./notify");
    const { getAdminNotification } = await import("./notification-state");

    const lead = await createAdmissionLead({
      fullName: "Failed Lead",
      whatsapp: "+923001234572",
      courseSlug: "ai-productivity",
      trainingPreference: "live-online",
    });

    const { updateAdmissionLead } = await import("./store");
    await updateAdmissionLead(lead.id, {
      adminNotification: {
        status: "failed",
        attemptedAt: "2026-01-01T00:00:00.000Z",
        lastError: "domain not verified",
        attemptCount: 1,
      },
    });

    const result = await retryAdminNotification(lead.id);
    assert.equal(result.status, "logged-only");

    const saved = await getAdmissionLead(lead.id);
    const notification = getAdminNotification(saved!);
    assert.equal(notification?.status, "logged-only");
    assert.ok((notification?.attemptCount ?? 0) >= 2);
  });

  it("migrates legacy email channel to provider-accepted", async () => {
    const { getAdminNotification, canRetryAdminNotification } = await import(
      "./notification-state"
    );
    const legacy = {
      id: "adm_legacy",
      fullName: "Legacy",
      whatsapp: "+92300",
      courseSlug: "ai-productivity" as const,
      courseTitle: "AI",
      trainingPreference: "live-online" as const,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
      leadStatus: "New" as const,
      paymentStatus: "Pending" as const,
      source: "web-admission-form" as const,
      integrations: {},
      adminNotifyChannel: "email" as const,
      adminNotifiedAt: "2026-01-01T01:00:00.000Z",
    };
    const notification = getAdminNotification(legacy);
    assert.equal(notification?.status, "provider-accepted");
    assert.equal(notification?.acceptedAt, "2026-01-01T01:00:00.000Z");
    assert.equal(canRetryAdminNotification(legacy), false);
  });
});
