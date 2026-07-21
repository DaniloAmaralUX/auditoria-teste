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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormStep } from "@/components/forms/form-step"
import { FormNavigation } from "@/components/forms/form-navigation"
import { ErrorSummary } from "@/components/forms/error-summary"
import { MotionCollapse } from "@/components/forms/motion-collapse"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { identificationSchema, type IdentificationValues } from "@/schemas/registration"
import { relationshipOptions } from "@/lib/registration-taxonomy"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"
import { toErrorItems } from "@/features/registration/form-errors"
import { messages } from "@/messages/pt-BR"

export function IdentificationStep() {
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

  const onSubmit = (values: IdentificationValues) => {
    updateStep("identification", values)
    navigate(nextRoute("identificacao"))
  }

  const onBack = () => {
    updateStep("identification", form.getValues())
    navigate(prevRoute("identificacao"))
  }

  const errorItems = toErrorItems(form.formState.errors, [
    "mode",
    "name",
    "email",
    "phone",
    "relationship",
  ])

  return (
    <FormStep
      title="Identificação"
      description="Escolha como deseja registrar. Em ambos os modos, pedimos um e-mail apenas para confirmação e devolutivas."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
          <ErrorSummary errors={errorItems} onSelect={(id) => form.setFocus(id as keyof IdentificationValues)} />

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
                    <label className="border-input hover:bg-muted/40 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors duration-[var(--motion-fast)] ease-[var(--ease-standard)]">
                      <RadioGroupItem value="anonimo" className="mt-0.5" />
                      <span className="space-y-1">
                        <span className="block text-sm font-medium">Anônima</span>
                        <span className="text-muted-foreground block text-sm">
                          Sem informar seu nome. O e-mail é usado somente pelo Comitê para as
                          devolutivas.
                        </span>
                      </span>
                    </label>
                    <label className="border-input hover:bg-muted/40 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors duration-[var(--motion-fast)] ease-[var(--ease-standard)]">
                      <RadioGroupItem value="identificado" className="mt-0.5" />
                      <span className="space-y-1">
                        <span className="block text-sm font-medium">Identificada</span>
                        <span className="text-muted-foreground block text-sm">
                          Com seu nome e contato, mantidos sob sigilo do Comitê de Ética.
                        </span>
                      </span>
                    </label>
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
                  <Input type="email" autoComplete="email" inputMode="email" {...field} />
                </FormControl>
                <FormDescription>{messages.anonymity}</FormDescription>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <MotionCollapse open={mode === "anonimo"}>
            <TrustNotice variant="anonymity">
              No modo anônimo, seu nome não é solicitado nem registrado. Evitamos promessas
              absolutas: anonimato não é o mesmo que confidencialidade técnica total.
            </TrustNotice>
          </MotionCollapse>

          <FormNavigation nextLabel="Continuar para a manifestação" onBack={onBack} />
        </form>
      </Form>
    </FormStep>
  )
}
