/**
 * Configuração central das etapas do registro (RF-006, documento de
 * requisitos v1.0): as 5 etapas oficiais, na ordem oficial, + revisão como
 * última parada do indicador. A camada conversacional (títulos humanos,
 * helpers, campos opcionais sinalizados) vive nos componentes das etapas.
 */

export type StepKey =
  | "identificacao"
  | "sobre-a-manifestacao"
  | "relato"
  | "complementares"
  | "expectativa"
  | "revisao"

export type StepConfig = {
  key: StepKey
  /** Segmento de rota sob /registrar. */
  path: StepKey
  /** Rótulo curto (indicador de progresso), conforme o documento. */
  label: string
}

/** As 5 etapas de coleta + revisão, na ordem oficial (RF-006). */
export const registrationSteps: readonly StepConfig[] = [
  { key: "identificacao", path: "identificacao", label: "Identificação" },
  { key: "sobre-a-manifestacao", path: "sobre-a-manifestacao", label: "Sobre" },
  { key: "relato", path: "relato", label: "Relato" },
  { key: "complementares", path: "complementares", label: "Complementares" },
  { key: "expectativa", path: "expectativa", label: "Expectativa" },
  { key: "revisao", path: "revisao", label: "Revisão" },
] as const

export const totalSteps = registrationSteps.length

export function stepIndex(key: StepKey): number {
  return registrationSteps.findIndex((s) => s.key === key)
}

export function stepByPath(path: string | undefined): StepConfig | undefined {
  return registrationSteps.find((s) => s.path === path)
}

/** Rota da etapa seguinte; após a expectativa, segue para a revisão. */
export function nextRoute(key: StepKey): string {
  const i = stepIndex(key)
  const next = registrationSteps[i + 1]
  return next ? `/registrar/${next.path}` : "/registrar/revisao"
}

/** Rota da etapa anterior; antes da primeira, volta à introdução do fluxo. */
export function prevRoute(key: StepKey): string {
  const i = stepIndex(key)
  const prev = registrationSteps[i - 1]
  return prev ? `/registrar/${prev.path}` : "/registrar"
}
