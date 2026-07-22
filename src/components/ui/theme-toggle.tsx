import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

/**
 * Alterna claro/escuro (padrão Midday: no menu do usuário / rodapé). Lê o tema
 * RESOLVIDO da classe do <html> — funciona mesmo com theme="system". O atalho
 * global tecla D continua valendo (ThemeProvider).
 */
export function ThemeToggle({
  className,
  showLabel = false,
  ...props
}: React.ComponentProps<typeof Button> & { showLabel?: boolean }) {
  const { setTheme } = useTheme()
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains("dark"))
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  const label = isDark ? "Ativar tema claro" : "Ativar tema escuro"

  return (
    <Button
      type="button"
      variant="ghost"
      size={showLabel ? "sm" : "icon"}
      aria-label={showLabel ? undefined : label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(showLabel && "w-full justify-start", className)}
      {...props}
    >
      {isDark ? <Sun aria-hidden /> : <Moon aria-hidden />}
      {showLabel ? <span>{isDark ? "Tema claro" : "Tema escuro"}</span> : null}
    </Button>
  )
}
