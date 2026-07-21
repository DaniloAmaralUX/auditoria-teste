import { cn } from "@/lib/utils"

type PitangLogoProps = {
  /** brand = vermelha institucional (footer, documentos); mono = via CSS mask (header, perto de CTA laranja). */
  variant?: "brand" | "mono"
  className?: string
  /** Nome acessível; passe null quando a logo for decorativa ao lado de texto visível. */
  label?: string | null
}

/**
 * Logo Pitang sobre o único asset oficial (public/pitang-logo.svg).
 * Regra do guia /design/marca: mono onde houver CTA laranja no mesmo campo
 * visual; vermelha em footer e documentos. A mono herda currentColor.
 */
export function PitangLogo({
  variant = "brand",
  className,
  label = "Pitang",
}: PitangLogoProps) {
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
