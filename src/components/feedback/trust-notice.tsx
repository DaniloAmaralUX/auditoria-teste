import { Info, ShieldCheck, Lock, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"

type TrustNoticeVariant = "info" | "confidential" | "anonymity" | "warning"

const variantConfig: Record<
  TrustNoticeVariant,
  { icon: typeof Info; className: string; iconClassName: string }
> = {
  info: {
    icon: Info,
    className: "border-border border-l-2 border-l-border bg-muted/40 text-foreground",
    iconClassName: "text-muted-foreground",
  },
  /* Confiança é informação, não ação: superfície neutra com fio esquerdo mais
     firme e ícone em foreground — o laranja fica para CTA e estado (guia /design/cores). */
  confidential: {
    icon: ShieldCheck,
    className: "border-border border-l-2 border-l-foreground/30 bg-muted/40 text-foreground",
    iconClassName: "text-foreground",
  },
  anonymity: {
    icon: Lock,
    className: "border-border border-l-2 border-l-foreground/30 bg-muted/40 text-foreground",
    iconClassName: "text-foreground",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "border-status-waiting/30 border-l-2 border-l-status-waiting/60 bg-status-waiting/10 text-foreground dark:bg-status-waiting/15",
    iconClassName: "text-status-waiting",
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
  const { icon: Icon, className: variantClass, iconClassName } = variantConfig[variant]

  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-4 text-sm leading-relaxed",
        variantClass,
        className
      )}
    >
      <Icon aria-hidden className={cn("mt-0.5 size-5 shrink-0", iconClassName)} />
      <div className="space-y-1">
        {title ? <p className="font-medium">{title}</p> : null}
        <p className="text-muted-foreground">{children}</p>
      </div>
    </div>
  )
}
