import { PageHeader, GuideSection, DemoPanel, RuleList } from "./design-ui"

const scale = [
  {
    name: "Display",
    spec: "36–48px · 600 · tracking −0.022em · leading 1.05",
    className: "font-heading text-4xl leading-[1.05] font-semibold sm:text-5xl",
    sample: "Canal de Ética e Ouvidoria",
  },
  {
    name: "Título de seção",
    spec: "24px · 600 · tracking −0.015em",
    className: "font-heading text-2xl font-semibold",
    sample: "Nossas garantias",
  },
  {
    name: "Título de card",
    spec: "16px · 600 · tracking −0.01em",
    className: "font-heading text-base font-semibold",
    sample: "Possibilidade de anonimato",
  },
  {
    name: "Corpo",
    spec: "16px · 400 · tracking 0 · leading 1.6",
    className: "text-base leading-relaxed",
    sample:
      "Um canal seguro para registrar manifestações com respeito, sigilo e acompanhamento.",
  },
  {
    name: "Secundário",
    spec: "14px · 400 · muted-foreground",
    className: "text-muted-foreground text-sm leading-relaxed",
    sample: "O conteúdo da manifestação é acessado somente pelo Comitê de Ética.",
  },
  {
    name: "Eyebrow",
    spec: "12px · 600 · caps · tracking +0.08em",
    className:
      "text-muted-foreground text-xs font-semibold tracking-[0.08em] uppercase",
    sample: "Pitang · Canal oficial",
  },
]

export default function TypographyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fundações"
        title="Tipografia"
        lede="Uma única família — Inter Variable — para tudo. A hierarquia nasce de tamanho, peso e espaçamento; o tracking é negativo e proporcional ao tamanho (apple-design §15): quanto maior o texto, mais apertado."
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
            { do: true, text: "hierarquia por peso antes de tamanho — semibold dá presença sem ocupar mais espaço." },
            { do: true, text: "text-wrap: balance em títulos e pretty em parágrafos (já no @layer base)." },
            { do: true, text: "tabular-nums em protocolos, contadores e qualquer coluna de dígitos." },
            { do: false, text: "letter-spacing fixo para todos os tamanhos — display sem tracking negativo parece frouxo." },
            { do: false, text: "segunda família tipográfica. A voz é uma só; a variação vem de peso e tamanho." },
          ]}
        />
      </GuideSection>
    </>
  )
}
