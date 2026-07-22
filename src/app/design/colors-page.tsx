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
  { token: "background", light: "oklch(1 0 0)", bg: "bg-background", note: "Branco puro — o fundo do Midday." },
  { token: "card", light: "oklch(0.972 0.008 90)", bg: "bg-card", note: "Creme quente sutil — superfície de conteúdo, meio passo abaixo do branco." },
  { token: "muted", light: "oklch(0.905 0.008 90)", bg: "bg-muted", note: "Faixas de seção, tiles, estados hover." },
  { token: "border", light: "oklch(0.877 0.004 90)", bg: "bg-border", note: "Hairlines de 1px — o esqueleto da página (border-first)." },
  { token: "foreground", light: "oklch(0.205 0 0)", bg: "bg-foreground", note: "Texto principal — quase-preto neutro." },
  { token: "muted-foreground", light: "oklch(0.515 0 0)", bg: "bg-muted-foreground", note: "Texto secundário (AA ≥ 4.5 sobre branco, card e muted)." },
]

const accents: Swatch[] = [
  { token: "primary", light: "oklch(0.58 0.21 28)", bg: "bg-primary", note: "O vermelho Pitang no degrau AA — texto BRANCO 4.63:1 (a marca pura reprova)." },
  { token: "primary-text", light: "oklch(0.52 0.20 28)", bg: "bg-primary-text", note: "Degrau de texto — links AA ≥ 4.5 até sobre muted." },
  { token: "info", light: "oklch(0.52 0.14 245)", bg: "bg-info", note: "Azul dessaturado — estritamente informacional." },
  { token: "destructive", light: "oklch(0.577 0.245 27)", bg: "bg-destructive", note: "Erros — mesmo matiz da ação, por isso erro NUNCA comunica só por cor (ícone + texto)." },
]

const statuses: Swatch[] = [
  { token: "status-received", light: "oklch(0.54 0.13 245)", bg: "bg-status-received", note: "Recebida" },
  { token: "status-analysis", light: "oklch(0.60 0.11 85)", bg: "bg-status-analysis", note: "Em análise" },
  { token: "status-investigation", light: "oklch(0.52 0.13 300)", bg: "bg-status-investigation", note: "Em apuração" },
  { token: "status-completed", light: "oklch(0.57 0.12 150)", bg: "bg-status-completed", note: "Concluída" },
  { token: "status-archived", light: "oklch(0.55 0 0)", bg: "bg-status-archived", note: "Arquivada — neutro puro" },
  { token: "status-waiting", light: "oklch(0.62 0.10 60)", bg: "bg-status-waiting", note: "Flag: aguardando informações" },
]

export default function ColorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fundações"
        title="Cores"
        lede="Base monocromática do Midday — branco puro, cards creme, quase-preto — com o vermelho Pitang como ÚNICO acento. A marca pura #ED1C24 dá 4.27:1 com branco e reprova; a ação usa oklch(0.58 0.21 28) — visualmente o mesmo vermelho, AA 4.63:1 medido. Links no degrau 0.52 (AA até sobre muted). Status viram dot colorido, nunca fundo preenchido. Todos os pares de texto medidos AA ≥ 4.5 nos dois temas."
      />

      <GuideSection title="Neutros" description="Monocromáticos: branco puro no fundo, um toque de creme quente nos cards. A separação vem de bordas hairline, não de sombra.">
        <SwatchGrid swatches={neutrals} />
      </GuideSection>

      <GuideSection title="Acentos">
        <SwatchGrid swatches={accents} />
      </GuideSection>

      <GuideSection
        title="Status de manifestação"
        description="Workflow do PRD (RF-023). Usados como DOT + rótulo (nunca fundo preenchido); o rótulo fica em foreground. Cor nunca comunica sozinha (RNF-007)."
      >
        <SwatchGrid swatches={statuses} />
      </GuideSection>

      <GuideSection title="Regras de uso">
        <RuleList
          items={[
            { do: true, text: "vermelho em CTAs primários, links, item de navegação ativo, progresso e estados de seleção." },
            { do: true, text: "tudo o que não é ação nem estado é neutro mono (background, card, muted, border, foreground)." },
            { do: true, text: "status como dot + rótulo; o rótulo em foreground, a cor só no ponto." },
            { do: false, text: "vermelho decorativo: fundos de seção, ícones ilustrativos, eyebrows. Se não é ação nem estado, é neutro." },
            { do: false, text: "badge de status com fundo preenchido colorido. E gradientes de qualquer tipo — variação de superfície = card, muted e bordas." },
          ]}
        />
      </GuideSection>
    </>
  )
}
