import * as React from "react";

import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full resize-none rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.035)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none transition-all duration-150",
        "placeholder:text-[var(--foreground-muted)]",
        "hover:border-[var(--line-strong)] hover:bg-[rgba(255,255,255,0.05)]",
        "focus:border-[var(--accent-border)] focus:bg-[rgba(139,92,246,0.04)] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]",
        className
      )}
      {...props}
    />
  );
}
