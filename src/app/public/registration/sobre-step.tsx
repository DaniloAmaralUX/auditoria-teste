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
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { QuestionScreen } from "@/components/forms/question-screen"
import { MotionCollapse } from "@/components/forms/motion-collapse"
import { aboutSchema, type AboutValues } from "@/schemas/registration"
import {
  manifestationTypes,
  manifestationCategories,
  recurrenceOptions,
} from "@/lib/registration-taxonomy"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"

/**
 * Etapa 2 — Sobre a manifestação (RF-008). A classificação orienta a triagem;
 * a copy tira o peso do acerto: a escolha mais próxima basta, o Comitê ajusta.
 */
export function SobreStep() {
  const navigate = useNavigate()
  const { data, updateStep } = useRegistration()

  const form = useForm<AboutValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      type: data.about?.type,
      typeOther: data.about?.typeOther ?? "",
      category: data.about?.category,
      categoryOther: data.about?.categoryOther ?? "",
      area: data.about?.area ?? "",
      period: data.about?.period ?? "",
      recurrence: data.about?.recurrence,
      peopleInvolved: data.about?.peopleInvolved ?? "",
    },
  })

  const type = useWatch({ control: form.control, name: "type" })
  const category = useWatch({ control: form.control, name: "category" })

  const onSubmit = form.handleSubmit((values) => {
    updateStep("about", values)
    navigate(nextRoute("sobre-a-manifestacao"))
  })

  const onBack = () => {
    updateStep("about", form.getValues())
    navigate(prevRoute("sobre-a-manifestacao"))
  }

  return (
    <QuestionScreen
      question="Sobre a manifestação"
      helper="Essas escolhas ajudam o Comitê a direcionar a triagem. Escolha o mais próximo do seu caso — não precisa ser exato, o Comitê ajusta na análise."
      onSubmit={onSubmit}
      onBack={onBack}
      nextLabel="Continuar para o relato"
    >
      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de manifestação</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {manifestationTypes.map((o) => (
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

          <MotionCollapse open={type === "outro"}>
            <FormField
              control={form.control}
              name="typeOther"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descreva o tipo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </MotionCollapse>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria do relato</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a mais próxima" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {manifestationCategories.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Na dúvida entre duas, escolha qualquer uma — a triagem do Comitê ajusta.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <MotionCollapse open={category === "outro"}>
            <FormField
              control={form.control}
              name="categoryOther"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descreva a categoria</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </MotionCollapse>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Área ou unidade{" "}
                    <span className="text-muted-foreground font-normal">(se souber)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Data ou período{" "}
                    <span className="text-muted-foreground font-normal">(se souber)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: março de 2026…" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="recurrence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Isso aconteceu mais de uma vez?{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
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

          <FormField
            control={form.control}
            name="peopleInvolved"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Pessoas envolvidas{" "}
                  <span className="text-muted-foreground font-normal">(se souber)</span>
                </FormLabel>
                <FormControl>
                  <Textarea rows={3} className="break-words" {...field} />
                </FormControl>
                <FormDescription>
                  Inclua também quem presenciou. Você pode descrever cargos ou relações sem
                  citar nomes, se preferir.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </QuestionScreen>
  )
}
