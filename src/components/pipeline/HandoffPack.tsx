"use client";

import { useState } from "react";

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "product"
  );
}

export default function HandoffPack({
  markdown,
  productName,
}: {
  markdown: string;
  productName: string;
}) {
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

  function downloadMarkdown() {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${slugify(productName)}-pre-factory-validation-pack.md`;
    anchor.click();
    URL.revokeObjectURL(url);
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
            Generated live from your inputs above. Copy or download the Markdown
            and put it into <code className="text-blue-200">.factory/product/</code> of
            a new blueprint repo, or hand it to your agent to generate the PRD
            and task graph.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={copyToClipboard}
            className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-emerald-300"
          >
            {copied ? "✓ Copied" : "Copy Markdown"}
          </button>
          <button
            type="button"
            onClick={downloadMarkdown}
            className="rounded-full border border-emerald-400/40 px-5 py-2.5 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/10"
          >
            Download .md
          </button>
        </div>
      </div>

      <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-2xl border border-emerald-400/20 bg-slate-950 p-6 font-mono text-xs leading-6 text-slate-300">
        {markdown}
      </pre>
    </section>
  );
}
