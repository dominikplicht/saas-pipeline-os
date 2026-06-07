# Execution Worker Specification v0.1

## Ziel

Execution Worker setzen genau **einen strukturierten Task** aus `.factory/tasks/ready/*.yaml` um.

```text
Ready Task
→ Worker Run
→ Branch
→ Code Changes
→ Validation
→ PR
→ Run Record
→ Auto-Merge Eligibility
```

Execution Worker sind kurzlebig.

Sie starten, bearbeiten einen Task, erzeugen einen PR und beenden sich.

---

# 1. Grundprinzip

Ein Worker ist kein dauerhafter Agent.

Ein Worker ist ein isolierter Produktionslauf.

```text
1 Worker = 1 Task = 1 Branch = 1 Pull Request
```

Ausnahme nur bei reinen Analyse-/Debug-Runs ohne Codeänderung.

---

# 2. Worker Input

Pflichtinput:

```yaml
task_file: .factory/tasks/ready/<task-id>.yaml
repo_ref: main
worker_type: builder | debug | reviewer | docs | release
```

Der Worker liest zusätzlich:

```text
.factory/policies/autonomy-policy.md
.factory/policies/architecture-policy.md
.factory/validation/required-checks.yaml
.factory/product/prd.md
.factory/product/decisions.md
```

---

# 3. Worker Lifecycle

```text
1. Checkout repository
2. Load task file
3. Validate task eligibility
4. Create task branch
5. Implement scoped changes
6. Run required checks
7. Write run record
8. Commit changes
9. Open pull request
10. Mark task as in-progress / done candidate
```

---

# 4. Branching Rule

Branch format:

```text
factory/task/<task-id>
```

Beispiel:

```text
factory/task/ui-dashboard-shell
```

Regeln:

- keine direkten Commits auf `main`
- keine Multi-Task-Branches
- keine unbenannten Worker-Branches
- keine manuellen Hotfix-Branches im Factory-Modus

---

# 5. Scope Enforcement

Worker dürfen nur Dateien ändern, die im Task erlaubt sind.

Aus `task.yaml`:

```yaml
scope:
  allowed_files:
    - src/features/dashboard/**
    - src/components/dashboard/**
  blocked_files:
    - package.json
    - src/lib/auth/**
```

Wenn ein Worker eine blockierte Datei ändern müsste:

```text
stop → run record schreiben → task escalated
```

Nicht eigenmächtig erweitern.

---

# 6. Implementation Rules

Worker müssen:

- kleinste ausreichende Änderung machen
- bestehende Patterns verwenden
- keine neue Architektur einführen
- keine neuen Libraries hinzufügen, außer ausdrücklich erlaubt
- Tests ergänzen, wenn Verhalten verändert wird
- Dokumentation aktualisieren, wenn Task dies fordert

Worker dürfen:

- lokale Refactorings durchführen, wenn sie direkt zur Tasklösung nötig sind
- fehlende kleine Hilfsfunktionen ergänzen
- offensichtliche Typos oder Broken Imports fixen

Worker dürfen nicht:

- Architektur neu schneiden
- Auth-Konzept ändern
- DB-Schema ohne Task ändern
- Secrets anfassen
- Package-Strategie ändern
- globale Configs ändern
- mehrere Tasks zusammenziehen

---

# 7. Validation Execution

Der Worker führt alle required checks aus.

Quelle:

```text
.factory/validation/required-checks.yaml
```

Beispiel:

```yaml
validation:
  required_checks:
    - lint
    - typecheck
    - test
    - build
```

Wenn ein Check fehlschlägt:

```text
1. Fehler analysieren
2. innerhalb Task-Scope fixen
3. Checks erneut ausführen
4. maximal 2 lokale Fix-Versuche
```

Nach 2 fehlgeschlagenen Versuchen:

```text
task failed
debug task erzeugen
run record schreiben
```

---

# 8. Run Record

Jeder Worker erzeugt:

```text
.factory/runs/<date>-<task-id>/run.md
```

Zusätzlich empfohlen:

```text
.factory/runs/<date>-<task-id>/changed-files.txt
.factory/runs/<date>-<task-id>/validation.md
.factory/runs/<date>-<task-id>/notes.md
```

Zweck:

- Nachvollziehbarkeit
- Debugging
- späteres Factory Learning
- Reproduzierbarkeit

---

# 9. Pull Request Standard

PR Titel:

```text
[Factory] <task-id>: <short title>
```

PR Body:

```md
## Task
- Task ID:
- Task File:
- Source Issue:

## Scope
Kurzbeschreibung.

## Changes
-

## Validation
- lint:
- typecheck:
- test:
- build:

## Autonomy
- Level:
- Human Gate Required:
- Auto-Merge Eligible:

## Risks
-

## Run Record
-
```

---

# 10. Auto-Merge Eligibility

Ein PR ist auto-merge-fähig, wenn:

```text
task autonomy = A3
human_gate_required = false
risk != high
all required checks pass
no blocked files changed
PR has run record
branch is up to date
no unresolved review comments
```

Auto-Merge ist **nicht** erlaubt bei:

```text
A1
A2
high risk
architecture change
security change
infra change
secret change
billing/cost change
breaking change
database migration high risk
```

---

# 11. Failure Handling

## Failure Type A — Validation Failure

Aktion:

```text
worker tries local fix max 2 times
then creates debug task
```

## Failure Type B — Scope Violation

Aktion:

```text
stop
mark task escalated
document required scope expansion
```

## Failure Type C — Missing Context

Aktion:

```text
write question to .factory/product/open-questions.md
mark task blocked
```

## Failure Type D — Architecture Conflict

Aktion:

```text
stop
mark task escalated
recommend human decision
```

---

# 12. Worker Types

## Builder Worker

Zweck:

```text
implement feature / bugfix / refactor
```

## Debug Worker

Zweck:

```text
fix failed validation or runtime issue
```

## Reviewer Worker

Zweck:

```text
review PR for task compliance and auto-merge eligibility
```

## Docs Worker

Zweck:

```text
update documentation
```

## Release Worker

Zweck:

```text
prepare release notes and deployment validation
```

---

# 13. Worker Concurrency

Initial:

```text
max_parallel_workers = 3
```

Nicht parallelisieren bei:

- package changes
- migrations
- global config changes
- auth changes
- layout shell changes
- shared component system changes

---

# 14. Worker Success Criteria

Ein Worker Run ist erfolgreich, wenn:

```text
branch created
task implemented
required checks executed
run record written
PR created
PR body complete
auto-merge eligibility evaluated
```

---

# 15. Worker Hard Stops

Worker muss sofort stoppen bei:

```text
secret required
blocked file required
architecture rewrite required
paid dependency required
ambiguous destructive migration
production data risk
security model change
```

---

# 16. Nächster Architekturblock

Als nächstes folgt sinnvoll:

# Validation & Auto-Merge Engine Specification v0.1

Darin definieren wir:

1. Check Matrix  
2. PR Validation  
3. Risk Overrides  
4. Auto-Merge Logic  
5. Human Gate Routing  
6. CI Failure Routing  
7. Release Readiness  
8. Deployment Preview Rules
