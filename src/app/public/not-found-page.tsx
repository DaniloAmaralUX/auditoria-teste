import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Container } from "@/components/layout/container"
import { messages } from "@/messages/pt-BR"

/** Página não encontrada (PUB-015). Recupera a navegação, sem humor inadequado. */
export function NotFoundPage() {
  return (
    <Container
      width="narrow"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center"
    >
      <div className="animate-in fade-in slide-in-from-bottom-1.5 fill-mode-both flex flex-col items-center gap-4 duration-[var(--motion-base)] ease-[var(--ease-enter)]">
        <Eyebrow>Erro 404</Eyebrow>
        <h1 className="font-heading text-3xl text-balance sm:text-4xl">
          {messages.notFound.title}
        </h1>
        <p className="text-muted-foreground max-w-md text-pretty">
          {messages.notFound.description}
        </p>
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
    </Container>
  )
}
