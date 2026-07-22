import * as React from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { LayoutDashboard, Inbox, FileText, Menu, LogOut, ShieldCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
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
  { label: "Documentos", to: "/admin/documentos", icon: FileText },
]

const breadcrumbLabels: Record<string, string> = {
  dashboard: "Dashboard",
  manifestacoes: "Manifestações",
  documentos: "Documentos",
}

function useBreadcrumbs() {
  const { pathname } = useLocation()
  const segments = pathname.split("/").filter(Boolean).slice(1) // remove "admin"
  const crumbs: { label: string; to: string }[] = [{ label: "Painel", to: "/admin/dashboard" }]
  let acc = "/admin"
  for (const seg of segments) {
    acc += `/${seg}`
    // O "Painel" já cobre /admin e /admin/dashboard — não repete o crumb quando é
    // o mesmo destino (evita duplicidade de key na lista renderizada).
    if (acc === "/admin/dashboard") continue
    const label = breadcrumbLabels[seg] ?? seg
    crumbs.push({ label, to: acc })
  }
  return crumbs
}

/**
 * Nav do painel. No rail (desktop), os rótulos aparecem só quando a sidebar
 * expande (hover/foco) — a expansão é do container `group/sidebar`. No Sheet
 * (mobile) os rótulos ficam sempre visíveis (`expanded`).
 */
function SidebarNav({
  expanded = false,
  onNavigate,
}: {
  expanded?: boolean
  onNavigate?: () => void
}) {
  return (
    <nav aria-label="Navegação do painel" className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/admin/dashboard"}
            onClick={onNavigate}
            title={expanded ? undefined : item.label}
            className={({ isActive }) =>
              cn(
                "group/nav relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm outline-none transition-colors duration-[var(--motion-fast)] focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-primary/8 text-primary-text"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )
            }
          >
            <Icon aria-hidden className="size-5 shrink-0" />
            <span
              className={cn(
                "min-w-0 truncate whitespace-nowrap",
                expanded
                  ? ""
                  : "opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100"
              )}
            >
              {item.label}
            </span>
          </NavLink>
        )
      })}
    </nav>
  )
}

function BrandBlock({ expanded = false }: { expanded?: boolean }) {
  return (
    <Link
      to="/admin/dashboard"
      className="flex items-center gap-3 rounded-lg px-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <ShieldCheck aria-hidden className="text-primary size-6 shrink-0" />
      <span
        className={cn(
          "leading-tight whitespace-nowrap",
          expanded
            ? ""
            : "opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100"
        )}
      >
        <span className="font-heading block text-sm">Painel do Comitê</span>
        <span className="text-muted-foreground block text-xs">Ética e Ouvidoria</span>
      </span>
    </Link>
  )
}

function UserFooter({ expanded = false }: { expanded?: boolean }) {
  const { user, logout } = useAuth()
  if (!user) return null
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3 px-1 py-1.5">
        <span className="bg-accent text-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-xs">
          {user.initials}
        </span>
        <div
          className={cn(
            "min-w-0",
            expanded
              ? ""
              : "opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100"
          )}
        >
          <p className="truncate text-sm">{user.name}</p>
          <p className="text-muted-foreground truncate text-xs">{roleLabels[user.role]}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="justify-start"
        onClick={logout}
        title={expanded ? undefined : "Sair"}
      >
        <LogOut aria-hidden className="size-4 shrink-0" />
        <span
          className={cn(
            expanded
              ? ""
              : "opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100"
          )}
        >
          Sair
        </span>
      </Button>
    </div>
  )
}

/** Shell do painel: rail que expande no hover/foco (Midday) + topbar com breadcrumbs. */
export function AdminShell() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const crumbs = useBreadcrumbs()

  return (
    <div className="bg-background min-h-svh">
      {/* Rail fixo (desktop): 72px, expande p/ 240px no hover/foco */}
      <aside className="group/sidebar bg-sidebar fixed inset-y-0 left-0 z-40 hidden w-[72px] flex-col border-r transition-[width,box-shadow] duration-200 ease-[var(--ease-standard)] hover:w-60 hover:shadow-material-menu focus-within:w-60 focus-within:shadow-material-menu md:flex">
        <div className="flex h-16 items-center overflow-hidden px-4">
          <BrandBlock />
        </div>
        <div className="flex-1 overflow-x-hidden overflow-y-auto px-3 py-2">
          <SidebarNav />
        </div>
        <div className="overflow-hidden border-t px-3 py-2">
          <UserFooter />
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="md:pl-[72px]">
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
                  <BrandBlock expanded />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-1 flex-col justify-between p-3">
                <SidebarNav expanded onNavigate={() => setMobileOpen(false)} />
                <div className="border-t pt-3">
                  <UserFooter expanded />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <nav aria-label="Trilha de navegação" className="min-w-0 flex-1">
            <ol className="flex items-center gap-1.5 text-sm">
              {crumbs.map((crumb, i) => {
                const isLast = i === crumbs.length - 1
                return (
                  <li key={crumb.to} className="flex items-center gap-1.5">
                    {i > 0 ? <span className="text-muted-foreground">/</span> : null}
                    {isLast ? (
                      <span className="text-foreground" aria-current="page">
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

          <ThemeToggle />
        </header>

        <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
