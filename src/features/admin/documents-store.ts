import type { Actor } from "./admin-store"

/**
 * Gestão de documentos institucionais do canal (RF-028) — mock em memória.
 * O portal público serve os arquivos reais de /public; aqui o painel simula a
 * substituição de versão (nome do arquivo + histórico), sem upload real.
 * Fora de escopo (outro time): armazenamento, publicação e CDN dos arquivos.
 */

export type DocumentVersion = {
  version: number
  fileName: string
  at: string // ISO
  by: string
}

export type AdminDocument = {
  id: string
  name: string
  description: string
  /** Onde o portal público exibe este documento. */
  publicUse: string
  fileName: string
  version: number
  updatedAt: string
  updatedBy: string
  history: DocumentVersion[]
}

const documents = new Map<string, AdminDocument>()

const seed: AdminDocument[] = [
  {
    id: "codigo-conduta",
    name: "Código de Conduta",
    description: "Documento oficial exibido em PDF no portal público.",
    publicUse: "Página “Código de Conduta” e rodapé do portal",
    fileName: "codigo-de-conduta-v3.pdf",
    version: 3,
    updatedAt: "2026-05-12T10:00:00.000Z",
    updatedBy: "Administração do Canal",
    history: [
      { version: 3, fileName: "codigo-de-conduta-v3.pdf", at: "2026-05-12T10:00:00.000Z", by: "Administração do Canal" },
      { version: 2, fileName: "codigo-de-conduta-v2.pdf", at: "2025-09-03T14:30:00.000Z", by: "Administração do Canal" },
      { version: 1, fileName: "codigo-de-conduta.pdf", at: "2024-11-20T09:00:00.000Z", by: "Administração do Canal" },
    ],
  },
  {
    id: "termos-uso",
    name: "Termos de uso do canal",
    description: "Texto aceito pelo manifestante antes do envio (RF-005).",
    publicUse: "Página “Termos” e aceite na revisão do registro",
    fileName: "termos-de-uso-v2.pdf",
    version: 2,
    updatedAt: "2026-03-18T16:20:00.000Z",
    updatedBy: "Administração do Canal",
    history: [
      { version: 2, fileName: "termos-de-uso-v2.pdf", at: "2026-03-18T16:20:00.000Z", by: "Administração do Canal" },
      { version: 1, fileName: "termos-de-uso.pdf", at: "2024-11-20T09:00:00.000Z", by: "Administração do Canal" },
    ],
  },
  {
    id: "aviso-privacidade",
    name: "Aviso de privacidade (LGPD)",
    description: "Como o canal trata dados pessoais e por quanto tempo.",
    publicUse: "Página “LGPD” e links do formulário de registro",
    fileName: "aviso-privacidade-v2.pdf",
    version: 2,
    updatedAt: "2026-01-30T11:45:00.000Z",
    updatedBy: "Administração do Canal",
    history: [
      { version: 2, fileName: "aviso-privacidade-v2.pdf", at: "2026-01-30T11:45:00.000Z", by: "Administração do Canal" },
      { version: 1, fileName: "aviso-privacidade.pdf", at: "2024-11-20T09:00:00.000Z", by: "Administração do Canal" },
    ],
  },
]

for (const d of seed) documents.set(d.id, d)

/* Notificação de mudança (useSyncExternalStore) */
let version = 0
const listeners = new Set<() => void>()

export function subscribeDocuments(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getDocumentsVersion(): number {
  return version
}

export function listDocuments(): AdminDocument[] {
  return Array.from(documents.values())
}

/** Substitui o arquivo de um documento (simulado) — nova versão + histórico. */
export function replaceDocument(id: string, fileName: string, actor: Actor): boolean {
  const doc = documents.get(id)
  if (!doc || !fileName.trim()) return false
  const now = new Date().toISOString()
  doc.version += 1
  doc.fileName = fileName.trim()
  doc.updatedAt = now
  doc.updatedBy = actor.name
  doc.history.unshift({ version: doc.version, fileName: doc.fileName, at: now, by: actor.name })
  version++
  listeners.forEach((l) => l())
  return true
}
