import * as React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Inbox, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PageGreeting } from "@/components/ui/page-greeting"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge, StatusDot } from "@/components/public/status-badge"
import { useAuth } from "@/features/auth/auth-context"
import { listAll } from "@/features/tracking/mock-store"
import {
  statusConfig,
  type ManifestationStatus,
} from "@/lib/manifestation-status"

/** Ordem canônica dos cards de status. */
const STATUS_ORDER: ManifestationStatus[] = [
  "recebida",
  "em_analise",
  "em_apuracao",
  "concluida",
  "arquivada",
]

function greetingByHour(): string {
  const h = new Date().getHours()
  if (h < 12) return "Bom dia"
  if (h < 18) return "Boa tarde"
  return "Boa noite"
}

function formatRelativeDate(iso: string): string {
  const now = new Date("2026-07-22T00:00:00.000Z").getTime()
  const then = new Date(iso).getTime()
  const days = Math.floor((now - then) / 86_400_000)
  if (days <= 0) return "hoje"
  if (days === 1) return "ontem"
  if (days < 30) return `há ${days} dias`
  const months = Math.floor(days / 30)
  return `há ${months} ${months === 1 ? "mês" : "meses"}`
}

/**
 * Overview do painel (RF-020): saudação editorial + visão por status + últimas
 * manifestações. Ponto de entrada depois do login; a triagem vive na fila.
 */
export function AdminDashboardPage() {
  const { user, can } = useAuth()
  const records = React.useMemo(() => listAll(), [])
  const counts = React.useMemo(() => {
    const c: Record<ManifestationStatus, number> = {
      recebida: 0,
      em_analise: 0,
      em_apuracao: 0,
      concluida: 0,
      arquivada: 0,
    }
    for (const r of records) c[r.status]++
    return c
  }, [records])

  const recent = records.slice(0, 5)
  const firstName = user?.name.split(" ")[0] ?? "Comitê"
  const pending = counts.recebida
  const subtitle =
    pending > 0
      ? `${pending} ${pending === 1 ? "manifestação aguarda" : "manifestações aguardam"} triagem.`
      : "Nenhuma manifestação nova aguardando triagem."

  return (
    <div className="space-y-10">
      <div className="space-y-6 pt-4">
        <PageGreeting title={`${greetingByHour()},`} highlight={firstName} subtitle={subtitle} />
        <div className="flex flex-wrap justify-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/manifestacoes">
              <Inbox aria-hidden />
              Ver fila
            </Link>
          </Button>
          {can("manageDocuments") ? (
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/documentos">
                <FileText aria-hidden />
                Documentos
              </Link>
            </Button>
          ) : null}
        </div>
      </div>

      <section aria-labelledby="counts-title">
        <h2 id="counts-title" className="sr-only">
          Contagem por status
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {STATUS_ORDER.map((status) => {
            const cfg = statusConfig[status]
            return (
              <Card key={status} className="gap-0 p-4">
                <div className="flex items-center gap-2">
                  <StatusDot token={cfg.token} />
                  <p className="text-muted-foreground text-xs tracking-wide uppercase">
                    {cfg.label}
                  </p>
                </div>
                <p className="font-heading mt-2 text-3xl tabular-nums">{counts[status]}</p>
              </Card>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="recent-title" className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 id="recent-title" className="font-heading text-xl">
            Últimas manifestações
          </h2>
          <Link
            to="/admin/manifestacoes"
            className="link-underline text-primary-text text-sm"
          >
            Ver todas
            <ArrowRight aria-hidden className="ml-1 inline size-3.5" />
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Protocolo</TableHead>
                <TableHead>Atualizada</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((record) => (
                <TableRow key={record.protocol}>
                  <TableCell>
                    <Link
                      to={`/admin/manifestacoes/${record.protocol}`}
                      className="link-underline font-mono text-xs"
                    >
                      {record.protocol}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                    {formatRelativeDate(record.updatedAt)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={record.status} className="text-xs" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  )
}
