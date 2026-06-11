"use client";

import { useState } from "react";
import {
  defaultPipelineState,
  type PipelineState,
  type ScoreDimension,
} from "@/lib/pipeline";
import { applyGenerationResult, parseGenerationResult } from "@/lib/generation";
import { buildValidationPackMarkdown } from "@/lib/validation-pack";
import FakePainCheck from "./FakePainCheck";
import HandoffPack from "./HandoffPack";
import IdeaIntake from "./IdeaIntake";
import InterviewPlan from "./InterviewPlan";
import MvpSlice from "./MvpSlice";
import PainScorecard from "./PainScorecard";
import SegmentCandidates from "./SegmentCandidates";

/**
 * Client-side state for one pipeline run. AI generation (roadmap Phase 3)
 * drafts the validation content from the raw idea; the user reviews, edits,
 * and decides — every generated field stays editable. State is local-only.
 */
export default function PipelineWorkspace() {
  const [state, setState] = useState<PipelineState>(defaultPipelineState);
  const [generating, setGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const patch = (update: Partial<PipelineState>) =>
    setState((current) => ({ ...current, ...update }));

  const patchPain = (
    index: number,
    update: (pain: PipelineState["pains"][number]) => PipelineState["pains"][number],
  ) =>
    setState((current) => ({
      ...current,
      pains: current.pains.map((pain, i) => (i === index ? update(pain) : pain)),
    }));

  async function generate() {
    setGenerating(true);
    setGenerationError(null);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: state.productName,
          idea: state.idea,
          source: state.source,
          context: state.context,
        }),
      });
      const data: unknown = await response.json();
      if (!response.ok) {
        const message =
          typeof data === "object" && data !== null && "error" in data
            ? String((data as { error: unknown }).error)
            : `Generation failed (HTTP ${response.status}).`;
        throw new Error(message);
      }
      const result = parseGenerationResult(data);
      setState((current) => applyGenerationResult(current, result));
    } catch (error) {
      setGenerationError(
        error instanceof Error ? error.message : "Generation failed unexpectedly.",
      );
    } finally {
      setGenerating(false);
    }
  }

  const markdown = buildValidationPackMarkdown(state);

  return (
    <>
      <IdeaIntake
        value={{
          productName: state.productName,
          idea: state.idea,
          source: state.source,
          context: state.context,
        }}
        onChange={patch}
        onGenerate={generate}
        generating={generating}
        error={generationError}
      />

      <SegmentCandidates
        segments={state.segments}
        selectedIndex={state.selectedSegment}
        onSelect={(index) => patch({ selectedSegment: index })}
      />

      <PainScorecard
        pains={state.pains}
        selectedIndex={state.selectedPain}
        onSelect={(index) => patch({ selectedPain: index })}
        onChangeStatement={(index, statement) =>
          patchPain(index, (pain) => ({ ...pain, statement }))
        }
        onChangeScore={(index, dimension: ScoreDimension, value) =>
          patchPain(index, (pain) => ({
            ...pain,
            scores: { ...pain.scores, [dimension]: value },
          }))
        }
      />

      <FakePainCheck risks={state.fakePainRisks} evidence={state.requiredEvidence} />

      <InterviewPlan dmTemplate={state.dmTemplate} questions={state.interviewQuestions} />

      <MvpSlice value={state.mvp} onChange={(update) => patch({ mvp: { ...state.mvp, ...update } })} />

      <HandoffPack markdown={markdown} productName={state.productName} />
    </>
  );
}
