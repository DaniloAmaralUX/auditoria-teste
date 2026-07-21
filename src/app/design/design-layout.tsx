import { Suspense } from "react"
import { NavLink, Outlet, Link } from "react-router-dom"
import { ArrowLeft, Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const foundations = [
  { to: "/design", label: "Introdução", end: true },
  { to: "/design/cores", label: "Cores" },
  { to: "/design/tipografia", label: "Tipografia" },
  { to: "/design/materiais", label: "Materiais" },
  { to: "/design/grid", label: "Grid" },
  { to: "/design/marca", label: "Marca" },
  { to: "/design/conteudo", label: "Conteúdo" },
  { to: "/design/motion", label: "Motion" },
]

const componentPages = [{ to: "/design/componentes", label: "Componentes" }]

function NavGroup({
  title,
  items,
}: {
  title: string
  items: { to: string; label: string; end?: boolean }[]
}) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground px-2.5 pb-1 text-[11px] font-semibold tracking-[0.08em] uppercase">
        {title}
      </p>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            cn(
              "block rounded-md px-2.5 py-1.5 text-sm transition-colors duration-[var(--motion-fast)]",
              isActive
                ? "bg-muted text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <Button
      variant="outline"
      size="icon-sm"
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun aria-hidden /> : <Moon aria-hidden />}
    </Button>
  )
}

/**
 * Shell do guia de design (branch direcao-visual) — sidebar fixa à la Geist,
 * conteúdo renderizando os tokens e componentes reais do sistema.
 */
export default function DesignLayout() {
  return (
    <div className="bg-background text-foreground min-h-svh">
      <a
        href="#guia-conteudo"
        className="bg-primary text-primary-foreground sr-only z-50 rounded-md px-4 py-2 focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex w-full max-w-6xl">
        <aside className="border-border sticky top-0 hidden h-svh w-56 shrink-0 flex-col gap-6 overflow-y-auto border-r px-3 py-6 md:flex">
          <div className="flex items-center justify-between gap-2 px-2.5">
            <Link to="/design" className="flex items-center gap-2">
              <img src="/favicon.svg" alt="" aria-hidden width={20} height={20} className="size-5" />
              <span className="font-heading text-sm font-semibold">Design</span>
            </Link>
            <ThemeToggle />
          </div>
          <nav aria-label="Guia de design" className="space-y-6">
            <NavGroup title="Fundações" items={foundations} />
            <NavGroup title="Componentes" items={componentPages} />
          </nav>
          <div className="mt-auto px-2.5">
            <Button asChild variant="ghost" size="sm" className="-mx-2 text-muted-foreground">
              <Link to="/">
                <ArrowLeft aria-hidden className="size-4" />
                Voltar ao portal
              </Link>
            </Button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Nav horizontal no mobile */}
          <div className="border-border bg-background/90 sticky top-0 z-10 flex items-center gap-1 overflow-x-auto border-b px-4 py-2 backdrop-blur md:hidden">
            {[...foundations, ...componentPages].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-2.5 py-1.5 text-sm whitespace-nowrap",
                    isActive
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <main
            id="guia-conteudo"
            tabIndex={-1}
            className="px-6 py-10 outline-none sm:px-10 sm:py-14"
          >
            <div className="max-w-2xl">
              <Suspense fallback={null}>
                <Outlet />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
