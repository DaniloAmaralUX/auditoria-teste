/**
 * Taxonomias da manifestação (RF-008) e opções de relação/recorrência.
 * IDs estáveis e legíveis — os valores enviados ao backend não mudam mesmo que o rótulo mude.
 * Configuráveis no futuro pelo painel (RF-008: "tipo e categoria são configuráveis").
 */

export type Option = {
  readonly value: string
  readonly label: string
}

/** Tipo de manifestação (6). */
export const manifestationTypes = [
  { value: "denuncia", label: "Denúncia" },
  { value: "reclamacao", label: "Reclamação" },
  { value: "sugestao", label: "Sugestão" },
  { value: "elogio", label: "Elogio" },
  { value: "duvida", label: "Dúvida" },
  { value: "outro", label: "Outro" },
] as const satisfies readonly Option[]

/** Categoria do relato (12). */
export const manifestationCategories = [
  { value: "assedio_moral", label: "Assédio moral" },
  { value: "assedio_sexual", label: "Assédio sexual" },
  { value: "discriminacao", label: "Discriminação" },
  { value: "fraude_corrupcao", label: "Fraude ou corrupção" },
  { value: "conflito_interesses", label: "Conflito de interesses" },
  { value: "seguranca_informacao", label: "Segurança da informação" },
  { value: "privacidade_dados", label: "Privacidade e dados pessoais" },
  { value: "conduta_inadequada", label: "Conduta inadequada" },
  { value: "descumprimento_politica", label: "Descumprimento de política" },
  { value: "saude_seguranca", label: "Saúde e segurança" },
  { value: "relacoes_trabalho", label: "Relações de trabalho" },
  { value: "outro", label: "Outro" },
] as const satisfies readonly Option[]

/** Relação do manifestante com a Pitang (Etapa 1). */
export const relationshipOptions = [
  { value: "colaborador", label: "Colaborador(a)" },
  { value: "ex_colaborador", label: "Ex-colaborador(a)" },
  { value: "candidato", label: "Candidato(a)" },
  { value: "fornecedor", label: "Fornecedor(a)" },
  { value: "parceiro", label: "Parceiro(a)" },
  { value: "outro", label: "Prefiro não informar / outro" },
] as const satisfies readonly Option[]

/** Recorrência do fato (Etapa 2). */
export const recurrenceOptions = [
  { value: "unico", label: "Aconteceu uma vez" },
  { value: "recorrente", label: "Acontece de forma recorrente" },
  { value: "nao_sei", label: "Não sei informar" },
] as const satisfies readonly Option[]

const toValues = <T extends readonly Option[]>(options: T) =>
  options.map((o) => o.value) as [string, ...string[]]

export const typeValues = toValues(manifestationTypes)
export const categoryValues = toValues(manifestationCategories)
export const relationshipValues = toValues(relationshipOptions)
export const recurrenceValues = toValues(recurrenceOptions)

export function labelFor(options: readonly Option[], value: string | undefined): string {
  if (!value) return "—"
  return options.find((o) => o.value === value)?.label ?? value
}
