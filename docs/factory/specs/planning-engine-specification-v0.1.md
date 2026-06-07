# Planning Engine Specification v0.1

## Ziel

Die Planning Engine verwandelt Produktziele, GitHub Issues und Evolution-Signale in **kleine, ausführbare, parallelisierbare Task Files**.

```text
Product / Issue / Signal
→ Plan
→ Task Graph
→ Ready Tasks
→ Worker Execution
```

Sie ist das eigentliche Steuerzentrum der Factory.

---

# 1. Grundprinzip

Die Planning Engine plant nicht „Features“.

Sie erzeugt **ausführbare Produktionsarbeit**.

Nicht:

```text
Baue das Dashboard.
```

Sondern:

```text
ui.dashboard.shell
ui.dashboard.metric-card
api.dashboard.metrics
test.dashboard.smoke
```

---

# 2. Planning Inputs

Die Planning Engine verarbeitet:

| Input | Zweck |
|---|---|
| Product Intent | initiale Richtung |
| PRD | Produktumfang |
| Roadmap | Prioritäten |
| GitHub Issues | Human Requests |
| CI Failures | Debug Tasks |
| PR Review Notes | Fix Tasks |
| Evolution Signals | Verbesserungen |
| Open Questions | Eskalationen |

---

# 3. Planning Outputs

Die Engine erzeugt:

```text
.factory/tasks/task-graph.yaml
.factory/tasks/ready/*.yaml
.factory/product/feature-map.md
.factory/product/open-questions.md
```

Optional:

```text
GitHub Issue Comments
PR Comments
Follow-up Issues
```

---

# 4. Task Lifecycle

```text
backlog
→ ready
→ in-progress
→ done
```

Sonderfälle:

```text
blocked
failed
escalated
```

## Status-Logik

| Status | Bedeutung |
|---|---|
| backlog | Task existiert, aber noch nicht ausführbar |
| ready | ausführbar, Dependencies erfüllt |
| in-progress | Worker bearbeitet Task |
| blocked | blockiert durch fehlende Entscheidung oder Dependency |
| done | erfolgreich umgesetzt |
| failed | Worker konnte Task nicht abschließen |
| escalated | Human Gate erforderlich |

---

# 5. Task Splitting Rules

Ein Task muss:

- eine klare Änderung beschreiben
- isoliert ausführbar sein
- möglichst wenige Dateien berühren
- validierbar sein
- eine Definition of Done haben
- ein Autonomie-Level besitzen
- eine Risikoeinschätzung enthalten

## Harte Regel

Ein Task darf nicht gleichzeitig:

- UI
- API
- Datenbank
- Auth
- Deployment

breit verändern.

Solche Vorhaben müssen gesplittet werden.

---

# 6. Task Size Policy

## Ideal Task

Ein guter Task hat:

```text
1 Ziel
1 klaren Scope
1 erwarteten PR
1 Set an Checks
```

## Zu groß

```text
Implementiere komplettes User Management.
```

## Gut

```text
auth.signup-form
auth.login-form
auth.session-provider
auth.protected-route
test.auth.login-flow
```

---

# 7. Dependency Graph

Jeder Task kann Abhängigkeiten haben.

Beispiel:

```yaml
id: ui.dashboard.metric-card
dependencies:
  tasks:
    - ui.dashboard.shell
```

## Ready-Regel

Ein Task darf nur nach `ready`, wenn:

- alle Task-Dependencies abgeschlossen sind
- keine Required Decisions offen sind
- keine blockierten Dateien erforderlich sind
- Risiko nicht `high` ohne Human Gate ist

---

# 8. Parallelization Rules

Tasks dürfen parallel laufen, wenn:

- keine gemeinsamen blockierten Dateien verändert werden
- keine direkte Dependency besteht
- sie unterschiedliche Feature-Bereiche betreffen
- sie keine Migrationen enthalten
- sie keine Architekturentscheidung benötigen

## Nicht parallelisieren

- mehrere DB-Migrationen
- mehrere Auth-Änderungen
- mehrere Änderungen an globalem Layout
- Änderungen an `package.json`
- Änderungen an zentralen Config-Dateien

---

# 9. Autonomy Assignment

Default:

```text
A3
```

Die Planning Engine reduziert Autonomie auf A2 oder A1, wenn Risiko entsteht.

| Situation | Level |
|---|---|
| UI isolated | A3 |
| Docs | A3 |
| Tests | A3 |
| Bugfix low risk | A3 |
| API non-breaking | A3 |
| Refactor local | A3 |
| DB migration | A2 |
| Auth logic | A2 |
| Infra change | A1 |
| Security-sensitive | A1 |
| Architecture change | A1 |

---

# 10. Validation Routing

Die Planning Engine weist Checks anhand von Task Type und Risk zu.

Beispiel:

```yaml
type: ui-component
risk:
  level: low
validation:
  required_checks:
    - lint
    - typecheck
    - test
    - build
```

High-risk Tasks:

```yaml
risk:
  level: high
autonomy:
  level: A1
  human_gate_required: true
```

---

# 11. Failure Handling

Wenn ein Worker scheitert:

## First Failure

- Task bleibt `ready`
- Fehler wird im Run dokumentiert
- Debug Task wird erzeugt

## Second Failure

- Task wird `blocked`
- Reviewer/Planner muss Task neu schneiden

## Third Failure

- Task wird `escalated`
- Human Gate erforderlich

---

# 12. Evolution Task Generation

Die Planning Engine darf selbst neue Tasks erzeugen für:

- fehlende Tests
- kleine Refactorings
- Dokumentationslücken
- offensichtliche Bugfixes
- CI-Fix
- Type Errors
- Dead Code

Sie darf nicht selbst erzeugen:

- neue Produktfeatures ohne Issue
- Architektur-Rewrites
- neue Services
- neue Paid Dependencies
- neue Auth-Konzepte

---

# 13. Planning Constraints

## Max Task Depth

Maximal:

```text
Issue → Task → Follow-up Task
```

Keine endlosen Subtask-Ketten.

## Max Parallel Workers

Initial empfohlen:

```text
3 parallele Worker
```

Später skalierbar.

## Max Open Ready Tasks

Initial empfohlen:

```text
10 ready tasks
```

Verhindert Task Explosion.

---

# 14. Planning Engine Artefakte

## `task-graph.yaml`

```yaml
version: 0.1

source:
  product: product-name
  generated_at: YYYY-MM-DD

tasks:
  - id: ui.dashboard.shell
    status: ready
    dependencies: []
    risk: low
    autonomy: A3

  - id: ui.dashboard.metric-card
    status: backlog
    dependencies:
      - ui.dashboard.shell
    risk: low
    autonomy: A3

edges:
  - from: ui.dashboard.shell
    to: ui.dashboard.metric-card
```

---

# 15. Planner Agent Instruction

```md
# Planner Agent

You convert product intent, GitHub Issues, and factory signals into executable task files.

Rules:
- Prefer small isolated tasks.
- Assign exactly one task type.
- Assign autonomy level.
- Assign validation checks.
- Avoid broad multi-area changes.
- Do not create architecture rewrites.
- Keep ready queue limited.
- Escalate uncertainty into `.factory/product/open-questions.md`.
```

---

# 16. Planning Success Criteria

Ein Planning Run ist erfolgreich, wenn:

```text
Task graph updated
Ready tasks generated
Dependencies clear
Autonomy assigned
Validation assigned
Risk classified
Open questions documented
No oversized tasks created
```

---

# Nächster Architekturblock

Jetzt fehlt als nächstes die **Execution Worker Specification v0.1**.

Dort definieren wir:

1. Worker Lifecycle  
2. Branching  
3. PR Creation  
4. Run Logs  
5. Validation Execution  
6. Retry Handling  
7. Auto-Merge Eligibility  
8. Grenzen der Worker-Autonomie
