# ADR — Fluxo do registro: 5 etapas com camada conversacional

Data: 2026-07-22 · Status: **revisado após análise do documento de requisitos v1.0 (Luana Leão, 17/07/2026)** — a estrutura voltou às 5 etapas oficiais (RF-006) com a classificação do RF-008; a camada de UX writing acolhedora permanece. A versão uma-pergunta-por-tela ficou registrada abaixo como recomendação para uma futura v1.1 do documento.

## Decisão vigente (alinhada ao documento de requisitos)

- **Estrutura**: as 5 etapas oficiais, na ordem oficial (Identificação → Sobre a manifestação → Relato → Complementares → Expectativa) + revisão, com "Etapa X de 6" no indicador.
- **RF-008 mantido**: tipo e categoria voltam ao formulário; a copy tira a pressão do acerto ("escolha a mais próxima — o Comitê ajusta na triagem").
- **Camada de UX writing preservada** (melhoria, não divergência): helpers acolhedores por etapa, RadioCards de anonimato, opcionais sinalizados, e-mail pedido UMA vez (o documento nunca pediu confirmação duplicada — essa era uma adição antiga do protótipo), "Prefiro não informar" na relação, aviso de anonimato no momento da escolha.
- **Também preservados**: sucesso com "Copiar tudo", colar comprovante no acompanhamento, FAQ "Perdi meu código", moldura QuestionScreen com piso Web Interface Guidelines.

## Registro histórico — proposta uma-pergunta-por-tela (para v1.1)

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
