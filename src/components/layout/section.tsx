import * as React from "react"

import { cn } from "@/lib/utils"
import { Container, type ContainerWidth } from "./container"

/**
 * Section — ritmo vertical padronizado do portal. Aceita banded/bordered para as
 * faixas alternadas que estruturam a home (papel → muted → papel), assim o ritmo
 * fica em um lugar só e páginas novas herdam a mesma cadência.
 *
 * Rhythms:
 * - `compact` py-12 sm:py-16 — seções curtas (contatos, aviso curto)
 * - `cozy`    py-16 sm:py-20 — o degrau padrão de conteúdo
 * - `roomy`   py-16 sm:py-24 — hero e chamadas de destaque
 */
export type SectionRhythm = "compact" | "cozy" | "roomy"

const RHYTHMS: Record<SectionRhythm, string> = {
  compact: "py-12 sm:py-16",
  cozy: "py-16 sm:py-20",
  roomy: "py-16 sm:py-24",
}

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  rhythm?: SectionRhythm
  /** Faixa em superfície muted com bordas — para alternância editorial. */
  banded?: boolean
  /** Borda superior/inferior isolada (para separar sem trocar de superfície). */
  bordered?: "top" | "bottom"
  /**
   * Envolve o children num Container. Passe `false` se a seção compõe seu próprio
   * container manualmente (ex.: home com múltiplas larguras internas).
   */
  container?: ContainerWidth | false
}

export function Section({
  rhythm = "cozy",
  banded = false,
  bordered,
  container = "page",
  className,
  children,
  ...props
}: SectionProps) {
  const inner =
    container === false ? children : <Container width={container}>{children}</Container>

  return (
    <section
      data-slot="section"
      className={cn(
        RHYTHMS[rhythm],
        banded && "bg-muted/30 border-y",
        bordered === "top" && "border-t",
        bordered === "bottom" && "border-b",
        className
      )}
      {...props}
    >
      {inner}
    </section>
  )
}
