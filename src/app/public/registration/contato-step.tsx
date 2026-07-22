import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { QuestionScreen } from "@/components/forms/question-screen"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { contatoSchema, type ContatoValues } from "@/schemas/registration"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"

/** Pergunta 8 — e-mail pedido UMA vez, com o porquê no lugar certo (RF-007). */
export function ContatoStep() {
  const navigate = useNavigate()
  const { data, updateStep } = useRegistration()
  const anonymous = data.modo?.mode === "anonimo"

  const form = useForm<ContatoValues>({
    resolver: zodResolver(contatoSchema),
    defaultValues: {
      email: data.contato?.email ?? "",
      availableForFollowUp: data.contato?.availableForFollowUp ?? false,
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    updateStep("contato", values)
    navigate(nextRoute("contato", { ...data, contato: values }))
  })

  const onBack = () => {
    updateStep("contato", form.getValues())
    navigate(prevRoute("contato", data))
  }

  return (
    <QuestionScreen
      question="Onde enviamos as devolutivas?"
      helper="Usamos o e-mail somente para confirmar o registro e enviar as respostas do Comitê de Ética. Nada além disso."
      onSubmit={onSubmit}
      onBack={onBack}
      nextLabel="Revisar antes de enviar"
      footer={
        anonymous ? (
          <TrustNotice variant="anonymity" title="E o anonimato?">
            O e-mail não entra no relato nem identifica você para a empresa — só o Comitê
            o utiliza, para as devolutivas.
          </TrustNotice>
        ) : null
      }
    >
      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail para devolutivas</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    spellCheck={false}
                    placeholder="voce@exemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableForFollowUp"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Posso complementar, se o Comitê precisar</FormLabel>
                  <FormDescription>
                    O pedido chega pelo acompanhamento — você decide se responde.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
      </Form>
    </QuestionScreen>
  )
}
