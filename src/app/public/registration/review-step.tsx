import * as React from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle } from "lucide-react"

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
import { FormStep } from "@/components/forms/form-step"
import { ReviewSection } from "@/components/forms/review-section"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { termsSchema, type TermsValues } from "@/schemas/registration"
import { useRegistration } from "@/features/registration/registration-context"
import { submitRegistration } from "@/services/registration-service"
import {
  manifestationTypes,
  manifestationCategories,
  relationshipOptions,
  recurrenceOptions,
  labelFor,
} from "@/lib/registration-taxonomy"
import { TERMS_VERSION } from "@/lib/site-config"

export function ReviewStep() {
  const navigate = useNavigate()
  const { data, attachments, setResult } = useRegistration()
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const form = useForm<TermsValues>({
    resolver: zodResolver(termsSchema),
    defaultValues: { termsAccepted: false },
  })

  const { identification, about, report, complementary, expectation } = data

  // Guarda: sem os dados obrigatórios, volta ao início do fluxo.
  if (!identification || !about || !report || !expectation) {
    return <Navigate to="/registrar/identificacao" replace />
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
    <FormStep
      title="Revisão"
      description="Confira as informações antes de enviar. Você pode editar qualquer seção."
    >
      <div className="space-y-4">
        <ReviewSection
          title="Identificação"
          editHref="/registrar/identificacao"
          rows={[
            { label: "Modo", value: identification.mode === "anonimo" ? "Anônima" : "Identificada" },
            ...(identification.mode === "identificado"
              ? [{ label: "Nome", value: identification.name }]
              : []),
            { label: "E-mail", value: identification.email },
            { label: "Telefone", value: identification.phone },
            {
              label: "Relação",
              value: labelFor(relationshipOptions, identification.relationship),
            },
          ]}
        />

        <ReviewSection
          title="Sobre a manifestação"
          editHref="/registrar/sobre-a-manifestacao"
          rows={[
            {
              label: "Tipo",
              value:
                about.type === "outro"
                  ? about.typeOther
                  : labelFor(manifestationTypes, about.type),
            },
            {
              label: "Categoria",
              value:
                about.category === "outro"
                  ? about.categoryOther
                  : labelFor(manifestationCategories, about.category),
            },
            { label: "Área/unidade", value: about.area },
            { label: "Período", value: about.period },
            { label: "Recorrência", value: labelFor(recurrenceOptions, about.recurrence) },
            { label: "Pessoas envolvidas", value: about.peopleInvolved },
          ]}
        />

        <ReviewSection
          title="Relato"
          editHref="/registrar/relato"
          rows={[
            { label: "Resumo", value: report.title },
            { label: "Descrição", value: report.description },
            { label: "Local/contexto", value: report.context },
            { label: "Consequências", value: report.consequences },
          ]}
        />

        <ReviewSection
          title="Complementares"
          editHref="/registrar/complementares"
          rows={[
            { label: "Testemunhas", value: complementary?.witnesses },
            { label: "Providências", value: complementary?.measuresTaken },
            {
              label: "Anexos",
              value:
                validAttachments.length > 0
                  ? validAttachments.map((a) => a.name).join(", ")
                  : "Nenhum",
            },
            { label: "Outras informações", value: complementary?.additionalInfo },
          ]}
        />

        <ReviewSection
          title="Expectativa"
          editHref="/registrar/expectativa"
          rows={[
            { label: "Expectativa", value: expectation.expectation },
            {
              label: "Disponível para complementar",
              value: expectation.availableForFollowUp ? "Sim" : "Não",
            },
            { label: "E-mail confirmado", value: expectation.emailConfirmation },
          ]}
        />
      </div>

      <TrustNotice variant="confidential" className="mt-6" title="Antes de enviar">
        O conteúdo será acessado somente pelo Comitê de Ética. A Pitang não tolera retaliação
        contra quem utiliza este canal de boa-fé.
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
                      className="text-primary underline underline-offset-2"
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
              onClick={() => navigate("/registrar/expectativa")}
              disabled={submitting}
            >
              Voltar
            </Button>
            <Button type="submit" disabled={submitting} className="sm:min-w-48">
              {submitting ? "Enviando…" : "Enviar manifestação"}
            </Button>
          </div>
        </form>
      </Form>
    </FormStep>
  )
}
