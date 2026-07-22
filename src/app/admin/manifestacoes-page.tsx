import * as React from "react"
import { Link } from "react-router-dom"
import { Search, Download, Inbox } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { type ManifestationStatus } from "@/lib/manifestation-status"

/** Abas de filtro por status — rótulos curtos (plural) no estilo Midday. */
const STATUS_TABS: Array<{ value: "todos" | ManifestationStatus; label: string }> = [
  { value: "todos", label: "Todas" },
  { value: "recebida", label: "Recebidas" },
  { value: "em_analise", label: "Em análise" },
  { value: "em_apuracao", label: "Em apuração" },
  { value: "concluida", label: "Concluídas" },
  { value: "arquivada", label: "Arquivadas" },
]

type SortOrder = "recentes" | "antigas"

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR")
}

/**
 * Fila de manifestações do Comitê (RF-022): busca, abas por status, ordenação e
 * exportação (RF-027, restrita). Cada linha leva ao detalhe (workflow/devolutivas).
 */
export function AdminManifestacoesPage() {
  const { can } = useAuth()
  // A assinatura re-renderiza a página a cada mutação do store; leitura direta.
  React.useSyncExternalStore(subscribeAdmin, getAdminVersion)
  const all = listManifestations()

  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<(typeof STATUS_TABS)[number]["value"]>("todos")
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
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="font-heading text-2xl sm:text-3xl">Manifestações</h1>
        <p className="text-muted-foreground text-sm">
          {all.length} no sistema
          {filtered.length !== all.length ? ` · ${filtered.length} no filtro atual` : ""}.
        </p>
      </header>

      {/* Abas de status (Midday: sublinhado, navegação por seta via Radix Tabs) */}
      <Tabs
        value={status}
        onValueChange={(v) => setStatus(v as (typeof STATUS_TABS)[number]["value"])}
      >
        <div className="overflow-x-auto">
          <TabsList className="h-auto min-w-max justify-start gap-1 rounded-none border-b bg-transparent p-0">
            {STATUS_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex-none -mb-px rounded-none border-b-2 border-transparent px-3 py-2 text-muted-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      {/* Busca + ordenação + exportação */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search
            aria-hidden
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <Input
            type="search"
            aria-label="Buscar manifestações"
            placeholder="Buscar por protocolo, título, tipo ou categoria"
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Select value={order} onValueChange={(v) => setOrder(v as SortOrder)}>
          <SelectTrigger aria-label="Ordenar" className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recentes">Mais recentes</SelectItem>
            <SelectItem value="antigas">Mais antigas</SelectItem>
          </SelectContent>
        </Select>
        {can("exportData") ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => exportRows(filtered)}
            disabled={filtered.length === 0}
          >
            <Download aria-hidden />
            Exportar
          </Button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border">
          <EmptyState
            icon={Inbox}
            title={all.length === 0 ? "Nada por aqui ainda" : "Nenhum resultado no filtro"}
            description={
              all.length === 0
                ? "Quando o portal público receber manifestações, elas aparecem nesta lista."
                : "Ajuste a busca ou as abas de status para ver outras manifestações."
            }
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Protocolo</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Atualizada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(({ tracking, detail }) => (
                <TableRow key={tracking.protocol}>
                  <TableCell>
                    <Link
                      to={`/admin/manifestacoes/${tracking.protocol}`}
                      className="link-underline font-mono text-xs"
                    >
                      {tracking.protocol}
                    </Link>
                  </TableCell>
                  <TableCell className="max-w-64">
                    <span className="block truncate">{detail.report?.title ?? "—"}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {detail.about ? labelFor(manifestationTypes, detail.about.type) : "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {detail.about
                      ? labelFor(manifestationCategories, detail.about.category)
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <StatusBadge status={tracking.status} className="text-xs" />
                      {detail.waitingInfo ? (
                        <StatusBadge flag="aguardando_informacoes" className="text-xs" />
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs whitespace-nowrap tabular-nums">
                    {formatDate(tracking.updatedAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
