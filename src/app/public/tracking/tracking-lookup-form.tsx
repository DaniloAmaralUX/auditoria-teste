import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Search, ShieldCheck } from "lucide-react"

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

  const form = useForm<TrackingLookupValues>({
    resolver: zodResolver(trackingLookupSchema),
    defaultValues: { protocol: "", accessCode: "", website: "" },
  })

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

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="font-heading text-2xl font-semibold tracking-tight">
        Acompanhar manifestação
      </h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Informe o protocolo e o código de acesso que você recebeu ao registrar. Não é preciso criar
        conta.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mt-6 space-y-6">
          {error ? (
            <Alert variant="destructive">
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
                  <Input
                    placeholder="XXXX-XXXX-XXXX"
                    autoComplete="off"
                    className="font-mono"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  O código de acesso foi exibido na confirmação do registro.
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

          <Button type="submit" className="w-full">
            <Search aria-hidden className="size-4" />
            Consultar
          </Button>

          <p className="text-muted-foreground flex items-center justify-center gap-2 text-xs">
            <ShieldCheck aria-hidden className="size-3.5" />
            Consulta protegida contra abuso e limitada por segurança.
          </p>
        </form>
      </Form>
    </div>
  )
}
