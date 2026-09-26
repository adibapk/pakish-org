export const CONTACT_SUBJECTS = {
  enrollment: "Course Enrollment / Fee Information",
  womensEmpowermentFeeSupport: "Women's Empowerment / Fee Support",
  campusVisit: "Campus Visit - Gulshan-e-Iqbal, Karachi",
  teamTraining: "Team / Office Training",
  womensEmpowermentGathering: "Women's Empowerment Gathering",
  lodhranFuturePlan: "Lodhran Future Campus — Register Interest",
} as const;

/** Validated contact-form subject presets from query parameters. */
export const CONTACT_SUBJECT_QUERY_MAP: Record<string, string> = {
  gathering: CONTACT_SUBJECTS.womensEmpowermentGathering,
  "womens-empowerment-gathering": CONTACT_SUBJECTS.womensEmpowermentGathering,
  enrollment: CONTACT_SUBJECTS.enrollment,
  "fee-support": CONTACT_SUBJECTS.womensEmpowermentFeeSupport,
  campus: CONTACT_SUBJECTS.campusVisit,
  team: CONTACT_SUBJECTS.teamTraining,
  "lodhran-future-plan": CONTACT_SUBJECTS.lodhranFuturePlan,
};

export function resolveContactSubjectFromQuery(
  subjectKey: string | undefined
): string | undefined {
  if (!subjectKey) return undefined;
  return CONTACT_SUBJECT_QUERY_MAP[subjectKey];
}

export const GATHERING_INTEREST_CONTACT_PATH =
  "/?subject=gathering#contact";
