import type { TrainingPreferenceOption } from "./types";

export const TRAINING_PREFERENCE_OPTIONS: TrainingPreferenceOption[] = [
  {
    value: "live-online",
    label: "Live Online Classes (Google Meet)",
  },
  {
    value: "in-center",
    label: "In-Center Training",
  },
  {
    value: "office-team",
    label: "Office / Team Training",
  },
  {
    value: "home-onsite",
    label: "Home / On-Site Training",
  },
];

export const ADMISSION_NEXT_STEPS = [
  {
    step: "1",
    title: "Our team will contact you and confirm course details.",
  },
  {
    step: "2",
    title:
      "Complete your course fee payment using available payment methods.",
  },
  {
    step: "3",
    title: "Send payment confirmation screenshot on WhatsApp or email.",
  },
  {
    step: "4",
    title: "Receive your admission confirmation and class schedule.",
  },
] as const;

export const ADMISSION_PAGE_COPY = {
  heroHeading: "Start Your Learning Journey",
  heroDescription:
    "Submit your admission request and our team will contact you with course details, schedule and next steps.",
  paymentConfirmNote:
    "After payment, please share your payment screenshot. Our team will verify and send confirmation.",
} as const;

export function getAdmissionPath(courseSlug?: string): string {
  if (!courseSlug) return "/admission";
  return `/admission?course=${encodeURIComponent(courseSlug)}`;
}
