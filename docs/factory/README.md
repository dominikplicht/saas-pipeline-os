# Development Factory — In-Repo Docs

This is the factory's own "operating system" documentation, kept in-repo so
workers and reviewers have the contracts locally.

```
Human → Claude (Planner/Governance) → Factory Artifacts → Worker → Validation → Auto-Merge → Product
```

## Index

- [`governance.md`](./governance.md) — how autonomy & merging work **in this repo**.
- Runtime workflow docs: [`../factory-runtime/`](../factory-runtime/)
  (`factory-pr-audit-v0.1.md`, `factory-auto-merge-v0.1.md`).
- Specs (`specs/`):
  - [`claude-codex-operating-model-v0.1.md`](./specs/claude-codex-operating-model-v0.1.md) — Claude = strategy, Codex = execution; artifact-based communication.
  - [`planning-engine-specification-v0.1.md`](./specs/planning-engine-specification-v0.1.md) — product/issues/signals → task graph → ready tasks.
  - [`execution-worker-specification-v0.1.md`](./specs/execution-worker-specification-v0.1.md) — 1 task = 1 branch = 1 PR + run record.
  - [`validation-auto-merge-engine-specification-v0.1.md`](./specs/validation-auto-merge-engine-specification-v0.1.md) — validation pipeline, risk routing, auto-merge.
  - [`evolution-engine-specification-v0.1.md`](./specs/evolution-engine-specification-v0.1.md) — self-improvement signals (no new features).
  - [`bootstrap-engine-specification-v0.1.md`](./specs/bootstrap-engine-specification-v0.1.md) — initial product/repo bootstrap.
  - [`factory-artifact-contract-specification-v0.1.md`](./specs/factory-artifact-contract-specification-v0.1.md) — artifact contracts.

## Live runtime

| Workflow | Role |
|---|---|
| `factory-validation.yml` | typecheck · lint · test · build |
| `factory-pr-audit.yml` | branch/run-record/scope/blocked-file checks |
| `factory-auto-merge.yml` | squash-merge eligible A3 PRs |

## Where the machine-readable factory state lives

- `.factory/tasks/` — task graph + ready task contracts.
- `.factory/runs/` — one run record per worker run.
- `.factory/policies/` — autonomy + architecture policies.
- `.factory/validation/` — required-checks matrix.
- `.factory/product/` — product intent, PRD, roadmap, feature map, open questions.
