"use client";

export interface IdeaIntakeValue {
  productName: string;
  idea: string;
  source: string;
  context: string;
}

export default function IdeaIntake({
  value,
  onChange,
  onGenerate,
  generating,
  error,
}: {
  value: IdeaIntakeValue;
  onChange: (patch: Partial<IdeaIntakeValue>) => void;
  onGenerate: () => void;
  generating: boolean;
  error: string | null;
}) {
  return (
    <section id="idea-intake" className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
          Step 1 — Idea intake
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Paste your raw SaaS idea
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Unfiltered is fine. Everything you type here flows straight into the
          Pre-Factory Validation Pack at the bottom — the next step is always
          defining the target segment and the concrete pain, never building.
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-slate-200">Working title</span>
            <input
              type="text"
              value={value.productName}
              onChange={(event) => onChange({ productName: event.target.value })}
              placeholder="e.g. SaaS Pipeline OS"
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-400/60 focus:outline-none"
            />
          </label>
        </div>

        <label className="block text-sm">
          <span className="font-medium text-slate-200">Raw idea</span>
          <textarea
            value={value.idea}
            onChange={(event) => onChange({ idea: event.target.value })}
            rows={5}
            placeholder="e.g. A tool that turns Notion idea-box entries into validated MVP scopes with GitHub-ready task plans…"
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-400/60 focus:outline-none"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-slate-200">
              Source <span className="font-normal text-slate-500">(optional)</span>
            </span>
            <input
              type="text"
              value={value.source}
              onChange={(event) => onChange({ source: event.target.value })}
              placeholder="e.g. Notion Ideenbox, customer call, own friction"
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-400/60 focus:outline-none"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-200">
              Context <span className="font-normal text-slate-500">(optional)</span>
            </span>
            <input
              type="text"
              value={value.context}
              onChange={(event) => onChange({ context: event.target.value })}
              placeholder="e.g. recurring problem in my weekly workflow"
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-400/60 focus:outline-none"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onGenerate}
            disabled={generating || value.idea.trim().length === 0}
            className="rounded-full bg-blue-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-500"
          >
            {generating ? "Generating pipeline…" : "✦ Generate pipeline with AI"}
          </button>
          <a
            href="#segments"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/5"
          >
            Or adapt manually ↓
          </a>
          <p className="text-xs text-slate-500">
            AI drafts the validation content for your idea — you review, edit,
            and decide. Inputs are stored only in your browser.
          </p>
        </div>

        {generating ? (
          <p className="rounded-xl border border-blue-400/20 bg-blue-400/10 px-4 py-3 text-sm text-blue-100">
            Claude is analyzing your idea — segments, pain scoring, interview
            plan, and MVP slice. This can take a minute.
          </p>
        ) : null}

        {error ? (
          <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}
