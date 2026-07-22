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
import { relacaoSchema, type RelacaoValues } from "@/schemas/registration"
import { relationshipOptions } from "@/lib/registration-taxonomy"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"

/** Pergunta 7 — relação com a Pitang ("Prefiro não informar" é uma resposta válida). */
export function RelacaoStep() {
  const navigate = useNavigate()
  const { data, updateStep } = useRegistration()

  const form = useForm<RelacaoValues>({
    resolver: zodResolver(relacaoSchema),
    defaultValues: { relationship: data.relacao?.relationship },
  })

  const onSubmit = form.handleSubmit((values) => {
    updateStep("relacao", values)
    navigate(nextRoute("relacao", { ...data, relacao: values }))
  })

  const onBack = () => {
    updateStep("relacao", form.getValues())
    navigate(prevRoute("relacao", data))
  }

  return (
    <QuestionScreen
      question="Qual a sua relação com a Pitang?"
      helper="Ajuda o Comitê a entender o contexto. “Prefiro não informar” também é uma resposta."
      onSubmit={onSubmit}
      onBack={onBack}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="relationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Relação com a Pitang</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid gap-2 sm:grid-cols-2"
                >
                  {relationshipOptions.map((o) => (
                    <RadioCard key={o.value} value={o.value} title={o.label} className="p-3" />
                  ))}
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
