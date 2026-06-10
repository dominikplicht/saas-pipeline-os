# Product Intent

- **Product name:** SaaS Pipeline OS

- **Problem / purpose (1–3 sentences):**
  AI-native builders can generate many SaaS ideas, but the path from raw idea to validated pain, scoped MVP, GitHub execution, and first GTM test is fragmented. SaaS Pipeline OS structures this path into a repeatable, evidence-driven workflow that prevents premature building and produces Development Factory-ready handoff artifacts.

- **Target users:**
  - Primary: Dominik as an AI-native solo builder using Notion, ChatGPT/Codex, GitHub, Vercel, and the Development Factory Blueprint.
  - Secondary: solo founders and small AI-native teams that want to validate and ship SaaS ideas quickly without losing discipline between problem discovery and implementation.

- **Core capabilities (3–6, prioritized):**
  1. Raw idea intake with structured opportunity brief.
  2. Target segment generation and prioritization.
  3. Pain statement generation with scoring and fake-pain checks.
  4. Interview/DM plan generation for 5–10 qualified users.
  5. MVP slice definition and Pre-Factory Validation Pack generation.
  6. Development Factory handoff export for Product Intent, PRD, Roadmap, Feature Map, Task Graph, and Ready Tasks.

- **Non-goals (explicitly out of scope):**
  - Multi-user SaaS accounts.
  - Authentication.
  - Billing/subscriptions.
  - CRM automation.
  - Automated outbound sending.
  - Direct Notion/GitHub write integration in v0.
  - Fully autonomous product creation without human gates.
  - Broad marketplace, analytics warehouse, or general startup operating system.

- **Tech constraints:**
  Next.js 16 + TypeScript + Tailwind by default. Prefer local/static state for v0. Add backend only when user persistence, integrations, or multi-session state become validated needs.

- **First visible goal (the first feature you want to see in the Vercel preview):**
  A polished single-page MVP where a user pastes a raw SaaS idea and sees a structured pipeline output: target segment candidates, pain statements, scorecard, interview plan, MVP slice, and copyable Pre-Factory Validation Pack.
