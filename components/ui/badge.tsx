import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "outline" | "violet" | "success" | "destructive";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium leading-none",
        variant === "default" && "border border-white/[0.08] bg-white/[0.05] text-zinc-300",
        variant === "secondary" && "border border-white/[0.06] bg-white/[0.03] text-zinc-400",
        variant === "outline" && "border border-white/[0.1] text-zinc-400",
        variant === "violet" && "border border-violet-500/25 bg-violet-500/10 text-violet-300",
        variant === "success" && "border border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
        variant === "destructive" && "border border-red-500/25 bg-red-500/10 text-red-300",
        className
      )}
      {...props}
    />
  );
}
