# ADR — Fluxo conversacional do registro (uma pergunta por tela)

Data: 2026-07-22 · Status: implementado na branch `direcao-visual`, aguardando validação do designer e homologação do Comitê para os deltas de PRD.

## Contexto

O fluxo original tinha ~22 campos em 7 telas: identificação e classificação vinham antes do relato, a taxonomia jurídica (6 tipos × 12 categorias) era preenchida pela própria pessoa, o e-mail era digitado duas vezes e uma etapa inteira ("Expectativa") continha um único campo opcional. Para o usuário-alvo — possivelmente em vulnerabilidade emocional — cada decisão antes do desabafo é um ponto de desistência.

## Decisão

Adotar o padrão validado em escala **one thing per page** (GOV.UK Design System; comprovadamente melhor para "low-confidence users"), com o formato conversacional (Typeform: ~2× conclusão vs. formulário tradicional), a revisão **"Check your answers"** (GOV.UK) e princípios trauma-informed (Callisto: agência, escolha, transparência).

Jornada: relato primeiro (única resposta de texto obrigatória) → detalhes opcionais com "Pular" de um clique (quando/onde + recorrência, pessoas, algo mais + anexos) → identificação por último (modo → dados [só identificada] → relação → e-mail, uma vez) → revisão → sucesso.

Componentes: `forms/question-screen.tsx` (moldura da pergunta), `features/registration/steps.ts` (lista visível dinâmica), `forms/step-progress.tsx` ("Pergunta X de Y", total dinâmico — caveat GOV.UK de comprimento variável).

Mínimo obrigatório: relato, modo, relação, e-mail, termos — 5 interações (antes: 9 + 13 campos opcionais visíveis).

## Deltas de PRD (para homologação)

- **RF-008 — taxonomia**: tipo e categoria saem do formulário público. O Comitê classifica na triagem — classificar é trabalho de especialista, não da pessoa em vulnerabilidade. Os valores canônicos permanecem em `lib/registration-taxonomy.ts` para o painel admin.
- **RF-006 — etapas**: as 5 etapas viram perguntas; "resumo/título" sai do público (o serviço deriva das primeiras linhas do relato); "Expectativa" funde na pergunta "Algo mais?"; campos irmãos fundidos (área+período+contexto → "quando e onde"; pessoas+testemunhas → "pessoas"; consequências+providências+outras infos → "algo mais").
- **Confirmação de e-mail** (digitar duas vezes): removida. O e-mail aparece em destaque na revisão.
- **RF-007 — e-mail obrigatório nos dois modos: mantido** (decisão do usuário, 2026-07-21), pedido uma única vez, após o relato, com o porquê no campo.

## Acolhimento fora do formulário

- Sucesso: "Copiar tudo" (protocolo+código num clique); copy sem dupla negativa ameaçadora.
- Acompanhar: colar o comprovante inteiro preenche protocolo e código (sem transcrição de 12 caracteres).
- FAQ: novo item "Perdi meu código de acesso".

## Exceções deliberadas às Web Interface Guidelines

- Copy em sentence case pt-BR (não Title Case) — norma do repo.
- Estado do formulário fora da URL — ADR de privacidade (máquinas compartilhadas) supera "URL reflects state".
- `beforeunload` guard permanece: proteger o relato não enviado vale o atrito na saída.

## Fontes

GOV.UK Design Notes "One thing per page" (2015) · Smashing Magazine "Better Form Design: One Thing Per Page" · NN/g "4 Principles to Reduce Cognitive Load in Forms" · Callisto "Designing trauma-informed technology" · dados de conclusão Typeform/conversational forms (2026).
