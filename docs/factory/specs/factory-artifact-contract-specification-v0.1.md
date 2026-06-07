# Factory Artifact Contract Specification v0.1

## Ziel

Die Factory Artifact Contracts definieren:

# die gemeinsame Sprache der gesamten Development Factory.

Das ist extrem wichtig.

Denn ohne stabile Artefakte entstehen:
- fragile Automationen
- inkonsistente Tasks
- schlechte Interoperabilität
- unklare Zuständigkeiten
- Drift zwischen Claude und Codex

---

# 1. Grundprinzip

Die Factory kommuniziert primär über:

# versionierte Artefakte.

Nicht über:
- impliziten Kontext
- Chat-Historie
- flüchtige Agent-Memorys

---

# 2. Artifact Design Goals

Alle Artefakte müssen:

| Ziel | Bedeutung |
|---|---|
| maschinenlesbar | automatisierbar |
| menschenlesbar | reviewbar |
| versionierbar | GitHub-native |
| stabil | langfristig kompatibel |
| referenzierbar | cross-linked |
| deterministisch | reproduzierbar |

---

# 3. Canonical Artifact Types

## Produkt-Ebene

```text
product-intent.md
prd.md
roadmap.md
feature-map.md
decisions.md
open-questions.md
```

---

## Factory-Ebene

```text
task.yaml
task-graph.yaml
run.md
validation.md
risk-evaluation.md
```

---

## Governance-Ebene

```text
autonomy-policy.md
architecture-policy.md
validation-policy.md
release-policy.md
```

---

## Evolution-Ebene

```text
evolution-report.md
optimization-report.md
stability-report.md
```

---

# 4. Canonical Naming Convention

Sehr wichtig.

## Regel

```text
<domain>.<subdomain>.<artifact>
```

Beispiele:

```text
ui.dashboard.metric-card
auth.session-provider
api.billing.subscription-sync
test.auth.login-flow
cleanup.unused-hooks
```

---

# 5. File Naming Standard

## Regel

```text
<artifact-name>-v<version>.md
```

Beispiele:

```text
planning-engine-specification-v0.1.md
architecture-policy-v0.2.md
```

---

# 6. Canonical IDs

Alle Factory-Artefakte brauchen IDs.

## Beispiel

```yaml
id: ui.dashboard.metric-card
```

IDs müssen:
- eindeutig
- stabil
- lesbar
- referenzierbar

sein.

---

# 7. Task Contract Standard

## Pflichtfelder

```yaml
id:
title:
type:
status:
autonomy:
risk:
scope:
dependencies:
definition_of_done:
validation:
metadata:
```

---

# 8. Run Contract Standard

## Pflichtfelder

```md
Run ID
Task ID
Agent
Branch
Validation Result
Changed Files
Outcome
```

---

# 9. Cross-Reference Rules

Alle wichtigen Artefakte müssen referenzierbar sein.

## Beispiel

Task:

```yaml
source:
  github_issue: 42
```

PR:

```text
references task: ui.dashboard.metric-card
```

Run Record:

```text
references PR #31
```

---

# 10. Artifact Relationships

```text
Issue
→ Task
→ Worker Run
→ Pull Request
→ Validation
→ Merge
```

Das ist die zentrale Produktionskette.

---

# 11. Markdown vs YAML

## Markdown

Nutzen für:
- menschliche Dokumente
- Policies
- PRDs
- Architektur
- Reports

---

## YAML

Nutzen für:
- strukturierte Automation
- Task Contracts
- Validation Contracts
- Task Graphs
- Machine Routing

---

# 12. Machine Readability Rules

Sehr wichtig.

Artefakte müssen:
- konsistente Felder haben
- keine freien impliziten Strukturen enthalten
- möglichst deterministisch aufgebaut sein

---

## Vermeiden

```text
"Mach das Dashboard schöner."
```

---

## Bevorzugen

```yaml
id: ui.dashboard.metric-card
type: ui-component
scope:
  allowed_files:
    - src/features/dashboard/**
definition_of_done:
  - metric cards render
  - responsive layout works
```

---

# 13. Artifact Versioning

## Regel

Alle wichtigen Artefakte besitzen:

```text
v0.1
v0.2
v1.0
```

---

## Breaking Changes

Bei inkompatiblen Änderungen:

```text
major version increase
```

---

# 14. Schema Stability

Sehr wichtig.

Die Factory darf Schemas nicht ständig ändern.

Warum?

Weil sonst:
- Worker brechen
- Automationen instabil werden
- Planning inkonsistent wird
- Validation fehlschlägt

---

# 15. Recommended Directory Layout

```text
.factory/
├── product/
├── tasks/
├── runs/
├── validation/
├── policies/
├── evolution/
└── schemas/
```

---

# 16. Schema Registry

Empfohlen:

```text
.factory/schemas/
```

Beispiel:

```text
task.schema.yaml
run.schema.yaml
validation.schema.yaml
```

---

# 17. Artifact Validation

Langfristig sollte jedes strukturierte Artefakt:

# schema-validiert werden.

Beispiel:

```text
task.yaml
→ validate against task.schema.yaml
```

Das ist extrem wichtig für Stabilität.

---

# 18. Human vs Machine Sections

Empfohlene Trennung:

## Human-Oriented

```md
## Summary
## Context
## Notes
```

---

## Machine-Oriented

```yaml
metadata:
validation:
dependencies:
```

---

# 19. Open Questions Contract

Sehr wichtig.

Nicht gelöste Unsicherheit darf nicht:
- versteckt
- halluziniert
- ignoriert

werden.

---

## Standard

```md
# Open Question

ID:
Context:
Blocked Task:
Required Decision:
Options:
Recommendation:
```

---

# 20. Artifact Lifecycle

```text
created
→ updated
→ referenced
→ validated
→ archived
```

---

# 21. Archival Rules

Factory darf alte Artefakte nicht einfach löschen.

Empfohlen:

```text
archive/
```

Warum?

Historie verbessert:
- Evolution
- Debugging
- Factory Learning
- Governance

---

# 22. Claude ↔ Codex Contract

Sehr wichtig.

## Claude erzeugt primär:

```text
strategic artifacts
```

## Codex erzeugt primär:

```text
execution artifacts
```

---

# 23. Kritischste Erkenntnis

Die Factory wird langfristig wahrscheinlich nicht durch:
- bessere Modelle

skaliert.

Sondern durch:

# bessere Artefakt-Standards.

Das ist vermutlich die wichtigste technische Erkenntnis der gesamten Architektur.
