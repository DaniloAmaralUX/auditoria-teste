import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Tag informativa (público-alvo, garantias na intro do registro).
 * Cantos contidos (rounded-md) — pill fica reservado ao StatusBadge.
 */
export function Chip({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="chip"
      className={cn(
        "border-border bg-muted/40 text-foreground inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-sm",
        className
      )}
      {...props}
    />
  )
}
