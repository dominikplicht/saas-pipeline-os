# Roadmap — SaaS Pipeline OS

## Phase 0 — Product instantiation

- Create product repo from Development Factory Blueprint.
- Run `scripts/factory/new-product.sh "SaaS Pipeline OS"`.
- Copy product planning artifacts from this pack.
- Validate clean baseline.

## Phase 1 — Static guided MVP

Goal: show the complete pipeline flow with static/sample output.

Tasks:
1. Build landing/dashboard skeleton.
2. Add raw idea intake form.
3. Add target segment and pain scorecard sections.
4. Add fake-pain and interview plan sections.
5. Add copyable Pre-Factory Validation Pack output.

Expected result:
A Vercel preview demonstrates the end-to-end validation workflow without backend or AI integration.

## Phase 2 — Local interactive workflow

Goal: make the pipeline editable in-browser.

Tasks:
1. Store form state locally.
2. Allow user to select target segment.
3. Recalculate pain score from inputs.
4. Generate handoff Markdown client-side from templates.
5. Add export/copy actions.

Expected result:
User can adapt the output to a specific idea without changing code.

## Phase 3 — AI-assisted generation

Goal: integrate AI generation behind explicit human gates.

Tasks:
1. Add prompt templates for segment generation.
2. Add prompt templates for pain scoring.
3. Add prompt templates for MVP scope and handoff.
4. Add model integration only after v0 UI workflow is validated.

Expected result:
The app can generate first-draft outputs but still requires user selection and confirmation.

## Phase 4 — Tool integration

Goal: connect to the broader operating system.

Candidate integrations:
- Notion read/write for Ideenbox and SaaS Pipeline records.
- GitHub issue/PR creation.
- Vercel preview links.
- Development Factory task generation.

Gate:
Only after repeated use shows that manual copy/paste is the main bottleneck.
