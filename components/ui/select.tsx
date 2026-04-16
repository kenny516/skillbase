import * as React from "react";

import { cn } from "@/lib/utils";

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-9 w-full appearance-none rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.035)] px-3 pr-8 text-sm text-[var(--foreground)] outline-none transition-all duration-150",
        "hover:border-[var(--line-strong)] hover:bg-[rgba(255,255,255,0.05)]",
        "focus:border-[var(--accent-border)] focus:bg-[rgba(139,92,246,0.04)] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]",
        "[background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 fill%3D%22none%22 viewBox%3D%220 0 16 16%22%3E%3Cpath stroke%3D%22%2371717a%22 stroke-linecap%3D%22round%22 stroke-linejoin%3D%22round%22 stroke-width%3D%221.5%22 d%3D%22m4 6 4 4 4-4%22%2F%3E%3C%2Fsvg%3E')]",
        "[background-position:right_8px_center] [background-repeat:no-repeat] [background-size:16px]",
        className
      )}
      {...props}
    />
  );
}
