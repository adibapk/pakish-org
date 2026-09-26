import { NextResponse } from "next/server";
import { paymentProofSchema } from "@/lib/admission/schema";
import { checkRateLimit } from "@/lib/admission/rate-limit";
import { attachPaymentProof, toPublicLead } from "@/lib/admission/store";

export const runtime = "nodejs";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const limit = checkRateLimit(`payment-proof:${ip}`, 8);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = paymentProofSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const lead = await attachPaymentProof(parsed.data);
    if (!lead) {
      return NextResponse.json(
        { error: "Admission request not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(toPublicLead(lead), { status: 200 });
  } catch (error) {
    const code = error instanceof Error ? error.message : "";
    const message =
      code === "SCREENSHOT_TOO_LARGE"
        ? "Screenshot is too large. Max 1.5 MB, or send via WhatsApp instead."
        : code === "PAYMENT_PROOF_NOT_ALLOWED"
          ? "Payment proof cannot be submitted for this application in its current state."
          : code === "PAYMENT_ALREADY_VERIFIED"
            ? "Payment has already been verified for this request."
            : code === "UNSUPPORTED_IMAGE" || code === "INVALID_DATA_URL"
              ? "Upload a valid PNG, JPG, or WebP payment screenshot."
              : "Unable to submit payment proof right now.";

    console.error("[api/admission/payment-proof]", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
