const PIPELINE_STEPS = [
  { label: "Raw idea", detail: "Paste an unfiltered SaaS idea" },
  { label: "Target segment", detail: "Identify who has the problem" },
  { label: "Concrete pain", detail: "Score frequency, intensity, willingness to pay" },
  { label: "Evidence", detail: "Fake-pain check and interview plan" },
  { label: "MVP scope", detail: "One thin slice with a visible goal" },
  { label: "Factory handoff", detail: "Pre-Factory Validation Pack for the Development Factory" },
] as const;

export default function PipelineOverview() {
  return (
    <section id="pipeline" className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
          The pipeline
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          From raw idea to Development Factory handoff
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Every idea moves through the same evidence-driven stages. No stage is
          skipped: the pipeline forces target segment and pain validation before
          anything is built.
        </p>
      </div>

      <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {PIPELINE_STEPS.map((step, index) => (
          <li
            key={step.label}
            className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-400/10 text-sm font-semibold text-blue-200">
              {index + 1}
            </span>
            <div>
              <h3 className="font-semibold text-white">{step.label}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-400">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
