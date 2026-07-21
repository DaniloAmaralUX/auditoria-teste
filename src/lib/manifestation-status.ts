/**
 * Status canônicos da manifestação (PRD RF-023): 5 oficiais + "Aguardando informações" como flag.
 * Descrições públicas (voltadas ao manifestante) separadas do uso interno.
 * Cor sempre acompanhada de rótulo/ícone — nunca depende só de cor (RNF-007).
 */

export type ManifestationStatus =
  | "recebida"
  | "em_analise"
  | "em_apuracao"
  | "concluida"
  | "arquivada"

/** Flag auxiliar (não é status oficial do workflow). */
export type ManifestationFlag = "aguardando_informacoes"

export type StatusConfig = {
  label: string
  /** Texto exibido ao manifestante no acompanhamento. */
  publicDescription: string
  /** Nome do token de cor (var --status-*). */
  token: string
}

export const statusConfig: Record<ManifestationStatus, StatusConfig> = {
  recebida: {
    label: "Recebida",
    publicDescription: "Sua manifestação foi registrada e está na fila de triagem do Comitê.",
    token: "status-received",
  },
  em_analise: {
    label: "Em análise",
    publicDescription: "O Comitê de Ética está analisando as informações da sua manifestação.",
    token: "status-analysis",
  },
  em_apuracao: {
    label: "Em apuração",
    publicDescription: "A apuração está em andamento. Pode levar algum tempo até a conclusão.",
    token: "status-investigation",
  },
  concluida: {
    label: "Concluída",
    publicDescription: "A apuração foi concluída. Verifique as devolutivas do Comitê.",
    token: "status-completed",
  },
  arquivada: {
    label: "Arquivada",
    publicDescription: "Esta manifestação foi arquivada. Verifique as devolutivas do Comitê.",
    token: "status-archived",
  },
}

export const flagConfig: Record<ManifestationFlag, StatusConfig> = {
  aguardando_informacoes: {
    label: "Aguardando informações",
    publicDescription:
      "O Comitê solicitou informações complementares. Verifique as devolutivas.",
    token: "status-waiting",
  },
}

export const statusOrder: ManifestationStatus[] = [
  "recebida",
  "em_analise",
  "em_apuracao",
  "concluida",
]

export function isTerminal(status: ManifestationStatus): boolean {
  return status === "concluida" || status === "arquivada"
}
