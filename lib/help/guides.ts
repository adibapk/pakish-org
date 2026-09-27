/**
 * Public help hub copy — canonical source for /help routes and llms.txt pointers.
 * Last UI-verified: 2026-09-27 (local Prompt 22 preview).
 */

export const HELP_UI_VERIFIED_DATE = "2026-09-27";

export const STUDENT_JOURNEY_STATES = [
  {
    id: "application",
    title: "Application",
    summary:
      "You submit the public admission form at pakish.org/admission. No Academy invitation code is required to apply.",
  },
  {
    id: "review",
    title: "Admission review",
    summary:
      "Staff reviews your lead, confirms the course, fee, format, and cohort options, and contacts you.",
  },
  {
    id: "fee-confirmation",
    title: "Fee confirmation",
    summary:
      "Only after staff confirms the amount and payment instructions should you pay. Public payment pages are informational until then.",
  },
  {
    id: "payment-proof",
    title: "Payment proof",
    summary:
      "You share a screenshot or receipt. Submitting proof is not payment verification or enrollment.",
  },
  {
    id: "verification",
    title: "Payment verification",
    summary:
      "Staff verifies the payment against the confirmed fee and records the result on your lead.",
  },
  {
    id: "invitation",
    title: "Academy invitation",
    summary:
      "Academy account creation remains invite-only. Approved enrolled learners receive login access from the academic team.",
  },
  {
    id: "enrollment",
    title: "Enrollment & course access",
    summary:
      "You are enrolled in the correct Academy course and receive schedule or live-class instructions when your cohort starts.",
  },
] as const;

export type HelpGuideSection = {
  id: string;
  title: string;
  body: string[];
  qa?: { question: string; answer: string }[];
  status?: "verified" | "not-yet-verified";
};

export const STUDENT_GUIDE_META = {
  title: "Student Guide",
  description:
    "How to choose a course, apply without an invitation, understand lead status, pay only after fee confirmation, and receive Academy access at Pakish Institute.",
  audience: "Prospective and enrolled learners",
  prerequisites: [
    "A working email or WhatsApp number",
    "A preferred course from the public catalogue",
  ],
  expectedOutcome:
    "You can apply, track what happens next, avoid paying too early, and know how Academy access is issued.",
  contact: "admin@pakish.org · WhatsApp +92 300 8222456 · billing@pakish.org for payment receipts",
  lastUiVerified: HELP_UI_VERIFIED_DATE,
} as const;

export const STUDENT_GUIDE_SECTIONS: HelpGuideSection[] = [
  {
    id: "choose-course",
    title: "1. Choose a course",
    body: [
      "Browse https://pakish.org/courses or open any of the seven public course pages.",
      "Note the training format (live online, campus, team) and that fees are confirmed after counseling — published pages do not invent a fixed invoice for every learner.",
      "Women's Empowerment is a separate initiative with its own page; it is not a women-only institute policy.",
    ],
    qa: [
      {
        question: "Do I need an invitation code to apply for a Pakish Institute course?",
        answer:
          "No. The public admission form accepts applications without an invitation. Academy signup remains invite-only for account creation after approval and enrollment.",
      },
    ],
  },
  {
    id: "apply",
    title: "2. Apply without an invitation",
    body: [
      "Open https://pakish.org/admission or use Apply for Admission from a course page so your selected course reaches the form.",
      "Submit accurate contact details. You will receive an on-page confirmation with a lead reference ID.",
      "A submitted application is not an accepted seat, fee invoice, verified payment, or Academy enrollment.",
    ],
    qa: [
      {
        question: "What does my lead reference mean?",
        answer:
          "It identifies your admission request for staff follow-up. Keep it for WhatsApp or email conversations. It does not grant Academy login.",
      },
    ],
  },
  {
    id: "review-contact",
    title: "3. Wait for review and contact",
    body: [
      "Staff will contact you to confirm course details, schedule options, and the fee amount before you should pay.",
      "If you need an update, message WhatsApp +92 300 8222456 or email admin@pakish.org with your reference ID.",
    ],
  },
  {
    id: "pay",
    title: "4. Pay only after fee confirmation",
    body: [
      "Payment methods (Meezan Bank, JazzCash/Raast, PayPal, Payoneer) are listed at https://pakish.org/payment-methods for reference.",
      "Use those channels only after staff confirms the amount and asks you to pay.",
      "Do not treat a public QR page alone as an invoice for your seat.",
    ],
    qa: [
      {
        question: "When should I upload payment proof?",
        answer:
          "Only after staff confirms your fee and payment instructions. Uploading proof does not verify payment or enroll you automatically.",
      },
    ],
  },
  {
    id: "proof",
    title: "5. Share payment proof safely",
    body: [
      "Send a clear screenshot or receipt via WhatsApp or billing@pakish.org, including your name, course, amount, transaction reference, and lead ID.",
      "You may also use the optional on-site proof form when staff has asked you to pay — it stores proof for review only.",
    ],
  },
  {
    id: "academy-access",
    title: "6. Receive Academy access",
    body: [
      "Academy (https://academy.pakish.org) uses invite-only registration.",
      "After payment verification and enrollment, the academic team issues login access.",
      "Google sign-in, password login, and email login-link options may be available once your account exists — exact options depend on your invitation.",
    ],
    status: "verified",
    qa: [
      {
        question: "Why does Academy signup ask for an invite code?",
        answer:
          "Account creation is invite-only. Apply on the main website first; access is issued after admission approval and enrollment.",
      },
    ],
  },
  {
    id: "learning",
    title: "7. Finding your course and class materials",
    body: [
      "After enrollment, open Academy and look for your assigned course in your learner home.",
      "Live-class links, recordings, and assignments appear only when your instructor publishes them for your cohort.",
    ],
    status: "not-yet-verified",
  },
  {
    id: "password-profile",
    title: "8. Password and profile changes",
    body: [
      "Use Academy’s Forgot Password flow if you already have an account.",
      "Detailed profile-edit steps are labeled Not yet verified until instructor/learner UI is re-checked after Academy branding finalization (Prompt 21E).",
    ],
    status: "not-yet-verified",
  },
  {
    id: "support-privacy",
    title: "9. Support, privacy, and common failures",
    body: [
      "Support: admin@pakish.org, WhatsApp +92 300 8222456, billing@pakish.org for receipts.",
      "Privacy: https://pakish.org/privacy explains how admission and contact data is handled.",
      "Refund or cancellation terms are not published as a fixed public policy; ask staff for the current policy that applies to your offer.",
      "Common failures: paying before fee confirmation; expecting instant Academy signup; assuming proof upload equals verification.",
    ],
  },
];

export const TEACHER_GUIDE_META = {
  title: "Teacher Guide",
  description:
    "How instructors access Pakish Academy, work with assigned courses, and escalate learner issues — limited to verified or clearly labeled steps.",
  audience: "Assigned instructors",
  prerequisites: [
    "An issued Academy instructor account",
    "At least one assigned course",
  ],
  expectedOutcome:
    "You know the least-privilege access model and where to get help without using server tokens.",
  contact: "Academic ops via admin@pakish.org",
  lastUiVerified: HELP_UI_VERIFIED_DATE,
} as const;

export const TEACHER_GUIDE_SECTIONS: HelpGuideSection[] = [
  {
    id: "login",
    title: "1. Login and role",
    body: [
      "Instructors sign in at https://academy.pakish.org with the account issued by staff.",
      "Use least privilege: teach and review only assigned courses. Do not request admin tokens or database access.",
    ],
    status: "not-yet-verified",
  },
  {
    id: "courses",
    title: "2. Assigned course visibility",
    body: [
      "Open your instructor dashboard and confirm only courses assigned to you are visible.",
      "If a course is missing, escalate to academic ops — do not invent enrollments.",
    ],
    status: "not-yet-verified",
  },
  {
    id: "lessons",
    title: "3. Drafting and editing lessons",
    body: [
      "Prefer text-first lessons and exercises until recorded video is approved.",
      "Mark VIDEO NOT RECORDED placeholders honestly. Do not upload empty video shells as if content exists.",
    ],
    status: "not-yet-verified",
  },
  {
    id: "live-class",
    title: "4. Live-class communication",
    body: [
      "Share Google Meet links through the channel staff designates for your cohort.",
      "Obtain recording consent before recording learners. See internal LIVE_CLASS_SOP for staff-owned detail.",
    ],
  },
  {
    id: "assignments",
    title: "5. Assignments, feedback, and attendance",
    body: [
      "Review submissions with a clear rubric. Keep feedback professional and free of unnecessary personal data.",
      "Attendance tracking details are Not yet verified in the public UI guide; follow the staff runbook.",
    ],
    status: "not-yet-verified",
  },
  {
    id: "pii",
    title: "6. Learner PII and escalation",
    body: [
      "Do not export learner contact lists to personal drives or public chats.",
      "Escalate safeguarding, payment disputes, and access problems to admin@pakish.org — never publish credentials.",
    ],
  },
];

export const HELP_INDEX = [
  {
    href: "/help/students",
    title: "Student Guide",
    summary: "Apply, pay after confirmation, and receive Academy access.",
  },
  {
    href: "/help/teachers",
    title: "Teacher Guide",
    summary: "Instructor access, lessons, and escalation (partially verified).",
  },
  {
    href: "/admission",
    title: "Admission",
    summary: "Public application form — no invitation required to apply.",
  },
  {
    href: "/payment-methods",
    title: "Payment methods",
    summary: "Informational fee channels used after staff confirms amount.",
  },
  {
    href: "/privacy",
    title: "Privacy notice",
    summary: "How contact and admission information is handled.",
  },
] as const;
