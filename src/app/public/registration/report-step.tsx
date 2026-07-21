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
import { FormStep } from "@/components/forms/form-step"
import { FormNavigation } from "@/components/forms/form-navigation"
import { ErrorSummary } from "@/components/forms/error-summary"
import { reportSchema, type ReportValues } from "@/schemas/registration"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"
import { toErrorItems } from "@/features/registration/form-errors"

export function ReportStep() {
  const navigate = useNavigate()
  const { data, updateStep } = useRegistration()

  const form = useForm<ReportValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: data.report?.title ?? "",
      description: data.report?.description ?? "",
      context: data.report?.context ?? "",
      consequences: data.report?.consequences ?? "",
    },
  })

  const onSubmit = (values: ReportValues) => {
    updateStep("report", values)
    navigate(nextRoute("relato"))
  }

  const onBack = () => {
    updateStep("report", form.getValues())
    navigate(prevRoute("relato"))
  }

  const errorItems = toErrorItems(form.formState.errors, [
    "title",
    "description",
    "context",
    "consequences",
  ])

  return (
    <FormStep
      title="Relato"
      description="Descreva o que aconteceu com suas palavras. Não é necessário anexar provas para registrar."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
          <ErrorSummary errors={errorItems} onSelect={(id) => form.setFocus(id as keyof ReportValues)} />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resumo</FormLabel>
                <FormControl>
                  <Input placeholder="Uma frase que resuma a manifestação" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea rows={8} placeholder="O que aconteceu, quando e onde." {...field} />
                </FormControl>
                <FormDescription>
                  Inclua os detalhes que julgar relevantes. Você poderá revisar tudo antes de
                  enviar.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="context"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Local ou contexto{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consequences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Consequências percebidas{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormNavigation nextLabel="Continuar para complementares" onBack={onBack} />
        </form>
      </Form>
    </FormStep>
  )
}
