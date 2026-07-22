import { LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/features/auth/auth-context"
import { roleLabels } from "@/features/auth/users"

/**
 * Perfil no topo-direito do painel, ao lado do ThemeToggle (Midday):
 * avatar de iniciais que abre um menu com nome/papel e a ação Sair.
 * Substitui o antigo bloco de perfil no rodapé da sidebar.
 */
export function ProfileMenu() {
  const { user, logout } = useAuth()
  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Conta de ${user.name}`}
        className={cn(
          "rounded-full outline-none transition-[box-shadow] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "aria-expanded:ring-2 aria-expanded:ring-ring aria-expanded:ring-offset-2 aria-expanded:ring-offset-background"
        )}
      >
        <Avatar>
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5 py-1.5">
          <span className="truncate">{user.name}</span>
          <span className="truncate text-xs text-muted-foreground">
            {roleLabels[user.role]}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={logout}>
          <LogOut aria-hidden />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
