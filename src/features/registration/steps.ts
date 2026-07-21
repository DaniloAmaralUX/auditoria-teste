/**
 * Configuração central das etapas do registro (RF-006).
 * Fonte única para rotas, indicador de progresso e navegação.
 * A Etapa 2 usa o rótulo/rota do PRD ("Sobre a manifestação").
 */

export type StepKey =
  | "identificacao"
  | "sobre-a-manifestacao"
  | "relato"
  | "complementares"
  | "expectativa"

export type StepConfig = {
  key: StepKey
  /** Segmento de rota sob /registrar. */
  path: StepKey
  /** Rótulo curto (indicador de progresso). */
  label: string
  /** Título da etapa (h1, recebe foco ao entrar). */
  title: string
}

/** As 5 etapas de coleta, na ordem oficial (RF-006). */
export const registrationSteps: readonly StepConfig[] = [
  { key: "identificacao", path: "identificacao", label: "Identificação", title: "Identificação" },
  {
    key: "sobre-a-manifestacao",
    path: "sobre-a-manifestacao",
    label: "Sobre",
    title: "Sobre a manifestação",
  },
  { key: "relato", path: "relato", label: "Relato", title: "Relato" },
  {
    key: "complementares",
    path: "complementares",
    label: "Complementares",
    title: "Informações complementares",
  },
  { key: "expectativa", path: "expectativa", label: "Expectativa", title: "Sua expectativa" },
] as const

export const totalSteps = registrationSteps.length

export function stepIndex(key: StepKey): number {
  return registrationSteps.findIndex((s) => s.key === key)
}

export function stepByPath(path: string | undefined): StepConfig | undefined {
  return registrationSteps.find((s) => s.path === path)
}

/** Rota da etapa seguinte; após a última, segue para a revisão. */
export function nextRoute(key: StepKey): string {
  const i = stepIndex(key)
  const next = registrationSteps[i + 1]
  return next ? `/registrar/${next.path}` : "/registrar/revisao"
}

/** Rota da etapa anterior; antes da primeira, volta ao início. */
export function prevRoute(key: StepKey): string {
  const i = stepIndex(key)
  const prev = registrationSteps[i - 1]
  return prev ? `/registrar/${prev.path}` : "/"
}
