import { LegalContent } from "@/components/public/legal-content"
import { messages } from "@/messages/pt-BR"

/** Página de Termos de uso (RF-005 / PUB-012). O aceite obrigatório ocorre na revisão do formulário. */
export function TermosPage() {
  return (
    <LegalContent
      title={messages.terms.title}
      subtitle={messages.terms.subtitle}
      version="0.1"
      updatedAt="20/07/2026"
      draft
    >
      <h2>Objeto</h2>
      <p>
        Estes termos regulam o uso do Canal de Ética e Ouvidoria Pitang para registro e
        acompanhamento de manifestações.
      </p>

      <h2>Uso de boa-fé</h2>
      <p>
        O canal destina-se a manifestações de boa-fé. A Pitang não tolera retaliação contra quem o
        utiliza de boa-fé, tampouco o uso do canal para acusações sabidamente falsas.
      </p>

      <h2>Confidencialidade e anonimato</h2>
      <p>
        Você pode registrar sem informar seu nome. O e-mail informado é usado somente para
        confirmação e devolutivas do Comitê de Ética.
      </p>

      <h2>Aceite</h2>
      <p>
        O envio da manifestação só é habilitado após o aceite explícito destes termos, registrado
        junto à manifestação com data e versão vigente.
      </p>
    </LegalContent>
  )
}
