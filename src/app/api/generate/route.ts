import Anthropic from "@anthropic-ai/sdk";
import { parseGenerationResult, type GenerationResult } from "@/lib/generation";
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
- Write everything in English, matching the tone of a pragmatic founder tool.
- Respond with a single JSON object matching the requested schema and nothing else.`;

/** Strip optional Markdown code fences some models wrap around JSON output. */
function extractJson(text: string): string {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return fenced ? fenced[1] : trimmed;
}

class GenerationHttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/** OpenRouter — OpenAI-compatible chat completions endpoint. */
async function generateViaOpenRouter(
  apiKey: string,
  userPrompt: string,
): Promise<GenerationResult> {
  const model = process.env.OPENROUTER_MODEL || "anthropic/claude-sonnet-4.5";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://github.com/dominikplicht/saas-pipeline-os",
      "X-Title": "SaaS Pipeline OS",
    },
    body: JSON.stringify({
      model,
      max_tokens: 16000,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "validation_pipeline",
          strict: true,
          schema: GENERATION_SCHEMA,
        },
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    let message = `OpenRouter error (HTTP ${response.status}).`;
    try {
      const parsed = JSON.parse(detail) as { error?: { message?: string } };
      if (parsed.error?.message) message = `OpenRouter: ${parsed.error.message}`;
    } catch {
      // keep generic message
    }
    if (response.status === 401) {
      message = "OpenRouter rejected the API key. Check OPENROUTER_API_KEY.";
    } else if (response.status === 402) {
      message = "OpenRouter reports insufficient credits.";
    } else if (response.status === 404) {
      message = `OpenRouter does not know the model "${model}". Set OPENROUTER_MODEL to an available model.`;
    } else if (response.status === 429) {
      message = "Rate limit reached — wait a moment and try again.";
    }
    throw new GenerationHttpError(response.status === 429 ? 429 : 502, message);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string }; finish_reason?: string }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new GenerationHttpError(502, "OpenRouter returned no usable output. Please try again.");
  }

  return parseGenerationResult(JSON.parse(extractJson(content)));
}

/** Direct Anthropic API (fallback when no OpenRouter key is configured). */
async function generateViaAnthropic(userPrompt: string): Promise<GenerationResult> {
  const client = new Anthropic();

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
    throw new GenerationHttpError(
      502,
      "The model declined to process this idea. Try rephrasing it.",
    );
  }

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new GenerationHttpError(502, "The model returned no usable output. Please try again.");
  }

  return parseGenerationResult(JSON.parse(textBlock.text));
}

export async function POST(request: Request) {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!openRouterKey && !anthropicKey) {
    return Response.json(
      {
        error:
          "AI generation is not configured. Set OPENROUTER_API_KEY (or ANTHROPIC_API_KEY) — locally in .env.local, on Vercel in the project settings.",
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

  try {
    const result = openRouterKey
      ? await generateViaOpenRouter(openRouterKey, userPrompt)
      : await generateViaAnthropic(userPrompt);
    return Response.json(result);
  } catch (error) {
    if (error instanceof GenerationHttpError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
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
