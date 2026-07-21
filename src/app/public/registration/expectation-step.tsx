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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FormStep } from "@/components/forms/form-step"
import { FormNavigation } from "@/components/forms/form-navigation"
import { ErrorSummary } from "@/components/forms/error-summary"
import { expectationSchema, type ExpectationValues } from "@/schemas/registration"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"
import { toErrorItems } from "@/features/registration/form-errors"

export function ExpectationStep() {
  const navigate = useNavigate()
  const { data, updateStep } = useRegistration()

  const form = useForm<ExpectationValues>({
    resolver: zodResolver(expectationSchema),
    defaultValues: {
      expectation: data.expectation?.expectation ?? "",
      availableForFollowUp: data.expectation?.availableForFollowUp ?? false,
      emailConfirmation: data.expectation?.emailConfirmation ?? data.identification?.email ?? "",
    },
  })

  const onSubmit = (values: ExpectationValues) => {
    updateStep("expectation", values)
    navigate(nextRoute("expectativa"))
  }

  const onBack = () => {
    updateStep("expectation", form.getValues())
    navigate(prevRoute("expectativa"))
  }

  const errorItems = toErrorItems(form.formState.errors, [
    "expectation",
    "availableForFollowUp",
    "emailConfirmation",
  ])

  return (
    <FormStep
      title="Sua expectativa"
      description="Conte o que você espera deste canal e confirme o e-mail para as devolutivas."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
          <ErrorSummary
            errors={errorItems}
            onSelect={(id) => form.setFocus(id as keyof ExpectationValues)}
          />

          <FormField
            control={form.control}
            name="expectation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  O que você espera?{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormDescription>
                  A expectativa ajuda o Comitê a entender o caso, mas não garante um resultado
                  específico.
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
                  <FormLabel>Tenho disponibilidade para complementar, se necessário</FormLabel>
                  <FormDescription>
                    O Comitê poderá solicitar informações adicionais pelo acompanhamento.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme o e-mail para devolutivas</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" inputMode="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormNavigation nextLabel="Revisar antes de enviar" onBack={onBack} />
        </form>
      </Form>
    </FormStep>
  )
}
