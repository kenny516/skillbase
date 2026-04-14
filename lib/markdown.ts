import type { SkillFormPayload } from "@/lib/types";

function toTitleCase(value: string) {
  return value
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toKebabCase(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function linesToBullets(value: string, fallback: string[]) {
  const items = value
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);

  const rows = items.length > 0 ? items : fallback;
  return rows.map((item) => `- ${item}`).join("\n");
}

export function generateSkillMarkdown(payload: SkillFormPayload) {
  const title = toTitleCase(payload.basics.name || "Untitled Skill");
  const slug = toKebabCase(payload.basics.name || "untitled_skill");
  const description = payload.basics.description.trim() || "Reusable skill draft";
  const domain = payload.basics.domain.trim() || "general";

  const frontmatter = payload.controls.includeFrontmatter
    ? `---\nname: ${slug}\ndescription: ${description}\nversion: 1.0.0\ntype: ${payload.basics.type}\ndomain: ${domain}\n---\n\n`
    : "";

  const examples = payload.controls.includeExamples
    ? `\n## Examples\n${linesToBullets(
        [
          `When asked to ${description.toLowerCase()}, use the documented inputs and keep the output deterministic.`,
          "If the caller omits business rules, ask for the minimum missing detail before executing the workflow.",
        ].join("\n"),
        []
      )}\n`
    : "";

  const constraints = payload.controls.includeConstraints
    ? `\n## Constraints\n${linesToBullets(
        payload.controls.strictReusableFormat
          ? [
              "Prefer stable, reusable wording over one-off project-specific phrasing.",
              "Keep inputs explicit and outputs predictable.",
              "Do not assume data that is not present in the provided context.",
            ].join("\n")
          : "Respect authentication, ownership, and environment constraints from the host system.",
        ["Respect authentication and operational constraints from the host system."]
      )}\n`
    : "";

  return `${frontmatter}# ${title}

## Description
${description}

## When to use
${linesToBullets(
    payload.context.projectContext,
    [
      `Use for ${description.toLowerCase()} flows inside ${domain}.`,
      "Use when consistent Markdown output is required across teams or agents.",
    ]
  )}

## Context
${linesToBullets(
    payload.context.projectContext,
    [
      "The project context should explain the business domain, constraints, and desired user outcome.",
    ]
  )}

## Domain model
### Entities
${linesToBullets(payload.domainModel.entities, ["Primary entities are not yet specified."])}

### Relationships
${linesToBullets(payload.domainModel.relationships, [
    "Relationships between entities should be documented before execution.",
  ])}

### Business rules
${linesToBullets(payload.domainModel.businessRules, [
    "Business rules should define approval, validation, and ownership boundaries.",
  ])}

## Inputs
${linesToBullets(
    [
      "Structured skill metadata",
      "Project and business context",
      "Domain entities, relationships, and rules",
    ].join("\n"),
    []
  )}

## Output
${linesToBullets(
    payload.controls.strictReusableFormat
      ? [
          "A reusable Markdown skill with stable sections.",
          "Frontmatter-ready metadata for downstream tooling.",
        ].join("\n")
      : "A Markdown skill draft ready for review and export.",
    ["A Markdown skill draft ready for review and export."]
  )}${constraints}${examples}`;
}
