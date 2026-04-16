import Link from "next/link";

import LightPillar from "@/components/animated/light-pillar";

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
        <div className="min-h-screen bg-[#09090b] text-[#f4f4f5]">

            {/* Nav */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-lg border-b border-white/[0.06]">
                <div className="flex items-center justify-between max-w-6xl px-5 mx-auto h-14">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-violet-600 text-[11px] font-bold text-white shadow-[0_0_16px_rgba(124,58,237,0.5)] transition group-hover:shadow-[0_0_20px_rgba(124,58,237,0.65)]">
                            S
                        </div>
                        <span className="text-sm font-semibold tracking-tight">Skillbase</span>
                    </Link>

                    {/* Links */}
                    <nav className="hidden sm:flex items-center gap-0.5">
                        {["Features", "Preview", "Workflow"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="px-3 py-1.5 text-sm text-zinc-400 rounded-lg transition hover:text-white hover:bg-white/[0.05]"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* CTA */}
                    <Link
                        href="/builder"
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 text-sm font-medium text-white transition hover:bg-violet-500 shadow-[0_0_16px_rgba(124,58,237,0.35)] hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] active:scale-95"
                    >
                        Open builder
                        <ArrowRightIcon size={13} />
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="relative flex flex-col items-center justify-center min-h-screen px-5 pt-32 pb-24 overflow-hidden">
                <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                    <LightPillar
                        topColor="#7c3aed"
                        bottomColor="#c084fc"
                        intensity={0.8}
                        rotationSpeed={0.2}
                        glowAmount={0.004}
                        pillarWidth={2.0}
                        pillarHeight={0.35}
                        noiseIntensity={0.3}
                        pillarRotation={0}
                        interactive={false}
                        mixBlendMode="screen"
                        quality="high"
                    />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Badge */}
                    <div className="fade-up mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1.5 text-xs font-medium text-violet-300">
                        <SparklesIcon size={11} />
                        AI Skill Drafting Workspace
                    </div>

                    {/* Headline */}
                    <h1 className="fade-up-delay max-w-[14ch] text-[clamp(3rem,7.5vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
                        Build AI skills{" "}
                        <span
                            className="inline-block"
                            style={{
                                background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 45%, #c084fc 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            that last.
                        </span>
                    </h1>

                    <p className="fade-up-slow mt-7 max-w-[44ch] text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                        Skillbase is a minimal workspace for drafting reusable AI skills
                        in structured Markdown — input on one side, live preview on the other.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 fade-up-slow">
                        <Link
                            href="/builder"
                            className="inline-flex h-11 items-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.4)] transition hover:bg-violet-500 hover:shadow-[0_0_32px_rgba(124,58,237,0.55)] active:scale-95"
                        >
                            <SparklesIcon size={14} />
                            Start building
                        </Link>
                        <a
                            href="#features"
                            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.07] hover:text-white"
                        >
                            See how it works
                            <ArrowRightIcon size={13} />
                        </a>
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="absolute flex flex-col items-center gap-2 -translate-x-1/2 bottom-10 left-1/2 opacity-30">
                    <div className="w-px h-8 bg-gradient-to-b from-transparent to-zinc-400" />
                </div>
            </section>

            {/* Stats */}
            <div className="relative border-y border-white/[0.06] bg-white/[0.015]">
                <div className="grid max-w-5xl grid-cols-2 mx-auto sm:grid-cols-4">
                    {[
                        { value: "4", label: "Skill types" },
                        { value: "YAML", label: "Frontmatter" },
                        { value: ".md", label: "Native export" },
                        { value: "0", label: "Lock-in" },
                    ].map((s, i) => (
                        <div
                            key={s.label}
                            className={`flex flex-col items-center gap-1 px-6 py-7 text-center ${i < 3 ? "border-r border-white/[0.06]" : ""} ${i === 2 ? "border-r-0 sm:border-r" : ""}`}
                        >
                            <span className="text-2xl font-semibold tracking-tight text-white">{s.value}</span>
                            <span className="text-xs text-zinc-500">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features */}
            <section id="features" className="px-5 py-28">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-14">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-violet-400">
                            Features
                        </p>
                        <h2 className="max-w-[20ch] text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-white">
                            Everything the drafting loop needs.
                        </h2>
                        <p className="mt-4 max-w-[48ch] text-base text-zinc-400">
                            No decorative steps. No loose prompts. Just a structured workspace
                            that reduces the gap between intent and reusable output.
                        </p>
                    </div>

                    {/* Bento grid */}
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Card 1 wide */}
                        <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7 lg:col-span-2 hover:border-white/[0.12] transition-all duration-300">
                            <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.08),transparent_70%)] transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                            <div className="flex items-center justify-center mb-5 border size-10 rounded-xl border-violet-500/20 bg-violet-500/10 text-violet-400">
                                <WorkflowIcon size={18} />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold tracking-tight text-white">Focused input</h3>
                            <p className="text-sm leading-7 text-zinc-400">
                                The builder keeps every field narrow, explicit, and visible. Skill name, domain, type, context,
                                entities, relationships — each section has exactly the room it needs, nothing more.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-6">
                                {["Skill name", "Domain", "Context", "Entities", "Business rules"].map((tag) => (
                                    <span key={tag} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7 hover:border-white/[0.12] transition-all duration-300">
                            <div className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.07),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex items-center justify-center mb-5 border size-10 rounded-xl border-violet-500/20 bg-violet-500/10 text-violet-400">
                                <ZapIcon size={18} />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold tracking-tight text-white">Tight output loop</h3>
                            <p className="text-sm leading-7 text-zinc-400">
                                Write, preview, copy, export. The loop is four steps and stays four steps.
                            </p>
                            <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/30 px-3 py-2.5">
                                <CopyIcon size={13} className="text-violet-400" />
                                <span className="text-xs text-zinc-400">Copy to clipboard</span>
                                <span className="ml-auto rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-zinc-500">Cmd C</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/30 px-3 py-2.5">
                                <DownloadIcon size={13} className="text-violet-400" />
                                <span className="text-xs text-zinc-400">Export as .md</span>
                                <span className="ml-auto rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-zinc-500">Cmd E</span>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7 hover:border-white/[0.12] transition-all duration-300">
                            <div className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.07),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex items-center justify-center mb-5 border size-10 rounded-xl border-violet-500/20 bg-violet-500/10 text-violet-400">
                                <LayersIcon size={18} />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold tracking-tight text-white">Reusable by default</h3>
                            <p className="text-sm leading-7 text-zinc-400">
                                Skills are portable Markdown files. Move them between repos and workflows without rewriting.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7 hover:border-white/[0.12] transition-all duration-300">
                            <div className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.07),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex items-center justify-center mb-5 border size-10 rounded-xl border-violet-500/20 bg-violet-500/10 text-violet-400">
                                <CodeIcon size={18} />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold tracking-tight text-white">Live Markdown preview</h3>
                            <p className="text-sm leading-7 text-zinc-400">
                                The preview updates as you type. Toggle between rendered and raw at any time.
                            </p>
                        </div>

                        {/* Card 5 wide */}
                        <div className="relative overflow-hidden transition-all duration-300 border group rounded-2xl border-violet-500/20 bg-violet-950/20 p-7 lg:col-span-2 hover:border-violet-500/35">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_100%,rgba(124,58,237,0.08),transparent)]" />
                            <div className="relative">
                                <div className="flex items-center justify-center mb-5 border size-10 rounded-xl border-violet-500/25 bg-violet-500/15 text-violet-300">
                                    <FileTextIcon size={18} />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold tracking-tight text-white">Structured output, every time</h3>
                                <p className="mb-5 text-sm leading-7 text-zinc-400">
                                    YAML frontmatter, typed sections, consistent formatting across every skill you produce.
                                </p>
                                <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-black/40 p-4 font-mono text-xs leading-6 text-zinc-400">
                                    <span className="text-violet-400">---</span>
                                    <br />
                                    <span className="text-zinc-500">name:</span> create_asset_checkout<br />
                                    <span className="text-zinc-500">type:</span> WORKFLOW<br />
                                    <span className="text-zinc-500">domain:</span> asset operations<br />
                                    <span className="text-violet-400">---</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Builder preview */}
            <section id="preview" className="relative px-5 overflow-hidden py-28">
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.05),transparent_65%)]" />
                <div className="relative max-w-6xl mx-auto">
                    <div className="mb-12 text-center">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-violet-400">Live workspace</p>
                        <h2 className="text-[clamp(1.9rem,4.5vw,3rem)] font-semibold tracking-[-0.04em] text-white">
                            The builder, in one view.
                        </h2>
                        <p className="mx-auto mt-4 max-w-[44ch] text-base text-zinc-400">
                            Form on the left, live Markdown preview on the right. Always visible, never hidden behind a tab.
                        </p>
                    </div>

                    {/* Mockup frame */}
                    <div className="overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0d0d10] shadow-[0_32px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]">
                        {/* Chrome bar */}
                        <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
                            <div className="flex items-center gap-2">
                                <div className="size-2.5 rounded-full bg-white/10" />
                                <div className="size-2.5 rounded-full bg-white/[0.07]" />
                                <div className="size-2.5 rounded-full bg-white/[0.05]" />
                            </div>
                            <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] text-zinc-500">
                                <span className="size-1.5 rounded-full bg-violet-500/60" />
                                skillbase://builder
                            </div>
                            <div className="flex items-center gap-1.5">
                                {["Builder", "Preview", "Export"].map((tag) => (
                                    <span key={tag} className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-0.5 text-[10px] text-zinc-500">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Layout */}
                        <div className="grid lg:grid-cols-[340px_1fr]">
                            {/* Left form */}
                            <div className="border-b border-white/[0.06] p-6 lg:border-b-0 lg:border-r">
                                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-400">
                                    Skill definition
                                </p>
                                <div className="flex flex-col gap-4">
                                    {[
                                        { label: "Skill name", value: "create_asset_checkout" },
                                        { label: "Domain", value: "asset operations" },
                                        { label: "Type", value: "WORKFLOW" },
                                    ].map((f) => (
                                        <div key={f.label}>
                                            <p className="mb-1.5 text-xs text-zinc-500">{f.label}</p>
                                            <div className="flex h-8 items-center rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 text-xs text-zinc-300">
                                                {f.value}
                                            </div>
                                        </div>
                                    ))}
                                    <div>
                                        <p className="mb-1.5 text-xs text-zinc-500">Project context</p>
                                        <div className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-xs leading-6 text-zinc-400">
                                            Internal tooling for teams that request, approve, and track hardware or software asset checkouts.
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
                                    <span className="text-xs text-zinc-500">Domain model ready</span>
                                    <div className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-violet-600 px-3 text-xs font-medium text-white shadow-[0_0_12px_rgba(124,58,237,0.3)]">
                                        <SparklesIcon size={11} />
                                        Generate
                                    </div>
                                </div>
                            </div>

                            {/* Right preview */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-400">Output preview</p>
                                    <div className="flex items-center gap-1 rounded-lg border border-white/[0.07] bg-white/[0.02] p-0.5">
                                        <button className="rounded-md bg-violet-600 px-3 py-1 text-[11px] font-medium text-white">Preview</button>
                                        <button className="px-3 py-1 text-[11px] text-zinc-500">Raw MD</button>
                                    </div>
                                </div>

                                <div className="p-5 overflow-hidden border rounded-2xl border-black/10 bg-zinc-50">
                                    <div className="flex flex-col gap-2 text-xs leading-6">
                                        <span className="text-sm font-bold text-zinc-800">Create Asset Checkout</span>
                                        <span className="text-zinc-400 text-[11px]">Type: WORKFLOW · Domain: asset operations</span>
                                        <div className="h-px mt-1 bg-zinc-200" />
                                        <span className="font-semibold text-zinc-700">Inputs</span>
                                        {["Project context", "Domain entities", "Business rules"].map((item) => (
                                            <span key={item} className="flex items-center gap-2 text-zinc-600">
                                                <span className="rounded-full size-1 bg-violet-400 shrink-0" />
                                                {item}
                                            </span>
                                        ))}
                                        <div className="h-px mt-1 bg-zinc-200" />
                                        <span className="font-semibold text-zinc-700">Output</span>
                                        <span className="flex items-center gap-2 text-zinc-600">
                                            <span className="rounded-full size-1 bg-violet-400 shrink-0" />
                                            Reusable Markdown skill file
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-2.5">
                                    {[
                                        { l: "Skill", v: "create_asset_checkout" },
                                        { l: "Type", v: "WORKFLOW" },
                                        { l: "Format", v: ".md" },
                                    ].map((m) => (
                                        <div key={m.l} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                                            <p className="text-[10px] uppercase tracking-[0.1em] text-zinc-500">{m.l}</p>
                                            <p className="mt-1.5 truncate text-xs font-medium text-zinc-300">{m.v}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workflow */}
            <section id="workflow" className="border-y border-white/[0.06] bg-white/[0.01] px-5 py-28">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-violet-400">Workflow</p>
                        <h2 className="text-[clamp(1.9rem,4.5vw,3rem)] font-semibold tracking-[-0.04em] text-white">
                            From blank to shipped in three steps.
                        </h2>
                    </div>
                    <div className="grid gap-0 sm:grid-cols-3">
                        {[
                            { n: "01", icon: FileTextIcon, title: "Define the structure", desc: "Fill in skill name, domain, type, context, and domain model. Every field is intentional." },
                            { n: "02", icon: SparklesIcon, title: "Generate the draft", desc: "Hit generate. The structured Markdown skill is assembled from your inputs instantly." },
                            { n: "03", icon: GitBranchIcon, title: "Copy and ship", desc: "Copy the Markdown or export the .md file directly into your repository." },
                        ].map((step, i) => (
                            <div
                                key={step.n}
                                className={`relative p-8 ${i < 2 ? "sm:border-r border-white/[0.06]" : ""}`}
                            >
                                {i < 2 && (
                                    <div className="absolute bottom-0 left-8 right-0 h-px bg-white/[0.06] sm:hidden" />
                                )}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex items-center justify-center border size-9 rounded-xl border-violet-500/20 bg-violet-500/10 text-violet-400">
                                        <step.icon size={16} />
                                    </div>
                                    <span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-violet-400/60">
                                        {step.n}
                                    </span>
                                </div>
                                <h3 className="mb-3 text-base font-semibold tracking-tight text-white">{step.title}</h3>
                                <p className="text-sm leading-7 text-zinc-400">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative px-5 py-32 overflow-hidden">
                <div className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none left-1/2 top-1/2">
                    <div className="size-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.1),transparent_65%)] blur-3xl" />
                </div>
                <div className="relative max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center mb-8 border size-14 rounded-2xl border-violet-500/20 bg-violet-500/10">
                        <SparklesIcon size={22} className="text-violet-400" />
                    </div>
                    <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white">
                        Ready to build skills that ship?
                    </h2>
                    <p className="mx-auto mt-6 max-w-[40ch] text-base leading-7 text-zinc-400">
                        Open the builder and get a structured, reusable Markdown skill in under a minute.
                    </p>
                    <div className="mt-10">
                        <Link
                            href="/builder"
                            className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-violet-600 px-8 text-sm font-semibold text-white shadow-[0_0_32px_rgba(124,58,237,0.4)] transition hover:bg-violet-500 hover:shadow-[0_0_48px_rgba(124,58,237,0.55)] active:scale-95"
                        >
                            <SparklesIcon size={15} />
                            Open builder
                            <ArrowRightIcon size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/[0.06]">
                <div className="flex items-center justify-between max-w-6xl px-5 py-6 mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="flex size-5 items-center justify-center rounded-md bg-violet-600 text-[9px] font-bold text-white">
                            S
                        </div>
                        <span className="text-xs text-zinc-500">Skillbase</span>
                    </div>
                    <p className="text-xs text-zinc-600">Minimal AI skill drafting workspace</p>
                </div>
            </footer>
        </div>
    );
}
