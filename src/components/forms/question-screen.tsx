import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

type QuestionScreenProps = {
  /** A pergunta, literal, em linguagem humana — vira o h1 da tela. */
  question: string
  /** Apoio curto sob a pergunta (tom acolhedor; termina orientando, não pressionando). */
  helper?: React.ReactNode
  /** Zona única de resposta (um campo, um grupo de RadioCards…). */
  children: React.ReactNode
  onBack: () => void
  /** Presente apenas nas perguntas opcionais — "Pular esta pergunta". */
  onSkip?: () => void
  submitting?: boolean
  nextLabel?: string
  backLabel?: string
  /** Conteúdo após os botões (TrustNotice contextual). */
  footer?: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

/**
 * Tela de pergunta do fluxo conversacional (ADR fluxo-conversacional).
 * Padrão GOV.UK one-thing-per-page: uma decisão por tela, "Pular" preserva a
 * agência (Callisto: escolha), Voltar nunca apaga.
 *
 * Piso Web Interface Guidelines embutido: autofocus do campo SÓ em desktop
 * (hover+pointer fine — "autoFocus sparingly"); no toque, o foco vai ao h1.
 * Campos rotulados pelo chamador (FormLabel/aria-label); erro inline.
 */
export function QuestionScreen({
  question,
  helper,
  children,
  onBack,
  onSkip,
  submitting = false,
  nextLabel = "Continuar",
  backLabel = "Voltar",
  footer,
  onSubmit,
}: QuestionScreenProps) {
  const headingRef = React.useRef<HTMLHeadingElement>(null)
  const bodyRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (fine) {
      const field = bodyRef.current?.querySelector<HTMLElement>(
        "input:not([type='hidden']), textarea, [role='radio']"
      )
      if (field) {
        field.focus()
        return
      }
    }
    headingRef.current?.focus()
  }, [])

  return (
    <form noValidate onSubmit={onSubmit}>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="font-heading text-2xl font-semibold tracking-tight outline-none sm:text-3xl"
      >
        {question}
      </h1>
      {helper ? (
        <p className="text-muted-foreground mt-3 max-w-prose text-sm leading-relaxed text-pretty">
          {helper}
        </p>
      ) : null}

      <div ref={bodyRef} className="mt-6 min-w-0">
        {children}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="ghost" onClick={onBack} disabled={submitting}>
          <ArrowLeft aria-hidden className="size-4" />
          {backLabel}
        </Button>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
          {onSkip ? (
            <Button type="button" variant="ghost" onClick={onSkip} disabled={submitting}>
              Pular esta pergunta
            </Button>
          ) : null}
          <Button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="sm:min-w-44"
          >
            {nextLabel}
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </div>
      </div>

      {footer ? <div className="mt-8">{footer}</div> : null}
    </form>
  )
}
