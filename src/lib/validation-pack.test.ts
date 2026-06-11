import { describe, it, expect } from "vitest";
import { buildValidationPackMarkdown } from "./validation-pack";
import { defaultPipelineState, scoreDecision, weightedPainScore } from "./pipeline";

describe("weightedPainScore", () => {
  it("applies the framework weights", () => {
    expect(
      weightedPainScore({
        frequency: 5,
        intensity: 4,
        willingnessToPay: 3,
        reachability: 4,
        mvpFeasibility: 5,
        differentiation: 4,
      }),
    ).toBe(4.1);
  });

  it("returns 5 for a perfect score", () => {
    expect(
      weightedPainScore({
        frequency: 5,
        intensity: 5,
        willingnessToPay: 5,
        reachability: 5,
        mvpFeasibility: 5,
        differentiation: 5,
      }),
    ).toBe(5);
  });
});

describe("scoreDecision", () => {
  it("maps scores to the framework decision rule", () => {
    expect(scoreDecision(4.0)).toBe("Validate with users");
    expect(scoreDecision(3.5)).toBe("Sharpen");
    expect(scoreDecision(2.9)).toBe("Park");
  });
});

describe("buildValidationPackMarkdown", () => {
  const markdown = buildValidationPackMarkdown();

  it("contains all template sections", () => {
    for (const section of [
      "## Product Name",
      "## Source Idea",
      "## Target Segment",
      "## Primary Pain Statement",
      "## Pain Score",
      "## Fake-Pain Risks",
      "## Evidence Required",
      "## Interview Plan",
      "## MVP Promise",
      "## First Visible Goal",
      "## Non-Goals",
      "## Retention Signal",
      "## Development Factory Mapping",
      "## Decision",
    ]) {
      expect(markdown).toContain(section);
    }
  });

  it("includes the weighted score and decision", () => {
    expect(markdown).toContain("4.1 / 5");
    expect(markdown).toContain("Validate with users");
  });

  it("maps to Development Factory artifacts", () => {
    expect(markdown).toContain("product-intent.md");
    expect(markdown).toContain("task-graph.yaml");
  });

  it("reflects user input from the pipeline state", () => {
    const state = defaultPipelineState();
    state.productName = "Invoice Radar";
    state.idea = "Track unpaid invoices across clients automatically.";
    state.source = "Customer call";
    state.context = "Freelancer admin friction";
    state.selectedSegment = 1;
    state.mvp.promise = "See every overdue invoice in one place.";

    const custom = buildValidationPackMarkdown(state);
    expect(custom).toContain("Invoice Radar");
    expect(custom).toContain("Track unpaid invoices across clients automatically.");
    expect(custom).toContain("Source: Customer call");
    expect(custom).toContain("Context: Freelancer admin friction");
    expect(custom).toContain(`**${state.segments[1].name}**`);
    expect(custom).toContain("See every overdue invoice in one place.");
  });

  it("recalculates score and decision from edited scores", () => {
    const state = defaultPipelineState();
    state.pains[state.selectedPain].scores = {
      frequency: 2,
      intensity: 2,
      willingnessToPay: 2,
      reachability: 2,
      mvpFeasibility: 2,
      differentiation: 2,
    };

    const custom = buildValidationPackMarkdown(state);
    expect(custom).toContain("2.0 / 5");
    expect(custom).toContain("Park — evidence does not justify building now");
  });
});
