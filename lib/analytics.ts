/**
 * Analytics placeholders for GA4 / Meta Pixel.
 * Safe no-ops until tags are installed on the site.
 */

export type AnalyticsEventName =
  | "admission_form_submitted"
  | "course_selected"
  | "whatsapp_clicked"
  | "payment_page_visited"
  | "payment_proof_submitted";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(
  name: AnalyticsEventName,
  payload: AnalyticsPayload = {}
): void {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });

    if (typeof window.gtag === "function") {
      window.gtag("event", name, payload);
    }

    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", name, payload);
    }
  } catch {
    // Never break UX for analytics
  }
}
