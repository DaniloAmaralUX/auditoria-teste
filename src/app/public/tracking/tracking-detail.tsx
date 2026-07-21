import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/public/status-badge"
import { StatusTimeline } from "@/components/public/status-timeline"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { statusConfig } from "@/lib/manifestation-status"
import type { TrackingRecord } from "@/features/tracking/mock-store"

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

type TrackingDetailProps = {
  record: TrackingRecord
  onReset: () => void
}

/**
 * Detalhe público do acompanhamento (RF-011 / tela PUB-010).
 * Mostra apenas informação pública: status, datas, timeline e devolutivas.
 * Nunca exibe relato completo, identidade, responsável, severidade ou notas internas.
 * A rota permanece neutra (/acompanhar) — o protocolo não vai para a URL (decisão de privacidade).
 */
export function TrackingDetail({ record, onReset }: TrackingDetailProps) {
  const status = statusConfig[record.status]

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-muted-foreground text-sm">Protocolo</p>
          <h1
            tabIndex={-1}
            className="font-heading font-mono text-2xl font-semibold tracking-tight outline-none"
          >
            {record.protocol}
          </h1>
          <div className="mt-3">
            <StatusBadge status={record.status} />
          </div>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onReset}>
          <RotateCcw aria-hidden className="size-4" />
          Nova consulta
        </Button>
      </div>

      <div className="bg-card mt-6 rounded-xl border p-5 shadow-[var(--shadow-border)] sm:p-6">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {status.publicDescription}
        </p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Registrada em</dt>
            <dd className="font-medium">{formatDate(record.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Última atualização</dt>
            <dd className="font-medium">{formatDate(record.updatedAt)}</dd>
          </div>
        </dl>
      </div>

      <section className="mt-8" aria-labelledby="timeline-title">
        <h2 id="timeline-title" className="font-heading text-lg font-semibold tracking-tight">
          Andamento
        </h2>
        <Separator className="my-4" />
        <StatusTimeline events={record.timeline} />
      </section>

      <TrustNotice variant="confidential" className="mt-8">
        Por segurança, esta página mostra apenas o andamento e as devolutivas. O conteúdo do relato
        e os dados internos da apuração não são exibidos aqui.
      </TrustNotice>
    </div>
  )
}
