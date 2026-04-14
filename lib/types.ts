export type SkillType = "WORKFLOW" | "SYSTEM" | "KNOWLEDGE" | "ASSISTANT";

export interface SkillFormPayload {
  basics: {
    name: string;
    description: string;
    domain: string;
    type: SkillType;
  };
  context: {
    projectContext: string;
    contextHint?: string;
  };
  domainModel: {
    entities: string;
    relationships: string;
    businessRules: string;
  };
  controls: {
    includeFrontmatter: boolean;
    includeExamples: boolean;
    strictReusableFormat: boolean;
    includeConstraints: boolean;
  };
}
