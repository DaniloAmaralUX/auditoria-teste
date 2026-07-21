import type { RegistrationData, SubmissionResult } from "@/features/registration/registration-context"
import { addManifestation } from "@/features/tracking/mock-store"

/**
 * Serviço de submissão da manifestação.
 * MOCK de front-end: gera protocolo e código de acesso e simula a latência do envio.
 *
 * Pendências de backend (RF-010 / RNF-002):
 * - protocolo único garantido no servidor;
 * - código de acesso NUNCA salvo em texto simples (armazenar hash);
 * - e-mail de confirmação enfileirado; falha de e-mail não invalida o registro;
 * - anexos enviados e varridos por antimalware; metadados tratados conforme política.
 */

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // sem caracteres ambíguos

function randomInts(length: number): Uint32Array {
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  return array
}

function randomCodeGroup(length: number): string {
  const values = randomInts(length)
  let out = ""
  for (let i = 0; i < length; i++) {
    out += CODE_ALPHABET[values[i] % CODE_ALPHABET.length]
  }
  return out
}

function generateProtocol(year: number): string {
  const suffix = randomCodeGroup(6)
  return `OUV-${year}-${suffix}`
}

/** Código de acesso no formato XXXX-XXXX-XXXX (RF-010). */
function generateAccessCode(): string {
  return [randomCodeGroup(4), randomCodeGroup(4), randomCodeGroup(4)].join("-")
}

export async function submitRegistration(
  _data: RegistrationData,
  options?: { now?: Date }
): Promise<SubmissionResult> {
  // Simula latência real do envio (feedback de processamento — sem progresso falso).
  await new Promise((resolve) => setTimeout(resolve, 900))

  const now = options?.now ?? new Date()
  const result: SubmissionResult = {
    protocol: generateProtocol(now.getFullYear()),
    accessCode: generateAccessCode(),
    submittedAt: now.toISOString(),
  }

  // Bridge para o acompanhamento (mock): torna a manifestação consultável nesta sessão.
  addManifestation({
    protocol: result.protocol,
    accessCode: result.accessCode,
    createdAt: result.submittedAt,
  })

  return result
}
