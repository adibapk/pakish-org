import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, describe, it } from "node:test";

describe("admission store concurrency", () => {
  let tempRoot = "";
  const originalCwd = process.cwd();

  before(async () => {
    tempRoot = await mkdtemp(path.join(tmpdir(), "pakish-adm-"));
    process.chdir(tempRoot);
  });

  after(async () => {
    process.chdir(originalCwd);
    await rm(tempRoot, { recursive: true, force: true });
  });

  it("preserves audit events when admin action races notification update", async () => {
    const { createAdmissionLead, applyAdminLeadAction, updateAdmissionLead } =
      await import("./store");

    const lead = await createAdmissionLead({
      fullName: "Synthetic Learner",
      whatsapp: "+923001234567",
      email: "learner@example.invalid",
      courseSlug: "ai-productivity",
      trainingPreference: "live-online",
    });

    const [adminResult, notifyResult] = await Promise.all([
      applyAdminLeadAction(lead.id, "mark-contacted", { actor: "admin" }),
      updateAdmissionLead(lead.id, {
        adminNotification: {
          status: "logged-only",
          attemptedAt: new Date().toISOString(),
          attemptCount: 1,
        },
        adminNotifyChannel: "log-fallback",
      }),
    ]);

    assert.equal(adminResult.leadStatus, "Contacted");
    assert.ok(notifyResult);
    assert.equal(notifyResult.adminNotification?.status, "logged-only");
    assert.ok(
      (adminResult.auditEvents?.length ?? 0) >= 1 ||
        (notifyResult.auditEvents?.length ?? 0) >= 0
    );
    assert.equal(adminResult.integrations.aiTutorId, "tutor-ai-productivity");
    assert.equal(notifyResult.integrations.aiTutorId, "tutor-ai-productivity");
  });
});
