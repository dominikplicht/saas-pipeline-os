import { SEGMENT_CANDIDATES } from "@/lib/pipeline";

const DIMENSIONS = [
  { key: "role", label: "Role" },
  { key: "context", label: "Context" },
  { key: "urgency", label: "Urgency" },
  { key: "abilityToPay", label: "Ability to pay" },
  { key: "accessibility", label: "Accessibility" },
  { key: "currentWorkaround", label: "Current workaround" },
] as const;

export default function SegmentCandidates() {
  return (
    <section id="segments" className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
          Step 2 — Target segment
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Who exactly has this problem?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Sample candidates for the worked example (SaaS Pipeline OS itself).
          One segment is selected as primary — the pipeline never continues with
          “everyone”.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {SEGMENT_CANDIDATES.map((segment) => (
          <article
            key={segment.name}
            className={`rounded-2xl border p-5 ${
              segment.primary
                ? "border-blue-400/40 bg-blue-400/[0.07]"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{segment.name}</h3>
              {segment.primary ? (
                <span className="rounded-full bg-blue-400/15 px-2.5 py-1 text-xs font-semibold text-blue-200">
                  Primary
                </span>
              ) : null}
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              {DIMENSIONS.map(({ key, label }) => (
                <div key={key}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {label}
                  </dt>
                  <dd className="mt-0.5 leading-6 text-slate-300">{segment[key]}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
