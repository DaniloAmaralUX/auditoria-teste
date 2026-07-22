import * as React from "react"

import { cn } from "@/lib/utils"

type PageGreetingProps = {
  /** Linha principal, em serif. Ex.: "Boa tarde," */
  title: React.ReactNode
  /** Trecho destacado em muted na mesma linha (ex.: o nome). */
  highlight?: React.ReactNode
  /** Subtítulo de uma linha, muted. */
  subtitle?: React.ReactNode
  align?: "center" | "left"
  className?: string
}

/**
 * Saudação/título editorial no padrão Midday ("Good afternoon, Sam"): serif de
 * display, com o nome em muted. A assinatura tipográfica do produto.
 */
export function PageGreeting({
  title,
  highlight,
  subtitle,
  align = "center",
  className,
}: PageGreetingProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <h1 className="font-heading text-3xl text-balance sm:text-4xl">
        {title}
        {highlight ? <span className="text-muted-foreground"> {highlight}</span> : null}
      </h1>
      {subtitle ? (
        <p className="text-muted-foreground mx-auto mt-2 max-w-xl text-base text-pretty">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
