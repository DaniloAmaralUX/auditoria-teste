import { Grid, GridCell } from "@/components/ui/grid"
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
        lede="Exiba elementos em um layout de grade. Réplica do Grid do Geist (vercel.com/geist/grid) sobre os nossos tokens — uma primitiva de layout hairline para quadros editoriais (home, quadros do guia)."
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
        title="Responsiva com clipping"
        description="GridCell.column e .row também aceitam objeto por breakpoint. Aqui a célula sólida ocupa 1 coluna no sm, 2 no md e 3 no lg — o span cresce com a viewport, e o solid come as guias por baixo."
      >
        <Grid columns={{ sm: 2, md: 3, lg: 4 }} rows={2}>
          <GridCell
            solid
            column={{ sm: "1 / 2", md: "1 / 3", lg: "1 / 4" }}
            className="border-r border-b"
          >
            <span className="text-sm">solid · span responsivo</span>
          </GridCell>
          <GridCell>
            <Numbered n={2} />
          </GridCell>
          <GridCell>
            <Numbered n={3} />
          </GridCell>
          <GridCell>
            <Numbered n={4} />
          </GridCell>
          <GridCell>
            <Numbered n={5} />
          </GridCell>
        </Grid>
      </GuideSection>

      <GuideSection
        title="Clipping específico"
        description="Uma única célula sólida no meio da grade tracejada: as guias tracejadas continuam ao redor, mas somem por baixo do solid — o efeito clássico de recorte editorial."
      >
        <Grid columns={5} rows={3} dashedGuides className="h-56">
          <GridCell solid column="2 / 5" row="2 / 3" className="border">
            <span className="text-sm">solid · 3 colunas no meio</span>
          </GridCell>
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
        title="Guias tracejadas"
        description="dashedGuides troca as guias internas por tracejado — a moldura externa permanece sólida."
      >
        <Grid columns={4} rows={2} dashedGuides className="h-40" />
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
                ["GridCell", "column / row", "grid-column / grid-row | { sm, md, lg }", 'posição/span (ex.: "1 / 3") ou responsivo'],
                ["GridCell", "solid", "boolean", "fundo sólido que oculta as guias por baixo"],
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
          ]}
        />
      </GuideSection>
    </>
  )
}
