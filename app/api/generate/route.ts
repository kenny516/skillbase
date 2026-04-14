import { NextResponse } from "next/server";

import { generateSkillMarkdown } from "@/lib/markdown";
import type { SkillFormPayload } from "@/lib/types";

export async function POST(request: Request) {
  const payload = (await request.json()) as SkillFormPayload;

  return NextResponse.json({
    markdown: generateSkillMarkdown(payload),
  });
}
