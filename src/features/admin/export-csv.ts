import type { AdminManifestation } from "./admin-store"
import { statusConfig } from "@/lib/manifestation-status"
import { manifestationTypes, manifestationCategories, labelFor } from "@/lib/registration-taxonomy"

/**
 * Exportação de planilha (RF-027) — CSV gerado no cliente, sobre o mock.
 * Separador ";" e BOM UTF-8 para abrir direto no Excel pt-BR.
 * A exportação NÃO inclui identificação do manifestante nem relato completo:
 * é a planilha de gestão (visão channel_admin, que não tem acesso restrito).
 */

function escapeCell(value: string): string {
  const v = value.replace(/"/g, '""')
  return /[";\n]/.test(v) ? `"${v}"` : v
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR")
}

export function buildCsv(records: AdminManifestation[]): string {
  const header = [
    "Protocolo",
    "Status",
    "Aguardando informações",
    "Tipo",
    "Categoria",
    "Título",
    "Registrada em",
    "Atualizada em",
    "Devolutivas",
    "Notas internas",
  ]
  const rows = records.map(({ tracking, detail }) => [
    tracking.protocol,
    statusConfig[tracking.status].label,
    detail.waitingInfo ? "Sim" : "Não",
    detail.about ? labelFor(manifestationTypes, detail.about.type) : "—",
    detail.about ? labelFor(manifestationCategories, detail.about.category) : "—",
    detail.report?.title ?? "—",
    formatDate(tracking.createdAt),
    formatDate(tracking.updatedAt),
    String(tracking.timeline.filter((e) => e.kind === "response").length),
    String(detail.notes.length),
  ])
  return [header, ...rows].map((row) => row.map(escapeCell).join(";")).join("\r\n")
}

/** Dispara o download do CSV no navegador. */
export function downloadCsv(records: AdminManifestation[], filename: string): void {
  const csv = "﻿" + buildCsv(records)
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
