import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { MessageSquareText } from "lucide-react"

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
import { QuestionScreen } from "@/components/forms/question-screen"
import { reportSchema, type ReportValues } from "@/schemas/registration"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"

/** Etapa 3 — Relato (RF-006): o coração da manifestação. */
export function RelatoStep() {
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

  const onSubmit = form.handleSubmit((values) => {
    updateStep("report", values)
    navigate(nextRoute("relato"))
  })

  const onBack = () => {
    updateStep("report", form.getValues())
    navigate(prevRoute("relato"))
  }

  return (
    <QuestionScreen
      question="Relato"
      icon={<MessageSquareText aria-hidden strokeWidth={1.75} />}
      helper="Conte o que aconteceu com suas palavras, pouco ou muito. Você não precisa anexar provas para registrar — e pode revisar tudo antes de enviar."
      onSubmit={onSubmit}
      onBack={onBack}
      nextLabel="Continuar para complementares"
    >
      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resumo</FormLabel>
                <FormControl>
                  <Input placeholder="Uma frase que resuma a manifestação…" {...field} />
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
                <FormLabel>O que aconteceu?</FormLabel>
                <FormControl>
                  <Textarea
                    rows={8}
                    placeholder="Conte o que aconteceu, quando e onde, do seu jeito…"
                    className="break-words"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Inclua os detalhes que julgar relevantes — datas aproximadas valem.
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
                  <Textarea rows={3} className="break-words" {...field} />
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
                  Consequências que você percebeu{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea rows={3} className="break-words" {...field} />
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
