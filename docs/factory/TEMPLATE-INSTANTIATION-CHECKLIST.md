# Template Instantiation Checklist

Use this checklist when creating a new product repository from the Development Factory Blueprint.

The goal is to separate reusable factory infrastructure from product-specific planning and implementation state.

## 1. Create the product repository

- [ ] Create a new repository from this blueprint.
- [ ] Clone the new product repository locally.
- [ ] Confirm the default branch is `main`.
- [ ] Confirm GitHub Actions are enabled.
- [ ] Confirm branch protection and merge settings match the desired autonomy model.

## 2. Instantiate product metadata

Run once in the new product repository:

```bash
scripts/factory/new-product.sh "Product Name"
```

Then verify:

- [ ] `src/lib/site.ts` contains the product name.
- [ ] `.factory/tasks/task-graph.yaml` is empty and references the product.
- [ ] `.factory/tasks/ready/` contains no stale blueprint or example tasks.
- [ ] `.factory/runs/` contains no stale blueprint or example run records.

## 3. Define product intent

Edit:

```text
.factory/product/product-intent.md
```

Capture:

- [ ] product name
- [ ] problem / purpose
- [ ] target users
- [ ] core capabilities
- [ ] non-goals
- [ ] technical constraints
- [ ] first visible goal

## 4. Generate planning artifacts

Ask the planner to generate or update:

- [ ] `.factory/product/prd.md`
- [ ] `.factory/product/roadmap.md`
- [ ] `.factory/product/feature-map.md`
- [ ] `.factory/product/open-questions.md`
- [ ] `.factory/tasks/task-graph.yaml`
- [ ] `.factory/tasks/ready/*.yaml`

Verify:

- [ ] every ready task exists in the task graph
- [ ] every ready task has allowed files
- [ ] every ready task has blocked files
- [ ] every ready task has autonomy metadata
- [ ] every ready task has validation requirements
- [ ] every ready task has a definition of done

## 5. Connect delivery infrastructure

- [ ] Connect the product repository to Vercel or the selected preview platform.
- [ ] Confirm pull request preview deployments work.
- [ ] Configure required repository secrets if using a headless worker.
- [ ] Configure kill-switch variables for autonomous workflows.
- [ ] Confirm GitHub plan and repository settings support the desired merge behavior.

## 6. Validate the clean baseline

Run locally or through CI:

```bash
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
```

Verify:

- [ ] all required validation checks pass
- [ ] no product-specific stale files remain from the blueprint
- [ ] no old product names remain
- [ ] no stale route references remain
- [ ] no stale ready tasks remain
- [ ] no stale run records remain

## 7. Start implementation

For each task:

- [ ] create one branch
- [ ] implement only within allowed files
- [ ] do not modify blocked files
- [ ] run required validation
- [ ] write or update the run record
- [ ] open one pull request
- [ ] include task ID, scope, changed files, and validation result in the PR body

Expected operating model:

```text
1 task = 1 branch = 1 pull request = 1 validation run = 1 run record
```

## 8. Post-instantiation boundary check

After the first product tasks are generated, confirm that changes are intentional product-instance state, not blueprint pollution.

Acceptable product-instance changes:

- [ ] product-specific PRD
- [ ] product-specific roadmap
- [ ] product-specific feature map
- [ ] product-specific open questions
- [ ] product-specific task graph
- [ ] product-specific ready tasks
- [ ] product-specific app routes and components
- [ ] product-specific run records

Do not modify Factory OS casually:

```text
.factory/policies/
.factory/validation/
.factory/agents/
.github/workflows/
docs/factory/
scripts/factory/
```

Factory OS changes require an explicit governance task.
