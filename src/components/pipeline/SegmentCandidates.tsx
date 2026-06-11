"use client";

import type { SegmentCandidate } from "@/lib/pipeline";

const DIMENSIONS = [
  { key: "role", label: "Role" },
  { key: "context", label: "Context" },
  { key: "urgency", label: "Urgency" },
  { key: "abilityToPay", label: "Ability to pay" },
  { key: "accessibility", label: "Accessibility" },
  { key: "currentWorkaround", label: "Current workaround" },
] as const;

export default function SegmentCandidates({
  segments,
  selectedIndex,
  onSelect,
}: {
  segments: SegmentCandidate[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
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
          Pick the primary segment for your idea — it goes into the handoff
          pack. The pipeline never continues with “everyone”.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {segments.map((segment, index) => {
          const selected = index === selectedIndex;
          return (
            <article
              key={segment.name}
              className={`flex flex-col rounded-2xl border p-5 ${
                selected
                  ? "border-blue-400/40 bg-blue-400/[0.07]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{segment.name}</h3>
                {selected ? (
                  <span className="rounded-full bg-blue-400/15 px-2.5 py-1 text-xs font-semibold text-blue-200">
                    Primary
                  </span>
                ) : null}
              </div>
              <dl className="mt-4 flex-1 space-y-3 text-sm">
                {DIMENSIONS.map(({ key, label }) => (
                  <div key={key}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {label}
                    </dt>
                    <dd className="mt-0.5 leading-6 text-slate-300">{segment[key]}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                onClick={() => onSelect(index)}
                disabled={selected}
                className="mt-5 rounded-full border border-blue-400/40 px-4 py-2 text-sm font-medium text-blue-200 transition hover:bg-blue-400/10 disabled:cursor-default disabled:border-white/10 disabled:text-slate-500"
              >
                {selected ? "Selected as primary" : "Set as primary segment"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
