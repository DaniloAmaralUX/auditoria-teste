import { cn } from "@/lib/utils"
import {
  statusConfig,
  flagConfig,
  type ManifestationStatus,
  type ManifestationFlag,
} from "@/lib/manifestation-status"

type StatusBadgeProps = {
  status: ManifestationStatus
  flag?: ManifestationFlag
  className?: string
}

/**
 * Selo de status (doc 15 — StatusBadge). Rótulo textual + marcador colorido:
 * o status nunca é comunicado só por cor (RNF-007).
 */
export function StatusBadge({ status, flag, className }: StatusBadgeProps) {
  const config = flag ? flagConfig[flag] : statusConfig[status]

  return (
    <span
      className={cn(
        "border-border bg-muted/40 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-colors duration-[var(--motion-fast)]",
        className
      )}
    >
      <span
        aria-hidden
        className="size-2 rounded-full ring-1 ring-black/10 ring-inset dark:ring-white/20"
        style={{ backgroundColor: `var(--${config.token})` }}
      />
      {config.label}
    </span>
  )
}
