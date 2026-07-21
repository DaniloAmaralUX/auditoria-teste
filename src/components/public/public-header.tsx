import * as React from "react"
import { Link } from "react-router-dom"
import { Menu, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
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
  "relative text-sm font-medium text-muted-foreground transition-colors duration-[var(--motion-fast)] hover:text-foreground focus-visible:text-foreground rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
const linkActive =
  "text-foreground after:absolute after:inset-x-0 after:-bottom-[22px] after:h-0.5 after:rounded-full after:bg-primary"

/** Header sticky do portal público (RF-002). Navegação por teclado, estado atual e menu mobile acessível. */
export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ShieldCheck aria-hidden className="text-primary size-6 shrink-0" />
          <span className="font-heading text-sm leading-tight font-semibold sm:text-base">
            {siteConfig.shortName}
            <span className="text-muted-foreground block text-xs font-normal">
              {siteConfig.org}
            </span>
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
      </div>
    </header>
  )
}
