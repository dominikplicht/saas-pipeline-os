import { describe, it, expect } from "vitest";
import { buildValidationPackMarkdown } from "./validation-pack";
import { scoreDecision, weightedPainScore } from "./pipeline";

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
});
