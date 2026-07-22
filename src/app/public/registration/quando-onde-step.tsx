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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { QuestionScreen } from "@/components/forms/question-screen"
import { quandoOndeSchema, type QuandoOndeValues } from "@/schemas/registration"
import { recurrenceOptions } from "@/lib/registration-taxonomy"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"

/** Pergunta 2 (opcional) — quando/onde + recorrência num só lugar (assuntos irmãos). */
export function QuandoOndeStep() {
  const navigate = useNavigate()
  const { data, updateStep } = useRegistration()

  const form = useForm<QuandoOndeValues>({
    resolver: zodResolver(quandoOndeSchema),
    defaultValues: {
      whenWhere: data.quandoOnde?.whenWhere ?? "",
      recurrence: data.quandoOnde?.recurrence,
    },
  })

  const advance = (values: QuandoOndeValues) => {
    updateStep("quandoOnde", values)
    navigate(nextRoute("quando-onde", { ...data, quandoOnde: values }))
  }

  const onSubmit = form.handleSubmit(advance)
  const onSkip = () => advance(form.getValues())

  const onBack = () => {
    updateStep("quandoOnde", form.getValues())
    navigate(prevRoute("quando-onde", data))
  }

  return (
    <QuestionScreen
      question="Quando e onde isso aconteceu?"
      helper="Se souber, ajuda o Comitê a situar o caso. Datas aproximadas valem — “março de 2026” já ajuda."
      onSubmit={onSubmit}
      onBack={onBack}
      onSkip={onSkip}
    >
      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="whenWhere"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Quando e onde</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Ex.: na unidade de Recife, a partir de março de 2026…"
                    className="break-words"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recurrence"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-normal">
                  Isso aconteceu mais de uma vez?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                    className="flex flex-wrap gap-2"
                  >
                    {recurrenceOptions.map((o) => (
                      <label
                        key={o.value}
                        className="border-border hover:bg-muted/40 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors duration-[var(--motion-fast)]"
                      >
                        <RadioGroupItem value={o.value} className="size-3.5" />
                        {o.label}
                      </label>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </QuestionScreen>
  )
}
