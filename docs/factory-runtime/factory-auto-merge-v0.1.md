# Factory Auto-Merge v0.1

## Purpose

`factory-auto-merge.yml` is a **soft auto-merge engine** for a private repo
without branch protection (GitHub's native auto-merge requires protected
branches / a paid plan). It replaces most human merges for low-risk, fully
autonomous changes while keeping infrastructure and risky changes human-gated.

## Trigger

Runs on `workflow_run` completion of **Factory Validation** and **Factory PR
Audit**. Because `workflow_run` workflows execute from the default branch, the
engine only takes effect once merged to `main`, and it cannot auto-merge its own
introducing PR.

## Logic

1. Find the open PR for the triggering `head_branch`.
2. Require **both** factory workflows to have concluded `success` for the exact
   `head_sha` (queried by workflow file, so job renames don't break it).
3. Re-derive eligibility from the task contract (resolved via the run record →
   `task_id` → task file, same as the audit). The engine reads
   `autonomy.level`, `autonomy.human_gate_required`, `risk.level`.
4. **Eligible** when: both green ∧ `autonomy == A3` ∧ `human_gate_required ==
   false` ∧ `risk != high`. Scope/blocked-file safety is already guaranteed by
   requiring the audit to be green.

## Outcomes

| Situation | Action |
|---|---|
| Eligible | squash-merge + delete branch, label `factory:auto-merge` |
| Both green but not A3 / human-gated | label `factory:human-gate`, no merge |
| Factory Validation failed | label `factory:blocked`, no merge |
| Audit failed (typical for A1/A2 infra) | label `factory:human-gate`, no merge |
| One workflow not concluded yet | exit quietly; the other run re-evaluates |

## Notes

- Uses `GITHUB_TOKEN` with `contents: write` + `pull-requests: write`; no branch
  protection required.
- Infra PRs that modify `.github/**` or `package.json` necessarily fail the audit
  by design and are therefore never auto-merged — they remain human-gated (A2),
  consistent with the autonomy policy.
- Humans can still merge manually; the engine never blocks, it only adds the
  positive auto-merge path.
