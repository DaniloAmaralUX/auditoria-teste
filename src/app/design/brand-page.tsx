import { PageHeader, GuideSection, DemoPanel, RuleList } from "./design-ui"

/** Logo monocromática via mask — herda currentColor sem duplicar o SVG. */
function LogoMono({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Pitang (monocromática)"
      className={className}
      style={{
        display: "inline-block",
        backgroundColor: "currentColor",
        maskImage: "url(/pitang-logo.svg)",
        WebkitMaskImage: "url(/pitang-logo.svg)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        aspectRatio: "137 / 39",
      }}
    />
  )
}

export default function BrandPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fundações"
        title="Marca"
        lede="A logo oficial da Pitang é vermelha (#ED1C24) — e o acento de ação do portal é laranja. A regra de convivência: a marca identifica, o laranja age. Os dois nunca disputam o mesmo olhar."
      />

      <GuideSection title="Logo oficial">
        <div className="grid gap-4 sm:grid-cols-2">
          <DemoPanel className="flex h-32 items-center justify-center">
            <img src="/pitang-logo.svg" alt="Pitang" width={137} height={39} className="h-9 w-auto" />
          </DemoPanel>
          <DemoPanel className="flex h-32 items-center justify-center">
            <LogoMono className="text-foreground h-9" />
          </DemoPanel>
        </div>
        <p className="text-muted-foreground text-sm">
          À esquerda, a versão institucional (vermelho #ED1C24). À direita, a
          monocromática — obtida por CSS mask sobre o mesmo arquivo
          (<code className="bg-muted rounded px-1.5 py-0.5 text-xs">public/pitang-logo.svg</code>),
          sem asset duplicado; herda a cor do contexto e funciona nos dois temas.
        </p>
      </GuideSection>

      <GuideSection
        title="Aplicação no portal"
        description="Proposta em validação: monocromática no header (o vermelho ao lado de CTAs laranja criaria disputa), institucional vermelha no footer e em documentos, onde não há ação por perto."
      >
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border">
            <div className="bg-background/90 flex items-center justify-between border-b px-4 py-3">
              <span className="flex items-center gap-3">
                <LogoMono className="text-foreground h-5" />
                <span className="text-muted-foreground border-l pl-3 text-xs">
                  Canal de Ética e Ouvidoria
                </span>
              </span>
              <span className="bg-primary text-primary-foreground pointer-events-none inline-flex h-8 items-center rounded-lg px-3 text-xs font-medium">
                Registrar manifestação
              </span>
            </div>
            <p className="text-muted-foreground px-4 py-2.5 text-xs">
              Header — logo mono + CTA laranja: um só ponto de cor.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border">
            <div className="bg-background flex items-center justify-between border-b px-4 py-3">
              <img src="/pitang-logo.svg" alt="" aria-hidden width={137} height={39} className="h-5 w-auto" />
              <span className="text-muted-foreground text-xs">© 2026 Pitang</span>
            </div>
            <p className="text-muted-foreground px-4 py-2.5 text-xs">
              Footer — a versão vermelha vive onde não há ação competindo.
            </p>
          </div>
        </div>
      </GuideSection>

      <GuideSection title="Favicon">
        <div className="flex items-center gap-4">
          <DemoPanel className="flex size-16 items-center justify-center p-3">
            <img src="/favicon.svg" alt="Favicon" width={36} height={36} className="size-9" />
          </DemoPanel>
          <p className="text-muted-foreground max-w-prose text-sm">
            O símbolo isolado (sem wordmark) em vermelho institucional —
            <code className="bg-muted mx-1 rounded px-1.5 py-0.5 text-xs">public/favicon.svg</code>
            referenciado no <code className="bg-muted rounded px-1.5 py-0.5 text-xs">index.html</code>.
          </p>
        </div>
      </GuideSection>

      <GuideSection title="Regras">
        <RuleList
          items={[
            { do: true, text: "logo monocromática quando houver CTA ou acento laranja no mesmo campo visual." },
            { do: true, text: "versão vermelha em footer, documentos, e-mails e peças institucionais." },
            { do: false, text: "recolorir a logo de laranja ou usar o vermelho da marca como acento de interface." },
            { do: false, text: "aplicar a logo sobre foto, gradiente ou superfície de baixo contraste." },
          ]}
        />
      </GuideSection>
    </>
  )
}
