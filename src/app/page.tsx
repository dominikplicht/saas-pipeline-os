import { SITE } from "@/lib/site";
import Footer from "@/components/Footer";

const setupSteps = [
  {
    number: "01",
    title: "Create product repository",
    description:
      "Use this blueprint as a template, clone the new product repo, and confirm GitHub Actions are enabled on main.",
    checks: ["Template copy created", "Default branch is main", "Actions enabled"],
  },
  {
    number: "02",
    title: "Instantiate metadata",
    description:
      "Run the product bootstrap script once so site metadata, package metadata, task graph, and empty state folders are aligned.",
    command: 'scripts/factory/new-product.sh "Product Name"',
    checks: ["src/lib/site.ts updated", "task graph reset", "ready tasks and runs clean"],
  },
  {
    number: "03",
    title: "Define product intent",
    description:
      "Fill the product-intent stub with the problem, users, core capabilities, non-goals, constraints, and first visible goal.",
    file: ".factory/product/product-intent.md",
    checks: ["Problem captured", "Users defined", "First visible goal clear"],
  },
  {
    number: "04",
    title: "Generate planning artifacts",
    description:
      "Ask the planner to generate PRD, roadmap, feature map, open questions, task graph, and first ready tasks.",
    checks: ["PRD generated", "Task graph populated", "Ready tasks scoped"],
  },
  {
    number: "05",
    title: "Connect delivery infrastructure",
    description:
      "Connect the product repo to Vercel or your selected preview platform and verify PR previews before autonomous work starts.",
    checks: ["Vercel project connected", "PR preview works", "Secrets and kill-switches configured"],
  },
  {
    number: "06",
    title: "Validate clean baseline",
    description:
      "Run the required checks before feature work begins and confirm no stale blueprint state remains.",
    command: "npm ci && npm run typecheck && npm run lint && npm run test && npm run build",
    checks: ["Validation green", "No stale product names", "No stale ready tasks"],
  },
];

const factoryLayers = [
  {
    title: "Factory OS",
    description: "Policies, validation, workflows, runtime docs, and reusable factory rules.",
    paths: [".factory/policies/", ".factory/validation/", ".github/workflows/", "docs/factory/"],
  },
  {
    title: "Product scaffold",
    description: "Neutral Next.js foundation and replaceable product metadata.",
    paths: ["src/app/", "src/lib/site.ts", "package.json", "next.config.*"],
  },
  {
    title: "Product instance state",
    description: "Generated after product intent exists: PRD, task graph, ready tasks, and run records.",
    paths: [".factory/product/", ".factory/tasks/task-graph.yaml", ".factory/tasks/ready/", ".factory/runs/"],
  },
];

export default function Home() {
  return (
    <>
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10">
        <header className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
              {SITE.tagline}
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Development Factory Blueprint
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                A neutral product scaffold plus a governed AI development workflow.
                Start with product intent, generate the plan, validate the baseline,
                then build through scoped pull requests and reviewable Vercel previews.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href="#instantiation"
                className="rounded-full bg-white px-5 py-2.5 font-medium text-slate-950 transition hover:bg-blue-100"
              >
                Start checklist
              </a>
              <a
                href="#layers"
                className="rounded-full border border-white/15 px-5 py-2.5 font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/5"
              >
                View blueprint layers
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Operating model
            </h2>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              {[
                "Product vision",
                "Product intent",
                "PRD + roadmap + feature map",
                "Task graph + ready tasks",
                "Scoped PRs + CI validation",
                "Review or auto-merge where available",
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-400/10 text-xs font-semibold text-blue-200">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </header>

        <section id="instantiation" className="space-y-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
                Template Instantiation Checklist
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                First steps before product work starts
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              This visible scaffold mirrors the first phases from
              docs/factory/TEMPLATE-INSTANTIATION-CHECKLIST.md so every new repo
              starts cleanly before agents generate tasks.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {setupSteps.map((step) => (
              <article
                key={step.number}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold text-blue-200">
                        Step {step.number}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-xs text-slate-300">
                      {step.number}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">
                    {step.description}
                  </p>
                  {step.command ? (
                    <code className="block overflow-x-auto rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs text-blue-100">
                      {step.command}
                    </code>
                  ) : null}
                  {step.file ? (
                    <code className="block rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs text-blue-100">
                      {step.file}
                    </code>
                  ) : null}
                </div>
                <ul className="mt-5 space-y-2 text-sm text-slate-300">
                  {step.checks.map((check) => (
                    <li key={check} className="flex gap-2">
                      <span className="text-blue-300">✓</span>
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="layers" className="grid gap-4 lg:grid-cols-3">
          {factoryLayers.map((layer) => (
            <article
              key={layer.title}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
            >
              <h3 className="text-lg font-semibold text-white">{layer.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {layer.description}
              </p>
              <div className="mt-4 space-y-2">
                {layer.paths.map((path) => (
                  <code
                    key={path}
                    className="block rounded-lg bg-slate-950 px-3 py-2 text-xs text-slate-300"
                  >
                    {path}
                  </code>
                ))}
              </div>
            </article>
          ))}
        </section>

        <footer className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-slate-400">
          <strong className="text-slate-200">Blueprint rule:</strong> product-specific
          routes, ready tasks, run records, and decisions are generated only after
          instantiation. Keep examples under docs/factory/examples/ and keep active
          product state out of the blueprint baseline.
        </footer>
      </section>
    </main>
    <Footer />
    </>
  );
}
