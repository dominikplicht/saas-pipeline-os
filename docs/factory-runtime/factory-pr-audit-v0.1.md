# Factory PR Audit v0.1

## Purpose

`factory-pr-audit.yml` is the first GitHub Actions runtime component for the Development Factory.

It validates whether a Factory PR follows the minimum execution rules.

## Checks

The workflow validates:

- branch starts with `factory/task/`
- PR contains actual changed files
- a run record for **this PR** exists under `.factory/runs/**/run.md`
- **every changed file is inside the task contract's `allowed_files` and matches none of its `blocked_files`** (per-task scope enforcement)
- globally blocked files were not modified
- the PR's run record mentions every actual diff file

## Scope Enforcement

The audit reads the resolved task contract (`scope.allowed_files`,
`scope.blocked_files`, plus `autonomy.level` / `risk.level` /
`autonomy.human_gate_required`) with Ruby's YAML parser and checks the actual
diff against it: each changed file must match at least one `allowed_files` glob
and no `blocked_files` glob. Globs use shell pattern matching (`**` / `*`); a
violation fails the audit so the worker cannot silently drift outside the task.
If a contract omits `allowed_files`, the allow-list check is skipped and a
**fallback blocked set** applies instead (see below).

## Run Record Resolution

The audit resolves the run record that belongs to the PR by matching the PR
branch name recorded **inside** the run record (each record carries a
`| branch | factory/task/... |` row), rather than picking the alphabetically
last directory. Lexical order is not chronological order (for example
`ui-task-detail` sorts before an earlier `ui-task-list` run), so directory-name
sorting selected the wrong record.

Exactly one run record must reference the branch — zero or multiple is an error.

The task id is then read directly from that run record's `task_id` row and used
to locate the matching `.factory/tasks/**.yaml` contract. The id is no longer
reconstructed from the branch slug, which was lossy (slug hyphens are ambiguous
against id dots, e.g. `ui-task-detail-placeholder` → `ui.task-detail.placeholder`).

## Blocked Files (contract-aware)

The audit treats the **task contract as the source of truth** for what a PR may
change. It does **not** hard-fail on infra paths just because they are sensitive
— an authorized task that lists them in `allowed_files` passes green. Three
layers apply, in order:

1. **Hard-deny (always):** `.env`, `.env.local`, `**/*.pem`, `**/*.key`,
   `**/id_rsa`, `**/secrets/**` — fail even if a contract lists them (escalate).
2. **Contract:** `blocked_files` always fail; with `allowed_files` present, any
   file not matching is a scope violation.
3. **Fallback blocked set (only when a task has no `allowed_files`):**
   `package.json`, lockfiles, `.github/**`, `.factory/policies/**`, `.env*` —
   protects contract-less / malformed PRs.

**Human-gating is not done with a red audit.** Infra PRs (which legitimately
touch `.github/**` etc. and list them in `allowed_files`) pass the audit green;
they are kept human-gated by the auto-merge engine because their `autonomy` is
A1/A2, not A3. This keeps a red audit meaningful — it signals a real scope
violation, not routine infra.

## Known Limitations

This v0.1 workflow does not fully parse YAML task contracts.

It uses pragmatic text checks first, because the current goal is controlled runtime hardening rather than full factory orchestration.

## Success Criteria

A PR passes Factory PR Audit if:

```text
branch naming valid
actual diff exists
exactly one run record references this PR branch
no blocked files changed
that run record matches actual diff files
```

> **Note:** A PR that modifies the audit workflow itself necessarily touches
> `.github/**`, which is a blocked file. Such infra PRs therefore fail the audit
> by design and require human merge (autonomy A2) — the red audit is the gate,
> not a defect.

## Recommended Next Step

After installing this workflow, run it against the next worker PR, preferably:

```text
ui.task-detail.placeholder
```
