import * as React from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Loader2 } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ReviewSection } from "@/components/forms/review-section"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { termsSchema, type TermsValues } from "@/schemas/registration"
import { useRegistration } from "@/features/registration/registration-context"
import { submitRegistration } from "@/services/registration-service"
import { relationshipOptions, recurrenceOptions, labelFor } from "@/lib/registration-taxonomy"
import { TERMS_VERSION } from "@/lib/site-config"

/**
 * Revisão no padrão "Check your answers" (GOV.UK): tudo editável, nada
 * enviado sem confirmação. Conta como última parada do progresso.
 */
export function ReviewStep() {
  const navigate = useNavigate()
  const { data, attachments, setResult } = useRegistration()
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const headingRef = React.useRef<HTMLHeadingElement>(null)

  const form = useForm<TermsValues>({
    resolver: zodResolver(termsSchema),
    defaultValues: { termsAccepted: false },
  })

  React.useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const { relato, quandoOnde, pessoas, mais, modo, dados, relacao, contato } = data

  // Guarda: sem as respostas obrigatórias, volta ao início do fluxo.
  if (!relato || !modo || !relacao || !contato) {
    return <Navigate to="/registrar/relato" replace />
  }

  const validAttachments = attachments.filter((a) => a.status === "valid")

  const onSubmit = form.handleSubmit(async () => {
    setSubmitError(null)
    try {
      const result = await submitRegistration(data)
      setResult(result)
      navigate("/registrar/sucesso", { replace: true })
    } catch {
      setSubmitError(
        "Não foi possível enviar sua manifestação. Suas informações continuam nesta página. Verifique sua conexão e tente novamente."
      )
    }
  })

  const submitting = form.formState.isSubmitting

  return (
    <div>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="font-heading text-2xl font-semibold tracking-tight outline-none sm:text-3xl"
      >
        Revise antes de enviar
      </h1>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
        Confira suas respostas — cada uma pode ser editada. Nada é enviado sem a sua
        confirmação.
      </p>

      <div className="mt-6 space-y-4">
        <ReviewSection
          title="O que aconteceu"
          editHref="/registrar/relato"
          rows={[
            { label: "Relato", value: relato.description },
            { label: "Quando e onde", value: quandoOnde?.whenWhere },
            {
              label: "Recorrência",
              value: labelFor(recurrenceOptions, quandoOnde?.recurrence),
            },
            { label: "Pessoas envolvidas", value: pessoas?.people },
            { label: "Complementos", value: mais?.more },
            {
              label: "Anexos",
              value:
                validAttachments.length > 0
                  ? validAttachments.map((a) => a.name).join(", ")
                  : "Nenhum",
            },
          ]}
        />

        <ReviewSection
          title="Quem envia"
          editHref="/registrar/modo"
          rows={[
            { label: "Modo", value: modo.mode === "anonimo" ? "Anônima" : "Identificada" },
            ...(modo.mode === "identificado"
              ? [
                  { label: "Nome", value: dados?.name },
                  { label: "Telefone", value: dados?.phone },
                ]
              : []),
            { label: "Relação", value: labelFor(relationshipOptions, relacao.relationship) },
            { label: "E-mail", value: contato.email },
            {
              label: "Disponível para complementar",
              value: contato.availableForFollowUp ? "Sim" : "Não",
            },
          ]}
        />
      </div>

      <TrustNotice variant="confidential" className="mt-6" title="Antes de enviar">
        Somente o Comitê de Ética acessa o conteúdo. A Pitang não tolera retaliação contra
        quem utiliza este canal de boa-fé.
      </TrustNotice>

      <Form {...form}>
        <form onSubmit={onSubmit} noValidate className="mt-6 space-y-6">
          {submitError ? (
            <Alert variant="destructive">
              <AlertCircle aria-hidden className="size-4" />
              <AlertTitle>Não foi possível enviar</AlertTitle>
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          ) : null}

          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-lg border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Li e aceito os{" "}
                    <a
                      href="/termos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-text underline underline-offset-2"
                    >
                      Termos de uso
                    </a>{" "}
                    <span className="text-muted-foreground font-normal">
                      (versão {TERMS_VERSION})
                    </span>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate("/registrar/contato")}
              disabled={submitting}
            >
              Voltar
            </Button>
            <Button type="submit" disabled={submitting} aria-busy={submitting} className="min-w-52">
              {submitting ? (
                <Loader2 aria-hidden className="size-4 animate-spin motion-reduce:animate-none" />
              ) : null}
              Enviar manifestação
            </Button>
          </div>
          <span aria-live="polite" className="sr-only">
            {submitting ? "Enviando manifestação…" : ""}
          </span>
        </form>
      </Form>
    </div>
  )
}
