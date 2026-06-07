# Factory Failure & Escalation Routing

How the factory reacts when a PR is not auto-merge-eligible. Implemented in
`factory-auto-merge.yml` (triage step), which labels the PR and posts one
explanatory comment.

## Routing table

| Situation | Label | Meaning / action |
|---|---|---|
| Eligible (A3 · !human_gate · risk≠high · both green) | `factory:auto-merge` | Squash-merged automatically. |
| **Validation failed** (typecheck/lint/test/build red) | `factory:blocked` | Debug task: fix in scope and push. Max 2 local fix attempts, then re-scope. |
| **Audit failed on an A3 task** | `factory:escalated` | Real problem — out-of-scope / blocked file / run-record mismatch. Human decision; do **not** widen scope autonomously. |
| Audit failed on A1/A2 task | `factory:human-gate` | Expected: infra trips the blocked-file backstop by design. Human reviews + merges. |
| Both green but not A3 / risk=high | `factory:human-gate` | Human reviews + merges. |

## Failure progression (worker convention)

From the Planning/Worker specs:

1. **First failure** → task stays `ready`; document the error; create a debug task.
2. **Second failure** → task `blocked`; planner re-scopes (smaller task).
3. **Third failure** → task `escalated`; human gate required.

## Missing context

If a worker lacks information to proceed, it records the question in
`.factory/product/open-questions.md` and marks the task `blocked` rather than
guessing.

## Why this lives in the auto-merge workflow

Triage runs on the same `workflow_run` completion signal that drives
auto-merge, and it needs the same eligibility data (autonomy/risk + check
conclusions). Folding it in avoids a redundant fourth workflow — the directive
is to harden process quality, not add moving parts. The triage comment is
deduplicated via a hidden marker so it posts at most once per PR.
