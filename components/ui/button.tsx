import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md"
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-border)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--background)] disabled:cursor-not-allowed disabled:opacity-40 select-none",
    size === "sm" && "h-8 px-3 text-xs",
    size === "md" && "h-9 px-4 text-sm",
    size === "lg" && "h-10 px-5 text-sm",
    variant === "primary" &&
      "border border-[rgba(139,92,246,0.7)] bg-[var(--accent)] text-white shadow-[0_0_0_1px_rgba(139,92,246,0.2),0_6px_20px_rgba(139,92,246,0.22)] hover:bg-[var(--accent-hover)] hover:shadow-[0_0_0_1px_rgba(139,92,246,0.3),0_8px_24px_rgba(139,92,246,0.28)] active:scale-[0.98]",
    variant === "secondary" &&
      "border border-[var(--line-strong)] bg-[rgba(255,255,255,0.04)] text-[var(--foreground)] hover:bg-[rgba(255,255,255,0.07)] hover:border-[var(--line-strong)] active:scale-[0.98]",
    variant === "ghost" &&
      "border border-transparent bg-transparent text-[var(--foreground-soft)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--foreground)] hover:border-[var(--line)]",
    variant === "danger" &&
      "border border-[rgba(239,68,68,0.4)] bg-[rgba(239,68,68,0.1)] text-[#f87171] hover:bg-[rgba(239,68,68,0.16)] active:scale-[0.98]"
  );
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonStyles(variant, size), className)}
      {...props}
    />
  );
}
