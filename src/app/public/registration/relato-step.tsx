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
import { Textarea } from "@/components/ui/textarea"
import { QuestionScreen } from "@/components/forms/question-screen"
import { relatoSchema, type RelatoValues } from "@/schemas/registration"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"

/** Pergunta 1 — a única resposta de texto obrigatória do fluxo. */
export function RelatoStep() {
  const navigate = useNavigate()
  const { data, updateStep } = useRegistration()

  const form = useForm<RelatoValues>({
    resolver: zodResolver(relatoSchema),
    defaultValues: { description: data.relato?.description ?? "" },
  })

  const onSubmit = form.handleSubmit((values) => {
    updateStep("relato", values)
    navigate(nextRoute("relato", { ...data, relato: values }))
  })

  const onBack = () => {
    updateStep("relato", form.getValues())
    navigate(prevRoute("relato", data))
  }

  return (
    <QuestionScreen
      question="O que aconteceu?"
      helper="Escreva do seu jeito, pouco ou muito. Você pode revisar tudo antes de enviar — e não precisa anexar provas para registrar."
      onSubmit={onSubmit}
      onBack={onBack}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">O que aconteceu</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  placeholder="Conte o que aconteceu, do seu jeito…"
                  className="text-base break-words"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </QuestionScreen>
  )
}
