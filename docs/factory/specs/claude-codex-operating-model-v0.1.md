# Claude ↔ Codex Operating Model v0.1

## Ziel

Das Claude ↔ Codex Operating Model definiert:

# wie beide Systeme gemeinsam eine autonome Development Factory betreiben.

Nicht:

```text
Claude ODER Codex
```

Sondern:

# Claude + Codex mit klarer Rollentrennung.

Das ist entscheidend.

Denn die größte Gefahr autonomer AI-Entwicklung ist:

```text
unklare Verantwortlichkeit
```

---

# 1. Grundprinzip

## Claude = strategisches System
## Codex = operatives Produktionssystem

Das ist die wichtigste Architekturentscheidung des gesamten Projekts.

---

# 2. High-Level Rollenmodell

| System | Primäre Rolle |
|---|---|
| Claude | Denken, Strukturieren, Planen, Bewerten |
| Codex | Implementieren, Ausführen, Validieren |

---

# 3. Claude Responsibilities

Claude ist verantwortlich für:

## Produkt- und Factory-Intelligenz

```text
PRDs
Roadmaps
Architektur
Task Design
Policy Design
Governance
Strategische Entscheidungen
Risk Evaluation
Evolution Rules
Factory Design
```

---

## Claude optimiert auf:

| Ziel | Wichtigkeit |
|---|---|
| strategische Qualität | maximal |
| Kontexttiefe | maximal |
| Architektur-Kohärenz | maximal |
| langfristige Konsistenz | maximal |
| technische Produktion | sekundär |

---

# 4. Codex Responsibilities

Codex ist verantwortlich für:

## operative Produktionsarbeit

```text
Code schreiben
Tests schreiben
Refactors
Debugging
CI Fixes
PR Erstellung
Validation ausführen
Repository verändern
```

---

## Codex optimiert auf:

| Ziel | Wichtigkeit |
|---|---|
| Geschwindigkeit | maximal |
| Task Completion | maximal |
| lokale Codequalität | hoch |
| Tool Usage | hoch |
| Repository Operationen | maximal |
| Architekturstrategie | niedrig |

---

# 5. Kritische Erkenntnis

Codex sollte:

# niemals das strategische Leitsystem sein.

Warum?

Weil:
- operative Modelle zu lokal optimieren
- Architekturdrift erzeugen
- Scope erweitern
- technische „Cleverness“ priorisieren
- langfristige Konsistenz verlieren

---

# 6. Deshalb gilt

## Claude bestimmt:
- Richtung
- Architektur
- Policies
- Tasksystem
- Grenzen
- Governance

## Codex bestimmt:
- konkrete Umsetzung innerhalb dieser Grenzen

---

# 7. Claude Kontextmodell

Claude arbeitet primär mit:

```text
Dokumenten
Policies
PRDs
Task Graphs
Factory Reports
Architecture Files
```

Nicht primär mit:
- großen Codebases
- tausenden Dateien
- kompletten Repositories

---

# 8. Codex Kontextmodell

Codex arbeitet primär mit:

```text
lokalem Repository-Kontext
Task Files
Changed Files
CI Output
Tool Calls
```

Codex ist:

# repository-native.

Das ist seine eigentliche Stärke.

---

# 9. Claude → Codex Übergabe

Claude erzeugt:

```text
Policies
PRDs
Architecture Specs
Task Graphs
Task Files
Execution Rules
Validation Rules
```

Codex konsumiert diese Artefakte.

---

# 10. Wichtigster Architekturpunkt

## Claude spricht idealerweise NICHT direkt mit dem Code.

Sondern:

```text
Claude
→ Factory Artifacts
→ Codex
→ Repository
```

Das ist massiv skalierbarer.

---

# 11. Empfohlenes Übergabeformat

## Claude erzeugt:

### A. Strukturierte Specs

Beispiel:

```text
bootstrap-engine-specification-v0.1.md
planning-engine-specification-v0.1.md
```

---

### B. Policies

```text
autonomy-policy.md
architecture-policy.md
```

---

### C. Task Files

```yaml
id: ui.dashboard.metric-card
type: ui-component
risk:
  level: low
autonomy:
  level: A3
```

---

### D. Open Questions

```text
.factory/product/open-questions.md
```

---

# 12. Codex Arbeitsweise

Codex arbeitet idealerweise:

```text
task-basiert
```

Nicht:

```text
"Arbeite einfach autonom weiter."
```

Warum?

Task-Boundaries reduzieren:
- Drift
- Halluzination
- Scope Expansion
- Architekturprobleme

massiv.

---

# 13. Optimales Factory Pattern

## Claude macht:

```text
macro-planning
```

## Codex macht:

```text
micro-execution
```

Das ist vermutlich das stärkste mögliche Kombinationsmodell.

---

# 14. Kontextgrößen-Strategie

## Claude

Claude sollte:
- weniger Dateien
- dafür höhere Abstraktion
- höhere Verdichtung
- höhere strategische Tiefe

sehen.

---

## Codex

Codex sollte:
- konkrete lokale Dateien
- direkten Repo-Zugriff
- Tool-Zugriff
- CI-Output
- Git-Kontext

sehen.

---

# 15. Review-Modell

## Claude reviewt:
- Architektur
- Policies
- strategische Konsistenz
- Factory Design
- Risky Changes

---

## Codex reviewt:
- lokale Codequalität
- Tests
- Build Errors
- PRs
- Validation
- Lint/Type Errors

---

# 16. Evolution-Modell

## Claude entwickelt:
- die Factory

## Codex entwickelt:
- das Produkt

Das ist extrem wichtig.

---

# 17. Claude sollte NICHT

Claude sollte möglichst nicht:

- direkt große Refactors schreiben
- riesige Codepatches erzeugen
- komplette Features manuell implementieren
- CI-Debugging operativ durchführen

Warum?

Das verschwendet:
- Kontext
- strategische Kapazität
- Planungstiefe

---

# 18. Codex sollte NICHT

Codex sollte möglichst nicht:

- Produktvision definieren
- Architektur neu entwerfen
- Policies verändern
- Governance definieren
- Autonomiegrenzen festlegen
- Scope erweitern

---

# 19. Factory Idealzustand

## Claude erzeugt:

```text
das Betriebssystem
```

## Codex betreibt:

```text
die Produktionsmaschine
```

---

# 20. Konkreter Ziel-Workflow

## Phase A — Claude

Claude erstellt:

```text
PRD
Roadmap
Policies
Task Graph
Task Files
```

---

## Phase B — Codex

Codex:

```text
nimmt task file
→ erstellt branch
→ implementiert
→ validiert
→ erstellt PR
```

---

## Phase C — Validation Engine

Validation entscheidet:

```text
auto-merge
oder
human gate
```

---

# 21. Kritische operative Regel

## Claude und Codex dürfen niemals dieselbe Rolle gleichzeitig besitzen.

Sonst entstehen:
- widersprüchliche Entscheidungen
- Governance Drift
- inkonsistente Architektur
- Scope Expansion

---

# 22. Empfohlenes Kommunikationsmodell

Nicht:

```text
Claude ↔ Codex Dauerchat
```

Sondern:

# artifact-based communication.

Das ist entscheidend.

---

# 23. Warum Artifact-Based besser ist

Artefakte sind:

- versionierbar
- reviewbar
- testbar
- reproduzierbar
- CI-fähig
- GitHub-native

Chats sind das nicht.

---

# 24. Das eigentliche Zielbild

Langfristig entsteht:

```text
Human
→ Claude
→ Factory Artifacts
→ Codex Workers
→ Validation
→ Product
```

Nicht:

```text
Human
→ riesiger autonomer AI-Agent
```

Das zweite Modell ist deutlich instabiler.

---

# 25. Wichtigste Erkenntnis des gesamten Projekts

Die stärkste AI-Factory entsteht wahrscheinlich nicht durch:

- das beste Modell
- den größten Kontext
- den autonomsten Agenten

Sondern durch:

# klare Systemrollen + starke Artefakte + starke Validation.

Das ist wahrscheinlich die eigentliche Meta-Erkenntnis hinter dem gesamten Projekt.
