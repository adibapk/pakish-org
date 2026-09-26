import { trustTools } from "@/lib/trust-tools";

/** Visible section heading — curriculum tools, not partners or endorsements. */
export const CURRICULUM_TICKER_HEADING =
  "Tools and platforms our students learn";

/**
 * Calm scroll duration scaled to tool count (~30s baseline for nine items).
 * Keeps readable speed without competing with hero CTAs.
 */
export const CURRICULUM_TICKER_DURATION_SEC = Math.round(
  30 * (trustTools.length / 9)
);

export function getCurriculumTickerPauseLabel(paused: boolean): string {
  return paused ? "Resume tool scroll" : "Pause tool scroll";
}
