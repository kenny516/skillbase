import * as React from "react";

import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-[128px] w-full rounded-md border border-line bg-white/70 px-3 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-black/30 focus:bg-white",
        className
      )}
      {...props}
    />
  );
}
