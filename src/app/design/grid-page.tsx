import { Grid, GridCell, GridCross } from "@/components/ui/grid"
import { PageHeader, GuideSection, RuleList } from "./design-ui"

/** Célula numerada dos exemplos (padrão da página do Geist). */
function Numbered({ n }: { n: number }) {
  return <span className="text-muted-foreground font-mono text-xs tabular-nums">{n}</span>
}

export default function GridPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fundações"
        title="Grid"
        lede="Exiba elementos em um layout de grade. Réplica do Grid do Geist (vercel.com/geist/grid) sobre os nossos tokens — é a formalização da assinatura do sistema: o esqueleto hairline com crosshairs."
      />

      <GuideSection
        title="Grade vazia"
        description="Só a estrutura de guias — 3 colunas por 2 linhas. As guias são decorativas (aria-hidden) e ficam abaixo das células."
      >
        <Grid columns={3} rows={2} className="h-40" />
      </GuideSection>

      <GuideSection
        title="Grade básica"
        description="Seis células numeradas em fluxo automático num 3×2."
      >
        <Grid columns={3} rows={2}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <GridCell key={n}>
              <Numbered n={n} />
            </GridCell>
          ))}
        </Grid>
      </GuideSection>

      <GuideSection
        title="Células sólidas"
        description="solid dá fundo à célula e oculta as guias que passam por baixo — inclusive quando a célula ocupa mais de uma coluna ou linha."
      >
        <Grid columns={3} rows={2}>
          <GridCell solid column="1 / 3" className="border-r border-b">
            <span className="text-sm">solid · 2 colunas</span>
          </GridCell>
          <GridCell>
            <Numbered n={3} />
          </GridCell>
          <GridCell>
            <Numbered n={4} />
          </GridCell>
          <GridCell solid column="2 / 4" className="border-t border-l">
            <span className="text-sm">solid · 2 colunas</span>
          </GridCell>
        </Grid>
      </GuideSection>

      <GuideSection
        title="Grade responsiva"
        description="columns e rows aceitam número ou objeto por breakpoint: aqui 1×6 no sm, 2×3 no md e 3×2 no lg — redimensione a janela."
      >
        <Grid columns={{ sm: 1, md: 2, lg: 3 }} rows={{ sm: 6, md: 3, lg: 2 }}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <GridCell key={n}>
              <Numbered n={n} />
            </GridCell>
          ))}
        </Grid>
      </GuideSection>

      <GuideSection
        title="Guias ocultas"
        description='hideGuides="row" remove as horizontais; hideGuides="column", as verticais.'
      >
        <div className="space-y-4">
          <Grid columns={3} rows={2} hideGuides="row" className="h-32" />
          <Grid columns={3} rows={2} hideGuides="column" className="h-32" />
        </div>
      </GuideSection>

      <GuideSection
        title="Sobreposição de células"
        description="Células podem ocupar espaços que se cruzam; a sólida oculta as guias, a transparente deixa a estrutura aparecer."
      >
        <Grid columns={4} rows={3} className="h-56">
          <GridCell column="1 / 3" row="1 / 3" className="border-r border-b">
            <span className="text-muted-foreground text-xs">transparente · 2×2</span>
          </GridCell>
          <GridCell solid column="3 / 5" row="2 / 4" className="border-t border-l">
            <span className="text-sm">solid · 2×2</span>
          </GridCell>
        </Grid>
      </GuideSection>

      <GuideSection
        title="Cruzes"
        description="GridCross marca interseções específicas — o “+” fica no cruzamento superior-esquerdo da célula [column, row] indicada."
      >
        <Grid columns={3} rows={2} className="h-40">
          <GridCross column={2} row={1} />
          <GridCross column={3} row={2} />
          <GridCross column={2} row={2} />
        </Grid>
      </GuideSection>

      <GuideSection
        title="Guias tracejadas"
        description="dashedGuides troca as guias internas por tracejado — a moldura externa permanece sólida. Combina com cruzes."
      >
        <Grid columns={4} rows={2} dashedGuides className="h-40">
          <GridCross column={2} row={1} />
          <GridCross column={3} row={2} />
          <GridCross column={4} row={2} />
        </Grid>
      </GuideSection>

      <GuideSection title="Propriedades">
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b text-left">
                <th className="px-4 py-2 text-xs font-semibold">Componente</th>
                <th className="px-4 py-2 text-xs font-semibold">Prop</th>
                <th className="px-4 py-2 text-xs font-semibold">Tipo</th>
                <th className="px-4 py-2 text-xs font-semibold">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Grid", "columns / rows", "number | { sm, md, lg }", "dimensões da grade, fixas ou por breakpoint"],
                ["Grid", "dashedGuides", "boolean", "guias internas tracejadas"],
                ["Grid", "hideGuides", '"row" | "column"', "oculta as guias de uma direção"],
                ["GridCell", "column / row", "grid-column / grid-row", 'posição e span (ex.: "1 / 3")'],
                ["GridCell", "solid", "boolean", "fundo sólido que oculta as guias por baixo"],
                ["GridCross", "column / row", "number", "interseção a marcar com o “+”"],
              ].map(([comp, prop, type, desc]) => (
                <tr key={`${comp}-${prop}`} className="border-b last:border-0">
                  <td className="px-4 py-2 font-mono text-xs">{comp}</td>
                  <td className="px-4 py-2 font-mono text-xs font-semibold">{prop}</td>
                  <td className="text-muted-foreground px-4 py-2 font-mono text-[11px]">{type}</td>
                  <td className="text-muted-foreground px-4 py-2 text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GuideSection>

      <GuideSection title="Boas práticas">
        <RuleList
          items={[
            { do: true, text: "usar em seções-quadro editoriais: home, quadros do guia, momentos de destaque — onde a estrutura visível é a assinatura." },
            { do: true, text: "guias sempre decorativas (aria-hidden); o conteúdo das células segue a ordem natural de foco." },
            { do: false, text: "usar como grid de conteúdo comum (listas de cards, formulários) — para isso, grid/flex do Tailwind, sem guias." },
            { do: false, text: "cruzes em toda interseção — marque poucas; é ponto de craft, não textura." },
          ]}
        />
      </GuideSection>
    </>
  )
}
