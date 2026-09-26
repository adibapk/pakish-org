import { createHash, randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { getMappedAcademyCourseUuid } from "@/lib/academy/course-mapping";
import { getCourseBySlug } from "@/lib/courses";
import {
  canUploadPaymentProof,
  inferApplicationKind,
  LEAD_SCHEMA_VERSION,
} from "./lifecycle";
import type {
  AdmissionLead,
  CreateAdmissionLeadInput,
  LeadPaymentStatus,
  LeadStatus,
  PaymentProof,
  SubmitPaymentProofInput,
} from "./lead";
import {
  buildProofStorageName,
  assertSafeProofRelativePath,
  parseProofDataUrl,
} from "./payment-proof-file";
import type { AdminLeadAction, TransitionContext } from "./lifecycle";
import {
  applyAdminAction,
  migrateLeadDefaults,
  TransitionError,
} from "./transitions";

const DATA_DIR = path.join(process.cwd(), ".data", "admissions");
const PROOFS_DIR = path.join(DATA_DIR, "proofs");

const leadLocks = new Map<string, Promise<unknown>>();

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

async function atomicWriteJson(filePath: string, data: unknown) {
  await ensureDir(path.dirname(filePath));
  const tmp = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  const payload = JSON.stringify(data, null, 2);
  await fs.writeFile(tmp, payload, "utf8");
  await fs.rename(tmp, filePath);
}

async function withLeadLock<T>(id: string, fn: () => Promise<T>): Promise<T> {
  const previous = leadLocks.get(id) ?? Promise.resolve();
  const run = previous.catch(() => undefined).then(fn);
  leadLocks.set(id, run);
  try {
    return await run;
  } finally {
    if (leadLocks.get(id) === run) {
      leadLocks.delete(id);
    }
  }
}

function parseLeadFile(raw: string, fileName: string): AdmissionLead | null {
  try {
    const parsed = JSON.parse(raw) as AdmissionLead;
    if (!parsed?.id) return null;
    return migrateLeadDefaults(parsed);
  } catch {
    return {
      id: fileName.replace(/\.json$/, ""),
      fullName: "[Corrupt record]",
      whatsapp: "",
      courseSlug: "ai-productivity",
      courseTitle: "Unknown",
      trainingPreference: "live-online",
      createdAt: new Date(0).toISOString(),
      updatedAt: new Date().toISOString(),
      leadStatus: "New",
      paymentStatus: "Pending",
      source: "web-admission-form",
      integrations: {},
      parseWarning: "Corrupt lead JSON could not be parsed.",
      auditEvents: [],
    } as AdmissionLead;
  }
}

export async function createAdmissionLead(
  input: CreateAdmissionLeadInput,
  meta?: { ip?: string | null; userAgent?: string | null; sourcePath?: string }
): Promise<AdmissionLead> {
  const course = getCourseBySlug(input.courseSlug);
  if (!course) {
    throw new Error("INVALID_COURSE");
  }

  const applicationKind = inferApplicationKind({
    trainingPreference: input.trainingPreference,
    sourcePath: meta?.sourcePath,
    enrollmentType: input.enrollmentType,
  });

  const now = new Date().toISOString();
  const lead: AdmissionLead = migrateLeadDefaults({
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
    schemaVersion: LEAD_SCHEMA_VERSION,
    applicationKind,
    integrations: {
      academyCourseUuid: getMappedAcademyCourseUuid(course.slug),
      aiTutorId: course.integrations?.aiTutorId,
      progressPercent: 0,
    },
    meta: {
      ipHash: hashIp(meta?.ip ?? undefined),
      userAgent: meta?.userAgent?.slice(0, 200) || undefined,
    },
  });

  await atomicWriteJson(leadPath(lead.id), lead);
  return lead;
}

export async function listAdmissionLeads(): Promise<AdmissionLead[]> {
  await ensureDir(DATA_DIR);
  const entries = await fs.readdir(DATA_DIR, { withFileTypes: true });
  const leads: AdmissionLead[] = [];
  const warnings: string[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
    const raw = await fs.readFile(path.join(DATA_DIR, entry.name), "utf8");
    const lead = parseLeadFile(raw, entry.name);
    if (!lead) {
      warnings.push(entry.name);
      continue;
    }
    if (lead.parseWarning) warnings.push(entry.name);
    leads.push(lead);
  }

  if (warnings.length > 0) {
    console.warn("[admission/store] lead parse warnings:", warnings.join(", "));
  }

  return leads.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getAdmissionLead(id: string): Promise<AdmissionLead | null> {
  try {
    const raw = await fs.readFile(leadPath(id), "utf8");
    return parseLeadFile(raw, `${id}.json`);
  } catch {
    return null;
  }
}

async function writeAdmissionLead(lead: AdmissionLead): Promise<AdmissionLead> {
  const updated: AdmissionLead = {
    ...migrateLeadDefaults(lead),
    updatedAt: new Date().toISOString(),
  };
  await atomicWriteJson(leadPath(updated.id), updated);
  return updated;
}

export async function saveAdmissionLead(lead: AdmissionLead): Promise<AdmissionLead> {
  return writeAdmissionLead(lead);
}

export async function mutateAdmissionLead<T>(
  id: string,
  mutate: (lead: AdmissionLead) => T | Promise<T>
): Promise<T | null> {
  return withLeadLock(id, async () => {
    const existing = await getAdmissionLead(id);
    if (!existing) return null;
    const result = await mutate(migrateLeadDefaults(existing));
    return result;
  });
}

export async function applyAdminLeadAction(
  id: string,
  action: AdminLeadAction,
  ctx: TransitionContext
): Promise<AdmissionLead> {
  const saved = await mutateAdmissionLead(id, async (lead) => {
    const updated = applyAdminAction(lead, action, ctx);
    return writeAdmissionLead(updated);
  });

  if (!saved) {
    throw new Error("LEAD_NOT_FOUND");
  }

  return saved;
}

export { TransitionError };

export async function updateAdmissionLead(
  id: string,
  patch: Partial<AdmissionLead>
): Promise<AdmissionLead | null> {
  return withLeadLock(id, async () => {
    const existing = await getAdmissionLead(id);
    if (!existing) return null;
    return writeAdmissionLead({ ...existing, ...patch });
  });
}

export async function attachPaymentProof(
  input: SubmitPaymentProofInput
): Promise<AdmissionLead | null> {
  return withLeadLock(input.requestId, async () => {
    const existing = await getAdmissionLead(input.requestId);
    if (!existing) return null;

    const lead = migrateLeadDefaults(existing);

    if (!canUploadPaymentProof(lead)) {
      throw new Error("PAYMENT_PROOF_NOT_ALLOWED");
    }

    if (lead.paymentStatus === "Verified") {
      throw new Error("PAYMENT_ALREADY_VERIFIED");
    }

    const proof: PaymentProof = {
      referenceNumber: input.referenceNumber.trim(),
      notes: input.notes?.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    if (input.screenshotDataUrl) {
      const saved = await saveScreenshot(input.requestId, input.screenshotDataUrl);
      proof.screenshotPath = saved.relativePath;
      proof.screenshotFileName = saved.fileName;
    }

    const updated = await writeAdmissionLead({
      ...lead,
      paymentProof: proof,
      paymentStatus: "Submitted" satisfies LeadPaymentStatus,
      leadStatus: "Payment Pending" satisfies LeadStatus,
      auditEvents: [
        ...(lead.auditEvents ?? []),
        {
          id: `aud_${randomUUID().replace(/-/g, "").slice(0, 12)}`,
          at: new Date().toISOString(),
          actor: "applicant",
          action: "submit-payment-proof",
          previous: {
            paymentStatus: lead.paymentStatus,
            leadStatus: lead.leadStatus,
          },
          next: {
            paymentStatus: "Submitted",
            leadStatus: "Payment Pending",
          },
        },
      ],
    });

    return updated;
  });
}

async function saveScreenshot(
  requestId: string,
  dataUrl: string
): Promise<{ relativePath: string; fileName: string }> {
  const image = parseProofDataUrl(dataUrl);
  const fileName = buildProofStorageName(requestId, image.ext);
  const dir = path.join(PROOFS_DIR, requestId);
  await ensureDir(dir);
  const absolute = path.join(dir, fileName);
  await fs.writeFile(absolute, image.buffer);
  const relativePath = assertSafeProofRelativePath(
    path.join("proofs", requestId, fileName)
  );
  return { relativePath, fileName };
}

export async function readPaymentProofFile(relativePath: string): Promise<Buffer> {
  const safe = assertSafeProofRelativePath(relativePath);
  const absolute = path.join(DATA_DIR, safe);
  return fs.readFile(absolute);
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

export function toAdminListLead(lead: AdmissionLead) {
  const migrated = migrateLeadDefaults(lead);
  const safe = { ...migrated };
  delete safe.meta;
  if (safe.applicationKind === "womens-fee-support") {
    return {
      ...safe,
      message: undefined,
      feeSupportReview: migrated.feeSupportReview,
      applicationKind: migrated.applicationKind,
    };
  }
  return safe;
}
