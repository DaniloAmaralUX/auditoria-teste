import * as React from "react"
import { useLocation, useOutlet } from "react-router-dom"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

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

/** Ordem das rotas do fluxo para derivar a direção da transição. */
function orderOf(segment: string | undefined): number {
  if (!segment) return -1 // intro
  if (segment === "revisao") return 5
  if (segment === "sucesso") return 6
  const step = stepByPath(segment)
  return step ? stepIndex(step.key) : -1
}

function RegistrationInner() {
  const location = useLocation()
  const outlet = useOutlet()
  const reduced = useReducedMotion()
  const { isDirty } = useRegistration()
  useUnsavedChangesGuard(isDirty)

  const segment = location.pathname.split("/").filter(Boolean)[1]
  const step = stepByPath(segment)
  const currentIndex = step ? stepIndex(step.key) : -1

  // Direção: avançar entra da direita, voltar entra da esquerda (continuidade espacial).
  // Estado ajustado durante o render (padrão React p/ estado derivado de navegação).
  const order = orderOf(segment)
  const [nav, setNav] = React.useState({ order, dir: 1 })
  if (nav.order !== order) {
    setNav({ order, dir: order >= nav.order ? 1 : -1 })
  }
  const direction = nav.order !== order ? (order >= nav.order ? 1 : -1) : nav.dir

  const distance = reduced ? 0 : 12

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      {currentIndex >= 0 ? (
        <div className="mb-8">
          <StepProgress currentIndex={currentIndex} />
        </div>
      ) : null}

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={location.pathname}
          custom={direction}
          variants={{
            enter: (dir: number) => ({ opacity: 0, x: dir * distance }),
            center: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] },
            },
            exit: (dir: number) => ({
              opacity: 0,
              x: dir * -(distance / 2),
              transition: { duration: 0.12, ease: [0.4, 0, 1, 1] },
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {outlet}
        </motion.div>
      </AnimatePresence>

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
