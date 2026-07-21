import * as React from "react"
import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHeader, GuideSection, DemoPanel, RuleList } from "./design-ui"

/* ------------------------- dados das tabelas ------------------------- */

const frequencyGate = [
  {
    freq: "100+ vezes/dia",
    example: "atalhos de teclado, navegação principal",
    verdict: "Nunca animar",
  },
  {
    freq: "Dezenas de vezes/dia",
    example: "hover, troca de campo, listas",
    verdict: "Quase imperceptível (rápido e sutil)",
  },
  {
    freq: "Ocasional",
    example: "sheet do menu, selects, colapsos",
    verdict: "Animação padrão",
  },
  {
    freq: "Raro / primeira vez",
    example: "sucesso do protocolo, estados vazios",
    verdict: "Aqui mora o orçamento de deleite",
  },
]

const purposes = [
  { name: "Feedback", example: "botão encolhe no press (scale 0.98) — a interface ouviu." },
  { name: "Consistência espacial", example: "o sheet do menu entra e sai pela mesma borda." },
  { name: "Indicação de estado", example: "barra do StepProgress avança; colapso abre campo condicional." },
  { name: "Evitar corte brusco", example: "conteúdo que aparece/some ganha uma ponte de opacidade." },
  { name: "Deleite", example: "só no raro: o check do sucesso do protocolo pode ter draw-on." },
]

const durations = [
  { element: "Press de botão", budget: "100–160ms", token: "--motion-instant/fast (80–120ms)" },
  { element: "Tooltip, popover pequeno", budget: "125–200ms", token: "--motion-fast/base (120–180ms)" },
  { element: "Dropdown, select", budget: "150–250ms", token: "--motion-base (180ms)" },
  { element: "Modal, sheet, drawer", budget: "200–500ms", token: "--motion-slow (260ms)" },
  { element: "Momento único (sucesso)", budget: "pode ser maior", token: "--motion-emphasis (360ms)" },
]

const easings = [
  { token: "--ease-out-strong", value: "cubic-bezier(0.23, 1, 0.32, 1)", use: "entrar/sair de UI — o padrão" },
  { token: "--ease-in-out-strong", value: "cubic-bezier(0.77, 0, 0.175, 1)", use: "movimento/morph em tela" },
  { token: "--ease-sheet", value: "cubic-bezier(0.32, 0.72, 0, 1)", use: "sheets/drawers iOS-like" },
  { token: "--ease-standard", value: "cubic-bezier(0.2, 0, 0, 1)", use: "transições gerais (cor, borda)" },
  { token: "ease (nativo)", value: "—", use: "hover e trocas de cor simples" },
  { token: "linear", value: "—", use: "movimento constante (progresso)" },
]

const reviewChecklist = [
  { issue: "transition: all", fix: "propriedades explícitas: transform, opacity, colors" },
  { issue: "ease-in em UI", fix: "trocar por ease-out — ease-in atrasa o início, que é onde o olho está" },
  { issue: "entrada com scale(0)", fix: "scale(0.95)+opacity 0 — nada no mundo real surge do nada" },
  { issue: "duração > 300ms em UI", fix: "reduzir para 150–250ms (regra: UI fica abaixo de 300ms)" },
  { issue: "animação em ação de teclado", fix: "remover — centenas de repetições/dia" },
  { issue: "popover com origin center", fix: "transform-origin no trigger (modal é exceção: central)" },
  { issue: "keyframes em UI re-disparável", fix: "transition (interrompível e re-alvejável); keyframes recomeçam do zero" },
  { issue: "hover animado sem media query", fix: "@media (hover: hover) and (pointer: fine) — touch dispara hover falso" },
  { issue: "animar height/margin/top", fix: "só transform e opacity (GPU; sem layout/paint)" },
  { issue: "tudo aparece de uma vez", fix: "stagger de 30–80ms entre itens (decorativo, nunca bloqueia)" },
  { issue: "enter e exit na mesma velocidade", fix: "saída mais rápida que entrada — o sistema responde rápido" },
]

/* ----------------------------- demos ----------------------------- */

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
        Stagger de 60ms (faixa 30–80ms), deslocamento de 6px, sem overshoot — nível
        permitido só em heros e primeiras impressões.
      </p>
    </DemoPanel>
  )
}

/* ----------------------------- página ----------------------------- */

export default function MotionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fundações"
        title="Motion"
        lede="Movimento a serviço da confiança. Antes de qualquer animação, três perguntas em ordem: deve animar? com que propósito? em quanto tempo? Padrões destilados das skills apple-design e emil-design-eng — num canal de ouvidoria, contenção é craft."
      />

      <GuideSection
        title="Deve animar? — o filtro de frequência"
        description="A primeira pergunta elimina a maioria das candidatas. Ações de teclado nunca animam — repetidas centenas de vezes por dia, animação as faz parecer lentas."
      >
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <tbody>
              {frequencyGate.map((row) => (
                <tr key={row.freq} className="border-b last:border-0">
                  <td className="px-4 py-2.5 text-xs font-semibold whitespace-nowrap">{row.freq}</td>
                  <td className="text-muted-foreground px-4 py-2.5 text-xs">{row.example}</td>
                  <td className="px-4 py-2.5 text-xs font-medium">{row.verdict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GuideSection>

      <GuideSection
        title="Propósito — por que isto anima?"
        description="Toda animação nomeia um destes propósitos. “Fica bonito” não está na lista."
      >
        <dl className="space-y-3">
          {purposes.map((p) => (
            <div key={p.name} className="flex gap-3">
              <dt className="font-heading w-44 shrink-0 text-sm font-semibold">{p.name}</dt>
              <dd className="text-muted-foreground text-sm">{p.example}</dd>
            </div>
          ))}
        </dl>
      </GuideSection>

      <GuideSection
        title="Durações — orçamento por elemento"
        description="Regra geral: UI abaixo de 300ms. Um select de 180ms parece mais responsivo que um de 400ms — percepção de velocidade é performance."
      >
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <tbody>
              {durations.map((d) => (
                <tr key={d.element} className="border-b last:border-0">
                  <td className="px-4 py-2.5 text-xs font-medium">{d.element}</td>
                  <td className="text-muted-foreground px-4 py-2.5 font-mono text-xs whitespace-nowrap">{d.budget}</td>
                  <td className="text-muted-foreground px-4 py-2.5 font-mono text-[11px]">{d.token}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GuideSection>

      <GuideSection
        title="Curvas — a decisão"
        description="Entrando ou saindo → ease-out forte. Movendo em tela → ease-in-out forte. Hover/cor → ease. Constante → linear. Nunca ease-in em UI: ele atrasa o início do movimento — exatamente o momento que o usuário observa."
      >
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <tbody>
              {easings.map((e) => (
                <tr key={e.token} className="border-b last:border-0">
                  <td className="px-4 py-2.5 font-mono text-xs font-semibold whitespace-nowrap">{e.token}</td>
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
              O scale 0.98 acontece no <em>active</em> (100–160ms, ease-out), não no
              clique — feedback instantâneo. Vale para qualquer elemento pressionável.
            </p>
          </DemoPanel>
          <EnterDemo />
        </div>
      </GuideSection>

      <GuideSection title="Regras de craft">
        <RuleList
          items={[
            { do: true, text: "entrar de scale ≥ 0.95 + opacity — nunca de scale(0); nada surge do nada." },
            { do: true, text: "transitions para UI dinâmica (interrompíveis); keyframes só em animação pré-determinada." },
            { do: true, text: "saída mais rápida que entrada: lento onde a pessoa decide, rápido onde o sistema responde." },
            { do: true, text: "springs (motion) só onde há gesto com momento; bounce 0.1–0.3 e apenas em interação física." },
            { do: false, text: "animar height, margin ou top — só transform e opacity rodam na GPU." },
            { do: false, text: "hover animado fora de @media (hover:hover) — touch dispara hover falso no tap." },
            { do: false, text: "loop infinito e animação decorativa em elemento visto dezenas de vezes por dia." },
          ]}
        />
      </GuideSection>

      <GuideSection
        title="Checklist de revisão"
        description="Antes de mergear qualquer animação, passe por esta lista (skills review-animations / improve-animations dão a auditoria completa). Reveja com olhos descansados no dia seguinte e em câmera lenta no DevTools."
      >
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <tbody>
              {reviewChecklist.map((r) => (
                <tr key={r.issue} className="border-b last:border-0">
                  <td className="text-destructive px-4 py-2.5 font-mono text-[11px] whitespace-nowrap">{r.issue}</td>
                  <td className="text-muted-foreground px-4 py-2.5 text-xs">{r.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground text-sm">
          <span className="text-foreground font-medium">prefers-reduced-motion</span> é
          piso, não opção: menos e mais gentil, não zero — o @media global reduz
          movimento preservando as mudanças de opacidade que ajudam a compreensão.
        </p>
      </GuideSection>
    </>
  )
}
