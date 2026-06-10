import { MVP_SLICE } from "@/lib/pipeline";

export default function MvpSlice() {
  return (
    <section id="mvp-slice" className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
          Step 6 — MVP slice
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          One thin slice, one visible goal
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-blue-400/30 bg-blue-400/[0.07] p-5 lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-blue-200">
            MVP promise
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-200">{MVP_SLICE.promise}</p>
          <h3 className="mt-5 text-xs font-semibold uppercase tracking-wide text-blue-200">
            First visible goal
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-200">
            {MVP_SLICE.firstVisibleGoal}
          </p>
          <h3 className="mt-5 text-xs font-semibold uppercase tracking-wide text-blue-200">
            Retention signal
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-200">
            {MVP_SLICE.retentionSignal}
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Non-goals
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
            {MVP_SLICE.nonGoals.map((item) => (
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
