import * as React from "react"
import { AlertCircle } from "lucide-react"

import { useReducedMotion } from "@/hooks/use-reduced-motion"

type ErrorItem = {
  /** id do campo (para mover o foco). */
  fieldId: string
  message: string
}

type ErrorSummaryProps = {
  errors: ErrorItem[]
  /** Título opcional; padrão descreve a quantidade. */
  title?: string
  /** Como mover o foco ao campo. Padrão: document.getElementById(fieldId). */
  onSelect?: (fieldId: string) => void
}

/**
 * Resumo de erros do formulário (RF-013 / doc 15 — ErrorSummary).
 * role="alert" para anúncio por leitor de tela; links movem o foco ao campo.
 * Recebe foco ao aparecer.
 */
export function ErrorSummary({ errors, title, onSelect }: ErrorSummaryProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  React.useEffect(() => {
    if (errors.length > 0) {
      ref.current?.focus()
    }
  }, [errors])

  if (errors.length === 0) {
    return null
  }

  const handleJump = (fieldId: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    if (onSelect) {
      onSelect(fieldId)
      return
    }
    const el = document.getElementById(fieldId)
    if (el) {
      el.focus()
      el.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" })
    }
  }

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      aria-labelledby="error-summary-title"
      className="border-destructive/40 bg-destructive/5 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-[var(--motion-fast)] rounded-lg border p-4 outline-none"
    >
      <div className="flex items-center gap-2">
        <AlertCircle aria-hidden className="text-destructive size-5" />
        <p id="error-summary-title" className="text-destructive text-sm font-semibold">
          {title ?? `Encontramos ${errors.length} ${errors.length === 1 ? "erro" : "erros"} para corrigir`}
        </p>
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-8 text-sm">
        {errors.map((error) => (
          <li key={error.fieldId}>
            <a
              href={`#${error.fieldId}`}
              onClick={handleJump(error.fieldId)}
              className="text-destructive underline underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
