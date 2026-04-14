import * as React from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-white/70 px-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-black/30 focus:bg-white",
        className
      )}
      {...props}
    />
  );
}
