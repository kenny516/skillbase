import * as React from "react";

import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function Checkbox({ className, label, hint, ...props }: CheckboxProps) {
  return (
    <label
      className={cn(
        "group flex cursor-pointer items-start gap-3 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.025)] px-3.5 py-3 transition-all duration-150",
        "hover:border-[var(--line-strong)] hover:bg-[rgba(255,255,255,0.045)]",
        className
      )}
    >
      <div className="relative mt-0.5 flex size-[15px] shrink-0 items-center justify-center">
        <input
          type="checkbox"
          className="peer absolute inset-0 cursor-pointer opacity-0"
          {...props}
        />
        <div className="size-[15px] rounded-[4px] border border-[var(--line-strong)] bg-[rgba(255,255,255,0.04)] transition-all duration-150 peer-checked:border-[var(--accent)] peer-checked:bg-[var(--accent)]" />
        <svg
          className="pointer-events-none absolute size-[9px] text-white opacity-0 transition-opacity peer-checked:opacity-100"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium leading-5 text-[var(--foreground)]">{label}</span>
        {hint ? (
          <span className="text-xs leading-5 text-[var(--foreground-muted)]">{hint}</span>
        ) : null}
      </span>
    </label>
  );
}
