# Codex Start Prompt — SaaS Pipeline OS

/goal
Instantiate and build **SaaS Pipeline OS** as the first product created from the Development Factory Blueprint.

## Context

The product repo should be created from `dominikplicht/development-factory-blueprint`.

Product name:
SaaS Pipeline OS

Primary purpose:
Help an AI-native builder convert raw SaaS ideas into target segment definitions, concrete pain statements, validation plans, MVP scopes, and Development Factory handoff artifacts.

## Critical principle

Problem validation before MVP.
Retention before scaling.
Smallest valuable workflow before full SaaS.

## Required first steps

1. Verify this is a product repository copied from the blueprint, not the blueprint itself.
2. Run or confirm:
   `scripts/factory/new-product.sh "SaaS Pipeline OS"`
3. Apply the product artifacts from this pack:
   - `.factory/product/product-intent.md`
   - `.factory/product/prd.md`
   - `.factory/product/roadmap.md`
   - `.factory/product/feature-map.md`
   - `.factory/product/open-questions.md`
   - `.factory/product/validation-evidence.md`
   - `.factory/tasks/task-graph.yaml`
   - `.factory/tasks/ready/*.yaml`
4. Execute ready tasks one by one.
5. Use one branch and one PR per task.
6. Do not modify Factory OS files unless a governance task explicitly allows it.

## First implementation target

Build a Vercel-previewable single-page MVP with:
- product positioning
- raw idea intake
- target segment candidates
- pain scorecard
- fake-pain check
- interview plan
- MVP slice
- copyable Pre-Factory Validation Pack

## Scope exclusions for v0

Do not add:
- auth
- billing
- database
- Notion writes
- GitHub writes
- automated outbound
- full AI integration

Use static/sample data first. Add interactivity only where low-risk and local.
