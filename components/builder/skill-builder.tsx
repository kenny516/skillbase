"use client";

import { useMemo, useState } from "react";

import { MarkdownRenderer } from "@/components/builder/markdown-renderer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateSkillMarkdown } from "@/lib/markdown";
import type { SkillFormPayload } from "@/lib/types";
import { cn } from "@/lib/utils";

const defaultPayload: SkillFormPayload = {
  basics: {
    name: "create_asset_checkout",
    description: "Create an asset checkout skill",
    domain: "asset operations",
    type: "WORKFLOW",
  },
  context: {
    projectContext:
      "Internal tooling for teams that request, approve, and track hardware or software asset checkouts.\nEach request must keep auditability and ownership intact.",
    contextHint: "Search across current project docs or domain notes",
  },
  domainModel: {
    entities: "Asset\nCheckout request\nEmployee\nApprover",
    relationships:
      "A checkout request references one asset and one employee.\nAn approver can approve many checkout requests.",
    businessRules:
      "Every checkout requires approval before release.\nReturned assets must update availability.\nAudit timestamps are mandatory.",
  },
  controls: {
    includeFrontmatter: true,
    includeExamples: true,
    strictReusableFormat: true,
    includeConstraints: true,
  },
};

export function SkillBuilder() {
  const [payload, setPayload] = useState<SkillFormPayload>(defaultPayload);
  const [markdown, setMarkdown] = useState("");
  const [activeTab, setActiveTab] = useState<"preview" | "raw">("preview");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string>("");

  const optimisticMarkdown = useMemo(() => generateSkillMarkdown(payload), [payload]);

  async function handleGenerate() {
    setIsLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const data = (await response.json()) as { markdown: string };
      setMarkdown(data.markdown);
      setStatus("Skill generated.");
    } catch (error) {
      console.error(error);
      setMarkdown(optimisticMarkdown);
      setStatus("Using local draft preview.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopy() {
    const value = markdown || optimisticMarkdown;
    await navigator.clipboard.writeText(value);
    setStatus("Markdown copied.");
  }

  function handleExport() {
    const value = markdown || optimisticMarkdown;
    const blob = new Blob([value], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${payload.basics.name || "skill"}.md`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Markdown exported.");
  }

  const previewMarkdown = markdown || "";

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <div className="flex flex-col gap-4 rounded-xl border border-line bg-panel px-5 py-5 shadow-panel backdrop-blur md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Builder"
            title="Design a reusable skill draft"
            description="Capture domain context, shape the structure, and keep the final output ready for copy, export, or later model-backed generation."
          />
          <div className="flex flex-wrap gap-2 text-xs text-muted">
            <span className="rounded-md border border-line bg-white/60 px-3 py-2">App Router</span>
            <span className="rounded-md border border-line bg-white/60 px-3 py-2">Markdown-first</span>
            <span className="rounded-md border border-line bg-white/60 px-3 py-2">Netlify-ready</span>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <section className="rounded-xl border border-line bg-panelStrong p-4 shadow-panel backdrop-blur sm:p-5">
            <div className="grid gap-6">
              <fieldset className="grid gap-4">
                <legend className="text-[11px] uppercase tracking-[0.24em] text-muted">
                  Skill basics
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Skill name">
                    <Input
                      value={payload.basics.name}
                      onChange={(event) =>
                        setPayload((current) => ({
                          ...current,
                          basics: { ...current.basics, name: event.target.value },
                        }))
                      }
                    />
                  </Field>
                  <Field label="Domain / category">
                    <Input
                      value={payload.basics.domain}
                      onChange={(event) =>
                        setPayload((current) => ({
                          ...current,
                          basics: { ...current.basics, domain: event.target.value },
                        }))
                      }
                    />
                  </Field>
                </div>
                <Field label="Short description">
                  <Input
                    value={payload.basics.description}
                    onChange={(event) =>
                      setPayload((current) => ({
                        ...current,
                        basics: { ...current.basics, description: event.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="Skill type">
                  <Select
                    value={payload.basics.type}
                    onChange={(event) =>
                      setPayload((current) => ({
                        ...current,
                        basics: {
                          ...current.basics,
                          type: event.target.value as SkillFormPayload["basics"]["type"],
                        },
                      }))
                    }
                  >
                    <option value="WORKFLOW">Workflow</option>
                    <option value="SYSTEM">System</option>
                    <option value="KNOWLEDGE">Knowledge</option>
                    <option value="ASSISTANT">Assistant</option>
                  </Select>
                </Field>
              </fieldset>

              <fieldset className="grid gap-4">
                <legend className="text-[11px] uppercase tracking-[0.24em] text-muted">Context</legend>
                <Field label="Project / business context">
                  <Textarea
                    value={payload.context.projectContext}
                    onChange={(event) =>
                      setPayload((current) => ({
                        ...current,
                        context: { ...current.context, projectContext: event.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="Context search">
                  <div className="flex gap-2">
                    <Input
                      value={payload.context.contextHint}
                      onChange={(event) =>
                        setPayload((current) => ({
                          ...current,
                          context: { ...current.context, contextHint: event.target.value },
                        }))
                      }
                      placeholder="Search project docs, tickets, ADRs"
                    />
                    <Button variant="secondary" className="shrink-0">
                      Placeholder
                    </Button>
                  </div>
                </Field>
              </fieldset>

              <fieldset className="grid gap-4">
                <legend className="text-[11px] uppercase tracking-[0.24em] text-muted">
                  Domain model
                </legend>
                <Field label="Entities">
                  <Textarea
                    className="min-h-[112px]"
                    value={payload.domainModel.entities}
                    onChange={(event) =>
                      setPayload((current) => ({
                        ...current,
                        domainModel: { ...current.domainModel, entities: event.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="Relationships">
                  <Textarea
                    className="min-h-[112px]"
                    value={payload.domainModel.relationships}
                    onChange={(event) =>
                      setPayload((current) => ({
                        ...current,
                        domainModel: {
                          ...current.domainModel,
                          relationships: event.target.value,
                        },
                      }))
                    }
                  />
                </Field>
                <Field label="Business rules">
                  <Textarea
                    className="min-h-[112px]"
                    value={payload.domainModel.businessRules}
                    onChange={(event) =>
                      setPayload((current) => ({
                        ...current,
                        domainModel: {
                          ...current.domainModel,
                          businessRules: event.target.value,
                        },
                      }))
                    }
                  />
                </Field>
              </fieldset>

              <fieldset className="grid gap-3">
                <legend className="text-[11px] uppercase tracking-[0.24em] text-muted">
                  Generation controls
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Checkbox
                    label="Include frontmatter"
                    hint="Ready for agent and workflow metadata."
                    checked={payload.controls.includeFrontmatter}
                    onChange={(event) =>
                      setPayload((current) => ({
                        ...current,
                        controls: {
                          ...current.controls,
                          includeFrontmatter: event.target.checked,
                        },
                      }))
                    }
                  />
                  <Checkbox
                    label="Include examples"
                    hint="Append short reusable usage cues."
                    checked={payload.controls.includeExamples}
                    onChange={(event) =>
                      setPayload((current) => ({
                        ...current,
                        controls: {
                          ...current.controls,
                          includeExamples: event.target.checked,
                        },
                      }))
                    }
                  />
                  <Checkbox
                    label="Strict reusable format"
                    hint="Keep the output deterministic and transportable."
                    checked={payload.controls.strictReusableFormat}
                    onChange={(event) =>
                      setPayload((current) => ({
                        ...current,
                        controls: {
                          ...current.controls,
                          strictReusableFormat: event.target.checked,
                        },
                      }))
                    }
                  />
                  <Checkbox
                    label="Include constraints / auth placeholders"
                    hint="Reserve space for access and operational limits."
                    checked={payload.controls.includeConstraints}
                    onChange={(event) =>
                      setPayload((current) => ({
                        ...current,
                        controls: {
                          ...current.controls,
                          includeConstraints: event.target.checked,
                        },
                      }))
                    }
                  />
                </div>
              </fieldset>

              <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-muted">
                  {status || "Generate a first draft, then copy or export the Markdown."}
                </div>
                <Button onClick={handleGenerate} disabled={isLoading}>
                  {isLoading ? "Generating..." : "Generate skill"}
                </Button>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-line bg-panelStrong p-4 shadow-panel backdrop-blur sm:p-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Output</p>
                  <h2 className="mt-2 text-xl font-medium tracking-[-0.04em]">Markdown preview</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="rounded-md border border-line bg-white/55 p-1">
                    <button
                      className={cn(
                        "rounded px-3 py-2 text-sm transition",
                        activeTab === "preview" ? "bg-black text-white" : "text-muted"
                      )}
                      onClick={() => setActiveTab("preview")}
                    >
                      Preview
                    </button>
                    <button
                      className={cn(
                        "rounded px-3 py-2 text-sm transition",
                        activeTab === "raw" ? "bg-black text-white" : "text-muted"
                      )}
                      onClick={() => setActiveTab("raw")}
                    >
                      Raw Markdown
                    </button>
                  </div>
                  <Button variant="secondary" onClick={handleCopy}>
                    Copy markdown
                  </Button>
                  <Button variant="ghost" onClick={handleExport}>
                    Export markdown
                  </Button>
                </div>
              </div>

              {previewMarkdown ? (
                <div className="min-h-[640px] rounded-lg border border-line bg-white/72 p-4">
                  {activeTab === "preview" ? (
                    <MarkdownRenderer markdown={previewMarkdown} />
                  ) : (
                    <pre className="overflow-x-auto whitespace-pre-wrap break-words text-sm leading-7 text-foreground">
                      {previewMarkdown}
                    </pre>
                  )}
                </div>
              ) : (
                <div className="flex min-h-[640px] flex-col justify-between rounded-lg border border-dashed border-line bg-white/40 p-4">
                  <div className="space-y-3">
                    <p className="text-sm text-foreground">No generated draft yet.</p>
                    <p className="max-w-md text-sm leading-7 text-muted">
                      Fill the builder inputs, then generate a Markdown skill. The preview panel
                      is ready for structured output, copy actions, and download.
                    </p>
                  </div>
                  <pre className="overflow-x-auto rounded-lg border border-line bg-black px-4 py-4 text-xs leading-6 text-white/82">
{`---
name: create_asset_checkout
description: Create an asset checkout skill
version: 1.0.0
type: WORKFLOW
---

# Create Asset Checkout`}
                  </pre>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-foreground">{label}</span>
      {children}
    </label>
  );
}
