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
    title: "We contact you and confirm course details.",
    detail:
      "Expect a review call or message about format, schedule options, and fit — before any payment request.",
  },
  {
    step: "2",
    title: "Fee and payment instructions are confirmed by staff.",
    detail:
      "You receive a dated written offer with amount, course details, and policy version 2026-09-27 before any payment request. Public payment pages stay informational until then.",
  },
  {
    step: "3",
    title: "Accept the offer, pay using the confirmed channel, then share proof.",
    detail:
      "Read Terms and Payment & Cancellation before paying. A screenshot helps review; proof upload is not verification or enrollment.",
  },
  {
    step: "4",
    title: "After verification, receive enrollment and Academy access.",
    detail:
      "Academy accounts stay invite-only. Login access is issued after approval and enrollment.",
  },
] as const;

export const ADMISSION_PAGE_COPY = {
  heroHeading: "Start Your Learning Journey",
  heroDescription:
    "Apply without an invitation. Submit your admission request and our team will contact you with course details, schedule, and next steps. Academy login access is issued after admission approval and enrollment — not instantly at signup.",
  noInviteNote:
    "Apply without an invitation. Academy access is issued after admission approval and enrollment.",
  paymentConfirmNote:
    "Pay only after our team confirms your fee and payment instructions. Then share a screenshot for review — proof is not automatic verification.",
  academyAccessNote:
    "Pakish Academy (academy.pakish.org) uses invite-only registration. Approved and enrolled learners receive login access from our academic team.",
  policyRequestNote:
    "Before you pay, read the Terms of Training and Payment & Cancellation Policy (version 2026-09-27). Course fees are not refunded for a change of mind after payment; statutory remedies still apply if Pakish does not provide the agreed training.",
} as const;

export function getAdmissionPath(courseSlug?: string): string {
  if (!courseSlug) return "/admission";
  return `/admission?course=${encodeURIComponent(courseSlug)}`;
}
