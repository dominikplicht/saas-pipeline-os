# Validation & Auto-Merge Engine Specification v0.1

## Ziel

Die Validation Engine ersetzt den Großteil menschlicher Reviews durch:

- deterministische Checks
- Risiko-Klassifizierung
- Policy Enforcement
- Auto-Merge-Entscheidungen

```text
Pull Request
→ Validation Pipeline
→ Risk Evaluation
→ Policy Check
→ Auto-Merge OR Escalation
```

Die Validation Engine ist damit:

# die eigentliche Governance-Schicht der Factory.

---

# 1. Grundprinzip

Die Factory vertraut nicht primär:
- Agenten
- Prompts
- Modellen

Sondern:

# reproduzierbarer technischer Validierung.

---

# 2. Validation Inputs

Die Engine verarbeitet:

| Input | Zweck |
|---|---|
| Pull Request | zu validierende Änderung |
| Task File | erwarteter Scope |
| Risk Level | Risiko-Routing |
| Validation Policy | Pflichtchecks |
| Changed Files | Scope Enforcement |
| Run Record | Nachvollziehbarkeit |
| CI Results | technische Qualität |

---

# 3. Validation Outputs

Die Engine erzeugt:

```text
validation status
auto-merge eligibility
risk escalation
follow-up debug tasks
release readiness signal
```

---

# 4. Validation Pipeline

## Stage 1 — Structural Validation

Prüft:

- gültiger Branch Name
- gültiger PR Titel
- Run Record vorhanden
- Task File vorhanden
- Task Status korrekt
- keine verbotenen Dateien geändert

---

## Stage 2 — Policy Validation

Prüft:

- Autonomy Rules
- Architecture Policy
- Scope Enforcement
- Risk Overrides
- Human Gate Anforderungen

---

## Stage 3 — Technical Validation

Pflichtchecks:

```text
lint
typecheck
test
build
```

Optional abhängig von Risiko/Task:

```text
e2e
security
performance
contract-test
migration-check
```

---

## Stage 4 — Merge Evaluation

Ergebnis:

```text
auto-merge
manual-review
blocked
failed
```

---

# 5. Check Matrix

## Default Checks

| Check | Pflicht |
|---|---|
| lint | ja |
| typecheck | ja |
| test | ja |
| build | ja |

---

## UI Tasks

Zusätzlich optional:

```text
visual regression
playwright e2e
```

---

## API Tasks

Zusätzlich optional:

```text
contract tests
security scan
```

---

## DB Tasks

Zusätzlich:

```text
migration validation
rollback validation
```

---

# 6. Risk Classification

## Low Risk

Beispiele:

- isolierte UI-Komponente
- Docs
- kleine Bugfixes
- Tests
- lokale Refactorings

Erlaubt:

```text
A3
auto-merge möglich
```

---

## Medium Risk

Beispiele:

- API-Erweiterung
- größere Feature-Flows
- komplexere State-Änderungen

Erlaubt:

```text
A2/A3
optional Human Review
```

---

## High Risk

Beispiele:

- Auth
- Infra
- Security
- Billing
- Breaking APIs
- große Migrationen

Regel:

```text
human gate mandatory
auto-merge disabled
```

---

# 7. Scope Enforcement Engine

Sehr wichtig.

Die Validation Engine prüft:

```text
changed files
vs
allowed_files
blocked_files
```

Wenn Worker außerhalb des erlaubten Scopes gearbeitet hat:

```text
validation failed
task escalated
auto-merge blocked
```

Das verhindert autonome Drift.

---

# 8. PR Validation Rules

## PR muss enthalten

- Task Referenz
- Run Record
- Validation Ergebnisse
- Autonomy Level
- Risk Level

---

## PR darf nicht

- mehrere unabhängige Tasks kombinieren
- Architektur-Rewrites enthalten
- globale Configs ohne Berechtigung ändern
- fehlende Checks haben

---

# 9. Auto-Merge Logic

## Auto-Merge erlaubt nur wenn

```text
all required checks passed
autonomy = A3
human_gate_required = false
risk != high
no blocked files changed
PR up to date
run record exists
```

---

## Auto-Merge verboten wenn

```text
A1
high risk
architecture change
infra change
auth change
secret change
billing change
migration high risk
breaking change
```

---

# 10. Human Gate Routing

Wenn Human Gate nötig:

## Zielorte

| Situation | Routing |
|---|---|
| Architektur | architecture review |
| Security | security review |
| Produktlogik | product review |
| Kosten | cost review |
| Migration | migration review |

---

## Human Review soll minimal bleiben

Menschen prüfen:
- Richtung
- Risiko
- Architektur

Nicht:
- Formatierung
- kleine Fehler
- Routinecode

---

# 11. CI Failure Routing

Wenn Validation scheitert:

## Typ A — einfache technische Fehler

Beispiele:
- Lint
- Type Errors
- Broken Import

Aktion:

```text
Debug Worker erzeugen
```

---

## Typ B — Scope Violations

Aktion:

```text
Task escalated
```

---

## Typ C — Risk Violation

Aktion:

```text
Human Gate
```

---

## Typ D — Flaky Tests

Aktion:

```text
retry once
then debug task
```

---

# 12. Release Readiness

Ein Branch gilt als release-ready wenn:

```text
all checks green
no blocked PRs
no unresolved escalations
deployment preview healthy
main branch stable
```

---

# 13. Deployment Preview Rules

Jeder PR erzeugt:

# isoliertes Preview Deployment.

Beispiel:

```text
Vercel Preview URL
```

Vorteile:

- visuelle Validierung
- schnelle Produktprüfung
- isolierte QA
- weniger Merge-Risiko

---

# 14. Validation Hard Stops

Die Engine blockiert sofort bei:

```text
secret exposure
security violation
blocked file modification
missing validation
missing run record
destructive migration ambiguity
policy violation
```

---

# 15. Validation Artifacts

## Empfohlene Outputs

```text
.factory/runs/<run>/validation.md
.factory/runs/<run>/checks.json
.factory/runs/<run>/risk-evaluation.md
```

---

# 16. Wichtigste Erkenntnis

Die Factory skaliert nicht durch:
- bessere Agenten

sondern durch:

# bessere Validation.

Je stärker die Validation,
desto autonomer kann die Factory werden.

Das ist vermutlich die wichtigste operative Erkenntnis der gesamten Architektur.

---

# 17. Jetzt fehlt noch der letzte große Kernblock

Die Architektur braucht jetzt noch:

# Evolution Engine Specification v0.1

Das wäre der Schritt von:

```text
autonomer Umsetzung
```

zu:

# selbstverbessernder Produktentwicklung.

Dort definieren wir:

1. Self-Improvement Loops  
2. Tech Debt Detection  
3. Optimization Tasks  
4. Performance Signals  
5. Cleanup Policies  
6. Evolution Constraints  
7. Anti-Loop Mechanismen  
8. Autonomous Product Improvements
