import { SITE } from "@/lib/site";
import Footer from "@/components/Footer";
import FakePainCheck from "@/components/pipeline/FakePainCheck";
import IdeaIntake from "@/components/pipeline/IdeaIntake";
import InterviewPlan from "@/components/pipeline/InterviewPlan";
import MvpSlice from "@/components/pipeline/MvpSlice";
import PainScorecard from "@/components/pipeline/PainScorecard";
import PipelineOverview from "@/components/pipeline/PipelineOverview";
import ScopeGuard from "@/components/pipeline/ScopeGuard";
import SegmentCandidates from "@/components/pipeline/SegmentCandidates";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10">
          <header className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30 lg:p-8">
            <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
              {SITE.tagline}
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {SITE.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              {SITE.description} Paste a raw idea, sharpen the target segment and
              pain with evidence, and leave with a Pre-Factory Validation Pack the
              Development Factory can execute.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <a
                href="#pipeline"
                className="rounded-full bg-white px-5 py-2.5 font-medium text-slate-950 transition hover:bg-blue-100"
              >
                See the pipeline
              </a>
              <a
                href="#scope-guard"
                className="rounded-full border border-white/15 px-5 py-2.5 font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/5"
              >
                v0 scope guard
              </a>
            </div>
          </header>

          <PipelineOverview />

          <IdeaIntake />

          <SegmentCandidates />

          <PainScorecard />

          <FakePainCheck />

          <InterviewPlan />

          <MvpSlice />

          <ScopeGuard />
        </div>
      </main>
      <Footer />
    </>
  );
}
