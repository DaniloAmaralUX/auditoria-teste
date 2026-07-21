import { Lock } from "lucide-react"

import { PageHeader, GuideSection, DemoPanel, RuleList } from "./design-ui"

const radii = [
  { name: "sm", px: "~5px", className: "rounded-sm", use: "chips pequenos" },
  { name: "md", px: "~6px", className: "rounded-md", use: "itens de menu, tags" },
  { name: "lg", px: "8px", className: "rounded-lg", use: "botões, inputs, tiles" },
  { name: "xl", px: "~11px", className: "rounded-xl", use: "cards, painéis" },
  { name: "full", px: "pill", className: "rounded-full", use: "badges de status, progresso" },
]

export default function MaterialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fundações"
        title="Materiais"
        lede="Superfícies planas separadas por hairlines de 1px. Sombra só onde há elevação real (overlays). Os ornamentos são geométricos e flat — dão personalidade ao espaço em branco sem cor nem gradiente."
      />

      <GuideSection title="Radius" description="Base 8px (--radius: 0.5rem). Cantos contidos: sério sem ser rígido.">
        <div className="flex flex-wrap items-end gap-4">
          {radii.map((r) => (
            <div key={r.name} className="space-y-2 text-center">
              <div
                className={`bg-card mx-auto size-16 border ${r.className}`}
                aria-hidden
              />
              <p className="font-mono text-xs font-semibold">{r.name}</p>
              <p className="text-muted-foreground text-[11px]">
                {r.px}
                <br />
                {r.use}
              </p>
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection
        title="Bordas vs. sombras"
        description="Cards em fluxo usam borda 1px plana (à la Vercel/Notion); o hover escurece a borda. Sombras ficam reservadas a overlays — select, sheet, popover — onde há elevação de verdade."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-card hover:border-foreground/20 rounded-xl border p-5 transition-colors duration-[var(--motion-fast)]">
            <p className="font-heading text-sm font-semibold">Card em fluxo</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Borda 1px. Passe o mouse: o hover é a borda escurecendo, não sombra.
            </p>
          </div>
          <div className="bg-popover rounded-lg p-5 shadow-2xl ring-1 ring-foreground/5">
            <p className="font-heading text-sm font-semibold">Overlay</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Elevação real (dropdown, sheet): sombra profunda + anel sutil.
            </p>
          </div>
        </div>
      </GuideSection>

      <GuideSection
        title="Superfícies"
        description="Três níveis bastam: papel (página), card (conteúdo) e muted (faixas de seção, tiles). Separação sempre por borda, nunca por gradiente."
      >
        <div className="overflow-hidden rounded-xl border">
          <div className="bg-background p-4">
            <p className="font-mono text-xs">background — o papel</p>
            <div className="bg-card mt-3 rounded-lg border p-4">
              <p className="font-mono text-xs">card — conteúdo</p>
              <div className="bg-muted mt-3 flex size-9 items-center justify-center rounded-lg border">
                <Lock aria-hidden className="size-4" strokeWidth={1.75} />
              </div>
            </div>
          </div>
          <div className="bg-muted/40 border-t p-4">
            <p className="font-mono text-xs">muted/40 — faixa de seção</p>
          </div>
        </div>
      </GuideSection>

      <GuideSection
        title="Ornamentos flat"
        description="O vocabulário de personalidade: crosshairs nos cantos de seções-quadro, dot-grid recortado em painéis com borda, numerais fantasma em sequências."
      >
        <div className="space-y-8">
          <div className="corner-marks border-y">
            <div className="p-6">
              <p className="font-mono text-xs font-semibold">.corner-marks</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Seção-quadro com “+” nos cantos — o detalhe de engenharia, em cor de borda.
              </p>
            </div>
          </div>
          <DemoPanel className="dot-grid overflow-hidden">
            <p className="font-mono text-xs font-semibold">.dot-grid</p>
            <p className="text-muted-foreground mt-1 max-w-sm text-sm">
              Grade de pontos flat, sem mask de fade — sempre recortada por um painel
              com borda (hard edges).
            </p>
          </DemoPanel>
          <DemoPanel>
            <span
              aria-hidden
              className="font-heading text-6xl leading-none font-semibold tabular-nums"
              style={{ color: "color-mix(in oklch, var(--foreground) 18%, var(--background))" }}
            >
              2
            </span>
            <p className="font-heading mt-2 text-sm font-semibold">Numeral fantasma</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Passos de sequência em cinza-borda gigante — personalidade editorial sem
              cor. <span className="text-foreground font-medium">Só onde há sequência
              real</span> (o “Como funciona” é um processo de 4 passos); numerar lista
              sem ordem é decoração, não informação.
            </p>
          </DemoPanel>
        </div>
      </GuideSection>

      <GuideSection title="Regras">
        <RuleList
          items={[
            { do: true, text: "hairline border-y/border-x para estruturar seções e colunas — o esqueleto visível da página." },
            { do: false, text: "sombras em cards de conteúdo — borda 1px resolve em qualquer fundo." },
            { do: false, text: "dot-grid solto no fundo da página ou com fade — sempre dentro de painel com borda." },
          ]}
        />
      </GuideSection>
    </>
  )
}
