import {
  DM_TEMPLATE,
  EVIDENCE_RECORD_TEMPLATE,
  FAKE_PAIN_RISKS,
  INTERVIEW_QUESTIONS,
  REQUIRED_EVIDENCE,
  SCORE_LABELS,
  SCORE_WEIGHTS,
  defaultPipelineState,
  scoreDecision,
  weightedPainScore,
  type PipelineState,
  type ScoreDimension,
} from "./pipeline";

function decisionLine(score: number): string {
  const decision = scoreDecision(score);
  if (decision === "Validate with users") {
    return `Continue — validate with users (score ${score.toFixed(1)} ≥ 4.0)`;
  }
  if (decision === "Sharpen") {
    return `Sharpen — the pain is not crisp enough yet (score ${score.toFixed(1)} in 3.0–3.9)`;
  }
  return `Park — evidence does not justify building now (score ${score.toFixed(1)} < 3.0)`;
}

/**
 * Build the Pre-Factory Validation Pack as Markdown from the current
 * pipeline state, following docs/product/pre-factory-validation-pack-template.md.
 * Without arguments it renders the worked example. The output is meant to be
 * pasted into `.factory/product/product-intent.md` or handed to an agent that
 * instantiates a Development Factory product repo.
 */
export function buildValidationPackMarkdown(
  state: PipelineState = defaultPipelineState(),
): string {
  const segment = state.segments[state.selectedSegment] ?? state.segments[0];
  const pain = state.pains[state.selectedPain] ?? state.pains[0];
  if (!segment || !pain) {
    throw new Error("Pipeline state must contain at least one segment and one pain");
  }

  const score = weightedPainScore(pain.scores);
  const dimensions = Object.keys(SCORE_WEIGHTS) as ScoreDimension[];
  const scoreRows = dimensions
    .map(
      (dimension) =>
        `| ${SCORE_LABELS[dimension]} | ${pain.scores[dimension]} | ${pain.rationale[dimension]} |`,
    )
    .join("\n");

  const sourceLines = [
    state.idea.trim(),
    state.source.trim() ? `Source: ${state.source.trim()}` : "",
    state.context.trim() ? `Context: ${state.context.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return `# Pre-Factory Validation Pack

## Product Name

${state.productName.trim() || "(unnamed product)"}

## Source Idea

${sourceLines || "(no idea captured yet)"}

## Target Segment

**${segment.name}** — ${segment.role}.
Context: ${segment.context}.
Current workaround: ${segment.currentWorkaround}.

## Primary Pain Statement

${pain.statement}

## Pain Score

Weighted score: **${score.toFixed(1)} / 5** → ${scoreDecision(score)}

| Criterion | Score | Rationale |
|---|---:|---|
${scoreRows}

## Fake-Pain Risks

${FAKE_PAIN_RISKS.map((risk) => `- ${risk}`).join("\n")}

## Evidence Required

${REQUIRED_EVIDENCE.map((item, index) => `${index + 1}. ${item}`).join("\n")}

## Interview Plan

### DM template

\`\`\`text
${DM_TEMPLATE}
\`\`\`

### Interview questions

${INTERVIEW_QUESTIONS.map((question, index) => `${index + 1}. ${question}`).join("\n")}

### Evidence record template

\`\`\`markdown
${EVIDENCE_RECORD_TEMPLATE}
\`\`\`

## MVP Promise

${state.mvp.promise}

## First Visible Goal

${state.mvp.firstVisibleGoal}

## Non-Goals

${state.mvp.nonGoals.map((item) => `- ${item}`).join("\n")}

## Retention Signal

${state.mvp.retentionSignal}

## Development Factory Mapping

- product-intent.md: problem, target users, core capabilities, non-goals, first visible goal from this pack
- prd.md: MVP features derived from the MVP promise and first visible goal
- roadmap.md: Phase 1 limited to the MVP slice; later phases gated on evidence
- feature-map.md: one slice per pipeline stage
- task-graph.yaml: small, dependency-ordered tasks (1 task = 1 branch = 1 PR)
- ready tasks: first visible goal as the first ready task

## Decision

${decisionLine(score)}

## Next Action

1. Create a product repo from \`dominikplicht/development-factory-blueprint\`.
2. Run \`scripts/factory/new-product.sh "<Product Name>"\`.
3. Paste this pack into \`.factory/product/\` and ask the planner to generate PRD + task graph.
`;
}
