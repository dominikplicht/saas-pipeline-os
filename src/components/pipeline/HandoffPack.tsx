"use client";

import { useState } from "react";

export default function HandoffPack({ markdown }: { markdown: string }) {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context); user can select manually.
    }
  }

  return (
    <section id="handoff" className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Step 7 — Development Factory handoff
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Pre-Factory Validation Pack
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Copy this Markdown into <code className="text-blue-200">.factory/product/</code> of
            a new blueprint repo, or hand it to your agent to generate the PRD
            and task graph.
          </p>
        </div>
        <button
          type="button"
          onClick={copyToClipboard}
          className="shrink-0 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-emerald-300"
        >
          {copied ? "✓ Copied" : "Copy Markdown"}
        </button>
      </div>

      <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-2xl border border-emerald-400/20 bg-slate-950 p-6 font-mono text-xs leading-6 text-slate-300">
        {markdown}
      </pre>
    </section>
  );
}
