import {
  appendEvent,
  getByProtocol,
  listAll,
  type TrackingRecord,
} from "@/features/tracking/mock-store"
import {
  statusConfig,
  isTerminal,
  type ManifestationStatus,
} from "@/lib/manifestation-status"

/**
 * Camada de dados do PAINEL (mock em memória) — RF-021 a RF-027.
 * Guarda o que só o Comitê vê: relato completo, identificação, notas internas
 * e trilha de auditoria. O que é público (status + linha do tempo) continua no
 * tracking mock-store; as mutações daqui escrevem lá via appendEvent, então
 * uma devolutiva enviada no painel aparece no acompanhamento do manifestante
 * na mesma sessão.
 *
 * Fora de escopo (outro time): persistência real, autorização server-side,
 * trilha de auditoria imutável em banco, exportação assinada.
 */

export type Actor = { name: string; role: string }

export type InternalNote = {
  id: string
  authorName: string
  text: string
  at: string // ISO
}

export type AuditEntry = {
  id: string
  at: string // ISO
  actorName: string
  actorRole: string
  action: string
  detail?: string
}

export type AdminIdentification = {
  mode: "anonimo" | "identificado"
  name?: string
  email: string
  phone?: string
  relationship: string
}

export type AdminAbout = {
  type: string
  typeOther?: string
  category: string
  categoryOther?: string
  area?: string
  period?: string
  recurrence?: string
  peopleInvolved?: string
}

export type AdminReport = {
  title: string
  description: string
  context?: string
  consequences?: string
}

export type AdminDetail = {
  protocol: string
  waitingInfo: boolean
  identification?: AdminIdentification
  about?: AdminAbout
  report?: AdminReport
  complementary?: { witnesses?: string; measuresTaken?: string; additionalInfo?: string }
  expectation?: { expectation?: string; availableForFollowUp?: boolean }
  notes: InternalNote[]
  audit: AuditEntry[]
}

/** Registro combinado que as telas consomem: público (tracking) + restrito. */
export type AdminManifestation = {
  tracking: TrackingRecord
  detail: AdminDetail
}

const details = new Map<string, AdminDetail>()

const keyOf = (protocol: string) => protocol.trim().toUpperCase()
const newId = () => crypto.randomUUID()

/* ------------------------------------------------------------------ */
/* Notificação de mudança (useSyncExternalStore nas telas)             */
/* ------------------------------------------------------------------ */

let version = 0
const listeners = new Set<() => void>()

export function subscribeAdmin(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getAdminVersion(): number {
  return version
}

function notify() {
  version++
  listeners.forEach((l) => l())
}

/* ------------------------------------------------------------------ */
/* Fixtures — detalhe restrito das manifestações de demonstração       */
/* ------------------------------------------------------------------ */

const seed: AdminDetail[] = [
  {
    protocol: "OUV-2026-DEMO01",
    waitingInfo: false,
    identification: {
      mode: "identificado",
      name: "Mariana Costa",
      email: "mariana.costa@exemplo.com",
      phone: "(81) 99999-0001",
      relationship: "colaborador",
    },
    about: {
      type: "denuncia",
      category: "assedio_moral",
      area: "Engenharia — Squad Pagamentos",
      period: "Desde março de 2026",
      recurrence: "recorrente",
      peopleInvolved: "Gestor direto da squad",
    },
    report: {
      title: "Cobranças públicas constrangedoras em reuniões de equipe",
      description:
        "Nas dailies e reviews das últimas semanas, o gestor tem exposto erros individuais na frente de toda a equipe, com comentários irônicos sobre a capacidade técnica de colegas. Duas pessoas já pediram para sair da squad. A situação se repete pelo menos duas vezes por semana e piora quando há atraso de entrega.",
      context:
        "A squad está sob pressão por um marco contratual. As cobranças começaram após a troca de gestão em fevereiro.",
      consequences:
        "Clima de medo de errar; uma colega passou a apresentar crises de ansiedade antes das reuniões.",
    },
    complementary: {
      witnesses: "Toda a squad presencia; dois colegas toparam confirmar o relato se procurados.",
      measuresTaken: "Tentei conversar com o gestor em 1:1 em abril; a conduta não mudou.",
    },
    expectation: {
      expectation: "Que a conduta seja interrompida e a equipe volte a ter um ambiente seguro.",
      availableForFollowUp: true,
    },
    notes: [
      {
        id: newId(),
        authorName: "Luana Leão",
        text: "Caso com padrão consistente. Agendei escuta com as duas testemunhas indicadas antes de ouvir o gestor.",
        at: "2026-07-08T10:15:00.000Z",
      },
    ],
    audit: [
      {
        id: newId(),
        at: "2026-07-05T11:00:00.000Z",
        actorName: "Luana Leão",
        actorRole: "committee_member",
        action: "Status alterado",
        detail: "Recebida → Em análise",
      },
      {
        id: newId(),
        at: "2026-07-06T09:30:00.000Z",
        actorName: "Luana Leão",
        actorRole: "committee_member",
        action: "Devolutiva enviada",
      },
      {
        id: newId(),
        at: "2026-07-08T10:15:00.000Z",
        actorName: "Luana Leão",
        actorRole: "committee_member",
        action: "Nota interna adicionada",
      },
      {
        id: newId(),
        at: "2026-07-15T18:05:00.000Z",
        actorName: "Valença",
        actorRole: "committee_member",
        action: "Status alterado",
        detail: "Em análise → Em apuração",
      },
    ],
  },
  {
    protocol: "OUV-2026-A7B2C9",
    waitingInfo: false,
    identification: {
      mode: "anonimo",
      email: "canal-anonimo-7f3a@exemplo.com",
      relationship: "colaborador",
    },
    about: {
      type: "denuncia",
      category: "conflito_interesses",
      area: "Suprimentos",
      period: "Últimos dois meses",
      recurrence: "nao_sei",
    },
    report: {
      title: "Contratação de fornecedor com vínculo familiar não declarado",
      description:
        "Um fornecedor recém-contratado para serviços de facilities pertence a um parente próximo de uma pessoa da área de Suprimentos que participou da seleção. O vínculo não foi declarado no processo e a proposta vencedora não era a de menor preço.",
    },
    expectation: { availableForFollowUp: true },
    notes: [],
    audit: [],
  },
  {
    protocol: "OUV-2026-F3E8D4",
    waitingInfo: false,
    identification: {
      mode: "identificado",
      name: "Rafael Albuquerque",
      email: "rafael.alb@exemplo.com",
      relationship: "fornecedor",
    },
    about: {
      type: "reclamacao",
      category: "relacoes_trabalho",
      area: "Financeiro",
      period: "Junho de 2026",
      recurrence: "unico",
    },
    report: {
      title: "Pagamento de nota fiscal atrasado sem retorno do contato",
      description:
        "Nota fiscal emitida em 5 de junho segue sem pagamento e sem previsão, apesar de três cobranças por e-mail. O contrato prevê pagamento em 30 dias.",
      consequences: "Impacto de caixa na minha empresa, que é de pequeno porte.",
    },
    expectation: {
      expectation: "Regularização do pagamento e um canal de contato que responda.",
      availableForFollowUp: true,
    },
    notes: [],
    audit: [],
  },
  {
    protocol: "OUV-2026-K1M5P8",
    waitingInfo: true,
    identification: {
      mode: "anonimo",
      email: "canal-anonimo-2b9c@exemplo.com",
      relationship: "colaborador",
    },
    about: {
      type: "denuncia",
      category: "seguranca_informacao",
      area: "Operações",
      period: "Maio de 2026",
      recurrence: "unico",
    },
    report: {
      title: "Credenciais de produção compartilhadas em grupo de mensagens",
      description:
        "Uma senha de acesso a ambiente de produção foi compartilhada em um grupo de mensagens com mais de vinte pessoas, incluindo terceiros. Não sei se foi trocada depois.",
    },
    notes: [
      {
        id: newId(),
        authorName: "Valença",
        text: "Sem indicação do sistema afetado. Pedi complemento ao manifestante antes de acionar a área de segurança.",
        at: "2026-07-18T16:45:00.000Z",
      },
    ],
    audit: [
      {
        id: newId(),
        at: "2026-07-18T16:40:00.000Z",
        actorName: "Valença",
        actorRole: "committee_member",
        action: "Status alterado",
        detail: "Recebida → Em análise",
      },
      {
        id: newId(),
        at: "2026-07-18T16:42:00.000Z",
        actorName: "Valença",
        actorRole: "committee_member",
        action: "Sinalizada como aguardando informações",
      },
      {
        id: newId(),
        at: "2026-07-18T16:45:00.000Z",
        actorName: "Valença",
        actorRole: "committee_member",
        action: "Nota interna adicionada",
      },
    ],
  },
  {
    protocol: "OUV-2026-Q9R4T2",
    waitingInfo: false,
    identification: {
      mode: "identificado",
      name: "Juliana Barros",
      email: "juliana.barros@exemplo.com",
      relationship: "ex_colaborador",
    },
    about: {
      type: "sugestao",
      category: "relacoes_trabalho",
      area: "Gente & Gestão",
      recurrence: "unico",
    },
    report: {
      title: "Entrevista de desligamento poderia alimentar o canal de ética",
      description:
        "No meu desligamento percebi que vários temas sensíveis apareceram na entrevista, mas não havia caminho claro para virar registro no canal. Sugiro oferecer o link do canal ao final da entrevista de desligamento.",
    },
    expectation: { availableForFollowUp: false },
    notes: [],
    audit: [
      {
        id: newId(),
        at: "2026-07-16T15:30:00.000Z",
        actorName: "Luana Leão",
        actorRole: "committee_member",
        action: "Status alterado",
        detail: "Em apuração → Concluída",
      },
    ],
  },
  {
    protocol: "OUV-2026-W6X8Y1",
    waitingInfo: false,
    identification: {
      mode: "anonimo",
      email: "canal-anonimo-9d1e@exemplo.com",
      relationship: "outro",
    },
    about: {
      type: "duvida",
      category: "outro",
      categoryOther: "Uso da marca em material pessoal",
    },
    report: {
      title: "Posso usar o logotipo da empresa em apresentação de curso?",
      description:
        "Dou aulas fora do horário de trabalho e queria citar projetos em que atuei, usando o logotipo. Não sei se isso fere alguma política.",
    },
    notes: [],
    audit: [
      {
        id: newId(),
        at: "2026-06-20T09:00:00.000Z",
        actorName: "Luana Leão",
        actorRole: "committee_member",
        action: "Status alterado",
        detail: "Recebida → Arquivada (fora do escopo; orientação respondida)",
      },
    ],
  },
]

for (const d of seed) details.set(keyOf(d.protocol), d)

/* ------------------------------------------------------------------ */
/* Leitura                                                             */
/* ------------------------------------------------------------------ */

/** Garante um detalhe mínimo para registros criados pelo portal nesta sessão. */
function ensureDetail(protocol: string): AdminDetail {
  const key = keyOf(protocol)
  let d = details.get(key)
  if (!d) {
    d = { protocol: key, waitingInfo: false, notes: [], audit: [] }
    details.set(key, d)
  }
  return d
}

export function listManifestations(): AdminManifestation[] {
  return listAll().map((tracking) => ({
    tracking,
    detail: ensureDetail(tracking.protocol),
  }))
}

export function getManifestation(protocol: string): AdminManifestation | undefined {
  const tracking = getByProtocol(protocol)
  if (!tracking) return undefined
  return { tracking, detail: ensureDetail(protocol) }
}

/* ------------------------------------------------------------------ */
/* Workflow de status (RF-023)                                         */
/* ------------------------------------------------------------------ */

/** Transições válidas do workflow — terminais não saem mais. */
const transitions: Record<ManifestationStatus, ManifestationStatus[]> = {
  recebida: ["em_analise", "arquivada"],
  em_analise: ["em_apuracao", "concluida", "arquivada"],
  em_apuracao: ["concluida", "arquivada"],
  concluida: [],
  arquivada: [],
}

export function allowedTransitions(status: ManifestationStatus): ManifestationStatus[] {
  return transitions[status]
}

function pushAudit(detail: AdminDetail, actor: Actor, action: string, extra?: string) {
  detail.audit.push({
    id: newId(),
    at: new Date().toISOString(),
    actorName: actor.name,
    actorRole: actor.role,
    action,
    detail: extra,
  })
}

export type MutationResult = { ok: true } | { ok: false; reason: string }

export function changeStatus(
  protocol: string,
  next: ManifestationStatus,
  actor: Actor
): MutationResult {
  const record = getByProtocol(protocol)
  if (!record) return { ok: false, reason: "Manifestação não encontrada." }
  const current = record.status
  if (!transitions[current].includes(next)) {
    return { ok: false, reason: `Transição de ${statusConfig[current].label} para ${statusConfig[next].label} não é permitida.` }
  }

  const detail = ensureDetail(protocol)
  appendEvent(
    protocol,
    {
      kind: "status",
      status: next,
      title: statusConfig[next].label,
      description: statusConfig[next].publicDescription,
      date: new Date().toISOString(),
    },
    next
  )
  // Estado terminal encerra o pedido de complemento pendente.
  if (isTerminal(next)) detail.waitingInfo = false
  pushAudit(detail, actor, "Status alterado", `${statusConfig[current].label} → ${statusConfig[next].label}`)
  notify()
  return { ok: true }
}

/* ------------------------------------------------------------------ */
/* Flag "Aguardando informações" (RF-023) — pedido de complemento      */
/* ------------------------------------------------------------------ */

export function setWaitingInfo(
  protocol: string,
  waiting: boolean,
  actor: Actor,
  publicMessage?: string
): MutationResult {
  const record = getByProtocol(protocol)
  if (!record) return { ok: false, reason: "Manifestação não encontrada." }
  const detail = ensureDetail(protocol)
  if (detail.waitingInfo === waiting) return { ok: true }

  detail.waitingInfo = waiting
  if (waiting) {
    appendEvent(protocol, {
      kind: "request",
      title: "Pedido de informações complementares",
      description:
        publicMessage?.trim() ||
        "O Comitê precisa de informações complementares para seguir com a análise. Responda pelo acompanhamento.",
      date: new Date().toISOString(),
    })
    pushAudit(detail, actor, "Sinalizada como aguardando informações")
  } else {
    pushAudit(detail, actor, "Sinalização de aguardando informações removida")
  }
  notify()
  return { ok: true }
}

/* ------------------------------------------------------------------ */
/* Devolutivas (RF-024) e notas internas (RF-025)                      */
/* ------------------------------------------------------------------ */

export function addResponse(protocol: string, text: string, actor: Actor): MutationResult {
  const record = getByProtocol(protocol)
  if (!record) return { ok: false, reason: "Manifestação não encontrada." }
  const body = text.trim()
  if (!body) return { ok: false, reason: "Escreva a devolutiva antes de enviar." }

  appendEvent(protocol, {
    kind: "response",
    title: "Devolutiva do Comitê",
    description: body,
    date: new Date().toISOString(),
  })
  pushAudit(ensureDetail(protocol), actor, "Devolutiva enviada")
  notify()
  return { ok: true }
}

export function addInternalNote(protocol: string, text: string, actor: Actor): MutationResult {
  const body = text.trim()
  if (!body) return { ok: false, reason: "Escreva a nota antes de salvar." }
  const detail = ensureDetail(protocol)
  detail.notes.push({
    id: newId(),
    authorName: actor.name,
    text: body,
    at: new Date().toISOString(),
  })
  pushAudit(detail, actor, "Nota interna adicionada")
  notify()
  return { ok: true }
}
