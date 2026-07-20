/**
 * Configuração institucional do canal (PRD RF-001/RF-002).
 * Contatos e navegação centralizados — nada hard-coded nas telas.
 */

export const siteConfig = {
  name: "Canal de Ética e Ouvidoria Pitang",
  shortName: "Canal de Ética e Ouvidoria",
  org: "Pitang",
  contact: {
    email: "ouvidoria@pitang.com",
    phone: "+55 81 3134-5200",
    phoneHref: "tel:+558131345200",
  },
  /** Caminho do PDF oficial do Código de Conduta (RF-003).
   *  Substituível pelo painel sem deploy; aqui é o arquivo vigente em /public. */
  codeOfConductPdf: "/documentos/codigo-de-conduta.pdf",
} as const

/** Navegação principal do header (RF-002). */
export const primaryNav = [
  { label: "Início", href: "/" },
  { label: "Código de Conduta", href: siteConfig.codeOfConductPdf, external: true },
  { label: "LGPD", href: "/lgpd" },
  { label: "FAQ", href: "/faq" },
] as const

/** Links do rodapé (RF-002). */
export const footerNav = [
  { label: "Código de Conduta", href: siteConfig.codeOfConductPdf, external: true },
  { label: "Proteção de Dados (LGPD)", href: "/lgpd" },
  { label: "Termos de uso", href: "/termos" },
  { label: "Perguntas frequentes", href: "/faq" },
] as const

export type NavItem = {
  label: string
  href: string
  external?: boolean
}
