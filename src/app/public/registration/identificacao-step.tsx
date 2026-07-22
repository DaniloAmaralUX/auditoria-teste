import { useForm, useWatch } from "react-hook-form"
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
import { RadioGroup } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { QuestionScreen } from "@/components/forms/question-screen"
import { RadioCard } from "@/components/forms/radio-card"
import { MotionCollapse } from "@/components/forms/motion-collapse"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { identificationSchema, type IdentificationValues } from "@/schemas/registration"
import { relationshipOptions } from "@/lib/registration-taxonomy"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"

/** Etapa 1 — Identificação (RF-006/RF-007), com a camada de UX writing acolhedora. */
export function IdentificacaoStep() {
  const navigate = useNavigate()
  const { data, updateStep } = useRegistration()

  const form = useForm<IdentificationValues>({
    resolver: zodResolver(identificationSchema),
    defaultValues: {
      mode: data.identification?.mode,
      name: data.identification?.name ?? "",
      email: data.identification?.email ?? "",
      phone: data.identification?.phone ?? "",
      relationship: data.identification?.relationship,
    },
  })

  const mode = useWatch({ control: form.control, name: "mode" })

  const onSubmit = form.handleSubmit((values) => {
    updateStep("identification", values)
    navigate(nextRoute("identificacao"))
  })

  const onBack = () => {
    updateStep("identification", form.getValues())
    navigate(prevRoute("identificacao"))
  }

  return (
    <QuestionScreen
      question="Identificação"
      helper="Escolha como quer registrar — a decisão é sua, e nos dois modos o relato recebe o mesmo sigilo."
      onSubmit={onSubmit}
      onBack={onBack}
      nextLabel="Continuar para a manifestação"
      footer={
        <MotionCollapse open={mode === "anonimo"}>
          <TrustNotice variant="anonymity">
            No modo anônimo, seu nome não é solicitado nem registrado. Evitamos promessas
            absolutas: anonimato não é o mesmo que confidencialidade técnica total.
          </TrustNotice>
        </MotionCollapse>
      }
    >
      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Como você quer registrar?</FormLabel>
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

          <MotionCollapse open={mode === "identificado"}>
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
          </MotionCollapse>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail para devolutivas</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    spellCheck={false}
                    placeholder="voce@exemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Usamos o e-mail somente para confirmar o registro e enviar as respostas
                  do Comitê de Ética. Nada além disso.
                </FormDescription>
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

          <FormField
            control={form.control}
            name="relationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sua relação com a Pitang</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {relationshipOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>“Prefiro não informar” também é uma resposta.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </QuestionScreen>
  )
}
