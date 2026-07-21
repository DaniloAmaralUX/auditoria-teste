import { Link } from "react-router-dom"
import { ArrowRight, Mail, Phone, ShieldCheck, Lock, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { messages } from "@/messages/pt-BR"
import { siteConfig } from "@/lib/site-config"

const guaranteeIcons = [Lock, EyeOff, ShieldCheck]

/** Entrada escalonada do hero (nível 3 permitido só aqui — doc 13 §6). */
const enterClass =
  "animate-in fade-in slide-in-from-bottom-1.5 fill-mode-both duration-[var(--motion-slow)] ease-[var(--ease-enter)]"

/** Homepage do portal público (RF-001 / tela PUB-001). */
export function HomePage() {
  const t = messages.home

  return (
    <div>
      {/* 1. Hero + CTAs + aviso de sigilo */}
      <section aria-labelledby="hero-title" className="brand-glow brand-dots">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl space-y-6">
            <p
              className={`text-primary-text text-sm font-medium tracking-wide uppercase ${enterClass}`}
            >
              {siteConfig.org} · Canal oficial
            </p>
            <h1
              id="hero-title"
              className={`font-heading text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl ${enterClass} delay-[60ms]`}
            >
              {t.heroTitle}
            </h1>
            <p
              className={`text-muted-foreground max-w-prose text-lg ${enterClass} delay-[120ms]`}
            >
              {t.heroSubtitle}
            </p>
            <div className={`flex flex-col gap-3 sm:flex-row ${enterClass} delay-[180ms]`}>
              <Button asChild size="lg">
                <Link to="/registrar">
                  {t.ctaRegister}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/acompanhar">{t.ctaTrack}</Link>
              </Button>
            </div>
          </div>
          <div className={`mt-10 max-w-2xl ${enterClass} delay-[240ms]`}>
            <TrustNotice variant="anonymity" title="Sigilo e possibilidade de anonimato">
              {messages.anonymity}
            </TrustNotice>
          </div>
        </div>
      </section>

      {/* 2. Garantias — faixa alternada */}
      <section aria-labelledby="guarantees-title" className="bg-muted/30 border-y">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2
            id="guarantees-title"
            className="font-heading text-2xl font-semibold tracking-tight"
          >
            {t.guaranteesTitle}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {t.guarantees.map((g, i) => {
              const Icon = guaranteeIcons[i] ?? ShieldCheck
              return (
                <Card
                  key={g.title}
                  className="border-transparent shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-standard)] hover:shadow-[var(--shadow-border-hover)]"
                >
                  <CardHeader>
                    <div className="bg-primary/10 text-primary-text flex size-10 items-center justify-center rounded-lg">
                      <Icon aria-hidden className="size-5" />
                    </div>
                    <CardTitle className="mt-1 text-base">{g.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm leading-relaxed">
                    {g.description}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. Quem pode utilizar */}
      <section aria-labelledby="audience-title">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2
            id="audience-title"
            className="font-heading text-2xl font-semibold tracking-tight"
          >
            {t.audienceTitle}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {t.audience.map((a) => (
              <li
                key={a}
                className="border-border bg-muted/40 text-foreground rounded-full border px-4 py-1.5 text-sm"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Como funciona — faixa alternada, 4 passos em sequência */}
      <section aria-labelledby="how-title" className="bg-muted/30 border-y">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 id="how-title" className="font-heading text-2xl font-semibold tracking-tight">
            {t.howItWorksTitle}
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.howItWorks.map((s, i) => (
              <li key={s.step} className="relative">
                <Card className="h-full border-transparent shadow-[var(--shadow-border)]">
                  <CardHeader>
                    <span className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums">
                      {s.step}
                    </span>
                    <CardTitle className="mt-2 text-base">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm leading-relaxed">
                    {s.description}
                  </CardContent>
                </Card>
                {/* conector de sequência (só entre colunas no desktop) */}
                {i < t.howItWorks.length - 1 ? (
                  <span
                    aria-hidden
                    className="bg-border absolute top-10 -right-4 hidden h-px w-4 lg:block"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Não retaliação (RN-001) */}
      <section aria-labelledby="trust-title">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 id="trust-title" className="sr-only">
            Compromisso de não retaliação
          </h2>
          <TrustNotice variant="confidential" title="Compromisso de não retaliação">
            {t.nonRetaliation}
          </TrustNotice>
        </div>
      </section>

      {/* 6. Contatos */}
      <section aria-labelledby="contact-title" className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2
            id="contact-title"
            className="font-heading text-2xl font-semibold tracking-tight"
          >
            {t.contactTitle}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">{t.contactDescription}</p>
          <div className="mt-4 flex flex-col sm:flex-row sm:gap-4">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:bg-muted -mx-3 inline-flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors duration-[var(--motion-fast)] outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="bg-primary/10 text-primary-text flex size-9 items-center justify-center rounded-md">
                <Mail aria-hidden className="size-4" />
              </span>
              {siteConfig.contact.email}
            </a>
            <a
              href={siteConfig.contact.phoneHref}
              className="hover:bg-muted -mx-3 inline-flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors duration-[var(--motion-fast)] outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="bg-primary/10 text-primary-text flex size-9 items-center justify-center rounded-md">
                <Phone aria-hidden className="size-4" />
              </span>
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>

      {/* 7. Chamada final */}
      <section aria-labelledby="final-cta-title">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <h2
                  id="final-cta-title"
                  className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  Pronto para registrar?
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  Leva poucos minutos e você pode fazer de forma anônima.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                <Button asChild size="lg">
                  <Link to="/registrar">
                    {t.ctaRegister}
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/acompanhar">{t.ctaTrack}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
