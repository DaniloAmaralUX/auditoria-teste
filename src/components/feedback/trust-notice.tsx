import { Info, ShieldCheck, Lock, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"

type TrustNoticeVariant = "info" | "confidential" | "anonymity" | "warning"

const variantConfig: Record<
  TrustNoticeVariant,
  { icon: typeof Info; className: string }
> = {
  info: { icon: Info, className: "border-border bg-muted/40 text-foreground" },
  confidential: {
    icon: ShieldCheck,
    className: "border-primary/20 bg-primary/5 text-foreground",
  },
  anonymity: {
    icon: Lock,
    className: "border-primary/20 bg-primary/5 text-foreground",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-status-waiting/30 bg-status-waiting/10 text-foreground",
  },
}

type TrustNoticeProps = {
  variant?: TrustNoticeVariant
  title?: string
  children: React.ReactNode
  className?: string
}

/**
 * Aviso de confiança reutilizável (doc 15 — TrustNotice).
 * Sem promessas absolutas de anonimato. Usa ícone + texto, não depende só de cor (RNF-007).
 */
export function TrustNotice({
  variant = "info",
  title,
  children,
  className,
}: TrustNoticeProps) {
  const { icon: Icon, className: variantClass } = variantConfig[variant]

  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-4 text-sm leading-relaxed",
        variantClass,
        className
      )}
    >
      <Icon aria-hidden className="text-primary mt-0.5 size-5 shrink-0" />
      <div className="space-y-1">
        {title ? <p className="font-medium">{title}</p> : null}
        <p className="text-muted-foreground">{children}</p>
      </div>
    </div>
  )
}
