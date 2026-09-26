import { randomUUID } from "crypto";
import type { AdmissionLead, AdminNotificationRecord } from "./lead";
import { TRAINING_PREFERENCE_OPTIONS } from "./constants";
import {
  canRetryAdminNotification,
  getAdminNotification,
  legacyPatchFromNotification,
  type AdminNotifyStatus,
} from "./notification-state";
import { mutateAdmissionLead, saveAdmissionLead, updateAdmissionLead } from "./store";
import { SITE_URL } from "@/lib/seo";

export {
  canRetryAdminNotification,
  getAdminNotification,
} from "./notification-state";

const NOTIFY_TIMEOUT_MS = 12_000;

export interface NotifyResult {
  ok: boolean;
  status: AdminNotifyStatus;
  providerMessageId?: string;
  error?: string;
}

function preferenceLabel(value: AdmissionLead["trainingPreference"]) {
  return (
    TRAINING_PREFERENCE_OPTIONS.find((option) => option.value === value)
      ?.label ?? value
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function resolveNotificationConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to =
    process.env.ADMISSION_NOTIFY_TO?.trim() ||
    process.env.BILLING_EMAIL?.trim() ||
    "billing@pakish.org";
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Pakish Institute <onboarding@resend.dev>";
  return { apiKey, to, from, configured: Boolean(apiKey) };
}

async function persistNotificationState(
  leadId: string,
  record: AdminNotificationRecord,
  auditAction?: string
): Promise<void> {
  await mutateAdmissionLead(leadId, async (lead) => {
    const attemptCount =
      (getAdminNotification(lead)?.attemptCount ?? 0) +
      (record.attemptCount ? 0 : 1);
    const merged: AdminNotificationRecord = {
      ...record,
      attemptCount: record.attemptCount ?? attemptCount,
    };
    const patch = legacyPatchFromNotification(merged);
    const next: AdmissionLead = {
      ...lead,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    if (auditAction) {
      next.auditEvents = [
        ...(lead.auditEvents ?? []),
        {
          id: `aud_${randomUUID().replace(/-/g, "").slice(0, 12)}`,
          at: new Date().toISOString(),
          actor: auditAction.startsWith("retry") ? "admin" : "system",
          action: auditAction,
          next: { adminNotifyStatus: merged.status },
          note: merged.lastError,
        },
      ];
    }
    return saveAdmissionLead(next);
  });
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`Notification timed out after ${ms}ms`)),
      ms
    );
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

export function buildAdminEmailHtml(lead: AdmissionLead): string {
  const rows: Array<[string, string]> = [
    ["Request ID", lead.id],
    ["Student name", lead.fullName],
    ["Course", lead.courseTitle],
    ["WhatsApp", lead.whatsapp],
    ["Email", lead.email || "—"],
    ["Training preference", preferenceLabel(lead.trainingPreference)],
    ["Message", lead.message || "—"],
    ["Lead status", lead.leadStatus],
    ["Payment status", lead.paymentStatus],
    ["Submitted at", lead.createdAt],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:160px;vertical-align:top">${escapeHtml(label)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;font-weight:600;vertical-align:top">${escapeHtml(value)}</td>
      </tr>`
    )
    .join("");

  const waDigits = lead.whatsapp.replace(/\D/g, "").replace(/^0/, "92");
  const adminLeadsUrl = `${SITE_URL}/admin/leads`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><title>New admission request</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
          <tr>
            <td style="background:#0b1f17;padding:20px 24px;">
              <p style="margin:0;color:#a7f3d0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Pakish Institute</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;">New admission request</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.5;">
                A student submitted an admission request on <a href="${SITE_URL}" style="color:#059669;">pakish.org</a>.
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                ${tableRows}
              </table>
              <p style="margin:20px 0 0;">
                <a href="https://wa.me/${waDigits}" style="display:inline-block;background:#059669;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:700;font-size:14px;">Open WhatsApp chat</a>
                <a href="${adminLeadsUrl}" style="display:inline-block;margin-left:8px;background:#111827;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:700;font-size:14px;">Open admin leads</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background:#f9fafb;color:#6b7280;font-size:12px;">
              This is an internal Pakish Institute admission notification.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildAdminEmailText(lead: AdmissionLead): string {
  return [
    "Pakish Institute — New admission request",
    "",
    `Request ID: ${lead.id}`,
    `Student name: ${lead.fullName}`,
    `Course: ${lead.courseTitle}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Email: ${lead.email || "—"}`,
    `Training preference: ${preferenceLabel(lead.trainingPreference)}`,
    `Message: ${lead.message || "—"}`,
    `Lead status: ${lead.leadStatus}`,
    `Payment status: ${lead.paymentStatus}`,
    `Submitted at: ${lead.createdAt}`,
    "",
    `Admin: ${SITE_URL}/admin/leads`,
  ].join("\n");
}

export function buildSyntheticQaEmail(lead: AdmissionLead) {
  const subject = `[Admission QA] Synthetic admin notification test (${lead.id})`;
  const text = [
    "Pakish Institute — synthetic admission-admin QA message.",
    "This is an internal delivery test only. No learner was contacted.",
    "",
    `Request ID: ${lead.id}`,
    `Created at: ${lead.createdAt}`,
  ].join("\n");
  const html = `<p>Pakish Institute — <strong>synthetic admission-admin QA message</strong>.</p>
<p>This is an internal delivery test only. No learner was contacted.</p>
<p>Request ID: ${escapeHtml(lead.id)}</p>`;
  return { subject, text, html };
}

async function sendViaResend(
  lead: AdmissionLead,
  options?: { qaOnly?: boolean }
): Promise<NotifyResult> {
  const { apiKey, to, from } = resolveNotificationConfig();
  if (!apiKey) {
    return { ok: false, status: "not-configured" };
  }

  const attemptedAt = new Date().toISOString();
  await persistNotificationState(lead.id, {
    status: "attempted",
    attemptedAt,
  });

  const qa = options?.qaOnly ? buildSyntheticQaEmail(lead) : null;
  const subject = qa
    ? qa.subject
    : `[Admission] ${lead.fullName} — ${lead.courseTitle} (${lead.id})`;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const sendPromise = resend.emails.send(
      {
        from,
        to: [to],
        replyTo: qa ? undefined : lead.email || undefined,
        subject,
        html: qa ? qa.html : buildAdminEmailHtml(lead),
        text: qa ? qa.text : buildAdminEmailText(lead),
      },
      { idempotencyKey: `admission-notify/${lead.id}` }
    );

    const { data, error } = await withTimeout(sendPromise, NOTIFY_TIMEOUT_MS);

    if (error) {
      const record: AdminNotificationRecord = {
        status: "failed",
        attemptedAt,
        lastError: error.message,
      };
      await persistNotificationState(lead.id, record, "admin-notify-failed");
      console.error("[admission-notify:resend-error]", error.message);
      return { ok: false, status: "failed", error: error.message };
    }

    const acceptedAt = new Date().toISOString();
    const record: AdminNotificationRecord = {
      status: "provider-accepted",
      attemptedAt,
      acceptedAt,
      providerMessageId: data?.id,
    };
    await persistNotificationState(lead.id, record, "admin-notify-accepted");
    console.info("[admission-notify:sent]", {
      providerMessageId: data?.id,
      requestId: lead.id,
    });
    return {
      ok: true,
      status: "provider-accepted",
      providerMessageId: data?.id,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const record: AdminNotificationRecord = {
      status: "failed",
      attemptedAt,
      lastError: message,
    };
    await persistNotificationState(lead.id, record, "admin-notify-failed");
    console.error("[admission-notify:exception]", message);
    return { ok: false, status: "failed", error: message };
  }
}

/**
 * Notify admin via Resend when configured; otherwise log-only (dev/local).
 * Never sets acceptedAt unless the provider accepted the send.
 */
export async function notifyAdminOfAdmission(
  lead: AdmissionLead,
  options?: { qaOnly?: boolean; force?: boolean }
): Promise<NotifyResult> {
  const { getAdmissionLead } = await import("./store");
  const current = (await getAdmissionLead(lead.id)) ?? lead;
  const existing = getAdminNotification(current);
  if (
    !options?.force &&
    existing?.status === "provider-accepted" &&
    existing.providerMessageId
  ) {
    return {
      ok: true,
      status: "provider-accepted",
      providerMessageId: existing.providerMessageId,
    };
  }

  const { to, configured } = resolveNotificationConfig();

  if (!configured) {
    console.info("[admission-notify:log-only]", {
      to,
      requestId: current.id,
      course: current.courseTitle,
    });
    const record: AdminNotificationRecord = {
      status: "logged-only",
      attemptedAt: new Date().toISOString(),
    };
    await persistNotificationState(current.id, record, "admin-notify-log-only");
    return { ok: true, status: "logged-only" };
  }

  return sendViaResend(current, options);
}

export async function retryAdminNotification(
  leadId: string
): Promise<NotifyResult> {
  const { getAdmissionLead } = await import("./store");
  const lead = await getAdmissionLead(leadId);
  if (!lead) {
    throw new Error("LEAD_NOT_FOUND");
  }
  if (!canRetryAdminNotification(lead)) {
    throw new Error("NOTIFICATION_RETRY_NOT_ALLOWED");
  }
  await persistNotificationState(
    leadId,
    {
      status: "attempted",
      attemptedAt: new Date().toISOString(),
      attemptCount: (getAdminNotification(lead)?.attemptCount ?? 0) + 1,
    },
    "retry-admin-notification"
  );
  const refreshed = await getAdmissionLead(leadId);
  if (!refreshed) {
    throw new Error("LEAD_NOT_FOUND");
  }
  return notifyAdminOfAdmission(refreshed, { force: true });
}

/** @internal test helper */
export async function patchNotificationForTest(
  id: string,
  patch: Partial<AdmissionLead>
) {
  return updateAdmissionLead(id, patch);
}
