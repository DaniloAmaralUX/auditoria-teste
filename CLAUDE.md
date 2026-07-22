# Ouvidoria Pitang — Canal de Ética

Portal público de ouvidoria (Vite + React 19 + react-router v7 + Tailwind v4 + shadcn/ui + motion). Gerenciador: **pnpm**. Checks: `pnpm typecheck`, `pnpm lint`.

## Direção visual — fonte de verdade

O design system vive no próprio app, em **`/design`** (código em `src/app/design/`), e é mantido na branch `direcao-visual` junto com o designer. **Antes de criar ou alterar qualquer UI, consulte o guia** — ele renderiza os tokens e componentes reais. A skill **`frontend-design`** (`.agents/skills/frontend-design/SKILL.md`) guia o processo: plano de tokens antes de código, autocrítica anti-default, um único elemento-assinatura, restraint.

**Direção visual: linguagem do Midday (midday.ai)** — editorial, monocromática e contida. A virada de "papel âmbar quente" para os neutros do Midday foi decidida com o designer (branch `redesign-midday`). Assinatura = **serif de display + whitespace + tabelas hairline**.

Regras inegociáveis (detalhes e demos no guia):

- **Tokens só via CSS variables** em `src/index.css` (oklch, Tailwind v4 `@theme` — não existe tailwind.config). Nunca cor hardcoded em componente.
- **Neutros monocromáticos do Midday**: light branco puro (`--background: oklch(1 0 0)`) + cards creme quente (`--card: oklch(0.972 0.008 90)`); dark #0d0d0d (`oklch(0.17 0 0)`), cards #121212. O **vermelho Pitang é o ÚNICO acento** (CTA, link, estado ativo, progresso) — degrau AA `oklch(0.58 0.21 28)`, o passo acessível mais próximo do `#ED1C24` da marca (que dá 4.27:1 e reprova com branco). Botões/preenchimentos que não são ação = neutros mono. Como erros compartilham o matiz, **cor nunca comunica erro sozinha** (ícone + texto sempre). Azul dessaturado = informacional. Logo institucional **sempre vermelha**.
- **Zero gradientes.** Superfícies planas; variação por card/muted/bordas.
- **Border-first: borda 1px no lugar de sombra** em superfícies de página e cards; sombra só em overlays (select, sheet, popover, dialog — escala `--shadow-material-*`).
- **Radius base 8px** (`rounded-lg` em controles, `rounded-xl` em cards). Pill apenas em badges de status e barras de progresso.
- **Par tipográfico Hedvig Letters** (Google Fonts self-hosted via `@fontsource`, peso único 400): **Sans** (`--font-sans`) na UI, **Serif** (`--font-serif`/`--font-heading`) em headings, saudações e hero. **Hierarquia por tamanho + serif + cor** (`text-foreground` vs `text-muted-foreground`), **NÃO por peso** — com 400 único, `font-medium/semibold/bold` não diferenciam. Dígitos alinhados usam `tabular-nums`.
- **Status de manifestação = dot colorido + rótulo** (nunca fundo preenchido colorido); rótulo em `foreground`, cor só no dot.
- **Motion**: sem overshoot, feedback no `active` (pointer-down), durações/curvas pelos tokens `--motion-*`/`--ease-*`; `prefers-reduced-motion` sempre respeitado. Regras duras (ver `/design/motion`): UI < 300ms; nunca `ease-in`; nunca entrar de `scale(0)`; só animar `transform`/`opacity`; ação de teclado nunca anima; hover animado atrás de `@media (hover: hover)`; transitions (não keyframes) em UI re-disparável.
- **Bibliotecas**: uma por tarefa, registradas em `/design/componentes` (Radix/shadcn, motion só p/ spring-gesto — hover/fade é CSS puro, sonner, input-otp, lucide, Animate UI com contenção). Não trocar sem registrar a decisão no guia.
- **Marca**: logo em `public/pitang-logo.svg`, **sempre vermelha** em todo o produto (header, footer, documentos, login). A versão monocromática via CSS mask fica só para fundos escuros saturados (ver `/design/marca`).
- **Escrita**: voz ativa, do lado do usuário, mesma palavra na ação inteira; erros orientam sem se desculpar (padrão em `src/messages/pt-BR.ts` e `/design/conteudo`).
- **A11y piso**: AA de contraste, foco visível, cor nunca comunica sozinha (RNF-007).
- **Piso de interface (Web Interface Guidelines/Vercel)**: `color-scheme` segue o tema; `touch-action: manipulation` nos interativos; overlays com `overscroll-contain`; skip link em todo shell; inputs com `type`/`autocomplete` corretos e sem bloqueio de colar; imagens com `width`/`height`; `…` tipográfico e `tabular-nums` em dígitos. Auditoria: skills `web-design-guidelines` e `writing-guidelines` (vercel-labs/agent-skills — buscam as regras frescas antes de revisar); regras de copy adaptadas ao pt-BR (sentence case, não Title Case).

Docs de UX complementares em `../pitang-ouvidoria-ux-docs/docs/ux/` (PRD, especificações de tela, motion — doc 16).

## Fluxo de trabalho

Mudanças de design nascem na branch `direcao-visual`, são validadas pelo designer no guia `/design` (dev server, light **e** dark — tecla `D` alterna) e só então seguem para `main` via PR.
