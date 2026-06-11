"use client";

import type { MvpSliceState } from "@/lib/pipeline";

const FIELDS = [
  { key: "promise", label: "MVP promise", rows: 3 },
  { key: "firstVisibleGoal", label: "First visible goal", rows: 2 },
  { key: "retentionSignal", label: "Retention signal", rows: 2 },
] as const;

export default function MvpSlice({
  value,
  onChange,
}: {
  value: MvpSliceState;
  onChange: (patch: Partial<MvpSliceState>) => void;
}) {
  return (
    <section id="mvp-slice" className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
          Step 6 — MVP slice
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          One thin slice, one visible goal
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Phrase the promise for your idea — these fields go verbatim into the
          handoff pack.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-blue-400/30 bg-blue-400/[0.07] p-5 lg:col-span-2">
          {FIELDS.map(({ key, label, rows }) => (
            <label key={key} className="mb-5 block text-sm last:mb-0">
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-200">
                {label}
              </span>
              <textarea
                value={value[key]}
                onChange={(event) => onChange({ [key]: event.target.value })}
                rows={rows}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-7 text-slate-200 focus:border-blue-400/60 focus:outline-none"
              />
            </label>
          ))}
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Non-goals
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
            {value.nonGoals.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-slate-500">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
