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
        "flex cursor-pointer items-start gap-3 rounded-md border border-line bg-white/55 px-3 py-3 transition hover:bg-white/75",
        className
      )}
    >
      <input
        type="checkbox"
        className="mt-0.5 size-4 rounded border-line text-black accent-black"
        {...props}
      />
      <span className="flex flex-col gap-1">
        <span className="text-sm text-foreground">{label}</span>
        {hint ? <span className="text-xs leading-5 text-muted">{hint}</span> : null}
      </span>
    </label>
  );
}
