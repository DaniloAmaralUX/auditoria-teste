import { z } from "zod"

import { relationshipValues, recurrenceValues } from "@/lib/registration-taxonomy"

/**
 * Schemas Zod do fluxo conversacional — um por pergunta + composto final.
 * ADR fluxo-conversacional: uma coisa por tela (GOV.UK one-thing-per-page);
 * a única pergunta de texto obrigatória é o relato. Tipo/categoria saíram do
 * formulário público — o Comitê classifica na triagem (delta de RF-008).
 * E-mail segue obrigatório nos dois modos (RF-007), pedido UMA vez, depois
 * do relato. Mensagens em pt-BR (RF-013).
 */

const email = z
  .string()
  .min(1, "Informe um e-mail para receber as devolutivas.")
  .email("Informe um e-mail válido.")

const requiredText = (msg: string) => z.string().trim().min(1, msg)

// Pergunta 1 — O que aconteceu? (única obrigatória de texto)
export const relatoSchema = z.object({
  description: requiredText("Conte o que aconteceu para registrar.").max(8000),
})

// Pergunta 2 — Quando e onde? (opcional)
export const quandoOndeSchema = z.object({
  whenWhere: z.string().trim().max(2000).optional(),
  recurrence: z.enum(recurrenceValues).optional(),
})

// Pergunta 3 — Quem esteve envolvido? (opcional)
export const pessoasSchema = z.object({
  people: z.string().trim().max(2000).optional(),
})

// Pergunta 4 — Algo mais? (opcional; anexos validados no FileUpload)
export const maisSchema = z.object({
  more: z.string().trim().max(4000).optional(),
})

// Pergunta 5 — Como você quer registrar? (RF-007)
export const modoSchema = z.object({
  mode: z.enum(["anonimo", "identificado"], {
    message: "Escolha como deseja registrar.",
  }),
})

// Pergunta 6 — Como podemos te chamar? (só no modo identificado)
export const dadosSchema = z.object({
  name: requiredText("Informe seu nome para o registro identificado.").max(200),
  phone: z.string().trim().max(40).optional(),
})

// Pergunta 7 — Relação com a Pitang
export const relacaoSchema = z.object({
  relationship: z.enum(relationshipValues, {
    message: "Selecione sua relação com a Pitang.",
  }),
})

// Pergunta 8 — Contato para devolutivas (RF-007: e-mail nos dois modos)
export const contatoSchema = z.object({
  email,
  availableForFollowUp: z.boolean(),
})

// Aceite de Termos na revisão (RF-005)
export const termsSchema = z.object({
  termsAccepted: z
    .boolean()
    .refine((v) => v === true, "É necessário aceitar os Termos de uso para enviar."),
})

/** Schema composto final. */
export const registrationSchema = z.object({
  relato: relatoSchema,
  quandoOnde: quandoOndeSchema.optional(),
  pessoas: pessoasSchema.optional(),
  mais: maisSchema.optional(),
  modo: modoSchema,
  dados: dadosSchema.optional(),
  relacao: relacaoSchema,
  contato: contatoSchema,
})

export type TermsValues = z.infer<typeof termsSchema>
export type RelatoValues = z.infer<typeof relatoSchema>
export type QuandoOndeValues = z.infer<typeof quandoOndeSchema>
export type PessoasValues = z.infer<typeof pessoasSchema>
export type MaisValues = z.infer<typeof maisSchema>
export type ModoValues = z.infer<typeof modoSchema>
export type DadosValues = z.infer<typeof dadosSchema>
export type RelacaoValues = z.infer<typeof relacaoSchema>
export type ContatoValues = z.infer<typeof contatoSchema>
export type RegistrationValues = z.infer<typeof registrationSchema>
