# Factory Dispatcher v0.1

`factory-dispatcher.yml` closes the autonomy loop: it selects the next
dispatchable `ready` task and starts the headless worker for it — so the factory
works the task queue without anyone running `gh workflow run`.

## Triggers

- **Chain:** at the end of every run the **worker pings the dispatcher** via
  `gh workflow run factory-dispatcher.yml` (a `workflow_dispatch`). This is the
  reliable chain: a worker started by the dispatcher's `GITHUB_TOKEN` does **not**
  emit a `workflow_run` event that triggers other workflows (GitHub
  anti-recursion), but `workflow_dispatch` **is** the GITHUB_TOKEN exception.
  (The `workflow_run` trigger is kept as a bonus for human/PAT-started workers.)
- **Heartbeat:** daily `cron` (`0 6 * * *`) — catches newly-added ready tasks.
- **Manual:** `workflow_dispatch` — to start the chain.

## Selection (serial, dependency-aware)

1. **Serial guard:** if any `factory/task/*` PR is open **or** a worker is
   running/queued, do nothing (`MAX_PARALLEL = 1`). A failed/blocked worker
   leaves an open PR, so **the chain pauses until a human resolves it** — no
   hammering on failing tasks.
2. **Done set** = task graph status `done` **or** a merged PR on
   `factory/task/<slug>`.
3. **Pick** the first task with `status: ready`, not done, no open PR, a contract
   file in `.factory/tasks/ready/`, and **all dependencies done**.
4. Dispatch: `gh workflow run factory-worker.yml -f task_id=<id>`.

The worker self-merges the A3 PR; its completion re-triggers the dispatcher →
next task. When nothing is dispatchable, the dispatcher is a no-op (idle ≈ free).

## Controls

- **Kill-switch:** repo variable `FACTORY_DISPATCHER_ENABLED` must be `'true'`.
  Unset/`false` → the dispatcher does nothing. (Independent from the worker's
  `FACTORY_WORKER_ENABLED`.)
- `concurrency: factory-dispatcher` prevents overlapping dispatcher runs.
- Done-detection is derived from merged PRs; the graph `status` field stays
  advisory (no graph mutation in v0.1).

## Setup

```
gh variable set FACTORY_DISPATCHER_ENABLED --body true
```
Both `FACTORY_WORKER_ENABLED` and `FACTORY_DISPATCHER_ENABLED` must be `true` for
the fully autonomous loop. Disable either to pause.

## Not yet (v0.1)

- Parallelism > 1 (with a shared-critical-file conflict heuristic).
- Graph status mutation (ready → in-progress → done).
- Headless planner — turning a product vision into tasks stays with Claude.
