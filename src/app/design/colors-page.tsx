import { cn } from "@/lib/utils"
import { PageHeader, GuideSection, RuleList } from "./design-ui"

type Swatch = {
  token: string
  light: string
  note?: string
  /** Classe de fundo (mapeada no @theme). */
  bg: string
  /** Amostra de texto clara sobre a cor. */
  lightText?: boolean
}

function SwatchGrid({ swatches }: { swatches: Swatch[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {swatches.map((s) => (
        <div key={s.token} className="bg-card overflow-hidden rounded-lg border">
          <div className={cn("h-14 border-b", s.bg)} />
          <div className="space-y-0.5 p-3">
            <p className="font-mono text-xs font-semibold">--{s.token}</p>
            <p className="text-muted-foreground font-mono text-[11px]">{s.light}</p>
            {s.note ? <p className="text-muted-foreground text-xs">{s.note}</p> : null}
          </div>
        </div>
      ))}
    </div>
  )
}

const neutrals: Swatch[] = [
  { token: "background", light: "oklch(0.9818 0.0054 95.1)", bg: "bg-background", note: "O papel. Fundo de página." },
  { token: "card", light: "oklch(0.9665 0.0067 97.35)", bg: "bg-card", note: "Superfície de conteúdo — meio passo abaixo do papel (à la Claude)." },
  { token: "muted", light: "oklch(0.9341 0.0153 90.24)", bg: "bg-muted", note: "Faixas de seção, tiles, estados hover." },
  { token: "border", light: "oklch(0.8847 0.0069 97.36)", bg: "bg-border", note: "Hairlines de 1px — o esqueleto da página." },
  { token: "foreground", light: "oklch(0.3438 0.0269 95.72)", bg: "bg-foreground", note: "Texto principal, marrom-grafite quente." },
  { token: "muted-foreground", light: "oklch(0.5341 0.0078 97.45)", bg: "bg-muted-foreground", note: "Texto secundário (AA sobre papel e muted)." },
]

const accents: Swatch[] = [
  { token: "primary", light: "oklch(0.732 0.185 55)", bg: "bg-primary", note: "Laranja Pitang — o único acento de ação." },
  { token: "primary-text", light: "oklch(0.52 0.15 50)", bg: "bg-primary-text", note: "Laranja aprofundado para links e texto (AA ≥ 4.5:1)." },
  { token: "info", light: "oklch(0.55 0.15 245)", bg: "bg-info", note: "Azul Pitang — estritamente informacional." },
  { token: "destructive", light: "oklch(0.577 0.245 27)", bg: "bg-destructive", note: "Vermelho — destrutivo e erros. Compartilha o matiz da marca." },
]

const statuses: Swatch[] = [
  { token: "status-received", light: "oklch(0.55 0.15 245)", bg: "bg-status-received", note: "Recebida" },
  { token: "status-analysis", light: "oklch(0.62 0.14 90)", bg: "bg-status-analysis", note: "Em análise" },
  { token: "status-investigation", light: "oklch(0.55 0.16 300)", bg: "bg-status-investigation", note: "Em apuração" },
  { token: "status-completed", light: "oklch(0.6 0.15 150)", bg: "bg-status-completed", note: "Concluída" },
  { token: "status-archived", light: "oklch(0.5 0.008 75)", bg: "bg-status-archived", note: "Arquivada" },
  { token: "status-waiting", light: "oklch(0.65 0.13 60)", bg: "bg-status-waiting", note: "Flag: aguardando informações" },
]

export default function ColorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fundações"
        title="Cores"
        lede="Neutros papel âmbar quente (hue ~90–106) adaptados do tema Claude + (tweakcn) — só a paleta; radius, tipografia e materiais permanecem nossos. O laranja Pitang segue como único acento de ação. Valores em oklch, com par completo claro/escuro — alterne o tema para auditar."
      />

      <GuideSection title="Neutros" description="A temperatura quente é sutil de propósito: percebe-se o conforto, não a cor.">
        <SwatchGrid swatches={neutrals} />
      </GuideSection>

      <GuideSection title="Acentos">
        <SwatchGrid swatches={accents} />
      </GuideSection>

      <GuideSection
        title="Status de manifestação"
        description="Workflow do PRD (RF-023). Cor nunca comunica sozinha — sempre acompanhada de rótulo (RNF-007)."
      >
        <SwatchGrid swatches={statuses} />
      </GuideSection>

      <GuideSection title="Regras de uso">
        <RuleList
          items={[
            { do: true, text: "laranja em CTAs primários, links, item de navegação ativo, progresso e estados de seleção." },
            { do: true, text: "tiles de ícone e ornamentos em neutros (muted, border) — a página inteira sustenta o acento." },
            { do: false, text: "laranja decorativo: fundos de seção, ícones ilustrativos, eyebrows. Se não é ação nem estado, é neutro." },
            { do: false, text: "vermelho fora da marca e do destructive — nunca como acento de interface." },
            { do: false, text: "gradientes de qualquer tipo. Variação de superfície = papel, muted e bordas." },
          ]}
        />
      </GuideSection>
    </>
  )
}
