import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { messages } from "@/messages/pt-BR"

/** Página não encontrada (PUB-015). Recupera a navegação, sem humor inadequado. */
export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-start justify-center gap-4 px-4 py-16 sm:px-6">
      <div className="animate-in fade-in slide-in-from-bottom-1.5 fill-mode-both flex flex-col items-start gap-4 duration-[var(--motion-base)] ease-[var(--ease-enter)]">
        <p className="text-primary font-heading text-sm font-semibold">Erro 404</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          {messages.notFound.title}
        </h1>
        <p className="text-muted-foreground text-pretty">{messages.notFound.description}</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/">
              <ArrowLeft aria-hidden className="size-4" />
              {messages.notFound.back}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/registrar">{messages.home.ctaRegister}</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/acompanhar">{messages.home.ctaTrack}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
