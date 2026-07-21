import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowRight, Lock, Mail, EyeOff, ShieldCheck, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconTile } from "@/components/ui/icon-tile"
import { Chip } from "@/components/ui/chip"
import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"
import { AlertCircle } from "lucide-react"

import { StatusBadge } from "@/components/public/status-badge"
import { StatusTimeline } from "@/components/public/status-timeline"
import { ContactLink } from "@/components/public/contact-link"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { RadioCard } from "@/components/forms/radio-card"
import { FormStep } from "@/components/forms/form-step"
import { FormNavigation } from "@/components/forms/form-navigation"
import { StepProgress } from "@/components/forms/step-progress"
import { ReviewSection } from "@/components/forms/review-section"
import { ProtocolCard } from "@/components/forms/protocol-card"
import { statusConfig, type ManifestationStatus } from "@/lib/manifestation-status"
import type { TrackingEvent } from "@/features/tracking/mock-store"
import { PageHeader, GuideSection, DemoPanel, UsageMeta } from "./design-ui"

/* ------------------------------------------------------------------ */
/* Demo: mini-formulário vivo (RHF + zod) — o padrão real do registro */
/* ------------------------------------------------------------------ */

const demoSchema = z.object({
  email: z
    .string()
    .min(1, "Informe um e-mail para receber as devolutivas.")
    .email("Informe um e-mail válido."),
  relato: z.string().min(1, "Descreva o que aconteceu."),
})

type DemoValues = z.infer<typeof demoSchema>

function LiveFormDemo() {
  const [sent, setSent] = React.useState(false)
  const form = useForm<DemoValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: { email: "", relato: "" },
  })
  const errors = form.formState.errors

  return (
    <DemoPanel>
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(() => setSent(true))}
          className="max-w-md space-y-4"
        >
          {/* ErrorSummary real: submeta vazio para vê-lo aparecer e focar. */}
          {Object.keys(errors).length > 0 ? (
            <div
              role="alert"
              className="border-destructive/40 bg-destructive/5 rounded-lg border p-4"
            >
              <div className="flex items-center gap-2">
                <AlertCircle aria-hidden className="text-destructive size-5" />
                <p className="text-destructive text-sm font-semibold">
                  Encontramos {Object.keys(errors).length}{" "}
                  {Object.keys(errors).length === 1 ? "erro" : "erros"} para corrigir
                </p>
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-8 text-sm">
                {Object.entries(errors).map(([field, err]) => (
                  <li key={field} className="text-destructive">
                    {err?.message as string}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail para devolutivas</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="voce@exemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="relato"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relato</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva a situação com o máximo de detalhes que se sentir confortável."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-3">
            <Button type="submit">Enviar demonstração</Button>
            {sent && Object.keys(errors).length === 0 ? (
              <p className="text-status-completed text-sm font-medium" role="status">
                Validação passou.
              </p>
            ) : null}
          </div>
          <p className="text-muted-foreground text-xs">
            Demo viva: envie vazio para ver as mensagens reais dos schemas (zod) e o
            resumo de erros com <code className="bg-muted rounded px-1 py-0.5">role="alert"</code> (RF-013).
          </p>
        </form>
      </Form>
    </DemoPanel>
  )
}

/* --------------------------------------------------- */
/* Demo: FormStep monta sob demanda (o título rouba o  */
/* foco ao montar — comportamento correto no fluxo)    */
/* --------------------------------------------------- */

function FormStepDemo() {
  const [mounted, setMounted] = React.useState(false)
  return (
    <DemoPanel className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-heading text-sm font-semibold">FormStep + FormNavigation</p>
        <Button variant="outline" size="sm" onClick={() => setMounted((m) => !m)}>
          {mounted ? "Desmontar" : "Montar etapa"}
        </Button>
      </div>
      {mounted ? (
        <div className="rounded-lg border p-5">
          <FormStep
            title="Sobre a manifestação"
            description="Conte o que aconteceu. Você pode revisar tudo antes de enviar."
          >
            <p className="text-muted-foreground text-sm">
              (conteúdo da etapa entra aqui)
            </p>
            <FormNavigation
              nextLabel="Continuar para o relato"
              onBack={() => setMounted(false)}
              isSubmit={false}
              onNext={() => {}}
            />
          </FormStep>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          Montar a etapa demonstra o foco automático no título (RF-006) — por isso a
          demo não monta junto com a página.
        </p>
      )}
    </DemoPanel>
  )
}

/* --------- Demo: BlurFade (adaptado de Magic UI) com replay --------- */

function BlurFadeDemo() {
  const [key, setKey] = React.useState(0)
  return (
    <DemoPanel className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-heading text-sm font-semibold">BlurFade</p>
        <Button variant="outline" size="sm" onClick={() => setKey((k) => k + 1)}>
          <RotateCcw aria-hidden className="size-3.5" />
          Repetir
        </Button>
      </div>
      <div key={key} className="grid gap-3 sm:grid-cols-3">
        {["Sigilo", "Anonimato", "Não retaliação"].map((label, i) => (
          <BlurFade key={label} delay={i * 0.06}>
            <div className="bg-muted/60 rounded-lg border p-4 text-sm">{label}</div>
          </BlurFade>
        ))}
      </div>
      <p className="text-muted-foreground text-xs">
        Fade + blur 4px + 6px de deslocamento em 260ms, stagger de 60ms. Uso: entradas
        raras (hero, sucesso, ilustrações) — com reduced-motion vira fade puro.
      </p>
    </DemoPanel>
  )
}

/* ------------------- dados fake para singletons ------------------- */

const demoResult = {
  protocol: "OUV-2026-004217",
  accessCode: "K7QM-3XWD-92RF",
  submittedAt: "2026-07-21T14:32:00.000Z",
}

const demoEvents: TrackingEvent[] = [
  {
    kind: "status",
    status: "recebida",
    title: "Manifestação recebida",
    description: "Sua manifestação foi registrada e está na fila de triagem do Comitê.",
    date: "2026-07-01T09:00:00.000Z",
  },
  {
    kind: "status",
    status: "em_analise",
    title: "Análise iniciada",
    description: "O Comitê de Ética está analisando as informações da sua manifestação.",
    date: "2026-07-04T11:20:00.000Z",
  },
  {
    kind: "request",
    title: "Pedido de complemento",
    description: "O Comitê solicitou informações complementares. Verifique as devolutivas.",
    date: "2026-07-10T16:05:00.000Z",
  },
]

const statuses = Object.keys(statusConfig) as ManifestationStatus[]

/* ------------------------------- página ------------------------------- */

export default function ComponentsPage() {
  const [stepIndex, setStepIndex] = React.useState(2)

  return (
    <>
      <PageHeader
        eyebrow="Componentes"
        title="Componentes"
        lede="Mapa dos componentes que o portal mais usa, por função — com contagem real de uso (censo de imports) e demos vivas. Frequência baixa não é importância baixa: os singletons do registro cobrem requisitos inteiros."
      />

      {/* ============ 1. AÇÕES ============ */}
      <GuideSection
        title="Ações — Button"
        description="O componente mais usado do portal. O primário é o único elemento laranja da tela; asChild encaixa o <Link> do router."
      >
        <UsageMeta files="11 arquivos" where="todas as rotas" />
        <DemoPanel className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg">
              Registrar manifestação
              <ArrowRight aria-hidden className="size-4" />
            </Button>
            <Button size="lg" variant="outline">
              Acompanhar manifestação
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button size="sm" variant="outline">
              sm
            </Button>
            <Button size="icon" variant="outline" aria-label="Exemplo de botão de ícone">
              <ArrowRight aria-hidden />
            </Button>
          </div>
        </DemoPanel>
      </GuideSection>

      {/* ============ 2. FORMULÁRIO ============ */}
      <GuideSection
        title="Formulário — o padrão RHF + zod"
        description="A espinha dorsal do registro e do acompanhamento: FormField liga o schema ao campo; FormLabel/FormMessage cuidam de id, aria e erro. Label puro só fora de formulários validados."
      >
        <UsageMeta files="7 arquivos (Form) · 5 (Input) · 4 (Textarea)" where="/registrar, /acompanhar" />
        <LiveFormDemo />
      </GuideSection>

      <GuideSection title="Campos de entrada" description="Specimens dos demais controles usados no registro e no acompanhamento.">
        <DemoPanel className="grid max-w-md gap-5">
          <div className="space-y-2">
            <Label htmlFor="spec-select">Tipo de manifestação</Label>
            <Select>
              <SelectTrigger id="spec-select" className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="denuncia">Denúncia</SelectItem>
                <SelectItem value="reclamacao">Reclamação</SelectItem>
                <SelectItem value="sugestao">Sugestão</SelectItem>
                <SelectItem value="elogio">Elogio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Identificação</legend>
            <RadioGroup defaultValue="anonima" className="gap-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="anonima" id="spec-anon" />
                <Label htmlFor="spec-anon" className="font-normal">
                  Anônima
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="identificada" id="spec-ident" />
                <Label htmlFor="spec-ident" className="font-normal">
                  Identificada
                </Label>
              </div>
            </RadioGroup>
          </fieldset>

          <div className="flex items-start gap-2">
            <Checkbox id="spec-consent" className="mt-0.5" />
            <Label htmlFor="spec-consent" className="font-normal leading-snug">
              Li e concordo com o tratamento dos dados conforme a LGPD.
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="spec-otp">Código de acesso</Label>
            <InputOTP maxLength={6} id="spec-otp">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </DemoPanel>
      </GuideSection>

      {/* ============ 3. FLUXO DE REGISTRO ============ */}
      <GuideSection
        title="Fluxo de registro"
        description="Os singletons críticos: cada um cobre um requisito (RF-006, RF-010, RF-013). O progresso oficial de formulário é o StepProgress — ui/progress fica reservado."
      >
        <UsageMeta files="StepProgress, FormStep (6), FormNavigation (5), ReviewSection, ProtocolCard" where="/registrar" />
        <div className="space-y-4">
          <DemoPanel className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-heading text-sm font-semibold">StepProgress</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={stepIndex === 0}
                  onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                >
                  Voltar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={stepIndex === 4}
                  onClick={() => setStepIndex((i) => Math.min(4, i + 1))}
                >
                  Avançar
                </Button>
              </div>
            </div>
            <StepProgress currentIndex={stepIndex} />
          </DemoPanel>

          <FormStepDemo />

          <ReviewSection
            title="Sobre a manifestação"
            editHref="/design/componentes"
            rows={[
              { label: "Tipo", value: "Denúncia" },
              { label: "Categoria", value: "Conduta" },
              { label: "Relato", value: "Exemplo de relato registrado no fluxo…" },
            ]}
          />

          <DemoPanel className="space-y-3">
            <p className="font-heading text-sm font-semibold">ProtocolCard</p>
            <ProtocolCard result={demoResult} />
            <p className="text-muted-foreground text-xs">
              Copiar e baixar funcionam de verdade — dados fictícios.
            </p>
          </DemoPanel>
        </div>
      </GuideSection>

      {/* ============ 4. ACOMPANHAMENTO ============ */}
      <GuideSection
        title="Acompanhamento"
        description="Coração de /acompanhar. Cor nunca comunica sozinha: badge tem rótulo, evento tem ícone + tipo textual (RNF-007)."
      >
        <UsageMeta files="StatusBadge, StatusTimeline, Alert" where="/acompanhar" />
        <div className="space-y-4">
          <DemoPanel className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <StatusBadge key={s} status={s} />
            ))}
            <StatusBadge status="recebida" flag="aguardando_informacoes" />
          </DemoPanel>
          <DemoPanel>
            <StatusTimeline events={demoEvents} />
          </DemoPanel>
          <Alert variant="destructive">
            <AlertCircle aria-hidden className="size-4" />
            <AlertTitle>Não encontramos uma manifestação com esses dados.</AlertTitle>
            <AlertDescription>
              Verifique o protocolo e o código de acesso e tente novamente.
            </AlertDescription>
          </Alert>
        </div>
      </GuideSection>

      {/* ============ 5. CONFIANÇA ============ */}
      <GuideSection
        title="Confiança — TrustNotice"
        description="Tão usado quanto o Form (7 arquivos): as mensagens de sigilo, anonimato e não retaliação que sustentam o canal."
      >
        <UsageMeta files="7 arquivos" where="/, /registrar (todas as etapas-chave)" />
        <div className="space-y-3">
          <TrustNotice variant="anonymity" title="Sigilo e possibilidade de anonimato">
            Você pode registrar a manifestação sem informar seu nome. O e-mail será
            usado somente para confirmação e devolutivas do Comitê de Ética.
          </TrustNotice>
          <TrustNotice variant="info" title="Informação">
            Guarde o protocolo e o código de acesso para acompanhar o andamento.
          </TrustNotice>
          <TrustNotice variant="warning" title="Atenção">
            O Comitê solicitou informações complementares. Verifique as devolutivas.
          </TrustNotice>
        </div>
      </GuideSection>

      {/* ============ 6. ESTRUTURA ============ */}
      <GuideSection
        title="Estrutura — Card"
        description="Borda 1px, radius xl, hover pela borda; tiles de ícone neutros."
      >
        <UsageMeta files="1 arquivo (home) — padrão-base das seções" where="/" />
        <Card className="hover:border-foreground/20 max-w-sm transition-colors duration-[var(--motion-fast)]">
          <CardHeader>
            <IconTile>
              <Lock aria-hidden strokeWidth={1.75} />
            </IconTile>
            <CardTitle className="mt-1">Sigilo</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            O conteúdo da manifestação é acessado somente pelo Comitê de Ética, sob
            dever de confidencialidade.
          </CardContent>
        </Card>
      </GuideSection>

      {/* ============ 7. PADRÕES PROMOVIDOS ============ */}
      <GuideSection
        title="Padrões promovidos a componente"
        description="O censo achou 3–5 cópias inline de cada um destes, com pequenas divergências. Agora são primitivos em ui/ — adotados pelo portal no repasse."
      >
        <div className="space-y-4">
          <DemoPanel className="space-y-3">
            <Eyebrow>Pitang · Canal oficial</Eyebrow>
            <p className="text-muted-foreground text-xs">
              <code className="bg-muted rounded px-1 py-0.5">Eyebrow</code> — era 5
              cópias inline; neutro por padrão (o laranja saiu dos rótulos).
            </p>
          </DemoPanel>
          <DemoPanel className="space-y-3">
            <div className="flex gap-3">
              <IconTile>
                <Lock aria-hidden strokeWidth={1.75} />
              </IconTile>
              <IconTile>
                <EyeOff aria-hidden strokeWidth={1.75} />
              </IconTile>
              <IconTile>
                <ShieldCheck aria-hidden strokeWidth={1.75} />
              </IconTile>
              <IconTile size="sm">
                <Mail aria-hidden strokeWidth={1.75} />
              </IconTile>
            </div>
            <p className="text-muted-foreground text-xs">
              <code className="bg-muted rounded px-1 py-0.5">IconTile</code> — era 5
              cópias com radius divergindo (lg/md/full); agora um só sistema.
            </p>
          </DemoPanel>
          <DemoPanel className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {["Colaboradores", "Ex-colaboradores", "Candidatos", "Fornecedores"].map(
                (c) => (
                  <Chip key={c}>{c}</Chip>
                )
              )}
            </div>
            <p className="text-muted-foreground text-xs">
              <code className="bg-muted rounded px-1 py-0.5">Chip</code> — cantos
              contidos; pill fica só no StatusBadge.
            </p>
          </DemoPanel>
          <DemoPanel className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <ContactLink href="mailto:ouvidoria@pitang.com" icon={Mail}>
                ouvidoria@pitang.com
              </ContactLink>
            </div>
            <p className="text-muted-foreground text-xs">
              <code className="bg-muted rounded px-1 py-0.5">ContactLink</code> — home e
              footer duplicavam a mesma âncora com tile; agora é um componente
              (<code className="bg-muted rounded px-1 py-0.5">public/contact-link.tsx</code>),
              sempre com IconTile neutro.
            </p>
          </DemoPanel>
          <DemoPanel className="space-y-3">
            <RadioGroup defaultValue="anonimo" className="max-w-md gap-3">
              <RadioCard
                value="anonimo"
                title="Anônima"
                description="Sem informar seu nome. O e-mail é usado somente para as devolutivas."
              />
              <RadioCard
                value="identificado"
                title="Identificada"
                description="Com seu nome e contato, mantidos sob sigilo do Comitê de Ética."
              />
            </RadioGroup>
            <p className="text-muted-foreground text-xs">
              <code className="bg-muted rounded px-1 py-0.5">RadioCard</code> — o cartão
              selecionável via <code className="bg-muted rounded px-1 py-0.5">:has()</code> da
              etapa de identificação, promovido a{" "}
              <code className="bg-muted rounded px-1 py-0.5">forms/radio-card.tsx</code>. O
              laranja aqui é estado selecionado — uso permitido.
            </p>
          </DemoPanel>
        </div>
      </GuideSection>

      {/* ============ 8. ADAPTADOS DA COMUNIDADE ============ */}
      <GuideSection
        title="Adaptados da comunidade (open source)"
        description="Mapeamento de magicui.design, fancycomponents.dev e torph.lochie.me (todos MIT). Cada candidato passou pelo filtro de motion do guia — a maioria foi rejeitada de propósito; o que entrou foi reescrito sobre os nossos tokens."
      >
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b text-left">
                <th className="px-4 py-2 text-xs font-semibold">Fonte (MIT)</th>
                <th className="px-4 py-2 text-xs font-semibold">Adotado</th>
                <th className="px-4 py-2 text-xs font-semibold">Rejeitado — motivo</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  src: "Magic UI",
                  adopted: "BlurFade · NumberTicker",
                  rejected:
                    "meteors, sparkles, marquee, efeitos de texto — decoração em elementos frequentes viola o filtro",
                },
                {
                  src: "Fancy Components",
                  adopted: "sublinhado center-out (reescrito em CSS puro)",
                  rejected:
                    "typewriter, scramble, letter-swap — registro lúdico demais para uma ouvidoria",
                },
                {
                  src: "torph",
                  adopted: "—",
                  rejected:
                    "TextMorph avaliado: morphing é deleite sem propósito nomeável no portal; reavaliar no admin",
                },
              ].map((row) => (
                <tr key={row.src} className="border-b align-top last:border-0">
                  <td className="px-4 py-2.5 text-xs font-medium whitespace-nowrap">{row.src}</td>
                  <td className="px-4 py-2.5 text-xs">{row.adopted}</td>
                  <td className="text-muted-foreground px-4 py-2.5 text-xs">{row.rejected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BlurFadeDemo />

        <DemoPanel className="space-y-3">
          <p className="font-heading text-sm font-semibold">NumberTicker</p>
          <p className="font-heading text-4xl font-semibold">
            <NumberTicker value={1284} />
          </p>
          <p className="text-muted-foreground text-xs">
            Contagem com spring (sem overshoot), formatação{" "}
            <code className="bg-muted rounded px-1 py-0.5">Intl.NumberFormat pt-BR</code> e
            tabular-nums. Reservado às estatísticas do painel admin — no portal público
            não há contagem que justifique (protocolo é identificador, não número).
          </p>
        </DemoPanel>

        <DemoPanel className="space-y-3">
          <p className="font-heading text-sm font-semibold">Sublinhado center-out</p>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="link-underline" onClick={(e) => e.preventDefault()}>
              Acompanhar
            </a>
            <a href="#" className="link-underline" onClick={(e) => e.preventDefault()}>
              FAQ
            </a>
            <a href="#" className="link-underline" onClick={(e) => e.preventDefault()}>
              LGPD
            </a>
          </div>
          <p className="text-muted-foreground text-xs">
            Utility <code className="bg-muted rounded px-1 py-0.5">.link-underline</code> —
            cresce do centro no hover/focus via transform (120ms), atrás de{" "}
            <code className="bg-muted rounded px-1 py-0.5">@media (hover: hover)</code>.
            Adotada no nav do header e no footer; o item de navegação atual mantém o
            sublinhado via{" "}
            <code className="bg-muted rounded px-1 py-0.5">[aria-current="page"]</code>.
          </p>
        </DemoPanel>
      </GuideSection>

      {/* ============ 9. BIBLIOTECAS ============ */}
      <GuideSection
        title="Bibliotecas escolhidas"
        description="Escolhas deliberadas, uma por tarefa — não trocar sem decisão registrada aqui. Alinhadas à lista curada da skill pick-ui-library (Emil Kowalski)."
      >
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <tbody>
              {[
                { task: "Primitivos acessíveis (dialog, select, sheet…)", lib: "Radix UI via shadcn/ui" },
                { task: "Animação com spring, layout e gestos", lib: "motion (Framer Motion)" },
                { task: "Hover e fades simples", lib: "CSS puro — motion não entra aqui" },
                { task: "Toasts", lib: "sonner" },
                { task: "Código de acesso (OTP)", lib: "input-otp" },
                { task: "Ícones", lib: "lucide-react (strokeWidth 1.75 em tiles)" },
                { task: "Componentes animados prontos", lib: "Animate UI (registry shadcn) — com contenção" },
                { task: "Adaptações pontuais (MIT)", lib: "Magic UI (BlurFade, NumberTicker) · Fancy Components (link-underline)" },
              ].map((row) => (
                <tr key={row.task} className="border-b last:border-0">
                  <td className="text-muted-foreground px-4 py-2.5 text-xs">{row.task}</td>
                  <td className="px-4 py-2.5 text-xs font-medium">{row.lib}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GuideSection>
    </>
  )
}
