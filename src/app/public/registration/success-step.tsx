import * as React from "react"
import { Link, Navigate } from "react-router-dom"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProtocolCard } from "@/components/forms/protocol-card"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { useRegistration } from "@/features/registration/registration-context"

export function SuccessStep() {
  const { result } = useRegistration()
  const headingRef = React.useRef<HTMLHeadingElement>(null)

  React.useEffect(() => {
    headingRef.current?.focus()
  }, [])

  // Sem resultado (acesso direto ou refresh), não há o que confirmar.
  if (!result) {
    return <Navigate to="/registrar/identificacao" replace />
  }

  return (
    <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1.5 motion-safe:duration-[var(--motion-base)] motion-safe:ease-[var(--ease-enter)]">
      <div className="flex items-center gap-3">
        <CheckCircle2 aria-hidden className="text-status-completed size-8 shrink-0" />
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-heading text-2xl font-semibold tracking-tight outline-none"
        >
          Manifestação registrada
        </h1>
      </div>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
        Enviamos uma confirmação para o e-mail informado. Guarde o protocolo e o código de acesso
        abaixo: você precisará deles para acompanhar sua manifestação.
      </p>

      <div className="mt-6">
        <ProtocolCard result={result} />
      </div>

      <TrustNotice variant="warning" className="mt-6" title="Guarde o código de acesso">
        O código de acesso não pode ser recuperado. Sem ele, não é possível acompanhar a
        manifestação — isso protege a confidencialidade do seu relato.
      </TrustNotice>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link to="/acompanhar">Acompanhar manifestação</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/">Voltar ao início</Link>
        </Button>
      </div>
    </div>
  )
}
