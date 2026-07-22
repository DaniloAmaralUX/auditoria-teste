import {
  RotateCcw,
  Inbox,
  FileSearch,
  SearchCheck,
  CheckCircle2,
  Archive,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/public/status-badge"
import { StatusTimeline } from "@/components/public/status-timeline"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { statusConfig, type ManifestationStatus } from "@/lib/manifestation-status"
import type { TrackingRecord } from "@/features/tracking/mock-store"

/** Ícone grande por status — âncora visual do card-herói (padrão order-tracking). */
const statusIcons: Record<ManifestationStatus, typeof Inbox> = {
  recebida: Inbox,
  em_analise: FileSearch,
  em_apuracao: SearchCheck,
  concluida: CheckCircle2,
  arquivada: Archive,
}

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
  const StatusIcon = statusIcons[record.status]

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Eyebrow>Acompanhamento</Eyebrow>
          <h1
            tabIndex={-1}
            className="mt-1 font-mono text-2xl tracking-tight outline-none"
          >
            {record.protocol}
          </h1>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onReset}>
          <RotateCcw aria-hidden className="size-4" />
          Nova consulta
        </Button>
      </div>

      {/* Card-herói do estado atual (padrão order-tracking) */}
      <div className="bg-card mt-6 rounded-xl border p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="bg-muted text-foreground flex size-12 shrink-0 items-center justify-center rounded-xl border">
            <StatusIcon aria-hidden className="size-6" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <StatusBadge status={record.status} />
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {status.publicDescription}
            </p>
          </div>
        </div>
        <dl className="mt-5 grid gap-3 border-t pt-4 text-sm sm:grid-cols-2">
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
