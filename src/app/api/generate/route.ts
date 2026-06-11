import Anthropic from "@anthropic-ai/sdk";
import { parseGenerationResult } from "@/lib/generation";
import { SCORE_WEIGHTS } from "@/lib/pipeline";

const SCORE_PROPERTIES = Object.fromEntries(
  Object.keys(SCORE_WEIGHTS).map((dimension) => [
    dimension,
    { type: "integer", enum: [1, 2, 3, 4, 5] },
  ]),
);

const RATIONALE_PROPERTIES = Object.fromEntries(
  Object.keys(SCORE_WEIGHTS).map((dimension) => [dimension, { type: "string" }]),
);

const GENERATION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "segments",
    "pains",
    "dmTemplate",
    "interviewQuestions",
    "fakePainRisks",
    "requiredEvidence",
    "mvp",
  ],
  properties: {
    segments: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "name",
          "role",
          "context",
          "urgency",
          "abilityToPay",
          "accessibility",
          "currentWorkaround",
          "primary",
        ],
        properties: {
          name: { type: "string" },
          role: { type: "string" },
          context: { type: "string" },
          urgency: { type: "string" },
          abilityToPay: { type: "string" },
          accessibility: { type: "string" },
          currentWorkaround: { type: "string" },
          primary: { type: "boolean" },
        },
      },
    },
    pains: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["statement", "scores", "rationale", "recommended"],
        properties: {
          statement: { type: "string" },
          scores: {
            type: "object",
            additionalProperties: false,
            required: Object.keys(SCORE_WEIGHTS),
            properties: SCORE_PROPERTIES,
          },
          rationale: {
            type: "object",
            additionalProperties: false,
            required: Object.keys(SCORE_WEIGHTS),
            properties: RATIONALE_PROPERTIES,
          },
          recommended: { type: "boolean" },
        },
      },
    },
    dmTemplate: { type: "string" },
    interviewQuestions: { type: "array", items: { type: "string" } },
    fakePainRisks: { type: "array", items: { type: "string" } },
    requiredEvidence: { type: "array", items: { type: "string" } },
    mvp: {
      type: "object",
      additionalProperties: false,
      required: ["promise", "firstVisibleGoal", "retentionSignal", "nonGoals"],
      properties: {
        promise: { type: "string" },
        firstVisibleGoal: { type: "string" },
        retentionSignal: { type: "string" },
        nonGoals: { type: "array", items: { type: "string" } },
      },
    },
  },
} as const;

const SYSTEM_PROMPT = `You are the validation engine of SaaS Pipeline OS, a tool that turns raw SaaS ideas into evidence-driven Pre-Factory Validation Packs for solo founders and AI-native builders.

Given a raw idea, generate first-draft validation content the user will review, edit, and confirm. Be concrete and skeptical: prefer narrow segments over broad ones, name real workarounds, and call out where the pain might be fake. Score honestly — most ideas should NOT score above 4.0 on every pain.

Rules:
- Generate exactly 3 target segment candidates; mark exactly one as primary (the most reachable segment with the most concrete pain).
- Generate exactly 2 candidate pain statements in this format: "For [concrete target group], who regularly [specific context], [concrete pain] is a problem because it causes [measurable consequence]. Today they solve it with [current workaround], but that is insufficient because [gap]." Mark exactly one as recommended.
- Score each pain 1-5 per criterion with a short rationale per criterion. The criteria and weights: frequency 20%, intensity 25%, willingness to pay 20%, reachability 15%, MVP feasibility 10%, differentiation 10%.
- The DM template must be a short, no-pitch outreach message to the primary segment with {{name}} as placeholder, asking for a 15-minute conversation about their current workflow.
- Generate 5 pain interview questions that probe for concrete recent incidents, current workarounds, and time/money already spent — never hypothetical "would you use" questions.
- Generate 3-5 fake-pain risks specific to this idea and 4-6 required evidence items (concrete, checkable actions).
- The MVP slice must be one thin slice: a promise the user can verify in one session, a first visible goal shippable as a single-page prototype, a retention signal, and 4-6 non-goals that block overbuilding (auth, billing, integrations, etc. where applicable).
- Write everything in English, matching the tone of a pragmatic founder tool.`;

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      {
        error:
          "AI generation is not configured. Set the ANTHROPIC_API_KEY environment variable (locally in .env.local, on Vercel in the project settings).",
      },
      { status: 503 },
    );
  }

  let body: { productName?: string; idea?: string; source?: string; context?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  const idea = body.idea?.trim();
  if (!idea) {
    return Response.json({ error: "Please enter a raw idea first." }, { status: 400 });
  }

  const userPrompt = [
    body.productName?.trim() ? `Working title: ${body.productName.trim()}` : "",
    `Raw idea: ${idea}`,
    body.source?.trim() ? `Source: ${body.source.trim()}` : "",
    body.context?.trim() ? `Context: ${body.context.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const client = new Anthropic();

  try {
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
      output_config: {
        format: { type: "json_schema", schema: GENERATION_SCHEMA },
      },
    });

    if (response.stop_reason === "refusal") {
      return Response.json(
        { error: "The model declined to process this idea. Try rephrasing it." },
        { status: 502 },
      );
    }

    const textBlock = response.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return Response.json(
        { error: "The model returned no usable output. Please try again." },
        { status: 502 },
      );
    }

    const result = parseGenerationResult(JSON.parse(textBlock.text));
    return Response.json(result);
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return Response.json(
        { error: "Rate limit reached — wait a moment and try again." },
        { status: 429 },
      );
    }
    if (error instanceof Anthropic.APIError) {
      return Response.json(
        { error: `Claude API error (${error.status}): ${error.message}` },
        { status: 502 },
      );
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: `Generation failed: ${message}` }, { status: 502 });
  }
}
