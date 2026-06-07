# Factory Evolution

The Evolution Engine keeps the **product and codebase** healthy — it does not
invent new product features (that is the planner's job, from human/product
input).

## How it works

`factory-evolution.yml` runs weekly (and on demand via workflow_dispatch) and
scans for improvement signals:

- TODO / FIXME / HACK / XXX comments
- TypeScript errors (`tsc`)
- lint warnings
- largest source files (agent-context hygiene)

Findings are written into a single deduplicated GitHub issue titled
**"Factory Evolution Signals"** (updated in place each run — anti-loop). The
scan never writes to the repository and never opens product-feature work.

## Allowed evolution categories (spec)

- **Stability** — flaky tests, type errors, CI robustness
- **Quality** — duplicate code, naming, missing validation
- **Performance** — slow paths, large bundles
- **Cleanup** — dead code, unused imports, stale docs
- **Tests** — missing coverage, edge cases, smoke/contract tests

## Not allowed

New product features, new business flows, new services, new infrastructure,
architecture rewrites, new paid dependencies.

## From signal to change

The planner reviews the evolution issue and, where worthwhile, authors a normal
task contract in `.factory/tasks/ready/`. From there the standard worker →
validation → audit → auto-merge loop applies. Low-risk cleanup/test tasks are
typically A3 (auto-merge); anything touching infra stays A2.
