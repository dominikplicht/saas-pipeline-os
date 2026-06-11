"use client";

import {
  SCORE_LABELS,
  SCORE_WEIGHTS,
  scoreDecision,
  weightedPainScore,
  type PainStatement,
  type ScoreDimension,
} from "@/lib/pipeline";

const DIMENSIONS = Object.keys(SCORE_WEIGHTS) as ScoreDimension[];
const SCORE_OPTIONS = [1, 2, 3, 4, 5] as const;

export default function PainScorecard({
  pains,
  selectedIndex,
  onSelect,
  onChangeStatement,
  onChangeScore,
}: {
  pains: PainStatement[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onChangeStatement: (index: number, statement: string) => void;
  onChangeScore: (index: number, dimension: ScoreDimension, value: number) => void;
}) {
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
          Rewrite the statements for your idea and score them 1–5 — the weighted
          score recalculates live. Decision rule: ≥ 4.0 validate with users ·
          3.0–3.9 sharpen · &lt; 3.0 park.
        </p>
      </div>

      <div className="space-y-4">
        {pains.map((pain, index) => {
          const selected = index === selectedIndex;
          const score = weightedPainScore(pain.scores);
          const decision = scoreDecision(score);
          return (
            <article
              key={index}
              className={`rounded-2xl border p-6 ${
                selected
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
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  disabled={selected}
                  className="rounded-full border border-blue-400/40 px-3 py-1 text-xs font-semibold text-blue-200 transition hover:bg-blue-400/10 disabled:cursor-default disabled:border-transparent disabled:bg-blue-400/15"
                >
                  {selected ? "Primary pain" : "Set as primary pain"}
                </button>
              </div>

              <label className="mt-4 block text-sm">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Pain statement
                </span>
                <textarea
                  value={pain.statement}
                  onChange={(event) => onChangeStatement(index, event.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-7 text-slate-200 focus:border-blue-400/60 focus:outline-none"
                />
              </label>

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
                        <td className="py-2 pr-4">
                          <div className="flex gap-1" role="radiogroup" aria-label={`${SCORE_LABELS[dimension]} score`}>
                            {SCORE_OPTIONS.map((option) => {
                              const active = pain.scores[dimension] === option;
                              return (
                                <button
                                  key={option}
                                  type="button"
                                  role="radio"
                                  aria-checked={active}
                                  onClick={() => onChangeScore(index, dimension, option)}
                                  className={`h-7 w-7 rounded-md text-xs font-semibold transition ${
                                    active
                                      ? "bg-blue-400 text-slate-950"
                                      : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                                  }`}
                                >
                                  {option}
                                </button>
                              );
                            })}
                          </div>
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
