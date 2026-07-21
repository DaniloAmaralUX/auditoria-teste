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
import { Label } from "@/components/ui/label"
import { FormStep } from "@/components/forms/form-step"
import { FormNavigation } from "@/components/forms/form-navigation"
import { FileUpload } from "@/components/forms/file-upload"
import { complementarySchema, type ComplementaryValues } from "@/schemas/registration"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"

export function ComplementaryStep() {
  const navigate = useNavigate()
  const { data, updateStep, attachments, setAttachments } = useRegistration()

  const form = useForm<ComplementaryValues>({
    resolver: zodResolver(complementarySchema),
    defaultValues: {
      witnesses: data.complementary?.witnesses ?? "",
      measuresTaken: data.complementary?.measuresTaken ?? "",
      additionalInfo: data.complementary?.additionalInfo ?? "",
    },
  })

  const onSubmit = (values: ComplementaryValues) => {
    updateStep("complementary", values)
    navigate(nextRoute("complementares"))
  }

  const onBack = () => {
    updateStep("complementary", form.getValues())
    navigate(prevRoute("complementares"))
  }

  return (
    <FormStep
      title="Informações complementares"
      description="Tudo aqui é opcional. Adicione o que puder ajudar na apuração."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
          <FormField
            control={form.control}
            name="witnesses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Testemunhas <span className="text-muted-foreground font-normal">(opcional)</span>
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
            name="measuresTaken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Providências já tomadas{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label>Anexos</Label>
            <FileUpload value={attachments} onChange={setAttachments} />
          </div>

          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Outras informações{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormNavigation nextLabel="Continuar para expectativa" onBack={onBack} />
        </form>
      </Form>
    </FormStep>
  )
}
