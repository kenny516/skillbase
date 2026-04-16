"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import { MarkdownRenderer } from "@/components/builder/markdown-renderer";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
    ArrowRightIcon,
    CheckIcon,
    CodeIcon,
    CopyIcon,
    DownloadIcon,
    FileTextIcon,
    SparklesIcon,
} from "@/components/ui/icons";
import { generateSkillMarkdown } from "@/lib/markdown";
import type { SkillFormPayload } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Group, Panel, Separator } from "react-resizable-panels";

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
    const [activeTab, setActiveTab] = useState<"preview" | "raw" | "edit">("preview");
    const [isLoading, setIsLoading] = useState(false);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "copied" | "exported" | "generated" | "ai-generated" | "error">("idle");

    const optimisticMarkdown = useMemo(() => generateSkillMarkdown(payload), [payload]);
    const previewMarkdown = markdown || optimisticMarkdown;

    async function handleGenerate() {
        setIsLoading(true);
        setStatus("idle");
        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error();
            const data = (await res.json()) as { markdown: string };
            setMarkdown(data.markdown);
            setStatus("generated");
        } catch {
            setMarkdown(optimisticMarkdown);
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleBoostAI() {
        setIsAiLoading(true);
        setStatus("idle");
        try {
            const res = await fetch("/api/generate-ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = (await res.json()) as { markdown: string; error?: string };
            setMarkdown(data.markdown);
            if (data.error) {
                console.warn("AI Boost warning:", data.error);
                setStatus("error");
            } else {
                setStatus("ai-generated");
            }
        } catch {
            setMarkdown(optimisticMarkdown);
            setStatus("error");
        } finally {
            setIsAiLoading(false);
        }
    }

    async function handleCopy() {
        await navigator.clipboard.writeText(previewMarkdown);
        setStatus("copied");
        setTimeout(() => setStatus("idle"), 2000);
    }

    function handleExport() {
        const blob = new Blob([previewMarkdown], { type: "text/markdown;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${payload.basics.name || "skill"}.md`;
        a.click();
        URL.revokeObjectURL(url);
        setStatus("exported");
        setTimeout(() => setStatus("idle"), 2000);
    }

    const handleMarkdownEdit = useCallback((value: string) => {
        setMarkdown(value);
    }, []);

    function setBasics(patch: Partial<SkillFormPayload["basics"]>) {
        setPayload((p) => ({ ...p, basics: { ...p.basics, ...patch } }));
        setMarkdown("");
    }
    function setContext(patch: Partial<SkillFormPayload["context"]>) {
        setPayload((p) => ({ ...p, context: { ...p.context, ...patch } }));
        setMarkdown("");
    }
    function setDomain(patch: Partial<SkillFormPayload["domainModel"]>) {
        setPayload((p) => ({ ...p, domainModel: { ...p.domainModel, ...patch } }));
        setMarkdown("");
    }
    function setControls(patch: Partial<SkillFormPayload["controls"]>) {
        setPayload((p) => ({ ...p, controls: { ...p.controls, ...patch } }));
        setMarkdown("");
    }

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-[#09090b] text-zinc-100">

            {/* Top bar */}
            <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#0c0c0f]/90 px-4 backdrop-blur-md">
                {/* Left: breadcrumb */}
                <div className="flex items-center gap-2 text-sm">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 text-zinc-500 transition hover:text-zinc-300"
                    >
                        <div className="flex size-5 items-center justify-center rounded-md bg-violet-600 text-[9px] font-bold text-white">
                            S
                        </div>
                        <span className="hidden sm:inline">Skillbase</span>
                    </Link>
                    <span className="text-zinc-700">/</span>
                    <span className="font-medium text-zinc-300">Builder</span>
                    {payload.basics.name && (
                        <>
                            <span className="text-zinc-700">/</span>
                            <span className="max-w-[140px] truncate text-zinc-500 font-mono text-xs">
                                {payload.basics.name}
                            </span>
                        </>
                    )}
                </div>

                {/* Center: status badges */}
                <div className="hidden items-center gap-2 sm:flex">
                    <Badge variant={status === "error" ? "destructive" : (status === "generated" || status === "ai-generated") ? "success" : "secondary"}>
                        {status === "idle" && <><span className="size-1.5 rounded-full bg-zinc-600" /> Ready</>}
                        {status === "generated" && <><span className="size-1.5 rounded-full bg-emerald-400" /> Generated</>}
                        {status === "ai-generated" && <><span className="size-1.5 rounded-full bg-violet-400" /> AI Boosted</>}
                        {status === "copied" && <><CheckIcon size={10} /> Copied</>}
                        {status === "exported" && <><CheckIcon size={10} /> Exported</>}
                        {status === "error" && "Using local draft"}
                    </Badge>
                </div>

                {/* Right: actions */}
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={handleCopy}
                        className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 text-xs text-zinc-400 transition hover:bg-white/[0.07] hover:text-zinc-200"
                    >
                        {status === "copied" ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                        <span className="hidden sm:inline">Copy</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 text-xs text-zinc-400 transition hover:bg-white/[0.07] hover:text-zinc-200"
                    >
                        {status === "exported" ? <CheckIcon size={12} /> : <DownloadIcon size={12} />}
                        <span className="hidden sm:inline">Export</span>
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || isAiLoading}
                        className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-violet-600 px-3 text-xs font-medium text-white shadow-[0_0_12px_rgba(124,58,237,0.3)] transition hover:bg-violet-500 disabled:opacity-50"
                    >
                        <SparklesIcon size={12} />
                        {isLoading ? "Building..." : "Generate"}
                    </button>
                    <button
                        onClick={handleBoostAI}
                        disabled={isLoading || isAiLoading}
                        className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3 text-xs font-medium text-white shadow-[0_0_12px_rgba(192,38,211,0.3)] transition hover:from-violet-500 hover:to-fuchsia-400 disabled:opacity-50"
                    >
                        <SparklesIcon size={12} />
                        {isAiLoading ? "Boosting..." : "Boost AI"}
                    </button>
                </div>
            </header>

            {/* Main */}
            <Group orientation="horizontal" className="min-h-0 flex-1">

                {/* Left: form */}
                <Panel defaultSize="380px" minSize="280px" maxSize="50%" groupResizeBehavior="preserve-pixel-size">
                    <aside className="flex h-full w-full flex-col border-r border-white/[0.07]">
                        <div className="flex-1 overflow-y-auto">
                            <div className="flex flex-col divide-y divide-white/[0.05]">

                                {/* Skill basics */}
                                <Section icon={<FileTextIcon size={13} />} title="Skill basics">
                                    <div className="grid grid-cols-2 gap-3">
                                        <Field label="Name" colSpan="2">
                                            <Input
                                                value={payload.basics.name}
                                                placeholder="create_asset_checkout"
                                                onChange={(e) => setBasics({ name: e.target.value })}
                                            />
                                        </Field>
                                        <Field label="Domain">
                                            <Input
                                                value={payload.basics.domain}
                                                placeholder="asset operations"
                                                onChange={(e) => setBasics({ domain: e.target.value })}
                                            />
                                        </Field>
                                        <Field label="Type">
                                            <Select
                                                value={payload.basics.type}
                                                onChange={(e) =>
                                                    setBasics({ type: e.target.value as SkillFormPayload["basics"]["type"] })
                                                }
                                            >
                                                <option value="WORKFLOW">Workflow</option>
                                                <option value="SYSTEM">System</option>
                                                <option value="KNOWLEDGE">Knowledge</option>
                                                <option value="ASSISTANT">Assistant</option>
                                            </Select>
                                        </Field>
                                        <Field label="Description" colSpan="2">
                                            <Input
                                                value={payload.basics.description}
                                                placeholder="Short description of this skill"
                                                onChange={(e) => setBasics({ description: e.target.value })}
                                            />
                                        </Field>
                                    </div>
                                </Section>

                                {/* Context */}
                                <Section icon={<CodeIcon size={13} />} title="Context">
                                    <Field label="Project or business context">
                                        <Textarea
                                            className="min-h-[96px]"
                                            value={payload.context.projectContext}
                                            placeholder="Describe the project or domain this skill belongs to..."
                                            onChange={(e) => setContext({ projectContext: e.target.value })}
                                        />
                                    </Field>
                                    <Field label="Context hint">
                                        <Input
                                            value={payload.context.contextHint}
                                            placeholder="Search docs, tickets, ADRs..."
                                            onChange={(e) => setContext({ contextHint: e.target.value })}
                                        />
                                    </Field>
                                </Section>

                                {/* Domain model */}
                                <Section icon={<ArrowRightIcon size={13} />} title="Domain model">
                                    <Field label="Entities">
                                        <Textarea
                                            className="min-h-[88px]"
                                            value={payload.domainModel.entities}
                                            placeholder={"Asset\nEmployee\nCheckout request"}
                                            onChange={(e) => setDomain({ entities: e.target.value })}
                                        />
                                    </Field>
                                    <Field label="Relationships">
                                        <Textarea
                                            className="min-h-[88px]"
                                            value={payload.domainModel.relationships}
                                            placeholder="A request references one asset and one employee."
                                            onChange={(e) => setDomain({ relationships: e.target.value })}
                                        />
                                    </Field>
                                    <Field label="Business rules">
                                        <Textarea
                                            className="min-h-[88px]"
                                            value={payload.domainModel.businessRules}
                                            placeholder="Every checkout requires approval before release."
                                            onChange={(e) => setDomain({ businessRules: e.target.value })}
                                        />
                                    </Field>
                                </Section>

                                {/* Generation controls */}
                                <Section icon={<SparklesIcon size={13} />} title="Controls">
                                    <div className="grid grid-cols-1 gap-2">
                                        <Checkbox
                                            label="Include frontmatter"
                                            hint="YAML header with metadata"
                                            checked={payload.controls.includeFrontmatter}
                                            onChange={(e) => setControls({ includeFrontmatter: e.target.checked })}
                                        />
                                        <Checkbox
                                            label="Include examples"
                                            hint="Append short usage cues"
                                            checked={payload.controls.includeExamples}
                                            onChange={(e) => setControls({ includeExamples: e.target.checked })}
                                        />
                                        <Checkbox
                                            label="Strict reusable format"
                                            hint="Deterministic output across repos"
                                            checked={payload.controls.strictReusableFormat}
                                            onChange={(e) => setControls({ strictReusableFormat: e.target.checked })}
                                        />
                                        <Checkbox
                                            label="Include constraints"
                                            hint="Reserve room for limits and auth"
                                            checked={payload.controls.includeConstraints}
                                            onChange={(e) => setControls({ includeConstraints: e.target.checked })}
                                        />
                                    </div>
                                </Section>

                            </div>
                        </div>

                        {/* Generate CTA (sticky bottom) */}
                        <div className="shrink-0 border-t border-white/[0.07] bg-[#0c0c0f]/95 px-4 py-3 backdrop-blur-sm">
                            <div className="flex gap-2">
                                <button
                                    onClick={handleGenerate}
                                    disabled={isLoading || isAiLoading}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.25)] transition hover:bg-violet-500 hover:shadow-[0_0_28px_rgba(124,58,237,0.35)] disabled:opacity-50 active:scale-[0.98]"
                                >
                                    <SparklesIcon size={15} />
                                    {isLoading ? "Generating..." : "Generate"}
                                </button>
                                <button
                                    onClick={handleBoostAI}
                                    disabled={isLoading || isAiLoading}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(192,38,211,0.25)] transition hover:from-violet-500 hover:to-fuchsia-400 hover:shadow-[0_0_28px_rgba(192,38,211,0.35)] disabled:opacity-50 active:scale-[0.98]"
                                >
                                    <SparklesIcon size={15} />
                                    {isAiLoading ? "Boosting..." : "Boost AI"}
                                </button>
                            </div>
                        </div>
                    </aside>
                </Panel>

                <Separator className="group relative flex w-2 cursor-col-resize items-center justify-center bg-transparent transition-colors hover:bg-violet-500/10 active:bg-violet-500/20">
                    <div className="h-10 w-[3px] rounded-full bg-white/[0.08] transition-all group-hover:h-16 group-hover:bg-violet-400/50 group-active:bg-violet-400" />
                </Separator>

                {/* Right: preview */}
                <Panel minSize="30%">
                    <main className="flex h-full min-w-0 flex-col">

                        {/* Preview header */}
                        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-3">
                            <div className="flex items-center gap-3">
                                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "preview" | "raw" | "edit")}>
                                    <TabsList>
                                        <TabsTrigger value="preview">
                                            <FileTextIcon size={12} />
                                            Preview
                                        </TabsTrigger>
                                        <TabsTrigger value="raw">
                                            <CodeIcon size={12} />
                                            Raw MD
                                        </TabsTrigger>
                                        <TabsTrigger value="edit">
                                            <FileTextIcon size={12} />
                                            Edit MD
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>

                            {/* Skill meta chips */}
                            <div className="hidden items-center gap-2 sm:flex">
                                <MetaChip label="skill" value={payload.basics.name || "untitled"} />
                                <MetaChip label="type" value={payload.basics.type} accent />
                                <MetaChip label="fmt" value=".md" />
                            </div>
                        </div>

                        {/* Preview content */}
                        <div className="flex-1 overflow-y-auto p-5">
                            {activeTab === "preview" ? (
                                <div className="min-h-full rounded-2xl border border-black/[0.08] bg-zinc-50 p-6 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                                    <MarkdownRenderer markdown={previewMarkdown} />
                                </div>
                            ) : activeTab === "edit" ? (
                                <div className="flex min-h-full flex-col rounded-2xl border border-white/[0.07] bg-[#0d0d10] overflow-hidden">
                                    <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
                                        <span className="font-mono text-[11px] text-zinc-600">
                                            {payload.basics.name || "skill"}.md — editing
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setMarkdown("");
                                                    setActiveTab("preview");
                                                }}
                                                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-zinc-500 transition hover:bg-white/[0.05] hover:text-zinc-300"
                                            >
                                                Reset to form
                                            </button>
                                            <button
                                                onClick={handleCopy}
                                                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-zinc-500 transition hover:bg-white/[0.05] hover:text-zinc-300"
                                            >
                                                {status === "copied" ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                                                {status === "copied" ? "Copied" : "Copy"}
                                            </button>
                                        </div>
                                    </div>
                                    <textarea
                                        value={previewMarkdown}
                                        onChange={(e) => handleMarkdownEdit(e.target.value)}
                                        className="flex-1 resize-none bg-transparent p-5 font-mono text-[13px] leading-7 text-zinc-300 outline-none placeholder:text-zinc-600"
                                        placeholder="Write your Markdown here..."
                                        spellCheck={false}
                                    />
                                </div>
                            ) : (
                                <div className="min-h-full rounded-2xl border border-white/[0.07] bg-[#0d0d10] overflow-hidden">
                                    <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
                                        <span className="font-mono text-[11px] text-zinc-600">
                                            {payload.basics.name || "skill"}.md
                                        </span>
                                        <button
                                            onClick={handleCopy}
                                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-zinc-500 transition hover:bg-white/[0.05] hover:text-zinc-300"
                                        >
                                            {status === "copied" ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                                            {status === "copied" ? "Copied" : "Copy"}
                                        </button>
                                    </div>
                                    <pre className="overflow-x-auto whitespace-pre-wrap break-words p-5 font-mono text-[13px] leading-7 text-zinc-400">
                                        {previewMarkdown}
                                    </pre>
                                </div>
                            )}
                        </div>

                    </main>
                </Panel>
            </Group>
        </div>
    );
}

/* Sub-components */

function Section({
    icon,
    title,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="px-4 py-5">
            <div className="mb-4 flex items-center gap-2">
                <span className="text-violet-400">{icon}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                    {title}
                </span>
            </div>
            <div className="flex flex-col gap-3">{children}</div>
        </div>
    );
}

function Field({
    label,
    children,
    colSpan,
}: {
    label: string;
    children: React.ReactNode;
    colSpan?: "2";
}) {
    return (
        <div className={cn("flex flex-col gap-1.5", colSpan === "2" && "col-span-2")}>
            <Label>{label}</Label>
            {children}
        </div>
    );
}

function MetaChip({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
    return (
        <div className="flex items-center overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.025] text-[11px]">
            <span className="border-r border-white/[0.07] px-2 py-1 text-zinc-600">{label}</span>
            <span className={cn("max-w-[120px] truncate px-2 py-1", accent ? "text-violet-400" : "text-zinc-400")}>
                {value}
            </span>
        </div>
    );
}