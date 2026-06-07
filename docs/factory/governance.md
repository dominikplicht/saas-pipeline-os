# Factory Governance (this repo)

How autonomy and merging actually work in `taskpilot-factory-prototype`, given
that this is a **private repo without branch protection** (GitHub's native
required-checks / auto-merge need a protected branch or a paid plan).

## The gate

There is no enforced branch-protection gate. The gate is realized by:

1. **Factory Validation** (`factory-validation.yml`) — typecheck, lint, test, build.
2. **Factory PR Audit** (`factory-pr-audit.yml`) — branch naming, run-record
   resolution, **per-task scope enforcement** (`allowed_files` / `blocked_files`),
   global blocked-file backstop, run-record/diff match.
3. **Factory Auto-Merge** (`factory-auto-merge.yml`) — squash-merges only when
   both above are green **and** the task is `A3 ∧ human_gate_required=false ∧
   risk!=high`.

## Autonomy levels (from the autonomy policy)

| Level | Meaning | Merge |
|---|---|---|
| A3 | AI implements, CI validates | auto-merge |
| A2 | AI implements | human merges |
| A1 | AI proposes | human decides |

## Important convention: infra PRs are human-gated by design

The **audit checks scope correctness, not merge authority.** A well-formed task
— including an infra task that legitimately lists `.github/**` or `package.json`
in its `allowed_files` — passes the audit **green**, because every changed file
is authorized by the contract. The audit only goes red on a genuine **scope
violation** (a file outside `allowed_files`, a `blocked_files` match, a missing
run record, or a hard-denied secret/`.env`).

**Human-gating is enforced by the auto-merge engine, not by a red check.** Only
`autonomy: A3` tasks are auto-merged; A1/A2 tasks get a green audit but are left
for a human (label `factory:human-gate` + a triage comment). So infra PRs now
look like: **audit green + `factory:human-gate` → a human squash-merges.**

> Earlier infra PRs (#4–#15) failed the audit *by design* under the old model
> where the global blocked-file rule fired regardless of the contract. That
> created chronic-red noise and alarm fatigue, so the audit now defers to the
> contract (see `docs/factory-runtime/factory-pr-audit-v0.1.md`).

For A3 product PRs (e.g. `ui.*`, docs, tests touching only allowed files), the
audit is green and Auto-Merge handles the merge with no human action.

## Labels

- `autonomy:A1|A2|A3`, `risk:low|medium|high` — classification.
- `factory:auto-merge` — merged automatically by the engine.
- `factory:human-gate` — needs a human merge (A1/A2/high risk).
- `factory:blocked` — a required check failed.
- `factory:escalated` — needs a human decision (scope/architecture/missing context).

## Merge settings

Squash merge + delete-branch-on-merge are enabled. One task = one branch = one
squash commit on `main`.
