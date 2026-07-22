import { Eyebrow } from "@/components/ui/eyebrow"
import { Spot } from "@/components/ui/spot"
import { listAll } from "@/features/tracking/mock-store"
import { StatusBadge } from "@/components/public/status-badge"

/**
 * Fila de manifestações (RF-022) — walking skeleton. A visão de tabela com filtros,
 * ações de triagem, atribuição e workflow completo vem nas próximas iterações;
 * aqui garantimos que a rota existe e mostra a fila crua para orientar a UX.
 */
export function AdminManifestacoesPage() {
  const records = listAll()

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <header className="space-y-1">
        <Eyebrow>Painel do Comitê</Eyebrow>
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Manifestações
        </h1>
        <p className="text-muted-foreground text-sm">
          {records.length} manifestações no sistema. Filtros, ordenação e ações de
          triagem chegam nas próximas iterações.
        </p>
      </header>

      {records.length === 0 ? (
        <div className="bg-card flex flex-col items-center gap-3 rounded-xl border p-10 text-center">
          <Spot name="empty" className="w-32" />
          <p className="font-heading text-sm font-semibold">Nada por aqui ainda</p>
          <p className="text-muted-foreground max-w-sm text-sm">
            Quando o portal público receber manifestações, elas aparecem nesta lista.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b text-left">
                <th className="px-4 py-3 text-xs font-semibold">Protocolo</th>
                <th className="px-4 py-3 text-xs font-semibold">Status</th>
                <th className="px-4 py-3 text-xs font-semibold">Registrada em</th>
                <th className="px-4 py-3 text-xs font-semibold">Última atualização</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.protocol} className="border-b last:border-0">
                  <td className="px-4 py-3 font-mono text-xs font-medium">
                    {record.protocol}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={record.status} />
                  </td>
                  <td className="text-muted-foreground px-4 py-3 text-xs">
                    {new Date(record.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="text-muted-foreground px-4 py-3 text-xs">
                    {new Date(record.updatedAt).toLocaleDateString("pt-BR")}
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
