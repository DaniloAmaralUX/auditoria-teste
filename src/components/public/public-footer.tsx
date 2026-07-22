import { Mail, Phone } from "lucide-react"

import { PitangLogo } from "@/components/ui/pitang-logo"
import { Container } from "@/components/layout/container"
import { ContactLink } from "@/components/public/contact-link"
import { PublicNavLink } from "@/components/public/nav-link"
import { footerNav, siteConfig } from "@/lib/site-config"
import { messages } from "@/messages/pt-BR"

const linkClass =
  "link-underline text-sm text-muted-foreground transition-colors duration-[var(--motion-fast)] hover:text-foreground rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"

/** Rodapé global do portal público (RF-002): contatos, documentos e termos. */
export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <Container className="grid gap-8 py-12 md:grid-cols-3">
        <div className="space-y-3">
          {/* Logo institucional vermelha: no footer não há ação competindo (guia /design/marca). */}
          <PitangLogo variant="brand" className="h-5" />
          <p className="font-heading text-sm font-semibold">{siteConfig.shortName}</p>
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
          <ul className="space-y-1">
            <li>
              <ContactLink
                href={`mailto:${siteConfig.contact.email}`}
                icon={Mail}
                className="text-muted-foreground hover:text-foreground font-normal"
              >
                {siteConfig.contact.email}
              </ContactLink>
            </li>
            <li>
              <ContactLink
                href={siteConfig.contact.phoneHref}
                icon={Phone}
                className="text-muted-foreground hover:text-foreground font-normal"
              >
                {siteConfig.contact.phone}
              </ContactLink>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t">
        <Container className="text-muted-foreground py-6 text-xs">
          {siteConfig.name} · {siteConfig.org}
        </Container>
      </div>
    </footer>
  )
}
