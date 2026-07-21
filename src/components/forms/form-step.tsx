import * as React from "react"

type FormStepProps = {
  title: string
  description?: React.ReactNode
  children: React.ReactNode
}

/**
 * Cabeçalho de etapa (doc 15 — FormStep).
 * O título é um h1 que recebe foco ao entrar na etapa (RF-006: "foco no título ao mudar de etapa").
 */
export function FormStep({ title, description, children }: FormStepProps) {
  const headingRef = React.useRef<HTMLHeadingElement>(null)

  React.useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="font-heading text-2xl font-semibold tracking-tight outline-none"
      >
        {title}
      </h1>
      {description ? (
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </div>
  )
}
