import * as React from "react"
import { Outlet, useLocation } from "react-router-dom"

import { RegistrationProvider, useRegistration } from "./registration-context"
import { StepProgress } from "@/components/forms/step-progress"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { stepByPath, stepIndex } from "./steps"

/** Aviso do navegador ao sair com dados não enviados (RF-006). */
function useUnsavedChangesGuard(active: boolean) {
  React.useEffect(() => {
    if (!active) return
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ""
    }
    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [active])
}

function RegistrationInner() {
  const location = useLocation()
  const { isDirty } = useRegistration()
  useUnsavedChangesGuard(isDirty)

  const segment = location.pathname.split("/").filter(Boolean)[1]
  const step = stepByPath(segment)
  const currentIndex = step ? stepIndex(step.key) : -1

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      {currentIndex >= 0 ? (
        <div className="mb-8">
          <StepProgress currentIndex={currentIndex} />
        </div>
      ) : null}

      <Outlet />

      {currentIndex >= 0 ? (
        <div className="mt-10">
          <TrustNotice variant="confidential">
            O conteúdo é acessado somente pelo Comitê de Ética. A Pitang não tolera retaliação
            contra quem utiliza este canal de boa-fé.
          </TrustNotice>
        </div>
      ) : null}
    </div>
  )
}

/** Shell do fluxo de registro (RF-006): provider de estado + progresso + guarda de saída. */
export function RegistrationLayout() {
  return (
    <RegistrationProvider>
      <RegistrationInner />
    </RegistrationProvider>
  )
}
