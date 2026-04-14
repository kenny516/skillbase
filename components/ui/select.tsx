import * as React from "react";

import { cn } from "@/lib/utils";

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-md border border-line bg-white/70 px-3 text-sm text-foreground outline-none transition focus:border-black/30 focus:bg-white",
        className
      )}
      {...props}
    />
  );
}
