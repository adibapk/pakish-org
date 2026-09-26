import { ACADEMY_LOGIN_URL } from "@/lib/academy";

export interface WelcomeMessageInput {
  fullName: string;
  courseTitle: string;
  email?: string;
}

export function buildWelcomeAccessMessage(input: WelcomeMessageInput): string {
  const greeting = input.fullName.trim() || "Learner";
  const emailLine = input.email
    ? `Use the email address we have on file: ${input.email}`
    : "Use the email address shared during admission.";

  return [
    `Dear ${greeting},`,
    "",
    `Welcome to Pakish Institute. Your enrollment for "${input.courseTitle}" is now active.`,
    "",
    "Academy login:",
    ACADEMY_LOGIN_URL,
    "",
    emailLine,
    "If you need to reset your password, use the Academy login page recovery option or contact support — do not share passwords by chat.",
    "",
    "Support: admin@pakish.org · WhatsApp +92 300 8222456",
    "",
    "We look forward to learning with you.",
    "Pakish Institute Admissions",
  ].join("\n");
}
