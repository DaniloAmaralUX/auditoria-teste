import { Mail, Phone } from "lucide-react"

import { PublicNavLink } from "@/components/public/nav-link"
import { footerNav, siteConfig } from "@/lib/site-config"
import { messages } from "@/messages/pt-BR"

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"

/** Rodapé global do portal público (RF-002): contatos, documentos e termos. */
export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div className="space-y-2">
          <p className="font-heading text-sm font-semibold">{siteConfig.name}</p>
          <p className="text-muted-foreground text-sm">{messages.footer.rights}</p>
        </div>

        <nav aria-label="Documentos e termos" className="space-y-2">
          <p className="text-foreground text-sm font-medium">Documentos</p>
          <ul className="space-y-1.5">
            {footerNav.map((item) => (
              <li key={item.href}>
                <PublicNavLink item={item} className={linkClass} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-2">
          <p className="text-foreground text-sm font-medium">Contato</p>
          <ul className="space-y-1.5">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className={`inline-flex items-center gap-2 ${linkClass}`}
              >
                <Mail aria-hidden className="size-4" />
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.contact.phoneHref}
                className={`inline-flex items-center gap-2 ${linkClass}`}
              >
                <Phone aria-hidden className="size-4" />
                {siteConfig.contact.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
