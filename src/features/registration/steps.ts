import type { RegistrationData } from "./registration-context"

/**
 * Configuração central do fluxo conversacional (ADR fluxo-conversacional).
 * Uma pergunta por tela (GOV.UK one-thing-per-page); a lista visível é
 * dinâmica — "dados" só existe no modo identificado — e a revisão conta
 * como última parada do indicador de progresso.
 */

export type StepKey =
  | "relato"
  | "quando-onde"
  | "pessoas"
  | "mais"
  | "modo"
  | "dados"
  | "relacao"
  | "contato"
  | "revisao"

export type StepConfig = {
  key: StepKey
  /** Segmento de rota sob /registrar. */
  path: StepKey
  /** Rótulo curto (indicador de progresso). */
  label: string
  /** A pergunta pode ser pulada sem responder. */
  optional?: boolean
  /** Visibilidade condicionada às respostas anteriores. */
  visible?: (data: RegistrationData) => boolean
}

/** Ordem oficial das paradas do fluxo. */
export const registrationSteps: readonly StepConfig[] = [
  { key: "relato", path: "relato", label: "Relato" },
  { key: "quando-onde", path: "quando-onde", label: "Quando e onde", optional: true },
  { key: "pessoas", path: "pessoas", label: "Pessoas", optional: true },
  { key: "mais", path: "mais", label: "Algo mais", optional: true },
  { key: "modo", path: "modo", label: "Identificação" },
  {
    key: "dados",
    path: "dados",
    label: "Seus dados",
    visible: (data) => data.modo?.mode === "identificado",
  },
  { key: "relacao", path: "relacao", label: "Relação" },
  { key: "contato", path: "contato", label: "Contato" },
  { key: "revisao", path: "revisao", label: "Revisão" },
] as const

/** Paradas visíveis para o estado atual das respostas. */
export function visibleSteps(data: RegistrationData): StepConfig[] {
  return registrationSteps.filter((s) => (s.visible ? s.visible(data) : true))
}

export function stepByPath(path: string | undefined): StepConfig | undefined {
  return registrationSteps.find((s) => s.path === path)
}

/** Posição da parada na lista visível (-1 se oculta/inexistente). */
export function stepIndex(key: StepKey, data: RegistrationData): number {
  return visibleSteps(data).findIndex((s) => s.key === key)
}

export function totalSteps(data: RegistrationData): number {
  return visibleSteps(data).length
}

/** Rota da próxima pergunta visível; após a última, o sucesso é navegado pelo envio. */
export function nextRoute(key: StepKey, data: RegistrationData): string {
  const steps = visibleSteps(data)
  const i = steps.findIndex((s) => s.key === key)
  const next = steps[i + 1]
  return next ? `/registrar/${next.path}` : "/registrar/revisao"
}

/** Rota da pergunta anterior visível; antes da primeira, volta à introdução. */
export function prevRoute(key: StepKey, data: RegistrationData): string {
  const steps = visibleSteps(data)
  const i = steps.findIndex((s) => s.key === key)
  const prev = steps[i - 1]
  return prev ? `/registrar/${prev.path}` : "/registrar"
}
