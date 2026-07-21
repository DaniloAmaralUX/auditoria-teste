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
    description: "Inter única, tracking negativo proporcional ao tamanho.",
    art: (
      <span className="font-heading text-4xl font-semibold tracking-[-0.022em]">Aa</span>
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
    description: "Logo oficial Pitang e a convivência do vermelho com o laranja.",
    art: <img src="/favicon.svg" alt="" aria-hidden className="size-10" />,
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
    text: "O laranja Pitang marca ação e estado: CTAs, links, item ativo, progresso. Nunca decoração.",
  },
  {
    title: "Zero gradientes",
    text: "Superfícies planas. A variação vem do papel, das faixas muted e das bordas 1px.",
  },
  {
    title: "Papel quente",
    text: "Neutros com leve temperatura (à la Notion/Perplexity) harmonizam com o laranja e acalmam a leitura.",
  },
  {
    title: "Geometria precisa",
    text: "Hairlines, crosshairs e numerais (à la Vercel) dão esqueleto ao espaço em branco.",
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
