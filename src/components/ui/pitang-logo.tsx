import { cn } from "@/lib/utils"

type PitangLogoProps = {
  /**
   * brand = wordmark vermelho institucional (footer, documentos);
   * mono = wordmark via CSS mask (herda currentColor, p/ fundos escuros);
   * symbol = símbolo isolado quadrado (public/favicon.svg) p/ espaços estreitos (rail do painel).
   */
  variant?: "brand" | "mono" | "symbol"
  className?: string
  /** Nome acessível; passe null quando a logo for decorativa ao lado de texto visível. */
  label?: string | null
}

/**
 * Logo Pitang sobre os assets oficiais (public/pitang-logo.svg = wordmark;
 * public/favicon.svg = símbolo isolado). Regra do guia /design/marca: mono
 * onde o wordmark precisa herdar a cor; vermelha em footer e documentos.
 */
export function PitangLogo({
  variant = "brand",
  className,
  label = "Pitang",
}: PitangLogoProps) {
  if (variant === "symbol") {
    return (
      <img
        src="/favicon.svg"
        alt={label ?? ""}
        aria-hidden={label ? undefined : true}
        width={40}
        height={40}
        className={cn("h-auto", className)}
      />
    )
  }

  if (variant === "mono") {
    return (
      <span
        role={label ? "img" : undefined}
        aria-label={label ?? undefined}
        aria-hidden={label ? undefined : true}
        className={cn("inline-block", className)}
        style={{
          backgroundColor: "currentColor",
          maskImage: "url(/pitang-logo.svg)",
          WebkitMaskImage: "url(/pitang-logo.svg)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          aspectRatio: "137 / 39",
        }}
      />
    )
  }

  return (
    <img
      src="/pitang-logo.svg"
      alt={label ?? ""}
      aria-hidden={label ? undefined : true}
      width={137}
      height={39}
      className={cn("w-auto", className)}
    />
  )
}
