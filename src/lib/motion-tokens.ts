/**
 * Tokens de motion (doc 16 — Motion and Microinteractions).
 * Espelham as CSS variables definidas em src/index.css.
 * Motion sempre com propósito (PRD §18); respeitar prefers-reduced-motion.
 */

export const motionDuration = {
  instant: 80,
  fast: 120,
  base: 180,
  slow: 260,
  emphasis: 360,
} as const

export const motionEase = {
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  enter: "cubic-bezier(0, 0, 0.2, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
  emphasis: "cubic-bezier(0.2, 0.8, 0.2, 1)",
} as const

/** Deslocamentos de entrada/saída aprovados (doc 16). */
export const motionDistance = {
  sm: 2,
  md: 6,
  lg: 12,
} as const

export type MotionDuration = keyof typeof motionDuration
export type MotionEase = keyof typeof motionEase
