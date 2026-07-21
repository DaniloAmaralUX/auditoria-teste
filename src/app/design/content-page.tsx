import { cn } from "@/lib/utils"
import { PageHeader, GuideSection, RuleList } from "./design-ui"

/** Par lado a lado: como não escrever / como escrever, com exemplo real. */
function CopyCompare({
  bad,
  good,
  note,
}: {
  bad: string
  good: string
  note: string
}) {
  return (
    <div className="space-y-2">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "Evite", text: bad, isGood: false },
          { label: "Escreva", text: good, isGood: true },
        ].map((item) => (
          <div
            key={item.label}
            className={cn(
              "bg-card rounded-lg border p-4",
              item.isGood && "border-status-completed/30"
            )}
          >
            <p
              className={cn(
                "text-[11px] font-semibold tracking-[0.08em] uppercase",
                item.isGood ? "text-status-completed" : "text-muted-foreground"
              )}
            >
              {item.label}
            </p>
            <p className="mt-1.5 text-sm">{item.text}</p>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground text-xs">{note}</p>
    </div>
  )
}

export default function ContentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fundações"
        title="Conteúdo"
        lede="Palavras são material de design, não decoração. Num canal de ouvidoria, o texto carrega a confiança: escreve do lado de quem manifesta, orienta sem se desculpar e nunca promete o que não pode cumprir."
      />

      <GuideSection
        title="Voz do canal"
        description="Sóbria, direta e acolhedora — sem burocratês e sem entusiasmo de marketing. O manifestante pode estar num momento difícil; o texto respeita isso."
      >
        <RuleList
          items={[
            { do: true, text: "voz ativa e verbos simples: “Registre sua manifestação”, “Guarde o protocolo”." },
            { do: true, text: "nomear pelo que a pessoa reconhece: “protocolo e código de acesso”, nunca “credenciais” ou “token”." },
            { do: true, text: "a mesma palavra na ação inteira: o botão “Registrar manifestação” leva à confirmação “Manifestação registrada”." },
            { do: false, text: "promessas absolutas: “anonimato garantido” vira “possibilidade de anonimato” (mensagem homologada, RN-001)." },
            { do: false, text: "jargão de sistema: “requisição”, “formulário submetido”, “dados persistidos”." },
          ]}
        />
      </GuideSection>

      <GuideSection
        title="Botões e ações"
        description="Um controle diz exatamente o que acontece quando é usado. Rótulo genérico é sinalização quebrada."
      >
        <CopyCompare
          bad="Enviar"
          good="Começar registro"
          note="Real, da tela de início do registro (pt-BR.ts). O verbo específico prepara a pessoa para o que vem — cinco etapas, revisão antes do envio."
        />
      </GuideSection>

      <GuideSection
        title="Erros orientam"
        description="Padrão do projeto (pt-BR.ts): o quê aconteceu / dados preservados / o que fazer / alternativa. Erros não se desculpam nem se alarmam — apontam a saída."
      >
        <CopyCompare
          bad="Erro: campo inválido!"
          good="Informe o código completo (12 caracteres)."
          note="Real, de schemas/tracking.ts. Diz exatamente o que falta, no tom de quem ajuda a completar — não de quem reprova."
        />
      </GuideSection>

      <GuideSection
        title="Vazios convidam"
        description="Uma tela vazia ou um beco sem saída é um convite à ação, nunca um pedido de desculpas."
      >
        <CopyCompare
          bad="Ops! Nada por aqui…"
          good="O endereço que você tentou acessar não existe ou foi movido. Você pode voltar ao início ou registrar uma manifestação."
          note="Real, da página 404 (pt-BR.ts) — explica o que houve e oferece dois caminhos concretos. Sem humor: o contexto de uma ouvidoria não comporta."
        />
      </GuideSection>

      <GuideSection title="Regras">
        <RuleList
          items={[
            { do: true, text: "cada elemento faz um trabalho só: label rotula, exemplo demonstra, ajuda orienta." },
            { do: true, text: "sentence case em tudo; caps só nos eyebrows (com tracking largo)." },
            { do: false, text: "texto que vende em vez de explicar — descreva o que a coisa faz, em termos simples." },
            { do: false, text: "esconder informação dura atrás de eufemismo: prazos, limites e obrigações são ditos claramente." },
          ]}
        />
      </GuideSection>
    </>
  )
}
