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
import { aboutSchema, type AboutValues } from "@/schemas/registration"
import {
  manifestationTypes,
  manifestationCategories,
  recurrenceOptions,
} from "@/lib/registration-taxonomy"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"
import { toErrorItems } from "@/features/registration/form-errors"

export function AboutStep() {
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

  const onSubmit = (values: AboutValues) => {
    updateStep("about", values)
    navigate(nextRoute("sobre-a-manifestacao"))
  }

  const onBack = () => {
    updateStep("about", form.getValues())
    navigate(prevRoute("sobre-a-manifestacao"))
  }

  const errorItems = toErrorItems(form.formState.errors, [
    "type",
    "typeOther",
    "category",
    "categoryOther",
    "area",
    "period",
    "recurrence",
    "peopleInvolved",
  ])

  return (
    <FormStep
      title="Sobre a manifestação"
      description="Essas informações ajudam o Comitê a direcionar a triagem. Preencha o que souber."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
          <ErrorSummary errors={errorItems} onSelect={(id) => form.setFocus(id as keyof AboutValues)} />

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
                      <SelectValue placeholder="Selecione a categoria" />
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
                    <Input placeholder="Ex.: março de 2026" {...field} />
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
                  Recorrência{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {recurrenceOptions.map((o) => (
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
                  <Textarea rows={3} {...field} />
                </FormControl>
                <FormDescription>
                  Informe apenas o necessário. Você pode descrever cargos ou relações sem citar
                  nomes, se preferir.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormNavigation nextLabel="Continuar para o relato" onBack={onBack} />
        </form>
      </Form>
    </FormStep>
  )
}
