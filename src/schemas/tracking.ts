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
    .min(1, "Informe o código de acesso."),
  /** Campo-armadilha oculto; se preenchido, trata-se de bot. */
  website: z.string().max(0).optional(),
})

export type TrackingLookupValues = z.infer<typeof trackingLookupSchema>
