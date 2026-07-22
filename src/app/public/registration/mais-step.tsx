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
import { QuestionScreen } from "@/components/forms/question-screen"
import { FileUpload } from "@/components/forms/file-upload"
import { maisSchema, type MaisValues } from "@/schemas/registration"
import { useRegistration } from "@/features/registration/registration-context"
import { nextRoute, prevRoute } from "@/features/registration/steps"

/** Pergunta 4 (opcional) — anexos e qualquer complemento, num só lugar. */
export function MaisStep() {
  const navigate = useNavigate()
  const { data, updateStep, attachments, setAttachments } = useRegistration()

  const form = useForm<MaisValues>({
    resolver: zodResolver(maisSchema),
    defaultValues: { more: data.mais?.more ?? "" },
  })

  const advance = (values: MaisValues) => {
    updateStep("mais", values)
    navigate(nextRoute("mais", { ...data, mais: values }))
  }

  const onSubmit = form.handleSubmit(advance)
  const onSkip = () => advance(form.getValues())

  const onBack = () => {
    updateStep("mais", form.getValues())
    navigate(prevRoute("mais", data))
  }

  return (
    <QuestionScreen
      question="Algo mais que ajude o Comitê?"
      helper="Consequências que você percebeu, providências já tomadas, o que você espera que aconteça — e anexos, se tiver. Tudo aqui é escolha sua."
      onSubmit={onSubmit}
      onBack={onBack}
      onSkip={onSkip}
    >
      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="more"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Informações complementares</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="Ex.: depois disso passei a evitar as reuniões; espero que a conduta seja apurada…"
                    className="break-words"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label className="text-muted-foreground font-normal">
              Anexos <span className="font-normal">(documentos, imagens, áudio ou vídeo)</span>
            </Label>
            <FileUpload value={attachments} onChange={setAttachments} />
          </div>
        </div>
      </Form>
    </QuestionScreen>
  )
}
