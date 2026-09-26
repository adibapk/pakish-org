"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRAINING_PREFERENCE_OPTIONS } from "@/lib/admission/constants";
import type {
  AdmissionLead,
  LeadPaymentStatus,
  LeadStatus,
} from "@/lib/admission/lead";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LEAD_STATUSES: LeadStatus[] = [
  "New",
  "Contacted",
  "Payment Pending",
  "Payment Received",
  "Enrolled",
];

const PAYMENT_STATUSES: LeadPaymentStatus[] = [
  "Pending",
  "Submitted",
  "Verified",
];

interface AdminLeadsDashboardProps {
  initialLeads: AdmissionLead[];
}

function preferenceLabel(value: AdmissionLead["trainingPreference"]) {
  return (
    TRAINING_PREFERENCE_OPTIONS.find((option) => option.value === value)
      ?.label ?? value
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

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function patchLead(
    id: string,
    patch: { leadStatus?: LeadStatus; paymentStatus?: LeadPaymentStatus }
  ) {
    setSavingId(id);
    setError(null);
    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Update failed.");
      }
      setLeads((current) =>
        current.map((lead) => (lead.id === id ? data.lead : lead))
      );
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
            {leads.length} request{leads.length === 1 ? "" : "s"} · updates
            persist to storage
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
          {leads.map((lead) => (
            <Card key={lead.id} className="border-secondary">
              <CardHeader className="gap-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="text-xl">{lead.fullName}</CardTitle>
                    <CardDescription className="mt-1">
                      {lead.courseTitle}
                    </CardDescription>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">
                    {lead.id}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-muted-foreground">WhatsApp</dt>
                    <dd>
                      <a
                        className="text-primary hover:underline"
                        href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "").replace(/^0/, "92")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {lead.whatsapp}
                      </a>
                    </dd>
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
                    <dt className="text-muted-foreground">Created</dt>
                    <dd>{formatDate(lead.createdAt)}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-muted-foreground">Message</dt>
                    <dd className="whitespace-pre-wrap">
                      {lead.message || "—"}
                    </dd>
                  </div>
                  {lead.paymentProof?.referenceNumber && (
                    <div className="sm:col-span-2">
                      <dt className="text-muted-foreground">Payment proof</dt>
                      <dd>
                        Ref: {lead.paymentProof.referenceNumber}
                        {lead.paymentProof.submittedAt
                          ? ` · ${formatDate(lead.paymentProof.submittedAt)}`
                          : ""}
                        {lead.paymentProof.notes
                          ? ` · ${lead.paymentProof.notes}`
                          : ""}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Lead status</p>
                    <Select
                      value={lead.leadStatus}
                      disabled={savingId === lead.id}
                      onValueChange={(value) =>
                        patchLead(lead.id, {
                          leadStatus: value as LeadStatus,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LEAD_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Payment status</p>
                    <Select
                      value={lead.paymentStatus}
                      disabled={savingId === lead.id}
                      onValueChange={(value) =>
                        patchLead(lead.id, {
                          paymentStatus: value as LeadPaymentStatus,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PAYMENT_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
