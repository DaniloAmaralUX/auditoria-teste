import type { ManifestationStatus } from "@/lib/manifestation-status"

/**
 * Armazenamento MOCK de acompanhamento (em memória, escopo da sessão SPA).
 * Substitui o backend nesta entrega de front-end.
 *
 * Pendências de backend (RF-011 / RNF-002):
 * - consulta server-side; código de acesso comparado por hash, nunca em texto simples;
 * - somente informação pública é retornada (nunca relato completo, identidade ou notas internas);
 * - proteção antiabuso real (rate limit + CAPTCHA) no servidor.
 *
 * O acesso guarda apenas dados públicos do acompanhamento — não o conteúdo do relato.
 */

export type TrackingEventKind = "status" | "response" | "request"

export type TrackingEvent = {
  kind: TrackingEventKind
  /** Para eventos de status. */
  status?: ManifestationStatus
  title: string
  description?: string
  date: string // ISO
}

export type TrackingRecord = {
  protocol: string
  /** Em produção seria um hash; aqui, mock em memória. */
  accessCode: string
  status: ManifestationStatus
  createdAt: string
  updatedAt: string
  timeline: TrackingEvent[]
}

const store = new Map<string, TrackingRecord>()

const normalize = (value: string) => value.trim().toUpperCase()
/** Códigos comparados sem separadores (o campo segmentado envia só os caracteres). */
const normalizeCode = (value: string) => normalize(value).replace(/[^A-Z0-9]/g, "")
const keyOf = (protocol: string) => normalize(protocol)

/** Fixture de demonstração — permite verificar o acompanhamento sem passar pelo registro. */
const demoRecord: TrackingRecord = {
  protocol: "OUV-2026-DEMO01",
  accessCode: "DEMO-2026-PTNG",
  status: "em_apuracao",
  createdAt: "2026-07-02T13:20:00.000Z",
  updatedAt: "2026-07-15T18:05:00.000Z",
  timeline: [
    {
      kind: "status",
      status: "recebida",
      title: "Manifestação recebida",
      description: "Registro recebido e adicionado à fila de triagem.",
      date: "2026-07-02T13:20:00.000Z",
    },
    {
      kind: "status",
      status: "em_analise",
      title: "Em análise",
      description: "O Comitê iniciou a análise das informações.",
      date: "2026-07-05T11:00:00.000Z",
    },
    {
      kind: "response",
      title: "Devolutiva do Comitê",
      description:
        "Recebemos sua manifestação e demos início à apuração. Retornaremos com novas informações assim que possível.",
      date: "2026-07-06T09:30:00.000Z",
    },
    {
      kind: "status",
      status: "em_apuracao",
      title: "Em apuração",
      description: "A apuração está em andamento.",
      date: "2026-07-15T18:05:00.000Z",
    },
  ],
}

store.set(keyOf(demoRecord.protocol), demoRecord)

/** Fixtures adicionais para o painel do Comitê — sem código de acesso público,
 *  só existem no store para popular a fila. Códigos válidos são fake e não são
 *  publicados, então o acompanhamento público não consegue consultá-las. */
const adminDemoRecords: TrackingRecord[] = [
  {
    protocol: "OUV-2026-A7B2C9",
    accessCode: "____-____-____",
    status: "recebida",
    createdAt: "2026-07-20T14:30:00.000Z",
    updatedAt: "2026-07-20T14:30:00.000Z",
    timeline: [
      {
        kind: "status",
        status: "recebida",
        title: "Manifestação recebida",
        description: "Registro recebido e adicionado à fila de triagem.",
        date: "2026-07-20T14:30:00.000Z",
      },
    ],
  },
  {
    protocol: "OUV-2026-F3E8D4",
    accessCode: "____-____-____",
    status: "recebida",
    createdAt: "2026-07-19T09:15:00.000Z",
    updatedAt: "2026-07-19T09:15:00.000Z",
    timeline: [
      {
        kind: "status",
        status: "recebida",
        title: "Manifestação recebida",
        description: "Registro recebido e adicionado à fila de triagem.",
        date: "2026-07-19T09:15:00.000Z",
      },
    ],
  },
  {
    protocol: "OUV-2026-K1M5P8",
    accessCode: "____-____-____",
    status: "em_analise",
    createdAt: "2026-07-14T11:00:00.000Z",
    updatedAt: "2026-07-18T16:40:00.000Z",
    timeline: [
      {
        kind: "status",
        status: "recebida",
        title: "Manifestação recebida",
        date: "2026-07-14T11:00:00.000Z",
      },
      {
        kind: "status",
        status: "em_analise",
        title: "Em análise",
        description: "O Comitê iniciou a análise das informações.",
        date: "2026-07-18T16:40:00.000Z",
      },
    ],
  },
  {
    protocol: "OUV-2026-Q9R4T2",
    accessCode: "____-____-____",
    status: "concluida",
    createdAt: "2026-06-25T08:00:00.000Z",
    updatedAt: "2026-07-16T15:30:00.000Z",
    timeline: [
      {
        kind: "status",
        status: "recebida",
        title: "Manifestação recebida",
        date: "2026-06-25T08:00:00.000Z",
      },
      {
        kind: "status",
        status: "em_analise",
        title: "Em análise",
        date: "2026-06-28T10:00:00.000Z",
      },
      {
        kind: "status",
        status: "em_apuracao",
        title: "Em apuração",
        date: "2026-07-05T14:20:00.000Z",
      },
      {
        kind: "status",
        status: "concluida",
        title: "Concluída",
        description: "Apuração encerrada com devolutiva ao manifestante.",
        date: "2026-07-16T15:30:00.000Z",
      },
    ],
  },
  {
    protocol: "OUV-2026-W6X8Y1",
    accessCode: "____-____-____",
    status: "arquivada",
    createdAt: "2026-06-10T13:00:00.000Z",
    updatedAt: "2026-06-20T09:00:00.000Z",
    timeline: [
      {
        kind: "status",
        status: "recebida",
        title: "Manifestação recebida",
        date: "2026-06-10T13:00:00.000Z",
      },
      {
        kind: "status",
        status: "arquivada",
        title: "Arquivada",
        description: "Fora do escopo do canal.",
        date: "2026-06-20T09:00:00.000Z",
      },
    ],
  },
]

for (const r of adminDemoRecords) {
  store.set(keyOf(r.protocol), r)
}

/** Retorna todas as manifestações do store — uso restrito ao painel do Comitê.
 *  Ordenadas por updatedAt desc (mais recentes primeiro). */
export function listAll(): TrackingRecord[] {
  return Array.from(store.values()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
}

/** Registra uma nova manifestação no store (bridge a partir do registro concluído). */
export function addManifestation(input: {
  protocol: string
  accessCode: string
  createdAt: string
}): void {
  const record: TrackingRecord = {
    protocol: input.protocol,
    accessCode: input.accessCode,
    status: "recebida",
    createdAt: input.createdAt,
    updatedAt: input.createdAt,
    timeline: [
      {
        kind: "status",
        status: "recebida",
        title: "Manifestação recebida",
        description: "Seu registro foi recebido e está na fila de triagem do Comitê.",
        date: input.createdAt,
      },
    ],
  }
  store.set(keyOf(record.protocol), record)
}

export type LookupResult =
  | { ok: true; record: TrackingRecord }
  | { ok: false }

/** Consulta por protocolo + código. Retorna genérico em qualquer falha (RF-011). */
export function lookup(protocol: string, accessCode: string): LookupResult {
  const record = store.get(keyOf(protocol))
  if (!record || normalizeCode(record.accessCode) !== normalizeCode(accessCode)) {
    return { ok: false }
  }
  return { ok: true, record }
}
