const OUT_OF_SCOPE = [
  "Authentication or user accounts",
  "Billing and subscriptions",
  "Backend or database persistence",
  "AI model integration",
  "Notion or GitHub write integrations",
  "CRM or outreach automation",
] as const;

export default function ScopeGuard() {
  return (
    <section
      id="scope-guard"
      className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-6"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/15 text-base">
          🛡️
        </span>
        <h2 className="text-lg font-semibold text-amber-100">v0 scope guard</h2>
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-amber-100/80">
        v0 is a single-user workflow prototype that turns ideas into validation
        and factory handoff artifacts. The following stay out of scope until the
        static workflow proves useful for at least three real idea-processing
        runs:
      </p>
      <ul className="mt-4 grid gap-2 text-sm text-amber-100/90 sm:grid-cols-2 lg:grid-cols-3">
        {OUT_OF_SCOPE.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-amber-300">✕</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
