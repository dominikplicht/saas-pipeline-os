"use client";

import { WEAK_SIGNALS } from "@/lib/pipeline";

export default function FakePainCheck({
  risks,
  evidence,
}: {
  risks: string[];
  evidence: string[];
}) {
  return (
    <section id="fake-pain" className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-300">
          Step 4 — Fake-pain check
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Would you bet a build on this evidence?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Before any code: list what could make this pain fake, which signals
          don&apos;t count, and what evidence is required to proceed.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.06] p-5">
          <h3 className="font-semibold text-rose-100">⚠ Fake-pain risks</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-rose-100/85">
            {risks.map((risk) => (
              <li key={risk} className="flex gap-2">
                <span className="text-rose-300">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h3 className="font-semibold text-slate-200">Weak signals (don&apos;t count)</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-400">
            {WEAK_SIGNALS.map((signal) => (
              <li key={signal} className="flex gap-2">
                <span className="text-slate-500">✕</span>
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-5">
          <h3 className="font-semibold text-emerald-100">Required evidence</h3>
          <ol className="mt-3 space-y-2 text-sm leading-6 text-emerald-100/85">
            {evidence.map((item, index) => (
              <li key={item} className="flex gap-2">
                <span className="font-semibold text-emerald-300">{index + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}
