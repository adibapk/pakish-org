import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdminMutationOrigin } from "@/lib/admin/csrf";
import { requireAdminSession } from "@/lib/admin/auth";
import type { AdminLeadAction } from "@/lib/admission/lifecycle";
import {
  applyAdminLeadAction,
  toAdminListLead,
  TransitionError,
} from "@/lib/admission/store";
import { buildWelcomeAccessMessage } from "@/lib/admission/welcome";

export const runtime = "nodejs";

const actionSchema = z.object({
  action: z.enum([
    "mark-contacted",
    "request-payment",
    "verify-payment",
    "reject-payment",
    "start-provisioning",
    "record-manual-provisioning",
    "mark-enrolled",
    "approve-fee-support",
    "reject-fee-support",
    "preview-welcome",
  ]),
  note: z.string().trim().max(1000).optional(),
  rejectionReason: z.string().trim().max(1000).optional(),
  studentAccountId: z.string().trim().max(120).optional(),
  enrollmentId: z.string().trim().max(120).optional(),
  academyCourseUuid: z.string().trim().max(120).optional(),
  manualProvisioningNotes: z.string().trim().max(2000).optional(),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!assertAdminMutationOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin." }, { status: 403 });
  }

  const { id } = await context.params;
  if (!/^adm_[a-z0-9]+$/i.test(id)) {
    return NextResponse.json({ error: "Invalid request ID." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = actionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const saved = await applyAdminLeadAction(
      id,
      parsed.data.action as AdminLeadAction,
      {
        actor: "admin",
        note: parsed.data.note,
        rejectionReason: parsed.data.rejectionReason,
        studentAccountId: parsed.data.studentAccountId,
        enrollmentId: parsed.data.enrollmentId,
        academyCourseUuid: parsed.data.academyCourseUuid,
        manualProvisioningNotes: parsed.data.manualProvisioningNotes,
      }
    );
    const response: Record<string, unknown> = { lead: toAdminListLead(saved) };

    if (parsed.data.action === "preview-welcome") {
      response.welcomePreview = buildWelcomeAccessMessage({
        fullName: saved.fullName,
        courseTitle: saved.courseTitle,
        email: saved.email,
      });
    }

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error && error.message === "LEAD_NOT_FOUND") {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }
    if (error instanceof TransitionError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    console.error("[api/admin/leads/:id]", error);
    return NextResponse.json({ error: "Unable to update lead." }, { status: 500 });
  }
}
