# Evolution Engine Specification v0.1

## Ziel

Die Evolution Engine macht aus der Factory:

# ein selbstverbesserndes Produktsystem.

Nicht nur:

```text
Issues abarbeiten
```

Sondern:

```text
Produkt + Codebase + Factory kontinuierlich verbessern
```

---

# 1. Grundprinzip

Die Evolution Engine darf:

- verbessern
- stabilisieren
- optimieren
- aufräumen
- technische Schulden reduzieren

Sie darf nicht:

- Produktvision verändern
- Architektur neu erfinden
- neue Produktbereiche autonom starten

---

# 2. Evolution Inputs

Die Engine verarbeitet:

| Signal | Quelle |
|---|---|
| CI Failures | GitHub Actions |
| Test Coverage Gaps | Validation |
| Type Errors | TypeScript |
| Dead Code | Static Analysis |
| Slow Builds | CI Metrics |
| Bundle Size | Build Analysis |
| Runtime Errors | Logs |
| Performance Drops | Lighthouse |
| Duplicate Code | Analysis |
| TODO/FIXME | Source Scan |
| PR Trends | GitHub |
| Flaky Tests | Validation History |

---

# 3. Evolution Outputs

Die Engine erzeugt:

```text
optimization tasks
refactor tasks
cleanup tasks
debug tasks
stability improvements
documentation tasks
test coverage tasks
```

---

# 4. Evolution Categories

## A. Stability Evolution

Ziel:

```text
Produkt robuster machen
```

Beispiele:

- flaky tests fixen
- type errors reduzieren
- CI stabilisieren
- retry loops verbessern

---

## B. Quality Evolution

Ziel:

```text
Codequalität erhöhen
```

Beispiele:

- duplicate code reduzieren
- naming consistency
- missing validation
- untyped areas reduzieren

---

## C. Performance Evolution

Ziel:

```text
Produkt schneller machen
```

Beispiele:

- slow queries
- large bundles
- rendering bottlenecks
- oversized images

---

## D. Cleanup Evolution

Ziel:

```text
Repository sauber halten
```

Beispiele:

- dead code
- unused imports
- outdated docs
- orphaned files

---

## E. Test Evolution

Ziel:

```text
Validation verbessern
```

Beispiele:

- fehlende tests
- edge case coverage
- contract tests
- smoke tests

---

# 5. Evolution Lifecycle

```text
signal detected
→ analysis
→ evolution task generation
→ planning
→ execution worker
→ validation
→ merge
```

---

# 6. Evolution Constraints

Sehr wichtig.

Die Evolution Engine darf:

## Erlaubt

- lokale Refactorings
- Tests ergänzen
- kleine Optimierungen
- Cleanup
- technische Schulden reduzieren

---

## Nicht erlaubt

- neue Produktfeatures
- neue Business Flows
- neue Services
- neue Infrastruktur
- Stack-Wechsel
- Architektur-Rewrites
- neue Paid Dependencies
- globale Produktänderungen

---

# 7. Hard Rule

# Evolution darf niemals Produktscope erweitern.

Das verhindert:
- Scope Drift
- Agent Creativity Loops
- endlose Expansion

---

# 8. Evolution Risk Levels

## Low Risk

Beispiele:

- formatting cleanup
- unused imports
- docs update
- local refactor

Default:

```text
A3
auto-merge allowed
```

---

## Medium Risk

Beispiele:

- state optimization
- query optimization
- test restructuring

Default:

```text
A2/A3
```

---

## High Risk

Beispiele:

- auth optimization
- database optimization
- infra optimization

Default:

```text
A1
human gate
```

---

# 9. Evolution Trigger Rules

## Trigger A — CI Trends

Beispiel:

```text
same test failed 3 times
```

→ erzeugt stabilization task

---

## Trigger B — Coverage Gaps

Beispiel:

```text
feature has no tests
```

→ erzeugt test task

---

## Trigger C — Bundle Growth

Beispiel:

```text
bundle size +20%
```

→ optimization task

---

## Trigger D — Dead Code

Beispiel:

```text
unused exports detected
```

→ cleanup task

---

## Trigger E — Runtime Errors

Beispiel:

```text
same runtime error repeatedly detected
```

→ debug task

---

# 10. Anti-Loop Mechanisms

Kritisch wichtig.

Autonome Systeme tendieren zu:
- endlosen Refactors
- Optimierungsloops
- Task Explosion

---

# Deshalb braucht die Evolution Engine harte Grenzen.

---

## Constraint 1
# Max Evolution Tasks per Cycle

Initial:

```text
max = 3
```

---

## Constraint 2
# No Self-Triggered Evolution Chains

Evolution Tasks dürfen nicht unbegrenzt weitere Evolution Tasks erzeugen.

Maximal:

```text
1 generation depth
```

---

## Constraint 3
# Cooldown Windows

Beispiel:

```text
same file area cannot receive optimization task twice within 24h
```

---

## Constraint 4
# No Pure Cosmetic Loops

Die Engine darf nicht:
- permanent formatieren
- Dateien verschieben
- unnötige kleine Änderungen erzeugen

---

# 11. Evolution Prioritization

Priorität:

| Priorität | Bereich |
|---|---|
| P1 | Broken validation |
| P2 | Runtime stability |
| P3 | Missing tests |
| P4 | Performance |
| P5 | Cleanup |

Nicht:
```text
"perfekte Codequalität"
```

Sondern:
```text
"produktive Stabilität"
```

---

# 12. Evolution Task Examples

## Example 1 — Missing Tests

```yaml
id: test.dashboard.metric-card
type: test
risk:
  level: low
autonomy:
  level: A3
description: Add missing tests for dashboard metric card component.
```

---

## Example 2 — Dead Code

```yaml
id: cleanup.unused-auth-hooks
type: optimization
risk:
  level: low
autonomy:
  level: A3
```

---

## Example 3 — Slow Query

```yaml
id: optimize.dashboard-query
type: optimization
risk:
  level: medium
autonomy:
  level: A2
```

---

# 13. Evolution Engine Artifacts

## Recommended Outputs

```text
.factory/evolution/
├── signals/
├── reports/
├── trends/
└── optimization-history/
```

---

## Example

```text
.factory/evolution/reports/2026-05-28-build-performance.md
```

---

# 14. Evolution Success Criteria

Ein Evolution Cycle ist erfolgreich, wenn:

```text
real issue identified
bounded improvement generated
task scoped correctly
no scope drift
no architecture rewrite
validation passed
product stability improved
```

---

# 15. Wichtigste Erkenntnis

Die Evolution Engine darf nicht versuchen:

# autonom Produktstrategie zu betreiben.

Sie soll:

# lokale intelligente Verbesserung betreiben.

Das ist deutlich stabiler.

---

# 16. Architekturstatus

Mit der Evolution Engine ist jetzt erstmals die komplette Phase-1-Kernarchitektur definiert:

| System | Status |
|---|---|
| Repository Structure | definiert |
| Bootstrap Engine | definiert |
| Planning Engine | definiert |
| Execution Workers | definiert |
| Validation Engine | definiert |
| Evolution Engine | definiert |

Das ist jetzt bereits eine sehr vollständige Factory-Architektur.

---

# Jetzt kommen die nächsten wichtigen Entscheidungen

Ab hier verlassen wir „Grundarchitektur“ und bewegen uns Richtung:

# operative Factory-Implementierung.

Die nächsten sinnvollen Blöcke wären:

## Option A
# GitHub Actions Runtime Design

Konkrete:
- Workflow-Struktur
- Event-Trigger
- Worker-Dispatch
- PR-Automation
- Auto-Merge-Flows

---

## Option B
# Archetype Repository Specification

Wie Archetypes technisch aufgebaut werden:
- Template-System
- Bootstrap Scripts
- Stack Injection
- Factory Injection
- Versioning

---

## Option C
# Claude ↔ Codex Operating Model

Der wahrscheinlich kritischste operative Teil:

- Wer macht was?
- Wann wird Claude genutzt?
- Wann Codex?
- Welche Kontextgrenzen?
- Welche Übergaben?
- Welche Artefakte?

---

# Meine starke Empfehlung:
# Option C zuerst.

Denn das ist das eigentliche Herz deines Projekts:
„Development Factory mit Claude-Codex Kombi“.
