import { Lock } from "lucide-react"

import { PageHeader, GuideSection, DemoPanel, RuleList } from "./design-ui"

const radii = [
  { name: "sm", px: "~5px", className: "rounded-sm", use: "chips pequenos" },
  { name: "md", px: "~6px", className: "rounded-md", use: "itens de menu, tags" },
  { name: "lg", px: "8px", className: "rounded-lg", use: "botões, inputs, tiles" },
  { name: "xl", px: "~11px", className: "rounded-xl", use: "cards, painéis" },
  { name: "full", px: "pill", className: "rounded-full", use: "badges de status, progresso" },
]

/** Escala de materiais flutuantes — nomeada à la Vercel/Geist Materials, mas
 *  sobre nossos tokens (superfícies de página seguem flat com borda 1px).
 *  Cada tier é um shadow-material-* declarado em index.css. */
const floatingMaterials = [
  {
    name: "tooltip",
    className: "shadow-material-tooltip",
    lift: "menor lift",
    use: "tooltip: quase colado à origem",
  },
  {
    name: "menu",
    className: "shadow-material-menu",
    lift: "elevação clara",
    use: "select, popover, dropdown-menu",
  },
  {
    name: "modal",
    className: "shadow-material-modal",
    lift: "acima do fluxo",
    use: "dialog, alert-dialog",
  },
  {
    name: "fullscreen",
    className: "shadow-material-fullscreen",
    lift: "maior lift",
    use: "sheet, drawer",
  },
]

export default function MaterialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fundações"
        title="Materiais"
        lede="Superfícies planas separadas por hairlines de 1px. Sombra só onde há elevação real (overlays). A personalidade do espaço em branco vem da serif editorial e dos numerais fantasma — sem cor nem gradiente."
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
          <div className="bg-popover shadow-material-menu rounded-lg p-5">
            <p className="font-heading text-sm font-semibold">Overlay</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Elevação real (dropdown, sheet): material flutuante graduado.
            </p>
          </div>
        </div>
      </GuideSection>

      <GuideSection
        title="Materiais flutuantes"
        description="Alinhado ao Vercel/Geist Materials: quatro tiers de sombra graduada exclusivos para overlays. Cada camada tem uma quantidade de lift proporcional à sua função. Superfícies de página continuam flat com borda 1px — a escala aqui existe só para o que está acima do papel."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {floatingMaterials.map((m) => (
            <div
              key={m.name}
              className={`bg-popover text-popover-foreground rounded-lg p-5 ${m.className}`}
            >
              <p className="font-mono text-xs font-semibold">shadow-material-{m.name}</p>
              <p className="text-muted-foreground mt-2 text-xs">{m.lift}</p>
              <p className="mt-1 text-xs">{m.use}</p>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b text-left">
                <th className="px-4 py-2 text-xs font-semibold">Tier</th>
                <th className="px-4 py-2 text-xs font-semibold">Token</th>
                <th className="px-4 py-2 text-xs font-semibold">Radius</th>
                <th className="px-4 py-2 text-xs font-semibold">Componentes</th>
                <th className="px-4 py-2 text-xs font-semibold">Equivalente no Geist</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["tooltip", "shadow-material-tooltip", "rounded-lg (8)", "tooltip", "material-tooltip (6)"],
                ["menu", "shadow-material-menu", "rounded-lg (8)", "select, popover, dropdown-menu", "material-menu (12)"],
                ["modal", "shadow-material-modal", "rounded-xl (~11)", "dialog, alert-dialog", "material-modal (12)"],
                ["fullscreen", "shadow-material-fullscreen", "—", "sheet, drawer", "material-fullscreen (16)"],
              ].map(([tier, token, radius, comps, geist]) => (
                <tr key={tier} className="border-b last:border-0">
                  <td className="px-4 py-2 font-mono text-xs font-semibold">{tier}</td>
                  <td className="text-muted-foreground px-4 py-2 font-mono text-[11px]">{token}</td>
                  <td className="text-muted-foreground px-4 py-2 font-mono text-[11px]">{radius}</td>
                  <td className="text-muted-foreground px-4 py-2 text-xs">{comps}</td>
                  <td className="text-muted-foreground px-4 py-2 font-mono text-[11px]">{geist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground text-sm">
          Nosso radius base é <span className="text-foreground font-medium">8px</span>{" "}
          (decisão travada), então a progressão 8 → 11 encosta na Geist 6 → 12 → 16 sem
          desalinhar a marca. O <span className="text-foreground font-medium">radius</span>{" "}
          do overlay segue o tipo de superfície (controle vs. card vs. tela cheia), não o
          nível de sombra.
        </p>
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
        title="Numerais fantasma"
        description="O ornamento editorial que sobrevive depois de aposentar o vocabulário blueprint: numeral gigante em cinza-borda que marca uma sequência real — personalidade sem cor nem gradiente."
      >
        <DemoPanel>
          <span
            aria-hidden
            className="font-heading text-6xl leading-none tabular-nums"
            style={{ color: "color-mix(in oklch, var(--foreground) 18%, var(--background))" }}
          >
            2
          </span>
          <p className="font-heading mt-2 text-sm">Numeral fantasma</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Passos de sequência em cinza-borda gigante — personalidade editorial sem
            cor. <span className="text-foreground">Só onde há sequência real</span> (o
            “Como funciona” é um processo de 4 passos); numerar lista sem ordem é
            decoração, não informação.
          </p>
        </DemoPanel>
      </GuideSection>

      <GuideSection title="Regras">
        <RuleList
          items={[
            { do: true, text: "hairline border-y/border-x para estruturar seções e colunas — o esqueleto visível da página." },
            { do: true, text: "escolher o material do overlay pelo papel: tooltip → menu → modal → fullscreen; nunca inventar sombra fora dos 4 tokens." },
            { do: true, text: "estados vazios com EmptyState (ícone + texto + ação), não ilustração." },
            { do: false, text: "sombras em cards de conteúdo — borda 1px resolve em qualquer fundo." },
            { do: false, text: "gradiente ou cor para criar profundidade — a separação é sempre por borda." },
          ]}
        />
      </GuideSection>
    </>
  )
}
