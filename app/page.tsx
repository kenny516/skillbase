import Link from "next/link";

import { HeroScene } from "@/components/animated/hero-scene";
import { SkillbaseLogo } from "@/components/brand/skillbase-logo";
import {
    ArrowRightIcon,
    CodeIcon,
    CopyIcon,
    DownloadIcon,
    FileTextIcon,
    GitBranchIcon,
    LayersIcon,
    SparklesIcon,
    WorkflowIcon,
    ZapIcon,
} from "@/components/ui/icons";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#08080a] text-zinc-100 antialiased selection:bg-violet-500/30">
            <BackgroundOrnaments />

            {/* Nav */}
            <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#08080a]/70 backdrop-blur-xl">
                <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
                    <Link href="/" className="group flex items-center gap-2.5">
                        <SkillbaseLogo
                            size={26}
                            iconClassName="border-white/10 bg-[#0f1118] transition-transform duration-300 group-hover:scale-[1.04]"
                            labelClassName="transition-colors duration-300 group-hover:text-white"
                        />
                    </Link>

                    <nav className="hidden items-center gap-1 md:flex">
                        {[
                            { l: "Features", h: "#features" },
                            { l: "Workflow", h: "#workflow" },
                            { l: "Preview", h: "#preview" },
                        ].map((item) => (
                            <a
                                key={item.l}
                                href={item.h}
                                className="rounded-md px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
                            >
                                {item.l}
                            </a>
                        ))}
                    </nav>

                    <Link
                        href="/builder"
                        className="group inline-flex h-9 items-center gap-1.5 rounded-lg bg-white px-3.5 text-sm font-medium text-zinc-900 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_8px_24px_rgba(255,255,255,0.08)] transition hover:bg-zinc-100 active:scale-[0.97]"
                    >
                        <span className="hidden sm:inline">Open builder</span>
                        <span className="sm:hidden">Builder</span>
                        <ArrowRightIcon size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="relative isolate overflow-hidden px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:pt-36">
                <HeroScene />

                <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                    <a
                        href="#features"
                        className="fade-up group mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400 backdrop-blur transition hover:border-violet-400/40 hover:text-zinc-200"
                    >
                        <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                        AI skill drafting workspace
                        <ArrowRightIcon size={11} className="text-zinc-500 transition group-hover:translate-x-0.5 group-hover:text-zinc-300" />
                    </a>

                    <h1 className="fade-up-delay text-balance text-[clamp(2.5rem,8vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white">
                        Design AI skills{" "}
                        <span className="bg-[linear-gradient(120deg,#c4b5fd_0%,#a78bfa_40%,#f0abfc_100%)] bg-clip-text text-transparent">
                            you actually reuse.
                        </span>
                    </h1>

                    <p className="fade-up-slow mt-6 max-w-[52ch] text-pretty text-base leading-7 text-zinc-400 sm:text-[17px] sm:leading-8">
                        A focused, structured workspace for drafting reusable AI skills in
                        Markdown. Inputs on the left, live preview on the right — built for
                        the loop, not the demo.
                    </p>

                    <div className="fade-up-slow mt-9 flex w-full flex-col items-stretch justify-center gap-2.5 sm:w-auto sm:flex-row sm:gap-3">
                        <Link
                            href="/builder"
                            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_8px_28px_rgba(124,58,237,0.45)] transition hover:bg-violet-500 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.5),0_12px_40px_rgba(124,58,237,0.6)] active:scale-[0.97]"
                        >
                            <SparklesIcon size={14} />
                            Start building
                            <ArrowRightIcon size={13} className="transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <a
                            href="#preview"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-zinc-300 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                        >
                            See the workspace
                        </a>
                    </div>

                    {/* Quick keystroke hint */}
                    <div className="fade-up-slow mt-10 flex items-center gap-2 text-xs text-zinc-500">
                        <span>Built for keyboard flow</span>
                        <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">⌘ K</kbd>
                        <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">⌘ E</kbd>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="relative border-y border-white/[0.05] bg-white/[0.012]">
                <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-y divide-white/[0.05] sm:grid-cols-4 sm:divide-y-0">
                    {[
                        { value: "4", label: "Skill types" },
                        { value: "YAML", label: "Frontmatter" },
                        { value: ".md", label: "Native export" },
                        { value: "0", label: "Lock-in" },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="flex flex-col items-center gap-1 px-6 py-7 text-center"
                        >
                            <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
                                {s.value}
                            </span>
                            <span className="text-xs uppercase tracking-wider text-zinc-500">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section id="features" className="px-4 py-24 sm:px-6 sm:py-28 lg:py-32">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 max-w-2xl sm:mb-16">
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-400">
                            Features
                        </p>
                        <h2 className="text-balance text-[clamp(1.85rem,4.5vw,2.85rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                            Everything the drafting loop needs.
                        </h2>
                        <p className="mt-4 max-w-[52ch] text-base leading-7 text-zinc-400">
                            No decorative steps. No loose prompts. A structured workspace that
                            shrinks the gap between intent and reusable output.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <FeatureCard
                            wide
                            icon={<WorkflowIcon size={18} />}
                            title="Focused input"
                            description="Every field is narrow, explicit, and visible. Skill name, domain, type, context, entities, relationships — each section has exactly the room it needs."
                            tags={["Skill name", "Domain", "Context", "Entities", "Business rules"]}
                        />

                        <FeatureCard
                            icon={<ZapIcon size={18} />}
                            title="Tight output loop"
                            description="Write, preview, copy, export. The loop is four steps and stays four steps."
                        >
                            <div className="mt-4 space-y-1.5">
                                {[
                                    { i: <CopyIcon size={13} />, l: "Copy to clipboard", k: "⌘ C" },
                                    { i: <DownloadIcon size={13} />, l: "Export as .md", k: "⌘ E" },
                                ].map((row) => (
                                    <div
                                        key={row.l}
                                        className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-black/30 px-3 py-2"
                                    >
                                        <span className="text-violet-400">{row.i}</span>
                                        <span className="text-xs text-zinc-400">{row.l}</span>
                                        <kbd className="ml-auto rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">{row.k}</kbd>
                                    </div>
                                ))}
                            </div>
                        </FeatureCard>

                        <FeatureCard
                            icon={<LayersIcon size={18} />}
                            title="Reusable by default"
                            description="Portable Markdown files. Move them between repos and workflows without rewriting."
                        />

                        <FeatureCard
                            icon={<CodeIcon size={18} />}
                            title="Live Markdown preview"
                            description="The preview updates as you type. Toggle between rendered and raw at any time."
                        />

                        <FeatureCard
                            featured
                            icon={<FileTextIcon size={18} />}
                            title="Structured output, every time"
                            description="YAML frontmatter, typed sections, consistent formatting across every skill you produce."
                        >
                            <pre className="mt-5 overflow-x-auto rounded-xl border border-white/[0.07] bg-black/40 p-4 font-mono text-[11.5px] leading-6 text-zinc-400">
                                <span className="text-violet-400">---</span>{"\n"}
                                <span className="text-zinc-500">name:</span> create_asset_checkout{"\n"}
                                <span className="text-zinc-500">type:</span> WORKFLOW{"\n"}
                                <span className="text-zinc-500">domain:</span> asset operations{"\n"}
                                <span className="text-violet-400">---</span>
                            </pre>
                        </FeatureCard>
                    </div>
                </div>
            </section>

            {/* Workspace mockup */}
            <section id="preview" className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:py-32">
                <div className="pointer-events-none absolute left-1/2 top-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.06),transparent_65%)]" />

                <div className="relative mx-auto max-w-6xl">
                    <div className="mb-10 text-center sm:mb-14">
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-400">
                            Live workspace
                        </p>
                        <h2 className="text-balance text-[clamp(1.85rem,4.5vw,2.85rem)] font-semibold tracking-[-0.04em] text-white">
                            The builder, in one view.
                        </h2>
                        <p className="mx-auto mt-4 max-w-[48ch] text-base text-zinc-400">
                            Form on the left, live Markdown on the right. Always visible —
                            never hidden behind a tab.
                        </p>
                    </div>

                    {/* Browser frame */}
                    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c10] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)] sm:rounded-3xl">
                        <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.015] px-4 py-3">
                            <div className="flex items-center gap-1.5">
                                {["#3a3a40", "#2a2a30", "#1f1f25"].map((c) => (
                                    <div key={c} className="size-2.5 rounded-full" style={{ background: c }} />
                                ))}
                            </div>
                            <div className="hidden items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-1 text-[11px] text-zinc-500 sm:flex">
                                <span className="size-1.5 rounded-full bg-violet-400" />
                                skillbase://builder
                            </div>
                            <div className="hidden items-center gap-1.5 sm:flex">
                                {["Builder", "Preview", "Export"].map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[10px] text-zinc-500"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-[340px_1fr]">
                            {/* Form */}
                            <div className="border-b border-white/[0.06] p-5 sm:p-6 lg:border-b-0 lg:border-r">
                                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-400">
                                    Skill definition
                                </p>
                                <div className="flex flex-col gap-3.5">
                                    {[
                                        { label: "Skill name", value: "create_asset_checkout" },
                                        { label: "Domain", value: "asset operations" },
                                        { label: "Type", value: "WORKFLOW" },
                                    ].map((f) => (
                                        <div key={f.label}>
                                            <p className="mb-1.5 text-[11px] text-zinc-500">{f.label}</p>
                                            <div className="flex h-9 items-center rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 font-mono text-xs text-zinc-300">
                                                {f.value}
                                            </div>
                                        </div>
                                    ))}
                                    <div>
                                        <p className="mb-1.5 text-[11px] text-zinc-500">Project context</p>
                                        <div className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-xs leading-6 text-zinc-400">
                                            Internal tooling for teams that request, approve, and track hardware or software asset checkouts.
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
                                    <span className="text-xs text-zinc-500">Domain model ready</span>
                                    <div className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-violet-600 px-2.5 text-xs font-medium text-white shadow-[0_0_12px_rgba(124,58,237,0.3)]">
                                        <SparklesIcon size={11} />
                                        Generate
                                    </div>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="p-5 sm:p-6">
                                <div className="mb-5 flex items-center justify-between">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-400">
                                        Output preview
                                    </p>
                                    <div className="flex items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-0.5">
                                        <button className="rounded-md bg-violet-600 px-2.5 py-1 text-[11px] font-medium text-white">Preview</button>
                                        <button className="px-2.5 py-1 text-[11px] text-zinc-500">Raw</button>
                                    </div>
                                </div>

                                <div className="overflow-hidden rounded-xl border border-black/10 bg-zinc-50 p-5">
                                    <div className="flex flex-col gap-2 text-xs leading-6">
                                        <span className="text-sm font-bold text-zinc-800">Create Asset Checkout</span>
                                        <span className="text-[11px] text-zinc-400">
                                            Type: WORKFLOW · Domain: asset operations
                                        </span>
                                        <div className="mt-1 h-px bg-zinc-200" />
                                        <span className="font-semibold text-zinc-700">Inputs</span>
                                        {["Project context", "Domain entities", "Business rules"].map((item) => (
                                            <span key={item} className="flex items-center gap-2 text-zinc-600">
                                                <span className="size-1 shrink-0 rounded-full bg-violet-400" />
                                                {item}
                                            </span>
                                        ))}
                                        <div className="mt-1 h-px bg-zinc-200" />
                                        <span className="font-semibold text-zinc-700">Output</span>
                                        <span className="flex items-center gap-2 text-zinc-600">
                                            <span className="size-1 shrink-0 rounded-full bg-violet-400" />
                                            Reusable Markdown skill file
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-3 grid grid-cols-3 gap-2">
                                    {[
                                        { l: "Skill", v: "create_asset_checkout" },
                                        { l: "Type", v: "WORKFLOW" },
                                        { l: "Format", v: ".md" },
                                    ].map((m) => (
                                        <div
                                            key={m.l}
                                            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5"
                                        >
                                            <p className="text-[10px] uppercase tracking-[0.1em] text-zinc-500">{m.l}</p>
                                            <p className="mt-1 truncate font-mono text-[11px] text-zinc-300">{m.v}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workflow */}
            <section id="workflow" className="border-y border-white/[0.05] bg-white/[0.008] px-4 py-24 sm:px-6 sm:py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center sm:mb-16">
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-400">
                            Workflow
                        </p>
                        <h2 className="text-balance text-[clamp(1.85rem,4.5vw,2.85rem)] font-semibold tracking-[-0.04em] text-white">
                            From blank to shipped in three steps.
                        </h2>
                    </div>
                    <div className="relative grid gap-px bg-white/[0.05] sm:grid-cols-3">
                        {[
                            { n: "01", icon: FileTextIcon, title: "Define the structure", desc: "Fill in skill name, domain, type, context, and the domain model. Every field is intentional." },
                            { n: "02", icon: SparklesIcon, title: "Generate the draft", desc: "Hit generate. The structured Markdown skill is assembled from your inputs instantly." },
                            { n: "03", icon: GitBranchIcon, title: "Copy and ship", desc: "Copy the Markdown or export the .md file straight into your repository." },
                        ].map((step) => (
                            <div
                                key={step.n}
                                className="group relative bg-[#08080a] p-7 transition hover:bg-white/[0.012] sm:p-9"
                            >
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex size-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400 transition group-hover:border-violet-400/40 group-hover:text-violet-300">
                                        <step.icon size={16} />
                                    </div>
                                    <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-violet-400/60">
                                        {step.n}
                                    </span>
                                </div>
                                <h3 className="mb-3 text-base font-semibold tracking-tight text-white">
                                    {step.title}
                                </h3>
                                <p className="text-sm leading-7 text-zinc-400">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden px-4 py-28 sm:px-6 sm:py-32">
                <div className="pointer-events-none absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.12),transparent_65%)] blur-3xl" />
                <div className="relative mx-auto max-w-2xl text-center">
                    <div className="mb-7 inline-flex size-14 items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/10">
                        <SparklesIcon size={22} className="text-violet-300" />
                    </div>
                    <h2 className="text-balance text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white">
                        Ready to build skills that ship?
                    </h2>
                    <p className="mx-auto mt-5 max-w-[44ch] text-base leading-7 text-zinc-400">
                        Open the builder and get a structured, reusable Markdown skill in
                        under a minute.
                    </p>
                    <div className="mt-9">
                        <Link
                            href="/builder"
                            className="group inline-flex h-12 items-center gap-2.5 rounded-xl bg-violet-600 px-7 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_8px_28px_rgba(124,58,237,0.45)] transition hover:bg-violet-500 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.5),0_12px_44px_rgba(124,58,237,0.6)] active:scale-[0.97]"
                        >
                            <SparklesIcon size={15} />
                            Open builder
                            <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/[0.05]">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:text-left">
                    <SkillbaseLogo
                        size={20}
                        compact
                        iconClassName="border-white/[0.08] bg-[#0f1118]"
                        labelClassName="text-xs text-zinc-500"
                    />
                    <p className="text-xs text-zinc-600">Minimal AI skill drafting workspace</p>
                </div>
            </footer>
        </div>
    );
}

/* Sub-components */

function BackgroundOrnaments() {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(139,92,246,0.10),transparent)]" />
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    description,
    tags,
    children,
    wide,
    featured,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    tags?: string[];
    children?: React.ReactNode;
    wide?: boolean;
    featured?: boolean;
}) {
    return (
        <div
            className={[
                "group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 sm:p-7",
                wide ? "lg:col-span-2" : "",
                featured
                    ? "lg:col-span-2 border-violet-500/20 bg-gradient-to-br from-violet-950/30 via-violet-950/10 to-transparent hover:border-violet-500/35"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03]",
            ].join(" ")}
        >
            <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.08),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
                <div
                    className={[
                        "mb-5 flex size-10 items-center justify-center rounded-xl border",
                        featured
                            ? "border-violet-400/25 bg-violet-500/15 text-violet-300"
                            : "border-violet-500/20 bg-violet-500/10 text-violet-400",
                    ].join(" ")}
                >
                    {icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold tracking-tight text-white">{title}</h3>
                <p className="text-sm leading-7 text-zinc-400">{description}</p>
                {tags ? (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                        {tags.map((t) => (
                            <span
                                key={t}
                                className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[11px] text-zinc-400"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                ) : null}
                {children}
            </div>
        </div>
    );
}
