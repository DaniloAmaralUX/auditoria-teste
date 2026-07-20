import { NavLink } from "react-router-dom"
import { ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"
import { messages } from "@/messages/pt-BR"
import type { NavItem } from "@/lib/site-config"

type PublicNavLinkProps = {
  item: NavItem
  className?: string
  activeClassName?: string
  onNavigate?: () => void
}

/**
 * Renderiza um item de navegação:
 * - interno → React Router NavLink (com aria-current no item ativo);
 * - externo (ex.: PDF do Código de Conduta) → âncora em nova aba com noopener noreferrer (RF-003).
 */
export function PublicNavLink({
  item,
  className,
  activeClassName,
  onNavigate,
}: PublicNavLinkProps) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("inline-flex items-center gap-1.5", className)}
        onClick={onNavigate}
      >
        {item.label}
        <ExternalLink aria-hidden className="size-3.5 opacity-70" />
        <span className="sr-only">({messages.common.newTab})</span>
      </a>
    )
  }

  return (
    <NavLink
      to={item.href}
      end={item.href === "/"}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(className, isActive && activeClassName)
      }
    >
      {item.label}
    </NavLink>
  )
}
