import { Outlet } from "react-router-dom"

import { PublicHeader } from "@/components/public/public-header"
import { PublicFooter } from "@/components/public/public-footer"
import { messages } from "@/messages/pt-BR"

/** Layout do portal público: skip link + header sticky + conteúdo + rodapé global. */
export function PublicShell() {
  return (
    <div className="bg-page flex min-h-svh flex-col">
      <a
        href="#conteudo"
        className="bg-primary text-primary-foreground sr-only z-50 rounded-md px-4 py-2 focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        {messages.common.skipToContent}
      </a>
      <PublicHeader />
      <main id="conteudo" className="flex-1 focus:outline-none" tabIndex={-1}>
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  )
}
