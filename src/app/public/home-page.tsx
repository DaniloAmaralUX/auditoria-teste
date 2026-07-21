import { Link } from "react-router-dom"
import { ArrowRight, Mail, Phone, ShieldCheck, Lock, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Grid, GridCell, GridCross } from "@/components/ui/grid"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconTile } from "@/components/ui/icon-tile"
import { Chip } from "@/components/ui/chip"
import { ContactLink } from "@/components/public/contact-link"
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
      <section aria-labelledby="hero-title">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl space-y-6">
            <Eyebrow className={enterClass}>
              {siteConfig.org} · Canal oficial
            </Eyebrow>
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

      {/* 2. Garantias — faixa alternada sobre o Grid assinatura (hairline + crosshair) */}
      <section aria-labelledby="guarantees-title" className="bg-muted/30 border-y">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2
            id="guarantees-title"
            className="font-heading text-2xl font-semibold tracking-tight"
          >
            {t.guaranteesTitle}
          </h2>
          <Grid
            columns={{ sm: 1, md: 3 }}
            rows={{ sm: 3, md: 1 }}
            className="mt-8"
          >
            <GridCross column={2} row={1} className="hidden md:block" />
            {t.guarantees.map((g, i) => {
              const Icon = guaranteeIcons[i] ?? ShieldCheck
              return (
                <GridCell
                  key={g.title}
                  className="flex-col items-start justify-start gap-3 p-6 text-left"
                >
                  <IconTile>
                    <Icon aria-hidden strokeWidth={1.75} />
                  </IconTile>
                  <h3 className="font-heading text-base font-semibold">{g.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {g.description}
                  </p>
                </GridCell>
              )
            })}
          </Grid>
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
              <li key={a}>
                <Chip>{a}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Como funciona — sequência real de 4 passos com numerais fantasma */}
      <section aria-labelledby="how-title" className="bg-muted/30 border-y">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 id="how-title" className="font-heading text-2xl font-semibold tracking-tight">
            {t.howItWorksTitle}
          </h2>
          <Grid
            columns={{ sm: 1, md: 2, lg: 4 }}
            rows={{ sm: 4, md: 2, lg: 1 }}
            className="mt-8"
            role="list"
          >
            <GridCross column={2} row={2} className="hidden md:block" />
            {t.howItWorks.map((s) => (
              <GridCell
                key={s.step}
                role="listitem"
                className="flex-col items-start justify-start gap-2 p-6 text-left"
              >
                <span
                  aria-hidden
                  className="font-heading text-5xl leading-none font-semibold tabular-nums"
                  style={{
                    color: "color-mix(in oklch, var(--foreground) 18%, var(--background))",
                  }}
                >
                  {s.step}
                </span>
                <h3 className="font-heading mt-1 text-base font-semibold">
                  <span className="sr-only">Passo {s.step}: </span>
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.description}
                </p>
              </GridCell>
            ))}
          </Grid>
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
            <ContactLink href={`mailto:${siteConfig.contact.email}`} icon={Mail}>
              {siteConfig.contact.email}
            </ContactLink>
            <ContactLink href={siteConfig.contact.phoneHref} icon={Phone}>
              {siteConfig.contact.phone}
            </ContactLink>
          </div>
        </div>
      </section>

      {/* 7. Chamada final — superfície neutra; o laranja fica só no CTA */}
      <section aria-labelledby="final-cta-title">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Card className="hover:border-foreground/20 transition-colors duration-[var(--motion-fast)]">
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
