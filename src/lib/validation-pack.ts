import {
  DM_TEMPLATE,
  EVIDENCE_RECORD_TEMPLATE,
  FAKE_PAIN_RISKS,
  INTERVIEW_QUESTIONS,
  MVP_SLICE,
  PAIN_STATEMENTS,
  REQUIRED_EVIDENCE,
  SCORE_LABELS,
  SCORE_WEIGHTS,
  SEGMENT_CANDIDATES,
  scoreDecision,
  weightedPainScore,
  type ScoreDimension,
} from "./pipeline";

/**
 * Build the Pre-Factory Validation Pack as Markdown, following
 * docs/product/pre-factory-validation-pack-template.md. The output is meant
 * to be pasted into `.factory/product/product-intent.md` or handed to an
 * agent that instantiates a Development Factory product repo.
 */
export function buildValidationPackMarkdown(): string {
  const segment = SEGMENT_CANDIDATES.find((candidate) => candidate.primary);
  const pain = PAIN_STATEMENTS.find((statement) => statement.recommended);
  if (!segment || !pain) {
    throw new Error("Sample data must define a primary segment and a recommended pain");
  }

  const score = weightedPainScore(pain.scores);
  const dimensions = Object.keys(SCORE_WEIGHTS) as ScoreDimension[];
  const scoreRows = dimensions
    .map(
      (dimension) =>
        `| ${SCORE_LABELS[dimension]} | ${pain.scores[dimension]} | ${pain.rationale[dimension]} |`,
    )
    .join("\n");

  return `# Pre-Factory Validation Pack

## Product Name

SaaS Pipeline OS

## Source Idea

Structure the fragmented path from raw SaaS idea to validated pain, scoped MVP, and Development Factory execution into one repeatable workflow.

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

${MVP_SLICE.promise}

## First Visible Goal

${MVP_SLICE.firstVisibleGoal}

## Non-Goals

${MVP_SLICE.nonGoals.map((item) => `- ${item}`).join("\n")}

## Retention Signal

${MVP_SLICE.retentionSignal}

## Development Factory Mapping

- product-intent.md: problem, target users, core capabilities, non-goals, first visible goal from this pack
- prd.md: MVP features derived from the MVP promise and first visible goal
- roadmap.md: Phase 1 limited to the MVP slice; later phases gated on evidence
- feature-map.md: one slice per pipeline stage
- task-graph.yaml: small, dependency-ordered tasks (1 task = 1 branch = 1 PR)
- ready tasks: first visible goal as the first ready task

## Decision

Continue — validate with users (score ${score.toFixed(1)} ≥ 4.0)

## Next Action

1. Create a product repo from \`dominikplicht/development-factory-blueprint\`.
2. Run \`scripts/factory/new-product.sh "<Product Name>"\`.
3. Paste this pack into \`.factory/product/\` and ask the planner to generate PRD + task graph.
`;
}
