import type { AdmissionLead } from "./lead";
import { TRAINING_PREFERENCE_OPTIONS } from "./constants";
import { updateAdmissionLead } from "./store";
import { SITE_URL } from "@/lib/seo";

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
              This notification was sent to billing@pakish.org for Pakish Institute course admissions.
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

/**
 * Notify admin via Resend when configured.
 * Falls back to server log so local/dev still works without keys.
 */
export async function notifyAdminOfAdmission(
  lead: AdmissionLead
): Promise<{ ok: boolean; channel: "email" | "log-fallback"; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to =
    process.env.ADMISSION_NOTIFY_TO ||
    process.env.BILLING_EMAIL ||
    "billing@pakish.org";
  const from =
    process.env.RESEND_FROM_EMAIL ||
    "Pakish Institute <onboarding@resend.dev>";

  if (!apiKey) {
    console.info("[admission-notify:fallback]", {
      to,
      requestId: lead.id,
      course: lead.courseTitle,
      name: lead.fullName,
    });
    await updateAdmissionLead(lead.id, {
      adminNotifiedAt: new Date().toISOString(),
      adminNotifyChannel: "log-fallback",
    });
    return { ok: true, channel: "log-fallback" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send(
      {
        from,
        to: [to],
        replyTo: lead.email || undefined,
        subject: `[Admission] ${lead.fullName} — ${lead.courseTitle} (${lead.id})`,
        html: buildAdminEmailHtml(lead),
        text: buildAdminEmailText(lead),
      },
      { idempotencyKey: `admission-notify/${lead.id}` }
    );

    if (error) {
      console.error("[admission-notify:resend-error]", error.message);
      await updateAdmissionLead(lead.id, {
        adminNotifiedAt: new Date().toISOString(),
        adminNotifyChannel: "log-fallback",
      });
      return { ok: false, channel: "log-fallback", error: error.message };
    }

    console.info("[admission-notify:sent]", {
      id: data?.id,
      to,
      requestId: lead.id,
    });
    await updateAdmissionLead(lead.id, {
      adminNotifiedAt: new Date().toISOString(),
      adminNotifyChannel: "email",
    });
    return { ok: true, channel: "email" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[admission-notify:exception]", message);
    await updateAdmissionLead(lead.id, {
      adminNotifiedAt: new Date().toISOString(),
      adminNotifyChannel: "log-fallback",
    });
    return { ok: false, channel: "log-fallback", error: message };
  }
}
