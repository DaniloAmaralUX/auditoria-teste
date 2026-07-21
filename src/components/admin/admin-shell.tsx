import * as React from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { LayoutDashboard, Inbox, Menu, LogOut, ShieldCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from "@/features/auth/auth-context"
import { roleLabels } from "@/features/auth/users"

type AdminNavItem = {
  label: string
  to: string
  icon: typeof LayoutDashboard
}

const navItems: AdminNavItem[] = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Manifestações", to: "/admin/manifestacoes", icon: Inbox },
]

const breadcrumbLabels: Record<string, string> = {
  dashboard: "Dashboard",
  manifestacoes: "Manifestações",
}

function useBreadcrumbs() {
  const { pathname } = useLocation()
  const segments = pathname.split("/").filter(Boolean).slice(1) // remove "admin"
  const crumbs: { label: string; to: string }[] = [{ label: "Painel", to: "/admin/dashboard" }]
  let acc = "/admin"
  for (const seg of segments) {
    acc += `/${seg}`
    const label = breadcrumbLabels[seg] ?? seg
    crumbs.push({ label, to: acc })
  }
  return crumbs
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Navegação do painel" className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <Icon aria-hidden className="size-4" />
            {item.label}
          </NavLink>
        )
      })}
    </nav>
  )
}

function BrandBlock() {
  return (
    <Link
      to="/admin/dashboard"
      className="flex items-center gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <ShieldCheck aria-hidden className="text-primary size-6 shrink-0" />
      <span className="text-sm leading-tight font-semibold">
        Painel do Comitê
        <span className="text-muted-foreground block text-xs font-normal">Ética e Ouvidoria</span>
      </span>
    </Link>
  )
}

/** Shell do painel administrativo: sidebar + breadcrumbs + topbar (RF-020). */
export function AdminShell() {
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const crumbs = useBreadcrumbs()

  return (
    <div className="bg-muted/20 min-h-svh">
      {/* Sidebar fixa (desktop) */}
      <aside className="bg-background fixed inset-y-0 left-0 hidden w-64 border-r md:flex md:flex-col">
        <div className="flex h-16 items-center border-b px-4">
          <BrandBlock />
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <SidebarNav />
        </div>
        {user ? (
          <div className="border-t p-3">
            <div className="flex items-center gap-3 px-1 py-2">
              <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                {user.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="text-muted-foreground truncate text-xs">{roleLabels[user.role]}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="mt-1 w-full justify-start" onClick={logout}>
              <LogOut aria-hidden className="size-4" />
              Sair
            </Button>
          </div>
        ) : null}
      </aside>

      {/* Conteúdo */}
      <div className="md:pl-64">
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 backdrop-blur sm:px-6">
          {/* Menu mobile */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Abrir menu">
                <Menu aria-hidden className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="border-b">
                <SheetTitle className="text-left">
                  <BrandBlock />
                </SheetTitle>
              </SheetHeader>
              <div className="p-3">
                <SidebarNav onNavigate={() => setMobileOpen(false)} />
                {user ? (
                  <>
                    <Separator className="my-3" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={logout}
                    >
                      <LogOut aria-hidden className="size-4" />
                      Sair
                    </Button>
                  </>
                ) : null}
              </div>
            </SheetContent>
          </Sheet>

          <nav aria-label="Trilha de navegação" className="min-w-0">
            <ol className="flex items-center gap-1.5 text-sm">
              {crumbs.map((crumb, i) => {
                const isLast = i === crumbs.length - 1
                return (
                  <li key={crumb.to} className="flex items-center gap-1.5">
                    {i > 0 ? <span className="text-muted-foreground">/</span> : null}
                    {isLast ? (
                      <span className="font-medium" aria-current="page">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link to={crumb.to} className="text-muted-foreground hover:text-foreground">
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        </header>

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
