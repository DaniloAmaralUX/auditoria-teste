import * as React from "react"
import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHeader, GuideSection, DemoPanel, RuleList } from "./design-ui"

const durations = [
  { token: "--motion-instant", value: "80ms", use: "feedback de press, highlights" },
  { token: "--motion-fast", value: "120ms", use: "hover, trocas de cor e borda" },
  { token: "--motion-base", value: "180ms", use: "entradas locais, colapsos" },
  { token: "--motion-slow", value: "260ms", use: "entradas de página, tema" },
  { token: "--motion-emphasis", value: "360ms", use: "momentos únicos (sucesso)" },
]

const easings = [
  { token: "--ease-standard", value: "cubic-bezier(0.2, 0, 0, 1)", use: "padrão geral" },
  { token: "--ease-enter", value: "cubic-bezier(0, 0, 0.2, 1)", use: "elementos entrando" },
  { token: "--ease-exit", value: "cubic-bezier(0.4, 0, 1, 1)", use: "elementos saindo" },
  { token: "--ease-out-strong", value: "cubic-bezier(0.23, 1, 0.32, 1)", use: "entradas com punch" },
  { token: "--ease-sheet", value: "cubic-bezier(0.32, 0.72, 0, 1)", use: "sheets iOS-like" },
]

function EnterDemo() {
  const [key, setKey] = React.useState(0)
  return (
    <DemoPanel className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-heading text-sm font-semibold">Entrada escalonada</p>
        <Button variant="outline" size="sm" onClick={() => setKey((k) => k + 1)}>
          <RotateCcw aria-hidden className="size-3.5" />
          Repetir
        </Button>
      </div>
      <div key={key} className="space-y-2">
        {["Eyebrow", "Título da seção", "Parágrafo de apoio"].map((label, i) => (
          <div
            key={label}
            className="bg-muted/60 animate-in fade-in slide-in-from-bottom-1.5 fill-mode-both rounded-md border px-3 py-2 text-sm duration-[var(--motion-slow)] ease-[var(--ease-enter)]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {label}
          </div>
        ))}
      </div>
      <p className="text-muted-foreground text-xs">
        Stagger de 60ms, deslocamento de 6px, sem overshoot — nível permitido só em heros.
      </p>
    </DemoPanel>
  )
}

export default function MotionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fundações"
        title="Motion"
        lede="Movimento a serviço da confiança: resposta no pointer-down, curvas sem overshoot (contexto calmo), durações curtas. Springs só onde o gesto do usuário carrega momento — o que não acontece neste portal."
      />

      <GuideSection title="Durações">
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <tbody>
              {durations.map((d) => (
                <tr key={d.token} className="border-b last:border-0">
                  <td className="px-4 py-2.5 font-mono text-xs font-semibold">{d.token}</td>
                  <td className="text-muted-foreground px-4 py-2.5 font-mono text-xs">{d.value}</td>
                  <td className="text-muted-foreground px-4 py-2.5 text-xs">{d.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GuideSection>

      <GuideSection title="Curvas">
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <tbody>
              {easings.map((e) => (
                <tr key={e.token} className="border-b last:border-0">
                  <td className="px-4 py-2.5 font-mono text-xs font-semibold">{e.token}</td>
                  <td className="text-muted-foreground px-4 py-2.5 font-mono text-[11px]">{e.value}</td>
                  <td className="text-muted-foreground px-4 py-2.5 text-xs">{e.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GuideSection>

      <GuideSection title="Demonstrações">
        <div className="space-y-4">
          <DemoPanel className="space-y-3">
            <p className="font-heading text-sm font-semibold">Resposta no pointer-down</p>
            <Button>Pressione e segure</Button>
            <p className="text-muted-foreground text-xs">
              O scale 0.98 acontece no <em>active</em>, não no clique — feedback
              instantâneo (apple-design §1).
            </p>
          </DemoPanel>
          <EnterDemo />
        </div>
      </GuideSection>

      <GuideSection title="Regras">
        <RuleList
          items={[
            { do: true, text: "animar apenas transform e opacity; transições de cor/borda em --motion-fast." },
            { do: true, text: "prefers-reduced-motion sempre respeitado — o @media global reduz tudo a ~1ms." },
            { do: false, text: "overshoot/bounce em UI que apenas apareceu — reservado a gestos com momento, que não existem aqui." },
            { do: false, text: "loops infinitos e animação decorativa de fundo." },
          ]}
        />
      </GuideSection>
    </>
  )
}
