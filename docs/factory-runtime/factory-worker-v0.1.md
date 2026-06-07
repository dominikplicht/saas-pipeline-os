# Factory Worker v0.1 (headless)

`factory-worker.yml` runs an AI coding agent **inside GitHub Actions** to
implement one ready task end-to-end — no local Claude Code session required.

It is **self-contained**: a PR opened with the `GITHUB_TOKEN` does **not**
trigger the `pull_request` workflows (GitHub's anti-recursion rule), so
`factory-validation` / `factory-pr-audit` / `factory-auto-merge` never run for
it. The worker therefore runs the four checks **and** enforces scope inline, and
**squash-merges an eligible A3 PR itself** (else labels it for a human). The
kill-switch and the contract's autonomy level remain the controls.

## Flow

```
gh workflow run factory-worker.yml -f task_id=<id>
  → [kill-switch] only runs if vars.FACTORY_WORKER_ENABLED == 'true'
  → resolve .factory/tasks/ready/<...>.yaml  (Date-safe YAML reader)
  → branch factory/task/<slug>
  → Claude Code headless (OAuth) edits ONLY allowed_files, runs the 4 checks
  → scripts/factory/gen-run-record.rb  (run record from the real diff)
  → commit · push · gh pr create (labels autonomy:* / risk:*)
  → enforce scope inline + check the 4 results; self-merge eligible A3 PRs
    (squash), else label factory:human-gate / factory:blocked / factory:escalated
```

The agent **only edits the working tree**; the workflow owns git, the run
record, and the PR. This guarantees the run record matches the diff and keeps the
agent inside the same scope the audit enforces.

## Setup (one-time)

1. **Auth via your Claude Pro/Max subscription (no API key):**
   ```bash
   claude setup-token
   ```
   Copy the token into a repo secret named **`CLAUDE_CODE_OAUTH_TOKEN`**
   (Settings → Secrets and variables → Actions → New repository secret).
2. **Arm the kill-switch:** add a repo **variable** `FACTORY_WORKER_ENABLED` =
   `true`. Set it to anything else (or delete it) to instantly disable the worker.

## Running it

```bash
gh workflow run factory-worker.yml -f task_id=ui.dashboard.metric-card
```

A ready task contract for that id must exist under `.factory/tasks/ready/`
(authored by the planner / Claude). The worker does the rest.

## Safety & cost

- **Kill-switch:** `FACTORY_WORKER_ENABLED` gates every run.
- **Subscription usage:** the OAuth token runs against your Pro/Max limits;
  `--max-turns 30` caps each run. On limit/error the run fails → no PR (or a
  `factory:blocked` PR), never an unreviewed merge.
- **Scope:** the agent is instructed to touch only `allowed_files` and never
  commit/push or write run records; the **audit enforces scope post-hoc** and an
  A3 PR that violates scope is routed to `factory:escalated`.
- **Manual only (v0.1):** runs are dispatched explicitly. An autonomous
  dispatcher (pick the next ready task automatically) is a deliberate later step.

## Limitations / not yet

- No autonomous dispatcher and no headless **planner** — turning a product vision
  into task contracts stays with Claude/you (the "Claude = strategy" split).
- Engine is Claude Code (chosen because the subscription-OAuth path is
  first-class there); a Codex-in-CI engine was deferred.
