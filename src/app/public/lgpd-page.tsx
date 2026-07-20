import { LegalContent } from "@/components/public/legal-content"
import { messages } from "@/messages/pt-BR"

/** Página de Proteção de Dados — LGPD (RF-004 / PUB-011). Conteúdo editável via CMS (RF-028). */
export function LgpdPage() {
  return (
    <LegalContent
      title={messages.lgpd.title}
      subtitle={messages.lgpd.subtitle}
      version="0.1"
      updatedAt="20/07/2026"
      draft
    >
      <h2>Finalidade do tratamento</h2>
      <p>
        Os dados informados neste canal são tratados exclusivamente para o registro, a apuração e
        a devolutiva de manifestações de ética e ouvidoria, conduzidas pelo Comitê de Ética da
        Pitang.
      </p>

      <h2>Dados tratados</h2>
      <ul>
        <li>Conteúdo da manifestação (relato e informações complementares).</li>
        <li>E-mail para confirmação e devolutivas, nos modos anônimo e identificado.</li>
        <li>Nome e contato adicional, apenas no modo identificado.</li>
        <li>Eventuais anexos de evidência fornecidos voluntariamente.</li>
      </ul>

      <h2>Forma de tratamento e compartilhamento</h2>
      <p>
        O acesso ao conteúdo é restrito ao Comitê de Ética, sob dever de confidencialidade. Não há
        compartilhamento com terceiros, salvo obrigação legal ou regulatória.
      </p>

      <h2>Retenção e eliminação</h2>
      <p>
        Os prazos de guarda e a eliminação ou anonimização são definidos com o Jurídico e o
        Encarregado (DPO) e serão descritos nesta página após homologação.
      </p>

      <h2>Direitos do titular</h2>
      <p>
        O titular pode exercer os direitos previstos na Lei nº 13.709/2018 (LGPD). Para isso,
        utilize os canais de contato da Ouvidoria informados no rodapé.
      </p>
    </LegalContent>
  )
}
