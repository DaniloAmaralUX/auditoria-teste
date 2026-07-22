import * as React from "react"
import { Link, Navigate } from "react-router-dom"
import { CircleCheck } from "lucide-react"

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
    return <Navigate to="/registrar/relato" replace />
  }

  return (
    <div>
      <CircleCheck aria-hidden className="text-foreground size-8" strokeWidth={1.5} />
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="font-heading mt-4 text-2xl outline-none sm:text-3xl"
      >
        Manifestação registrada
      </h1>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
        Enviamos uma confirmação para o e-mail informado. O protocolo e o código de acesso
        abaixo são a sua chave para acompanhar a manifestação.
      </p>

      {/* Cerimônia sóbria: o cartão entra num segundo tempo, sem exageros. */}
      <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:fill-mode-backwards motion-safe:delay-[140ms] mt-6 duration-[var(--motion-slow)] ease-[var(--ease-out-strong)]">
        <ProtocolCard result={result} />
      </div>

      <TrustNotice variant="warning" className="mt-6" title="Guarde o código de acesso">
        Copie ou baixe o comprovante agora: por sigilo do seu relato, não emitimos segunda
        via do código.
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
