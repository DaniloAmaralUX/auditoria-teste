import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { messages } from "@/messages/pt-BR"

/** Perguntas frequentes (PUB-013). Accordion com deep-link por item. Conteúdo editável via CMS (RF-028). */
const faqItems = [
  {
    id: "anonimato",
    question: "Posso registrar sem me identificar?",
    answer:
      "Sim. Você pode registrar a manifestação sem informar seu nome. Mesmo no modo anônimo, pedimos um e-mail, usado somente para confirmação e devolutivas do Comitê de Ética.",
  },
  {
    id: "acompanhamento",
    question: "Como acompanho minha manifestação?",
    answer:
      "Ao registrar, você recebe um protocolo e um código de acesso. Guarde ambos: eles permitem consultar o status e as devolutivas na página Acompanhar manifestação, sem precisar criar conta.",
  },
  {
    id: "sigilo",
    question: "Quem tem acesso ao que eu escrever?",
    answer:
      "Somente o Comitê de Ética acessa o conteúdo da manifestação, sob dever de confidencialidade.",
  },
  {
    id: "codigo-perdido",
    question: "Perdi meu código de acesso. E agora?",
    answer:
      "Por sigilo do relato, o código não tem segunda via. Se você baixou o comprovante ou guardou o e-mail de confirmação, o código está neles. Sem o código, registre uma nova manifestação citando o protocolo anterior, ou fale com a Ouvidoria pelos contatos do rodapé.",
  },
  {
    id: "retaliacao",
    question: "Posso sofrer retaliação por usar o canal?",
    answer:
      "A Pitang não tolera retaliação contra pessoas que utilizam este canal de boa-fé.",
  },
  {
    id: "evidencias",
    question: "Posso anexar evidências?",
    answer:
      "Sim. Você pode anexar documentos, imagens, áudio ou vídeo dentro dos limites indicados no formulário. Anexar evidências é opcional.",
  },
]

export function FaqPage() {
  const reduced = useReducedMotion()
  const [open, setOpen] = React.useState<string>(() =>
    typeof window !== "undefined" ? decodeURIComponent(window.location.hash.slice(1)) : ""
  )

  // Deep-link por hash (PUB-013): /faq#anonimato abre e rola até o item.
  React.useEffect(() => {
    if (!open) return
    const el = document.getElementById(open)
    if (el) {
      el.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" })
    }
    // roda uma vez no mount para o item vindo do hash
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          {messages.faq.title}
        </h1>
        <p className="text-muted-foreground text-lg text-pretty">{messages.faq.subtitle}</p>
      </header>

      <Accordion
        type="single"
        collapsible
        value={open}
        onValueChange={setOpen}
        className="mt-8 w-full"
      >
        {faqItems.map((item) => (
          <AccordionItem key={item.id} value={item.id} id={item.id} className="scroll-mt-24">
            <AccordionTrigger className="text-left text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
