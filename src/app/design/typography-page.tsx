import { PageHeader, GuideSection, DemoPanel, RuleList } from "./design-ui"

const scale = [
  {
    name: "Display (serif)",
    spec: "36–48px · serif · tracking −0.01em · leading 1.05",
    className: "font-heading text-4xl leading-[1.05] sm:text-5xl",
    sample: "Canal de Ética e Ouvidoria",
  },
  {
    name: "Título de seção (serif)",
    spec: "24px · serif · tracking −0.008em",
    className: "font-heading text-2xl",
    sample: "Nossas garantias",
  },
  {
    name: "Título de card (serif)",
    spec: "16px · serif",
    className: "font-heading text-base",
    sample: "Possibilidade de anonimato",
  },
  {
    name: "Corpo (sans)",
    spec: "16px · Hedvig Sans · leading 1.6",
    className: "text-base leading-relaxed",
    sample:
      "Um canal seguro para registrar manifestações com respeito, sigilo e acompanhamento.",
  },
  {
    name: "Secundário (sans)",
    spec: "14px · muted-foreground",
    className: "text-muted-foreground text-sm leading-relaxed",
    sample: "O conteúdo da manifestação é acessado somente pelo Comitê de Ética.",
  },
  {
    name: "Eyebrow (sans)",
    spec: "12px · caps · tracking +0.08em",
    className:
      "text-muted-foreground text-xs tracking-[0.08em] uppercase",
    sample: "Pitang · Canal oficial",
  },
]

export default function TypographyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fundações"
        title="Tipografia"
        lede="Um par tipográfico à la Midday: Hedvig Letters Serif nos títulos, saudações e hero (a assinatura editorial); Hedvig Letters Sans em todo o resto da interface. Ambas têm peso único (400) — a hierarquia nasce de tamanho, do contraste serif × sans e da cor (foreground × muted-foreground), nunca de negrito."
      />

      <GuideSection title="Escala">
        <div className="space-y-6">
          {scale.map((item) => (
            <DemoPanel key={item.name} className="space-y-2">
              <p className="text-muted-foreground font-mono text-[11px]">
                {item.name} · {item.spec}
              </p>
              <p className={item.className}>{item.sample}</p>
            </DemoPanel>
          ))}
        </div>
      </GuideSection>

      <GuideSection title="Regras">
        <RuleList
          items={[
            { do: true, text: "serif (font-heading) em títulos, saudações e hero; sans no corpo, controles e dados densos." },
            { do: true, text: "hierarquia por tamanho + serif × sans + cor (foreground vs muted-foreground) — o peso é sempre 400." },
            { do: true, text: "text-wrap: balance em títulos e pretty em parágrafos (já no @layer base)." },
            { do: true, text: "tabular-nums em protocolos, contadores e qualquer coluna de dígitos." },
            { do: false, text: "font-semibold/bold para criar hierarquia — com peso único não diferencia; use tamanho, serif ou cor." },
            { do: false, text: "uma terceira família. A voz é o par Hedvig Sans + Serif; nada de fontes ad-hoc." },
          ]}
        />
      </GuideSection>
    </>
  )
}
