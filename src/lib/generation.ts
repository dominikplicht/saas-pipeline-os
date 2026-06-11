import type {
  PainScores,
  PainStatement,
  PipelineState,
  ScoreDimension,
  SegmentCandidate,
} from "./pipeline";
import { SCORE_WEIGHTS } from "./pipeline";

/**
 * Result shape produced by the AI generation endpoint (POST /api/generate).
 * The route asks Claude for exactly this structure via structured outputs;
 * `parseGenerationResult` re-validates it before it touches the UI state.
 */
export interface GenerationResult {
  segments: SegmentCandidate[];
  pains: PainStatement[];
  dmTemplate: string;
  interviewQuestions: string[];
  fakePainRisks: string[];
  requiredEvidence: string[];
  mvp: {
    promise: string;
    firstVisibleGoal: string;
    retentionSignal: string;
    nonGoals: string[];
  };
}

const DIMENSIONS = Object.keys(SCORE_WEIGHTS) as ScoreDimension[];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString);
}

function isSegment(value: unknown): value is SegmentCandidate {
  if (typeof value !== "object" || value === null) return false;
  const segment = value as Record<string, unknown>;
  return (
    ["name", "role", "context", "urgency", "abilityToPay", "accessibility", "currentWorkaround"].every(
      (key) => isNonEmptyString(segment[key]),
    ) && typeof segment.primary === "boolean"
  );
}

function isScores(value: unknown): value is PainScores {
  if (typeof value !== "object" || value === null) return false;
  const scores = value as Record<string, unknown>;
  return DIMENSIONS.every(
    (dimension) =>
      typeof scores[dimension] === "number" &&
      Number.isInteger(scores[dimension]) &&
      (scores[dimension] as number) >= 1 &&
      (scores[dimension] as number) <= 5,
  );
}

function isPain(value: unknown): value is PainStatement {
  if (typeof value !== "object" || value === null) return false;
  const pain = value as Record<string, unknown>;
  if (!isNonEmptyString(pain.statement) || typeof pain.recommended !== "boolean") return false;
  if (!isScores(pain.scores)) return false;
  const rationale = pain.rationale as Record<string, unknown> | null;
  return (
    typeof rationale === "object" &&
    rationale !== null &&
    DIMENSIONS.every((dimension) => isNonEmptyString(rationale[dimension]))
  );
}

/**
 * Validate an untrusted JSON value as a GenerationResult.
 * Throws with a descriptive message on the first structural problem.
 */
export function parseGenerationResult(value: unknown): GenerationResult {
  if (typeof value !== "object" || value === null) {
    throw new Error("Generation result must be an object");
  }
  const result = value as Record<string, unknown>;

  if (!Array.isArray(result.segments) || result.segments.length === 0 || !result.segments.every(isSegment)) {
    throw new Error("Generation result has invalid segments");
  }
  if (!Array.isArray(result.pains) || result.pains.length === 0 || !result.pains.every(isPain)) {
    throw new Error("Generation result has invalid pains");
  }
  if (!isNonEmptyString(result.dmTemplate)) {
    throw new Error("Generation result has an invalid dmTemplate");
  }
  for (const key of ["interviewQuestions", "fakePainRisks", "requiredEvidence"] as const) {
    if (!isStringArray(result[key])) {
      throw new Error(`Generation result has invalid ${key}`);
    }
  }
  const mvp = result.mvp as Record<string, unknown> | null;
  if (
    typeof mvp !== "object" ||
    mvp === null ||
    !isNonEmptyString(mvp.promise) ||
    !isNonEmptyString(mvp.firstVisibleGoal) ||
    !isNonEmptyString(mvp.retentionSignal) ||
    !isStringArray(mvp.nonGoals)
  ) {
    throw new Error("Generation result has an invalid mvp slice");
  }

  return result as unknown as GenerationResult;
}

/**
 * Merge a generation result into the current pipeline state. Intake fields
 * stay untouched; generated content replaces the sample/previous content and
 * selections move to the flagged primary segment and recommended pain.
 */
export function applyGenerationResult(
  state: PipelineState,
  result: GenerationResult,
): PipelineState {
  return {
    ...state,
    segments: result.segments,
    selectedSegment: Math.max(
      result.segments.findIndex((segment) => segment.primary),
      0,
    ),
    pains: result.pains,
    selectedPain: Math.max(
      result.pains.findIndex((pain) => pain.recommended),
      0,
    ),
    dmTemplate: result.dmTemplate,
    interviewQuestions: result.interviewQuestions,
    fakePainRisks: result.fakePainRisks,
    requiredEvidence: result.requiredEvidence,
    mvp: { ...result.mvp },
  };
}
