import { NextResponse } from "next/server";
import { createAdmissionSchema } from "@/lib/admission/schema";
import { notifyAdminOfAdmission } from "@/lib/admission/notify";
import { checkRateLimit } from "@/lib/admission/rate-limit";
import {
  createAdmissionLead,
  toPublicLead,
} from "@/lib/admission/store";
import type { CourseSlug } from "@/lib/courses/types";
import type { TrainingPreference } from "@/lib/admission/types";

export const runtime = "nodejs";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const limit = checkRateLimit(`admission:${ip}`);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: limit.retryAfterSec
            ? { "Retry-After": String(limit.retryAfterSec) }
            : undefined,
        }
      );
    }

    const body = await request.json();
    const parsed = createAdmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Honeypot tripped
    if (parsed.data.website && parsed.data.website.trim().length > 0) {
      return NextResponse.json(
        {
          requestId: `adm_spam_${Date.now()}`,
          courseTitle: "OK",
          leadStatus: "New",
          paymentStatus: "Pending",
          createdAt: new Date().toISOString(),
        },
        { status: 201 }
      );
    }

    const lead = await createAdmissionLead(
      {
        fullName: parsed.data.fullName,
        whatsapp: parsed.data.whatsapp,
        email: parsed.data.email,
        courseSlug: parsed.data.courseSlug as CourseSlug,
        trainingPreference: parsed.data
          .trainingPreference as TrainingPreference,
        message: parsed.data.message,
      },
      {
        ip,
        userAgent: request.headers.get("user-agent"),
      }
    );

    // Fire-and-continue: never fail the student response solely on email
    void notifyAdminOfAdmission(lead);

    return NextResponse.json(toPublicLead(lead), { status: 201 });
  } catch (error) {
    console.error("[api/admission]", error);
    return NextResponse.json(
      { error: "Unable to submit admission request right now." },
      { status: 500 }
    );
  }
}
