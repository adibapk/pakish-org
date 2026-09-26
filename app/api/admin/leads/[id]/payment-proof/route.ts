import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { getAdmissionLead, readPaymentProofFile } from "@/lib/admission/store";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const lead = await getAdmissionLead(id);
  if (!lead?.paymentProof?.screenshotPath) {
    return NextResponse.json({ error: "Payment proof not found." }, { status: 404 });
  }

  try {
    const buffer = await readPaymentProofFile(lead.paymentProof.screenshotPath);
    const ext = lead.paymentProof.screenshotPath.split(".").pop()?.toLowerCase();
    const contentType =
      ext === "png"
        ? "image/png"
        : ext === "webp"
          ? "image/webp"
          : "image/jpeg";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "Content-Disposition": "inline",
      },
    });
  } catch {
    return NextResponse.json({ error: "Unable to read payment proof." }, { status: 404 });
  }
}
