import * as React from "react"
import { Link } from "react-router-dom"
import { Search, Download, MessageCircleQuestion } from "lucide-react"

import { Eyebrow } from "@/components/ui/eyebrow"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spot } from "@/components/ui/spot"
import { StatusBadge } from "@/components/public/status-badge"
import { useAuth } from "@/features/auth/auth-context"
import {
  listManifestations,
  subscribeAdmin,
  getAdminVersion,
  type AdminManifestation,
} from "@/features/admin/admin-store"
import { downloadCsv } from "@/features/admin/export-csv"
import {
  manifestationTypes,
  manifestationCategories,
  labelFor,
} from "@/lib/registration-taxonomy"
import { statusConfig, type ManifestationStatus } from "@/lib/manifestation-status"

const STATUS_FILTERS: Array<{ value: "todos" | ManifestationStatus; label: string }> = [
  { value: "todos", label: "Todos os status" },
  { value: "recebida", label: statusConfig.recebida.label },
  { value: "em_analise", label: statusConfig.em_analise.label },
  { value: "em_apuracao", label: statusConfig.em_apuracao.label },
  { value: "concluida", label: statusConfig.concluida.label },
  { value: "arquivada", label: statusConfig.arquivada.label },
]

type SortOrder = "recentes" | "antigas"

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR")
}

/**
 * Fila de manifestações do Comitê (RF-022) com busca, filtro por status,
 * ordenação e exportação de planilha (RF-027, restrita a quem pode exportar).
 * Cada linha leva ao detalhe, onde ficam o workflow e as devolutivas.
 */
export function AdminManifestacoesPage() {
  const { can } = useAuth()
  // A assinatura re-renderiza a página a cada mutação do store; a leitura é
  // direta (dados pequenos, sem necessidade de memo).
  React.useSyncExternalStore(subscribeAdmin, getAdminVersion)
  const all = listManifestations()

  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<(typeof STATUS_FILTERS)[number]["value"]>("todos")
  const [order, setOrder] = React.useState<SortOrder>("recentes")

  const q = query.trim().toLowerCase()
  const sign = order === "recentes" ? -1 : 1
  const filtered = all
    .filter(({ tracking, detail }) => {
      if (status !== "todos" && tracking.status !== status) return false
      if (!q) return true
      const haystack = [
        tracking.protocol,
        detail.report?.title ?? "",
        detail.about ? labelFor(manifestationTypes, detail.about.type) : "",
        detail.about ? labelFor(manifestationCategories, detail.about.category) : "",
      ]
        .join(" ")
        .toLowerCase()
      return haystack.includes(q)
    })
    .sort(
      (a, b) =>
        sign *
        (new Date(a.tracking.updatedAt).getTime() - new Date(b.tracking.updatedAt).getTime())
    )

  const exportRows = (rows: AdminManifestation[]) => {
    const today = new Date().toISOString().slice(0, 10)
    downloadCsv(rows, `manifestacoes-${today}.csv`)
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <header className="space-y-1">
        <Eyebrow>Painel do Comitê</Eyebrow>
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Manifestações
        </h1>
        <p className="text-muted-foreground text-sm">
          {all.length} manifestações no sistema
          {filtered.length !== all.length ? ` · ${filtered.length} no filtro atual` : ""}.
        </p>
      </header>

      {/* Barra de ferramentas: busca + filtros + exportação */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1 space-y-1.5">
          <Label htmlFor="queue-search">Buscar</Label>
          <div className="relative">
            <Search
              aria-hidden
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
            />
            <Input
              id="queue-search"
              type="search"
              placeholder="Protocolo, título, tipo ou categoria"
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="queue-status">Status</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
            <SelectTrigger id="queue-status" className="w-full sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_FILTERS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="queue-order">Ordenar</Label>
          <Select value={order} onValueChange={(v) => setOrder(v as SortOrder)}>
            <SelectTrigger id="queue-order" className="w-full sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recentes">Mais recentes</SelectItem>
              <SelectItem value="antigas">Mais antigas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {can("exportData") ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => exportRows(filtered)}
            disabled={filtered.length === 0}
          >
            <Download aria-hidden className="size-4" />
            Exportar planilha
          </Button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card flex flex-col items-center gap-3 rounded-xl border p-10 text-center">
          <Spot name="empty" className="w-32" />
          <p className="font-heading text-sm font-semibold">
            {all.length === 0 ? "Nada por aqui ainda" : "Nenhum resultado no filtro"}
          </p>
          <p className="text-muted-foreground max-w-sm text-sm">
            {all.length === 0
              ? "Quando o portal público receber manifestações, elas aparecem nesta lista."
              : "Ajuste a busca ou o filtro de status para ver outras manifestações."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="bg-muted/40 border-b text-left">
                <th className="px-4 py-3 text-xs font-semibold">Protocolo</th>
                <th className="px-4 py-3 text-xs font-semibold">Título</th>
                <th className="px-4 py-3 text-xs font-semibold">Tipo</th>
                <th className="px-4 py-3 text-xs font-semibold">Categoria</th>
                <th className="px-4 py-3 text-xs font-semibold">Status</th>
                <th className="px-4 py-3 text-xs font-semibold">Atualizada</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(({ tracking, detail }) => (
                <tr key={tracking.protocol} className="group border-b last:border-0">
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/manifestacoes/${tracking.protocol}`}
                      className="link-underline font-mono text-xs font-medium"
                    >
                      {tracking.protocol}
                    </Link>
                  </td>
                  <td className="max-w-64 px-4 py-3">
                    <span className="block truncate">{detail.report?.title ?? "—"}</span>
                  </td>
                  <td className="text-muted-foreground px-4 py-3 text-xs">
                    {detail.about ? labelFor(manifestationTypes, detail.about.type) : "—"}
                  </td>
                  <td className="text-muted-foreground px-4 py-3 text-xs">
                    {detail.about
                      ? labelFor(manifestationCategories, detail.about.category)
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <StatusBadge status={tracking.status} className="text-xs" />
                      {detail.waitingInfo ? (
                        <Chip className="px-2 py-0.5 text-xs">
                          <MessageCircleQuestion aria-hidden className="size-3" />
                          Aguardando informações
                        </Chip>
                      ) : null}
                    </div>
                  </td>
                  <td className="text-muted-foreground px-4 py-3 text-xs tabular-nums">
                    {formatDate(tracking.updatedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
