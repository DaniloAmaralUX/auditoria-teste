import * as React from "react"

import { cn } from "@/lib/utils"

type IconTileProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: "sm" | "default"
}

/**
 * Tile neutro de ícone (garantias, contatos, cabeçalhos de seção).
 * Sempre neutro — bg-muted + borda; ícones lucide com strokeWidth 1.75.
 * O vermelho não decora ícones (regra do guia /design/cores).
 */
export function IconTile({ size = "default", className, ...props }: IconTileProps) {
  return (
    <span
      data-slot="icon-tile"
      className={cn(
        "bg-muted text-foreground flex shrink-0 items-center justify-center rounded-lg border",
        size === "default" ? "size-10 [&_svg]:size-5" : "size-9 [&_svg]:size-4",
        "[&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}
