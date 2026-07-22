import { Link } from "react-router-dom"
import { ArrowRight, Mail, Phone, Lock, EyeOff, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { IconTile } from "@/components/ui/icon-tile"
import { Chip } from "@/components/ui/chip"
import { Section } from "@/components/layout/section"
import { ContactLink } from "@/components/public/contact-link"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { messages } from "@/messages/pt-BR"
import { siteConfig } from "@/lib/site-config"

/** Ícones das garantias, na ordem sigilo · anonimato · não retaliação. */
const guaranteeIcons = [Lock, EyeOff, ShieldCheck] as const

/** Entrada escalonada do hero (nível 3 permitido só aqui — doc 13 §6). */
const enterClass =
  "animate-in fade-in slide-in-from-bottom-1.5 fill-mode-both duration-[var(--motion-slow)] ease-[var(--ease-enter)]"

/** Homepage do portal público (RF-001 / tela PUB-001). */
export function HomePage() {
  const t = messages.home

  return (
    <div>
      {/* 1. Hero centrado (linguagem midday.ai) + CTAs + aviso de sigilo */}
      <Section rhythm="roomy" aria-labelledby="hero-title">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <span
            className={`text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${enterClass}`}
          >
            <span aria-hidden className="bg-primary size-1.5 rounded-full" />
            {siteConfig.org} · Canal oficial e sigiloso
          </span>
          <h1
            id="hero-title"
            className={`font-heading text-4xl leading-[1.1] text-balance sm:text-5xl ${enterClass} delay-[60ms]`}
          >
            {t.heroTitle}
          </h1>
          <p
            className={`text-muted-foreground mx-auto max-w-prose text-lg text-pretty ${enterClass} delay-[120ms]`}
          >
            {t.heroSubtitle}
          </p>
          <div
            className={`flex flex-col gap-3 sm:flex-row sm:justify-center ${enterClass} delay-[180ms]`}
          >
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
        <div className={`mx-auto mt-12 max-w-xl ${enterClass} delay-[240ms]`}>
          <TrustNotice variant="anonymity" title="Sigilo e possibilidade de anonimato">
            {messages.anonymity}
          </TrustNotice>
        </div>
      </Section>

      {/* 2. Garantias */}
      <Section banded aria-labelledby="guarantees-title">
        <h2 id="guarantees-title" className="font-heading text-2xl">
          {t.guaranteesTitle}
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {t.guarantees.map((g, i) => {
            const Icon = guaranteeIcons[i] ?? ShieldCheck
            return (
              <div key={g.title} className="space-y-3">
                <IconTile>
                  <Icon aria-hidden className="size-5" />
                </IconTile>
                <h3 className="font-heading text-base">{g.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{g.description}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* 3. Quem pode utilizar */}
      <Section rhythm="compact" aria-labelledby="audience-title">
        <h2 id="audience-title" className="font-heading text-2xl">
          {t.audienceTitle}
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {t.audience.map((a) => (
            <li key={a}>
              <Chip>{a}</Chip>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. Como funciona — 4 passos com numerais fantasma */}
      <Section banded aria-labelledby="how-title">
        <h2 id="how-title" className="font-heading text-2xl">
          {t.howItWorksTitle}
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {t.howItWorks.map((s) => (
            <div key={s.step} role="listitem" className="space-y-2">
              <span
                aria-hidden
                className="font-heading text-5xl leading-none tabular-nums"
                style={{
                  color: "color-mix(in oklch, var(--foreground) 16%, var(--background))",
                }}
              >
                {s.step}
              </span>
              <h3 className="font-heading text-base">
                <span className="sr-only">Passo {s.step}: </span>
                {s.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Não retaliação (RN-001) */}
      <Section rhythm="compact" aria-labelledby="trust-title">
        <h2 id="trust-title" className="sr-only">
          Compromisso de não retaliação
        </h2>
        <TrustNotice variant="confidential" title="Compromisso de não retaliação">
          {t.nonRetaliation}
        </TrustNotice>
      </Section>

      {/* 6. Contatos */}
      <Section rhythm="compact" bordered="top" aria-labelledby="contact-title">
        <h2 id="contact-title" className="font-heading text-2xl">
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
      </Section>

      {/* 7. Chamada final — superfície neutra; o vermelho fica só no CTA */}
      <Section aria-labelledby="final-cta-title">
        <Card className="hover:border-foreground/20 transition-colors duration-[var(--motion-fast)]">
          <CardContent className="flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 id="final-cta-title" className="font-heading text-2xl sm:text-3xl">
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
      </Section>
    </div>
  )
}
