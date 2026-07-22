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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { QuestionScreen } from "@/components/forms/question-screen"
import { expectationSchema, type ExpectationValues } from "@/schemas/registration"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"

/** Etapa 5 — Sua expectativa (RF-006). O e-mail já foi pedido na Etapa 1 — uma vez só. */
export function ExpectativaStep() {
  const navigate = useNavigate()
  const { data, updateStep } = useRegistration()

  const form = useForm<ExpectationValues>({
    resolver: zodResolver(expectationSchema),
    defaultValues: {
      expectation: data.expectation?.expectation ?? "",
      availableForFollowUp: data.expectation?.availableForFollowUp ?? false,
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    updateStep("expectation", values)
    navigate(nextRoute("expectativa"))
  })

  const onBack = () => {
    updateStep("expectation", form.getValues())
    navigate(prevRoute("expectativa"))
  }

  return (
    <QuestionScreen
      question="Sua expectativa"
      helper="Se quiser, conte o que você espera deste canal — ajuda o Comitê a entender o caso."
      onSubmit={onSubmit}
      onBack={onBack}
      nextLabel="Revisar antes de enviar"
    >
      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="expectation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  O que você espera que aconteça?{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Ex.: espero que a conduta seja apurada…"
                    className="break-words"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A expectativa orienta o Comitê, mas não garante um resultado específico.
                </FormDescription>
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
