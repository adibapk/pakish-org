export type {
  AdmissionRequestPayload,
  AdmissionRequestStatus,
  PaymentStatus,
  TrainingPreference,
  TrainingPreferenceOption,
} from "./types";

export type {
  AdmissionLead,
  CreateAdmissionLeadInput,
  LeadPaymentStatus,
  LeadStatus,
  PaymentProof,
  PublicAdmissionLeadResponse,
  SubmitPaymentProofInput,
} from "./lead";

export {
  ADMISSION_NEXT_STEPS,
  ADMISSION_PAGE_COPY,
  TRAINING_PREFERENCE_OPTIONS,
  getAdmissionPath,
} from "./constants";

export {
  buildAdmissionMailto,
  buildAdmissionWhatsAppMessage,
  buildAdmissionWhatsAppUrl,
  buildCourseInfoWhatsAppMessage,
  buildCourseInfoWhatsAppUrl,
} from "./whatsapp";
