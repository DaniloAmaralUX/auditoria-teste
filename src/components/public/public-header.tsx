import * as React from "react"
import { Link } from "react-router-dom"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PitangLogo } from "@/components/ui/pitang-logo"
import { Container } from "@/components/layout/container"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { PublicNavLink } from "@/components/public/nav-link"
import { primaryNav, siteConfig } from "@/lib/site-config"
import { messages } from "@/messages/pt-BR"

const linkBase =
  "link-underline text-sm font-medium text-muted-foreground transition-colors duration-[var(--motion-fast)] hover:text-foreground focus-visible:text-foreground rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
const linkActive = "text-foreground"

/** Header sticky do portal público (RF-002). Navegação por teclado, estado atual e menu mobile acessível. */
export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex h-16 items-center gap-4">
        {/* Logo institucional SEMPRE vermelha (decisão do designer, 2026-07-22) —
            a ação compartilha o matiz da marca, então não há disputa de cor. */}
        <Link
          to="/"
          className="flex items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <PitangLogo variant="brand" className="h-5 shrink-0" />
          <span className="text-muted-foreground border-l pl-3 text-xs leading-tight font-medium">
            {siteConfig.shortName}
          </span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="ml-auto hidden items-center gap-6 md:flex"
        >
          {primaryNav.map((item) => (
            <PublicNavLink
              key={item.href}
              item={item}
              className={linkBase}
              activeClassName={linkActive}
            />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/acompanhar">{messages.home.ctaTrack}</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/registrar">{messages.home.ctaRegister}</Link>
          </Button>

          {/* Menu mobile */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label={messages.common.openMenu}
              >
                <Menu aria-hidden className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm">
              <SheetHeader>
                <SheetTitle>{siteConfig.shortName}</SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Navegação principal"
                className="flex flex-col gap-1 px-4"
              >
                {primaryNav.map((item) => (
                  <PublicNavLink
                    key={item.href}
                    item={item}
                    onNavigate={() => setMobileOpen(false)}
                    className="rounded-md px-2 py-3 text-base text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                    activeClassName="bg-muted font-medium"
                  />
                ))}
              </nav>
              <Separator className="my-4" />
              <div className="flex flex-col gap-2 px-4">
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link to="/registrar">{messages.home.ctaRegister}</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/acompanhar">{messages.home.ctaTrack}</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
