import * as React from "react"
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Número que conta até o valor com spring (sem overshoot).
 * Adaptado de Magic UI NumberTicker (magicui.design, MIT): formatação via
 * Intl.NumberFormat pt-BR (Web Interface Guidelines) e tabular-nums.
 * Uso previsto: estatísticas do painel admin (frequência rara). No portal
 * público não há caso de uso — o protocolo é identificador, não contagem.
 */
type NumberTickerProps = {
  value: number
  startValue?: number
  /** Atraso em segundos. */
  delay?: number
  decimalPlaces?: number
  className?: string
}

export function NumberTicker({
  value,
  startValue = 0,
  delay = 0,
  decimalPlaces = 0,
  className,
}: NumberTickerProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const motionValue = useMotionValue(startValue)
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const isInView = useInView(ref, { once: true })

  const format = React.useCallback(
    (n: number) =>
      new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(n),
    [decimalPlaces]
  )

  React.useEffect(() => {
    if (!isInView) return
    if (reduced) {
      if (ref.current) ref.current.textContent = format(value)
      return
    }
    const timeout = setTimeout(() => motionValue.set(value), delay * 1000)
    return () => clearTimeout(timeout)
  }, [isInView, reduced, motionValue, value, delay, format])

  React.useEffect(
    () =>
      springValue.on("change", (latest: number) => {
        if (ref.current) ref.current.textContent = format(latest)
      }),
    [springValue, format]
  )

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {format(startValue)}
    </span>
  )
}
