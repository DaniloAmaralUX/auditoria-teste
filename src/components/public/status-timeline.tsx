import { CircleDot, MessageSquareReply, HelpCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import type { TrackingEvent } from "@/features/tracking/mock-store"
import { statusConfig } from "@/lib/manifestation-status"

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

const kindMeta = {
  status: { icon: CircleDot, label: "Atualização de status" },
  response: { icon: MessageSquareReply, label: "Devolutiva do Comitê" },
  request: { icon: HelpCircle, label: "Pedido de complemento" },
} as const

type StatusTimelineProps = {
  events: TrackingEvent[]
}

/**
 * Linha do tempo pública do acompanhamento (doc 15 — StatusTimeline).
 * Cada evento tem data, tipo (ícone + rótulo textual) e descrição — não depende só de cor (RNF-007).
 * Ordena do mais recente para o mais antigo.
 */
export function StatusTimeline({ events }: StatusTimelineProps) {
  const ordered = [...events].reverse()

  return (
    <ol className="space-y-0">
      {ordered.map((event, index) => {
        const meta = kindMeta[event.kind]
        const Icon = meta.icon
        const isLast = index === ordered.length - 1
        const isCurrent = index === 0
        const token =
          event.kind === "status" && event.status
            ? `var(--${statusConfig[event.status].token})`
            : "var(--primary)"

        return (
          <li key={index} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border",
                  isCurrent ? "border-primary/30 bg-primary/10" : "border-border"
                )}
              >
                {/* ícone neutro (contraste AA garantido); a cor de status fica num dot secundário */}
                <Icon
                  aria-hidden
                  className={cn(
                    "size-4",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                />
              </span>
              {!isLast ? <span className="bg-border w-px flex-1" /> : null}
            </div>
            <div className={cn("pb-6", isLast && "pb-0")}>
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: token }}
                />
                {meta.label} · {formatDate(event.date)}
                {isCurrent ? " · Mais recente" : ""}
              </p>
              <p
                className={cn(
                  "mt-0.5 text-sm",
                  isCurrent ? "text-foreground font-semibold" : "font-medium"
                )}
              >
                {event.title}
              </p>
              {event.description ? (
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {event.description}
                </p>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
