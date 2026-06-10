# PRD — SaaS Pipeline OS v0.1

## 1. Purpose

SaaS Pipeline OS is a single-user product validation and factory handoff workflow. It helps an AI-native builder convert raw product ideas into structured validation artifacts and Development Factory-ready implementation inputs.

## 2. Problem

The user currently has multiple powerful tools:
- Notion for idea capture
- ChatGPT for reasoning and drafting
- GitHub for implementation
- Vercel for previews
- Development Factory Blueprint for governed MVP execution

However, the transition between these tools is manual and inconsistent. The highest-risk gap is not coding; it is defining the right target user and pain before building.

## 3. Goals

### Product goals
- Force problem validation before MVP build.
- Make target segment and pain definition explicit.
- Convert fuzzy ideas into structured Pre-Factory Validation Packs.
- Prepare Development Factory handoff outputs.
- Reduce prompt dependency by turning the process into a guided workflow.

### User goals
- Evaluate SaaS ideas faster.
- Avoid building too early.
- Produce clearer Product Intent and MVP scope.
- Move promising ideas into GitHub execution with less friction.

## 4. Non-goals

- No production SaaS backend in v0.
- No authentication.
- No billing.
- No automated direct messaging.
- No direct Notion or GitHub API writes in v0.
- No multi-user collaboration.
- No AI model integration in the first UI slice unless separately scoped.

## 5. User journey

```text
User opens SaaS Pipeline OS
→ pastes raw idea
→ reviews generated/templated opportunity brief
→ selects target segment
→ reviews pain statements and scorecard
→ checks fake-pain warnings
→ gets interview/DM plan
→ gets MVP slice
→ copies Pre-Factory Validation Pack
→ uses handoff in Development Factory / Codex
```

## 6. MVP features

### F1 — Idea Intake
A text area for raw idea input and optional source fields.

### F2 — Target Segment Candidates
A section that displays example target segments with scoring dimensions:
- role
- context
- urgency
- ability to pay
- accessibility
- current workaround

### F3 — Pain Statement Scorecard
A section that displays candidate pain statements scored by:
- frequency
- intensity
- willingness to pay
- reachability
- MVP feasibility
- differentiation

### F4 — Fake-Pain Check
A warning module listing weak signals and required evidence.

### F5 — Interview/DM Plan
A generated or static first-version output with:
- DM template
- pain interview questions
- evidence record template

### F6 — Pre-Factory Validation Pack
A copyable Markdown output that includes:
- target segment
- primary pain
- evidence required
- MVP promise
- first visible goal
- non-goals
- retention metric
- Development Factory handoff instructions

## 7. Acceptance criteria

- User can view a complete pipeline output on one page.
- UI explains the process from idea to factory handoff.
- Pre-Factory Validation Pack is copyable.
- Product scope clearly blocks auth, billing, backend, and overbuilding in v0.
- The page works in a Vercel preview.
- Implementation follows Development Factory task boundaries.

## 8. Success metrics

### Validation metrics
- User can turn one idea into a complete handoff in less than 15 minutes.
- User identifies at least one concrete pain statement per idea.
- User can generate a 5–10 person interview plan.

### Product metrics
- At least 3 real ideas are processed through the tool.
- At least 1 idea reaches Development Factory handoff.
- At least 1 MVP task graph is produced from an output.

## 9. Open product risk

The product may become too meta. The MVP must stay anchored to one practical output: a usable handoff for building a validated MVP.
