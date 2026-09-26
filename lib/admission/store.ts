import { createHash, randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { getCourseBySlug } from "@/lib/courses";
import type {
  AdmissionLead,
  CreateAdmissionLeadInput,
  LeadPaymentStatus,
  LeadStatus,
  PaymentProof,
  SubmitPaymentProofInput,
} from "./lead";

const DATA_DIR = path.join(process.cwd(), ".data", "admissions");

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

function leadPath(id: string) {
  return path.join(DATA_DIR, `${id}.json`);
}

function hashIp(ip: string | null | undefined): string | undefined {
  if (!ip) return undefined;
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export function createRequestId(): string {
  return `adm_${randomUUID().replace(/-/g, "").slice(0, 16)}`;
}

export async function createAdmissionLead(
  input: CreateAdmissionLeadInput,
  meta?: { ip?: string | null; userAgent?: string | null }
): Promise<AdmissionLead> {
  const course = getCourseBySlug(input.courseSlug);
  if (!course) {
    throw new Error("INVALID_COURSE");
  }

  const now = new Date().toISOString();
  const lead: AdmissionLead = {
    id: createRequestId(),
    fullName: input.fullName.trim(),
    whatsapp: input.whatsapp.trim(),
    email: input.email?.trim() || undefined,
    courseSlug: course.slug,
    courseTitle: course.title,
    trainingPreference: input.trainingPreference,
    message: input.message?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
    leadStatus: "New",
    paymentStatus: "Pending",
    source: "web-admission-form",
    integrations: {
      lmsCourseId: course.integrations?.lmsCourseId,
      aiTutorId: course.integrations?.aiTutorId,
      progressPercent: 0,
    },
    meta: {
      ipHash: hashIp(meta?.ip ?? undefined),
      userAgent: meta?.userAgent?.slice(0, 200) || undefined,
    },
  };

  await ensureDir(DATA_DIR);
  await fs.writeFile(leadPath(lead.id), JSON.stringify(lead, null, 2), "utf8");
  return lead;
}

export async function listAdmissionLeads(): Promise<AdmissionLead[]> {
  await ensureDir(DATA_DIR);
  const entries = await fs.readdir(DATA_DIR, { withFileTypes: true });
  const leads: AdmissionLead[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
    try {
      const raw = await fs.readFile(path.join(DATA_DIR, entry.name), "utf8");
      leads.push(JSON.parse(raw) as AdmissionLead);
    } catch {
      // skip corrupt files
    }
  }

  return leads.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getAdmissionLead(
  id: string
): Promise<AdmissionLead | null> {
  try {
    const raw = await fs.readFile(leadPath(id), "utf8");
    return JSON.parse(raw) as AdmissionLead;
  } catch {
    return null;
  }
}

export async function updateAdmissionLead(
  id: string,
  patch: Partial<
    Pick<
      AdmissionLead,
      | "leadStatus"
      | "paymentStatus"
      | "paymentProof"
      | "adminNotifiedAt"
      | "adminNotifyChannel"
      | "integrations"
    >
  >
): Promise<AdmissionLead | null> {
  const existing = await getAdmissionLead(id);
  if (!existing) return null;

  const updated: AdmissionLead = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  await fs.writeFile(leadPath(id), JSON.stringify(updated, null, 2), "utf8");
  return updated;
}

export async function attachPaymentProof(
  input: SubmitPaymentProofInput
): Promise<AdmissionLead | null> {
  const existing = await getAdmissionLead(input.requestId);
  if (!existing) return null;

  const proof: PaymentProof = {
    referenceNumber: input.referenceNumber.trim(),
    notes: input.notes?.trim() || undefined,
    submittedAt: new Date().toISOString(),
    screenshotFileName: input.screenshotFileName,
  };

  if (input.screenshotDataUrl) {
    const saved = await saveScreenshot(
      input.requestId,
      input.screenshotDataUrl,
      input.screenshotFileName
    );
    if (saved) {
      proof.screenshotPath = saved.relativePath;
      proof.screenshotFileName = saved.fileName;
    }
  }

  return updateAdmissionLead(input.requestId, {
    paymentProof: proof,
    paymentStatus: "Submitted" satisfies LeadPaymentStatus,
    leadStatus: "Payment Pending" satisfies LeadStatus,
  });
}

async function saveScreenshot(
  requestId: string,
  dataUrl: string,
  fileName?: string
): Promise<{ relativePath: string; fileName: string } | null> {
  const match = /^data:(image\/(?:png|jpeg|jpg|webp));base64,(.+)$/i.exec(
    dataUrl
  );
  if (!match) return null;

  const mime = match[1].toLowerCase();
  const base64 = match[2];
  const buffer = Buffer.from(base64, "base64");

  // Keep uploads small to avoid abuse (1.5 MB)
  if (buffer.byteLength > 1.5 * 1024 * 1024) {
    throw new Error("SCREENSHOT_TOO_LARGE");
  }

  const ext =
    mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : "jpg";
  const safeName = (fileName || `proof.${ext}`).replace(/[^\w.\-]+/g, "_");
  const dir = path.join(DATA_DIR, requestId);
  await ensureDir(dir);
  const absolute = path.join(dir, safeName);
  await fs.writeFile(absolute, buffer);

  return {
    relativePath: path.join(requestId, safeName),
    fileName: safeName,
  };
}

export function toPublicLead(lead: AdmissionLead) {
  return {
    requestId: lead.id,
    courseTitle: lead.courseTitle,
    leadStatus: lead.leadStatus,
    paymentStatus: lead.paymentStatus,
    createdAt: lead.createdAt,
  };
}
