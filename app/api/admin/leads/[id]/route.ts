import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/admin/auth";
import {
  getAdmissionLead,
  updateAdmissionLead,
} from "@/lib/admission/store";
import type { LeadPaymentStatus, LeadStatus } from "@/lib/admission/lead";

export const runtime = "nodejs";

const patchSchema = z.object({
  leadStatus: z
    .enum([
      "New",
      "Contacted",
      "Payment Pending",
      "Payment Received",
      "Enrolled",
    ])
    .optional(),
  paymentStatus: z.enum(["Pending", "Submitted", "Verified"]).optional(),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  if (!/^adm_[a-z0-9]+$/i.test(id)) {
    return NextResponse.json({ error: "Invalid request ID." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (!parsed.data.leadStatus && !parsed.data.paymentStatus) {
    return NextResponse.json(
      { error: "Provide leadStatus and/or paymentStatus." },
      { status: 400 }
    );
  }

  const existing = await getAdmissionLead(id);
  if (!existing) {
    return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  }

  const patch: {
    leadStatus?: LeadStatus;
    paymentStatus?: LeadPaymentStatus;
    paymentProof?: typeof existing.paymentProof;
  } = {};

  if (parsed.data.leadStatus) {
    patch.leadStatus = parsed.data.leadStatus;
  }
  if (parsed.data.paymentStatus) {
    patch.paymentStatus = parsed.data.paymentStatus;
    if (parsed.data.paymentStatus === "Verified") {
      patch.paymentProof = {
        ...existing.paymentProof,
        verifiedAt: new Date().toISOString(),
        verifiedBy: "admin",
      };
      if (!parsed.data.leadStatus && existing.leadStatus !== "Enrolled") {
        patch.leadStatus = "Payment Received";
      }
    }
  }

  const updated = await updateAdmissionLead(id, patch);
  return NextResponse.json({ lead: updated });
}
