import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { listAdmissionLeads, toPublicLead } from "@/lib/admission/store";

export const runtime = "nodejs";

/** Admin-only: full lead records (no ipHash/userAgent by default stripped? keep for admin) */
export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await listAdmissionLeads();
  return NextResponse.json({
    leads: leads.map((lead) => ({
      ...lead,
      // keep meta for admin ops; never expose via public APIs
      public: toPublicLead(lead),
    })),
  });
}
