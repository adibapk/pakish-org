import { z } from "zod";
import { getCourseSlugs } from "@/lib/courses";

const courseSlugEnum = z.enum(
  getCourseSlugs() as [string, ...string[]]
);

export const createAdmissionSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is required.")
    .max(120, "Full name is too long."),
  whatsapp: z
    .string()
    .trim()
    .min(7, "WhatsApp number is required.")
    .max(30, "WhatsApp number is too long.")
    .regex(/^[\d+\-\s()]+$/, "Enter a valid WhatsApp number."),
  email: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.string().trim().email("Enter a valid email.").max(160).optional()
  ),
  courseSlug: courseSlugEnum,
  trainingPreference: z.enum([
    "live-online",
    "in-center",
    "office-team",
    "home-onsite",
  ]),
  message: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.string().trim().max(2000, "Message is too long.").optional()
  ),
  /** Honeypot — bots fill this; humans leave empty */
  website: z.string().optional(),
});

export const paymentProofSchema = z.object({
  requestId: z
    .string()
    .trim()
    .regex(/^adm_[a-z0-9]+$/i, "Invalid request ID."),
  referenceNumber: z
    .string()
    .trim()
    .min(3, "Payment reference is required.")
    .max(120),
  notes: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.string().trim().max(1000).optional()
  ),
  screenshotDataUrl: z
    .string()
    .max(2_200_000)
    .optional()
    .refine(
      (value) =>
        !value ||
        /^data:image\/(png|jpeg|jpg|webp);base64,/i.test(value),
      "Screenshot must be a PNG, JPG, or WebP image."
    ),
  screenshotFileName: z.string().trim().max(120).optional(),
});

export type CreateAdmissionBody = z.infer<typeof createAdmissionSchema>;
export type PaymentProofBody = z.infer<typeof paymentProofSchema>;
