# Autonomy Policy v0.1

## Default Mode

The Factory works by default in Autonomy Level A3 where permitted by task scope,
validation status, repository settings, and the active GitHub plan.

```text
AI plans -> AI implements -> AI reviews -> CI validates -> merge decision
```

A3 means auto-merge is allowed by Factory policy when all conditions are met. It
does not guarantee that repository-level GitHub auto-merge is available or enabled.

## Autonomy Levels

| Level | Meaning |
|---|---|
| A1 | AI proposes, human decides |
| A2 | AI implements, human merges |
| A3 | AI implements, CI validates, auto-merge may be enabled if repository settings and GitHub plan allow it |

## A3 Allowed For

- UI components
- small bugfixes
- tests
- documentation
- small refactorings
- non-critical API additions
- styling
- performance improvements without architecture change

## Human Gate Required For

- architecture changes
- security-sensitive changes
- infrastructure changes
- secrets
- authentication concepts
- database migrations with data-loss risk
- billing or cost changes
- breaking changes
- public API contract changes

## Hard Rule

Autonomous agents must not perform fundamental architecture rewrites.

## Auto-Merge Conditions

Auto-merge is supported only if:

- the active GitHub plan supports auto-merge for the repository visibility
- repository-level auto-merge is enabled
- task `autonomy.level = A3`
- `human_gate_required = false`
- all required checks are green
- no blocked files were changed
- PR describes task, change, and validation

If GitHub auto-merge is unavailable or disabled, A3 tasks degrade to A2-style human merge after successful validation.
