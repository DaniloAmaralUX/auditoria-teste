# Ouvidoria Pitang — Canal de Ética

Portal público de ouvidoria (Vite + React 19 + react-router v7 + Tailwind v4 + shadcn/ui + motion). Gerenciador: **pnpm**. Checks: `pnpm typecheck`, `pnpm lint`.

## Direção visual — fonte de verdade

O design system vive no próprio app, em **`/design`** (código em `src/app/design/`), e é mantido na branch `direcao-visual` junto com o designer. **Antes de criar ou alterar qualquer UI, consulte o guia** — ele renderiza os tokens e componentes reais. A skill **`frontend-design`** (`.agents/skills/frontend-design/SKILL.md`) guia o processo: plano de tokens antes de código, autocrítica anti-default, um único elemento-assinatura, restraint.

Regras inegociáveis (detalhes e demos no guia):

- **Tokens só via CSS variables** em `src/index.css` (oklch, Tailwind v4 `@theme` — não existe tailwind.config). Nunca cor hardcoded em componente.
- **Neutros papel quente**; o **laranja Pitang é o único acento de ação** (CTA, link, estado ativo, progresso). Se não é ação nem estado, é neutro. Vermelho `#ED1C24` = marca + destructive, nunca acento de UI. Azul = informacional.
- **Zero gradientes.** Superfícies planas; variação por papel/muted/bordas.
- **Borda 1px no lugar de sombra** em cards de fluxo; sombra só em overlays (select, sheet, popover).
- **Radius base 8px** (`rounded-lg` em controles, `rounded-xl` em cards). Pill apenas em badges de status e barras de progresso.
- **Inter Variable única**; tracking negativo em headings já vem do `@layer base`. Dígitos alinhados usam `tabular-nums`.
- **Motion**: sem overshoot, feedback no `active` (pointer-down), durações/curvas pelos tokens `--motion-*`/`--ease-*`; `prefers-reduced-motion` sempre respeitado.
- **Marca**: logo em `public/pitang-logo.svg`; versão monocromática via CSS mask (ver `/design/marca`). Mono onde houver CTA laranja por perto; vermelha em footer/documentos.
- **Escrita**: voz ativa, do lado do usuário, mesma palavra na ação inteira; erros orientam sem se desculpar (padrão em `src/messages/pt-BR.ts` e `/design/conteudo`).
- **A11y piso**: AA de contraste, foco visível, cor nunca comunica sozinha (RNF-007).

Docs de UX complementares em `../pitang-ouvidoria-ux-docs/docs/ux/` (PRD, especificações de tela, motion — doc 16).

## Fluxo de trabalho

Mudanças de design nascem na branch `direcao-visual`, são validadas pelo designer no guia `/design` (dev server, light **e** dark — tecla `D` alterna) e só então seguem para `main` via PR.
