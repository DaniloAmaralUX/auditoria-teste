import * as React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Clock } from "lucide-react"

import { Eyebrow } from "@/components/ui/eyebrow"
import { StatusBadge } from "@/components/public/status-badge"
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
 * Dashboard inicial do painel (RF-020 lite): visão geral por status + últimas
 * manifestações. Ponto de entrada depois do login. Ainda sem ações — este é o
 * walking skeleton; ações de triagem vêm em /admin/manifestacoes.
 */
export function AdminDashboardPage() {
  const { user } = useAuth()
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

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <header className="space-y-1">
        <Eyebrow>Painel do Comitê</Eyebrow>
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Olá, {user?.name.split(" ")[0] ?? "Comitê"}
        </h1>
        <p className="text-muted-foreground text-sm">
          Visão geral das manifestações em andamento.
        </p>
      </header>

      <section aria-labelledby="counts-title">
        <h2 id="counts-title" className="sr-only">
          Contagem por status
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {STATUS_ORDER.map((status) => {
            const cfg = statusConfig[status]
            return (
              <div
                key={status}
                className="bg-card rounded-xl border p-4"
              >
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  {cfg.label}
                </p>
                <p className="font-heading mt-2 text-3xl font-semibold tabular-nums">
                  {counts[status]}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="recent-title" className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2
            id="recent-title"
            className="font-heading text-lg font-semibold tracking-tight"
          >
            Últimas manifestações
          </h2>
          <Link
            to="/admin/manifestacoes"
            className="link-underline text-primary-text text-sm font-medium"
          >
            Ver todas
            <ArrowRight aria-hidden className="ml-1 inline size-3.5" />
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl border">
          <ul className="divide-y">
            {recent.map((record) => (
              <li key={record.protocol}>
                <Link
                  to="/admin/manifestacoes"
                  className="hover:bg-muted/40 focus-visible:bg-muted/40 flex flex-col gap-2 p-4 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="font-mono text-sm font-medium">{record.protocol}</p>
                    <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <Clock aria-hidden className="size-3" />
                      Atualizada {formatRelativeDate(record.updatedAt)}
                    </p>
                  </div>
                  <StatusBadge status={record.status} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
