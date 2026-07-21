import { Link } from "react-router-dom"
import { ArrowRight, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Chip } from "@/components/ui/chip"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { registrationSteps } from "@/features/registration/steps"
import { messages } from "@/messages/pt-BR"

/**
 * Início do fluxo de registro (padrão trust-first — Mobbin/fintech):
 * estabelece confiança e expectativa ANTES de pedir qualquer dado.
 */
export function StartPage() {
  const t = messages.registrationStart

  return (
    <div>
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <h1
        tabIndex={-1}
        className="font-heading mt-3 text-3xl font-semibold tracking-tight outline-none"
      >
        {t.title}
      </h1>
      <p className="text-muted-foreground mt-3 max-w-prose text-base leading-relaxed">
        {t.subtitle}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {t.trustChips.map((chip) => (
          <li key={chip}>
            <Chip>
              <ShieldCheck aria-hidden className="text-muted-foreground size-3.5" strokeWidth={1.75} />
              {chip}
            </Chip>
          </li>
        ))}
      </ul>

      <section aria-labelledby="steps-title" className="mt-8">
        <h2 id="steps-title" className="font-heading text-lg font-semibold tracking-tight">
          {t.stepsTitle}
        </h2>
        <ol className="mt-4 space-y-0">
          {registrationSteps.map((step, i) => {
            const isLast = i === registrationSteps.length - 1
            return (
              <li key={step.key} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="border-border bg-card text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium tabular-nums">
                    {i + 1}
                  </span>
                  {!isLast ? <span className="bg-border w-px flex-1" /> : null}
                </div>
                <p className={`text-sm font-medium ${isLast ? "" : "pb-5"} pt-1.5`}>
                  {step.title}
                </p>
              </li>
            )
          })}
        </ol>
      </section>

      <div className="mt-8">
        <TrustNotice variant="anonymity" title="Sigilo e possibilidade de anonimato">
          {messages.anonymity}
        </TrustNotice>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild size="lg">
          <Link to="/registrar/identificacao">
            {t.cta}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link to="/acompanhar">{messages.home.ctaTrack}</Link>
        </Button>
      </div>
    </div>
  )
}
