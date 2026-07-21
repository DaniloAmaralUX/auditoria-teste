import { TriangleAlert } from "lucide-react"

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
      <header className="animate-in fade-in slide-in-from-bottom-1.5 fill-mode-both space-y-3 duration-[var(--motion-base)] ease-[var(--ease-enter)]">
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
          <p
            role="note"
            className="border-status-waiting/30 bg-status-waiting/10 text-foreground dark:bg-status-waiting/15 dark:border-status-waiting/40 flex items-start gap-2 rounded-md border px-3 py-2 text-sm"
          >
            <TriangleAlert
              aria-hidden
              className="text-status-waiting mt-0.5 size-4 shrink-0"
            />
            <span>
              Conteúdo provisório, pendente de homologação pelo Jurídico/DPO. Não utilize como
              versão final.
            </span>
          </p>
        ) : null}
      </header>
      <div
        className={cn(
          "mt-8 max-w-[65ch] space-y-3 text-base leading-7 [&_h2]:font-heading [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:scroll-mt-24 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-balance [&_h2:first-child]:mt-0 [&_li]:ml-1 [&_p]:text-muted-foreground [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-muted-foreground",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
