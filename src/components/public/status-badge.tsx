import { cn } from "@/lib/utils"
import {
  statusConfig,
  flagConfig,
  type ManifestationStatus,
  type ManifestationFlag,
} from "@/lib/manifestation-status"

type StatusBadgeProps = {
  /** Obrigatório quando `flag` não é informada. */
  status?: ManifestationStatus
  flag?: ManifestationFlag
  className?: string
}

/**
 * Ponto de cor do status (token `--status-*`). Fonte única do dot reusada pelo
 * StatusBadge e pelos cards de contagem — a cor nunca comunica sozinha (RNF-007).
 */
export function StatusDot({ token, className }: { token: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("size-2 shrink-0 rounded-full", className)}
      style={{ backgroundColor: `var(--${token})` }}
    />
  )
}

/**
 * Selo de status (Midday: dot colorido + rótulo). O rótulo fica em foreground e
 * a cor mora só no ponto — o status nunca é comunicado só por cor (RNF-007).
 */
export function StatusBadge({ status, flag, className }: StatusBadgeProps) {
  const config = flag ? flagConfig[flag] : status ? statusConfig[status] : null
  if (!config) return null

  return (
    <span
      className={cn(
        "text-foreground inline-flex items-center gap-2 text-sm whitespace-nowrap",
        className
      )}
    >
      <StatusDot token={config.token} />
      {config.label}
    </span>
  )
}
