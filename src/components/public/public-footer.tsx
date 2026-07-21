import { Mail, Phone, ShieldCheck } from "lucide-react"

import { PublicNavLink } from "@/components/public/nav-link"
import { footerNav, siteConfig } from "@/lib/site-config"
import { messages } from "@/messages/pt-BR"

const linkClass =
  "text-sm text-muted-foreground transition-colors duration-[var(--motion-fast)] hover:text-foreground rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
const contactClass =
  "-mx-3 inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm text-muted-foreground transition-colors duration-[var(--motion-fast)] hover:bg-muted hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"

/** Rodapé global do portal público (RF-002): contatos, documentos e termos. */
export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck aria-hidden className="text-primary-text size-5 shrink-0" />
            <p className="font-heading text-sm font-semibold">{siteConfig.shortName}</p>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm">{messages.footer.rights}</p>
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

        <div className="space-y-1">
          <p className="text-foreground text-sm font-medium">Contato</p>
          <ul>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className={contactClass}>
                <Mail aria-hidden className="size-4" />
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.contact.phoneHref} className={contactClass}>
                <Phone aria-hidden className="size-4" />
                {siteConfig.contact.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="text-muted-foreground mx-auto w-full max-w-6xl px-4 py-6 text-xs sm:px-6">
          {siteConfig.name} · {siteConfig.org}
        </div>
      </div>
    </footer>
  )
}
