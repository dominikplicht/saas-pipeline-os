/**
 * Sample pipeline data for the SaaS Pipeline OS v0 guided workflow.
 *
 * v0 is static: the data demonstrates the intended workflow using
 * SaaS Pipeline OS itself as the worked example (dogfooding the pipeline).
 * Scoring follows docs/product/pain-discovery-framework.md.
 */

export type ScoreDimension =
  | "frequency"
  | "intensity"
  | "willingnessToPay"
  | "reachability"
  | "mvpFeasibility"
  | "differentiation";

/** Weights from the pain discovery framework. Must sum to 1. */
export const SCORE_WEIGHTS: Record<ScoreDimension, number> = {
  frequency: 0.2,
  intensity: 0.25,
  willingnessToPay: 0.2,
  reachability: 0.15,
  mvpFeasibility: 0.1,
  differentiation: 0.1,
};

export const SCORE_LABELS: Record<ScoreDimension, string> = {
  frequency: "Frequency",
  intensity: "Intensity",
  willingnessToPay: "Willingness to pay",
  reachability: "Reachability",
  mvpFeasibility: "MVP feasibility",
  differentiation: "Differentiation",
};

export type PainScores = Record<ScoreDimension, number>;

export interface SegmentCandidate {
  name: string;
  role: string;
  context: string;
  urgency: string;
  abilityToPay: string;
  accessibility: string;
  currentWorkaround: string;
  primary: boolean;
}

export interface PainStatement {
  statement: string;
  scores: PainScores;
  rationale: Record<ScoreDimension, string>;
  recommended: boolean;
}

/** Weighted pain score on a 1–5 scale, rounded to one decimal. */
export function weightedPainScore(scores: PainScores): number {
  const total = (Object.keys(SCORE_WEIGHTS) as ScoreDimension[]).reduce(
    (sum, dimension) => sum + scores[dimension] * SCORE_WEIGHTS[dimension],
    0,
  );
  return Math.round(total * 10) / 10;
}

/** Decision rule from the pain discovery framework. */
export function scoreDecision(score: number): "Validate with users" | "Sharpen" | "Park" {
  if (score >= 4.0) return "Validate with users";
  if (score >= 3.0) return "Sharpen";
  return "Park";
}

export const SEGMENT_CANDIDATES: SegmentCandidate[] = [
  {
    name: "AI-native solo builder",
    role: "Solo founder building SaaS/agentic experiments",
    context: "Notion for ideas, ChatGPT/Codex for execution, GitHub + Vercel for delivery",
    urgency: "High — every idea triggers the same manual handoff work",
    abilityToPay: "Medium — strong internal value, external willingness untested",
    accessibility: "High — own network, builder communities, X/IndieHackers",
    currentWorkaround: "Ad-hoc prompts, manual Notion pages, hand-written GitHub issues",
    primary: true,
  },
  {
    name: "Small AI-native product team",
    role: "2–5 person team shipping AI-assisted products",
    context: "Shared backlog, mixed tooling, inconsistent validation discipline",
    urgency: "Medium — pain appears at planning handoffs, not daily",
    abilityToPay: "High — existing tool budgets",
    accessibility: "Medium — reachable via communities, slower trust building",
    currentWorkaround: "Notion templates plus tribal knowledge",
    primary: false,
  },
  {
    name: "Indie hacker with idea backlog",
    role: "Side-project builder with more ideas than time",
    context: "Large idea list, low validation rigor, builds on gut feeling",
    urgency: "Medium — pain is wasted builds, felt only after the fact",
    abilityToPay: "Low — price sensitive",
    accessibility: "High — very active in public communities",
    currentWorkaround: "Builds the most exciting idea and hopes",
    primary: false,
  },
];

export const PAIN_STATEMENTS: PainStatement[] = [
  {
    statement:
      "For AI-native solo builders who frequently convert ideas into small SaaS experiments, the transition from raw idea to validated pain, scoped MVP, and implementation-ready GitHub task plan is a recurring problem because the process is fragmented across tools and depends on ad-hoc prompting. Today they solve it with manual notes, custom prompts, Notion pages, and GitHub issues, but that is inconsistent and makes it easy to build before the pain is real.",
    scores: {
      frequency: 5,
      intensity: 4,
      willingnessToPay: 3,
      reachability: 4,
      mvpFeasibility: 5,
      differentiation: 4,
    },
    rationale: {
      frequency: "Ideas are captured and converted into workflows repeatedly",
      intensity: "Poor scoping creates wasted build effort and fragmented execution",
      willingnessToPay: "Strong internal value; external willingness untested",
      reachability: "AI-native builders are reachable via communities and direct network",
      mvpFeasibility: "A static guided workflow is fast to build",
      differentiation: "Validation-first handoff into a governed Development Factory",
    },
    recommended: true,
  },
  {
    statement:
      "For indie hackers with large idea backlogs, deciding which idea to build next is a problem because gut-feel prioritization wastes weekends on unvalidated builds. Today they solve it with voting threads and intuition, but that gives no evidence about real pain.",
    scores: {
      frequency: 3,
      intensity: 3,
      willingnessToPay: 2,
      reachability: 5,
      mvpFeasibility: 4,
      differentiation: 2,
    },
    rationale: {
      frequency: "Prioritization happens per project, not per day",
      intensity: "Wasted weekends hurt, but are accepted as part of the hobby",
      willingnessToPay: "Highly price-sensitive segment",
      reachability: "Extremely active and public communities",
      mvpFeasibility: "Simple scorecard flow is easy to ship",
      differentiation: "Many prioritization frameworks already exist",
    },
    recommended: false,
  },
];

export const FAKE_PAIN_RISKS = [
  "The product may solve one builder's workflow but not a broader market",
  "The pain may be addressed by better prompting rather than a product",
  "Builders may prefer flexible ChatGPT conversations over a structured UI",
  "Direct integrations may be less valuable than simple Markdown outputs",
] as const;

export const WEAK_SIGNALS = [
  "Likes and friendly feedback",
  "“Sounds interesting” / “I might use this”",
  "Generic feature wishes",
  "Broad target groups",
] as const;

export const REQUIRED_EVIDENCE = [
  "Process three real Ideenbox entries through the tool",
  "Compare output quality against manual ChatGPT prompting",
  "Use one output to instantiate a real Development Factory product repo",
  "Track whether the generated task graph reduces ambiguity for Codex",
  "Ask 3–5 AI-native builders whether they share the idea-to-MVP handoff pain",
] as const;

export const DM_TEMPLATE = `Hey {{name}} — quick question, no pitch.

You build AI-assisted side products, right? When you take a raw idea to
"this is worth building", how do you decide who it's for and whether the
pain is real — before writing code?

I'm researching how AI-native builders handle the idea → validated MVP
handoff. 15 minutes this week for 5 questions? Happy to share my notes.`;

export const INTERVIEW_QUESTIONS = [
  "Walk me through the last idea you took from note to build. What happened between?",
  "When did you last build something nobody used? What did validation look like?",
  "How do you decide on the target user and core pain today? Show me, if possible.",
  "What have you already tried to make that step more consistent (templates, prompts, tools)?",
  "If that step disappeared, how much time per idea would you win back?",
] as const;

export const EVIDENCE_RECORD_TEMPLATE = `## Evidence record — {{date}}
- Person/segment:
- Channel:
- Concrete recent incident:
- Current workaround:
- Time/money already spent:
- Strong signals observed:
- Weak signals observed:
- Verdict: real pain / unclear / fake pain`;

export const MVP_SLICE = {
  promise:
    "Paste a raw SaaS idea and leave with a structured, copyable Pre-Factory Validation Pack — target segment, scored pain, evidence plan, MVP scope, and Development Factory handoff.",
  firstVisibleGoal:
    "A polished single-page workflow showing the full pipeline output for one idea, deployed as a Vercel preview.",
  retentionSignal:
    "The same user returns to process additional ideas (≥3 real idea-processing runs).",
  nonGoals: [
    "Multi-user accounts and authentication",
    "Billing/subscriptions",
    "Automated outbound sending",
    "Direct Notion/GitHub write integration",
    "Fully autonomous product creation without human gates",
  ],
} as const;

export interface MvpSliceState {
  promise: string;
  firstVisibleGoal: string;
  retentionSignal: string;
  nonGoals: string[];
}

/**
 * Editable state for one pipeline run. Lives client-side only (Phase 2 of
 * the roadmap): the user adapts the sample data to their own idea and the
 * validation pack is regenerated from this state.
 */
export interface PipelineState {
  productName: string;
  idea: string;
  source: string;
  context: string;
  segments: SegmentCandidate[];
  selectedSegment: number;
  pains: PainStatement[];
  selectedPain: number;
  mvp: MvpSliceState;
}

/** Fresh, mutable state seeded with the worked example (SaaS Pipeline OS itself). */
export function defaultPipelineState(): PipelineState {
  return {
    productName: "SaaS Pipeline OS",
    idea: "Structure the fragmented path from raw SaaS idea to validated pain, scoped MVP, and Development Factory execution into one repeatable workflow.",
    source: "Rapid SaaS Growth Playbook (Notion Ideenbox)",
    context: "Recurring friction across Notion, ChatGPT, GitHub, Vercel, and Codex",
    segments: SEGMENT_CANDIDATES.map((segment) => ({ ...segment })),
    selectedSegment: Math.max(
      SEGMENT_CANDIDATES.findIndex((segment) => segment.primary),
      0,
    ),
    pains: PAIN_STATEMENTS.map((pain) => ({
      ...pain,
      scores: { ...pain.scores },
      rationale: { ...pain.rationale },
    })),
    selectedPain: Math.max(
      PAIN_STATEMENTS.findIndex((pain) => pain.recommended),
      0,
    ),
    mvp: {
      promise: MVP_SLICE.promise,
      firstVisibleGoal: MVP_SLICE.firstVisibleGoal,
      retentionSignal: MVP_SLICE.retentionSignal,
      nonGoals: [...MVP_SLICE.nonGoals],
    },
  };
}

