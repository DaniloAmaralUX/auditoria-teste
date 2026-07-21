import { z } from "zod"

/**
 * Schema da consulta de acompanhamento (RF-011).
 * `website` é um honeypot antiabuso — deve permanecer vazio (RF-012).
 */
export const trackingLookupSchema = z.object({
  protocol: z
    .string()
    .trim()
    .min(1, "Informe o número do protocolo."),
  accessCode: z
    .string()
    .trim()
    .min(1, "Informe o código de acesso.")
    .refine(
      (v) => v.replace(/[^A-Za-z0-9]/g, "").length === 12,
      "Informe o código completo (12 caracteres)."
    ),
  /** Campo-armadilha oculto; se preenchido, trata-se de bot. */
  website: z.string().max(0).optional(),
})

export type TrackingLookupValues = z.infer<typeof trackingLookupSchema>
