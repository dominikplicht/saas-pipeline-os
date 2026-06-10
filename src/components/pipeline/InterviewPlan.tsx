import { DM_TEMPLATE, EVIDENCE_RECORD_TEMPLATE, INTERVIEW_QUESTIONS } from "@/lib/pipeline";

export default function InterviewPlan() {
  return (
    <section id="interview-plan" className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
          Step 5 — Interview / DM plan
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Talk to 5–10 people from the primary segment
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Ready-to-adapt outreach and interview material. Record every
          conversation as an evidence record — verdicts, not vibes.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h3 className="font-semibold text-slate-200">DM template</h3>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-950 px-4 py-3 font-mono text-xs leading-6 text-blue-100">
            {DM_TEMPLATE}
          </pre>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h3 className="font-semibold text-slate-200">Evidence record template</h3>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-950 px-4 py-3 font-mono text-xs leading-6 text-blue-100">
            {EVIDENCE_RECORD_TEMPLATE}
          </pre>
        </article>
      </div>

      <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h3 className="font-semibold text-slate-200">Pain interview questions</h3>
        <ol className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
          {INTERVIEW_QUESTIONS.map((question, index) => (
            <li key={question} className="flex gap-3">
              <span className="font-semibold text-blue-200">{index + 1}.</span>
              <span>{question}</span>
            </li>
          ))}
        </ol>
      </article>
    </section>
  );
}
