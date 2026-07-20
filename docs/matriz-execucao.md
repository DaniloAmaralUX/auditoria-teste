# Matriz executável de requisitos — Canal de Ética e Ouvidoria Pitang

> Gerada a partir de `pitang-ouvidoria-ux-docs/docs/product/PRD.md` (fonte de verdade), do documento oficial da Pitang (v1.0, 17/07/2026) e dos docs de UX (inventário de telas PUB/ADM, specs de componentes).
> **Prioridade** vem do documento oficial da Pitang. **Fase** segue a ordem de implementação do PRD §27.
> Legenda de status: ☐ pendente · ◐ em andamento · ☑ concluído.

## Convenções de rota (PRD §9.3, com decisões)

- Público: `/`, `/registrar/*`, `/acompanhar`, `/lgpd`, `/termos`, `/faq`, `/codigo-de-conduta`, `*` (404).
- **Decisão (acompanhamento)**: consulta por POST; **sem protocolo na URL** — detalhe renderizado em `/acompanhar` (estado em memória/sessão), não `/acompanhar/[protocolo]`. Registrar ADR.
- **Decisão (Etapa 2)**: nome/rota em aberto — usar rótulo do PRD "Sobre a manifestação" (`/registrar/sobre-a-manifestacao`) como padrão até validação.
- Admin: `/admin/login`, `/admin/dashboard`, `/admin/manifestacoes`, `/admin/manifestacoes/[id]`, `/admin/documentos`, `/admin/usuarios`, `/admin/exportacoes`, `/admin/configuracoes`.

---

## Portal público — Requisitos funcionais

| Req | Descrição | Prio | Rota(s) | Tela | Componentes principais | Teste | Fase | Status |
|---|---|---|---|---|---|---|---|---|
| RF-001 | Página inicial | Alta | `/` | PUB-001 | `PublicShell`, `Hero`, `TrustNotice`, `HowItWorks`, `ContactBlock` | e2e: blocos obrigatórios, contatos clicáveis, CTA acima da dobra; a11y headings | 1 | ☐ |
| RF-002 | Navegação e rodapé | Alta | todas públicas | — | `PublicHeader` (sticky), `PublicFooter`, `MobileNav` (Sheet) | teclado, estado atual, menu mobile, sem link morto | 1 | ☐ |
| RF-003 | Código de Conduta em PDF | Alta | `/codigo-de-conduta` | PUB-014 | `PdfLink` (nova aba, `noopener noreferrer`, download) | link abre PDF vigente, não HTML; download OK | 1 | ☐ |
| RF-004 | Página LGPD | Alta | `/lgpd` | PUB-011 | `LegalContent` (CMS), `ContentMeta` (versão/data) | conteúdo editável, headings semânticos, versão exibida | 1 | ☐ |
| RF-005 | Termos com aceite | Alta | `/termos` + revisão | PUB-012 | `LegalContent`, `TermsAcceptField` (checkbox) | envio bloqueado sem aceite; registra `termsVersion`/`acceptedAt` | 2 | ☐ |
| RF-006 | Formulário 5 etapas | Alta | `/registrar/*` | PUB-002..006 | `FormStep`, `FormNavigation`, `StepProgress`, `ErrorSummary`, RHF+Zod | volta sem perder dados; validação por etapa; foco no título; "Etapa X de 5" | 2 | ☐ |
| RF-007 | Anônima ou identificada | Alta | `/registrar/identificacao` | PUB-002 | `ModeSelector`, `FieldGroup` condicional, `TrustNotice` | anônimo nunca pede nome; e-mail obrigatório nos 2 modos | 2 | ☐ |
| RF-008 | Classificação | Alta | `/registrar/sobre-a-manifestacao` | PUB-003 | `Select` (tipo/categoria), campo "Outro" | valores com IDs estáveis; "Outro" com complemento | 2 | ☐ |
| RF-009 | Anexos de evidências | Média | `/registrar/complementares` | PUB-005 | `FileUpload` (9 estados, `UploadLimits`) | valida MIME+extensão+tamanho; falha por arquivo não apaga demais; teclado | 2 | ☐ |
| RF-010 | Protocolo e confirmação | Alta | `/registrar/sucesso` | PUB-008 | `ProtocolCard` (copiar/baixar comprovante) | protocolo único; código não em texto simples; tela de sucesso persistente | 2 | ☐ |
| RF-011 | Acompanhamento | Alta | `/acompanhar` | PUB-009/010 | `TrackingLookupForm` (POST), `StatusTimeline`, `ResponseList` | sem login; código inválido → msg genérica; rate limit; sem dados internos | 3 | ☐ |
| RF-012 | Proteção anti-spam | Média | envio + consulta | — | `Captcha` (com alternativa acessível), rate limiting | alternativa ao CAPTCHA; rate limit compreensível; não vincula ao relato | 3 | ☐ |
| RF-013 | Validações e mensagens | Média | `/registrar/*` | PUB-002..007 | `ErrorSummary`, mensagens pt-BR, `ReviewSection` | erro diz o quê+como corrigir; conteúdo preservado após falha de rede | 2 | ☐ |

---

## Painel administrativo — Requisitos funcionais

| Req | Descrição | Prio | Rota(s) | Tela | Componentes principais | Teste | Fase | Status |
|---|---|---|---|---|---|---|---|---|
| RF-020 | Autenticação + alerta | Alta | `/admin/login` | ADM-001 | `AuthForm`, guarda de rota, e-mail de alerta | acesso negado a não autorizado; sessão expirada tratada; novo relato → evento | 4 | ☐ |
| RF-021 | Perfis e permissões | Alta | `/admin/usuarios` | ADM-010 | `UserTable`, RBAC (`committee_member`, `channel_admin`) | Luana/Valença cadastráveis; ações sem permissão bloqueadas no servidor | 6 | ☐ |
| RF-022 | Fila de triagem | Alta | `/admin/manifestacoes` | ADM-003 | `ManifestationTable`, `FilterBar` (estado na URL), `Pagination`, `ManifestationCard` (mobile) | atualizar preserva filtros; no-results ≠ vazio; contagem | 4 | ☐ |
| RF-023 | Ciclo de vida (workflow) | Alta | `/admin/manifestacoes/[id]` | ADM-004 | `StatusBadge` (5 canônicos), `SLAIndicator`, `AssigneeSelect` | toda mudança auditada; arquivar exige motivo; SLA não só por cor | 5 | ☐ |
| RF-024 | Devolutivas | Alta | `/admin/manifestacoes/[id]` | ADM-006 | `ExternalResponseComposer` (prévia + confirmação visibilidade) | e-mail sem relato; manifestante vê no acompanhamento; histórico com autor/data | 5 | ☐ |
| RF-025 | Notas internas | Média | `/admin/manifestacoes/[id]` | ADM-007 | `InternalNoteComposer` (aviso de visibilidade) | nota nunca no portal nem e-mail; autor/data registrados | 5 | ☐ |
| RF-026 | Trilha de auditoria | Alta | `/admin/manifestacoes/[id]` | ADM-008 | `AuditTimeline` (read-only) | eventos imutáveis; exportações/visualizações sensíveis registradas | 5 | ☐ |
| RF-027 | Exportação (XLSX/CSV) | Média | `/admin/exportacoes` | ADM-011 | `ExportBuilder` (escopo + confirmação) | só papel autorizado; escopo exibido antes; exportação auditada | 6 | ☐ |
| RF-028 | Gestão de documentos/conteúdo | Média | `/admin/documentos` | ADM-009 | `DocumentVersionManager` (PDF + LGPD/Termos/FAQ) | publica sem deploy; PDF novo atualiza todos os links; versão de Termos preservada | 6 | ☐ |

---

## Requisitos não funcionais

| Req | Descrição | Prio | Onde se materializa | Teste/verificação | Fase |
|---|---|---|---|---|---|
| RNF-001 | Segurança em trânsito e repouso | Alta | infra/backend, config anexos | HTTPS obrigatório; anexos sem URL pública permanente | 7 (backend) |
| RNF-002 | Anonimato técnico | Alta | `RestrictedContact`, analytics, logs | anônimo não vincula IP/cookie/sessão; e-mail em área restrita | 2–3 |
| RNF-003 | Conformidade LGPD | Alta | campos, retenção, `ContentVersion` | cada campo justificado; retenção configurável; operações registradas | 7 |
| RNF-004 | Segurança de aplicação (OWASP) | Alta | upload, forms, sessão | SAST sem crítico; upload varrido; CSRF quando aplicável | 7 |
| RNF-005 | Disponibilidade | Alta | infra | backup/restauração; monitoramento; msg de indisponibilidade | 7 (infra) |
| RNF-006 | Responsividade | Alta | todo o front | 320/375/768/1024/1440; tabela com alt mobile; sem scroll horizontal | toda fase |
| RNF-007 | Acessibilidade WCAG 2.2 AA | Média* | todo o front | teclado, foco visível, leitor de tela, contraste, reduced motion | toda fase |
| RNF-008 | Desempenho | Média | assets, rotas admin lazy | LCP≤2,5s, INP≤200ms, CLS≤0,1; Lighthouse registrado | 7 |
| RNF-009 | Compatibilidade | Média | todo o front | Chrome/Edge/Firefox/Safari + iOS Safari | 7 (QA) |
| RNF-010 | E-mails transacionais | Alta | serviço de e-mail | SPF/DKIM/DMARC; sem dados sensíveis; templates responsivos | 5 (backend) |
| RNF-011 | Idioma pt-BR + i18n-ready | Baixa | `messages/`, locale | textos não hard-coded; formatação por locale | 1 |

\* O documento oficial pede WCAG 2.1 AA (Média); o PRD elevou para **2.2 AA** — tratamos como critério de aceite inegociável em todas as fases.

---

## Regras de negócio

| Req | Descrição | Onde | Teste |
|---|---|---|---|
| RN-001 | Não retaliação | homepage, formulário, revisão, confirmação, acompanhamento | mensagem consistente e persistente |
| RN-002 | Acesso ao conteúdo só pelo Comitê | RBAC server-side | ação sem permissão bloqueada + auditada |
| RN-003 | E-mail só p/ confirmação e devolutivas | serviço de e-mail | não usado em marketing/analytics/profiling |
| RN-004 | SLA de confirmação | e-mail imediato; 1ª devolutiva ≤10 dias úteis (default) | prazo configurável; alertas antes/depois |
| RN-005 | Retenção | política configurável | prazo documentado; rotina de eliminação/anonimização |
| RN-006 | Conteúdo institucional homologado | CMS + versão | nenhum conteúdo provisório publicado como final |

---

## Sequenciamento (PRD §27)

1. **Fase 1** — fundação, tokens, shell público, homepage, páginas institucionais. → RF-001..004, RNF-006/007/011.
2. **Fase 2** — formulário completo, upload, revisão, aceite, sucesso. → RF-005..010, RF-013, RNF-002.
3. **Fase 3** — acompanhamento, protocolo/código, timeline, anti-spam. → RF-011, RF-012.
4. **Fase 4** — autenticação, shell admin, fila, detalhe. → RF-020, RF-022.
5. **Fase 5** — workflow, SLA, notas, devolutivas, auditoria, e-mails. → RF-023..026, RNF-010.
6. **Fase 6** — documentos, usuários, exportações, dashboard. → RF-021, RF-027, RF-028.
7. **Fase 7** — craft pass, acessibilidade, performance, segurança, QA. → RNF-001/003/004/005/008/009.

> Itens de backend/infra (RNF-001/003/004/005, e-mails, antimalware, criptografia em repouso) são **dependências externas** nesta entrega de front-end: implementados com mocks/serviços isolados e sinalizados como pendência quando exigirem backend real.
