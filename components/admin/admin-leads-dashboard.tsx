"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TRAINING_PREFERENCE_OPTIONS } from "@/lib/admission/constants";
import type { AdmissionLead } from "@/lib/admission/lead";
import type { AdminLeadAction } from "@/lib/admission/lifecycle";
import {
  getTransitionBlockers,
  listAvailableActions,
  migrateLeadDefaults,
} from "@/lib/admission/transitions";
import { MANUAL_PROVISIONING_CHECKLIST } from "@/lib/admission/provisioning";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ACTION_LABELS: Record<AdminLeadAction, string> = {
  "mark-contacted": "Mark Contacted",
  "request-payment": "Request Payment",
  "verify-payment": "Verify Payment",
  "reject-payment": "Reject Payment",
  "start-provisioning": "Start Provisioning (Manual)",
  "record-manual-provisioning": "Record Manual Provisioning IDs",
  "mark-enrolled": "Mark Enrolled",
  "approve-fee-support": "Approve Fee-Support Review",
  "reject-fee-support": "Reject Fee-Support Review",
  "preview-welcome": "Preview Welcome Message",
};

interface AdminLeadsDashboardProps {
  initialLeads: AdmissionLead[];
}

function preferenceLabel(value: AdmissionLead["trainingPreference"]) {
  return (
    TRAINING_PREFERENCE_OPTIONS.find((option) => option.value === value)?.label ??
    value
  );
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en-PK", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function AdminLeadsDashboard({ initialLeads }: AdminLeadsDashboardProps) {
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [welcomePreview, setWelcomePreview] = useState<string | null>(null);
  const [manualIds, setManualIds] = useState({
    studentAccountId: "",
    enrollmentId: "",
    academyCourseUuid: "",
    notes: "",
  });

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function runAction(id: string, action: AdminLeadAction, extra?: Record<string, string>) {
    setSavingId(id);
    setError(null);
    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...extra }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Update failed.");
      }
      setLeads((current) =>
        current.map((lead) => (lead.id === id ? data.lead : lead))
      );
      if (data.welcomePreview) {
        setWelcomePreview(data.welcomePreview);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-6 px-4 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm tracking-wider text-primary">Admin</p>
          <h1 className="text-3xl font-bold">Admission Leads</h1>
          <p className="text-muted-foreground">
            {leads.length} request{leads.length === 1 ? "" : "s"} · guarded lifecycle
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.refresh()}>
            Refresh
          </Button>
          <Button variant="secondary" onClick={logout}>
            Sign out
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {welcomePreview && (
        <Card>
          <CardHeader>
            <CardTitle>Welcome / Access Preview (not sent)</CardTitle>
            <CardDescription>
              Copy manually when a real send is authorized in production.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">
              {welcomePreview}
            </pre>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Manual Academy provisioning checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            {MANUAL_PROVISIONING_CHECKLIST.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {leads.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No leads yet</CardTitle>
            <CardDescription>
              New admission submissions from `/admission` will appear here.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => {
            const migrated = migrateLeadDefaults(lead);
            const actions = listAvailableActions(migrated);
            const blockers = getTransitionBlockers(migrated);

            return (
              <Card key={lead.id} className="border-secondary">
                <CardHeader className="gap-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CardTitle className="text-xl">{lead.fullName}</CardTitle>
                      <CardDescription className="mt-1">
                        {lead.courseTitle} · {migrated.applicationKind}
                      </CardDescription>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">{lead.id}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <dl className="grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-muted-foreground">WhatsApp</dt>
                      <dd>{lead.whatsapp}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>{lead.email || "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Training preference</dt>
                      <dd>{preferenceLabel(lead.trainingPreference)}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Stages</dt>
                      <dd>
                        Lead: {lead.leadStatus} · Payment: {lead.paymentStatus} ·
                        Provisioning: {migrated.provisioningStage} · Welcome:{" "}
                        {migrated.welcomeStage}
                      </dd>
                    </div>
                    {lead.applicationKind !== "womens-fee-support" && lead.message && (
                      <div className="sm:col-span-2">
                        <dt className="text-muted-foreground">Message</dt>
                        <dd className="whitespace-pre-wrap">{lead.message}</dd>
                      </div>
                    )}
                    {lead.paymentProof?.referenceNumber && (
                      <div className="sm:col-span-2">
                        <dt className="text-muted-foreground">Payment proof</dt>
                        <dd className="space-y-1">
                          <div>
                            Ref: {lead.paymentProof.referenceNumber}
                            {lead.paymentProof.submittedAt
                              ? ` · ${formatDate(lead.paymentProof.submittedAt)}`
                              : ""}
                          </div>
                          {lead.paymentProof.screenshotPath && (
                            <a
                              className="text-primary hover:underline"
                              href={`/api/admin/leads/${lead.id}/payment-proof`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View screenshot (admin only)
                            </a>
                          )}
                        </dd>
                      </div>
                    )}
                  </dl>

                  {blockers.length > 0 && (
                    <div className="rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-sm">
                      <p className="font-medium">Blockers</p>
                      <ul className="mt-1 list-disc pl-5">
                        {blockers.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {migrated.auditEvents && migrated.auditEvents.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      <p className="font-medium text-foreground">Audit (latest 5)</p>
                      <ul className="mt-1 space-y-1">
                        {migrated.auditEvents.slice(-5).map((event) => (
                          <li key={event.id}>
                            {formatDate(event.at)} · {event.action} · {event.actor}
                            {event.note ? ` — ${event.note}` : ""}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {actions.map((action) => (
                      <Button
                        key={action}
                        size="sm"
                        variant={action.includes("reject") ? "destructive" : "secondary"}
                        disabled={savingId === lead.id}
                        onClick={() => {
                          if (action === "record-manual-provisioning") {
                            if (!manualIds.studentAccountId || !manualIds.enrollmentId) {
                              setError(
                                "Enter studentAccountId and enrollmentId in the manual provisioning fields below first."
                              );
                              return;
                            }
                            void runAction(lead.id, action, {
                              studentAccountId: manualIds.studentAccountId,
                              enrollmentId: manualIds.enrollmentId,
                              academyCourseUuid: manualIds.academyCourseUuid,
                              manualProvisioningNotes: manualIds.notes,
                            });
                            return;
                          }
                          if (action === "reject-payment" || action === "reject-fee-support") {
                            const reason = window.prompt("Rejection reason (optional)") ?? "";
                            void runAction(lead.id, action, {
                              rejectionReason: reason,
                            });
                            return;
                          }
                          void runAction(lead.id, action);
                        }}
                      >
                        {ACTION_LABELS[action]}
                      </Button>
                    ))}
                  </div>

                  {actions.includes("record-manual-provisioning") && (
                    <div className="grid gap-2 rounded-md border p-3 sm:grid-cols-2">
                      <input
                        className="rounded border px-2 py-1 text-sm"
                        placeholder="Academy student account ID"
                        value={manualIds.studentAccountId}
                        onChange={(e) =>
                          setManualIds((s) => ({
                            ...s,
                            studentAccountId: e.target.value,
                          }))
                        }
                      />
                      <input
                        className="rounded border px-2 py-1 text-sm"
                        placeholder="Academy enrollment ID"
                        value={manualIds.enrollmentId}
                        onChange={(e) =>
                          setManualIds((s) => ({ ...s, enrollmentId: e.target.value }))
                        }
                      />
                      <input
                        className="rounded border px-2 py-1 text-sm sm:col-span-2"
                        placeholder="Academy course UUID (optional)"
                        value={manualIds.academyCourseUuid}
                        onChange={(e) =>
                          setManualIds((s) => ({
                            ...s,
                            academyCourseUuid: e.target.value,
                          }))
                        }
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
