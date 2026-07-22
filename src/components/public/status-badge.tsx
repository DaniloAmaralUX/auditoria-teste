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
      <span
        aria-hidden
        className="size-2 shrink-0 rounded-full"
        style={{ backgroundColor: `var(--${config.token})` }}
      />
      {config.label}
    </span>
  )
}
