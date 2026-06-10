import {
  PAIN_STATEMENTS,
  SCORE_LABELS,
  SCORE_WEIGHTS,
  scoreDecision,
  weightedPainScore,
  type ScoreDimension,
} from "@/lib/pipeline";

const DIMENSIONS = Object.keys(SCORE_WEIGHTS) as ScoreDimension[];

export default function PainScorecard() {
  return (
    <section id="pain-scorecard" className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
          Step 3 — Pain scorecard
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Is the pain concrete, frequent, and worth paying for?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Each candidate pain is scored 1–5 on six weighted criteria.
          Decision rule: ≥ 4.0 validate with users · 3.0–3.9 sharpen · &lt; 3.0 park.
        </p>
      </div>

      <div className="space-y-4">
        {PAIN_STATEMENTS.map((pain) => {
          const score = weightedPainScore(pain.scores);
          const decision = scoreDecision(score);
          return (
            <article
              key={pain.statement}
              className={`rounded-2xl border p-6 ${
                pain.recommended
                  ? "border-blue-400/40 bg-blue-400/[0.07]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    score >= 4
                      ? "bg-emerald-400/15 text-emerald-200"
                      : score >= 3
                        ? "bg-amber-400/15 text-amber-200"
                        : "bg-rose-400/15 text-rose-200"
                  }`}
                >
                  {score.toFixed(1)} / 5 — {decision}
                </span>
                {pain.recommended ? (
                  <span className="rounded-full bg-blue-400/15 px-2.5 py-1 text-xs font-semibold text-blue-200">
                    Recommended primary pain
                  </span>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-200">{pain.statement}</p>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[36rem] text-left text-sm">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="pb-2 pr-4 font-semibold">Criterion</th>
                      <th className="pb-2 pr-4 font-semibold">Weight</th>
                      <th className="pb-2 pr-4 font-semibold">Score</th>
                      <th className="pb-2 font-semibold">Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {DIMENSIONS.map((dimension) => (
                      <tr key={dimension}>
                        <td className="py-2 pr-4 font-medium text-slate-200">
                          {SCORE_LABELS[dimension]}
                        </td>
                        <td className="py-2 pr-4 text-slate-400">
                          {Math.round(SCORE_WEIGHTS[dimension] * 100)}%
                        </td>
                        <td className="py-2 pr-4 font-semibold text-white">
                          {pain.scores[dimension]}
                        </td>
                        <td className="py-2 leading-6 text-slate-400">
                          {pain.rationale[dimension]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
