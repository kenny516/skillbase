import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function buttonStyles(variant: ButtonProps["variant"] = "primary") {
  return cn(
    "inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 disabled:cursor-not-allowed disabled:opacity-45",
    variant === "primary" && "border-black bg-black text-white hover:bg-black/90",
    variant === "secondary" && "border-line bg-panelStrong text-foreground hover:bg-white",
    variant === "ghost" &&
      "border-transparent bg-transparent text-foreground hover:border-line hover:bg-white/50"
  );
}

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonStyles(variant), className)}
      {...props}
    />
  );
}
