import * as React from "react"

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
  const headingRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (record) {
      headingRef.current?.focus()
    }
  }, [record])

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div ref={headingRef} tabIndex={-1} className="outline-none">
        {record ? (
          <TrackingDetail record={record} onReset={() => setRecord(null)} />
        ) : (
          <TrackingLookupForm onSuccess={setRecord} />
        )}
      </div>
    </div>
  )
}
