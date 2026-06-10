"use client";

import { useState } from "react";

export default function IdeaIntake() {
  const [idea, setIdea] = useState("");
  const [source, setSource] = useState("");
  const [context, setContext] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
          Unfiltered is fine. The pipeline sharpens it — the next step is always
          defining the target segment and the concrete pain, never building.
        </p>
      </div>

      <form
        className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <label className="block text-sm">
          <span className="font-medium text-slate-200">Raw idea</span>
          <textarea
            value={idea}
            onChange={(event) => {
              setIdea(event.target.value);
              setSubmitted(false);
            }}
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
              value={source}
              onChange={(event) => setSource(event.target.value)}
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
              value={context}
              onChange={(event) => setContext(event.target.value)}
              placeholder="e.g. recurring problem in my weekly workflow"
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-400/60 focus:outline-none"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={idea.trim().length === 0}
            className="rounded-full bg-blue-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-500"
          >
            Start validation pipeline
          </button>
          <p className="text-xs text-slate-500">
            v0 shows a guided sample pipeline below — generation comes later,
            after the workflow itself is validated.
          </p>
        </div>

        {submitted ? (
          <p className="rounded-xl border border-blue-400/20 bg-blue-400/10 px-4 py-3 text-sm text-blue-100">
            Idea captured locally. Next: review the target segment candidates and
            pain scorecard below and adapt them to your idea.
          </p>
        ) : null}
      </form>
    </section>
  );
}
