import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const workflowRows = ["Context-aware drafting", "Domain-model-assisted generation", "Markdown-first output"];
const editorRows = [
  "skill.name = create_asset_checkout",
  "domain = asset operations",
  "entities = Asset, CheckoutRequest, Employee, Approver",
  "rules = Approval required, audit timestamps mandatory",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f4ef]">
      <section className="relative min-h-[92svh] overflow-hidden bg-[#0d1014] text-white">
        <img
          src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=80"
          alt="Developer workspace with code on screen"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-32"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,16,20,0.92)_0%,rgba(13,16,20,0.82)_44%,rgba(13,16,20,0.48)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_72%,#f5f4ef_100%)]" />

        <div className="relative flex min-h-[92svh] flex-col px-4 pt-5 sm:px-6 lg:px-8">
          <header className="fade-up mx-auto flex w-full max-w-[1440px] items-center justify-between py-2">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.26em] text-white/70">
              <span>Skillbase</span>
              <span className="h-1 w-1 rounded-full bg-white/35" />
              <span>Markdown skill studio</span>
            </div>
            <Link href="/builder" className="text-sm text-white/76 transition hover:text-white">
              Open builder
            </Link>
          </header>

          <div className="mx-auto grid w-full max-w-[1440px] flex-1 gap-8 pb-16 pt-8 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-end lg:pb-24">
            <div className="flex max-w-[620px] flex-col justify-end gap-8">
              <div className="space-y-6">
                <p className="fade-up text-[clamp(4.4rem,12vw,11rem)] leading-[0.86] tracking-[-0.1em] text-white">
                  Skillbase
                </p>
                <div className="fade-up-delay space-y-4">
                  <h1 className="max-w-[13ch] text-3xl font-medium leading-[1.02] tracking-[-0.08em] text-white sm:text-5xl lg:text-6xl">
                    Design reusable AI skills in Markdown.
                  </h1>
                  <p className="max-w-[44ch] text-sm leading-8 text-white/72 sm:text-base">
                    Capture domain context, shape the workflow, preview the final file, and
                    export a calm, reusable artifact.
                  </p>
                </div>
                <div className="fade-up-slow flex flex-wrap gap-3">
                  <Link href="/builder" className={cn(buttonStyles("primary"), "min-w-[152px]")}>
                    Start building
                  </Link>
                  <a href="#workflow" className={cn(buttonStyles("ghost"), "min-w-[152px] border-white/18 text-white hover:bg-white/10 hover:text-white")}>
                    See workflow
                  </a>
                </div>
              </div>
            </div>

            <div className="fade-up-slow flex items-end justify-end">
              <div className="w-full max-w-[760px] overflow-hidden rounded-lg border border-white/12 bg-black/42 shadow-[0_32px_100px_rgba(0,0,0,0.45)] backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-white/46">
                  <span>Structured input</span>
                  <span>Live markdown output</span>
                </div>
                <div className="grid lg:grid-cols-[0.96fr_1.04fr]">
                  <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
                    <div className="space-y-3">
                      {editorRows.map((row) => (
                        <div
                          key={row}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-white/74"
                        >
                          {row}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <pre className="overflow-x-auto text-xs leading-6 text-white/82">
{`---
name: create_asset_checkout
description: Create an asset checkout skill
version: 1.0.0
type: WORKFLOW
---

# Create Asset Checkout

## When to use
- Internal asset request flows
- Approval and handoff steps

## Output
- Reusable Markdown skill
- Frontmatter-ready export`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,1.42fr)]">
          <div className="max-w-[420px]">
            <p className="text-[11px] uppercase tracking-[0.26em] text-muted">Workflow</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.07em] text-foreground sm:text-4xl">
              One pass from context to clean export.
            </h2>
            <p className="mt-5 text-sm leading-8 text-muted">
              Start with domain language, add the model, inspect the Markdown, and keep the file
              ready for handoff.
            </p>
          </div>

          <div className="border-t border-line">
            {workflowRows.map((row, index) => (
              <div
                key={row}
                className="grid gap-3 border-b border-line py-6 sm:grid-cols-[84px_minmax(0,1fr)_minmax(0,0.62fr)] sm:items-start"
              >
                <span className="text-[11px] uppercase tracking-[0.24em] text-muted">
                  0{index + 1}
                </span>
                <h3 className="text-xl font-medium tracking-[-0.05em] text-foreground">{row}</h3>
                <p className="text-sm leading-7 text-muted">
                  {index === 0 &&
                    "Capture project context before drafting so the skill inherits the right vocabulary and scope."}
                  {index === 1 &&
                    "Shape entities, relationships, and business rules so the generated file reflects the real system."}
                  {index === 2 &&
                    "Inspect, copy, or download a Markdown skill that stays portable across repos and agent workflows."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
          <div className="overflow-hidden rounded-lg bg-[#111418]">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
              alt="Laptop and screen showing development work"
              className="h-[360px] w-full object-cover"
            />
          </div>

          <div className="max-w-[520px]">
            <p className="text-[11px] uppercase tracking-[0.26em] text-muted">Product view</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.07em] text-foreground sm:text-4xl">
              Builder on the left. Markdown on the right. No extra noise.
            </h2>
            <p className="mt-5 text-sm leading-8 text-muted">
              The MVP stays narrow on purpose: structured inputs, domain-aware drafting, and a
              direct path to a reusable `.md` output.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/builder" className={cn(buttonStyles("primary"), "min-w-[152px]")}>
                Start building
              </Link>
              <span className="inline-flex h-10 items-center rounded-md border border-line px-4 text-sm text-muted">
                App Router, Tailwind, TypeScript
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
