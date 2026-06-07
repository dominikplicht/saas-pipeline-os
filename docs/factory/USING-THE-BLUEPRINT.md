# Using the Blueprint

This repo is a **blueprint**: a governed Development Factory plus a neutral,
product-agnostic scaffold. Copy it once per product idea, give Claude the vision,
and the factory builds the product — each feature as a validated PR with a
reviewable Vercel preview.

## 1. Create a copy

On GitHub: **Use this template → Create a new repository** (the blueprint is a
template repo). Clone your new repo locally.

## 2. Instantiate it

```bash
scripts/factory/new-product.sh "My Product Name"
```

This clears the blueprint's example build history, empties the task graph, and
sets the product name in `src/lib/site.ts`. Commit the result.

Then connect the new repo to **Vercel** ("Add New → Project → Import") for
automatic per-PR preview deployments.

> **Commit email:** make sure your local Git author email is one that is **added
> and verified on your GitHub account** (`git config user.email`). Vercel refuses
> to deploy a PR whose commit author email is not linked to a GitHub account
> ("No GitHub account was found matching the commit author email address"). The
> headless worker already commits as `github-actions[bot]`, so this only affects
> commits you push yourself.

## 3. Give Claude the vision

Open a Claude Code session in the repo and paste:

```
Baue mein Produkt mit der Factory. Vision:

- Produktname:
- Problem / Zweck (1–3 Sätze):
- Zielnutzer:
- Kernfunktionen (3–6, priorisiert):
- Nicht-Ziele:
- Tech-Constraints (Default: Next.js + TS + Tailwind; Backend nur wenn nötig):
- Erstes sichtbares Ziel:

Erzeuge PRD + Roadmap + Feature-Map + Task-Graph und lege die ersten
A3-Tasks an. Dann baue sie Schritt für Schritt.
```

Claude (the planner) writes `.factory/product/*` and `task-graph.yaml`, then
works each task as `1 task = 1 branch = 1 PR = 1 run record`.

### Optional: headless worker (no session needed)

Tasks can also be built **without an open session** by the headless worker
(`factory-worker.yml`). One-time setup: `claude setup-token` → repo secret
`CLAUDE_CODE_OAUTH_TOKEN`, and set the kill-switch variable
`FACTORY_WORKER_ENABLED=true`. Then for any ready task:

```bash
gh workflow run factory-worker.yml -f task_id=<id>
```

It branches, runs Claude Code headless within `allowed_files`, validates,
writes the run record, and opens the PR — the same pipeline takes over. See
[`../factory-runtime/factory-worker-v0.1.md`](../factory-runtime/factory-worker-v0.1.md).

## 4. How merging works

- **A3** (low-risk UI/docs/tests within `allowed_files`) → CI validates and the
  audit checks scope. Auto-merge is supported only when the active GitHub plan
  supports it for the repository visibility and repository-level auto-merge is
  enabled. Otherwise, A3 PRs degrade to human merge after successful validation.
- **A2/A1** (infra, deps, policy, risky changes) → green audit but labeled
  `factory:human-gate` for you to merge.
- Every PR gets a **Vercel preview** so you review the running feature, not code.

## 5. Keep going

Add ideas as GitHub issues or directly in the session. The weekly
`factory-evolution.yml` scan reports cleanup/test/quality signals into a single
tracking issue; the planner turns worthwhile ones into tasks.

## What stays fixed (the factory)

`.github/workflows/factory-*.yml`, `.factory/policies`, `.factory/agents`,
`.factory/validation`, and `docs/factory/specs` are the reusable "OS" — leave
them as-is. See [`governance.md`](./governance.md) and [`README.md`](./README.md).
