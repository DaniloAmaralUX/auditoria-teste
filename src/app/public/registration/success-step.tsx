import * as React from "react"
import { Link, Navigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Spot } from "@/components/ui/spot"
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
    <div>
      <Spot name="sealed" className="w-36" />
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="font-heading mt-4 text-2xl font-semibold tracking-tight outline-none"
      >
        Manifestação registrada
      </h1>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
        Enviamos uma confirmação para o e-mail informado. Guarde o protocolo e o código de acesso
        abaixo: você precisará deles para acompanhar sua manifestação.
      </p>

      {/* Cerimônia sóbria: o cartão entra num segundo tempo, sem exageros. */}
      <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:fill-mode-backwards motion-safe:delay-[140ms] mt-6 duration-[var(--motion-slow)] ease-[var(--ease-out-strong)]">
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
