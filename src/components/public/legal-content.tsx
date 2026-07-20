import { cn } from "@/lib/utils"

type LegalContentProps = {
  title: string
  subtitle?: string
  /** Data da última atualização (RF-004: versão/data exibidas). */
  updatedAt?: string
  version?: string
  /** Sinaliza conteúdo ainda não homologado pelo Jurídico/DPO (RN-006). */
  draft?: boolean
  children: React.ReactNode
  className?: string
}

/**
 * Contêiner de páginas institucionais/legais (LGPD, Termos).
 * Largura de leitura limitada, headings semânticos, metadados de versão.
 * Conteúdo é editável pelo painel (RF-028) — aqui entra via CMS futuramente.
 */
export function LegalContent({
  title,
  subtitle,
  updatedAt,
  version,
  draft,
  children,
  className,
}: LegalContentProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{title}</h1>
        {subtitle ? (
          <p className="text-muted-foreground text-lg text-pretty">{subtitle}</p>
        ) : null}
        {(updatedAt || version) && (
          <p className="text-muted-foreground text-sm">
            {version ? <>Versão {version}</> : null}
            {version && updatedAt ? " · " : null}
            {updatedAt ? <>Atualizado em {updatedAt}</> : null}
          </p>
        )}
        {draft ? (
          <p className="border-status-waiting/30 bg-status-waiting/10 text-foreground rounded-md border px-3 py-2 text-sm">
            Conteúdo provisório, pendente de homologação pelo Jurídico/DPO. Não utilize como
            versão final.
          </p>
        ) : null}
      </header>
      <div
        className={cn(
          "mt-8 space-y-4 text-sm leading-relaxed [&_h2]:font-heading [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_li]:ml-1 [&_p]:text-muted-foreground [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-muted-foreground",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
