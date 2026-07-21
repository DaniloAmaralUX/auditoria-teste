import * as React from "react"

import { cn } from "@/lib/utils"

type EyebrowProps = React.HTMLAttributes<HTMLElement> & {
  /** Elemento renderizado (p por padrão; use span em linha). */
  as?: "p" | "span"
}

/**
 * Rótulo de seção (eyebrow) — o padrão inline mais repetido do portal,
 * promovido a componente. Neutro por padrão: o laranja fica para ação/estado.
 */
export function Eyebrow({ as: Tag = "p", className, ...props }: EyebrowProps) {
  return (
    <Tag
      data-slot="eyebrow"
      className={cn(
        "text-muted-foreground text-xs font-semibold tracking-[0.08em] uppercase",
        className
      )}
      {...props}
    />
  )
}
