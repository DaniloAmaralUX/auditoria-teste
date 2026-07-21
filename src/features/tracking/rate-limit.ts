/**
 * Rate limiting MOCK da consulta (RF-012). Defaults do PRD: 10 tentativas / 15 min.
 * Apenas UX no front-end — a aplicação REAL do limite é responsabilidade do backend,
 * sem associar o identificador ao conteúdo anônimo (RNF-002).
 */

const MAX_ATTEMPTS = 10
const WINDOW_MS = 15 * 60 * 1000

let attempts: number[] = []

function prune(now: number) {
  attempts = attempts.filter((t) => now - t < WINDOW_MS)
}

export type RateStatus = {
  allowed: boolean
  remaining: number
  /** Segundos até liberar, quando bloqueado. */
  retryAfterSeconds: number
}

export function checkRate(now: number = Date.now()): RateStatus {
  prune(now)
  const allowed = attempts.length < MAX_ATTEMPTS
  const oldest = attempts[0]
  const retryAfterSeconds =
    !allowed && oldest ? Math.ceil((WINDOW_MS - (now - oldest)) / 1000) : 0
  return { allowed, remaining: Math.max(0, MAX_ATTEMPTS - attempts.length), retryAfterSeconds }
}

/** Registra uma tentativa (chamada a cada consulta submetida). */
export function recordAttempt(now: number = Date.now()): void {
  prune(now)
  attempts.push(now)
}

export function resetRate(): void {
  attempts = []
}
