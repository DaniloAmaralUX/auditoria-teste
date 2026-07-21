import { cn } from "@/lib/utils"

/**
 * Ícones com draw-on (traço desenhado uma vez, ao montar) — CSS puro.
 *
 * A adoção do Animate UI "com contenção" (ver /design/motion): em vez de
 * importar o registry inteiro, o efeito é uma animação de stroke-dashoffset
 * sobre os nossos tokens, submetida ao filtro de frequência — só entra em
 * momentos de primeira impressão (garantias da home).
 *
 * Robusto por construção: o estado-base do traço é cheio e visível; a
 * animação apenas o esconde e redesenha. Se ela não rodar (aba em segundo
 * plano, prefers-reduced-motion, motion indisponível), o ícone continua
 * visível — nunca depende de JS para aparecer. Sob reduced-motion, o @media
 * global zera a duração e o traço assenta cheio de imediato.
 *
 * Geometria alinhada aos ícones lucide (viewBox 24, strokeWidth 1.75) para
 * conviver com o resto da interface dentro do IconTile.
 */
type AnimatedIconName = "lock" | "anonymity" | "shield"

type AnimatedIconProps = {
  name: AnimatedIconName
  className?: string
  /** Atraso em segundos (stagger entre cartões). */
  delay?: number
}

/** Segmentos de cada ícone: [pathData, ordem-de-desenho]. Ordem cria o gesto. */
const ICONS: Record<AnimatedIconName, { d: string; step: number }[]> = {
  // Cadeado fechando: corpo, depois o arco por cima (sigilo).
  lock: [
    { d: "M5 11h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z", step: 0 },
    { d: "M8 11V7a4 4 0 0 1 8 0v4", step: 1 },
  ],
  // Olho e, por último, o traço que o cobre (anonimato: o traço fecha a visão).
  anonymity: [
    { d: "M3 12s3.5-6.5 9-6.5 9 6.5 9 6.5-3.5 6.5-9 6.5-9-6.5-9-6.5Z", step: 0 },
    { d: "M12 9.5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5", step: 1 },
    { d: "M4 4l16 16", step: 2 },
  ],
  // Escudo e, depois, o check (não retaliação: a proteção se confirma).
  shield: [
    { d: "M12 3l7 2.5V11c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V5.5L12 3Z", step: 0 },
    { d: "M9 12l2 2 4-4", step: 1 },
  ],
}

export function AnimatedIcon({ name, className, delay = 0 }: AnimatedIconProps) {
  const segments = ICONS[name]

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("size-5", className)}
    >
      {segments.map((seg) => (
        <path
          key={seg.d}
          d={seg.d}
          pathLength={1}
          className="icon-draw"
          style={{ animationDelay: `${delay + seg.step * 0.16}s` }}
        />
      ))}
    </svg>
  )
}
