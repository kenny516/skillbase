import { NextResponse } from "next/server";

import { generateSkillMarkdown } from "@/lib/markdown";
import { SkillFormSchema } from "@/lib/types";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = SkillFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  return NextResponse.json({
    markdown: generateSkillMarkdown(parsed.data),
  });
}
