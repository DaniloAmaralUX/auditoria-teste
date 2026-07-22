# Ouvidoria Pitang — Canal de Ética

Portal público de ouvidoria (Vite + React 19 + react-router v7 + Tailwind v4 + shadcn/ui + motion). Gerenciador: **pnpm**. Checks: `pnpm typecheck`, `pnpm lint`.

## Direção visual — fonte de verdade

O design system vive no próprio app, em **`/design`** (código em `src/app/design/`), e é mantido na branch `direcao-visual` junto com o designer. **Antes de criar ou alterar qualquer UI, consulte o guia** — ele renderiza os tokens e componentes reais. A skill **`frontend-design`** (`.agents/skills/frontend-design/SKILL.md`) guia o processo: plano de tokens antes de código, autocrítica anti-default, um único elemento-assinatura, restraint.

Regras inegociáveis (detalhes e demos no guia):

- **Tokens só via CSS variables** em `src/index.css` (oklch, Tailwind v4 `@theme` — não existe tailwind.config). Nunca cor hardcoded em componente.
- **Neutros papel quente**; o **vermelho Pitang é o único acento de ação** (CTA, link, estado ativo, progresso) — no degrau AA `oklch(0.58 0.21 28)`, o passo acessível mais próximo do `#ED1C24` da marca (que dá 4.27:1 e reprova com branco). Se não é ação nem estado, é neutro. Como erros compartilham o matiz, **cor nunca comunica erro sozinha** (ícone + texto sempre). Azul = informacional. Logo institucional **sempre vermelha**.
- **Zero gradientes.** Superfícies planas; variação por papel/muted/bordas.
- **Borda 1px no lugar de sombra** em cards de fluxo; sombra só em overlays (select, sheet, popover).
- **Radius base 8px** (`rounded-lg` em controles, `rounded-xl` em cards). Pill apenas em badges de status e barras de progresso.
- **Inter Variable única**; tracking negativo em headings já vem do `@layer base`. Dígitos alinhados usam `tabular-nums`.
- **Motion**: sem overshoot, feedback no `active` (pointer-down), durações/curvas pelos tokens `--motion-*`/`--ease-*`; `prefers-reduced-motion` sempre respeitado. Regras duras (ver `/design/motion`): UI < 300ms; nunca `ease-in`; nunca entrar de `scale(0)`; só animar `transform`/`opacity`; ação de teclado nunca anima; hover animado atrás de `@media (hover: hover)`; transitions (não keyframes) em UI re-disparável.
- **Bibliotecas**: uma por tarefa, registradas em `/design/componentes` (Radix/shadcn, motion só p/ spring-gesto — hover/fade é CSS puro, sonner, input-otp, lucide, Animate UI com contenção). Não trocar sem registrar a decisão no guia.
- **Marca**: logo em `public/pitang-logo.svg`; versão monocromática via CSS mask (ver `/design/marca`). Mono onde houver CTA laranja por perto; vermelha em footer/documentos.
- **Escrita**: voz ativa, do lado do usuário, mesma palavra na ação inteira; erros orientam sem se desculpar (padrão em `src/messages/pt-BR.ts` e `/design/conteudo`).
- **A11y piso**: AA de contraste, foco visível, cor nunca comunica sozinha (RNF-007).
- **Piso de interface (Web Interface Guidelines/Vercel)**: `color-scheme` segue o tema; `touch-action: manipulation` nos interativos; overlays com `overscroll-contain`; skip link em todo shell; inputs com `type`/`autocomplete` corretos e sem bloqueio de colar; imagens com `width`/`height`; `…` tipográfico e `tabular-nums` em dígitos. Auditoria: skills `web-design-guidelines` e `writing-guidelines` (vercel-labs/agent-skills — buscam as regras frescas antes de revisar); regras de copy adaptadas ao pt-BR (sentence case, não Title Case).

Docs de UX complementares em `../pitang-ouvidoria-ux-docs/docs/ux/` (PRD, especificações de tela, motion — doc 16).

## Fluxo de trabalho

Mudanças de design nascem na branch `direcao-visual`, são validadas pelo designer no guia `/design` (dev server, light **e** dark — tecla `D` alterna) e só então seguem para `main` via PR.
