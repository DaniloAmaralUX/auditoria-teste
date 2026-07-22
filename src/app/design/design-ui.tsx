import { cn } from "@/lib/utils"

/** Cabeçalho de página do guia (padrão Geist: h1 grande + lede muted). */
export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string
  title: string
  lede?: string
}) {
  return (
    <header className="space-y-3">
      {eyebrow ? (
        <p className="text-muted-foreground text-xs font-semibold tracking-[0.08em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-heading text-4xl leading-[1.05] font-semibold">{title}</h1>
      {lede ? <p className="text-muted-foreground max-w-prose text-lg">{lede}</p> : null}
    </header>
  )
}

/** Seção do guia com título e descrição opcionais. */
export function GuideSection({
  title,
  description,
  children,
  className,
}: {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("mt-12 space-y-4", className)}>
      <div className="space-y-1">
        <h2 className="font-heading text-xl font-semibold">{title}</h2>
        {description ? (
          <p className="text-muted-foreground max-w-prose text-sm">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

/** Painel de demonstração — superfície card com borda 1px. */
export function DemoPanel({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("bg-card rounded-xl border p-6", className)}>{children}</div>
  )
}

/** Meta de uso real de um componente (censo): nº de arquivos e rotas. */
export function UsageMeta({ files, where }: { files: string; where: string }) {
  return (
    <p className="text-muted-foreground font-mono text-[11px]">
      uso: {files} · {where}
    </p>
  )
}

/** Lista de regras "faça / não faça" compacta. */
export function RuleList({ items }: { items: { do: boolean; text: string }[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.text} className="flex items-start gap-2.5">
          <span
            aria-hidden
            className={cn(
              "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[10px]",
              item.do
                ? "bg-status-completed/15 text-status-completed"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {item.do ? "✓" : "✕"}
          </span>
          <span className="text-muted-foreground">
            <span className="text-foreground font-medium">
              {item.do ? "Faça: " : "Evite: "}
            </span>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  )
}
