import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup } from "@/components/ui/radio-group"
import { QuestionScreen } from "@/components/forms/question-screen"
import { RadioCard } from "@/components/forms/radio-card"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { modoSchema, type ModoValues } from "@/schemas/registration"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"

/** Pergunta 5 — a decisão de identificação, sozinha na tela (RF-007). */
export function ModoStep() {
  const navigate = useNavigate()
  const { data, updateStep } = useRegistration()

  const form = useForm<ModoValues>({
    resolver: zodResolver(modoSchema),
    defaultValues: { mode: data.modo?.mode },
  })

  const onSubmit = form.handleSubmit((values) => {
    updateStep("modo", values)
    navigate(nextRoute("modo", { ...data, modo: values }))
  })

  const onBack = () => {
    updateStep("modo", form.getValues())
    navigate(prevRoute("modo", data))
  }

  return (
    <QuestionScreen
      question="Como você quer registrar?"
      helper="Nos dois modos, o conteúdo do relato é tratado com o mesmo sigilo."
      onSubmit={onSubmit}
      onBack={onBack}
      footer={
        <TrustNotice variant="anonymity">
          No modo anônimo, seu nome não é solicitado nem registrado. Evitamos promessas
          absolutas: anonimato não é o mesmo que confidencialidade técnica total.
        </TrustNotice>
      }
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Modo de registro</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="gap-3"
                >
                  <RadioCard
                    value="anonimo"
                    title="Anônima"
                    description="Sem informar seu nome. O e-mail é usado somente pelo Comitê para as devolutivas."
                  />
                  <RadioCard
                    value="identificado"
                    title="Identificada"
                    description="Com seu nome e contato, mantidos sob sigilo do Comitê de Ética."
                  />
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </QuestionScreen>
  )
}
