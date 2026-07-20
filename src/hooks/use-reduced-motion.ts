import * as React from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

/**
 * Retorna true quando o usuário pediu redução de movimento.
 * Usado para desativar deslocamento/escala em animações (doc 16 / RNF-007).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false
    }
    return window.matchMedia(QUERY).matches
  })

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY)
    const handleChange = () => setReduced(mediaQuery.matches)

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return reduced
}
