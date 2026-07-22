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
import { pessoasSchema, type PessoasValues } from "@/schemas/registration"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"

/** Pergunta 3 (opcional) — pessoas envolvidas e testemunhas, juntas. */
export function PessoasStep() {
  const navigate = useNavigate()
  const { data, updateStep } = useRegistration()

  const form = useForm<PessoasValues>({
    resolver: zodResolver(pessoasSchema),
    defaultValues: { people: data.pessoas?.people ?? "" },
  })

  const advance = (values: PessoasValues) => {
    updateStep("pessoas", values)
    navigate(nextRoute("pessoas", { ...data, pessoas: values }))
  }

  const onSubmit = form.handleSubmit(advance)
  const onSkip = () => advance(form.getValues())

  const onBack = () => {
    updateStep("pessoas", form.getValues())
    navigate(prevRoute("pessoas", data))
  }

  return (
    <QuestionScreen
      question="Quem esteve envolvido?"
      helper="Inclua também quem presenciou, se houver. Você pode descrever cargos ou relações sem citar nomes, se preferir."
      onSubmit={onSubmit}
      onBack={onBack}
      onSkip={onSkip}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="people"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Pessoas envolvidas e testemunhas</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Ex.: um gestor da minha área; duas colegas presenciaram…"
                  className="break-words"
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
