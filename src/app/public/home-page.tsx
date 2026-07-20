import { Link } from "react-router-dom"
import {
  ArrowRight,
  Mail,
  Phone,
  ShieldCheck,
  UserCheck,
  ScrollText,
  MessageSquareReply,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { messages } from "@/messages/pt-BR"
import { siteConfig } from "@/lib/site-config"

const howItWorksIcons = [ScrollText, ShieldCheck, UserCheck, MessageSquareReply]

/** Homepage do portal público (RF-001 / tela PUB-001). */
export function HomePage() {
  const t = messages.home

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      {/* 1. Hero + CTAs + aviso de sigilo */}
      <section className="py-14 sm:py-20" aria-labelledby="hero-title">
        <div className="max-w-2xl space-y-6">
          <h1
            id="hero-title"
            className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            {t.heroTitle}
          </h1>
          <p className="text-muted-foreground text-lg text-pretty">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
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
        <div className="mt-8 max-w-2xl">
          <TrustNotice variant="anonymity" title="Sigilo e possibilidade de anonimato">
            {messages.anonymity}
          </TrustNotice>
        </div>
      </section>

      <Separator />

      {/* 2. Garantias */}
      <section className="py-12 sm:py-16" aria-labelledby="guarantees-title">
        <h2
          id="guarantees-title"
          className="font-heading text-2xl font-semibold tracking-tight"
        >
          {t.guaranteesTitle}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {t.guarantees.map((g) => (
            <Card key={g.title}>
              <CardHeader>
                <ShieldCheck aria-hidden className="text-primary size-5" />
                <CardTitle className="text-base">{g.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm leading-relaxed">
                {g.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* 3. Quem pode utilizar */}
      <section className="py-12 sm:py-16" aria-labelledby="audience-title">
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
      </section>

      <Separator />

      {/* 4. Como funciona — 4 passos */}
      <section className="py-12 sm:py-16" aria-labelledby="how-title">
        <h2 id="how-title" className="font-heading text-2xl font-semibold tracking-tight">
          {t.howItWorksTitle}
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.howItWorks.map((s, i) => {
            const Icon = howItWorksIcons[i]
            return (
              <li key={s.step}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                        {s.step}
                      </span>
                      <Icon aria-hidden className="text-muted-foreground size-5" />
                    </div>
                    <CardTitle className="mt-2 text-base">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm leading-relaxed">
                    {s.description}
                  </CardContent>
                </Card>
              </li>
            )
          })}
        </ol>
      </section>

      <Separator />

      {/* 5. Não retaliação (RN-001) */}
      <section className="py-12 sm:py-16" aria-labelledby="trust-title">
        <h2 id="trust-title" className="sr-only">
          Compromisso de não retaliação
        </h2>
        <TrustNotice variant="confidential" title="Compromisso de não retaliação">
          {t.nonRetaliation}
        </TrustNotice>
      </section>

      <Separator />

      {/* 6. Contatos */}
      <section className="py-12 sm:py-16" aria-labelledby="contact-title">
        <h2 id="contact-title" className="font-heading text-2xl font-semibold tracking-tight">
          {t.contactTitle}
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">{t.contactDescription}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-6">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-foreground hover:text-primary inline-flex items-center gap-2 rounded-sm text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Mail aria-hidden className="text-primary size-5" />
            {siteConfig.contact.email}
          </a>
          <a
            href={siteConfig.contact.phoneHref}
            className="text-foreground hover:text-primary inline-flex items-center gap-2 rounded-sm text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Phone aria-hidden className="text-primary size-5" />
            {siteConfig.contact.phone}
          </a>
        </div>
      </section>

      {/* 7. Chamada final */}
      <section className="pb-16" aria-labelledby="final-cta-title">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex flex-col items-start gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="final-cta-title"
                className="font-heading text-xl font-semibold tracking-tight"
              >
                Pronto para registrar?
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Leva poucos minutos e você pode fazer de forma anônima.
              </p>
            </div>
            <Button asChild size="lg" className="shrink-0">
              <Link to="/registrar">
                {t.ctaRegister}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
