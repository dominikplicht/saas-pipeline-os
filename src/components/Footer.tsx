import { SITE } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      aria-label="Site footer"
      className="border-t border-white/10 bg-slate-950 px-6 py-6 text-center text-sm text-slate-400 sm:px-8 lg:px-10"
    >
      <span>© {year} {SITE.name}</span>
      <span className="mx-3 text-white/20">·</span>
      <span>{SITE.tagline}</span>
      <span className="mx-3 text-white/20">·</span>
      <a
        href="https://github.com/dominikplicht/development-factory-blueprint/blob/main/docs/factory/USING-THE-BLUEPRINT.md"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline-offset-2 hover:underline"
      >
        Blueprint docs
      </a>
      <p className="mt-2 text-xs text-slate-600">Built autonomously by the Development Factory.</p>
    </footer>
  );
}
