/**
 * Mensagens em pt-BR (RNF-011: textos centralizados, i18n-ready).
 * Microtextos homologados do PRD §17 e doc 07 (UX Writing).
 * Regras de tom: claro, sóbrio, humano; sem promessas absolutas de anonimato;
 * botões descritivos; erros em 4 partes (o quê / dados preservados / o quê fazer / alternativa).
 */

export const messages = {
  common: {
    skipToContent: "Pular para o conteúdo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    toggleTheme: "Alternar tema claro/escuro",
    newTab: "abre em nova aba",
  },

  home: {
    heroTitle: "Canal de Ética e Ouvidoria Pitang",
    heroSubtitle:
      "Um canal seguro para registrar manifestações com respeito, sigilo e acompanhamento.",
    ctaRegister: "Registrar manifestação",
    ctaTrack: "Acompanhar manifestação",

    // RN-001 — Não retaliação (mensagem homologada, sem promessa absoluta)
    nonRetaliation:
      "A Pitang não tolera retaliação contra pessoas que utilizam este canal de boa-fé.",

    audienceTitle: "Quem pode utilizar",
    audience: [
      "Colaboradores",
      "Ex-colaboradores",
      "Candidatos",
      "Fornecedores",
      "Parceiros",
      "Demais públicos",
    ],

    guaranteesTitle: "Nossas garantias",
    guarantees: [
      {
        title: "Sigilo",
        description:
          "O conteúdo da manifestação é acessado somente pelo Comitê de Ética, sob dever de confidencialidade.",
      },
      {
        title: "Possibilidade de anonimato",
        description:
          "Você pode registrar sem informar seu nome. Se preferir, pode se identificar — a escolha é sua.",
      },
      {
        title: "Não retaliação",
        description:
          "Utilizar o canal de boa-fé não pode gerar represália de nenhuma natureza.",
      },
    ],

    howItWorksTitle: "Como funciona",
    howItWorks: [
      {
        step: 1,
        title: "Registre sua manifestação",
        description: "Preencha o formulário em cinco etapas, de forma anônima ou identificada.",
      },
      {
        step: 2,
        title: "Receba protocolo e código",
        description: "Guarde o protocolo e o código de acesso para acompanhar o andamento.",
      },
      {
        step: 3,
        title: "O Comitê analisa e apura",
        description: "O Comitê de Ética recebe, tria e conduz a apuração com confidencialidade.",
      },
      {
        step: 4,
        title: "Acompanhe as devolutivas",
        description: "Consulte o status e as respostas do Comitê a qualquer momento, sem criar conta.",
      },
    ],

    contactTitle: "Fale com a Ouvidoria",
    contactDescription:
      "Prefere outro caminho? Você também pode entrar em contato diretamente:",
  },

  // Microtexto de anonimato (PRD §17.1) — reutilizável no formulário
  anonymity:
    "Você pode registrar a manifestação sem informar seu nome. O e-mail será usado somente para confirmação e devolutivas do Comitê de Ética.",

  faq: {
    title: "Perguntas frequentes",
    subtitle: "Tire suas dúvidas sobre o canal, o sigilo e o acompanhamento.",
  },

  lgpd: {
    title: "Proteção de Dados (LGPD)",
    subtitle:
      "Como tratamos os dados informados neste canal, conforme a Lei nº 13.709/2018.",
  },

  terms: {
    title: "Termos de uso",
    subtitle: "Condições para utilização do Canal de Ética e Ouvidoria Pitang.",
  },

  notFound: {
    title: "Página não encontrada",
    description:
      "O endereço que você tentou acessar não existe ou foi movido. Você pode voltar ao início ou registrar uma manifestação.",
    back: "Voltar ao início",
  },

  footer: {
    rights: "Canal interno da Pitang. Conteúdos homologados pelo Comitê de Ética e pelo Jurídico.",
  },
} as const

export type Messages = typeof messages
