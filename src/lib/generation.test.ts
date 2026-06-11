import { describe, it, expect } from "vitest";
import {
  applyGenerationResult,
  parseGenerationResult,
  type GenerationResult,
} from "./generation";
import { defaultPipelineState } from "./pipeline";

const scores = {
  frequency: 4,
  intensity: 3,
  willingnessToPay: 3,
  reachability: 4,
  mvpFeasibility: 5,
  differentiation: 3,
};

const rationale = {
  frequency: "Happens weekly",
  intensity: "Costs hours per occurrence",
  willingnessToPay: "Existing tool budgets",
  reachability: "Active communities",
  mvpFeasibility: "Thin slice is quick to build",
  differentiation: "Few direct competitors",
};

const validResult: GenerationResult = {
  segments: [
    {
      name: "Freelance designers",
      role: "Solo freelancers",
      context: "Manage 5-10 clients",
      urgency: "High",
      abilityToPay: "Medium",
      accessibility: "High",
      currentWorkaround: "Spreadsheets",
      primary: false,
    },
    {
      name: "Small agencies",
      role: "2-10 person studios",
      context: "Recurring client invoicing",
      urgency: "High",
      abilityToPay: "High",
      accessibility: "Medium",
      currentWorkaround: "Manual reminders",
      primary: true,
    },
  ],
  pains: [
    {
      statement: "For small agencies, unpaid invoices are a problem because…",
      scores,
      rationale,
      recommended: true,
    },
  ],
  dmTemplate: "Hey {{name}} — quick question about how you chase invoices…",
  interviewQuestions: ["Walk me through the last invoice that went unpaid."],
  fakePainRisks: ["Accounting tools may already solve this"],
  requiredEvidence: ["Talk to 5 agency owners about their last overdue invoice"],
  mvp: {
    promise: "See every overdue invoice in one place.",
    firstVisibleGoal: "A single-page overdue-invoice dashboard.",
    retentionSignal: "User checks the dashboard weekly.",
    nonGoals: ["No payment processing", "No accounting integration"],
  },
};

describe("parseGenerationResult", () => {
  it("accepts a valid result", () => {
    expect(parseGenerationResult(JSON.parse(JSON.stringify(validResult)))).toBeTruthy();
  });

  it("rejects missing segments", () => {
    expect(() => parseGenerationResult({ ...validResult, segments: [] })).toThrow(
      /segments/,
    );
  });

  it("rejects out-of-range scores", () => {
    const broken = JSON.parse(JSON.stringify(validResult));
    broken.pains[0].scores.frequency = 7;
    expect(() => parseGenerationResult(broken)).toThrow(/pains/);
  });

  it("rejects empty interview questions", () => {
    expect(() =>
      parseGenerationResult({ ...validResult, interviewQuestions: [] }),
    ).toThrow(/interviewQuestions/);
  });
});

describe("applyGenerationResult", () => {
  it("replaces generated content and keeps intake fields", () => {
    const state = defaultPipelineState();
    state.idea = "Track unpaid invoices automatically.";
    state.productName = "Invoice Radar";

    const next = applyGenerationResult(state, validResult);

    expect(next.idea).toBe("Track unpaid invoices automatically.");
    expect(next.productName).toBe("Invoice Radar");
    expect(next.segments).toHaveLength(2);
    expect(next.selectedSegment).toBe(1); // the primary-flagged segment
    expect(next.selectedPain).toBe(0);
    expect(next.dmTemplate).toContain("{{name}}");
    expect(next.mvp.promise).toBe("See every overdue invoice in one place.");
  });
});
