"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import { SkillbaseLogo } from "@/components/brand/skillbase-logo";
import { MarkdownRenderer } from "@/components/builder/markdown-renderer";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

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

type Status = "idle" | "copied" | "exported" | "generated" | "ai-generated" | "error";
type Pane = "form" | "preview";

export function SkillBuilder() {
    const [payload, setPayload] = useState<SkillFormPayload>(defaultPayload);
    const [markdown, setMarkdown] = useState("");
    const [activeTab, setActiveTab] = useState<"preview" | "raw" | "edit">("preview");
    const [isLoading, setIsLoading] = useState(false);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [status, setStatus] = useState<Status>("idle");
    const [mobilePane, setMobilePane] = useState<Pane>("form");

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
            setMobilePane("preview");
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
                setMobilePane("preview");
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

    const isBusy = isLoading || isAiLoading;

    return (
        <div className="flex h-[100dvh] flex-col overflow-hidden bg-[#08080a] text-zinc-100">
            {/* ── Top bar ──────────────────────────────────────────── */}
            <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-white/[0.06] bg-[#0a0a0d]/85 px-3 backdrop-blur-xl sm:h-14 sm:px-5">
                {/* Left: brand + breadcrumb */}
                <div className="flex min-w-0 items-center gap-2 text-sm">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 text-zinc-500 transition hover:text-zinc-200"
                    >
                        <SkillbaseLogo
                            size={22}
                            compact
                            iconClassName="border-white/[0.08] bg-[#0f1118]"
                            labelClassName="hidden text-zinc-200 sm:inline"
                        />
                    </Link>
                    <span className="text-zinc-700">/</span>
                    <span className="hidden font-medium text-zinc-300 sm:inline">Builder</span>
                    {payload.basics.name && (
                        <>
                            <span className="hidden text-zinc-700 sm:inline">/</span>
                            <span className="max-w-[120px] truncate font-mono text-[11px] text-zinc-500 sm:max-w-[180px]">
                                {payload.basics.name}
                            </span>
                        </>
                    )}
                </div>

                {/* Center: status */}
                <div className="hidden items-center md:flex">
                    <StatusPill status={status} />
                </div>

                {/* Right: actions */}
                <div className="flex items-center gap-1.5">
                    <IconAction onClick={handleCopy} title="Copy">
                        {status === "copied" ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
                        <span className="hidden md:inline">Copy</span>
                    </IconAction>
                    <IconAction onClick={handleExport} title="Export">
                        {status === "exported" ? <CheckIcon size={13} /> : <DownloadIcon size={13} />}
                        <span className="hidden md:inline">Export</span>
                    </IconAction>
                    <button
                        onClick={handleGenerate}
                        disabled={isBusy}
                        className="hidden h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.07] disabled:opacity-40 sm:inline-flex"
                    >
                        <SparklesIcon size={12} />
                        {isLoading ? "..." : "Generate"}
                    </button>
                    <button
                        onClick={handleBoostAI}
                        disabled={isBusy}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-violet-600 px-3 text-xs font-semibold text-white shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_4px_16px_rgba(124,58,237,0.35)] transition hover:bg-violet-500 disabled:opacity-50"
                    >
                        <SparklesIcon size={12} />
                        {isAiLoading ? "Boosting…" : "AI Boost"}
                    </button>
                </div>
            </header>

            {/* ── Mobile pane switcher ─────────────────────────────── */}
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/[0.06] bg-[#0a0a0d]/70 px-3 py-2 backdrop-blur lg:hidden">
                <div className="inline-flex rounded-lg border border-white/[0.07] bg-white/[0.025] p-0.5">
                    {(["form", "preview"] as Pane[]).map((p) => (
                        <button
                            key={p}
                            onClick={() => setMobilePane(p)}
                            className={cn(
                                "rounded-md px-3 py-1.5 text-xs font-medium capitalize transition",
                                mobilePane === p
                                    ? "bg-violet-600 text-white shadow-[0_0_10px_rgba(124,58,237,0.3)]"
                                    : "text-zinc-400 hover:text-zinc-200",
                            )}
                        >
                            {p === "form" ? "Inputs" : "Preview"}
                        </button>
                    ))}
                </div>
                <StatusPill status={status} compact />
            </div>

            {/* ── Main split ───────────────────────────────────────── */}
            <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(320px,400px)_1fr]">
                {/* Form pane */}
                <aside
                    className={cn(
                        "flex h-full min-h-0 w-full flex-col border-white/[0.06] lg:border-r",
                        mobilePane === "form" ? "flex" : "hidden lg:flex",
                    )}
                >
                    <div className="flex-1 overflow-y-auto pb-24 lg:pb-0">
                        <div className="divide-y divide-white/[0.05]">
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

                            <Section icon={<CodeIcon size={13} />} title="Context">
                                <Field label="Project or business context">
                                    <Textarea
                                        className="min-h-[110px]"
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

                            <Section icon={<SparklesIcon size={13} />} title="Controls">
                                <div className="flex flex-col gap-2">
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

                    {/* Sticky bottom CTAs (desktop only — mobile uses bottom bar) */}
                    <div className="hidden shrink-0 border-t border-white/[0.06] bg-[#0a0a0d]/95 px-4 py-3 backdrop-blur lg:block">
                        <div className="flex gap-2">
                            <button
                                onClick={handleGenerate}
                                disabled={isBusy}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.07] disabled:opacity-50 active:scale-[0.98]"
                            >
                                <SparklesIcon size={14} />
                                {isLoading ? "Generating…" : "Generate"}
                            </button>
                            <button
                                onClick={handleBoostAI}
                                disabled={isBusy}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_8px_22px_rgba(124,58,237,0.35)] transition hover:bg-violet-500 disabled:opacity-50 active:scale-[0.98]"
                            >
                                <SparklesIcon size={14} />
                                {isAiLoading ? "Boosting…" : "Boost with AI"}
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Preview pane */}
                <main
                    className={cn(
                        "flex h-full min-h-0 min-w-0 flex-col",
                        mobilePane === "preview" ? "flex" : "hidden lg:flex",
                    )}
                >
                    {/* Preview header */}
                    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.06] px-3 py-2.5 sm:px-5 sm:py-3">
                        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "preview" | "raw" | "edit")}>
                            <TabsList>
                                <TabsTrigger value="preview">
                                    <FileTextIcon size={12} />
                                    <span className="hidden sm:inline">Preview</span>
                                </TabsTrigger>
                                <TabsTrigger value="raw">
                                    <CodeIcon size={12} />
                                    <span className="hidden sm:inline">Raw</span>
                                </TabsTrigger>
                                <TabsTrigger value="edit">
                                    <FileTextIcon size={12} />
                                    <span className="hidden sm:inline">Edit</span>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <div className="hidden items-center gap-1.5 lg:flex">
                            <MetaChip label="skill" value={payload.basics.name || "untitled"} />
                            <MetaChip label="type" value={payload.basics.type} accent />
                            <MetaChip label="fmt" value=".md" />
                        </div>
                    </div>

                    {/* Preview content */}
                    <div className="flex-1 overflow-y-auto p-3 pb-24 sm:p-5 lg:pb-5">
                        {activeTab === "preview" ? (
                            <div className="min-h-full overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                                <div className="flex items-center gap-1.5 border-b border-black/[0.06] bg-zinc-50 px-4 py-2">
                                    <span className="size-2 rounded-full bg-zinc-300" />
                                    <span className="size-2 rounded-full bg-zinc-300" />
                                    <span className="size-2 rounded-full bg-zinc-300" />
                                    <span className="ml-2 truncate font-mono text-[11px] text-zinc-500">
                                        {payload.basics.name || "skill"}.md
                                    </span>
                                </div>
                                <div className="p-5 sm:p-7">
                                    <MarkdownRenderer markdown={previewMarkdown} />
                                </div>
                            </div>
                        ) : activeTab === "edit" ? (
                            <div className="flex min-h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c0c10]">
                                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
                                    <span className="font-mono text-[11px] text-zinc-500">
                                        {payload.basics.name || "skill"}.md — editing
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() => {
                                                setMarkdown("");
                                                setActiveTab("preview");
                                            }}
                                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-zinc-500 transition hover:bg-white/[0.05] hover:text-zinc-200"
                                        >
                                            Reset to form
                                        </button>
                                        <button
                                            onClick={handleCopy}
                                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-zinc-500 transition hover:bg-white/[0.05] hover:text-zinc-200"
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
                            <div className="min-h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c0c10]">
                                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
                                    <span className="font-mono text-[11px] text-zinc-500">
                                        {payload.basics.name || "skill"}.md
                                    </span>
                                    <button
                                        onClick={handleCopy}
                                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-zinc-500 transition hover:bg-white/[0.05] hover:text-zinc-200"
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
            </div>

            {/* ── Mobile sticky action bar ─────────────────────────── */}
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.06] bg-[#0a0a0d]/95 p-3 backdrop-blur-xl lg:hidden">
                <div className="mx-auto flex max-w-md gap-2">
                    <button
                        onClick={handleGenerate}
                        disabled={isBusy}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-zinc-200 transition active:scale-[0.98] disabled:opacity-50"
                    >
                        <SparklesIcon size={14} />
                        {isLoading ? "…" : "Generate"}
                    </button>
                    <button
                        onClick={handleBoostAI}
                        disabled={isBusy}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_8px_22px_rgba(124,58,237,0.35)] transition active:scale-[0.98] disabled:opacity-50"
                    >
                        <SparklesIcon size={14} />
                        {isAiLoading ? "Boosting…" : "AI Boost"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ── Sub-components ─────────────────────────────────────── */

function StatusPill({ status, compact }: { status: Status; compact?: boolean }) {
    const map: Record<Status, { label: string; variant: "default" | "secondary" | "success" | "violet" | "destructive"; dot?: string }> = {
        idle: { label: "Ready", variant: "secondary", dot: "bg-zinc-600" },
        generated: { label: "Generated", variant: "success", dot: "bg-emerald-400 animate-pulse" },
        "ai-generated": { label: "AI Boosted", variant: "violet", dot: "bg-violet-400 animate-pulse" },
        copied: { label: "Copied", variant: "success" },
        exported: { label: "Exported", variant: "success" },
        error: { label: "Local draft", variant: "destructive" },
    };
    const { label, variant, dot } = map[status];

    return (
        <Badge variant={variant} className={compact ? "text-[10px]" : ""}>
            {dot ? <span className={cn("size-1.5 rounded-full", dot)} /> : (status === "copied" || status === "exported") ? <CheckIcon size={10} /> : null}
            {label}
        </Badge>
    );
}

function IconAction({
    onClick,
    title,
    children,
}: {
    onClick: () => void;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            title={title}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 text-xs text-zinc-400 transition hover:border-white/15 hover:bg-white/[0.06] hover:text-zinc-100"
        >
            {children}
        </button>
    );
}

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
        <div className="px-4 py-5 sm:px-5">
            <div className="mb-4 flex items-center gap-2">
                <span className="text-violet-400">{icon}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
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
        <div className="flex items-center overflow-hidden rounded-md border border-white/[0.07] bg-white/[0.025] text-[10px]">
            <span className="border-r border-white/[0.07] px-1.5 py-1 text-zinc-600">{label}</span>
            <span className={cn("max-w-[110px] truncate px-1.5 py-1 font-mono", accent ? "text-violet-400" : "text-zinc-400")}>
                {value}
            </span>
        </div>
    );
}
