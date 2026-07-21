import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

type FormNavigationProps = {
  /** Rótulo contextual do avanço (ex.: "Continuar para o relato"). */
  nextLabel: string
  onBack?: () => void
  backLabel?: string
  /** Desabilita o avanço (ex.: durante submissão). */
  submitting?: boolean
  /** Quando true, o botão de avanço é do tipo submit; senão dispara onNext. */
  isSubmit?: boolean
  onNext?: () => void
}

/**
 * Navegação Voltar/Continuar do formulário (RF-006).
 * Voltar nunca apaga dados; o rótulo de avanço é descritivo (doc 07).
 */
export function FormNavigation({
  nextLabel,
  onBack,
  backLabel = "Voltar",
  submitting = false,
  isSubmit = true,
  onNext,
}: FormNavigationProps) {
  return (
    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      {onBack ? (
        <Button type="button" variant="ghost" onClick={onBack} disabled={submitting}>
          <ArrowLeft aria-hidden className="size-4" />
          {backLabel}
        </Button>
      ) : (
        <span aria-hidden />
      )}

      <Button
        type={isSubmit ? "submit" : "button"}
        onClick={isSubmit ? undefined : onNext}
        disabled={submitting}
        className="sm:min-w-48"
      >
        {nextLabel}
        <ArrowRight aria-hidden className="size-4" />
      </Button>
    </div>
  )
}
