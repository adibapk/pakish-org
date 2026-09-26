import type {
  AdmissionLead,
  AdminNotificationRecord,
  AdminNotifyStatus,
} from "./lead";

export function getAdminNotification(
  lead: AdmissionLead
): AdminNotificationRecord | undefined {
  if (lead.adminNotification) return lead.adminNotification;
  if (lead.adminNotifyChannel === "email" && lead.adminNotifiedAt) {
    return {
      status: "provider-accepted",
      acceptedAt: lead.adminNotifiedAt,
      attemptCount: 1,
    };
  }
  if (lead.adminNotifyChannel === "log-fallback") {
    return {
      status: "logged-only",
      attemptedAt: lead.adminNotifiedAt,
      attemptCount: 1,
    };
  }
  return undefined;
}

export function canRetryAdminNotification(lead: AdmissionLead): boolean {
  const record = getAdminNotification(lead);
  if (!record) return true;
  return ["not-configured", "logged-only", "failed"].includes(record.status);
}

export function legacyPatchFromNotification(
  record: AdminNotificationRecord
): Partial<AdmissionLead> {
  if (record.status === "provider-accepted" && record.acceptedAt) {
    return {
      adminNotification: record,
      adminNotifiedAt: record.acceptedAt,
      adminNotifyChannel: "email",
    };
  }
  if (record.status === "logged-only") {
    return {
      adminNotification: record,
      adminNotifyChannel: "log-fallback",
    };
  }
  return { adminNotification: record };
}

export type { AdminNotifyStatus };
