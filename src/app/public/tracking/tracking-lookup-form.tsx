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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { trackingLookupSchema, type TrackingLookupValues } from "@/schemas/tracking"
import { lookup, type TrackingRecord } from "@/features/tracking/mock-store"
import { checkRate, recordAttempt } from "@/features/tracking/rate-limit"

type TrackingLookupFormProps = {
  onSuccess: (record: TrackingRecord) => void
}

const GENERIC_ERROR =
  "Não encontramos uma manifestação com esses dados. Verifique o protocolo e o código de acesso e tente novamente."

export function TrackingLookupForm({ onSuccess }: TrackingLookupFormProps) {
  const [error, setError] = React.useState<string | null>(null)
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

  return (
    <div className="brand-glow relative mx-auto w-full max-w-md">
      <p className="text-primary-text text-sm font-medium tracking-wide uppercase">
        Acompanhamento
      </p>
      <h1
        tabIndex={-1}
        className="font-heading mt-1 text-2xl font-semibold tracking-tight outline-none"
      >
        Acompanhar manifestação
      </h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Informe o protocolo e o código de acesso que você recebeu ao registrar. Não é preciso criar
        conta.
      </p>

      <div className="bg-card mt-6 rounded-xl border p-6 shadow-[var(--shadow-border)] sm:p-8">
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
                  >
                    <InputOTPGroup>
                      {[0, 1, 2, 3].map((i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      {[4, 5, 6, 7].map((i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      {[8, 9, 10, 11].map((i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
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
              className="w-full"
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
