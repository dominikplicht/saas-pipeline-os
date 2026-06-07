# Development Factory Blueprint

A reusable blueprint for building product prototypes with an AI-assisted Development Factory.

This repository is not a product implementation. It is a neutral scaffold plus a governed factory workflow for turning a product idea into scoped tasks, pull requests, CI-validated changes, and reviewable previews.

## What this is

This repo provides a reusable starting point for new product ideas.

It includes:

- a neutral Next.js / TypeScript / Tailwind scaffold
- product-intent, PRD, roadmap, feature-map, and task-graph conventions
- autonomy and architecture policies for AI-assisted development
- validation rules for typecheck, lint, test, and build
- GitHub Actions workflows for factory validation
- documentation for instantiating and operating the blueprint

The intended workflow is:

```text
product vision
→ product intent
→ PRD
→ roadmap
→ feature map
→ task graph
→ ready tasks
→ scoped PRs
→ CI validation
→ review or auto-merge where available
```

## What this is not

This repo is not:

- a finished SaaS product
- a TaskPilot-specific implementation
- a dashboard-only prototype
- a backend/auth/billing starter kit
- a place for product-specific tasks before instantiation

Product-specific features, data models, routes, tasks, and decisions are generated only after the blueprint is copied and instantiated for a concrete product.

## How the factory works

The factory turns product intent into small, reviewable implementation units.

Each meaningful change should follow this pattern:

```text
1 task = 1 branch = 1 pull request = 1 validation run = 1 run record
```

Low-risk changes may run in autonomy level A3 when allowed by policy, CI, repository settings, and the active GitHub plan. Higher-risk changes require a human gate.

See:

- `.factory/policies/autonomy-policy.md`
- `.factory/policies/architecture-policy.md`
- `.factory/validation/required-checks.yaml`

## Repository layers

The repository has three conceptual layers.

### 1. Factory OS

Reusable factory infrastructure that should stay stable across products:

```text
.factory/policies/
.factory/validation/
.factory/agents/
.github/workflows/
docs/factory/
scripts/factory/
```

### 2. Product scaffold

Neutral app foundation that can be adapted when a product is instantiated:

```text
src/app/
src/lib/site.ts
package.json
tailwind / typescript / next config
```

### 3. Product instance state

Product-specific planning and execution state. In the blueprint itself, this should be empty or stub-based:

```text
.factory/product/
.factory/tasks/task-graph.yaml
.factory/tasks/ready/
.factory/runs/
```

## Getting started

### 1. Create a product repository

Use this repository as a template or copy it into a new product repository.

### 2. Instantiate the product

Run:

```bash
scripts/factory/new-product.sh "My Product Name"
```

This sets the product name, clears example task state, and prepares the repo for a concrete product idea.

### 3. Define product intent

Edit:

```text
.factory/product/product-intent.md
```

Describe:

- product name
- problem / purpose
- target users
- core capabilities
- non-goals
- technical constraints
- first visible goal

### 4. Generate planning artifacts

Ask the planner to generate:

```text
.factory/product/prd.md
.factory/product/roadmap.md
.factory/product/feature-map.md
.factory/tasks/task-graph.yaml
.factory/tasks/ready/*.yaml
```

### 5. Build through scoped PRs

Implementation should proceed task by task.

Each task should define:

- allowed files
- blocked files
- autonomy level
- validation requirements
- definition of done

## What to edit per product

These files are expected to change when the blueprint is instantiated:

```text
src/lib/site.ts
.factory/product/product-intent.md
.factory/product/prd.md
.factory/product/roadmap.md
.factory/product/feature-map.md
.factory/product/open-questions.md
.factory/tasks/task-graph.yaml
.factory/tasks/ready/
.factory/runs/
```

Application files under `src/` may change as product features are implemented.

## What not to edit casually

These files define the reusable factory and should only change through explicit factory-governance tasks:

```text
.factory/policies/
.factory/validation/
.factory/agents/
.github/workflows/
docs/factory/
scripts/factory/
```

Changes to these areas should usually require a human gate unless explicitly marked as safe.

## Validation

The default validation commands are:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Required and optional checks are defined in:

```text
.factory/validation/required-checks.yaml
```

GitHub Actions runs validation for pull requests and pushes to `main`.

## Key documents

Start here:

- `docs/factory/USING-THE-BLUEPRINT.md`
- `docs/factory/BLUEPRINT-SCOPE.md`
- `docs/factory/TEMPLATE-INSTANTIATION-CHECKLIST.md`

Factory governance:

- `.factory/policies/autonomy-policy.md`
- `.factory/policies/architecture-policy.md`
- `.factory/validation/required-checks.yaml`

Examples:

- `docs/factory/examples/`

Product planning stubs:

- `.factory/product/product-intent.md`
- `.factory/product/prd.md`
- `.factory/product/roadmap.md`
- `.factory/product/feature-map.md`
- `.factory/product/open-questions.md`

## Current blueprint state

The blueprint should not contain product-specific ready tasks.

Expected default state:

```text
.factory/tasks/task-graph.yaml     # empty task graph
.factory/tasks/ready/              # empty until product planning creates tasks
.factory/runs/                     # empty until tasks are executed
```

If product-specific ready tasks, run records, routes, or decisions exist in the blueprint repository, treat them as cleanup candidates unless they are intentionally stored as examples under `docs/factory/examples/`.
