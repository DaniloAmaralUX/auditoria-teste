import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Container — o vocabulário de largura da aplicação, consolidado.
 * Substitui o padrão repetido `mx-auto w-full max-w-6xl px-4 sm:px-6` (e primos).
 *
 * Larguras:
 * - `page` (72rem / max-w-6xl) — chrome/marketing: home, header, footer, guia
 * - `read` (48rem / max-w-3xl) — leitura longa: FAQ, LGPD, termos
 * - `flow` (42rem / max-w-2xl) — tarefa focada: registro, tracking detalhe
 * - `narrow` (36rem / max-w-xl) — foco mínimo: 404, mensagens curtas
 */
export type ContainerWidth = "page" | "read" | "flow" | "narrow"

const WIDTHS: Record<ContainerWidth, string> = {
  page: "max-w-6xl",
  read: "max-w-3xl",
  flow: "max-w-2xl",
  narrow: "max-w-xl",
}

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Largura semântica. Padrão: `page`. */
  width?: ContainerWidth
}

export function Container({ width = "page", className, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn("mx-auto w-full px-4 sm:px-6", WIDTHS[width], className)}
      {...props}
    />
  )
}
