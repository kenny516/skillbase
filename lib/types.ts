import { z } from "zod";

export const SKILL_TYPES = ["WORKFLOW", "SYSTEM", "KNOWLEDGE", "ASSISTANT"] as const;
export type SkillType = (typeof SKILL_TYPES)[number];

export const SkillFormSchema = z.object({
  basics: z.object({
    name: z.string().max(200),
    description: z.string().max(2000),
    domain: z.string().max(200),
    type: z.enum(SKILL_TYPES),
  }),
  context: z.object({
    projectContext: z.string().max(10000),
    contextHint: z.string().max(500).optional(),
  }),
  domainModel: z.object({
    entities: z.string().max(5000),
    relationships: z.string().max(5000),
    businessRules: z.string().max(5000),
  }),
  controls: z.object({
    includeFrontmatter: z.boolean(),
    includeExamples: z.boolean(),
    strictReusableFormat: z.boolean(),
    includeConstraints: z.boolean(),
  }),
});

export type SkillFormPayload = z.infer<typeof SkillFormSchema>;
