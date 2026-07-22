import * as React from "react"

import { Container } from "@/components/layout/container"
import { TrackingLookupForm } from "./tracking-lookup-form"
import { TrackingDetail } from "./tracking-detail"
import type { TrackingRecord } from "@/features/tracking/mock-store"

/**
 * Página de acompanhamento (PUB-009 + PUB-010) na rota neutra /acompanhar.
 * Consulta por formulário (POST-like); o protocolo NÃO vai para a URL, protegendo
 * o histórico do navegador em máquinas compartilhadas (ADR — alternativa mais segura).
 */
export function TrackingPage() {
  const [record, setRecord] = React.useState<TrackingRecord | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const mounted = React.useRef(false)

  // Ao trocar de view (consulta↔detalhe), leva o foco ao h1 da nova view — nas duas direções.
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    containerRef.current?.querySelector<HTMLElement>("h1")?.focus()
  }, [record])

  return (
    <Container width="flow" className="py-12 sm:py-16">
      <div
        ref={containerRef}
        key={record ? record.protocol : "lookup"}
        className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1.5 motion-safe:duration-[var(--motion-base)] motion-safe:ease-[var(--ease-enter)]"
      >
        {record ? (
          <TrackingDetail record={record} onReset={() => setRecord(null)} />
        ) : (
          <TrackingLookupForm onSuccess={setRecord} />
        )}
      </div>
    </Container>
  )
}
