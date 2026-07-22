import * as React from "react"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Lock,
  MessageCircleQuestion,
  MessageSquareReply,
  ScrollText,
  StickyNote,
  UserRound,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Chip } from "@/components/ui/chip"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Spot } from "@/components/ui/spot"
import { Textarea } from "@/components/ui/textarea"
import { StatusBadge } from "@/components/public/status-badge"
import { StatusTimeline } from "@/components/public/status-timeline"
import { useAuth } from "@/features/auth/auth-context"
import {
  addInternalNote,
  addResponse,
  allowedTransitions,
  changeStatus,
  getManifestation,
  getAdminVersion,
  setWaitingInfo,
  subscribeAdmin,
} from "@/features/admin/admin-store"
import {
  labelFor,
  manifestationCategories,
  manifestationTypes,
  recurrenceOptions,
  relationshipOptions,
} from "@/lib/registration-taxonomy"
import { statusConfig, isTerminal, type ManifestationStatus } from "@/lib/manifestation-status"

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/** Par rótulo/valor usado nos cartões de leitura. */
function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value?.trim()) return null
  return (
    <div>
      <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm leading-relaxed whitespace-pre-wrap">{value}</dd>
    </div>
  )
}

function CardTitle({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  children: React.ReactNode
}) {
  return (
    <h2 className="font-heading flex items-center gap-2 text-sm font-semibold">
      <Icon aria-hidden className="text-muted-foreground size-4" />
      {children}
    </h2>
  )
}

/**
 * Detalhe da manifestação — visão do Comitê (RF-022 a RF-026).
 * Coluna principal: relato completo, devolutivas e linha do tempo pública.
 * Coluna lateral: workflow de status, identificação (restrita por papel),
 * classificação, notas internas e trilha de auditoria.
 */
export function AdminManifestationDetailPage() {
  const { protocol = "" } = useParams()
  const { user, can } = useAuth()
  // A assinatura re-renderiza a página a cada mutação do store (leitura direta).
  React.useSyncExternalStore(subscribeAdmin, getAdminVersion)
  const record = getManifestation(protocol)

  const [nextStatus, setNextStatus] = React.useState<ManifestationStatus | "">("")
  const [responseText, setResponseText] = React.useState("")
  const [noteText, setNoteText] = React.useState("")

  const actor = React.useMemo(
    () => ({ name: user?.name ?? "—", role: user?.role ?? "—" }),
    [user]
  )

  if (!record) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 py-16 text-center">
        <Spot name="empty" className="w-36" />
        <h1 className="font-heading text-xl font-semibold">Manifestação não encontrada</h1>
        <p className="text-muted-foreground text-sm">
          O protocolo <span className="font-mono">{protocol}</span> não existe nesta sessão de
          demonstração.
        </p>
        <Button asChild variant="outline">
          <Link to="/admin/manifestacoes">
            <ArrowLeft aria-hidden className="size-4" />
            Voltar à fila
          </Link>
        </Button>
      </div>
    )
  }

  const { tracking, detail } = record
  const transitions = allowedTransitions(tracking.status)
  const responses = tracking.timeline.filter((e) => e.kind === "response")
  const auditDesc = [...detail.audit].sort(
    (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()
  )

  const applyStatus = () => {
    if (!nextStatus) return
    const result = changeStatus(tracking.protocol, nextStatus, actor)
    if (result.ok) {
      toast.success(`Status alterado para ${statusConfig[nextStatus].label}.`)
      setNextStatus("")
    } else {
      toast.error(result.reason)
    }
  }

  const toggleWaiting = (checked: boolean) => {
    const result = setWaitingInfo(tracking.protocol, checked, actor)
    if (result.ok) {
      toast.success(
        checked
          ? "Manifestação sinalizada como aguardando informações. O pedido aparece no acompanhamento."
          : "Sinalização de aguardando informações removida."
      )
    } else {
      toast.error(result.reason)
    }
  }

  const sendResponse = () => {
    const result = addResponse(tracking.protocol, responseText, actor)
    if (result.ok) {
      toast.success("Devolutiva enviada. O manifestante a verá no acompanhamento.")
      setResponseText("")
    } else {
      toast.error(result.reason)
    }
  }

  const saveNote = () => {
    const result = addInternalNote(tracking.protocol, noteText, actor)
    if (result.ok) {
      toast.success("Nota interna salva. Notas nunca aparecem ao manifestante.")
      setNoteText("")
    } else {
      toast.error(result.reason)
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <header className="space-y-3">
        <Link
          to="/admin/manifestacoes"
          className="link-underline text-muted-foreground inline-flex items-center gap-1 text-sm"
        >
          <ArrowLeft aria-hidden className="size-3.5" />
          Fila de manifestações
        </Link>
        <div className="space-y-2">
          <p className="text-muted-foreground font-mono text-sm">{tracking.protocol}</p>
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {detail.report?.title ?? "Manifestação registrada no portal"}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={tracking.status} />
            {detail.waitingInfo ? (
              <Chip>
                <MessageCircleQuestion aria-hidden className="size-3.5" />
                Aguardando informações
              </Chip>
            ) : null}
            <span className="text-muted-foreground text-xs">
              Registrada em {formatDateTime(tracking.createdAt)} · atualizada em{" "}
              {formatDateTime(tracking.updatedAt)}
            </span>
          </div>
        </div>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {/* ---------------- Coluna principal ---------------- */}
        <div className="min-w-0 space-y-6">
          <section className="bg-card space-y-4 rounded-xl border p-5">
            <CardTitle icon={ScrollText}>Relato</CardTitle>
            {detail.report ? (
              <dl className="space-y-4">
                <Field label="O que aconteceu" value={detail.report.description} />
                <Field label="Contexto" value={detail.report.context} />
                <Field label="Consequências" value={detail.report.consequences} />
              </dl>
            ) : (
              <p className="text-muted-foreground text-sm">
                Registro criado pelo portal nesta sessão — o conteúdo do relato não fica
                disponível no mock do painel.
              </p>
            )}
            {detail.complementary || detail.expectation ? (
              <>
                <Separator />
                <dl className="space-y-4">
                  <Field label="Testemunhas" value={detail.complementary?.witnesses} />
                  <Field
                    label="Medidas já tomadas"
                    value={detail.complementary?.measuresTaken}
                  />
                  <Field
                    label="Informações adicionais"
                    value={detail.complementary?.additionalInfo}
                  />
                  <Field label="Expectativa do manifestante" value={detail.expectation?.expectation} />
                  {detail.expectation ? (
                    <Field
                      label="Disponível para contato"
                      value={detail.expectation.availableForFollowUp ? "Sim" : "Não"}
                    />
                  ) : null}
                </dl>
              </>
            ) : null}
          </section>

          <section className="bg-card space-y-4 rounded-xl border p-5">
            <div className="flex items-baseline justify-between gap-3">
              <CardTitle icon={MessageSquareReply}>Devolutivas ao manifestante</CardTitle>
              <span className="text-muted-foreground text-xs">
                Visíveis no acompanhamento público
              </span>
            </div>
            {responses.length === 0 ? (
              <p className="text-muted-foreground text-sm">Nenhuma devolutiva enviada ainda.</p>
            ) : (
              <ul className="space-y-3">
                {responses.map((event, i) => (
                  <li key={i} className="bg-muted/30 rounded-lg border p-3">
                    <p className="text-muted-foreground text-xs">{formatDateTime(event.date)}</p>
                    <p className="mt-1 text-sm leading-relaxed whitespace-pre-wrap">
                      {event.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            {can("writeResponse") ? (
              <div className="space-y-2">
                <Label htmlFor="response-text">Nova devolutiva</Label>
                <Textarea
                  id="response-text"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Escreva a resposta que o manifestante verá no acompanhamento…"
                  rows={4}
                  maxLength={4000}
                />
                <div className="flex justify-end">
                  <Button type="button" onClick={sendResponse} disabled={!responseText.trim()}>
                    Enviar devolutiva
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <Lock aria-hidden className="size-3.5" />
                Seu papel não envia devolutivas — ação reservada ao Comitê de Ética.
              </p>
            )}
          </section>

          <section className="bg-card space-y-4 rounded-xl border p-5">
            <CardTitle icon={ScrollText}>Linha do tempo pública</CardTitle>
            <StatusTimeline events={tracking.timeline} />
          </section>
        </div>

        {/* ---------------- Coluna lateral ---------------- */}
        <div className="space-y-6">
          <section className="bg-card space-y-4 rounded-xl border p-5">
            <h2 className="font-heading text-sm font-semibold">Workflow</h2>
            {can("changeStatus") ? (
              isTerminal(tracking.status) ? (
                <p className="text-muted-foreground text-sm">
                  {statusConfig[tracking.status].label} é um estado final — o workflow desta
                  manifestação está encerrado.
                </p>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="next-status">Mover para</Label>
                    <Select
                      value={nextStatus}
                      onValueChange={(v) => setNextStatus(v as ManifestationStatus)}
                    >
                      <SelectTrigger id="next-status" className="w-full">
                        <SelectValue placeholder="Escolha o próximo status" />
                      </SelectTrigger>
                      <SelectContent>
                        {transitions.map((s) => (
                          <SelectItem key={s} value={s}>
                            {statusConfig[s].label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="button"
                    className="w-full"
                    onClick={applyStatus}
                    disabled={!nextStatus}
                  >
                    Aplicar status
                  </Button>
                  <Separator />
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="waiting-info"
                      checked={detail.waitingInfo}
                      onCheckedChange={(v) => toggleWaiting(v === true)}
                    />
                    <div className="space-y-0.5">
                      <Label htmlFor="waiting-info" className="leading-tight">
                        Aguardando informações
                      </Label>
                      <p className="text-muted-foreground text-xs leading-snug">
                        Sinaliza o pedido de complemento no acompanhamento do manifestante.
                      </p>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <Lock aria-hidden className="size-3.5" />
                Seu papel não altera o workflow — ação reservada ao Comitê de Ética.
              </p>
            )}
          </section>

          <section className="bg-card space-y-4 rounded-xl border p-5">
            <CardTitle icon={UserRound}>Identificação</CardTitle>
            {can("viewRestrictedIdentity") ? (
              detail.identification ? (
                <dl className="space-y-3">
                  <Field
                    label="Forma de registro"
                    value={detail.identification.mode === "anonimo" ? "Anônima" : "Identificada"}
                  />
                  <Field label="Nome" value={detail.identification.name} />
                  <Field label="E-mail para devolutivas" value={detail.identification.email} />
                  <Field label="Telefone" value={detail.identification.phone} />
                  <Field
                    label="Relação com a Pitang"
                    value={labelFor(relationshipOptions, detail.identification.relationship)}
                  />
                </dl>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Identificação não disponível no mock para registros desta sessão.
                </p>
              )
            ) : (
              <p className="text-muted-foreground flex items-start gap-1.5 text-sm">
                <Lock aria-hidden className="mt-0.5 size-3.5 shrink-0" />
                Acesso restrito ao Comitê de Ética. A administração do canal opera sem ver a
                identidade do manifestante.
              </p>
            )}
          </section>

          <section className="bg-card space-y-4 rounded-xl border p-5">
            <h2 className="font-heading text-sm font-semibold">Classificação</h2>
            {detail.about ? (
              <dl className="space-y-3">
                <Field
                  label="Tipo"
                  value={
                    detail.about.type === "outro" && detail.about.typeOther
                      ? `Outro — ${detail.about.typeOther}`
                      : labelFor(manifestationTypes, detail.about.type)
                  }
                />
                <Field
                  label="Categoria"
                  value={
                    detail.about.category === "outro" && detail.about.categoryOther
                      ? `Outro — ${detail.about.categoryOther}`
                      : labelFor(manifestationCategories, detail.about.category)
                  }
                />
                <Field label="Área ou setor" value={detail.about.area} />
                <Field label="Período" value={detail.about.period} />
                <Field
                  label="Recorrência"
                  value={
                    detail.about.recurrence
                      ? labelFor(recurrenceOptions, detail.about.recurrence)
                      : undefined
                  }
                />
                <Field label="Pessoas envolvidas" value={detail.about.peopleInvolved} />
              </dl>
            ) : (
              <p className="text-muted-foreground text-sm">
                Classificação não disponível no mock para registros desta sessão.
              </p>
            )}
          </section>

          <section className="bg-card space-y-4 rounded-xl border p-5">
            <div className="space-y-1">
              <CardTitle icon={StickyNote}>Notas internas</CardTitle>
              <p className="text-muted-foreground text-xs">Nunca visíveis ao manifestante.</p>
            </div>
            {detail.notes.length === 0 ? (
              <p className="text-muted-foreground text-sm">Nenhuma nota ainda.</p>
            ) : (
              <ul className="space-y-3">
                {[...detail.notes].reverse().map((note) => (
                  <li key={note.id} className="bg-muted/30 rounded-lg border p-3">
                    <p className="text-muted-foreground text-xs">
                      {note.authorName} · {formatDateTime(note.at)}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed whitespace-pre-wrap">{note.text}</p>
                  </li>
                ))}
              </ul>
            )}
            {can("writeInternalNote") ? (
              <div className="space-y-2">
                <Label htmlFor="note-text" className="sr-only">
                  Nova nota interna
                </Label>
                <Textarea
                  id="note-text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Registrar avaliação, próximo passo ou contexto interno…"
                  rows={3}
                  maxLength={2000}
                />
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={saveNote}
                    disabled={!noteText.trim()}
                  >
                    Salvar nota
                  </Button>
                </div>
              </div>
            ) : null}
          </section>

          <section className="bg-card space-y-4 rounded-xl border p-5">
            <div className="space-y-1">
              <h2 className="font-heading text-sm font-semibold">Trilha de auditoria</h2>
              <p className="text-muted-foreground text-xs">
                Toda ação do painel fica registrada (RF-026).
              </p>
            </div>
            {auditDesc.length === 0 ? (
              <p className="text-muted-foreground text-sm">Nenhuma ação registrada ainda.</p>
            ) : (
              <ol className="space-y-3">
                {auditDesc.map((entry) => (
                  <li key={entry.id} className="border-border border-l-2 pl-3">
                    <p className="text-sm font-medium">{entry.action}</p>
                    {entry.detail ? (
                      <p className="text-muted-foreground text-xs">{entry.detail}</p>
                    ) : null}
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {entry.actorName} · {formatDateTime(entry.at)}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
