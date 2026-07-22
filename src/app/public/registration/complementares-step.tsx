import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { Paperclip } from "lucide-react"

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
import { QuestionScreen } from "@/components/forms/question-screen"
import { FileUpload } from "@/components/forms/file-upload"
import { complementarySchema, type ComplementaryValues } from "@/schemas/registration"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"

/** Etapa 4 — Complementares (RF-006/RF-009): tudo opcional, tudo escolha. */
export function ComplementaresStep() {
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

  const onSubmit = form.handleSubmit((values) => {
    updateStep("complementary", values)
    navigate(nextRoute("complementares"))
  })

  const onBack = () => {
    updateStep("complementary", form.getValues())
    navigate(prevRoute("complementares"))
  }

  return (
    <QuestionScreen
      question="Informações complementares"
      icon={<Paperclip aria-hidden strokeWidth={1.75} />}
      helper="Tudo nesta etapa é opcional — acrescente o que puder ajudar na apuração e siga em frente quando quiser."
      onSubmit={onSubmit}
      onBack={onBack}
      nextLabel="Continuar para expectativa"
    >
      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="witnesses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Testemunhas <span className="text-muted-foreground font-normal">(opcional)</span>
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
            name="measuresTaken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Providências já tomadas{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea rows={3} className="break-words" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label className="text-foreground">
              Anexos{" "}
              <span className="text-muted-foreground font-normal">
                (documentos, imagens, áudio ou vídeo — opcional)
              </span>
            </Label>
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
