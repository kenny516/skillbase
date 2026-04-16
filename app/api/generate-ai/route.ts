import { generateText } from "ai";
import { NextResponse } from "next/server";

import { geminiModel } from "@/lib/gemini";
import { generateSkillMarkdown } from "@/lib/markdown";
import type { SkillFormPayload } from "@/lib/types";

export async function POST(request: Request) {
    const payload = (await request.json()) as SkillFormPayload;

    const baseDraft = generateSkillMarkdown(payload);

    const prompt = `You are a senior technical writer specializing in AI agent skill documentation.

Your task: take the structured draft below and BOOST it into a production-grade, well-structured skill document in Markdown.

## Rules
- Keep the same overall Markdown structure (frontmatter, headings, sections).
- Enrich each section with precise, actionable content based on the provided context.
- Add concrete examples with realistic data from the domain "${payload.basics.domain}".
- Expand business rules into clear, numbered acceptance criteria.
- Add an "Edge Cases" section listing at least 3 edge cases.
- Add a "Error Handling" section with common failure scenarios and expected behavior.
- Keep language professional, concise, and deterministic.
- Output ONLY the final Markdown — no explanations, no wrapping code fences.

## Skill metadata
- Name: ${payload.basics.name}
- Type: ${payload.basics.type}
- Domain: ${payload.basics.domain}
- Description: ${payload.basics.description}

## Current draft to enhance
${baseDraft}`;

    try {
        const { text } = await generateText({
            model: geminiModel,
            prompt,
            maxOutputTokens: 4096,
            maxRetries: 1,
        });

        return NextResponse.json({ markdown: text });
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        console.error("Gemini generation failed:", message);

        const isQuota = message.includes("quota") || message.includes("429");
        const isCert = message.includes("certificate");

        return NextResponse.json(
            {
                markdown: baseDraft,
                error: isQuota
                    ? "Quota API Gemini épuisée. Vérifie ton plan sur https://ai.google.dev/gemini-api/docs/rate-limits"
                    : isCert
                        ? "Erreur SSL — lance le serveur avec NODE_TLS_REJECT_UNAUTHORIZED=0 ou configure ton certificat CA"
                        : "AI generation failed, returning base draft",
            },
            { status: 200 }
        );
    }
}
