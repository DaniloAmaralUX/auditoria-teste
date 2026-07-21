import type { LucideIcon } from "lucide-react"

import { IconTile } from "@/components/ui/icon-tile"
import { cn } from "@/lib/utils"

type ContactLinkProps = {
  href: string
  icon: LucideIcon
  children: React.ReactNode
  className?: string
}

/**
 * Âncora de contato com tile de ícone (home + footer usavam cópias divergentes).
 * Tile sempre neutro — o laranja não decora ícones (guia /design/cores).
 */
export function ContactLink({ href, icon: Icon, children, className }: ContactLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "hover:bg-muted -mx-3 inline-flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors duration-[var(--motion-fast)] outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <IconTile size="sm">
        <Icon aria-hidden strokeWidth={1.75} />
      </IconTile>
      {children}
    </a>
  )
}
