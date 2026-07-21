import { z } from "zod"

import {
  typeValues,
  categoryValues,
  relationshipValues,
  recurrenceValues,
} from "@/lib/registration-taxonomy"

/**
 * Schemas Zod da manifestação — um por etapa + composto final (RF-006).
 * Mensagens em pt-BR (RF-013). E-mail obrigatório nos dois modos (RF-007);
 * no modo anônimo o nome nunca é solicitado nem enviado.
 */

const email = z
  .string()
  .min(1, "Informe um e-mail para receber as devolutivas.")
  .email("Informe um e-mail válido.")

const requiredText = (msg: string) => z.string().trim().min(1, msg)

// Etapa 1 — Identificação (RF-007)
export const identificationSchema = z
  .object({
    mode: z.enum(["anonimo", "identificado"], {
      message: "Escolha como deseja registrar.",
    }),
    name: z.string().trim().max(200).optional(),
    email,
    phone: z.string().trim().max(40).optional(),
    relationship: z.enum(relationshipValues, {
      message: "Selecione sua relação com a Pitang.",
    }),
  })
  .refine((data) => data.mode !== "identificado" || !!data.name?.trim(), {
    path: ["name"],
    message: "Informe seu nome para o registro identificado.",
  })

// Etapa 2 — Sobre a manifestação (RF-008)
export const aboutSchema = z
  .object({
    type: z.enum(typeValues, { message: "Selecione o tipo de manifestação." }),
    typeOther: z.string().trim().max(120).optional(),
    category: z.enum(categoryValues, { message: "Selecione a categoria do relato." }),
    categoryOther: z.string().trim().max(120).optional(),
    area: z.string().trim().max(160).optional(),
    period: z.string().trim().max(120).optional(),
    recurrence: z.enum(recurrenceValues).optional(),
    peopleInvolved: z.string().trim().max(1000).optional(),
  })
  .refine((d) => d.type !== "outro" || !!d.typeOther?.trim(), {
    path: ["typeOther"],
    message: "Descreva o tipo quando selecionar “Outro”.",
  })
  .refine((d) => d.category !== "outro" || !!d.categoryOther?.trim(), {
    path: ["categoryOther"],
    message: "Descreva a categoria quando selecionar “Outro”.",
  })

// Etapa 3 — Relato (RF-006)
export const reportSchema = z.object({
  title: requiredText("Escreva um resumo curto da manifestação.").max(160),
  description: requiredText("Descreva o que aconteceu.").max(8000),
  context: z.string().trim().max(2000).optional(),
  consequences: z.string().trim().max(2000).optional(),
})

// Etapa 4 — Complementares (anexos validados no componente FileUpload)
export const complementarySchema = z.object({
  witnesses: z.string().trim().max(2000).optional(),
  measuresTaken: z.string().trim().max(2000).optional(),
  additionalInfo: z.string().trim().max(2000).optional(),
})

// Etapa 5 — Expectativa (RF-006)
export const expectationSchema = z.object({
  expectation: z.string().trim().max(2000).optional(),
  availableForFollowUp: z.boolean(),
  emailConfirmation: email,
})

// Aceite de Termos na revisão (RF-005)
export const termsSchema = z.object({
  termsAccepted: z
    .boolean()
    .refine((v) => v === true, "É necessário aceitar os Termos de uso para enviar."),
})

/** Schema composto final (RF-006). */
export const registrationSchema = z.object({
  identification: identificationSchema,
  about: aboutSchema,
  report: reportSchema,
  complementary: complementarySchema,
  expectation: expectationSchema,
})

export type TermsValues = z.infer<typeof termsSchema>
export type IdentificationValues = z.infer<typeof identificationSchema>
export type AboutValues = z.infer<typeof aboutSchema>
export type ReportValues = z.infer<typeof reportSchema>
export type ComplementaryValues = z.infer<typeof complementarySchema>
export type ExpectationValues = z.infer<typeof expectationSchema>
export type RegistrationValues = z.infer<typeof registrationSchema>
