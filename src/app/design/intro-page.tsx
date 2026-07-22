import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { PageHeader, GuideSection } from "./design-ui"

const foundationCards = [
  {
    to: "/design/cores",
    title: "Cores",
    description: "Papel quente, laranja como único acento de ação.",
    art: (
      <div className="flex gap-1.5">
        <span className="bg-background size-8 rounded-md border" />
        <span className="bg-muted size-8 rounded-md border" />
        <span className="bg-foreground size-8 rounded-md" />
        <span className="bg-primary size-8 rounded-md" />
      </div>
    ),
  },
  {
    to: "/design/tipografia",
    title: "Tipografia",
    description: "Par Hedvig Letters: serif no display, sans na interface.",
    art: (
      <span className="font-heading text-4xl">Aa</span>
    ),
  },
  {
    to: "/design/materiais",
    title: "Materiais",
    description: "Bordas 1px, radius contido, ornamentos geométricos flat.",
    art: (
      <div className="dot-grid bg-background flex size-14 items-center justify-center rounded-lg border">
        <span className="bg-card size-6 rounded-md border" />
      </div>
    ),
  },
  {
    to: "/design/marca",
    title: "Marca",
    description: "Logo oficial Pitang, sempre vermelha, sobre a base monocromática.",
    art: <img src="/favicon.svg" alt="" aria-hidden width={40} height={40} className="size-10" />,
  },
  {
    to: "/design/motion",
    title: "Motion",
    description: "Rápido, sem overshoot, com resposta no pointer-down.",
    art: (
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="bg-border size-2 rounded-full" />
        <span className="bg-border size-2 rounded-full" />
        <span className="bg-primary size-2 rounded-full" />
      </div>
    ),
  },
  {
    to: "/design/componentes",
    title: "Componentes",
    description: "Primitivos shadcn/Radix calibrados pela direção.",
    art: (
      <span className="bg-primary text-primary-foreground pointer-events-none inline-flex h-8 items-center rounded-lg px-3 text-xs font-medium">
        Registrar
      </span>
    ),
  },
]

const principles = [
  {
    title: "Elegância por contenção",
    text: "Hierarquia por tipografia e espaçamento, não por cor. O que não precisa existir, não existe.",
  },
  {
    title: "Um acento só",
    text: "O vermelho Pitang marca ação e estado: CTAs, links, item ativo, progresso. Nunca decoração.",
  },
  {
    title: "Zero gradientes",
    text: "Superfícies planas. A variação vem do card creme, das faixas muted e das bordas 1px.",
  },
  {
    title: "Base monocromática",
    text: "Branco puro, cards creme, quase-preto (à la Midday). O único matiz é o vermelho da ação.",
  },
  {
    title: "Serif editorial",
    text: "Hedvig Serif nas saudações, títulos e hero; muito whitespace; tabelas hairline. É a assinatura.",
  },
  {
    title: "Confiança em primeiro lugar",
    text: "É um canal de ouvidoria: sobriedade, sigilo e clareza vêm antes de personalidade.",
  },
]

export default function IntroPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pitang · Ouvidoria"
        title="Direção visual"
        lede="O guia de design do Canal de Ética e Ouvidoria Pitang. Um sistema enxuto — tokens, materiais, marca e componentes — que documenta a si mesmo: tudo aqui renderiza o código real do portal."
      />

      <GuideSection title="Fundações">
        <div className="grid gap-4 sm:grid-cols-2">
          {foundationCards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group bg-card hover:border-foreground/20 focus-visible:ring-ring rounded-xl border transition-colors duration-[var(--motion-fast)] outline-none focus-visible:ring-2"
            >
              <div className="bg-muted/40 border-border flex h-28 items-center justify-center rounded-t-lg border-b">
                {card.art}
              </div>
              <div className="space-y-1 p-4">
                <p className="font-heading text-sm font-semibold">{card.title}</p>
                <p className="text-muted-foreground text-sm">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </GuideSection>

      <GuideSection
        title="Assinatura"
        description="Todo sistema memorável tem um elemento que é só dele. O nosso: o esqueleto hairline com crosshairs — a coluna central emoldurada por bordas de 1px, com marcas “+” nos encontros. A página se lê como um documento técnico de engenharia: preciso, auditável, confiável."
      >
        <div className="corner-marks border-y">
          <div className="mx-6 border-x px-6 py-8">
            <p className="font-heading text-sm font-semibold">A estrutura é visível</p>
            <p className="text-muted-foreground mt-1 max-w-prose text-sm">
              O branco deixa de ser vazio quando o esqueleto aparece. Este é o único
              ornamento que se repete em todas as páginas — todo o resto fica quieto
              ao redor dele.
            </p>
          </div>
        </div>
      </GuideSection>

      <GuideSection
        title="Princípios"
        description="Síntese das referências (Notion, Perplexity, Vercel/Geist) e da skill apple-design, aplicada ao caso de uso de uma ouvidoria."
      >
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="space-y-1">
              <dt className="font-heading text-sm font-semibold">{p.title}</dt>
              <dd className="text-muted-foreground text-sm">{p.text}</dd>
            </div>
          ))}
        </dl>
      </GuideSection>

      <GuideSection
        title="Como evoluir este sistema"
        description="Processo da skill frontend-design (.agents/skills/frontend-design), transcrito em regras operacionais para qualquer pessoa — ou agente — que for estender o design."
      >
        <ol className="space-y-4">
          {[
            {
              title: "Duas passadas, sempre",
              text: "Antes de escrever código, escreva o plano: tokens de cor, papéis tipográficos, conceito de layout e onde entra a assinatura. Só depois construa — derivando cada decisão do plano.",
            },
            {
              title: "Autocrítica anti-default",
              text: "Se a escolha serviria para qualquer projeto parecido, ela não serve para este. Papel quente + laranja aqui não é o default de IA: é a marca Pitang, decidida pelo designer — mas cada escolha nova precisa passar pelo mesmo teste.",
            },
            {
              title: "A regra de Chanel",
              text: "Antes de publicar, olhe no espelho e remova um acessório. A boldness mora num lugar só (a assinatura); todo o resto fica disciplinado.",
            },
            {
              title: "Piso de qualidade, sem anúncio",
              text: "Responsivo até mobile, foco de teclado visível, reduced-motion respeitado, contraste AA. Não é feature — é o chão.",
            },
          ].map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span
                aria-hidden
                className="font-heading text-3xl leading-none font-semibold tabular-nums"
                style={{
                  color:
                    "color-mix(in oklch, var(--foreground) 18%, var(--background))",
                }}
              >
                {i + 1}
              </span>
              <div className="space-y-0.5 pt-0.5">
                <p className="font-heading text-sm font-semibold">{step.title}</p>
                <p className="text-muted-foreground text-sm">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-muted-foreground text-sm">
          <span className="text-foreground font-medium">Caixa de ferramentas</span>{" "}
          (skills versionadas ou de referência): <code className="bg-muted rounded px-1 py-0.5 text-xs">frontend-design</code>{" "}
          conduz direção e brief; <code className="bg-muted rounded px-1 py-0.5 text-xs">apple-design</code> e{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">emil-design-eng</code> são
          a referência de motion e polish; <code className="bg-muted rounded px-1 py-0.5 text-xs">find-animation-opportunities</code>{" "}
          acha onde motion agrega (e rejeita o resto); <code className="bg-muted rounded px-1 py-0.5 text-xs">review-animations</code>{" "}
          roda antes de mergear qualquer animação.
        </p>
      </GuideSection>

      <GuideSection
        title="Piso de interface"
        description="Consolidado das Web Interface Guidelines (Vercel) — o que já está garantido na base e vale para tudo que for construído. Auditoria completa: skills web-design-guidelines e writing-guidelines (vercel-labs/agent-skills)."
      >
        <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {[
            { t: "Tema de verdade", d: "color-scheme acompanha o tema (scrollbars e controles nativos); theme-color no index.html." },
            { t: "Toque sem atraso", d: "touch-action: manipulation nos interativos; tap-highlight nativo desligado — o feedback é o press scale." },
            { t: "Teclado primeiro", d: "skip link em todos os shells, foco visível via focus-visible, foco movido em erro/etapa." },
            { t: "Overlays contidos", d: "sheets com overscroll-behavior: contain e rolagem própria." },
            { t: "Formulários honestos", d: "type/autocomplete corretos, labels clicáveis, erro inline + resumo com role=alert, nunca bloquear colar." },
            { t: "Conteúdo resiliente", d: "textos longos com break-words/truncate, estados vazios desenhados, imagens com width/height (sem CLS)." },
          ].map((item) => (
            <div key={item.t} className="space-y-1">
              <dt className="font-heading text-sm font-semibold">{item.t}</dt>
              <dd className="text-muted-foreground text-sm">{item.d}</dd>
            </div>
          ))}
        </dl>
      </GuideSection>

      <GuideSection title="Como usar">
        <p className="text-muted-foreground max-w-prose text-sm">
          Este guia vive na branch <code className="bg-muted rounded px-1.5 py-0.5 text-xs">direcao-visual</code> e
          é o checkpoint de validação antes de qualquer mudança chegar ao portal.
          Alterne o tema pelo botão da sidebar (ou tecla <kbd className="bg-muted rounded border px-1.5 py-0.5 text-xs">D</kbd>)
          — cada página deve funcionar igualmente bem em claro e escuro.
        </p>
        <Button asChild variant="outline" size="sm">
          <Link to="/">Ver o portal público</Link>
        </Button>
      </GuideSection>
    </>
  )
}
