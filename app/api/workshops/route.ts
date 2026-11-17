import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/admission/rate-limit";
import {
  aiExperienceLevels,
  devices,
  formatSessionTime,
  formatWorkshopDay,
  getUpcomingWorkshopDays,
  participantCategories,
  workshop,
  workshopConsent,
  WORKSHOP_EMAIL,
} from "@/lib/workshops";

export const runtime = "nodejs";

const maxBodyBytes = 8_192;
const submissionSchema = z.object({
  event: z.literal(workshop.id),
  requestId: z.string().uuid(),
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  whatsapp: z.string().trim().max(30).regex(/^\+?[\d ()-]+$/)
    .refine((value) => /^\d{7,15}$/.test(value.replace(/\D/g, ""))),
  age: z.number().int().min(1).max(120).nullable(),
  organization: z.string().trim().max(120),
  category: z.enum(participantCategories),
  sessions: z.array(z.string().max(40)).min(1).max(workshop.sessions.length),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  aiExperience: z.enum(aiExperienceLevels),
  device: z.enum(devices),
  learningGoal: z.string().trim().max(500),
  consent: z.literal(true),
  website: z.string().max(200),
});

function unavailable() {
  return NextResponse.json(
    { error: "We couldn't submit your registration. Please try again." },
    { status: 503 },
  );
}

export async function POST(request: Request) {
  if (
    request.headers.get("sec-fetch-site") === "cross-site" ||
    request.headers.get("content-type")?.split(";")[0].trim() !== "application/json"
  ) {
    return NextResponse.json({ error: "Invalid registration request." }, { status: 400 });
  }

  const ip = request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") || "unknown";
  const limit = checkRateLimit(`workshop:${ip}`, 8);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  let body: unknown;
  try {
    if (Number(request.headers.get("content-length")) > maxBodyBytes) {
      return NextResponse.json({ error: "Registration is too long." }, { status: 413 });
    }
    const text = await request.text();
    if (Buffer.byteLength(text) > maxBodyBytes) {
      return NextResponse.json({ error: "Registration is too long." }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid registration request." }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your details, workshop choices and consent, then try again." },
      { status: 422 },
    );
  }

  const registration = parsed.data;
  if (registration.website) return NextResponse.json({ ok: true }, { status: 201 });

  if (!getUpcomingWorkshopDays().includes(registration.preferredDate)) {
    return NextResponse.json(
      { error: "That date is no longer available. Refresh this page to see the upcoming dates." },
      { status: 409 },
    );
  }

  const sessions = workshop.sessions.filter(({ id }) => registration.sessions.includes(id));
  if (sessions.length !== registration.sessions.length) {
    return NextResponse.json({ error: "Please select valid workshop sessions." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    console.error("[workshop:notify] Resend sender or key is missing");
    return unavailable();
  }

  const date = formatWorkshopDay(registration.preferredDate);
  const text = [
    `Pakish Institute — ${workshop.title}`,
    `Registration reference: ${registration.requestId}`,
    `Preferred date: ${date}`,
    `Venue: ${workshop.venue}, ${workshop.address}`,
    "Selected workshops (suggested Pakistan time):",
    ...sessions.map((session) => `- ${session.title} (${formatSessionTime(session)})`),
    "",
    `Full name: ${registration.fullName}`,
    `Email: ${registration.email}`,
    `WhatsApp / Mobile: ${registration.whatsapp}`,
    `Age: ${registration.age || "Not provided"}`,
    `Company / Institute: ${registration.organization || "Not provided"}`,
    `Participant category: ${registration.category}`,
    `AI experience: ${registration.aiExperience}`,
    `Device: ${registration.device}`,
    `Learning goal: ${registration.learningGoal || "Not provided"}`,
    "",
    `Participant consent accepted: ${workshopConsent}`,
    "",
    "Please coordinate final timings and seat confirmation with the participant.",
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `workshop/${workshop.id}/${registration.requestId}`,
      },
      body: JSON.stringify({
        from,
        to: [WORKSHOP_EMAIL],
        reply_to: registration.email,
        subject: `[Workshop registration] ${date}`,
        text,
      }),
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) {
      console.error("[workshop:notify] Resend request failed", response.status);
      return unavailable();
    }
    const { id } = await response.json();
    if (typeof id !== "string" || !id) return unavailable();

    console.info("[workshop:notify] Provider accepted", { requestId: registration.requestId, id });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    console.error("[workshop:notify] Resend response unavailable");
    return unavailable();
  }
}
