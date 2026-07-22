import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Navigate, useNavigate } from "react-router-dom"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { QuestionScreen } from "@/components/forms/question-screen"
import { dadosSchema, type DadosValues } from "@/schemas/registration"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"

/** Pergunta 6 — nome e telefone; existe apenas no modo identificado. */
export function DadosStep() {
  const navigate = useNavigate()
  const { data, updateStep } = useRegistration()

  const form = useForm<DadosValues>({
    resolver: zodResolver(dadosSchema),
    defaultValues: {
      name: data.dados?.name ?? "",
      phone: data.dados?.phone ?? "",
    },
  })

  // Rota inválida no modo anônimo (acesso direto): segue para a relação.
  if (data.modo?.mode !== "identificado") {
    return <Navigate to="/registrar/relacao" replace />
  }

  const onSubmit = form.handleSubmit((values) => {
    updateStep("dados", values)
    navigate(nextRoute("dados", { ...data, dados: values }))
  })

  const onBack = () => {
    updateStep("dados", form.getValues())
    navigate(prevRoute("dados", data))
  }

  return (
    <QuestionScreen
      question="Como podemos te chamar?"
      helper="Seu nome e contato ficam sob sigilo do Comitê de Ética."
      onSubmit={onSubmit}
      onBack={onBack}
    >
      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Telefone <span className="text-muted-foreground font-normal">(opcional)</span>
                </FormLabel>
                <FormControl>
                  <Input type="tel" autoComplete="tel" inputMode="tel" {...field} />
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
