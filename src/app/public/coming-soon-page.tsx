import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

type ComingSoonPageProps = {
  title: string
  description: string
}

/**
 * Placeholder para fluxos ainda não implementados (Registrar — Fase 2; Acompanhar — Fase 3).
 * Garante que nenhuma CTA leve a página sem saída (RF-002) enquanto o fluxo real não existe.
 */
export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-start justify-center gap-4 px-4 py-16 sm:px-6">
      <p className="text-primary font-heading text-sm font-semibold">Em construção</p>
      <h1 className="font-heading text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-pretty">{description}</p>
      <Button asChild variant="outline" className="mt-2">
        <Link to="/">
          <ArrowLeft aria-hidden className="size-4" />
          Voltar ao início
        </Link>
      </Button>
    </div>
  )
}
