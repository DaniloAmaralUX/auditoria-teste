import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

/**
 * Entrada com fade + blur + deslocamento sutil.
 * Adaptado de Magic UI BlurFade (magicui.design, MIT) para os tokens do
 * projeto: 260ms (--motion-slow), ease-out forte, 6px (--motion-distance-sm).
 * Uso permitido pelo filtro de motion: entradas raras (hero, sucesso,
 * ilustrações) — nunca em elementos vistos dezenas de vezes por dia.
 */
type BlurFadeProps = {
  children: React.ReactNode
  className?: string
  /** Atraso em segundos (stagger manual: passos de 0.06). */
  delay?: number
  /** Só anima quando entra no viewport (uma vez). */
  inView?: boolean
}

export function BlurFade({
  children,
  className,
  delay = 0,
  inView = false,
}: BlurFadeProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const reduced = useReducedMotion()
  const show = !inView || isInView

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: reduced ? 0 : 6,
        filter: reduced ? "blur(0px)" : "blur(4px)",
      }}
      animate={show ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
