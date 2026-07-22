import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Search, ShieldCheck, Loader2 } from "lucide-react"

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { trackingLookupSchema, type TrackingLookupValues } from "@/schemas/tracking"
import { lookup, type TrackingRecord } from "@/features/tracking/mock-store"
import { checkRate, recordAttempt } from "@/features/tracking/rate-limit"

type TrackingLookupFormProps = {
  onSuccess: (record: TrackingRecord) => void
}

const GENERIC_ERROR =
  "Não encontramos uma manifestação com esses dados. Verifique o protocolo e o código de acesso e tente novamente."

/* Padrões do comprovante (içados do handler — js-hoist-regexp). Liberais no que
   aceitam: incluem 0/1, ausentes do alfabeto do gerador, para funcionar até com
   comprovante transcrito à mão. */
const PROTOCOL_PATTERN = /OUV-\d{4}-[A-Z0-9]{4,8}/i
const CODE_PATTERN = /\b[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}\b/i

export function TrackingLookupForm({ onSuccess }: TrackingLookupFormProps) {
  const [error, setError] = React.useState<string | null>(null)
  const [pasted, setPasted] = React.useState(false)
  const errorRef = React.useRef<HTMLDivElement>(null)

  const form = useForm<TrackingLookupValues>({
    resolver: zodResolver(trackingLookupSchema),
    defaultValues: { protocol: "", accessCode: "", website: "" },
  })

  // Ao falhar, leva o foco ao alerta (resgate por teclado/leitor de tela).
  React.useEffect(() => {
    if (error) {
      errorRef.current?.focus()
    }
  }, [error])

  const onSubmit = (values: TrackingLookupValues) => {
    setError(null)

    const rate = checkRate()
    if (!rate.allowed) {
      const minutes = Math.ceil(rate.retryAfterSeconds / 60)
      setError(
        `Muitas tentativas de consulta. Por segurança, aguarde cerca de ${minutes} minuto(s) antes de tentar novamente.`
      )
      return
    }

    recordAttempt()

    // Honeypot: se preenchido, é bot — resposta genérica, sem revelar o motivo.
    if (values.website) {
      setError(GENERIC_ERROR)
      return
    }

    const result = lookup(values.protocol, values.accessCode)
    if (!result.ok) {
      setError(GENERIC_ERROR)
      return
    }
    onSuccess(result.record)
  }

  const submitting = form.formState.isSubmitting

  /**
   * Colar o comprovante inteiro preenche os dois campos — zero transcrição.
   * "Nunca bloquear paste" segue valendo: só interceptamos quando o texto
   * contém protocolo E código.
   */
  const onPasteReceipt = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const text = e.clipboardData.getData("text")
    const protocol = text.match(PROTOCOL_PATTERN)?.[0]
    const code = protocol
      ? text.replace(protocol, "").match(CODE_PATTERN)?.[0]
      : undefined
    if (!protocol || !code) return
    e.preventDefault()
    form.setValue("protocol", protocol.toUpperCase(), { shouldValidate: true })
    form.setValue("accessCode", code.replaceAll("-", "").toUpperCase(), {
      shouldValidate: true,
    })
    setPasted(true)
  }

  return (
    <div className="mx-auto w-full max-w-md" onPaste={onPasteReceipt}>
      <Eyebrow>Acompanhamento</Eyebrow>
      <h1
        tabIndex={-1}
        className="font-heading mt-1 text-2xl outline-none sm:text-3xl"
      >
        Acompanhar manifestação
      </h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Informe o protocolo e o código de acesso que você recebeu ao registrar — ou cole o
        comprovante inteiro em qualquer campo, que preenchemos os dois. Você não precisa
        criar conta.
      </p>
      <span aria-live="polite" className="sr-only">
        {pasted ? "Protocolo e código preenchidos a partir do comprovante colado." : ""}
      </span>

      <div className="bg-card mt-6 rounded-xl border p-4 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
            {error ? (
              <Alert
                ref={errorRef}
                tabIndex={-1}
                variant="destructive"
                className="outline-none motion-safe:animate-in motion-safe:fade-in motion-safe:duration-[var(--motion-fast)]"
              >
                <AlertCircle aria-hidden className="size-4" />
                <AlertTitle>Não foi possível consultar</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

          <FormField
            control={form.control}
            name="protocol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Protocolo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="OUV-2026-XXXXXX"
                    autoComplete="off"
                    className="font-mono"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accessCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de acesso</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={12}
                    value={field.value}
                    onChange={(value) => field.onChange(value.toUpperCase())}
                    onBlur={field.onBlur}
                    inputMode="text"
                    pattern="[A-Za-z0-9]*"
                    aria-label="Código de acesso, 12 caracteres em três grupos de quatro"
                    containerClassName="w-full min-w-0"
                  >
                    {/* 12 slots de largura fixa não cabem no card (max-w-md):
                        cada slot é flex-1 com altura fixa — dividem o espaço por
                        igual em qualquer largura, sem espremer torto nem estourar.
                        No mobile os separadores saem (o hífen é visual, não
                        semântico — colar continua aceitando com hífens). */}
                    {[0, 1, 2].map((group) => (
                      <React.Fragment key={group}>
                        {group > 0 ? (
                          <InputOTPSeparator className="hidden shrink-0 sm:flex" />
                        ) : null}
                        <InputOTPGroup className="min-w-0 flex-1">
                          {[0, 1, 2, 3].map((i) => (
                            <InputOTPSlot
                              key={i}
                              index={group * 4 + i}
                              className="h-9 min-w-0 flex-1 text-xs sm:text-sm"
                            />
                          ))}
                        </InputOTPGroup>
                      </React.Fragment>
                    ))}
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  O código foi exibido na confirmação do registro. Colar também funciona.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Honeypot antiabuso — invisível e fora da ordem de tabulação. */}
          <div aria-hidden className="hidden">
            <label htmlFor="website">Não preencha este campo</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...form.register("website")}
            />
          </div>

            <Button
              type="submit"
              className="min-h-11 w-full sm:min-h-9"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? (
                <Loader2 aria-hidden className="size-4 animate-spin motion-reduce:animate-none" />
              ) : (
                <Search aria-hidden className="size-4" />
              )}
              {submitting ? "Consultando…" : "Consultar"}
            </Button>
          </form>
        </Form>
      </div>

      <p className="text-muted-foreground mt-4 flex items-center justify-center gap-2 text-xs">
        <ShieldCheck aria-hidden className="size-3.5" />
        Consulta protegida contra abuso e limitada por segurança.
      </p>
    </div>
  )
}
