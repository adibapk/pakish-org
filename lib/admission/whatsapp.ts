import { PAYMENT_CONFIRMATION } from "@/lib/payment-methods";
import type { AdmissionRequestPayload } from "./types";

export function buildCourseInfoWhatsAppMessage(courseTitle: string): string {
  return `Assalamualaikum, I want information about ${courseTitle} course.`;
}

export function buildCourseInfoWhatsAppUrl(courseTitle: string): string {
  const text = encodeURIComponent(buildCourseInfoWhatsAppMessage(courseTitle));
  return `https://wa.me/${PAYMENT_CONFIRMATION.whatsappE164}?text=${text}`;
}

export function buildAdmissionWhatsAppMessage(
  payload: Pick<
    AdmissionRequestPayload,
    "courseTitle" | "clientRequestId"
  >
): string {
  return [
    "Assalamualaikum,",
    `I want to enroll in ${payload.courseTitle}.`,
    `My admission request ID is ${payload.clientRequestId}.`,
  ].join("\n");
}

export function buildAdmissionWhatsAppUrl(
  payload: Pick<
    AdmissionRequestPayload,
    "courseTitle" | "clientRequestId"
  >
): string {
  const text = encodeURIComponent(buildAdmissionWhatsAppMessage(payload));
  return `https://wa.me/${PAYMENT_CONFIRMATION.whatsappE164}?text=${text}`;
}

export function buildAdmissionMailto(payload: AdmissionRequestPayload): string {
  const subject = encodeURIComponent(
    `Admission Request — ${payload.courseTitle} — ${payload.clientRequestId}`
  );
  const body = encodeURIComponent(
    [
      buildAdmissionWhatsAppMessage(payload),
      "",
      `Full Name: ${payload.fullName}`,
      `WhatsApp: ${payload.whatsapp}`,
      payload.email ? `Email: ${payload.email}` : undefined,
    ]
      .filter(Boolean)
      .join("\n")
  );
  return `mailto:billing@pakish.org?subject=${subject}&body=${body}`;
}
