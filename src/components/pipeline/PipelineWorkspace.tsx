"use client";

import { useState } from "react";
import {
  defaultPipelineState,
  type PipelineState,
  type ScoreDimension,
} from "@/lib/pipeline";
import { buildValidationPackMarkdown } from "@/lib/validation-pack";
import FakePainCheck from "./FakePainCheck";
import HandoffPack from "./HandoffPack";
import IdeaIntake from "./IdeaIntake";
import InterviewPlan from "./InterviewPlan";
import MvpSlice from "./MvpSlice";
import PainScorecard from "./PainScorecard";
import SegmentCandidates from "./SegmentCandidates";

/**
 * Client-side state for one pipeline run (roadmap Phase 2): the user adapts
 * the worked example to their idea and the validation pack regenerates live.
 * State is intentionally local-only — no backend, no persistence.
 */
export default function PipelineWorkspace() {
  const [state, setState] = useState<PipelineState>(defaultPipelineState);

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

      <FakePainCheck />

      <InterviewPlan />

      <MvpSlice value={state.mvp} onChange={(update) => patch({ mvp: { ...state.mvp, ...update } })} />

      <HandoffPack markdown={markdown} productName={state.productName} />
    </>
  );
}
