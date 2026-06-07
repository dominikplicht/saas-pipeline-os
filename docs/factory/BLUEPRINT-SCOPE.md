# Blueprint Scope

This document defines what belongs to the reusable Development Factory Blueprint and what belongs only to a concrete product instance.

## Purpose

The blueprint must stay product-agnostic. It provides the factory workflow, governance, validation, and neutral application scaffold needed to start new product repositories.

A product instance begins only after the blueprint is copied and instantiated with a concrete product intent.

## Scope layers

### 1. Factory OS

Reusable factory infrastructure. These files should remain stable across product instances and should only change through explicit factory-governance tasks.

```text
.factory/policies/
.factory/validation/
.factory/agents/
.github/workflows/
docs/factory/
scripts/factory/
```

Allowed content:

- autonomy and architecture policies
- validation contracts
- worker/runtime documentation
- reusable prompts and task conventions
- governance rules
- blueprint usage documentation

Not allowed content:

- product-specific requirements
- product-specific ready tasks
- product-specific run records
- product-specific UI decisions
- product-specific data model decisions

### 2. Product scaffold

Neutral application foundation included so a product can start quickly.

```text
src/app/
src/lib/site.ts
package.json
next.config.*
tsconfig.json
postcss.config.*
```

Allowed content:

- neutral landing page
- replaceable product metadata
- baseline Next.js / TypeScript / Tailwind configuration
- generic app structure

Not allowed content in the blueprint baseline:

- product-specific routes beyond the neutral landing page
- product-specific components
- product-specific mock data
- product-specific feature logic

### 3. Product instance state

Planning and execution state created after the blueprint is instantiated for a concrete product.

```text
.factory/product/product-intent.md
.factory/product/prd.md
.factory/product/roadmap.md
.factory/product/feature-map.md
.factory/product/open-questions.md
.factory/tasks/task-graph.yaml
.factory/tasks/ready/
.factory/runs/
```

In the blueprint baseline, this layer should be empty or stub-based.

Allowed content in the blueprint baseline:

- templates
- placeholders
- explicit "not generated yet" markers
- empty task graph
- empty ready-task directory
- empty run-record directory

Not allowed content in the blueprint baseline:

- concrete product PRDs
- concrete product roadmaps
- concrete product feature maps
- ready tasks for a product
- run records from product execution
- unresolved questions tied to a specific product UI or domain

## Boundary rules

1. The blueprint must not assume a specific product domain.
2. The blueprint must not contain product-specific ready tasks.
3. The blueprint must not contain product-specific run records.
4. Product-specific work must start from `product-intent.md` after instantiation.
5. Factory OS changes require explicit governance scope.
6. Product implementation tasks must define allowed files, blocked files, autonomy level, validation, and definition of done.
7. Product-specific examples may exist only under `docs/factory/examples/` and must be labeled as examples.

## Cleanup candidates

Treat the following as cleanup candidates if found in the blueprint baseline:

- old product names
- stale route references
- dashboard-specific tasks
- product-specific open questions
- product-specific mock data
- run records from experiments
- completed task contracts from experiments
- references to unavailable workflows or settings

## Instantiation rule

When creating a real product repository from this blueprint:

1. copy or template the repository
2. run `scripts/factory/new-product.sh "Product Name"`
3. fill `.factory/product/product-intent.md`
4. generate PRD, roadmap, feature map, and task graph
5. create ready tasks from the task graph
6. implement task by task through scoped PRs

After instantiation, product-specific artifacts are expected and should no longer be treated as blueprint pollution.
